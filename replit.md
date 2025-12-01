# Overview

This is an Instagram-style login page application built as a full-stack TypeScript project. The application simulates a login flow where users must attempt to log in 3 times before being "successfully" authenticated. Upon the third attempt, the system either retrieves or creates a user with randomly generated follower and like counts. The project serves as a demonstration application mimicking Instagram's visual design and basic authentication flow.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 18 with TypeScript and Vite as the build tool.

**Rationale**: Vite provides fast development experience with hot module replacement, while React offers a component-based architecture suitable for building interactive UIs.

**State Management**: Local component state using React hooks (`useState`) combined with TanStack Query (React Query) for server state management.

**Rationale**: TanStack Query handles API calls, caching, and error states declaratively, eliminating the need for a more complex global state solution for this simple application.

**Routing**: Wouter for client-side routing (dependency present but not actively used in current implementation).

**Styling**: Tailwind CSS for utility-first styling with custom font integration (Billabong font via CDN for Instagram-style branding).

**Form Handling**: React Hook Form with Zod validation resolvers (dependencies present but not actively used in current implementation).

**UI Components**: Lucide React for icons (Eye, EyeOff for password visibility toggle).

## Backend Architecture

**Runtime**: Node.js with Express 5 framework.

**Rationale**: Express provides a minimal, flexible HTTP server suitable for serving both API endpoints and static files.

**Development Server**: tsx with watch mode for TypeScript execution and hot-reloading during development.

**API Structure**: RESTful API with a single endpoint (`POST /api/auth/login`) for authentication.

**Business Logic**: 
- Login requires 3 attempts before "success"
- On successful login (3rd attempt), creates or retrieves user from storage
- New users receive randomized follower counts (500-5500) and like counts (1000-11000)

**Middleware Stack**:
1. JSON body parser
2. URL-encoded body parser
3. Request logging middleware (logs API calls with duration and response)
4. Route handlers
5. Error handling middleware

## Data Storage Solutions

**ORM**: Drizzle ORM with PostgreSQL schema definitions.

**Current Implementation**: In-memory storage using a `Map` structure (`MemStorage` class).

**Rationale**: The application uses an abstraction layer (`IStorage` interface) allowing easy swapping between in-memory storage (current) and database storage (future). This supports development without requiring database setup while maintaining production-ready schema definitions.

**Schema Structure**:
- Users table with fields: id (UUID), username (unique), email (unique), followersCount, likesCount, createdAt, updatedAt
- Zod schemas generated from Drizzle schemas for runtime validation

**Migration Path**: The application is architected to easily transition from in-memory storage to PostgreSQL by:
1. Setting `DATABASE_URL` environment variable
2. Replacing `MemStorage` with a database-backed storage implementation
3. Using existing Drizzle schema definitions

## Authentication and Authorization

**Authentication Strategy**: Simplified username-based authentication without actual password verification.

**Rationale**: This is a demonstration application simulating Instagram's UI/UX rather than implementing production-grade security. The password field exists for UI purposes but is not validated.

**Session Management**: No persistent sessions; authentication state exists only in component state during runtime.

**User Creation**: Auto-registration on third login attempt if username doesn't exist.

# External Dependencies

## Third-Party Services

**Supabase**: Client library included for potential database and authentication integration.

**Status**: Configuration files exist (`supabaseClient.ts`) but the service is not actively used. Environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) would need to be configured for activation.

**Note**: Legacy Supabase integration code exists in `src/App.tsx` (outdated) while current implementation in `client/src/App.tsx` uses the Express backend API.

## Key NPM Packages

**Runtime Dependencies**:
- `postgres`: PostgreSQL client (ready for use when DATABASE_URL is configured)
- `drizzle-orm` & `drizzle-kit`: ORM and migration tools
- `zod`: Schema validation
- `@tanstack/react-query`: Async state management
- `wouter`: Client-side routing
- `lucide-react`: Icon library

**Build Tools**:
- `vite`: Frontend build tool and dev server
- `typescript`: Type checking
- `tailwindcss`: CSS framework
- `tsx`: TypeScript execution for Node.js

## Database Integration

**Database System**: PostgreSQL (via `postgres` package and Drizzle ORM).

**Connection**: Expects `DATABASE_URL` environment variable. Application will throw error if this is not set when database code is activated.

**Current State**: Schema defined but storage implementation uses in-memory Map. Database integration requires:
1. Setting `DATABASE_URL` environment variable
2. Running migrations via Drizzle Kit
3. Replacing `MemStorage` with database-backed storage implementation

## Development vs Production

**Development Mode**: 
- Vite dev server with HMR
- tsx watch mode for backend
- Runs on port 5000

**Production Mode**:
- Pre-built static assets served from `dist/public`
- Express serves SPA with fallback routing
- All routes fall back to `index.html` for client-side routing