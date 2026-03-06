# AI Chat App (ChatGPT Style)

## Current State
New project. No existing backend or frontend.

## Requested Changes (Diff)

### Add
- AI chat interface similar to ChatGPT
- Multi-language support (Hindi, English, Spanish, French, German, Arabic, Chinese, Japanese, Portuguese, Russian and more)
- Chat history with multiple conversations/sessions
- New conversation button
- Message input with send button
- Message bubbles (user and assistant)
- Sidebar with past conversations
- Language selector dropdown
- Typing indicator / loading state
- Responsive design (mobile + desktop)
- Dark/light mode toggle

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend (Motoko):
   - Store chat conversations per user (anonymous principal)
   - Store messages per conversation (role: user/assistant, content, timestamp)
   - CRUD: create conversation, add message, list conversations, get conversation messages, delete conversation
   - Simple AI response simulation (echo/placeholder - real AI is not supported on IC natively)

2. Frontend (React + TypeScript):
   - Sidebar: list of conversations, new chat button, language selector
   - Main chat area: message history, input box, send button
   - Simulated AI responses with typing animation
   - Language UI labels switchable (i18n)
   - Responsive layout
   - Clean dark-themed design inspired by ChatGPT
