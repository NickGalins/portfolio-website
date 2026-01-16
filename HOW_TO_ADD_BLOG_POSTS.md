# How to Add New Blog Posts to "Everything Storyteller"

This guide explains how to add new blog posts to the "Everything Storyteller" blog. Follow these steps to ensure your posts display correctly across all pages.

---

## Quick Start Checklist

- [ ] Create XML file in `content/blog/[post-slug].xml`
- [ ] Create square thumbnail image (400x400px) in `assets/images/blog/[post-slug]-thumbnail.jpg`
- [ ] Add XML metadata (title, date, excerpt, tags)
- [ ] Write post content with proper HTML structure
- [ ] Include inline thumbnail image after opening section
- [ ] Verify post appears in "All Posts" section on `/blog/`
- [ ] Check that most recent post appears in "Featured" section
- [ ] Confirm shared hero image appears on all pages

---

## Image System Overview

### Understanding the Image Strategy

The blog uses a **shared hero image system** across all posts:

1. **Shared Hero Image** (`multidisciplinary-writer-hero.jpg`)
   - **Dimensions:** 1600 x 800 pixels (2:1 aspect ratio)
   - **File location:** `assets/images/blog/multidisciplinary-writer-hero.jpg`
   - **Used in 3 places:**
     - Background of `/blog/` page header (with dark overlay)
     - Full-width banner at top of ALL individual blog posts
     - Featured post section on `/blog/` (if using hero fallback)
   - **Important:** This is the SAME image across all blog posts

2. **Individual Post Thumbnail** (e.g., `writers-are-performers-thumbnail.jpg`)
   - **Dimensions:** 400 x 400 pixels (1:1 square)
   - **File location:** `assets/images/blog/[post-slug]-thumbnail.jpg`
   - **Used in 3 places:**
     - Thumbnail next to post title in "All Posts" section on `/blog/`
     - Thumbnail in "Featured" section on `/blog/`
     - First inline image in blog post content (after opening section)
   - **Important:** Each post has its OWN unique thumbnail

### Why This System?

- **Consistency:** The shared hero image creates visual cohesion across the blog
- **Branding:** The prism/multidisciplinary theme reinforces the blog's identity
- **Efficiency:** Only need to create one thumbnail per post (not a hero AND thumbnail)
- **Flexibility:** Each post gets its own visual identity via the square thumbnail

---

## Step-by-Step: Adding a New Blog Post

### Step 1: Create the Thumbnail Image

1. **Design a square thumbnail** (400 x 400 pixels)
   - Theme: Visual representation of your post topic
   - Format: JPG or PNG
   - File size: Under 100 KB (optimize for web)

2. **Save as:** `assets/images/blog/[post-slug]-thumbnail.jpg`
   - Example: `assets/images/blog/building-a-writer-brand-thumbnail.jpg`

3. **Optimization tips:**
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - JPG quality: 80-85%
   - Center your focal point (square format)

### Step 2: Create the Blog Post XML File

1. **Create file:** `content/blog/[post-slug].xml`
   - Use lowercase, hyphens for spaces
   - Example: `content/blog/building-a-writer-brand.xml`

2. **Copy this template:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<post>
  <meta>
    <!-- REQUIRED: Unique identifier (matches filename without .xml) -->
    <id>building-a-writer-brand</id>

    <!-- REQUIRED: Post title -->
    <title>How to Build a Writer Brand That Doesn't Sound Generic</title>

    <!-- REQUIRED: Publication date (YYYY-MM-DD) -->
    <date>2026-01-20</date>

    <!-- AUTHOR INFORMATION (use same for all posts) -->
    <author>Nicholas Galinski</author>
    <authorPhoto>/assets/images/author-nick.jpg</authorPhoto>
    <authorBio>Multidisciplinary writer specializing in technical documentation, UX content, and creative storytelling. Former English teacher who brings narrative craft to every form of writing.</authorBio>

    <!-- SHARED HERO IMAGE (same for ALL posts) -->
    <heroImage>/assets/images/blog/multidisciplinary-writer-hero.jpg</heroImage>
    <heroAlt>A prism showing ideas coming in and various types of story content coming out</heroAlt>

    <!-- POST-SPECIFIC THUMBNAIL (unique to this post) -->
    <thumbnailImage>/assets/images/blog/building-a-writer-brand-thumbnail.jpg</thumbnailImage>
    <thumbnailAlt>Visual representation of building a writer brand</thumbnailAlt>

    <!-- EXCERPT (shown in listings, ~1-2 sentences) -->
    <excerpt>Most writer brands sound the same. Here's how to stand out without sounding vague or generic.</excerpt>

    <!-- FEATURED FLAG (set to "true" for most recent post) -->
    <featured>true</featured>

    <!-- TAGS (3-5 relevant categories) -->
    <tags>
      <tag>Writing</tag>
      <tag>Content Marketing</tag>
      <tag>Professional Development</tag>
    </tags>
  </meta>

  <content>
    <![CDATA[
      <!-- OPENING PARAGRAPH (use .lead class for larger text) -->
      <p class="lead">Your opening hook goes here. This paragraph is styled larger to draw readers in.</p>

      <!-- REGULAR CONTENT -->
      <p>Regular paragraph text continues here...</p>

      <p>More content building your argument...</p>

      <!-- INLINE THUMBNAIL (place after opening section, ~2-4 paragraphs in) -->
      <figure>
        <img src="/assets/images/blog/building-a-writer-brand-thumbnail.jpg" alt="Visual representation of building a writer brand">
      </figure>

      <!-- SECTION HEADING -->
      <h2>Main Section Heading</h2>

      <p>Continue your content...</p>

      <!-- PULL QUOTE (for key insights or memorable quotes) -->
      <blockquote class="pullquote">
        Your most important insight or memorable quote goes here.
      </blockquote>

      <!-- MORE CONTENT -->
      <p>Keep building your narrative...</p>

      <!-- CALLOUT BOX (for lists, tips, or highlighted information) -->
      <div class="callout">
        <h3>Key Takeaways</h3>
        <ul>
          <li>First important point</li>
          <li>Second important point</li>
          <li>Third important point</li>
        </ul>
      </div>

      <!-- CLOSING CONTENT -->
      <p>Your concluding thoughts and call to action...</p>
    ]]>
  </content>
</post>
```

### Step 3: Customize Your Post

1. **Update the `<id>`:** Must match your filename (without `.xml`)
2. **Write your `<title>`:** The main heading readers will see
3. **Set the `<date>`:** Use YYYY-MM-DD format; determines sort order
4. **Create your `<excerpt>`:** 1-2 sentence summary for listings
5. **Choose `<tags>`:** 3-5 relevant categories
6. **Update thumbnail paths:** Both in `<thumbnailImage>` and in inline `<figure>` tag

### Step 4: Write Your Content

**Content Structure Best Practices:**

1. **Opening (1-3 paragraphs):**
   - Start with `.lead` paragraph (larger text)
   - Hook the reader immediately
   - Set up the problem or topic

2. **After opening, insert thumbnail:**
   ```html
   <figure>
     <img src="/assets/images/blog/[post-slug]-thumbnail.jpg" alt="Description">
   </figure>
   ```

3. **Body (3-5 sections):**
   - Use `<h2>` for section headings
   - Regular `<p>` paragraphs
   - Add pull quotes for key insights
   - Use callout boxes for lists/tips

4. **Closing (1-2 paragraphs):**
   - Summarize key points
   - Call to action (follow blog, read next post, etc.)

**Available Content Styles:**

```html
<!-- Lead paragraph (larger opening text) -->
<p class="lead">Opening paragraph text</p>

<!-- Pull quote (large, centered, emphasized) -->
<blockquote class="pullquote">
  Key insight or memorable quote
</blockquote>

<!-- Callout box (highlighted section with left accent border) -->
<div class="callout">
  <h3>Section Title</h3>
  <p>Highlighted content or lists</p>
</div>

<!-- Image with caption -->
<figure>
  <img src="/path/to/image.jpg" alt="Description">
  <figcaption>Caption text appears below image</figcaption>
</figure>
```

### Step 5: Set the Featured Post

**Important:** Only ONE post should have `<featured>true</featured>` at a time.

- **Most recent post:** Set `<featured>true</featured>`
- **Older posts:** Set `<featured>false</featured>` or remove the tag

The featured post will appear in the prominent "Featured" section at the top of `/blog/`.

### Step 6: Build and Test

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Start dev server:**
   ```bash
   npm run dev
   ```

3. **Check these pages:**
   - `/blog/` - Verify post appears in "All Posts" section
   - `/blog/` - Verify most recent post appears in "Featured" section
   - `/blog/[post-slug]/` - Verify individual post displays correctly

4. **Verify images:**
   - [ ] Shared hero image appears on `/blog/` header background
   - [ ] Shared hero image appears as banner on individual post page
   - [ ] Post thumbnail appears next to post in "All Posts" section
   - [ ] Post thumbnail appears in "Featured" section (if featured)
   - [ ] Post thumbnail appears inline in post content

---

## How Posts Are Displayed

### On `/blog/` (Blog Listing Page)

1. **Header Section:**
   - Background: Shared hero image (`multidisciplinary-writer-hero.jpg`)
   - Title: "Everything Storyteller"
   - Tagline: "Stories, insights, and lessons from a multidisciplinary writer"

2. **Featured Post Section:**
   - Shows the most recent post with `<featured>true</featured>`
   - Layout: Two-column (thumbnail on left, content on right)
   - Image: Post-specific thumbnail (square)
   - Content: Title, date, author, excerpt, "Read more" link

3. **All Posts Section:**
   - Lists all posts sorted by date (newest first)
   - Layout: Thumbnail on left, content on right
   - Image: Post-specific thumbnail (square)
   - Content: Title, date, author, excerpt, tags

### On `/blog/[post-slug]/` (Individual Post Page)

1. **Hero Banner:**
   - Image: Shared hero image (`multidisciplinary-writer-hero.jpg`)
   - Full-width at top of page
   - Max-height: 500px

2. **Post Header:**
   - Title, date, author name, tags

3. **Author Card:**
   - Author photo (circular)
   - Name and bio

4. **Post Content:**
   - Opening paragraphs
   - Inline thumbnail (after opening section)
   - Body sections with headings
   - Pull quotes and callout boxes
   - Closing paragraphs

5. **Footer:**
   - "← Back to Everything Storyteller" link
   - Disclaimer and copyright

---

## File Structure Reference

```
portfolio-website/
├── content/
│   └── blog/
│       ├── writers-are-performers.xml          ← Example post
│       └── building-a-writer-brand.xml         ← Your new post
├── assets/
│   └── images/
│       ├── author-nick.jpg                      ← Author photo (shared)
│       └── blog/
│           ├── multidisciplinary-writer-hero.jpg     ← Shared hero (ALL posts)
│           ├── writers-are-performers-thumbnail.jpg  ← Post 1 thumbnail
│           └── building-a-writer-brand-thumbnail.jpg ← Post 2 thumbnail
├── blog.njk                                     ← Blog listing template
├── blog-post.njk                                ← Individual post template
└── HOW_TO_ADD_BLOG_POSTS.md                    ← This guide
```

---

## Common Issues & Solutions

### Issue: New post doesn't appear on `/blog/`

**Solution:**
1. Verify XML file is in `content/blog/` directory
2. Check that `<id>` field is present and matches filename
3. Rebuild the site: `npm run build`

### Issue: Images not displaying

**Solution:**
1. Check file paths start with `/` (e.g., `/assets/images/blog/...`)
2. Verify image files exist in correct locations
3. Check file names match exactly (case-sensitive on some systems)

### Issue: Featured section is empty

**Solution:**
1. Ensure at least one post has `<featured>true</featured>`
2. Check that featured post has required fields (id, title, date)
3. Verify posts array is sorted by date (newest first)

### Issue: Wrong thumbnail appearing

**Solution:**
1. Verify `<thumbnailImage>` path in XML metadata
2. Check inline `<figure>` tag uses correct path
3. Ensure thumbnail file exists at specified path

### Issue: Hero image not appearing on individual post

**Solution:**
1. All posts should use same hero image path: `/assets/images/blog/multidisciplinary-writer-hero.jpg`
2. Verify hero image file exists
3. Check `<heroImage>` field in post XML metadata

---

## XML Field Reference

### Required Fields

| Field | Description | Example |
|-------|-------------|---------|
| `<id>` | Unique slug (matches filename) | `building-a-writer-brand` |
| `<title>` | Post title | `How to Build a Writer Brand` |
| `<date>` | Publication date (YYYY-MM-DD) | `2026-01-20` |

### Author Fields (Same for All Posts)

| Field | Description | Value |
|-------|-------------|-------|
| `<author>` | Author name | `Nicholas Galinski` |
| `<authorPhoto>` | Author photo path | `/assets/images/author-nick.jpg` |
| `<authorBio>` | Brief author bio | (See template above) |

### Image Fields

| Field | Description | Example |
|-------|-------------|---------|
| `<heroImage>` | Shared hero (ALL posts) | `/assets/images/blog/multidisciplinary-writer-hero.jpg` |
| `<heroAlt>` | Hero image alt text | `A prism showing ideas coming in and various types of story content coming out` |
| `<thumbnailImage>` | Post-specific thumbnail | `/assets/images/blog/[post-slug]-thumbnail.jpg` |
| `<thumbnailAlt>` | Thumbnail alt text | Description of thumbnail image |

### Optional Fields

| Field | Description | Example |
|-------|-------------|---------|
| `<excerpt>` | Short summary (1-2 sentences) | `Here's how I embraced being a multidisciplinary writer.` |
| `<featured>` | Featured post flag | `true` or `false` |
| `<tags>` | Category tags | See template for structure |

---

## Content Formatting Guide

### Paragraphs

```html
<p>Regular paragraph text</p>
<p class="lead">Larger opening paragraph</p>
```

### Headings

```html
<h2>Main Section Heading</h2>
<h3>Subsection Heading</h3>
```

### Emphasis

```html
<em>Italicized text</em>
<strong>Bold text</strong>
```

### Lists

```html
<ul>
  <li>Unordered list item</li>
  <li>Another item</li>
</ul>

<ol>
  <li>Ordered list item</li>
  <li>Next step</li>
</ol>
```

### Links

```html
<a href="https://example.com">Link text</a>
```

### Pull Quotes

```html
<blockquote class="pullquote">
  A memorable quote or key insight that deserves emphasis.
</blockquote>
```

### Callout Boxes

```html
<div class="callout">
  <h3>Highlighted Section</h3>
  <p>Important information or tips that stand out from main content.</p>
  <ul>
    <li>Can include lists</li>
    <li>Or multiple paragraphs</li>
  </ul>
</div>
```

### Images

```html
<!-- Simple image -->
<figure>
  <img src="/assets/images/blog/image.jpg" alt="Description">
</figure>

<!-- Image with caption -->
<figure>
  <img src="/assets/images/blog/image.jpg" alt="Description">
  <figcaption>Caption text appears below the image</figcaption>
</figure>
```

---

## Design Guidelines

### Content Length
- **Minimum:** 800 words (5-minute read)
- **Optimal:** 1,200-1,800 words (7-10 minute read)
- **Maximum:** 2,500 words (15-minute read)

### Structure
1. **Hook:** Lead paragraph that grabs attention
2. **Context:** Set up the problem or topic
3. **Body:** 3-5 main sections with clear headings
4. **Examples:** Use stories, anecdotes, or case studies
5. **Takeaways:** Callout box with key points
6. **Close:** Summary and call to action

### Visual Rhythm
- **Every 3-4 paragraphs:** Break with heading, pull quote, or callout
- **After opening section:** Insert inline thumbnail
- **1-2 pull quotes per post:** Highlight key insights
- **1-2 callout boxes per post:** Lists or highlighted sections

### Writing Style
- **Conversational but professional**
- **Active voice preferred**
- **Short paragraphs (3-5 sentences)**
- **Varied sentence length**
- **Clear, specific examples**

---

## Publishing Checklist

Before publishing a new post:

- [ ] XML file created with correct filename
- [ ] Thumbnail image created and optimized (400x400px, <100KB)
- [ ] All required fields filled in XML metadata
- [ ] Shared hero image path is correct (same for all posts)
- [ ] Post-specific thumbnail path is correct (unique per post)
- [ ] Inline thumbnail inserted after opening section
- [ ] Content uses proper HTML structure (paragraphs, headings, etc.)
- [ ] Pull quotes and callout boxes used effectively
- [ ] Featured flag set correctly (only one post should be featured)
- [ ] Tags are relevant and consistent with other posts
- [ ] Excerpt is clear and compelling (1-2 sentences)
- [ ] Alt text provided for all images
- [ ] Build succeeds without errors: `npm run build`
- [ ] Post appears in "All Posts" section on `/blog/`
- [ ] Most recent post appears in "Featured" section
- [ ] Individual post page displays correctly at `/blog/[post-slug]/`
- [ ] All images load correctly (hero, thumbnail, inline)
- [ ] Mobile layout looks good (test responsive design)
- [ ] Links work correctly (if any)
- [ ] Spelling and grammar checked

---

## Quick Reference: Image Usage

| Location | Image | Dimensions | Path |
|----------|-------|------------|------|
| `/blog/` header background | Shared hero | 1600x800 | `/assets/images/blog/multidisciplinary-writer-hero.jpg` |
| `/blog/` Featured thumbnail | Post thumbnail | 400x400 | `/assets/images/blog/[post-slug]-thumbnail.jpg` |
| `/blog/` All Posts thumbnail | Post thumbnail | 400x400 | `/assets/images/blog/[post-slug]-thumbnail.jpg` |
| `/blog/[post-slug]/` banner | Shared hero | 1600x800 | `/assets/images/blog/multidisciplinary-writer-hero.jpg` |
| `/blog/[post-slug]/` inline | Post thumbnail | 400x400 | `/assets/images/blog/[post-slug]-thumbnail.jpg` |

**Key Points:**
- ✅ **Hero image:** Same for ALL posts (`multidisciplinary-writer-hero.jpg`)
- ✅ **Thumbnail:** Unique per post (`[post-slug]-thumbnail.jpg`)
- ✅ **Thumbnail used in 3 places:** All Posts section, Featured section, inline content

---

## Need Help?

If you encounter issues:

1. Check this guide's "Common Issues & Solutions" section
2. Review the example post: `content/blog/writers-are-performers.xml`
3. Verify file structure matches the reference above
4. Check browser console for errors (F12 in most browsers)
5. Rebuild the site: `npm run build`

For technical documentation:
- **Blog templates:** `blog.njk`, `blog-post.njk`
- **Image specs:** `assets/images/blog/README.md`
- **Implementation details:** `BLOG_IMPLEMENTATION_CONTEXT.md`

---

**Last Updated:** January 16, 2026
**Blog Version:** 1.0
**Maintained By:** Nicholas Galinski
