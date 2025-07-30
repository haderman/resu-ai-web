# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

**Development:**
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Testing:**
- `npm run test` - Run Jest tests
- `npm run test-watch` - Run tests in watch mode

**Storybook:**
- `npm run storybook` - Start Storybook dev server on port 6006
- `npm run build-storybook` - Build static Storybook

**Database (FaunaDB):**
- `npm run setup-local-db` - Create collections, indexes, and functions in FaunaDB
- `npm run start-local-db` - Start ephemeral local FaunaDB instance (data lost on stop)
- `npm run start-local-db-persisted` - Start persistent local FaunaDB instance

## Architecture Overview

This is a **Next.js resume editor application** with AI-powered chat functionality built using:

### Core Technologies
- **Next.js 15** with React 19 - App framework
- **Redux Toolkit** - State management with `next-redux-wrapper`
- **FaunaDB** - Database with NextAuth.js integration
- **AI SDK** - Chat functionality with OpenAI integration
- **TypeScript** - Full type safety
- **SCSS Modules** - Component styling
- **Jest + Testing Library** - Testing framework
- **Storybook** - Component development

### Key Architecture Patterns

**State Management:**
- Redux store configured in `src/state/store.ts` with multiple slices:
  - `editor` - Resume editing state
  - `session` - User session
  - `api` - RTK Query API slice
  - `blocks`, `page`, `settings` - UI state
- Server-side state hydration via `next-redux-wrapper`

**Resume Data Structure:**
- Typed resume schema in `src/shared/types/resume/`
- Structured content: `basicInfo`, `profile`, `skills`, `experience`, `contact`
- Theme system with layout and sections configuration
- Field-based editing with path-based updates

**AI Chat Integration:**
- Chat component in `src/components/editor/chat/` using `@ai-sdk/react`
- Tool-based architecture for resume field updates
- System prompt defines resume schema and field update patterns
- Real-time tool invocation handling with UI adapters

**Component Architecture:**
- Modular component structure in `src/components/`
- Editor components with adapter pattern for field types
- Form components with consistent styling patterns
- Content components for different resume sections

### Database Setup

For first-time setup, follow the FaunaDB configuration in `/fauna/README.md`:
1. Run local FaunaDB container
2. Create database and secret key
3. Set environment variables in `.env.local`
4. Run `npm run setup-local-db` to initialize schema

### Testing Strategy

- Jest configuration supports Next.js with `jest-preview`
- Component tests use `@testing-library/react`
- Mock API responses for database interactions
- Storybook for component development and visual testing

### Key Files to Understand

- `src/state/store.ts` - Redux configuration
- `src/shared/types/resume/resume.ts` - Core data types
- `src/server/chat/system.ts` - AI chat system prompt
- `src/components/editor/chat/chat.tsx` - Chat UI implementation
- `src/components/editor/adapter/` - Field editing adapters