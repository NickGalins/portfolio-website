# Changelog

All notable changes to this portfolio site will be documented in this file.

## [Unreleased]

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
