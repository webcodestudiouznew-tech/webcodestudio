# Deployment Strategy

## Цель

Зафиксировать стандартный способ production deploy для `WebCode`, чтобы запуск был повторяемым, не ломал `SEO`, `i18n`, формы и серверные интеграции.

## Рекомендуемая платформа

Основной путь для проекта: `Vercel`.

Причины:
- проект построен на `Next.js 16 App Router`
- статические и metadata routes (`sitemap`, `robots`, localized pages, `opengraph-image`) нативно поддерживаются
- server actions работают без дополнительной ручной обвязки
- проще поддерживать production deploy, preview deploy и rollback

Альтернативный deploy допустим только если он не ломает:
- `Next.js App Router`
- server actions
- корректный `html lang` для `RU / UZ / EN`
- `sitemap.xml`, `robots.txt`, localized metadata

## Production topology

- Production domain: `https://webcode.uz`
- Canonical production host: `webcode.uz`
- Root redirect: `/ -> /ru`
- Public localized routes:
  - `/ru`
  - `/uz`
  - `/en`
  - `/ru/privacy-policy`
  - `/uz/privacy-policy`
  - `/en/privacy-policy`

## Deployment model

### Branch flow

- `main` — production-ready branch
- feature work — в отдельных ветках
- merge в `main` только после локальной проверки и review по задаче

### Environments

- `Preview` — для проверки UI, локалей, CTA и ручного QA до релиза
- `Production` — только после pre-deploy проверки

## Что должно быть готово до production deploy

### Код и QA

- `npm run lint` проходит без ошибок
- `npm run build` проходит без ошибок
- проверены `RU / UZ / EN`
- проверены desktop / tablet / mobile
- проверены основные `CTA`
- проверена форма заявки
- проверены `metadata`, `canonical`, `alternate`, `html lang`
- подтверждён `permanent redirect` `/ -> /ru`

### SEO-ready release baseline

- доступны `robots.txt` и `sitemap.xml`
- в `sitemap` есть homepage и `privacy-policy` для всех локалей
- `Open Graph` и favicon настроены
- `Privacy Policy` является indexable public page

## Environment variables

Для production должны быть заведены те же env, что и для локальной проверенной интеграции.

### Обязательные для полной работы лид-формы

- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_GROUP_CHAT_ID`

### Поведение при отсутствии env

- форма не должна ломать UI
- запись в `Notion` уходит в `pending_notion`
- `Telegram`-уведомление пропускается или помечается как failed в server flow

Это допустимо только как временный режим pre-production, но не как целевое production-состояние.

## Настройка production в Vercel

1. Подключить репозиторий к `Vercel`.
2. Назначить production branch: `main`.
3. Добавить production domain: `webcode.uz`.
4. Добавить `www.webcode.uz` только если он будет настроен как redirect на canonical host.
5. Заполнить production environment variables:
   - `NOTION_TOKEN`
   - `NOTION_DATABASE_ID`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_GROUP_CHAT_ID`
6. Убедиться, что framework определяется как `Next.js`.
7. Не включать кастомные rewrite/redirect rules, которые конфликтуют с App Router логикой проекта.

## Release sequence

### 1. Pre-deploy

- проверить рабочее дерево и не тащить случайные изменения в релиз
- прогнать `npm run lint`
- прогнать `npm run build`
- проверить production-critical сценарии локально или на preview:
  - homepage для `ru / uz / en`
  - `privacy-policy` для `ru / uz / en`
  - форма заявки
  - `Telegram` / `WhatsApp` CTA
  - `metadata`
  - `html lang`

### 2. Preview deploy

- открыть preview URL
- пройти быстрый smoke test:
  - header
  - hero
  - CTA
  - footer
  - localized routes
  - `privacy-policy`
  - форма

Если preview ломает layout, routing, form flow или metadata, в production не выпускать.

### 3. Production deploy

- мержить только проверенную ветку в `main`
- запускать production deploy из актуального `main`
- после deploy сразу пройти `Docs/Guides/Post-deploy_SEO_checklist.md`

## Post-deploy обязательные проверки

Сразу после deploy:
- открыть `https://webcode.uz/robots.txt`
- открыть `https://webcode.uz/sitemap.xml`
- проверить `https://webcode.uz/` и убедиться, что это `permanent redirect` на `https://webcode.uz/ru`
- проверить:
  - `https://webcode.uz/ru`
  - `https://webcode.uz/uz`
  - `https://webcode.uz/en`
  - privacy pages всех локалей
- отправить `sitemap.xml` в `Google Search Console`
- проверить ключевые URL через `URL Inspection`
- проверить `PageSpeed Insights` / `Core Web Vitals`

## Rollback strategy

Если production deploy ломает форму, SEO-маршруты, локали или критичный UI:

1. Остановить дальнейшие релизные изменения.
2. Откатить production на предыдущий стабильный deployment через платформу деплоя.
3. Проверить:
   - `robots.txt`
   - `sitemap.xml`
   - `/ -> /ru`
   - локали `ru / uz / en`
   - форму заявки
4. Только после этого разбирать проблемный релиз в отдельной ветке.

## Что не делать

- не деплоить в production без `build`-проверки
- не выпускать релиз, если не проверены все три локали
- не менять production domain или canonical host без отдельной SEO-проверки
- не выпускать релиз с незаполненными production env, если задача предполагает рабочую форму и уведомления
- не считать deploy завершённым без post-deploy SEO-проверки

## Минимальный definition of done для deploy-ready состояния

- production branch актуален
- `lint` и `build` проходят
- preview проверен вручную
- production env заполнены
- live domain отвечает корректно
- `robots.txt` и `sitemap.xml` доступны
- `Google Search Console` настроен
- post-deploy checklist пройден
