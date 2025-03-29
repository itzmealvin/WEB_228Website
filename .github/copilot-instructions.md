# 228 Website – AI Coding Agent Instructions

## Project Overview

This is a **Next.js 14 App Router** website for Two Two Eight Co., Ltd., a Vietnamese industrial equipment company specializing in explosion-proof (hazardous area) solutions. The site features **bilingual content (Vietnamese/English)** using `next-intl` with Vietnamese as the default locale.

## Architecture & Key Patterns

### Internationalization (i18n)

- **Framework**: `next-intl` with App Router pattern
- **Locales**: `vi` (default), `en` defined in [src/i18n/routing.ts](src/i18n/routing.ts)
- **Route Structure**: All pages under `src/app/[locale]/` with locale prefix in URLs
- **Middleware**: [src/middleware.ts](src/middleware.ts) handles locale detection and routing (excludes `/api`, `/_next`, `/_vercel`, and static files)
- **Navigation**: Use `Link`, `redirect`, `useRouter` from [src/i18n/navigation.ts](src/i18n/navigation.ts) NOT from `next/navigation` for locale-aware routing
- **Translations**: JSON files in `messages/{locale}.json` accessed via `useTranslations()` hook with namespaced keys (e.g., `NavBar.home`)

### MDX Documentation System

- **Location**: MDX files in `src/docs/` with naming pattern `{slug}.{locale}.mdx`
- **Frontmatter**: Required fields: `title`, `description`, `date` (YAML format)
- **Rendering**: Uses `next-mdx-remote` with `remark-gfm` plugin for GitHub-flavored markdown
- **File Discovery**: [src/lib/mdx.ts](src/lib/mdx.ts) `getLocalizedDocs()` reads filesystem directly (no static generation)
- **Public Assets**: Doc images stored in `public/docs/{slug}/` and referenced as `/docs/{slug}/image.png` in MDX

**Adding new docs**: Create both `{slug}.en.mdx` and `{slug}.vi.mdx` in `src/docs/` with complete frontmatter

### Component Organization

- **Barrel Export**: Components exported through [src/components/index.ts](src/components/index.ts)
- **Dynamic Imports**: `Contact`, `Footer`, `NavBar` loaded with `dynamic(() => import(), { ssr: false })` in locale layout
- **Styling**: Tailwind CSS with custom Geist fonts; prose typography plugin for MDX rendering

## Development Workflow

### Commands (pnpm)

```bash
pnpm dev       # Start dev server (port 3000)
pnpm build     # Production build
pnpm start     # Run production server
pnpm lint      # ESLint check
```

### File Path Aliases

Use `@/*` for `src/*` imports (configured in [tsconfig.json](tsconfig.json))

### Metadata Generation

All pages export `metadata` or `generateMetadata()` for SEO. Include OpenGraph, Twitter cards, and canonical URLs.

## Critical Conventions

1. **Locale Context**: Always use `useLocale()` to get current locale, never hardcode locale strings in page logic
2. **Translation Keys**: Structure as `namespace.key` (e.g., `DocsPage.title`, `Footer.copyright`)
3. **Route Parameters**: Locale is injected by Next.js; slug-based pages receive `{ params: { slug: string, locale: string } }`
4. **MDX Content**: Access via filesystem `fs.readFileSync()` with `gray-matter` for frontmatter parsing
5. **Type Safety**: Project uses TypeScript strict mode; `next-intl` types are generated from translation files

## Integration Points

- **Vercel Analytics**: Integrated via `@vercel/analytics/next` in locale layout
- **hCaptcha**: Form validation using `@hcaptcha/react-hcaptcha` (check Contact component)
- **Form Handling**: React Hook Form + Zod for validation
- **Animation**: Framer Motion for UI transitions

## Key Files to Reference

- [src/app/[locale]/layout.tsx](src/app/[locale]/layout.tsx) – Root locale layout with font setup and dynamic imports
- [src/app/[locale]/docs/[slug]/page.tsx](src/app/[locale]/docs/[slug]/page.tsx) – MDX rendering pattern
- [src/middleware.ts](src/middleware.ts) – Locale routing configuration
- [messages/en.json](messages/en.json) / [messages/vi.json](messages/vi.json) – All translatable strings

## Common Tasks

**Add a new page**: Create in `src/app/[locale]/{route}/page.tsx`, use `useTranslations()` for text, export metadata
**Add translation**: Update both `messages/en.json` and `messages/vi.json` with matching keys
**Update docs**: Edit/add MDX in `src/docs/` with both locale versions; images in `public/docs/{slug}/`
**Locale-aware links**: Import `Link` from `@/i18n/navigation`, not `next/link`


# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `bun x ultracite fix`
- **Check for issues**: `bun x ultracite check`
- **Diagnose setup**: `bun x ultracite doctor`

Biome (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**
- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**
- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**
- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `bun x ultracite fix` before committing to ensure compliance.
