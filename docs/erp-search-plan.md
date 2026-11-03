# ERP search visibility

## Positioning

Primary service: custom ERP development, initially illustrated through B2B import and distribution workflows. Primary URL: https://www.limitcode.shop/services/erp.

Initial Thai search terms: รับทำ ERP, รับพัฒนาระบบ ERP, ERP สำหรับธุรกิจนำเข้า, ERP จัดจำหน่าย B2B, พัฒนาระบบ ERP ตามความต้องการ. These are intent hypotheses, not measured search volumes or promised rankings. Use Search Console query data to revise them.

The ERP demo uses sample data. Do not describe it as a live client installation, invent reviews, add unsupported ratings, or promise accounting compliance. Use real project evidence only with permission.

## Technical changes

- The initial homepage HTML contains a complete ERP service name, before animation or JavaScript.
- `/services/erp` has its own canonical, service description, visible demo disclosure, modules, project assessment information, FAQ, Service and BreadcrumbList structured data.
- `robots.txt` allows public pages and JS/CSS for all crawlers, including Googlebot, Bingbot and OAI-SearchBot. API/private exclusions remain. User-agent HTTP tests do not prove a real crawler has visited or that all crawler IPs are accepted by a CDN.
- Demo screens remain available and followable, with explicit `noindex`; they are not marketing landing pages. `noindex` is not authentication or access control.
- Sitemap includes five canonical marketing pages. Rebuild dates are not represented as content modification dates. Cookie-based translations do not claim separate hreflang URLs.
- Structured data contains factual services, not rankings or review scores. No `llms.txt` or special AI schema is needed to qualify for Google AI features.

## After production deployment

1. Run `npm run seo:submit`. It first verifies the deployed public IndexNow ownership file and sitemap. HTTP 200 means URLs were received; HTTP 202 means ownership verification is pending. Neither means indexed or ranked. The request reaches participating IndexNow search engines, not Google's URL Inspection service.
2. Connect the owner-controlled Google Search Console property. Use Domain verification through DNS or URL-prefix verification for `https://www.limitcode.shop/`. If using HTML meta verification, set `GOOGLE_SITE_VERIFICATION` in Vercel and redeploy. Never put a password or Google access token in that variable.
3. Submit `https://www.limitcode.shop/sitemap.xml` in Search Console and inspect the ERP service URL. Confirm the Google-selected canonical, indexing status, and any crawl errors. A Search Console connection or request has not been completed merely by adding metadata support.
4. Optionally connect Bing Webmaster Tools using `BING_SITE_VERIFICATION` for its HTML verification code. IndexNow does not create a Bing Webmaster Tools account or reporting property.
5. Record weekly impressions, search queries, average position, clicks and qualified inquiries. Rank varies by query, location and search context. There is no fixed page-one deadline or guarantee of AI citations.
6. Add evidence as it becomes available: approved case studies showing the original workflow, delivered screens, migration work, and measured outcomes. Keep demo examples clearly labelled. Seek relevant independent mentions; do not buy ranking links or manufacture reviews.

## Official references

- Google AI features and website requirements: https://developers.google.com/search/docs/appearance/ai-features
- Google Search Essentials: https://developers.google.com/search/docs/essentials
- OpenAI crawler controls: https://developers.openai.com/api/docs/bots
- Bing Webmaster Guidelines: https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a
- IndexNow protocol and receipt meanings: https://www.indexnow.org/documentation
