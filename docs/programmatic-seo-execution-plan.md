# InvoiceWala programmatic SEO execution plan

Audit date: 2026-07-05  
Repositories: `invoice-maker2`, `invoice-backend`  
Preferred origin: `https://invoicewala.shop`

## Executive decision

Build the template program in `invoice-maker2` as statically generated App Router pages backed by a typed, version-controlled content registry. Do not put the first 100 pages in MySQL or expose them through `invoice-backend`: the content changes with deployments, needs code review, and should build without an API/database dependency. Add a database-backed editorial workflow only after non-developers need to publish independently.

Use one canonical route family:

- Template hub: `/invoice-templates`
- Category pages: `/invoice-templates/[slug]`
- Calculators: `/tools/[slug]`
- Guides: `/blog/[slug]`

Do not add more root-level programmatic routes. Keep existing root pages live and migrate them with one-hop 301 redirects only after the new category page has been indexed and the redirect map has been tested.

## Audit findings

### What already works

- Next.js 16 App Router builds successfully: 88 static/generated pages plus one dynamic invoice edit route.
- The live sitemap contains 52 canonical URLs.
- `http://`, `http://www.`, and `https://www.` each return a direct 301 to `https://invoicewala.shop/`. The non-`www` origin is already correct in metadata, schema, robots, and sitemap.
- Existing public pages have canonical tags. `metadataBase` is set to the preferred origin.
- Five requested calculators already exist and are indexable: GST, profit, margin, discount, and tax.
- Breadcrumb, FAQ, HowTo, WebApplication, Article, Organization, and Website schema helpers already exist.
- Legacy aliases such as `/gst-calculator` and `/online-invoice-maker` are permanently redirected and excluded from the sitemap.
- `generateStaticParams()` already proves the static programmatic route pattern.

### Issues to fix before scaling

| Severity | Finding | Evidence | Required action |
|---|---|---|---|
| P0 | Keyword cannibalization | `/freelancer-invoice-template` and `/blog/freelancer-invoice-template` are both in the sitemap. Similar overlap exists between contractor/electrician guides and future template pages. | Assign one URL per primary intent. Template pages own “template/format”; blog pages own informational questions and link to the template. Redirect or retarget overlaps. |
| P0 | Programmatic content is a monolith | `lib/seo-pages.ts` is 1,000+ lines and mixes landing pages, calculators, comparisons, and aliases. | Split data by page family and validate it at build time. |
| P0 | No actual category architecture | Only one dedicated root template page exists; the requested categories are absent. | Add `/invoice-templates` and `/invoice-templates/[slug]`, then ship in quality-controlled batches. |
| P1 | Redirected pages remain in the SEO registry | Nine root records are also redirect sources in `next.config.ts`. | Move aliases to a dedicated redirect registry; never treat aliases as publishable content. |
| P1 | Sitemap timestamps are deployment timestamps | Every static/SEO/tool URL receives `new Date()`, implying every URL changed on every deployment. | Store `updatedAt` per record and emit it; omit `lastModified` when unknown. |
| P1 | Schema is selected manually per record | The current generic route trusts a `schema` string array and duplicates schema helper logic. | Derive schema by page type and use the shared `lib/seo-schemas.ts` helpers. |
| P1 | Tool SEO content is not reusable yet | The rich `ToolSeoContent` data exists only for GST; most tools repeat page/schema wiring. | Create a tool definition registry and a single route renderer. Keep calculator UI components pluggable. |
| P1 | Missing business expense calculator | Requested tool does not exist. | Add `/tools/business-expense-calculator`. |
| P1 | Weak metadata checks | At least seven SEO descriptions are under 120 characters and one title is 67 characters. | Add build-time title/description uniqueness and length checks. Treat ranges as guardrails, not ranking factors. |
| P2 | Private routes are crawl-blocked but not explicitly noindex | robots disallows account areas; layouts do not declare `robots: noindex`. | Add `robots: { index: false, follow: false }` to `(app)` and `(auth)` layouts. Do not rely on robots.txt alone for deindexing. |
| P2 | No breadcrumb UI on generic landing pages | Breadcrumb schema exists, but users do not see a matching breadcrumb trail. | Render visible breadcrumbs that match structured data. |
| P2 | Root route namespace can collide | `[seoSlug]` shares the root with product pages and future routes. | Freeze it for legacy landings; all new page families get explicit folders. |
| P2 | No content quality gate | Nothing detects repeated blocks, thin records, broken internal links, or orphan pages. | Add `scripts/validate-seo-content.ts` and fail CI on violations. |

## Target folder structure

```text
invoice-maker2/
├── app/
│   ├── (app)/layout.tsx                         # explicit noindex
│   ├── (auth)/layout.tsx                        # explicit noindex
│   ├── invoice-templates/
│   │   ├── page.tsx                             # collection hub
│   │   └── [slug]/page.tsx                      # SSG category page
│   ├── tools/
│   │   ├── page.tsx                             # tool hub
│   │   ├── gst-calculator/...
│   │   ├── profit-calculator/...
│   │   ├── margin-calculator/...
│   │   ├── discount-calculator/...
│   │   ├── tax-calculator/...
│   │   └── business-expense-calculator/
│   │       ├── page.tsx
│   │       └── BusinessExpenseCalculatorClient.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/seo/
│   ├── Breadcrumbs.tsx
│   ├── FaqSection.tsx
│   ├── InternalLinkCluster.tsx
│   ├── JsonLd.tsx                               # existing
│   ├── RelatedTemplates.tsx
│   └── TemplatePage.tsx
├── components/tools/
│   ├── CalculatorShell.tsx
│   ├── ToolPageLayout.tsx                       # existing, refactor
│   └── ToolSeoContent.tsx                       # existing, generalize
├── content/seo/
│   ├── invoice-templates/
│   │   ├── index.ts
│   │   ├── home-services.ts
│   │   ├── professional-services.ts
│   │   ├── creative-digital.ts
│   │   ├── health-beauty.ts
│   │   ├── retail-hospitality.ts
│   │   └── transport-industrial.ts
│   ├── calculators.ts
│   ├── legacy-landings.ts
│   └── redirects.ts
├── lib/seo/
│   ├── constants.ts                             # SITE_URL only
│   ├── metadata.ts
│   ├── schemas.ts
│   ├── selectors.ts
│   ├── slug.ts
│   └── types.ts
└── scripts/
    ├── audit-routes.ts
    └── validate-seo-content.ts

invoice-backend/
└── database/migrations/
    └── 013_seo_content.sql                      # phase 2 only, if CMS needed
```

## Content schema

Start with this TypeScript source-of-truth:

```ts
export type InvoiceTemplatePage = {
  kind: "invoice-template";
  slug: string;
  status: "draft" | "published" | "noindex";
  category: TemplateCategory;
  profession: string;
  audience: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  description: string;
  h1: string;
  intro: string[];
  requiredFields: Array<{ name: string; reason: string }>;
  sampleItems: Array<{ description: string; unit: string; rate?: string }>;
  taxNotes: string[];
  paymentTerms: string[];
  mistakes: Array<{ title: string; body: string }>;
  steps: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
  relatedTools: string[];
  cta: { label: string; href: string };
  reviewedBy?: string;
  publishedAt: string;
  updatedAt: string;
};
```

If a CMS becomes necessary, mirror it rather than inventing a second model:

```sql
CREATE TABLE seo_pages (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  page_type ENUM('invoice_template','calculator','guide') NOT NULL,
  slug VARCHAR(160) NOT NULL,
  status ENUM('draft','published','noindex') NOT NULL DEFAULT 'draft',
  title VARCHAR(180) NOT NULL,
  description VARCHAR(320) NOT NULL,
  h1 VARCHAR(220) NOT NULL,
  primary_keyword VARCHAR(180) NOT NULL,
  content JSON NOT NULL,
  published_at DATETIME NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_seo_page_type_slug (page_type, slug),
  INDEX idx_seo_page_status_updated (status, updated_at)
);

CREATE TABLE seo_redirects (
  source_path VARCHAR(255) PRIMARY KEY,
  destination_path VARCHAR(255) NOT NULL,
  status_code SMALLINT NOT NULL DEFAULT 308,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Do not generate prose at request time. Generated/drafted copy must be reviewed, committed, and statically rendered. This avoids unstable pages and lets CI detect duplication.

## Route implementation

```ts
// app/invoice-templates/[slug]/page.tsx
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedTemplates().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getTemplateBySlug((await params).slug);
  if (!page || page.status !== "published") return {};
  const canonical = `${SITE_URL}/invoice-templates/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    openGraph: { title: page.title, description: page.description, url: canonical },
  };
}

export default async function Page({ params }: PageProps) {
  const page = getTemplateBySlug((await params).slug);
  if (!page || page.status !== "published") notFound();
  return <TemplatePage page={page} />;
}
```

Rules:

1. `slugify()` must lowercase, normalize Unicode, replace `&` with `and`, collapse separators, and reject duplicate/reserved slugs.
2. Canonicals are absolute and self-referencing on every indexable page.
3. `dynamicParams = false` prevents unknown categories from becoming soft-404 variants.
4. The hub links to every published category; each category links to 4–8 genuinely related categories, 2–3 tools, and one supporting guide.
5. Breadcrumb UI and schema use the same data: Home → Invoice templates → Profession.
6. Template pages use `BreadcrumbList` and `FAQPage`. Use `HowTo` only when the visible steps genuinely constitute a task. Do not use `Article` for template/product pages; reserve `Article` for editorial guides.
7. FAQ schema must exactly match visible FAQs. Rich-result eligibility is not guaranteed and should not be the reason to publish FAQs.

## Reusable content framework

Every template page must contain profession-specific value, not token substitution:

- Unique opening tied to how that profession bills.
- Required invoice fields and why each matters.
- 5–10 realistic line items with relevant units (hours, visits, square feet, kilometres, pieces, sessions, etc.).
- GST/tax note appropriate to goods/services and a clear “confirm with a tax professional” boundary.
- Payment terms and deposit/milestone advice for that trade.
- Common billing mistakes unique to the profession.
- A worked invoice example or preview prefilled into the invoice generator.
- 5–8 non-duplicated FAQs based on the actual search intent.
- Related templates/tools selected by taxonomy, not random links.

Metadata formulas are fallbacks, not final copy:

```ts
const title = page.title || `${page.profession} Invoice Template | Free GST PDF`;
const description = page.description ||
  `Create a ${page.profession.toLowerCase()} invoice with GST fields, sample line items and payment terms. Preview it online and download a professional PDF.`;
```

Quality gate for publication:

- Exactly one H1; title, description, H1, and primary keyword are unique.
- Title approximately 35–60 characters; description approximately 120–160 characters.
- At least 700 useful words or a documented exception for a highly functional page.
- At least five profession-specific line items, three specific tips, and five FAQs.
- No content block has >70% normalized similarity with another template page.
- All `relatedSlugs` and links resolve; no page is orphaned.
- Canonical URL equals its sitemap URL; redirected/noindex pages never enter the sitemap.
- No unsupported claims, fake reviews, or invented tax/legal requirements.

## Initial 100 template categories

Publish in batches of 10–20 after quality review; do not release 100 near-duplicate pages at once.

### Home and field services (1–20)

1. Plumber
2. Electrician
3. HVAC technician
4. Carpenter
5. Painter
6. Roofer
7. Mason
8. Welder
9. Handyman
10. Pest control service
11. Cleaning service
12. Housekeeping service
13. Landscaping service
14. Gardening service
15. Appliance repair service
16. Mobile repair service
17. Computer repair service
18. CCTV installation service
19. Solar installation service
20. Interior designer

### Construction and property (21–35)

21. General contractor
22. Construction contractor
23. Civil contractor
24. Labour contractor
25. Electrical contractor
26. Plumbing contractor
27. Flooring contractor
28. Waterproofing contractor
29. Architect
30. Structural engineer
31. Property manager
32. Real estate agent
33. Rental property owner
34. Home inspector
35. Surveyor

### Freelance and professional services (36–55)

36. Freelancer
37. Consultant
38. Management consultant
39. Business consultant
40. IT consultant
41. Marketing consultant
42. Financial consultant
43. HR consultant
44. Chartered accountant
45. Bookkeeper
46. Lawyer
47. Legal consultant
48. Insurance agent
49. Virtual assistant
50. Recruiter
51. Translator
52. Tutor
53. Coach
54. Event planner
55. Travel agent

### Creative and digital services (56–70)

56. Photographer
57. Wedding photographer
58. Videographer
59. Graphic designer
60. Web designer
61. Web developer
62. Software developer
63. App developer
64. Content writer
65. Copywriter
66. Social media manager
67. SEO consultant
68. Digital marketing agency
69. Advertising agency
70. Printing service

### Health, wellness, and personal care (71–82)

71. Salon
72. Beauty parlour
73. Barber shop
74. Makeup artist
75. Spa
76. Gym
77. Personal trainer
78. Yoga instructor
79. Physiotherapist
80. Dentist
81. Clinic
82. Nutritionist

### Retail, hospitality, and events (83–92)

83. Restaurant
84. Cafe
85. Caterer
86. Bakery
87. Hotel
88. Guest house
89. Retail shop
90. Wholesale business
91. Ecommerce seller
92. Wedding decorator

### Transport, automotive, and industrial (93–100)

93. Transport company
94. Trucking company
95. Courier service
96. Logistics company
97. Taxi service
98. Car rental service
99. Auto repair shop
100. Manufacturer

Suggested slug format is `<profession>-invoice-template`, for example `/invoice-templates/plumber-invoice-template`. Use the shorter profession noun in navigation labels.

## Calculator architecture

Current status:

| Calculator | Current URL | Work |
|---|---|---|
| GST | `/tools/gst-calculator` | Keep; use as quality reference. |
| Profit | `/tools/profit-calculator` | Keep; move content to shared registry. |
| Margin | `/tools/margin-calculator` | Keep; move content to shared registry. |
| Discount | `/tools/discount-calculator` | Keep; move content to shared registry. |
| Tax | `/tools/tax-calculator` | Keep; clarify it is a generic transaction-tax tool, not income-tax advice. |
| Business expense | Missing | Build first. |

Use a calculator definition that separates UI logic from SEO content:

```ts
type CalculatorDefinition = {
  slug: string;
  title: string;
  description: string;
  headline: string;
  component: "gst" | "profit" | "margin" | "discount" | "tax" | "business-expense";
  formulas: Array<{ label: string; expression: string }>;
  examples: CalculatorExample[];
  education: ContentSection[];
  faqs: Faq[];
  relatedTools: string[];
  updatedAt: string;
};
```

Prefer explicit page files for calculator components because each calculator has unique interaction and client-side state. Reuse `CalculatorShell`, metadata/schema builders, and content sections; do not force all calculator logic into one dynamic component switch unless the number of tools becomes large.

Business Expense Calculator v1 inputs: revenue period, expense rows, category, amount, GST included/excluded, deductible toggle, and optional notes. Outputs: total expenses, expense-to-revenue ratio, category breakdown, estimated GST input total (clearly labelled informational), and CSV export. Never present the result as a tax filing determination.

## Internal linking model

```text
/invoice-templates
  ├── category page → /free-invoice (prefilled profession/example)
  ├── category page → 4–8 sibling templates in the same taxonomy
  ├── category page → 2–3 relevant calculators
  └── category page → one informational guide

/tools
  ├── calculator → /free-invoice
  ├── calculator → related calculators
  └── calculator → relevant template cluster

/blog/[slug]
  ├── guide → one primary template page
  └── guide → one tool and one adjacent guide
```

Examples:

- Plumber → electrician, HVAC, handyman, plumbing contractor; GST and profit calculators.
- Photographer → wedding photographer, videographer, event planner, graphic designer; discount and profit calculators.
- Transport company → trucking, logistics, courier, taxi; GST, margin, and business-expense calculators.

Use contextual anchors such as “plumber invoice template” only where natural. Avoid sitewide exact-match blocks containing all 100 links.

## Technical audit automation

Add `npm run seo:audit` to perform these checks against the route registries and optionally a deployed origin:

```text
duplicate path or slug
duplicate title, description, H1, or primary keyword
canonical != normalized route
redirect source included in sitemap
redirect chains or loops
www/http URL inside canonical content
missing metadata/schema fields
metadata outside configured guardrails
word count/content-specificity below threshold
high normalized paragraph similarity
broken or redirected internal links
orphan published pages
FAQ/schema mismatch
unknown related slug/tool
noindex page present in sitemap
```

Production acceptance tests:

```bash
curl -I https://www.invoicewala.shop/invoice-templates/plumber-invoice-template
curl -s https://invoicewala.shop/invoice-templates/plumber-invoice-template
curl -s https://invoicewala.shop/sitemap.xml
npm run build
npm run seo:audit
```

Expected: one-hop 301 to non-`www`; destination 200; one self-canonical; indexable robots; exactly one sitemap entry; valid JSON-LD; no build/audit errors.

## Implementation order

### P0 — architecture and consolidation (days 1–2)

1. Create `lib/seo` types, origin constant, slug normalizer, metadata builders, and shared schemas.
2. Add the content validator and CI command.
3. Separate legacy aliases from publishable content.
4. Resolve freelancer/contractor/electrician intent collisions and document redirects.
5. Add explicit noindex metadata to private/auth layouts.

### P0 — template MVP (days 2–4)

6. Build template hub, dynamic route, `TemplatePage`, breadcrumbs, FAQs, related-template cluster, and prefilled CTA.
7. Create ten high-intent pages: plumber, electrician, general contractor, freelancer, photographer, consultant, salon, gym, transport company, and carpenter.
8. Add only those ten reviewed pages to the sitemap and hub.

### P1 — calculator completion (days 4–6)

9. Build business expense calculator.
10. Refactor all six calculators onto shared metadata, schema, content, and internal-link primitives.
11. Add calculator unit tests for formulas and edge cases (zero/negative values, decimals, inclusive tax).

### P1 — measurement and rollout (days 6–7)

12. Add events for template CTA, calculator completion, CSV export, signup, and invoice creation.
13. Submit the new sitemap in Search Console and inspect representative URLs—not every URL manually.
14. Start weekly batches of 10–20 pages, gated by content review and index/performance signals.

### P2 — scale (weeks 2–8)

15. Complete the 100-page registry by taxonomy.
16. Add matching prefilled invoice examples and screenshots/previews.
17. Refresh pages using GSC query data; merge or noindex pages that fail to earn impressions and provide no distinct user value.
18. Add a CMS only if publishing workflow requires it.

## Seven-day quick wins

- Resolve the sitemap cannibalization around freelancer template URLs.
- Launch the template hub plus the first ten categories.
- Add the missing business expense calculator.
- Add noindex metadata to authenticated/auth routes.
- Stop resetting every sitemap `lastModified` on every deployment.
- Add visible breadcrumbs and unify their schema.
- Add automated duplicate metadata, canonical, redirect, thin-content, and orphan checks.
- Link existing electrician and contractor guides to their canonical template destinations with distinct intent.
- Add template links from `/tools/gst-calculator`, `/tools/profit-calculator`, and `/free-invoice`.

## Traffic impact model

These are planning ranges, not promises. The existing GSC baseline is too small for a precise forecast, and outcomes depend on content quality, demand, authority, CTR, and index retention.

| Release | Indexable inventory | Expected effect after 8–16 weeks |
|---|---:|---|
| Architecture fixes only | ~52 current sitemap URLs | Better consolidation and crawl signals; limited net-new impressions. |
| First 10 templates + expense calculator | ~63 URLs | Roughly 1,000–5,000 additional monthly impressions if pages reach positions 20–60. |
| 50 reviewed template pages | ~103 URLs | Roughly 5,000–20,000 additional monthly impressions across long-tail queries. |
| 100 reviewed templates + six calculators + support content | ~160 URLs | Roughly 15,000–60,000 additional monthly impressions; traffic depends heavily on moving priority pages into the top 10. |

Do not use raw page count as the KPI. Track by page family: valid indexed pages, impressions per indexed page, non-brand clicks, query count, top-20/top-10 query count, template-to-invoice CTA rate, and pages with zero impressions after 90 days.

## Definition of done

- One preferred host and one canonical URL per intent.
- No template/blog keyword collisions in the sitemap.
- First ten template pages are unique, useful, linked, validated, statically generated, and measurable.
- All six requested calculators exist and share reusable SEO architecture.
- Sitemap reflects actual update dates and contains only 200/indexable/canonical URLs.
- CI blocks duplicate slugs, weak metadata, thin records, broken links, orphan pages, and schema mismatches.
- Search Console measurement is segmented by `/invoice-templates/`, `/tools/`, and `/blog/`.
