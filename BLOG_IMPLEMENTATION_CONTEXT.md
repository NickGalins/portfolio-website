# Blog Technical Reference: "Everything Storyteller"

> **📘 For adding new blog posts, see [HOW_TO_ADD_BLOG_POSTS.md](HOW_TO_ADD_BLOG_POSTS.md)**
>
> This document provides technical reference information about the blog architecture, design decisions, and troubleshooting. For step-by-step instructions on adding content, use the HOW_TO guide instead.

---

## Overview

**Blog Name:** Everything Storyteller
**Purpose:** Content marketing blog showcasing writing insights, professional development, and storytelling craft
**Implementation Date:** January 16, 2026
**Design Approach:** Moderate visual enhancement while maintaining dark navy portfolio aesthetic

---

## Architecture & Design Decisions

### Image System

The blog uses a **shared hero + unique thumbnail system**:

#### 1. Shared Hero Image (`multidisciplinary-writer-hero.jpg`)
- **Dimensions:** 1600 x 800 pixels (2:1 aspect ratio)
- **Shared across ALL posts** for visual consistency
- **Usage locations:**
  - Background of `/blog/` page header (with 75% dark overlay)
  - Full-width banner on ALL individual blog post pages (max-height 500px)
  - Featured post section (if no thumbnail available)

#### 2. Unique Post Thumbnails (e.g., `writers-are-performers-thumbnail.jpg`)
- **Dimensions:** 400 x 400 pixels (1:1 square)
- **One per post** - provides visual identity for each article
- **Usage locations:**
  - Blog listing card thumbnail in "All Posts" section
  - Featured post thumbnail in "Featured" section
  - Inline content image within blog post (after opening paragraphs)

#### 3. Author Photo (`author-nick.jpg`)
- **Dimensions:** 256 x 256 pixels (square)
- **Location:** `assets/images/` (NOT in blog subfolder)
- **Display:** 64x64px with `border-radius: 50%` (circular)
- **Usage:** Author card on individual blog posts

### Why This Image Strategy?

**Shared Hero Image:**
- Creates visual cohesion across the entire blog
- Reinforces "multidisciplinary storyteller" brand (prism metaphor)
- Reduces image creation burden (one hero for all posts)
- Efficient asset management

**Unique Thumbnails:**
- Each post gets distinct visual identity
- Better square composition control than cropping hero image
- Serves dual purpose (listing card + inline content)
- Only need to create one image per post

---

## XML Structure

### Complete Blog Post XML Schema

```xml
<?xml version="1.0" encoding="UTF-8"?>
<post>
  <meta>
    <!-- REQUIRED FIELDS -->
    <id>post-slug</id>
    <title>Post Title</title>
    <date>2026-01-16</date>

    <!-- AUTHOR INFORMATION (same for all posts) -->
    <author>Nicholas Galinski</author>
    <authorPhoto>/assets/images/author-nick.jpg</authorPhoto>
    <authorBio>Multidisciplinary writer specializing in technical documentation, UX content, and creative storytelling. Former English teacher who brings narrative craft to every form of writing.</authorBio>

    <!-- SHARED HERO IMAGE (same for ALL posts) -->
    <heroImage>/assets/images/blog/multidisciplinary-writer-hero.jpg</heroImage>
    <heroAlt>A prism showing ideas coming in and various types of story content coming out</heroAlt>

    <!-- POST-SPECIFIC THUMBNAIL (unique per post) -->
    <thumbnailImage>/assets/images/blog/[post-slug]-thumbnail.jpg</thumbnailImage>
    <thumbnailAlt>Description of thumbnail image</thumbnailAlt>

    <!-- EXCERPT & FEATURED FLAG -->
    <excerpt>Brief 1-2 sentence summary for listings</excerpt>
    <featured>true</featured>

    <!-- TAGS -->
    <tags>
      <tag>Writing</tag>
      <tag>Content Marketing</tag>
      <tag>Professional Development</tag>
    </tags>
  </meta>

  <content>
    <![CDATA[
      <p class="lead">Opening paragraph with larger text</p>
      <p>Regular content...</p>

      <figure>
        <img src="/assets/images/blog/[post-slug]-thumbnail.jpg" alt="...">
      </figure>

      <blockquote class="pullquote">Key insight</blockquote>

      <div class="callout">
        <h3>Highlighted Section</h3>
        <ul><li>Item</li></ul>
      </div>
    ]]>
  </content>
</post>
```

### Field Requirements

| Field | Required | Notes |
|-------|----------|-------|
| `<id>` | ✅ Yes | Must match XML filename (without .xml) |
| `<title>` | ✅ Yes | Post title displayed in listings and page header |
| `<date>` | ✅ Yes | YYYY-MM-DD format; determines sort order |
| `<author>` | ⚠️ Recommended | Use "Nicholas Galinski" for consistency |
| `<authorPhoto>` | ⚠️ Recommended | Path: `/assets/images/author-nick.jpg` |
| `<authorBio>` | ⚠️ Recommended | Standard bio across all posts |
| `<heroImage>` | ✅ Yes | **Always use:** `/assets/images/blog/multidisciplinary-writer-hero.jpg` |
| `<heroAlt>` | ✅ Yes | **Always use:** "A prism showing ideas coming in and various types of story content coming out" |
| `<thumbnailImage>` | ✅ Yes | Post-specific: `/assets/images/blog/[post-slug]-thumbnail.jpg` |
| `<thumbnailAlt>` | ✅ Yes | Describe what the thumbnail shows |
| `<excerpt>` | ⚠️ Recommended | 1-2 sentences for listing previews |
| `<featured>` | ⚠️ Optional | Only one post should be `true` (most recent) |
| `<tags>` | ⚠️ Optional | 3-5 relevant category tags |

---

## Critical File Locations

```
portfolio-website/
├── content/
│   └── blog/
│       └── [post-slug].xml                      ← Blog post XML files
├── assets/
│   ├── css/
│   │   └── main.css                             ← Blog styles (lines 756-1100+)
│   └── images/
│       ├── author-nick.jpg                      ← Author photo (root images/)
│       └── blog/
│           ├── multidisciplinary-writer-hero.jpg      ← SHARED hero (all posts)
│           └── [post-slug]-thumbnail.jpg              ← Post-specific thumbnails
├── blog.njk                                     ← Blog listing template (ROOT LEVEL)
├── blog-post.njk                                ← Individual post template (ROOT LEVEL)
├── HOW_TO_ADD_BLOG_POSTS.md                    ← User guide for adding posts
└── BLOG_IMPLEMENTATION_CONTEXT.md              ← This technical reference
```

**⚠️ CRITICAL:** Both `blog.njk` and `blog-post.njk` MUST be at root level. Moving them to `_includes/` will break Eleventy pagination and cause 404 errors.

---

## Template Architecture

### Blog Listing Page (`blog.njk`)

**URL:** `/blog/`

**Key Features:**
1. **Header Section:** Hero image background with dark overlay
2. **Featured Post Section:** Most recent post with thumbnail
3. **All Posts Section:** List of all posts with thumbnails

**Featured Post Logic:**
```nunjucks
{# Uses first post (posts are sorted by date, newest first) #}
{% set featuredPost = posts[0] %}
```

**Why this works:**
- Posts are sorted by date in `eleventy.config.js`
- Most recent post is always `posts[0]`
- No need for complex `selectattr` filters

### Individual Post Page (`blog-post.njk`)

**URL:** `/blog/[post-slug]/`

**Pagination Configuration:**
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

**Key Features:**
1. Hero image banner (full-width at top)
2. Post header (title, date, author, tags)
3. Author card (photo, name, bio)
4. Post content with inline thumbnail
5. Footer with back link and legal disclaimers

---

## CSS Architecture

### Blog-Specific Styles

**Location:** `assets/css/main.css` (lines 756-1100+)

**Key Classes:**

#### Blog Listing Styles
- `.blog__header` - Header with hero background
- `.blog__tagline` - Subtitle text
- `.blog__featured` - Featured post container
- `.blog-post-featured` - Featured post card
- `.blog-post-featured__image` - Thumbnail in featured section
- `.blog-post-preview` - Regular post card
- `.blog-post-preview__image` - Thumbnail in listing (1:1 aspect ratio)

#### Individual Post Styles
- `.blog-post__hero` - Full-width hero banner
- `.blog-post__author-card` - Author info card
- `.blog-post__content` - Main content area

#### Content Enhancement Styles
- `.lead` - Larger opening paragraph (1.5rem)
- `.pullquote` - Large centered quote (1.75rem, italic)
- `.callout` - Highlighted box with left accent border
- `figure` + `figcaption` - Images with captions

**Important:** Never modify global CSS (lines 1-755) for blog-specific styling. Only use existing blog classes.

---

## Design Variables

### Color Palette

```css
--color-bg: #0d1b2a          /* Dark navy background */
--color-bg-alt: #1b263b      /* Lighter navy for cards/callouts */
--color-text: #e0e1dd        /* Off-white body text */
--color-text-muted: #778da9  /* Blue-gray for dates/metadata */
--color-accent: #4ea8de      /* Light blue for links/highlights */
--color-accent-hover: #7cc2f0 /* Lighter blue for hover states */
--color-border: #2d3f54      /* Subtle borders */
```

### Special Overlays

**Hero Background Overlay:**
```css
rgba(13, 27, 42, 0.75) /* Dark navy at 75% opacity */
```

Ensures text readability over hero image background.

---

## How Posts Are Displayed

### On `/blog/` (Blog Listing)

1. **Header:**
   - Background: Shared hero image
   - Overlay: Dark navy (75% opacity)
   - Text: "Everything Storyteller" + tagline

2. **Featured Section:**
   - Shows: Most recent post (`posts[0]`)
   - Layout: Two-column (thumbnail left, content right)
   - Image: Post-specific thumbnail (square)

3. **All Posts:**
   - Shows: All posts sorted by date
   - Layout: Thumbnail left, content right
   - Image: Post-specific thumbnail (square)

### On `/blog/[post-slug]/` (Individual Post)

1. **Hero Banner:** Shared hero image (full-width, max-height 500px)
2. **Header:** Title, date, author, tags
3. **Author Card:** Photo, name, bio
4. **Content:**
   - Opening paragraphs
   - Inline thumbnail (after 2-4 paragraphs)
   - Body with sections, pull quotes, callouts
5. **Footer:** Back link, disclaimer, copyright

---

## Known Issues & Solutions

### Issue: Images Not Displaying

**Symptoms:**
- Hero image missing on blog header
- Thumbnails not showing in listings
- Author photo missing from author card

**Solutions:**

1. **Check absolute paths:**
   - ✅ `/assets/images/blog/image.jpg` (correct)
   - ❌ `assets/images/blog/image.jpg` (missing leading slash)

2. **Verify file locations:**
   - Hero: `assets/images/blog/multidisciplinary-writer-hero.jpg`
   - Thumbnails: `assets/images/blog/[post-slug]-thumbnail.jpg`
   - Author: `assets/images/author-nick.jpg` (NOT in blog subfolder)

3. **Rebuild site:**
   ```bash
   npm run build
   ```

### Issue: Post Not Appearing on `/blog/`

**Causes & Solutions:**

1. **XML file not in correct location**
   - Must be: `content/blog/[post-slug].xml`

2. **Missing required fields**
   - Verify: `<id>`, `<title>`, `<date>` are all present

3. **Site not rebuilt**
   ```bash
   npm run build
   ```

### Issue: Featured Section Empty

**Causes & Solutions:**

1. **No posts exist**
   - Need at least one post in `content/blog/`

2. **Featured post logic failing**
   - Posts are sorted by date in `eleventy.config.js`
   - `featuredPost = posts[0]` should always work if posts exist

3. **Missing hero image**
   - Verify: `/assets/images/blog/multidisciplinary-writer-hero.jpg` exists

### Issue: Wrong Thumbnail Displaying

**Causes & Solutions:**

1. **Path mismatch in XML**
   - Check `<thumbnailImage>` path matches actual file

2. **Inline thumbnail path wrong**
   - Verify `<figure><img src="...">` path in content

3. **File doesn't exist**
   ```bash
   ls assets/images/blog/[post-slug]-thumbnail.jpg
   ```

### Issue: 404 Error on Individual Post

**Causes & Solutions:**

1. **`blog-post.njk` in wrong location**
   - MUST be at root level (NOT in `_includes/`)
   - Fix: Move to root directory

2. **Post ID mismatch**
   - `<id>` in XML must match filename (without .xml)
   - URL will be: `/blog/[id-value]/`

3. **Pagination not configured**
   - Verify pagination config at top of `blog-post.njk`

---

## Eleventy Configuration

### Posts Data Loading

**File:** `eleventy.config.js`

**How posts are loaded:**
```javascript
eleventyConfig.addGlobalData('posts', () => {
  const posts = [];
  const blogDir = path.join(__dirname, 'content/blog');

  if (fs.existsSync(blogDir)) {
    fs.readdirSync(blogDir).forEach(file => {
      if (file.endsWith('.xml')) {
        const data = parseXML(path.join(blogDir, file));
        if (data && data.post) {
          posts.push(data.post);
        }
      }
    });
  }

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));
});
```

**Key Points:**
- All `.xml` files in `content/blog/` are loaded
- Posts sorted by date (newest first)
- `posts[0]` is always the most recent post
- XML parsed with `fast-xml-parser`
- `<featured>true</featured>` becomes string `"true"`

---

## URLs & Routing

- **Blog listing:** `/blog/`
- **Individual posts:** `/blog/[post-id]/` (e.g., `/blog/writers-are-performers/`)
- **Navigation link:** "Everything Storyteller Blog"

**Static Files Generated:**
- `_site/blog/index.html`
- `_site/blog/[post-id]/index.html`
- Images copied to `_site/assets/images/`

---

## Testing Checklist

After making changes, verify:

- [ ] Hero image appears on `/blog/` header background
- [ ] Featured post displays in "Featured" section with thumbnail
- [ ] All posts display in "All Posts" section with thumbnails
- [ ] Individual post accessible at `/blog/[post-slug]/`
- [ ] Hero banner appears on individual post page
- [ ] Inline thumbnail appears in post content
- [ ] Author card displays with photo
- [ ] Pull quotes styled correctly
- [ ] Callout boxes have accent border
- [ ] Mobile layout stacks vertically
- [ ] No 404 errors for images or pages

**Build Command:**
```bash
npm run build
```

**Dev Server:**
```bash
npm run dev
```

---

## Future Enhancements

Potential additions (not yet implemented):

- Reading time estimation
- Related posts section
- Tag filtering
- Search functionality
- RSS feed
- Social sharing buttons
- Newsletter signup
- Previous/Next post navigation
- Post series support
- Draft posts (future-dated)
- Multiple authors support
- Category pages
- Archive by date

---

## Related Documentation

- **User Guide:** [HOW_TO_ADD_BLOG_POSTS.md](HOW_TO_ADD_BLOG_POSTS.md) - Step-by-step instructions for adding posts
- **Image Specs:** `assets/images/blog/README.md` - Image size and format requirements
- **Templates:** `blog.njk` (listing), `blog-post.njk` (individual posts)
- **Config:** `eleventy.config.js` - XML parsing and posts data loading

---

**Last Updated:** January 16, 2026
**Blog Version:** 1.0
**Maintained By:** Nicholas Galinski
