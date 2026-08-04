# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3-based notes application built with TypeScript, Vite, Pinia for state management, and Naive UI for components. The application manages personal notes organized into groups.

## Architecture and Structure

The application follows a layered architecture:

1. **Presentation Layer** (front-vue3/src/components/)
   - Vue 3 components using Composition API
   - UI components built with Naive UI
   - Components are organized by feature (groups, notes)

2. **State Management** (front-vue3/src/stores/)
   - Uses Pinia for state management
   - `note.ts` store manages notes and groups state

3. **Services Layer** (front-vue3/src/services/)
   - `NotesService` handles business logic for notes and groups
   - Implements validation and data manipulation logic

4. **Data Access Layer** (front-vue3/src/api/)
   - Two implementations:
     - `in-memory`: In-memory data storage for development/testing
     - `node`: HTTP-based API calls (currently commented out)

5. **Entities Layer** (front-vue3/src/entities/)
   - `Group` and `Note` classes with validation logic
   - Data transfer objects with validation methods

6. **Types** (front-vue3/src/types/)
   - Defines interfaces for all data structures
   - Type definitions for services and APIs

## Key Technologies

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for build tooling
- **Pinia** for state management
- **Naive UI** for component library
- **ESLint** and **Prettier** for code quality

## Development Commands

- `npm install` - Install dependencies
- `npm run dev` - Compile and hot-reload for development
- `npm run build` - Type-check, compile and minify for production
- `npm run test:unit` - Run unit tests with Vitest
- `npm run test:e2e:dev` - Run end-to-end tests with Cypress (development server)
- `npm run test:e2e` - Run end-to-end tests against production build
- `npm run lint` - Lint with ESLint

## Key Files and Components

- `front-vue3/src/App.vue` - Main application component
- `front-vue3/src/stores/note.ts` - Main store for notes management
- `front-vue3/src/services/notesService.ts` - Business logic for notes
- `front-vue3/src/api/notes/in-memory/index.ts` - In-memory data storage
- `front-vue3/src/entities/group.ts` - Group entity with validation
- `front-vue3/src/entities/note.ts` - Note entity with validation
- `front-vue3/src/types/index.ts` - All type definitions

## Data Flow

1. Application loads notes via `store.loadNotes()` in `App.vue`
2. Store fetches data via `serviceProvider.notes.getNotes()`
3. Service calls the API (`NotesApi`) to get data
4. Data is parsed and stored in the Pinia store
5. When changes occur, the service calls `saveGroup()` or `saveNote()`
6. Changes are persisted via `api.saveNotes()` 

## Testing Strategy

- Unit tests in `front-vue3/src/components/__tests__/`
- Component testing with Vitest
- End-to-end testing with Cypress
- Integration tests for API interactions

## Implementation Guidelines

When working with this codebase:
- Follow the existing patterns for component structure and state management
- Maintain type safety using TypeScript interfaces
- Implement validation in entities (Group and Note classes)
- Use Pinia stores for state management
- Keep business logic in services, not components
- Follow the layered architecture (presentation → services → data access)
- Ensure all new features include proper tests