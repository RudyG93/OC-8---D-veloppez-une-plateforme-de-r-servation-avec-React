/**
 * Initialise les tables conversations et messages si elles n'existent pas.
 */
async function ensureTables(db) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_a INTEGER NOT NULL,
      user_b INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_a, user_b),
      FOREIGN KEY(user_a) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(user_b) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conversation_id INTEGER NOT NULL,
      sender_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
      FOREIGN KEY(sender_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages(conversation_id);
    CREATE INDEX IF NOT EXISTS idx_conversations_users ON conversations(user_a, user_b);
  `);
}

let tablesReady = false;
async function init(db) {
  if (!tablesReady) {
    await ensureTables(db);
    tablesReady = true;
  }
}

/**
 * Liste les conversations de l'utilisateur courant
 */
async function listConversations(db, userId) {
  await init(db);

  const rows = await db.allAsync(`
    SELECT
      c.id,
      c.created_at,
      CASE WHEN c.user_a = ? THEN c.user_b ELSE c.user_a END AS participant_id,
      u.name AS participant_name,
      u.picture AS participant_picture,
      m.content AS last_message,
      m.created_at AS last_message_at
    FROM conversations c
    JOIN users u ON u.id = CASE WHEN c.user_a = ? THEN c.user_b ELSE c.user_a END
    LEFT JOIN messages m ON m.id = (
      SELECT id FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1
    )
    WHERE c.user_a = ? OR c.user_b = ?
    ORDER BY COALESCE(m.created_at, c.created_at) DESC
  `, [userId, userId, userId, userId]);

  return rows.map(row => ({
    id: String(row.id),
    participant: {
      id: row.participant_id,
      name: row.participant_name,
      picture: row.participant_picture || null,
    },
    lastMessage: row.last_message || '',
    lastMessageAt: row.last_message_at || row.created_at,
    unread: false,
  }));
}

/**
 * Récupère ou crée une conversation entre deux utilisateurs
 */
async function getOrCreateConversation(db, userId, participantId) {
  await init(db);

  if (!participantId) {
    const err = new Error('participant_id is required');
    err.status = 400;
    throw err;
  }

  // Vérifier que le participant existe
  const participant = await db.getAsync('SELECT id, name, picture FROM users WHERE id = ?', [participantId]);
  if (!participant) {
    const err = new Error('Participant not found');
    err.status = 404;
    throw err;
  }

  // Normaliser l'ordre (user_a < user_b) pour éviter les doublons
  const [a, b] = userId < participantId ? [userId, participantId] : [participantId, userId];

  let conv = await db.getAsync(
    'SELECT id FROM conversations WHERE user_a = ? AND user_b = ?',
    [a, b]
  );

  if (!conv) {
    const result = await db.runAsync(
      'INSERT INTO conversations(user_a, user_b) VALUES (?, ?)',
      [a, b]
    );
    conv = { id: result.lastID };
  }

  return {
    id: String(conv.id),
    participant: {
      id: participant.id,
      name: participant.name,
      picture: participant.picture || null,
    },
  };
}

/**
 * Liste les messages d'une conversation
 */
async function listMessages(db, userId, conversationId) {
  await init(db);

  // Vérifier que l'utilisateur fait partie de la conversation
  const conv = await db.getAsync(
    'SELECT id FROM conversations WHERE id = ? AND (user_a = ? OR user_b = ?)',
    [conversationId, userId, userId]
  );
  if (!conv) {
    const err = new Error('Conversation not found');
    err.status = 404;
    throw err;
  }

  const rows = await db.allAsync(`
    SELECT m.id, m.sender_id, m.content, m.created_at,
           u.name AS sender_name, u.picture AS sender_picture
    FROM messages m
    JOIN users u ON u.id = m.sender_id
    WHERE m.conversation_id = ?
    ORDER BY m.created_at ASC
  `, [conversationId]);

  return rows.map(row => ({
    id: String(row.id),
    senderId: row.sender_id,
    senderName: row.sender_name,
    senderPicture: row.sender_picture || null,
    content: row.content,
    createdAt: row.created_at,
  }));
}

/**
 * Envoie un message dans une conversation
 */
async function sendMessage(db, userId, conversationId, content) {
  await init(db);

  if (!content || !content.trim()) {
    const err = new Error('content is required');
    err.status = 400;
    throw err;
  }

  // Vérifier que l'utilisateur fait partie de la conversation
  const conv = await db.getAsync(
    'SELECT id FROM conversations WHERE id = ? AND (user_a = ? OR user_b = ?)',
    [conversationId, userId, userId]
  );
  if (!conv) {
    const err = new Error('Conversation not found');
    err.status = 404;
    throw err;
  }

  const result = await db.runAsync(
    'INSERT INTO messages(conversation_id, sender_id, content) VALUES (?, ?, ?)',
    [conversationId, userId, content.trim()]
  );

  const sender = await db.getAsync('SELECT name, picture FROM users WHERE id = ?', [userId]);

  return {
    id: String(result.lastID),
    senderId: userId,
    senderName: sender ? sender.name : 'Utilisateur',
    senderPicture: sender ? sender.picture || null : null,
    content: content.trim(),
    createdAt: new Date().toISOString(),
  };
}

module.exports = {
  listConversations,
  getOrCreateConversation,
  listMessages,
  sendMessage,
};
