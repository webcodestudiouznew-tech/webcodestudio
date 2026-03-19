# WebCode

WebCode is a multilingual landing page for a web studio focused on offline local businesses in Uzbekistan.

Current status:
- Next.js 16 project scaffold is ready
- `next-intl` is configured for `ru / uz / en`
- HERO section is implemented and approved as the design reference for the rest of the landing

## Stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- next-intl
- react-hook-form
- zod
- ESLint

## Scripts
```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Local Development
1. Install dependencies:
```bash
npm install
```

2. Start the dev server:
```bash
npm run dev
```

3. Open:
```text
http://localhost:3000
```

Localized routes:
- `/ru`
- `/uz`
- `/en`

## Project Structure
```text
app/                App Router pages and layouts
components/         UI and landing sections
Docs/               Project docs and workflow docs
i18n/               next-intl routing and navigation config
lib/                Shared project utilities
messages/           Locale messages for ru / uz / en
public/             Static assets
```

## Key Files
- [`Docs/AGENTS.md`](./Docs/AGENTS.md): project rules and working conventions
- [`Docs/Roadmap.md`](./Docs/Roadmap.md): roadmap and current stage
- [`Docs/design_direction.md`](./Docs/design_direction.md): design code for the project
- [`Docs/elements.md`](./Docs/elements.md): approved element structure and HERO spec
- [`Docs/done_criteria.md`](./Docs/done_criteria.md): definition of done
- [`Docs/webcode_content_only.md`](./Docs/webcode_content_only.md): content source

## Current UI Status
The current design system is based on the approved HERO section.

What is already established:
- dark premium product-style background
- gold accent system
- `Manrope + Inter`
- desktop and mobile HERO layouts
- locale switcher
- motion and hover behavior
- localized content for `ru / uz / en`

All next sections should follow:
- [`Docs/design_direction.md`](./Docs/design_direction.md)
- [`Docs/elements.md`](./Docs/elements.md)

## i18n
The project uses localized routes and locale message files:
- [`messages/ru.json`](./messages/ru.json)
- [`messages/uz.json`](./messages/uz.json)
- [`messages/en.json`](./messages/en.json)

Routing config:
- [`i18n/routing.ts`](./i18n/routing.ts)
- [`i18n/navigation.ts`](./i18n/navigation.ts)

## Quality
Before shipping changes:
```bash
npm run lint
npm run build
```

## Repository
GitHub:
- `git@github.com:Baytukalov/webcodestudio.git`
