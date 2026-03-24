# SEO задачи перед деплоем

## Цель
Закрыть оставшиеся SEO-задачи перед production deploy для мультиязычного лендинга `ru / uz / en` без слома текущей архитектуры на `Next.js App Router + next-intl`.

## Ограничения
- Не менять дизайн и структуру секций без необходимости.
- Не переписывать marketing copy, кроме точечных SEO-правок.
- Не добавлять новые dependencies без крайней необходимости.
- Сохранить текущую App Router архитектуру.
- После изменений обязательно запустить:
  - `npm run lint`
  - `npm run build`

---

## 1. Заменить временный redirect `/` на permanent redirect
**Приоритет:** критично

### Что сделать
- В `app/(root)/page.tsx` заменить текущий `redirect("/ru")` на `permanentRedirect("/ru")`.

### Ожидаемый результат
- `/` отдает permanent redirect на `/ru`.
- Routing не ломается.
- Build проходит.

---

## 2. Сделать реальную страницу Privacy Policy
**Приоритет:** критично

### Что сделать
- Создать публичную страницу Privacy Policy для всех локалей:
  - `/ru/...`
  - `/uz/...`
  - `/en/...`
- Подключить страницу через текущую localized routing логику.
- Добавить для страницы localized metadata:
  - `title`
  - `description`
  - `canonical`
  - `alternate languages`
- В `footer` заменить текущую dummy button на реальную ссылку.

### Где смотреть
- `components/sections/footer-section.tsx`
- localized routes
- `messages/ru.json`
- `messages/uz.json`
- `messages/en.json`

### Ожидаемый результат
- Privacy Policy существует как обычная indexable page.
- В footer стоит реальная ссылка.
- Metadata локализована.

---

## 3. Обновить sitemap
**Приоритет:** высокий

### Что сделать
- В `app/sitemap.ts` добавить в sitemap не только homepage, но и Privacy Policy для всех локалей.
- Оставить absolute canonical URLs.
- Сохранить корректные `alternate language URLs`.

### Ожидаемый результат
- В sitemap есть:
  - localized homepage
  - localized privacy page

---

## 4. Локализовать Open Graph image
**Приоритет:** высокий

### Что сделать
- Сделать `opengraph-image` locale-aware.
- Для `ru`, `uz`, `en` social preview должен быть на соответствующем языке.
- Не ломать текущую metadata wiring.

### Где смотреть
- `app/opengraph-image.tsx`
- SEO helpers
- localized metadata logic

### Ожидаемый результат
- Для каждой локали Open Graph preview соответствует языку страницы.

---

## 5. Сделать footer year динамическим
**Приоритет:** средний

### Что сделать
- В `components/sections/footer-section.tsx` убрать hardcoded year.
- Подставлять текущий год динамически.

### Ожидаемый результат
- В footer больше нет устаревшего года.

---

## 6. Локализовать WhatsApp prefilled message
**Приоритет:** средний

### Что сделать
- Вынести prefilled WhatsApp message в locale-aware логику.
- Для `ru`, `uz`, `en` использовать естественный текст.
- Не менять номер и общую contact logic.

### Где смотреть
- `lib/contact-links.ts`
- CTA/components, где используется WhatsApp link
- locale messages

### Ожидаемый результат
- На каждой локали открывается WhatsApp с соответствующим текстом.

---

## 7. Не сломать текущий H1
**Приоритет:** обязательно проверить

### Что сделать
- Проверить, что на homepage остается один понятный `H1`.
- Не ломать текущую SEO-safe реализацию в `hero-section`.
- Не превращать decorative heading обратно в проблемный `H1`.

### Где смотреть
- `components/sections/hero-section.tsx`

### Ожидаемый результат
- Один корректный `H1` остается на странице.
- Accessibility и SEO не ухудшаются.

---

## Финальная проверка
Перед завершением убедиться, что:

- [ ] `/` использует `permanentRedirect("/ru")`
- [ ] Privacy Policy page есть для `ru / uz / en`
- [ ] В footer Privacy Policy ведет на реальную страницу
- [ ] У Privacy Policy есть localized metadata
- [ ] Sitemap включает homepage и privacy page для всех локалей
- [ ] Open Graph image работает с учетом локали
- [ ] Footer year динамический
- [ ] WhatsApp prefilled message зависит от локали
- [ ] Homepage `H1` не сломан
- [ ] `npm run lint` проходит
- [ ] `npm run build` проходит

---

## Что вернуть в ответе
После выполнения задачи вернуть:
1. Краткое summary изменений
2. Список измененных файлов
3. Подтверждение, что `lint` и `build` прошли
4. Короткий список post-deploy SEO рекомендаций