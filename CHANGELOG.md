# Changelog

All notable changes to this portfolio site will be documented in this file.

## [Unreleased]

## 2026-01-30 - Writing Sample Disclaimers

### Added

- **API Documentation**: "About This Sample" info box explaining Gski ReviewLoop represents AWS Marketplace and Partner Central documentation work
- **Google Receipt Vault**: Added Workspace to list of Google products in "About This Sample" note

## 2026-01-28 - Tag System Refinements & Content Updates

### Added

- **Event Experience** tag added to Design category for immersive/live event projects
- **Supernal Gardens case study**: New "Actor Role Tiers" section explaining Major, Minor, and Enhancement role hierarchy with examples
- **Supernal Gardens case study**: New outcome documenting narrative framework for future marketing events

### Changed

- Renamed **Secondary Skills** category to **Other** in tag system and homepage filters
- Updated Supernal Gardens constraint wording to emphasize audience clarity over time limits
- Updated discovery funnel to include marketing emails and convention program listing

### Removed

- Removed 4 management-focused tags from tag system: Change Management, Project Management, People Management, Cross-functional Collaboration
- Removed obsolete management tags from 12 project XML files

## 2026-01-28 - SEO & Search Engine Indexing

### Added

- **robots.txt**: Points search engines to sitemap, allows all crawlers
- **404 error page**: Custom page with Stan Lee quote, clickable image, and navigation links to homepage, case studies, and blog
- **Canonical URL tags**: Added `<link rel="canonical">` to all pages via base layout template
- **404 illustration**: Custom image at `/assets/images/404-error.png` (150x150, rounded corners)

### Changed

- Updated `eleventy.config.js` to include robots.txt in passthrough copy
- Added canonical link tag to `_includes/layouts/base.njk`

## 2026-01-27 - Portfolio Case Study Enhancements

### Added

- **Building This Portfolio**: New intro section "Why I Built This Site with Claude Code as a Partner" explaining the AI-forward development approach
- **Building This Portfolio**: "The Development Journey" visual flow section with 6 phase cards showing the collaboration workflow (Draft & Define, Plan & Constrain, Build & Watch, Review & Verify, Polish & Produce, Iterate & Document)
- **Building This Portfolio**: "Reflections on Working with Claude" section with insights on AI collaboration
- **Building This Portfolio**: "Why It Matters" subsection in Content History section explaining holistic content understanding
- **Everland Trust & Safety**: "Reflections Beyond Gaming" section bridging gaming context to enterprise trust & safety applications
- SVG icons for each development phase card (pencil, checkbox, eye, magnifying glass, star, cycle arrows)

### Changed

- Updated Claude references to explicitly mention "Claude Code in VS Code" instead of generic "AI" or "Claude"
- Phase cards use inline SVG icons in titles for visual flow representation

## 2026-01-27 - New Blog Post & Right Sidebar Enhancements

### Added

- New blog post: "Rules are Ok, Constraints are Better" - personal narrative about creative constraints
- Right sidebar now displays up to 3 most recent blog post titles (previously showed 1)
- "More posts →" link in right sidebar linking to blog landing page
- Visual divider lines between blog posts in right sidebar
- Supernal Gardens case study images (Arena, Bar, Scrying Pool, Joust concepts)
- Audio samples for Supernal Gardens prophecies (Storm Charm, Guard Captain's Medal)

### Changed

- Renamed "Immersive Marketing Event" to "Immersive Experience" in navigation
- Moved The Supernal Gardens to top of Case Studies section
- Updated featured flag: "Constraints are Better" is now featured, "Writers Are Performers" unfeatured
- Updated BLOG_IMPLEMENTATION_CONTEXT.md with right sidebar documentation

## 2026-01-23 - Mobile Layout Fixes & Hero Redesign

### Changed

- Moved hero title and subtitle below video instead of overlaying it
- Video hero offset adjusted (+125px) to show more content
- Main content now centers responsively under viewport-centered title using `max()` calculation
- Desktop video: letterboxed 16:9 aspect ratio, max-width 1050px, centered with dark band background
- Mobile video: full-width 16:9 aspect ratio (overrides desktop width calculations)

### Added

- Right menu collapse toggle on desktop (with localStorage persistence)
- Hamburger overlap fixes for all page types (projects, About, Contact, Work History, landing pages, blog)

### Fixed

- Right menu now hidden on all mobile devices (was showing on iPhone)
- Hamburger menu button no longer overlaps site name when menu opens
- Hamburger menu button no longer overlaps page titles on mobile (added top padding)
- Text wraps properly on mobile, preventing horizontal scroll
- Added `overflow-x: hidden` to html, body, and site-wrapper to prevent mobile overflow
- Project pages: images now responsive with `max-width: 100%`, title scales down on mobile
- Landing pages: cards and text content constrained to viewport width
- Page body styles (about, contact): added word-wrap and overflow fixes
- Tables scroll horizontally on mobile instead of breaking layout
- Mobile video display fixed (was vanishing due to desktop width calculations)

## 2026-01-23 - Favicon & Social Sharing

### Added

- Favicon (`favicon.png`) for browser tab icon
- Open Graph meta tags for social media link previews (LinkedIn, Facebook, Twitter, Slack)
- Social sharing image (`assets/images/social-share.png`)

### Changed

- Updated `eleventy.config.js` to include favicon in passthrough copy
- Added favicon and OG tags to `base.njk` layout

## 2026-01-22 - Everything Storyteller Blog Launch

### Added

- "Everything Storyteller" blog section with listing page and individual post pages
- First blog post: "Writers Are Performers" - literary journalism on multidisciplinary writing
- Blog templates: `blog.njk` (listing) and `blog-post.njk` (individual posts)
- Blog XML content in `content/blog/` directory
- Author card with photo and bio on blog posts
- Featured post highlighting on blog index
- Pull quote and callout box styling for blog content
- Blog images: hero and thumbnail for posts
- Blog URLs added to sitemap

### Changed

- Updated `eleventy.config.js` to load blog posts from `content/blog/`
- Added `Context/**` to Eleventy ignores to prevent internal files from being built
- Removed HTML comments from `blog-post.njk` template (production cleanup)

### Fixed

- CDATA content in blog posts now renders correctly (accessing `__cdata` property)
- Context folder no longer builds to `_site/` output

## 2026-01-22 - Google Receipt Vault Sample

### Added

- New "Google Receipt Vault" writing sample replacing "Google - Translate with Lens"
- Fictional product stand-in representing help center documentation work across Pixel, Search, Drive, and Cloud
- Sample external help center guides with step-by-step procedures
- Sample internal knowledge base documentation for technical audiences

### Changed

- Renamed `google-translate-lens.xml` to `google-receipt-vault.xml`
- Updated navigation.xml with new project ID and label

## 2026-01-22 - Pre-Launch Preparation

### Added

- Site-wide footer with copyright and disclaimer on all pages
- "Coming Soon" sections for 5 incomplete projects with clock icon and yellow styling
- Logo marquee on Resume page with link to Content History
- CSS variables `--color-surface` and `--color-warning` for code blocks and notices
- Coming Soon notice styling (`.coming-soon-notice`) with SVG clock icon

### Changed

- Resume "Brands" section now shows scrolling marquee with link to Content History

### Fixed

- Removed debug console.log statements from eleventy.config.js (10 statements)
- Removed placeholder "(Brand logos to be added)" text from resume page
- Removed awkward "See other brands" position entry from resume.xml
- About and Contact page templates now properly render CDATA content

## 2026-01-22 - Short Form UGC Copy & Template Improvements

### Added

- New "Podcast UGC-Style Ad Copy" writing sample with Elgato Stream Deck ad read
- Audio player component for podcast ad samples (`assets/audio/`)
- Ad copy container styling (`.ad-copy-container`) with lighter background
- CDATA support in XML parser for HTML content in project bodies

### Changed

- Renamed `short-form` project to `short-form-ugc-copy`
- URL changed from `/projects/short-form/` to `/projects/short-form-ugc-copy/`
- Updated project template to handle single-section projects correctly
- Removed dates from select project headers (7 projects)

### Fixed

- Project template now correctly renders single `<section>` elements (was only working with arrays)
- CDATA content in XML body sections now renders properly

## 2026-01-22 - Content History Page & Mini Cards

### Added

- New "Content History" landing page (`content-history.njk`) replacing "Brands & Influencers"
- Table of Contents navigation within Content History page
- Collapsible details/zippy sections for Production, Copywriting, and Publications
- Anchor link SVG icons on section headings for direct linking
- 15 mini-cards under Production section featuring brands, talent, and shows
- JavaScript to auto-open details sections when navigating to anchors
- Mini-card component styles with 125x125px thumbnails

### Changed

- Renamed "Brands & Influencers" section to "Content History"
- URL changed from `/brands-influencers/` to `/content-history/`
- Navigation items now use anchor links for in-page navigation (Production, Copywriting, Publications)
- Updated sitemap.njk with new Content History URL
- Card backgrounds updated to dark blue (#121f30) for brand-card and mini-card components
- Mini-card role/description text now white, sentence case (was blue uppercase)
- Mini-card content top-justified (was center-justified)

### Renamed

- `assets/images/brands-influencers/` → `assets/images/content-history/`

## 2026-01-21 - Sitemap Fix

### Fixed
- Updated sitemap template to use new flat navigation structure (`section > item` instead of `section > category > item`)
- Added `/case-studies/` and `/individual-samples/` landing pages to sitemap
- Removed stray markdown code fence from sitemap.njk

## 2026-01-21 - Portfolio Reorganization & API Documentation Sample

### Added
- New "Gski ReviewLoop API Reference" writing sample (`individual-samples/api-documentation.xml`)
- Category landing pages: `case-studies.njk` and `individual-samples.njk`
- New card images: `building-this-site-card.jpg`, `review-loop-api-card.png`
- CHANGELOG.md for tracking site changes
- package-lock.json for dependency locking

### Changed
- Reorganized projects from role-based folders (`content-design/`, `creative/`) to format-based folders (`case-studies/`, `individual-samples/`)
- Updated navigation.xml to reflect new structure
- Refactored base.njk layout
- Enhanced main.css with additional styles
- Improved main.js functionality
- Updated index.njk and project.njk templates
- Updated eleventy.config.js
- Compressed aws-ai-agents-tools-card.jpg

### Removed
- Old project folder structure (`content-design/`, `creative/`)
- aws-api-docs-card.jpg (replaced/consolidated)

### Case Studies (7)
- AWS AI Agents
- Building This Portfolio
- Everland Narrative
- Everland Trust & Safety
- Sacred Grounds Influencer
- Sacred Grounds Shop
- Sacred Grounds Supernal

### Individual Samples (5)
- API Documentation (Gski ReviewLoop)
- Google Receipt Vault
- Oathforger Chapter 1
- Sacred Grounds Rulebook
- Short Form UGC Copy

## 2026-01-19 - Navigation Restructure

### Changed
- Navigation categories changed from role-based ("Content Design" / "Creative") to format-based ("Case Studies" / "Individual Samples")
- Navigation sections now default to collapsed state instead of expanded
- Section headers are now clickable links that navigate to landing pages AND expand the submenu
- Project files reorganized into `case-studies/` and `individual-samples/` folders

### Added
- Category landing pages at `/case-studies/` and `/individual-samples/`
- "Building This Portfolio" case study (placeholder content)
- Landing page CSS styles for responsive project grid
- localStorage persistence for manual nav expand/collapse actions
- Auto-expand section when navigating to a page within that section

### Removed
- Nested category structure within navigation sections
- Old `content-design/` and `creative/` project folders
