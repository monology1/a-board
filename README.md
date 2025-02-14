## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js app router directory
│   │   ├── (auth)/            # Authentication related pages
│   │   │   ├── login/         # Login page
│   │   │   └── register/      # Registration page
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   │   ├── board/         # Board management pages
│   │   │   └── settings/      # User settings pages
│   │   ├── layout.tsx         # Root layout for all pages
│   │   └── page.tsx           # Home page
│   │
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── button/       # Button variations
│   │   │   ├── input/        # Input components
│   │   │   └── card/         # Card components
│   │   └── shared/           # Shared feature components
│   │       ├── header/       # Application header
│   │       └── footer/       # Application footer
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── use-auth.ts      # Authentication hooks
│   │   └── use-board.ts     # Board management hooks
│   │
│   ├── lib/                  # Utility functions & configurations
│   │   ├── api/             # API client setup
│   │   ├── constants/       # Constants and enums
│   │   └── utils/           # Helper functions
│   │
│   ├── store/               # State management
│   │   ├── slices/         # State slices
│   │   └── index.ts        # Store configuration
│   │
│   └── types/               # TypeScript type definitions
│
├── public/                  # Static files
│
└── tests/                   # Test files
    ├── unit/               # Unit tests
    └── e2e/                # End-to-end tests
```

## Naming Conventions

### Files and Folders

1. Components:
    - Use PascalCase for component files: `Button.tsx`, `LoginForm.tsx`
    - Each component should have its own folder with index.ts:
   ```
   button/
   ├── Button.tsx
   ├── Button.test.tsx
   └── index.ts
   ```

2. Hooks:
    - Prefix with 'use-': `use-auth.ts`, `use-board.ts`
    - Camel case for file names

3. Utils:
    - Use camelCase: `formatDate.ts`, `validateInput.ts`

4. Types:
    - Suffix with '.types.ts': `board.types.ts`
    - Interface names: Prefix with 'I': `IUser`
    - Type names: Descriptive: `BoardResponse`

### Component Structure

```typescript
// Regular component
export default function Button({ 
  children, 
  ...props 
}: ButtonProps) {
  return (...)
}

// Page component
export default function LoginPage() {
  return (...)
}

// Hook
export function useAuth() {
  return (...)
}
```

## State Management

1. API State:
    - Use React Query for server state
    - Create custom hooks for data fetching

2. Local State:
    - Use React Context for shared state
    - Use useState for component state

## Styling Conventions

1. Tailwind Classes:
    - Order: layout → spacing → typography → visual
   ```tsx
   <div className="flex items-center p-4 text-lg bg-blue-500" />
   ```

2. Custom CSS:
    - Use CSS modules for component-specific styles
    - File naming: `ComponentName.module.css`

## Best Practices

1. Components:
    - One component per file
    - Keep components small and focused
    - Use TypeScript props interface

2. Hooks:
    - Extract reusable logic into custom hooks
    - Follow React Hooks rules

3. API Calls:
    - Use API client for all requests
    - Handle errors consistently
    - Type all responses

## Testing

1. Unit Tests:
   ```typescript
   // Button.test.tsx
   describe('Button', () => {
     it('renders correctly', () => {
       // test implementation
     })
   })
   ```

2. E2E Tests:
    - Use Cypress for end-to-end testing
    - Group tests by feature

## Development Workflow

1. Starting the Development Server:
   ```bash
   npm run dev
   ```

2. Building for Production:
   ```bash
   npm run build
   npm run start
   ```

3. Running Tests:
   ```bash
   npm run test        # Unit tests
   npm run test:e2e    # E2E tests
   ```

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_ENV=development
```