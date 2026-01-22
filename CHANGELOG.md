# Changelog

All notable changes to this portfolio site will be documented in this file.

## [Unreleased]

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

### Individual Samples (6)
- API Documentation (Gski ReviewLoop)
- Google Translate Lens
- Oathforger Chapter 1
- Other Narrative
- Sacred Grounds Rulebook
- Short Form

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
