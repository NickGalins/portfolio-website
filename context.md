# Portfolio Website - Project Context

## Overview

This is a portfolio website for Nick Galinski built with **Eleventy (11ty)**, a static site generator. The site showcases content design and creative writing projects using an XML-based content management approach.

### Technology Stack
- **Eleventy 2.0.1** - Static site generator
- **Nunjucks** - Templating engine (.njk files)
- **XML** - Content storage format
- **fast-xml-parser** - XML parsing library
- **Cloudflare Workers** - Deployment platform

---

## Project Architecture

### How Eleventy Works in This Project

Eleventy reads **XML content files**, parses them into JavaScript objects, and injects that data into **Nunjucks templates** to generate static HTML pages.

**Build Process Flow:**
1. `eleventy.config.js` runs when you build the site
2. It reads all XML files from `content/` folders
3. Parses them using `fast-xml-parser`
4. Makes data available as global variables: `{{ projects }}`, `{{ pages }}`, `{{ navigation }}`, `{{ posts }}`
5. Templates (`.njk` files) use this data to generate HTML
6. Output goes to `_site/` folder

### Directory Structure

```
portfolio-website/
├── _includes/               # Template partials and layouts
│   ├── layouts/
│   │   └── base.njk        # Main layout wrapper
│   ├── blog-post.njk       # Blog post partial
│   └── index.njk           # Homepage partial
├── _site/                  # Generated site (DO NOT EDIT - auto-generated)
├── assets/
│   ├── css/
│   │   └── main.css        # Main stylesheet
│   ├── js/
│   │   └── main.js         # Main JavaScript
│   ├── images/             # Project images/thumbnails
│   └── video/              # Video assets
├── content/                # ALL CONTENT LIVES HERE
│   ├── blog/               # Blog post XML files
│   ├── pages/              # Static page XML files (about, contact, resume)
│   ├── projects/
│   │   ├── content-design/ # Content design project XML files
│   │   └── creative/       # Creative writing project XML files
│   └── navigation.xml      # Site navigation structure
├── about.njk               # About page template
├── blog.njk                # Blog listing template
├── contact.njk             # Contact page template
├── eleventy.config.js      # Eleventy configuration (THE BRAIN)
├── index.njk               # Homepage template
├── package.json            # Dependencies and scripts
├── project.njk             # Project detail page template (uses pagination)
├── resume.njk              # Resume page template
└── sitemap.njk             # XML sitemap template
```

---

## 🚨 COMMON ISSUES & HOW TO FIX THEM

### Issue #1: New Page Shows 404 Error

**Why This Happens:**
When you create a new XML content file, Eleventy needs to generate an HTML page from it. If the page shows a 404, it means Eleventy didn't create the HTML file in the `_site/` output directory.

**Common Causes:**
1. **Missing or incorrect `meta.id` field** - The XML file needs a unique ID
2. **Wrong XML structure** - Parser can't read the file
3. **File not in the right directory** - Eleventy only looks in specific folders
4. **Build didn't run** - You need to rebuild after creating/editing XML files

**How to Fix:**

✅ **Step 1: Verify XML Structure**
Every project XML file MUST have this structure:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project>
  <meta>
    <id>unique-project-id</id>  <!-- REQUIRED: Must be unique, lowercase, hyphen-separated -->
    <title>Project Title</title>
    <subtitle>Project Subtitle</subtitle>
    <!-- ... other meta fields ... -->
  </meta>

  <summary>Brief project description</summary>

  <content>
    <section>
      <heading>Section Title</heading>
      <body>Section content goes here</body>
    </section>
  </content>

  <outcomes>
    <outcome>First outcome</outcome>
    <outcome>Second outcome</outcome>
  </outcomes>
</project>
```

✅ **Step 2: Check File Location**
- Projects: `content/projects/content-design/` or `content/projects/creative/`
- Pages: `content/pages/`
- Blog posts: `content/blog/`

✅ **Step 3: Rebuild the Site**
```bash
npm run build
```

✅ **Step 4: Check Build Output**
Look for your project ID in the console output or check if `_site/projects/your-project-id/index.html` exists.

✅ **Step 5: Verify the URL**
Projects generate at: `/projects/[meta.id]/`
- XML file: `content/projects/creative/oathforger-chapter-1.xml`
- `<meta><id>oathforger-chapter-1</id></meta>`
- URL: `http://localhost:8080/projects/oathforger-chapter-1/`

---

### Issue #2: Page is Missing CSS Styling

**Why This Happens:**
The CSS file isn't loading, usually because the path is wrong or the assets folder wasn't copied to `_site/`.

**Common Causes:**
1. **Wrong CSS path in base.njk** - Relative paths break on nested pages
2. **Assets not copied** - `addPassthroughCopy` not configured
3. **Build didn't run** - CSS changes not reflected

**How to Fix:**

✅ **Step 1: Check base.njk Layout**
Open `_includes/layouts/base.njk` and verify the CSS link:
```html
<link rel="stylesheet" href="/assets/css/main.css">
```
**IMPORTANT:** The path MUST start with `/` (absolute path from site root). Never use relative paths like `../assets/css/main.css` because they break on nested pages like `/projects/project-id/`.

✅ **Step 2: Verify Asset Passthrough**
In `eleventy.config.js`, ensure this line exists:
```javascript
eleventyConfig.addPassthroughCopy('assets');
```

✅ **Step 3: Rebuild the Site**
```bash
npm run build
```

✅ **Step 4: Check Output**
Verify that `_site/assets/css/main.css` exists after building.

✅ **Step 5: Clear Browser Cache**
Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

---

### Issue #3: Page Content Not Showing Up

**Why This Happens:**
The template can't access the data from your XML file, usually because the data structure doesn't match what the template expects.

**Common Causes:**
1. **Template expects different XML structure** - Field names don't match
2. **Nunjucks syntax error** - Trying to access null/undefined data
3. **Data not loaded** - Config doesn't load this data type
4. **CDATA not used** - HTML/CSS in XML needs CDATA wrapper

**How to Fix:**

✅ **Step 1: Check Template Expectations**
Look at the template file (e.g., `project.njk`) and see what data it expects:
```nunjucks
{{ project.meta.title }}          <!-- Expects: <meta><title>Text</title></meta> -->
{{ project.summary }}              <!-- Expects: <summary>Text</summary> -->
{{ section.heading }}              <!-- Expects: <heading>Text</heading> -->
{{ section.body | safe }}          <!-- Expects: <body>HTML</body> -->
```

✅ **Step 2: Match XML Structure to Template**
Your XML must have the exact field names the template looks for:
```xml
<project>
  <meta>
    <title>This Must Match</title>  <!-- Used by {{ project.meta.title }} -->
  </meta>
  <summary>This Must Match</summary>  <!-- Used by {{ project.summary }} -->
</project>
```

✅ **Step 3: Use CDATA for HTML/CSS**
When embedding HTML, CSS, or JavaScript in XML, wrap it in `<![CDATA[...]]>`:
```xml
<section>
  <heading>Interactive Book</heading>
  <body>
    <![CDATA[
      <style>
        .book-page { color: #e0e1dd; }
      </style>
      <div class="book-container">
        <p>This is <strong>HTML</strong> content.</p>
      </div>
    ]]>
  </body>
</section>
```
**Why?** XML treats `<` and `>` as tag delimiters. CDATA tells the parser "this is raw content, don't parse it as XML."

✅ **Step 4: Debug with Console Logging**
In `eleventy.config.js`, add logging to see parsed data:
```javascript
console.log('📊 Parsed project:', JSON.stringify(data.project, null, 2));
```

✅ **Step 5: Use the Safe Filter**
When rendering HTML from XML, use `| safe` to prevent escaping:
```nunjucks
{{ section.body | safe }}  <!-- ✅ Renders HTML -->
{{ section.body }}         <!-- ❌ Shows escaped HTML: &lt;div&gt; -->
```

---

## How the Pagination System Works (project.njk)

The `project.njk` template uses **Eleventy's pagination** to generate one HTML page per project.

### How It Works:

**1. Pagination Configuration (Front Matter)**
```yaml
---
pagination:
  data: projects              # Use the 'projects' array
  size: 1                     # Generate 1 page per project
  alias: project              # Call each item 'project' in the template
permalink: /projects/{{ project.meta.id }}/index.html  # URL structure
---
```

**2. What Happens During Build:**
- Eleventy loads all projects from XML files (via `eleventy.config.js`)
- For EACH project in the array, it runs `project.njk` with that project's data
- It generates an HTML file at `/projects/[project-id]/index.html`

**3. Example:**
```
XML File: content/projects/creative/oathforger-chapter-1.xml
<meta><id>oathforger-chapter-1</id></meta>
↓
Eleventy generates: _site/projects/oathforger-chapter-1/index.html
URL: /projects/oathforger-chapter-1/
```

**Important:** The `permalink` uses `{{ project.meta.id }}`, so the ID must be:
- Lowercase
- Hyphen-separated
- URL-safe (no spaces, special characters)

---

## XML Content Structure Reference

### Project XML Template
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project>
  <meta>
    <id>project-url-slug</id>                    <!-- REQUIRED: URL slug -->
    <title>Project Title</title>                 <!-- REQUIRED: Page title -->
    <subtitle>Short description</subtitle>       <!-- Optional -->
    <date>2024</date>                           <!-- Optional: Year or date -->
    <client>Client Name</client>                <!-- Optional -->
    <role>Your Role</role>                      <!-- Optional -->
    <thumbnail>/assets/images/thumb.png</thumbnail>  <!-- Optional: For listings -->
    <tags>
      <tag>Tag One</tag>
      <tag>Tag Two</tag>
    </tags>
  </meta>

  <summary>
    Brief project description shown at the top. Can be empty if not needed.
  </summary>

  <content>
    <section>
      <heading>Section Title</heading>
      <body>
        <![CDATA[
          <!-- HTML content goes here -->
          <p>You can use <strong>any HTML</strong> here.</p>
          <style>
            /* Inline CSS is allowed */
            .custom-class { color: #e0e1dd; }
          </style>
        ]]>
      </body>
      <!-- Optional: Media -->
      <media>
        <image src="/assets/images/example.png" alt="Description" caption="Optional caption" />
        <!-- Or embed video/iframe: -->
        <embed type="video" src="https://youtube.com/embed/xyz" />
      </media>
    </section>

    <!-- Add more sections as needed -->
  </content>

  <outcomes>
    <outcome>First key outcome or learning</outcome>
    <outcome>Second key outcome or learning</outcome>
  </outcomes>
</project>
```

---

## Development Workflow

### Daily Development Commands

**Start Local Dev Server:**
```bash
npm run dev
```
- Starts Eleventy with live reload
- Watches for file changes
- Serves site at `http://localhost:8080`
- Automatically rebuilds when you edit files

**Build for Production:**
```bash
npm run build
```
- Generates optimized site in `_site/` folder
- Run this before deploying

**Validate XML Files:**
```bash
npm run validate
```
- Checks all XML files for syntax errors
- Run this if pages aren't showing up correctly

### Typical Workflow for Adding a New Project

1. **Create XML file** in appropriate folder:
   - `content/projects/content-design/` for content design work
   - `content/projects/creative/` for creative writing

2. **Use proper XML structure** (see template above)

3. **Choose a unique ID** (lowercase, hyphens, no spaces)

4. **Add any images** to `assets/images/`

5. **Run the dev server:**
   ```bash
   npm run dev
   ```

6. **Visit the page:**
   ```
   http://localhost:8080/projects/your-project-id/
   ```

7. **Troubleshoot if needed:**
   - Check console for XML parsing errors
   - Verify `meta.id` is unique and lowercase
   - Ensure XML structure matches template expectations
   - Check that `_site/projects/your-project-id/index.html` was generated

---

## Coding Standards & Best Practices

### For Claude: How to Work on This Project

When working on this codebase, follow these principles:

#### 1. **Comment Extensively**
Every file you create or modify should have:
- **File-level comments** explaining what the file does and its role in the system
- **Section comments** for each major block of code
- **Inline comments** for complex logic or non-obvious decisions

**Example from eleventy.config.js:**
```javascript
// ============================================================================
// ELEVENTY CONFIGURATION FILE
// ============================================================================
// This file tells Eleventy (the static site generator) how to build your site.

// HELPER FUNCTION: parseXML()
// -------------------------------------------------------------------------
// This function reads an XML file and converts it to a JavaScript object
function parseXML(filePath) {
  // Read the file as text
  const content = fs.readFileSync(filePath, 'utf-8');
  // Parse the XML text into a JavaScript object
  return xmlParser.parse(content);
}
```

#### 2. **Explain Everything You Do**
When making changes, provide a **concise summary** as if teaching a student:

**Example Response Format:**
```
I'm going to add a new project XML file for the Everland Trust & Safety case study.

WHAT I'm doing:
- Creating a new file: content/projects/content-design/everland-trust-safety.xml
- Using the project XML structure with meta, summary, content, and outcomes
- Setting the id to "everland-trust-safety" (this becomes the URL slug)

WHY I'm doing it this way:
- The file goes in content-design/ because it's a case study (not creative writing)
- The id uses hyphens (not underscores or spaces) because it becomes a URL
- I'm wrapping HTML content in CDATA so XML parser doesn't choke on HTML tags

HOW it works:
- When you run 'npm run dev', eleventy.config.js will find this file
- It gets added to the 'projects' array
- project.njk template creates a page at /projects/everland-trust-safety/
```

#### 3. **Check Your Reasoning Before Proceeding**
Before making changes, verify:
- ✅ Does this match the existing architecture?
- ✅ Will this break anything else?
- ✅ Is this the simplest solution?
- ✅ Have I considered the common issues (404s, CSS, missing content)?

**Self-Check Questions:**
- "Am I creating a new file when I should edit an existing one?"
- "Does this XML structure match what the template expects?"
- "Have I used absolute paths (`/assets/...`) instead of relative paths?"
- "Have I wrapped HTML/CSS in CDATA tags?"

#### 4. **Always Read Files Before Editing**
**NEVER** propose changes to code you haven't read. If a user asks you to modify a file:
1. Read the file first
2. Understand the existing structure
3. Make minimal, targeted changes
4. Explain what you changed and why

#### 5. **Avoid Over-Engineering**
- Don't add features that weren't requested
- Don't refactor code that works fine
- Don't add error handling for impossible scenarios
- Keep solutions simple and focused

**Example of Over-Engineering (DON'T DO THIS):**
```javascript
// ❌ Too complex for this project's needs
class ProjectValidator {
  constructor(schema) { /* ... */ }
  validate(data) { /* ... */ }
  sanitize(input) { /* ... */ }
}
```

**Example of Appropriate Solution (DO THIS):**
```javascript
// ✅ Simple and sufficient
function parseXML(filePath) {
  try {
    return xmlParser.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (e) {
    console.log('Could not parse:', filePath);
    return null;
  }
}
```

---

## Important File Paths & URLs

### Asset Paths
**In XML files, use absolute paths:**
```xml
<image src="/assets/images/project-image.png" alt="Description" />
```
NOT: `../assets/images/...` or `./assets/images/...`

**Why?** Nested pages like `/projects/project-id/` need paths relative to the site root.

### URL Structure
```
Homepage:           /
About:              /about/
Contact:            /contact/
Resume:             /resume/
Blog Listing:       /blog/
Blog Post:          /blog/post-id/
Projects:           /projects/project-id/
```

---

## Deployment

This site deploys to **Cloudflare Workers**.

**Build Output:** The `_site/` folder contains the complete static site.

**Before Deploying:**
1. Run `npm run build`
2. Verify everything looks correct in `_site/`
3. Test locally if possible
4. Deploy the `_site/` folder contents

---

## Quick Reference

### Essential Files to Know
- `eleventy.config.js` - Brain of the operation, loads all data
- `project.njk` - Template for individual project pages
- `_includes/layouts/base.njk` - Main layout wrapper (has CSS links)
- `assets/css/main.css` - Main stylesheet (includes CSS variables)

### Common Variables in Templates
```nunjucks
{{ navigation }}           - Site navigation from navigation.xml
{{ projects }}             - Array of all projects
{{ pages.about }}          - About page data
{{ pages.contact }}        - Contact page data
{{ pages.resume }}         - Resume page data
{{ posts }}                - Array of blog posts
{{ project }}              - Current project (in project.njk pagination)
```

### Color Scheme
```css
--color-bg: #0d1b2a        /* Dark navy background */
--color-text: #e0e1dd      /* Off-white text */
--color-accent: #415a77    /* Blue-gray accent */
```

**When adding styled content in XML, use these colors for consistency.**

---

## Getting Help

### Debugging Steps
1. Check the console for XML parsing errors (`npm run dev`)
2. Verify `_site/` folder contains expected HTML files
3. Check browser console for JavaScript errors
4. Validate XML files (`npm run validate`)
5. Read this context.md file for common issues
6. Check that you're using absolute paths for assets (`/assets/...`)

### Key Debugging Logs
In `eleventy.config.js`, console.log statements show what's being loaded:
```
📁 Looking for pages in: [path]
📄 Files found: [list]
🔍 Processing: [filename]
✅ Adding page: [page-id]
```

If you don't see your file in these logs, the config isn't finding it.

---

## Blog System: "Everything Storyteller"

### Purpose

**"Everything Storyteller"** is a content marketing blog showcasing writing insights, professional development, and storytelling craft. It demonstrates Nick's multidisciplinary approach to writing across technical documentation, UX content, creative storytelling, and more.

**Blog Goals:**
- Share insights about the writing craft and professional development
- Build thought leadership in the writing/content space
- Provide value to other writers and creators
- Showcase personality and expertise beyond portfolio case studies

---

### Blog Architecture

The blog uses the same XML + Nunjucks + CSS architecture as the rest of the portfolio:

**Data Flow:**
```
content/blog/*.xml → eleventy.config.js → {{ posts }} → Templates → _site/blog/
```

**Files Involved:**
- `content/blog/*.xml` - Individual blog post content files
- `blog.njk` - Blog listing page template (shows all posts)
- `_includes/blog-post.njk` - Individual post page template (uses pagination)
- `assets/css/main.css` - Blog styling (lines 756+)
- `assets/images/blog/` - Hero images for blog posts
- `assets/images/author-*.jpg` - Author photos

**URLs Generated:**
- Blog listing: `/blog/`
- Individual posts: `/blog/[post-id]/`

---

### Adding a New Blog Post

**Step 1: Create XML File**

Create a new file in `content/blog/[post-slug].xml` with this structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<post>
  <meta>
    <!-- REQUIRED FIELDS -->
    <id>post-url-slug</id>                    <!-- Used in URL: /blog/post-url-slug/ -->
    <title>Post Title</title>                 <!-- Main heading -->
    <date>2026-01-16</date>                   <!-- YYYY-MM-DD format -->

    <!-- AUTHOR INFORMATION -->
    <author>Nicholas Galinski</author>
    <authorPhoto>/assets/images/author-nick.jpg</authorPhoto>
    <authorBio>Short bio about your writing background and expertise.</authorBio>

    <!-- VISUAL & PREVIEW -->
    <heroImage>/assets/images/blog/post-hero.jpg</heroImage>
    <heroAlt>Description of hero image for accessibility</heroAlt>
    <excerpt>Brief summary for blog listings and previews (2-3 sentences).</excerpt>

    <!-- FEATURED POST (optional) -->
    <featured>true</featured>  <!-- Displays prominently on blog index -->

    <!-- TAGS (for organization) -->
    <tags>
      <tag>Writing</tag>
      <tag>Content Marketing</tag>
      <tag>Professional Development</tag>
    </tags>
  </meta>

  <content>
    <![CDATA[
      <!-- HTML content goes here with special classes for styling -->
      <p class="lead">Larger opening paragraph to hook readers.</p>

      <p>Regular paragraph text with standard formatting.</p>

      <blockquote class="pullquote">
        Emphasized quote that stands out visually.
      </blockquote>

      <h2>Section Heading</h2>

      <p>More content with <strong>bold text</strong> and <em>italics</em>.</p>

      <div class="callout">
        <h3>Highlighted Box Title</h3>
        <ul>
          <li>Important point one</li>
          <li>Important point two</li>
          <li>Important point three</li>
        </ul>
      </div>

      <figure>
        <img src="/assets/images/blog/inline-image.jpg" alt="Description">
        <figcaption>Image caption text</figcaption>
      </figure>
    ]]>
  </content>
</post>
```

**Step 2: Add Hero Image**

Place hero images in `assets/images/blog/[image-name].jpg`:
- **Recommended size:** 1200x600px (2:1 aspect ratio)
- **Format:** JPG for photos, PNG for graphics
- **Optimize for web:** Aim for under 200KB file size

**Step 3: Build and Test**

```bash
npm run dev
```

Visit `/blog/` to see your post in the listing, and `/blog/[post-id]/` to view the individual post page.

---

### Content Formatting Options

**Available CSS Classes for Rich Content:**

#### 1. Lead Paragraph (`.lead`)
Larger opening text to hook readers:
```html
<p class="lead">This is your opening hook text.</p>
```

#### 2. Pull Quotes (`.pullquote`)
Large, centered, emphasized quotes:
```html
<blockquote class="pullquote">
  Key insight or memorable quote from the post.
</blockquote>
```
**Use for:** Main thesis statements, memorable insights, key takeaways

#### 3. Callout Boxes (`.callout`)
Highlighted boxes for lists or important concepts:
```html
<div class="callout">
  <h3>Key Concepts</h3>
  <ul>
    <li>First important point</li>
    <li>Second important point</li>
    <li>Third important point</li>
  </ul>
</div>
```
**Use for:** Lists of tips, key concepts, action items, definitions

#### 4. Images with Captions (`<figure>`)
Inline images with descriptive captions:
```html
<figure>
  <img src="/assets/images/blog/example.jpg" alt="Description of image">
  <figcaption>Caption explaining what the image shows</figcaption>
</figure>
```

#### 5. Section Headings
Use standard HTML headings for structure:
```html
<h2>Main Section Title</h2>
<h3>Subsection Title</h3>
```

#### 6. Text Emphasis
Use semantic HTML for emphasis:
```html
<strong>Bold text for emphasis</strong>
<em>Italic text for subtle emphasis</em>
```

---

### Featured Posts

To make a post appear in the featured section on the blog listing page:

```xml
<meta>
  <!-- ... other meta fields ... -->
  <featured>true</featured>
</meta>
```

**What this does:**
- Displays the post prominently at the top of `/blog/`
- Uses a larger card layout with side-by-side image and content
- Shows a "Featured" badge
- Includes the full excerpt and a "Read more →" link

**Best practices:**
- Only mark ONE post as featured at a time
- Use your best/most important content as featured
- Update the featured post when you publish something new you want to highlight

---

### Visual Design System

The blog maintains the portfolio's dark navy aesthetic:

**Colors Used:**
```css
--color-bg: #0d1b2a          /* Dark navy background */
--color-bg-alt: #1b263b      /* Lighter navy for cards/callouts */
--color-text: #e0e1dd        /* Off-white body text */
--color-text-muted: #778da9  /* Blue-gray for dates/metadata */
--color-accent: #4ea8de      /* Light blue for links/highlights */
--color-accent-hover: #7cc2f0 /* Lighter blue for hover states */
--color-border: #2d3f54      /* Subtle borders */
```

**Typography:**
- Body text: 1.125rem (18px) with 1.8 line-height for readability
- Lead paragraphs: 1.5rem (24px)
- Pull quotes: 1.75rem (28px), centered, italic
- Headings: 2.5rem (40px) for h1, 1.75rem (28px) for h2

**Layout:**
- Featured post: Two-column grid (image + content)
- Post previews: Two-column grid (thumbnail + content)
- Individual posts: Single column, max-width for readability
- Author card: Horizontal layout with photo + bio
- Mobile: All layouts stack vertically

---

### Writing & Publishing Workflow

**1. Draft Your Content**
- Write in your preferred editor (Google Docs, Notion, etc.)
- Include section headings (H2, H3) for structure
- Note where you want pull quotes or callouts
- Identify 2-3 tags that categorize the post

**2. Prepare Images**
- Create or source a hero image (1200x600px)
- Optimize image for web (under 200KB)
- Write descriptive alt text
- Place in `assets/images/blog/`

**3. Create XML File**
- Use the template structure from "Adding a New Blog Post" above
- Wrap content in `<![CDATA[...]]>` tags
- Add CSS classes for lead paragraphs, pull quotes, callouts
- Set `<featured>true</featured>` if this is your highlight post

**4. Test Locally**
```bash
npm run dev
```
- Visit `/blog/` to see it in the listing
- Click through to `/blog/[post-id]/` to view the full post
- Check formatting, images, links
- Test on mobile (resize browser)

**5. Deploy**
```bash
npm run build
```
- Commit changes to git
- Push to deploy (Cloudflare Workers auto-deploys)

---

### Blog Content Strategy

Based on the first post "Writers Are Performers", the blog covers three intersecting themes:

**1. Branding Advice**
- How to position yourself as a multidisciplinary professional
- Making your variety make sense to recruiters and clients
- Standing out without being vague

**2. Storytelling Craft**
- Writing techniques across different formats
- How skills transfer between writing disciplines
- Practical tips for creating work that resonates

**3. Personal Stories**
- Behind-the-scenes reality of building a creative career
- Mindset shifts and professional growth
- Lessons learned from different writing roles

**Post Ideas for the Future:**
- How to position yourself as a "writer with range" without sounding vague
- Transferable skills from [specific writing discipline]
- Case study: How I approached [specific project]
- The [writing format] checklist: Make sure you cover these essentials
- Why I switched from [role] to [role] and what I learned

---

### Common Issues & Solutions

**Issue: Blog post not showing up**
- ✅ Check that `<id>` exists and is unique
- ✅ Ensure XML is valid (run `npm run validate`)
- ✅ Rebuild the site (`npm run build` or `npm run dev`)
- ✅ Check console for XML parsing errors
- ✅ Verify file is in `content/blog/` directory

**Issue: Hero image not displaying**
- ✅ Check image path is absolute: `/assets/images/blog/image.jpg`
- ✅ Verify image file exists in `assets/images/blog/`
- ✅ Check file extension matches XML (`.jpg` vs `.png`)
- ✅ Ensure image is optimized and not corrupted

**Issue: Content formatting looks wrong**
- ✅ Verify content is wrapped in `<![CDATA[...]]>` tags
- ✅ Check CSS class names are spelled correctly (`.pullquote`, `.callout`, `.lead`)
- ✅ Ensure HTML is valid (closing tags, proper nesting)
- ✅ Use `{{ post.content | safe }}` in template (not plain `{{ post.content }}`)

**Issue: Featured post not appearing**
- ✅ Check `<featured>true</featured>` (lowercase, no quotes)
- ✅ Ensure only ONE post has featured flag
- ✅ Verify blog.njk template has featured post section
- ✅ Check console for template errors

---

### File Locations Reference

```
portfolio-website/
├── content/
│   └── blog/
│       ├── multidisciplinary-writer.xml    ← First blog post
│       └── [future-posts].xml              ← Add new posts here
├── assets/
│   ├── css/
│   │   └── main.css                        ← Blog styles (lines 756+)
│   ├── images/
│   │   ├── blog/
│   │   │   ├── README.md                   ← Image guidelines
│   │   │   └── [hero-images].jpg           ← Post hero images
│   │   └── author-nick.jpg                 ← Author photo
│   └── js/
├── blog.njk                                 ← Blog listing page
└── _includes/
    └── blog-post.njk                        ← Individual post template
```

---

## Summary for Claude

**When working on this project:**

1. ✅ Read files before editing them
2. ✅ Comment extensively in all code
3. ✅ Explain what, why, and how for every change
4. ✅ Check reasoning before proceeding
5. ✅ Keep solutions simple and focused
6. ✅ Use absolute paths for assets (`/assets/...`)
7. ✅ Wrap HTML/CSS/JS in CDATA tags in XML
8. ✅ Ensure `meta.id` exists and is unique
9. ✅ Match XML structure to template expectations
10. ✅ Rebuild after content changes (`npm run dev`)

**Common pitfalls to avoid:**
- ❌ Using relative asset paths in nested pages
- ❌ Forgetting CDATA wrappers for HTML content
- ❌ Missing or duplicate `meta.id` fields
- ❌ Proposing changes without reading existing code
- ❌ Over-engineering simple solutions
