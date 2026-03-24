# Vercel Deploy Checklist

## Перед первым deploy

- [ ] Изменения в проекте завершены и готовы к релизу.
- [ ] Нужный код уже в `main`.
- [ ] Локально проходит `npm run lint`.
- [ ] Локально проходит `npm run build`.
- [ ] Проверены `RU / UZ / EN`.
- [ ] Проверены `desktop / tablet / mobile`.
- [ ] Проверены все основные `CTA`.
- [ ] Проверена форма заявки.
- [ ] Проверены `metadata`, `canonical`, `alternate`, `html lang`.
- [ ] Подтвержден redirect `/ -> /ru`.

## Подключение проекта к Vercel

- [ ] Репозиторий импортирован в `Vercel`.
- [ ] `Framework Preset` определился как `Next.js`.
- [ ] `Production Branch` установлена в `main`.
- [ ] Не добавлены лишние кастомные build settings без необходимости.

## Environment variables

- [ ] В `Vercel` добавлен `NOTION_TOKEN`.
- [ ] В `Vercel` добавлен `NOTION_DATABASE_ID`.
- [ ] В `Vercel` добавлен `TELEGRAM_BOT_TOKEN`.
- [ ] В `Vercel` добавлен `TELEGRAM_GROUP_CHAT_ID`.
- [ ] Env заданы хотя бы для `Production`.
- [ ] Если нужен preview test формы, env также заданы для `Preview`.

## Домен и DNS

- [ ] В `Vercel` добавлен домен `webcode.uz`.
- [ ] `www.webcode.uz` добавлен только если будет redirect на основной домен.
- [ ] DNS-записи добавлены ровно так, как показал `Vercel`.
- [ ] В `Vercel` домен перешёл в статус `Valid`.

## После первого deploy на vercel.app

- [ ] Открывается временный URL `Vercel`.
- [ ] Сайт не падает с ошибкой.
- [ ] Открываются `/ru`, `/uz`, `/en`.
- [ ] Открываются privacy pages.
- [ ] Работает форма заявки.

## После подключения production domain

- [ ] Открывается `https://webcode.uz`.
- [ ] `/` отдаёт `308` или другой permanent redirect на `/ru`.
- [ ] Открывается `https://webcode.uz/ru`.
- [ ] Открывается `https://webcode.uz/uz`.
- [ ] Открывается `https://webcode.uz/en`.
- [ ] Открывается `https://webcode.uz/ru/privacy-policy`.
- [ ] Открывается `https://webcode.uz/uz/privacy-policy`.
- [ ] Открывается `https://webcode.uz/en/privacy-policy`.

## SEO и индексация сразу после публикации

- [ ] Доступен `https://webcode.uz/robots.txt`.
- [ ] Доступен `https://webcode.uz/sitemap.xml`.
- [ ] В `sitemap.xml` видны homepage и privacy pages для всех локалей.
- [ ] Сайт добавлен в `Google Search Console`.
- [ ] В `Search Console` отправлен `sitemap.xml`.
- [ ] Через `URL Inspection` проверены главные страницы локалей.
- [ ] Через `URL Inspection` проверены privacy pages локалей.

## Финальная ручная проверка

- [ ] Проверен header.
- [ ] Проверен hero.
- [ ] Проверен footer.
- [ ] Проверены кнопки `Telegram` и `WhatsApp`.
- [ ] Проверена форма с реальной отправкой.
- [ ] Проверен favicon.
- [ ] Проверен social preview.
- [ ] Проверен `html lang` для `ru / uz / en`.

## Если что-то пошло не так

- [ ] Проверены build logs в `Vercel`.
- [ ] Проверены runtime / function logs.
- [ ] Проверены env.
- [ ] Проверены DNS-записи.
- [ ] Если production сломан, выполнен rollback на предыдущий stable deploy.
