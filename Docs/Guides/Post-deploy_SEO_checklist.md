# Post-deploy SEO checklist

## Сразу после deploy
- [ ] Открыть `robots.txt` и `sitemap.xml` на live-домене и убедиться, что они доступны без ошибок.
- [ ] Проверить, что `/` делает `permanent redirect` на `/ru`.
- [ ] Проверить, что открываются:
  - `/ru`
  - `/uz`
  - `/en`
  - все public SEO pages, включая `Privacy Policy`

## Google Search Console
- [ ] Добавить сайт в Google Search Console.
- [ ] Предпочтительно добавить **Domain property**, чтобы видеть данные по всему домену и поддоменам.
- [ ] Подтвердить ownership сайта.
- [ ] Отправить `sitemap.xml` через раздел **Sitemaps**. Google рекомендует использовать fully-qualified absolute URLs в sitemap, а отправка sitemap в Search Console помогает увидеть, когда Googlebot его прочитал и есть ли ошибки обработки. :contentReference[oaicite:0]{index=0}

## Проверка индексации
- [ ] В **URL Inspection** проверить:
  - homepage каждой локали
  - privacy page каждой локали
  - redirect `/ -> /ru`
- [ ] При необходимости нажать **Request indexing** для ключевых URL.
- [ ] Проверить отчет **Page indexing** и убедиться, что важные страницы индексируются без неожиданных статусов. URL Inspection показывает, что Google знает о конкретной странице, позволяет тестировать live URL и запрашивать indexing; отчет Page indexing показывает, сколько страниц Google пытался crawl и index на уровне сайта. :contentReference[oaicite:1]{index=1}

## Скорость и качество
- [ ] Проверить live-сайт в PageSpeed Insights / Core Web Vitals report.
- [ ] Особое внимание:
  - `LCP` ≤ 2.5 s
  - `INP` < 200 ms
  - `CLS` < 0.1
- [ ] Если hero image тяжелая, оптимизировать её в первую очередь. Google рекомендует добиваться good Core Web Vitals; ориентиры для good UX: LCP до 2.5 s, INP ниже 200 ms и CLS ниже 0.1. :contentReference[oaicite:2]{index=2}

## Через 1–2 недели
- [ ] Проверить, появились ли impressions и queries в Search Console.
- [ ] Посмотреть, какие локали и какие URL реально получают показы.
- [ ] Проверить CTR у главных страниц.
- [ ] На основе реальных queries сделать второй semantic pass по:
  - `title`
  - `description`
  - `H1`
  - hero copy
  - FAQ. Данные в Search Console начинают накапливаться не мгновенно; Google отмечает, что обычно требуется несколько дней, прежде чем данные начнут появляться для property. :contentReference[oaicite:3]{index=3}

## Что не обязательно делать сразу
- [ ] Не плодить много новых страниц в первый день без данных.
- [ ] Не усложнять schema без необходимости.
- [ ] Не переписывать весь сайт под десятки ключей до появления реальных queries из Search Console.