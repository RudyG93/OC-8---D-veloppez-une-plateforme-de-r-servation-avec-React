const {
  listConversations,
  getOrCreateConversation,
  listMessages,
  sendMessage,
} = require('../services/messagesService');

function statusFromError(e) {
  if (e && e.status) return e.status;
  return 500;
}

async function list(req, res) {
  const db = req.app.locals.db;
  try {
    const userId = req.user && req.user.id;
    const conversations = await listConversations(db, userId);
    res.json(conversations);
  } catch (e) {
    res.status(statusFromError(e)).json({ error: e.message });
  }
}

async function getOrCreate(req, res) {
  const db = req.app.locals.db;
  try {
    const userId = req.user && req.user.id;
    const participantId = Number(req.body.participant_id);
    const conversation = await getOrCreateConversation(db, userId, participantId);
    res.json(conversation);
  } catch (e) {
    res.status(statusFromError(e)).json({ error: e.message });
  }
}

async function getMessages(req, res) {
  const db = req.app.locals.db;
  try {
    const userId = req.user && req.user.id;
    const conversationId = req.params.id;
    const messages = await listMessages(db, userId, conversationId);
    res.json(messages);
  } catch (e) {
    res.status(statusFromError(e)).json({ error: e.message });
  }
}

async function send(req, res) {
  const db = req.app.locals.db;
  try {
    const userId = req.user && req.user.id;
    const conversationId = req.params.id;
    const { content } = req.body;
    const message = await sendMessage(db, userId, conversationId, content);
    res.status(201).json(message);
  } catch (e) {
    res.status(statusFromError(e)).json({ error: e.message });
  }
}

module.exports = { list, getOrCreate, getMessages, send };
