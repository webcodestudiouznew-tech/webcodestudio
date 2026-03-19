# Elements

## HeroSection
Текущая HERO-секция является эталонным implementation reference для следующих секций.

### Дерево вложенности
```text
HeroSection
├─ HeroBackground
│  ├─ HeroBaseGradient
│  ├─ HeroGlowTop
│  └─ HeroGlowBottom
├─ HeroHeader
│  ├─ HeroBrand
│  │  ├─ HeroBrandLogo
│  │  ├─ HeroBrandTitle
│  │  └─ HeroBrandTagline
│  ├─ HeroNav
│  └─ HeroHeaderActions
│     ├─ LocaleSwitcher
│     └─ HeroHeaderLeadButton
├─ HeroMobileActions
│  ├─ LocaleSwitcher
│  └─ HeroMenuTrigger
├─ HeroMobileMenu
│  ├─ HeroMobileMenuHeader
│  ├─ HeroMobileMenuNav
│  └─ HeroMobileMenuLeadButton
├─ HeroMain
│  ├─ HeroContent
│  │  ├─ HeroBadge
│  │  ├─ HeroTitle
│  │  ├─ HeroMobileVisual
│  │  │  ├─ HeroDecorStars
│  │  │  └─ HeroImage
│  │  ├─ HeroDescription
│  │  └─ HeroCtaGroup
│  │     ├─ HeroPrimaryButton
│  │     └─ HeroSecondaryButton
│  └─ HeroDesktopVisual
│     ├─ HeroDecorStars
│     └─ HeroImage
└─ HeroFeatureList
   ├─ HeroFeatureGrid
   │  ├─ HeroFeatureItem
   │  └─ HeroFeatureItem
   └─ HeroProofGroup
      ├─ HeroOrbitBadge
      └─ HeroStats
         ├─ HeroStatsValue
         ├─ HeroUserStack
         └─ HeroStatsLabel
AudienceSection
├─ AudienceBackground
│  ├─ AudienceTopLine
│  ├─ AudienceGlowLeft
│  └─ AudienceGlowRight
├─ AudienceIntro
│  ├─ AudienceEyebrow
│  ├─ AudienceTitle
│  └─ AudienceDescription
└─ AudienceGrid
   ├─ AudienceCard
   ├─ AudienceCard
   ├─ AudienceCard
   ├─ AudienceCard
   ├─ AudienceCard
   └─ AudienceCard
```

## Header

### Brand block
- Logo image height: `40px`
- Brand title: `18px` mobile, `20px` desktop
- Brand subtitle: `10px` mobile, `11px` tablet, `12px` desktop
- Subtitle text:
  - `ru`: `сайты, которые не теряют заявки`
  - `uz`: localized
  - `en`: localized

### Navigation
- Desktop nav font-size: `14px`
- Desktop nav uses a flat inline row
- Header CTA button font-size: `14px`
- Header includes locale switcher before CTA button

### LocaleSwitcher
- Exists on both desktop and mobile
- Trigger label is only current locale code: `RU`, `UZ`, `EN`
- No arrow icon
- No visible border
- No solid background on trigger
- Dropdown is compact, centered, `w-fit`
- Dropdown items are centered and tightly padded

### Mobile menu
- Fullscreen overlay
- No dropdown-card style
- Close button in top-right corner
- Menu items centered
- Same safe paddings as mobile layout

## HeroContent

### Badge
- Desktop text:
  - `ru`: `CRM, Telegram/WhatsApp интеграция, домен и хостинг - в подарок`
  - `uz`: localized
  - `en`: localized
- Mobile badge uses a dedicated localized key
- Full-width and centered on mobile
- `13px` mobile visual size
- `12px` desktop visual size

### HeroTitle
- `46px` mobile
- `48px` tablet
- `60px` desktop
- `64px` large desktop
- Uses `Manrope`
- Centered on mobile
- Left-aligned on desktop

### HeroDescription
- `16px` mobile
- `18px` desktop
- Centered on mobile
- Left-aligned on desktop

### HeroCtaGroup
- Primary CTA: `Оставить заявку`
- Secondary CTA: `Консультация в Telegram`
- Button text size: `15px`
- Full-width on mobile
- Inline row on desktop

## HeroVisual

### Shared rules
- Uses `Hero_image.png`
- Device visual sits on section background without additional framed container
- Decorative stars float around image
- Entrance animation uses reveal / scale

### Mobile visual
- Placed between `HeroTitle` and `HeroDescription`
- Image scale intentionally larger than default contain for stronger first-screen presence

### Desktop visual
- Separate right column
- Image uses `object-contain`
- Sizes tuned for real rendered width to avoid `next/image` warnings

### Decor stars
- Gold and white stars only
- Pulsing glow effect
- Positioned around visual corners, not randomly across page

## HeroFeatureList

### Feature items
- Two items:
  - `Адаптивный дизайн`
  - `Мультиязычный интерфейс`
- Icon is inline with title, not above
- Icons are plain line graphics without background and border
- Feature title size: `16px`
- Feature description size: `13px - 14px`

### Mobile behavior
- Feature items use soft card treatment for readability

### Desktop behavior
- Feature items appear as structured inline info blocks without heavy card framing

## HeroOrbitBadge
- Circular rotating text badge
- Center uses brand logo, not checkmark
- Text adapts by locale length through:
  - font-size
  - letter-spacing
  - text-length distribution on SVG path
- Small circular marker fills the visual gap between end and start of the text

### Orbit localized texts
- `ru`: `Сервис для локального бизнеса в Узбекистане`
- `uz`: `O'zbekistondagi lokal bizneslar uchun`
- `en`: `Service for local businesses in Uzbekistan`

## HeroStats

### Current structure
- Value chip: `200 +`
- Avatar stack: 3 photos + `+`
- Label under avatars

### Styling
- Value chip:
  - `20px` mobile
  - `22px - 24px` desktop
- Avatar stack has hover effects:
  - slight lift
  - slight scale
  - brightness increase
- Additional spacing exists between value chip and avatar block

### Stats label
- `ru`: `довольных юзеров`
- `uz`: `mamnun foydalanuvchilar`
- `en`: `happy users`
- UZ version must stay on one line

## AudienceSection

### Purpose
- Follows HERO directly
- Explains which offline businesses benefit from the WebCode offer
- Uses the same dark warm background language as HERO, but calmer and more structural

### Structure
- Top intro block:
  - eyebrow
  - section title
  - description
- Bottom:
  - responsive grid of 6 business-category cards

### Typography
- Eyebrow: compact capsule label, `12px`
- Title:
  - `38px`
- Description:
  - `16px` mobile
  - `18px` desktop
- Card title: `20px`
- Card description: `14px - 15px`

### Card behavior
- All business categories are separate cards
- Grid uses `2` columns on medium screens and `3` on desktop
- Cards use soft border, blur and warm translucent fill
- Each card has:
  - icon
  - ordinal number
  - title
  - description
  - CTA button with icon

### Content rules
- Must stay honest and targeted at offline local business
- No fake case studies or invented helper copy
- Section remains fully localized for `RU / UZ / EN`
- Brand name `WebCode` in description stays accent-colored

## Motion

### Entry animation
- HERO uses mount-based reveal, not only static CSS keyframes
- Background glow fades in
- Header, badge, title, description, CTA and lower row reveal with stagger
- Visual block uses reveal + slight scale

### Hover motion
- Nav items:
  - slight lift
  - brightness increase
- Buttons:
  - slight lift
  - brightness increase
- Avatars:
  - lift
  - scale
  - brightness increase

## i18n status for HERO
HERO is localized for:
- `ru`
- `uz`
- `en`

Localized items include:
- brand subtitle
- badge
- nav
- locale switcher aria label
- title
- description
- CTA labels
- feature titles and descriptions
- orbit badge text
- stats label
- placeholder title and description
