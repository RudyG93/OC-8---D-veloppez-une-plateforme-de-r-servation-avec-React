import type { Preview } from '@storybook/nextjs-vite'
import React from 'react'
import { AuthProvider } from '../src/contexts/AuthContext'
import { FavoritesProvider } from '../src/contexts/FavoritesContext'
import '../src/app/globals.css'

const preview: Preview = {
  decorators: [
    (Story) => React.createElement(
      AuthProvider,
      null,
      React.createElement(
        FavoritesProvider,
        null,
        React.createElement(Story),
      ),
    ),
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error'
    },

    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;