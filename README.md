# Time Off Manager

A mobile app for managing time off, built with [Ionic React](https://ionicframework.com/docs/react) and [Capacitor](https://capacitorjs.com/).

> **Status:** early setup. The project is currently the Ionic blank starter (a single `Home` page) and is ready for feature development.

## Tech stack

- **UI:** Ionic React 9, React 19, Ionicons
- **Routing:** React Router 6 via `@ionic/react-router`
- **Build tooling:** Vite 8, TypeScript 5.9
- **Native runtime:** Capacitor 8 (App, Haptics, Keyboard, Status Bar plugins)
- **Testing:** Vitest + Testing Library (unit), Playwright (end-to-end)
- **Code quality:** ESLint (`@ionic/eslint-config`), Prettier (`@ionic/prettier-config`)

## Getting started

### Prerequisites

- Node.js (a current LTS release) and npm
- Optional, for native builds: Android Studio and/or Xcode

### Install and run

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

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

## Testing

**Unit tests** live next to the source as `src/**/*.test.tsx` and run in a jsdom environment (setup in `src/setupTests.ts`).

**End-to-end tests** live in `e2e/` and run against the dev server using a mobile Chrome (Pixel 7) profile. Playwright starts the dev server automatically. Before the first run, install the browser:

```bash
npx playwright install --with-deps chromium
npm run test:e2e
```

## Building for mobile

Capacitor serves the web build from `dist/`. To add and run a native platform:

```bash
npm run build
npx cap add android   # or: npx cap add ios
npx cap sync
npx cap open android  # or: npx cap open ios
```

After changing web code, run `npm run build && npx cap sync` to update the native projects.

> Before publishing, change `appId` in `capacitor.config.ts` from the starter default `io.ionic.starter` to your own identifier.

## Project structure

```
.
├── e2e/                  # Playwright end-to-end tests
├── public/               # Static assets (favicon, web manifest)
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Routed pages (Home)
│   ├── theme/            # Ionic theme variables
│   ├── App.tsx           # App shell and routes
│   └── main.tsx          # Entry point
├── capacitor.config.ts   # Capacitor configuration
├── playwright.config.ts  # Playwright configuration
└── vite.config.ts        # Vite and Vitest configuration
```

## Theming

Theme variables are in `src/theme/variables.css`. Dark mode follows the system setting (`dark.system.css` in `src/App.tsx`); see the [Ionic dark mode docs](https://ionicframework.com/docs/theming/dark-mode) to change this.
