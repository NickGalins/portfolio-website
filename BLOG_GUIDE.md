# Everything Storyteller Blog Guide

A complete guide to adding and managing blog posts for the "Everything Storyteller" blog.

**Last Updated:** February 3, 2026

---

## Quick Start Checklist

- [ ] Create XML file in `content/blog/[post-slug].xml`
- [ ] Create thumbnail image (400x400px) in `assets/images/blog/`
- [ ] Create hero image (1600x800px) in `assets/images/blog/` (or use shared hero)
- [ ] Add all XML metadata (title, subtitle, date, excerpt, tags)
- [ ] Write post content with proper HTML structure
- [ ] Set `<featured>true</featured>` if this should be the featured post
- [ ] Build and test: `npm run build && npm run dev`

---

## XML Structure

### Complete Blog Post Schema

```xml
<?xml version="1.0" encoding="UTF-8"?>
<post>
  <meta>
    <!-- REQUIRED FIELDS -->
    <id>post-slug</id>
    <title>Post Title</title>
    <subtitle>Subtitle or Tagline</subtitle>
    <date>2026-02-03</date>

    <!-- AUTHOR INFORMATION -->
    <author>Nicholas Galinski</author>
    <authorPhoto>/assets/images/author-nick.jpg</authorPhoto>
    <authorBio>Multidisciplinary writer specializing in technical documentation, UX content, and creative storytelling. Former English teacher who brings narrative craft to every form of writing.</authorBio>

    <!-- HERO IMAGE (can be unique per post or shared) -->
    <heroImage>/assets/images/blog/[post-slug].jpg</heroImage>
    <heroAlt>Description of hero image</heroAlt>

    <!-- THUMBNAIL IMAGE (unique per post, square) -->
    <thumbnailImage>/assets/images/blog/[post-slug].jpg</thumbnailImage>
    <thumbnailAlt>Description of thumbnail</thumbnailAlt>

    <!-- EXCERPT & FEATURED FLAG -->
    <excerpt>1-2 sentence summary for listings</excerpt>
    <featured>false</featured>

    <!-- TAGS -->
    <tags>
      <tag>Writing</tag>
      <tag>Content Design</tag>
    </tags>
  </meta>

  <content>
    <![CDATA[
      <p class="lead">Opening paragraph</p>
      <p>Content here...</p>
    ]]>
  </content>
</post>
```

### Field Reference

| Field | Required | Notes |
|-------|----------|-------|
| `<id>` | Yes | Must match XML filename (without .xml), used in URL |
| `<title>` | Yes | Main post title |
| `<subtitle>` | Recommended | Displayed below title on post page |
| `<date>` | Yes | YYYY-MM-DD format; determines sort order |
| `<author>` | Recommended | Use "Nicholas Galinski" |
| `<authorPhoto>` | Recommended | `/assets/images/author-nick.jpg` |
| `<authorBio>` | Recommended | Standard bio |
| `<heroImage>` | Yes | Can be unique or shared across posts |
| `<heroAlt>` | Yes | Alt text for hero image |
| `<thumbnailImage>` | Yes | 400x400px square image |
| `<thumbnailAlt>` | Yes | Alt text for thumbnail |
| `<excerpt>` | Recommended | 1-2 sentences for listings |
| `<featured>` | Yes | Set ONE post to `true` for featured section |
| `<tags>` | Optional | 3-5 category tags |

---

## Image System

### Hero Images

- **Dimensions:** 1600 x 800 pixels (2:1 aspect ratio)
- **Location:** `assets/images/blog/`
- **Usage:** Full-width banner at top of individual post page

You can either:
1. **Create a unique hero** for each post (recommended for visual variety)
2. **Use the shared hero** (`multidisciplinary-writer-hero.jpg`) for consistency

### Thumbnail Images

- **Dimensions:** 400 x 400 pixels (1:1 square)
- **Location:** `assets/images/blog/[post-slug]-thumbnail.jpg` or `[post-slug].jpg`
- **Usage:**
  - Blog listing cards in "All Posts" section
  - Featured post section
  - Can be used inline in post content

### Blog Header Background

The `/blog/` page header always uses the shared hero:
```
/assets/images/blog/multidisciplinary-writer-hero.jpg
```
This is hardcoded for visual consistency across the blog landing page.

### Author Photo

- **Dimensions:** 256 x 256 pixels (square)
- **Location:** `assets/images/author-nick.jpg` (NOT in blog subfolder)
- **Display:** 64x64px circular on author card

---

## Featured Post Logic

The featured post section on `/blog/` displays the post with `<featured>true</featured>`.

**Rules:**
- Only ONE post should have `<featured>true</featured>` at a time
- If no post has `featured=true`, the most recent post (by date) is used as fallback
- When adding a new featured post, set the old featured post to `<featured>false</featured>`

---

## Content Formatting

### Available CSS Classes

```html
<!-- Lead paragraph (larger opening text) -->
<p class="lead">Opening paragraph with emphasis</p>

<!-- Pull quote (large, centered, emphasized) -->
<blockquote class="pullquote">
  Key insight or memorable quote
</blockquote>

<!-- Callout box (highlighted section) -->
<div class="callout">
  <p><strong>Highlighted content:</strong></p>
  <ul>
    <li>List items</li>
  </ul>
</div>

<!-- Image with optional caption -->
<figure>
  <img src="/assets/images/blog/image.jpg" alt="Description">
  <figcaption>Optional caption</figcaption>
</figure>
```

### Tables

Tables are supported with automatic styling:

```html
<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell 1</td>
      <td>Cell 2</td>
    </tr>
  </tbody>
</table>
```

### Tabbed Content (Device Tabs)

For content that varies by audience or platform:

```html
<div class="device-tabs">
  <div class="device-tabs__nav" role="tablist">
    <button class="device-tabs__tab" role="tab" aria-selected="true"
            aria-controls="panel-one" id="tab-one">Tab 1</button>
    <button class="device-tabs__tab" role="tab" aria-selected="false"
            aria-controls="panel-two" id="tab-two">Tab 2</button>
  </div>

  <div class="device-tabs__panel" role="tabpanel" id="panel-one"
       aria-hidden="false" aria-labelledby="tab-one">
    <p>Content for Tab 1</p>
  </div>

  <div class="device-tabs__panel" role="tabpanel" id="panel-two"
       aria-hidden="true" aria-labelledby="tab-two">
    <p>Content for Tab 2</p>
  </div>
</div>
```

### Internal Links

Link to other blog posts:

```html
<a href="/blog/writers-are-performers/">Writers are Performers</a>
<a href="/blog/constraints-are-better/">constraints</a>
```

### Standard HTML

```html
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>

<p>Regular paragraph</p>

<em>Italic text</em>
<strong>Bold text</strong>

<ul>
  <li>Unordered list item</li>
</ul>

<ol>
  <li>Ordered list item</li>
</ol>

<a href="https://example.com">External link</a>
```

---

## File Structure

```
portfolio-website/
├── content/
│   └── blog/
│       ├── writers-are-performers.xml
│       ├── constraints-are-better.xml
│       └── aeo-revolution.xml
├── assets/
│   ├── css/
│   │   └── main.css
│   └── images/
│       ├── author-nick.jpg
│       └── blog/
│           ├── multidisciplinary-writer-hero.jpg
│           ├── aeo-revolution.jpg
│           └── [post-slug]-thumbnail.jpg
├── blog.njk                    # Blog listing template (ROOT LEVEL)
├── blog-post.njk               # Individual post template (ROOT LEVEL)
└── BLOG_GUIDE.md               # This guide
```

**Important:** `blog.njk` and `blog-post.njk` MUST be at root level. Moving them breaks Eleventy pagination.

---

## How Posts Display

### On `/blog/` (Blog Listing)

1. **Header:** Fixed background image with "Everything Storyteller" title
2. **Featured Section:** Post with `<featured>true</featured>` (thumbnail + excerpt)
3. **All Posts:** All posts sorted by date, newest first (skips featured post)

### On `/blog/[post-slug]/` (Individual Post)

1. **Hero Banner:** Post's `<heroImage>` (full-width, max-height 500px)
2. **Header:** Title, subtitle, date, author, tags
3. **Author Card:** Photo, name, bio
4. **Content:** Post body with all formatting
5. **Footer:** Back link, disclaimer, copyright

---

## Common Issues

### Post not appearing on `/blog/`

1. Verify XML is in `content/blog/` directory
2. Check `<id>` matches filename (without .xml)
3. Rebuild: `npm run build`

### Images not displaying

1. Check paths start with `/` (e.g., `/assets/images/blog/...`)
2. Verify files exist at specified locations
3. Check exact filename (case-sensitive)

### Featured section empty or wrong

1. Ensure exactly ONE post has `<featured>true</featured>`
2. Check required fields exist (id, title, date)
3. Rebuild the site

### 404 on individual post

1. Verify `blog-post.njk` is at root level (not in `_includes/`)
2. Check `<id>` in XML matches the URL you're accessing
3. Rebuild the site

---

## Adding a New Post: Step by Step

### 1. Create Images

- **Hero:** 1600x800px, save to `assets/images/blog/[post-slug].jpg`
- **Thumbnail:** 400x400px (can be same file or separate `-thumbnail.jpg`)

### 2. Create XML File

Copy the schema above to `content/blog/[post-slug].xml`

### 3. Fill In Metadata

- `<id>`: lowercase-hyphenated (matches filename)
- `<title>`: Main headline
- `<subtitle>`: Tagline or secondary headline
- `<date>`: Today's date (YYYY-MM-DD)
- `<excerpt>`: 1-2 compelling sentences
- `<featured>`: `true` if this is the new featured post

### 4. Write Content

- Start with `<p class="lead">` for opening
- Use `<h2>` for section breaks
- Add pull quotes for key insights
- Include callout boxes for lists/takeaways

### 5. Update Featured Flags

If this is the new featured post:
- Set new post: `<featured>true</featured>`
- Set old featured post: `<featured>false</featured>`

### 6. Build and Test

```bash
npm run build
npm run dev
```

Check:
- `/blog/` - Post appears in listings
- `/blog/[post-slug]/` - Individual page works
- Images load correctly
- Featured section shows correct post

---

## Existing Posts Reference

| Post | ID | Featured |
|------|-----|----------|
| Writers are Performers | `writers-are-performers` | `true` |
| Rules are Ok, Constraints are Better | `constraints-are-better` | `false` |
| Out with SEO, in with AEO | `aeo-revolution` | `false` |

---

## Build Commands

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Validate XML files
npm run validate
```

---

## Technical Notes

### Eleventy Configuration

Posts are loaded in `eleventy.config.js`:
- All `.xml` files in `content/blog/` are parsed
- Posts sorted by date (newest first)
- Available globally as `posts` array

### Featured Post Template Logic

```nunjucks
{% set featuredPost = null %}
{% for post in posts %}
  {% if post.meta.featured == "true" or post.meta.featured == true %}
    {% set featuredPost = post %}
  {% endif %}
{% endfor %}
{% if not featuredPost %}
  {% set featuredPost = posts[0] %}
{% endif %}
```

### Pagination (Individual Posts)

```nunjucks
---
layout: base.njk
pagination:
  data: posts
  size: 1
  alias: post
permalink: /blog/{{ post.meta.id }}/index.html
---
```

---

**Maintained By:** Nicholas Galinski
