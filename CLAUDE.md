# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start dev server with hot reload at localhost:8080
- `npm run build` - Build production site to _site/
- `npm run validate` - Validate XML files

## Architecture

This is a docs-as-code portfolio website using **Eleventy 2.0.1** as a static site generator with **XML-based content management**.

### Build Flow

XML content files → `eleventy.config.js` (parses with fast-xml-parser) → Nunjucks templates → Static HTML in `_site/`

### Global Template Variables

- `{{ projects }}` - All projects from content/projects/
- `{{ posts }}` - Blog posts sorted by date (newest first)
- `{{ pages.about }}`, `{{ pages.contact }}`, `{{ pages.resume }}` - Static pages
- `{{ navigation }}` - Site menu structure from navigation.xml

### Custom Filters

- `{{ projects | findProject('id') }}` - Find project by ID
- `{{ projects | withTag('tag') }}` - Filter projects by tag

### URL Generation

URLs are generated from XML `<id>` fields:

- Projects: `/projects/{meta.id}/`
- Blog posts: `/blog/{meta.id}/`
- Pages: `/{meta.id}/`

## Content Structure

| Content Type | Location | Template |
|--------------|----------|----------|
| Case Studies | content/projects/case-studies/ | project.njk |
| Writing Samples | content/projects/individual-samples/ | project.njk |
| Content History | content/projects/content-history/ | content-history.njk |
| Blog Posts | content/blog/ | blog-post.njk |
| Static Pages | content/pages/ | about.njk, contact.njk, resume.njk |

## Critical Patterns

### XML Attribute Names

XML attributes parsed by fast-xml-parser become `@_` prefixed:

```nunjucks
item['@_id']      {# From: <item id="..."> #}
item['@_label']   {# From: <item label="..."> #}
```

### CDATA for HTML Content

Wrap HTML in CDATA to prevent XML parsing issues:

```xml
<body><![CDATA[
  <p>HTML content here</p>
]]></body>
```

### Asset Paths

Always use absolute paths from site root - relative paths break on nested pages:

```xml
<image src="/assets/images/example.png" />  <!-- Correct -->
<image src="../assets/images/example.png" /> <!-- Breaks on /projects/id/ -->
```

### Pagination Templates

Templates using Eleventy pagination (`blog-post.njk`, `project.njk`) **must be at root level**, not in `_includes/`. Moving them breaks URL generation.

### Featured Blog Post

Only one post should have `<featured>true</featured>`. The blog listing shows this post prominently.

## Git Workflow

### Commit Guidelines

- **Never include Claude as a co-author** in commit messages
- **Always update CHANGELOG.md first** before committing - add entries under the current date with Added/Changed/Removed sections as appropriate
- **Keep documentation in sync** - when making changes, update relevant .md files (TAG-SYSTEM.md, BLOG_GUIDE.md, etc.) to reflect the changes
- **Suggest CLAUDE.md updates** - when making major architectural changes, new patterns, or workflow updates, suggest additions to this file

### File Exclusions

- **`.eleventyignore`** - Add context/documentation files that shouldn't be built into the site (e.g., context.md, CLAUDE.md)
- **`.gitignore`** - Add any files with potentially sensitive information (API keys, credentials, local config)

### Security Considerations

When making changes that could impact security (external embeds, new dependencies, user-facing URLs, deployment config), review [SECURITY.md](SECURITY.md) and perform a security check before committing.

## Content Writing Style

When generating content (blog posts, project descriptions, copy), avoid patterns that feel AI-generated:

### Formatting

- Em dashes are fine, but don't overuse them
- Vary paragraph lengths and structure—avoid symmetrical 3-part patterns
- Skip generic openers like "In this article, we'll explore..." or "Let's dive in"

### Substance Over Polish

- Include concrete details: names, dates, numbers, specific examples, tradeoffs
- Take stances and make arguable claims rather than "there are pros and cons"
- Show personal bias and priorities in lists, not exhaustive category coverage
- Give specific advice, not fortune-cookie guidance ("consider your goals")

### Tone

- Avoid corporate-therapy positivity ("every challenge is an opportunity")
- Don't over-scaffold with "Moreover," "Furthermore," "Additionally," "In conclusion"
- End with a specific insight or punch, not a summary that restates each point
- Vary sentence patterns—don't repeat "X is important because..." structures

### The Goal

Sound like a human with opinions and experience, not a template with synonyms swapped in.

## Documentation Reference

- [BLOG_GUIDE.md](BLOG_GUIDE.md) - Blog post creation guide
- [TAG-SYSTEM.md](TAG-SYSTEM.md) - Tag filtering system (21 tags across 4 categories)
- [context.md](context.md) - Detailed technical context and troubleshooting
- [CARD-IMAGES.md](CARD-IMAGES.md) - Homepage card image specifications
- [SECURITY.md](SECURITY.md) - Security best practices and audit checklist
- [CHANGELOG.md](CHANGELOG.md) - Version history (update before each commit)
