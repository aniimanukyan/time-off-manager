# Time Off Manager

A mobile app for managing time off, built with [Ionic React](https://ionicframework.com/docs/react) and [Capacitor](https://capacitorjs.com/).

Employees see their time-off balances and requests and can submit new requests; supervisors review pending requests and approve or reject them. Data comes from an in-memory mock API that imitates a backend.

> **Status:** working prototype. A "Supervisor view" switch stands in for login and toggles between the two roles; `/home` shows every UI component in isolation. See [How this project was built](#how-this-project-was-built) for the development workflow and where AI was used.

## Tech stack

- **UI:** Ionic React 9, React 19, Ionicons
- **Routing:** React Router 6 via `@ionic/react-router`
- **Build tooling:** Vite 8, TypeScript 5.9
- **Styles:** Sass (SCSS)
- **Native runtime:** Capacitor 8 (App, Haptics, Keyboard, Status Bar plugins)
- **Testing:** Vitest + Testing Library (unit), Playwright (end-to-end)
- **Component workshop:** Storybook 10 (`@storybook/react-vite`)
- **Code quality:** ESLint (`@ionic/eslint-config`), Prettier (`@ionic/prettier-config`)

## Getting started

### Prerequisites

- Node.js 22 (≥ 22.22.2), 24 (≥ 24.15.0) or 26+, and npm. Unit tests use jsdom, which does not run on Node 23 or other odd-numbered versions.

### Install and run

```bash
git clone https://github.com/aniimanukyan/time-off-manager.git
cd time-off-manager
npm install
npm run dev
```

The dev server runs at http://localhost:3000.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint, type-check e2e tests and check Prettier formatting |
| `npm run lint:fix` | Auto-fix ESLint issues and format with Prettier |
| `npm test` | Run unit tests, then end-to-end tests |
| `npm run test:unit` | Run Vitest unit tests once |
| `npm run test:unit:watch` | Run Vitest in watch mode |
| `npm run test:e2e` | Run Playwright end-to-end tests |
| `npm run storybook` | Start Storybook at http://localhost:6006 |
| `npm run build-storybook` | Build a static Storybook into `storybook-static/` |

## Testing

**Unit tests** live next to the source as `src/**/*.test.tsx`. Shared test helpers are in `src/testUtils/`, e.g. `expectTexts` checks that an element contains a list of texts.

| Test | What it covers |
| --- | --- |
| `src/pages/Employee/Employee.test.tsx` | The employee view lists upcoming requests; submitting a new request from the form adds it to the top of the list |

## Storybook

Stories live next to each component as `*.stories.tsx`; there is one story per component, and every prop is editable from the Controls panel.

| Story | Component |
| --- | --- |
| Atoms/Button | `src/components/atoms/Button` |
| Atoms/InfoBanner | `src/components/atoms/InfoBanner` |
| Atoms/StatusBadge | `src/components/atoms/StatusBadge` |
| Molecules/BalanceCard | `src/components/molecules/BalanceCard` |
| Molecules/ListItem | `src/components/molecules/ListItem` |


## Project structure

```
.
├── .storybook/           # Storybook configuration
├── e2e/                  # Playwright end-to-end tests
├── public/               # Static assets (favicon, web manifest)
├── src/
│   ├── api/              # Mock API (fetchPage, createRequest, decideRequest)
│   │   └── mock/         # Seed JSON data and simulated network delay
│   ├── components/       # Atomic design: atoms/, molecules/, organisms/ (with *.stories.tsx)
│   ├── hooks/            # Shared hooks (usePageTitle)
│   ├── pages/            # Employee, Supervisor, Home(includes the full list of the UI components)
│   ├── state/            # Session and time-off contexts, providers and reducer
│   ├── testUtils/        # Shared unit test helpers
│   ├── theme/            # Ionic theme variables (single colour palette, font-size scale)
│   ├── types/            # Domain and pagination types
│   ├── utils/            # Pure helpers (dates, names, balance)
│   ├── App.tsx           # App shell, session-based routing
│   └── main.tsx          # Entry point
├── capacitor.config.ts   # Capacitor configuration
├── playwright.config.ts  # Playwright configuration
└── vite.config.ts        # Vite and Vitest configuration
```

## Styling and theming

Styles are written in SCSS modules, with each stylesheet kept next to its component. Theme variables are in `src/theme/variables.scss`: every hex value is defined once in a palette, and font sizes use a small scale (`xs` 12px, `sm` 14px, default 16px, `lg` 20px).

## How this project was built

I built this app in short, focused sessions with [Claude Code](https://claude.com/claude-code) as a pair programmer. I set the scope, the design, the architecture and the code standards, and reviewed every change, only the utils/helpers were reviewed in high level.

### Workflow

1. **Research and design first.** Before designing, I studied competitors' products (Deel, Remote, Workable, Oyster and others) on [Mobbin](https://mobbin.com). Based on the report, I then designed the complete product as a Claude artifact ([full design](https://claude.ai/artifact/JcHZURk9m3emsgci4rS3Pw#play-15dd8cd198dd)). This project implements the MVP part of it ([MVP design](https://claude.ai/artifact/YVEGoeUNBRUL8A1qCrHiUY#play-0888ea4ee189)), which is the source of truth for the UI.
2. **Small steps.** Each session handled one task, e.g. one component, one screen or one flow, and ended with a commit.
3. **Checks.** Every change passed typecheck, ESLint and Prettier.
4. **Stories and tests after the features.** Once the MVP worked, I added Storybook stories for the shared components and unit tests for the main employee flow.

### My decisions and what I delegated

**Decided by me**
- **Scope:** the design, and what to cut: the detail screen, StatCard, DecisionNote, undo, error and retry handling (happy path only for now) and toasts.
- **Architecture:**
  - mock data in JSON behind an API layer
  - a reducer and context for state
  - each tab loads its own data when shown
  - pagination only where lists grow (supervisor)
  - a role switch that stands in for login
  - session state that a real login can replace later
- **Code standards:** I defined how the code must be written, and Claude wrote it to these rules. I reviewed every change before committing and publishing it.
  - types tied to the values, not generics
  - small components with little state
  - lightweight SCSS that uses only theme variables

**Delegated to Claude**
- Implementing components, screens and flows from the design, following my instructions and code standards
- The accessibility audit and the fixes I accepted
- Setting up Storybook and writing the stories and unit tests for the components and scenarios I chose
