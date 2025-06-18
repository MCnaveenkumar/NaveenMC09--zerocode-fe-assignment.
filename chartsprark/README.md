# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# ChartSpark

## Usage Guide

1. **Login/Register**
   - You can login with any credentials. Authentication is handled by inbuilt Redux state (no backend).
   - The credentials you provide during sign up (register) are the only ones accepted for login. Make sure to remember them!

2. **After Login**
   - Upon successful login, you are taken to the dashboard.
   - The dashboard includes:
     - **Analytics Dashboard:** See stats about your chat (total messages, user/bot messages, etc.).
     - **Voice Input:** Use your microphone to input messages via speech-to-text.
     - **Prompt Templates:** Quickly send predefined prompts to the bot.
     - **Chat Export:** Download your chat as a `.txt` file.
     - **Real-time Gemini API:** All bot responses are generated in real time using the Gemini API.

3. **Features**
   - Fully responsive design (works on mobile and desktop).
   - Light/Dark mode toggle.
   - Modern, clean chat UI with Markdown support for bot responses.
   - Auto-scroll to the latest message.

---

For setup instructions, see below.
"# NaveenMC09--zerocode-fe-assignment." 
