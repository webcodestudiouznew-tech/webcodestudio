# notion_leads_integration.md

Документ описывает стандартный процесс подключения формы заявок WebCode к `Notion`.

Этот guide относится только к интеграции лид-формы с `Notion` и не заменяет:
- `WebCode_landind_PRD.md` как источник контента и текстов
- `Guides/conversion_standards.md` как источник conversion-правил
- `Guides/accessibility_and_quality.md` как источник финального quality baseline

## 1. Текущая реализация в проекте

Сохранение заявок реализовано через server action:
- [app/actions/lead-form.ts](/mnt/e/DEV/webcodestudio/app/actions/lead-form.ts)

Форма отправляет поля:
- `name`
- `phone`
- `telegram`
- `niche`
- `locale`

Server action:
- валидирует данные через `zod`
- собирает payload для `Notion API`
- пишет лид в database через `https://api.notion.com/v1/pages`

Используемые env-переменные:
- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`

Названия env зафиксированы в:
- [contact-links.ts](/mnt/e/DEV/webcodestudio/lib/contact-links.ts)

## 2. Что нужно от пользователя для подключения

Для реального подключения нужны:
- `NOTION_TOKEN` от `internal integration`
- `NOTION_DATABASE_ID`
- подтверждение, что integration добавлена в нужную базу
- подтверждение схемы database properties

Без этих данных форма может работать только в fallback-режиме без записи в `Notion`.

## 3. Как получить `NOTION_TOKEN`

1. В `Notion` создать `Internal Integration`.
2. Скопировать `Internal Integration Token`.
3. Хранить токен только в локальном или серверном env, не в коде.

## 4. Как получить `NOTION_DATABASE_ID`

1. Открыть нужную базу `Notion` в браузере.
2. Скопировать ссылку на базу.
3. Взять длинный идентификатор базы из URL.

Пример:
```text
https://www.notion.so/workspace/32c9b7ddd64180d48544e2392caf628e?v=...
```

Здесь `database_id`:
```text
32c9b7ddd64180d48544e2392caf628e
```

Важно открывать именно базу, а не отдельную запись внутри базы.

## 5. Как подготовить базу в Notion

Integration должна быть добавлена в саму базу, иначе API-запись не сработает.

Рекомендуемая схема базы:
- `Name` — `title`
- `Phone` — `phone_number` или `rich_text`
- `Telegram` — `rich_text`
- `Business Niche` — `rich_text` или `select`
- `Source` — `select` или `rich_text`
- `Created At` — `date`

Текущая реализация в проекте отправляет:
- `Name` как `title`
- `Phone` как `phone_number`
- `Telegram` как `rich_text`
- `Business Niche` как `rich_text`
- `Source` как `rich_text`
- `Created At` как `date`

Если схема базы меняется, нужно синхронно обновить mapping в `app/actions/lead-form.ts`.

## 6. Как подключить env в проект

Локально использовать:
- `.env.local`

Пример:
```env
NOTION_TOKEN=your_notion_token
NOTION_DATABASE_ID=your_database_id
```

`.env.local` не должен коммититься в репозиторий.

Для production-like окружения те же значения должны быть добавлены в env платформы деплоя.

## 7. Как работает отправка

Текущий flow:
1. Пользователь отправляет форму.
2. `submitLeadForm` валидирует данные.
3. Формируется payload для `Notion`.
4. Выполняется `POST` запрос в `Notion API`.
5. При успехе форма получает `destination: "notion"`.
6. При отсутствии env форма может вернуться в `pending_notion`.

## 8. Что проверять после подключения

После подключения нужно проверить:
- форма успешно отправляется без server error
- запись реально появляется в нужной базе `Notion`
- поля раскладываются по правильным колонкам
- `locale` корректно попадает в `Source`
- optional fields корректно обрабатываются пустыми
- success-state формы показывается пользователю

## 9. Что делать при ошибке

Если запись не проходит:
- проверить, что integration добавлена в базу
- проверить правильность `NOTION_TOKEN`
- проверить правильность `NOTION_DATABASE_ID`
- проверить названия database properties
- проверить типы database properties
- посмотреть server logs из `submitLeadForm`

Если `Notion` возвращает ошибку по property schema, сначала нужно исправить database schema или mapping в `lead-form.ts`, а не отключать валидацию формы.

## 10. Security Notes

- Никогда не хранить `NOTION_TOKEN` в клиентском коде.
- Не коммитить реальные credentials в git.
- Если токен был передан в открытом виде, после настройки желательно сделать его ротацию.

## 11. Когда обновлять этот документ

Обновлять guide, если меняется хотя бы одно из условий:
- состав полей формы
- mapping полей в `Notion`
- названия env-переменных
- типы database properties
- маршрут server action
- fallback-логика при отсутствии `Notion`
