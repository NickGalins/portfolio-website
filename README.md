# Nick Galinski Portfolio

A docs-as-code portfolio website built with XML content and Eleventy.

## Quick Start

### Prerequisites

- Node.js 20+ (download from https://nodejs.org)
- Git
- A GitHub account

### Initial Setup (One Time)

1. **Create a GitHub repository**
   - Go to github.com → New repository
   - Name it `portfolio` (or `nicholasgalinski.com`)
   - Make it **public** (required for free GitHub Pages)
   - Don't initialize with README (we have our own files)

2. **Download and extract this project**
   - Extract the files to a folder on your computer

3. **Initialize Git and push** (using GitHub Desktop or command line)
   
   Using command line:
   ```bash
   cd /path/to/portfolio
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: "GitHub Actions"
   - The site will deploy automatically on each push

5. **Connect your domain** (optional)
   - In repo Settings → Pages → Custom domain
   - Enter `nicholasgalinski.com`
   - In Cloudflare DNS, add:
     - Type: `CNAME`
     - Name: `@` or `www`
     - Target: `YOUR_USERNAME.github.io`

---

## Day-to-Day Workflow

### Adding a New Project

1. **Copy an existing project XML file**
   ```
   content/projects/case-studies/        ← for in-depth case studies
   content/projects/individual-samples/  ← for focused writing samples
   ```

2. **Edit the XML with your content**
   - Update the `<meta>` section (id, title, tags, etc.)
   - Fill in the `<content>` sections
   - Add images to `assets/images/`

3. **Add the project to navigation** (if not using existing categories)
   - Edit `content/navigation.xml`
   - Add an `<item>` element with matching `id`

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Added new project: Project Name"
   git push
   ```

5. **Wait ~2 minutes** for GitHub Actions to build and deploy

### Adding a Blog Post

See [HOW_TO_ADD_BLOG_POSTS.md](HOW_TO_ADD_BLOG_POSTS.md) for the complete guide.

Quick steps:

1. Create a new XML file in `content/blog/`
2. Add required metadata (id, title, date, author info, images)
3. Write content using HTML in a CDATA block
4. Commit and push

### Editing Existing Content

1. Find the XML file you want to edit
2. Make your changes
3. Commit and push

---

## File Structure

```
portfolio-website/
├── content/                          # YOUR CONTENT (XML)
│   ├── navigation.xml                # Sidebar menu structure
│   ├── projects/
│   │   ├── case-studies/             # In-depth case studies (7)
│   │   └── individual-samples/       # Focused writing samples (6)
│   ├── pages/
│   │   ├── about.xml
│   │   ├── contact.xml
│   │   └── resume.xml
│   └── blog/                         # Blog posts
│
├── assets/                           # MEDIA & STYLES
│   ├── css/main.css                  # Main stylesheet (CSS variables)
│   ├── js/main.js                    # Interactivity (filtering, sidebar)
│   ├── images/                       # Project images
│   │   └── blog/                     # Blog-specific images
│   └── video/                        # Video assets
│
├── _includes/                        # TEMPLATE PARTIALS
│   ├── layouts/base.njk              # Main layout wrapper
│   └── index.njk                     # Homepage components
│
├── schemas/                          # XML VALIDATION
│   ├── page.xsd
│   └── project.xsd
│
├── *.njk (root)                      # PAGE TEMPLATES
│   ├── index.njk                     # Homepage
│   ├── about.njk, contact.njk        # Static pages
│   ├── resume.njk                    # Work history
│   ├── blog.njk                      # Blog listing
│   ├── blog-post.njk                 # Individual blog posts
│   ├── project.njk                   # Individual projects
│   ├── case-studies.njk              # Case Studies landing page
│   ├── individual-samples.njk        # Individual Samples landing page
│   ├── content-history.njk           # Content History (brands, talent, shows)
│   └── sitemap.njk                   # XML sitemap for SEO
│
├── .github/workflows/deploy.yml      # AUTO-DEPLOY (don't edit)
├── eleventy.config.js                # BUILD CONFIG
└── package.json
```

---

## How It Works

### Build Process

1. You write content in XML files (`content/` folder)
2. Eleventy reads XML and converts to JavaScript objects
3. Templates (`.njk` files) use this data to generate HTML
4. Output goes to `_site/` folder and deploys to GitHub Pages

### Route Generation

Routes are created automatically from your XML `<id>` fields:

| XML Location                              | ID Value  | Generated URL       |
| ----------------------------------------- | --------- | ------------------- |
| `content/projects/creative/example.xml`   | `example` | `/projects/example/`|
| `content/blog/my-post.xml`                | `my-post` | `/blog/my-post/`    |
| `content/pages/about.xml`                 | `about`   | `/about/`           |

### Key Files

- **`eleventy.config.js`** - Loads XML data and makes it available to templates
- **`project.njk`** - Uses pagination to create one page per project
- **`blog-post.njk`** - Uses pagination to create one page per blog post

---

## Content Reference

### Project XML Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project>
  <meta>
    <id>unique-slug</id>                    <!-- URL: /projects/unique-slug/ -->
    <title>Project Title</title>
    <subtitle>Brief tagline</subtitle>       <!-- Optional -->
    <date>2024</date>                        <!-- Optional -->
    <client>Client Name</client>             <!-- Optional -->
    <role>Your Role</role>                   <!-- Optional -->
    <thumbnail>/assets/images/thumb.png</thumbnail>  <!-- Optional -->
    <tags>
      <tag>UX Writing</tag>
      <tag>Content Design</tag>
    </tags>
  </meta>
  
  <summary>
    One paragraph overview of the project.
  </summary>
  
  <content>
    <section>
      <heading>Section Title</heading>
      <body>
        Section content. Can include basic HTML if needed.
      </body>
      <media>                                <!-- Optional -->
        <image src="/assets/images/example.png" 
               alt="Description" 
               caption="Optional caption" />
        <embed type="twine" src="/assets/demos/demo.html" />
      </media>
    </section>
    <!-- Add more sections as needed -->
  </content>
  
  <outcomes>                                 <!-- Optional -->
    <outcome>Key result or metric</outcome>
    <outcome>Another outcome</outcome>
  </outcomes>
</project>
```

### Navigation XML Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<navigation>
  <section id="case-studies" label="Case Studies" landing="/case-studies/">
    <item id="project-id" label="Project Title" />
    <!-- id must match project's meta.id -->
  </section>

  <section id="individual-samples" label="Individual Samples" landing="/individual-samples/">
    <item id="sample-id" label="Sample Title" />
  </section>

  <!-- Sections can use anchor links for in-page navigation -->
  <section id="content-history" label="Content History" landing="/content-history/">
    <item id="production" label="Production" anchor="/content-history/#production" />
    <item id="copywriting" label="Copywriting" anchor="/content-history/#copywriting" />
    <item id="publications" label="Publications" anchor="/content-history/#publications" />
  </section>

  <pages>
    <page id="about" label="About" />
  </pages>
</navigation>
```

### Blog Post XML Structure

For detailed blog instructions, see [HOW_TO_ADD_BLOG_POSTS.md](HOW_TO_ADD_BLOG_POSTS.md).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<post>
  <meta>
    <id>post-url-slug</id>                    <!-- URL: /blog/post-url-slug/ -->
    <title>Post Title</title>
    <date>2026-01-15</date>                   <!-- YYYY-MM-DD format -->
    <author>Nicholas Galinski</author>
    <authorPhoto>/assets/images/author-nick.jpg</authorPhoto>
    <authorBio>Brief bio text.</authorBio>
    <heroImage>/assets/images/blog/hero.jpg</heroImage>
    <thumbnailImage>/assets/images/blog/thumb.jpg</thumbnailImage>
    <excerpt>Brief summary for listings.</excerpt>
    <featured>true</featured>                  <!-- Show in featured section -->
    <tags>
      <tag>Writing</tag>
    </tags>
  </meta>
  <content>
    <![CDATA[
      <p class="lead">Opening paragraph.</p>
      <p>Regular content with HTML formatting...</p>
      <blockquote class="pullquote">Key quote</blockquote>
    ]]>
  </content>
</post>
```

---

## Video Header (Homepage)

The homepage features a Vimeo video background that autoplays.

### Current Setup

- Video is embedded from Vimeo (not a local file)
- Autoplays muted, loops continuously
- Desktop: 80vh height | Mobile: 50vh height

### Changing the Video

1. Upload your video to Vimeo
2. Get the embed URL (e.g., `https://player.vimeo.com/video/YOUR_ID`)
3. Edit `_includes/layouts/base.njk`
4. Update the iframe `src` attribute with your video URL

**Video tips:**

- Keep it short (15-30 seconds for the loop)
- No audio needed (muted by default)
- Works best with subtle, ambient footage

---

## Desktop vs Mobile

The site uses a single breakpoint at **768px**. Here's what changes:

| Feature        | Desktop (>768px)           | Mobile (≤768px)          |
| -------------- | -------------------------- | ------------------------ |
| Sidebar        | Fixed 280px, collapsible   | Hidden, hamburger menu   |
| Right menu     | Sticky navigation          | Hidden                   |
| Project grid   | 4 columns                  | Auto-fill responsive     |
| Tag filters    | Collapsible panel          | Hidden                   |
| Video hero     | 80vh height                | 50vh height              |
| Image magnifier| Hover effect               | Disabled                 |

Mobile-hidden features are intentional to simplify the experience on smaller screens.

---

## Customization

### Colors & Fonts

Edit `assets/css/main.css` and update the CSS custom properties at the top:

```css
:root {
  --color-accent: #2563eb;      /* Your brand color */
  --color-text: #1a1a1a;
  --font-sans: 'Inter', sans-serif;
}
```

### Adding Dark Mode

Uncomment the dark mode section in `main.css`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f172a;
    /* ... */
  }
}
```

---

## Documentation

This project includes detailed guides for specific features:

| File                                                              | Description                         |
| ----------------------------------------------------------------- | ----------------------------------- |
| [HOW_TO_ADD_BLOG_POSTS.md](HOW_TO_ADD_BLOG_POSTS.md)              | Blog post creation guide            |
| [CARD-IMAGES.md](CARD-IMAGES.md)                                  | Homepage card image specifications  |
| [TAG-SYSTEM.md](TAG-SYSTEM.md)                                    | Tag filtering system reference      |
| [context.md](context.md)                                          | Technical context for AI assistants |
| [BLOG_IMPLEMENTATION_CONTEXT.md](BLOG_IMPLEMENTATION_CONTEXT.md)  | Blog system architecture            |
| [assets/images/README.md](assets/images/README.md)                | Project image guidelines            |
| [assets/images/blog/README.md](assets/images/blog/README.md)      | Blog image guidelines               |
| [assets/video/README.md](assets/video/README.md)                  | Video asset guidelines              |
| [SECURITY.md](SECURITY.md)                                        | Security best practices and issues  |

---

## Troubleshooting

### Site not updating after push?

1. Check GitHub Actions: Go to repo → Actions tab
2. Look for failed builds (red X)
3. Click to see error details

### Styling looks wrong?

1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache

### Project not showing in nav?

1. Make sure the `id` in your project XML matches the `id` in `navigation.xml`
2. Check for typos in the XML

### Blog post not appearing?

1. Check that `meta.id` is unique and URL-friendly (lowercase, hyphens)
2. Verify the file is in `content/blog/` folder
3. Ensure the date format is `YYYY-MM-DD`

### Tag filters not working?

Tag filters are **desktop only** (hidden on mobile). On desktop:

1. Check that project XML has valid `<tag>` elements
2. Verify tags match those defined in [TAG-SYSTEM.md](TAG-SYSTEM.md)

---

## Local Development (Optional)

If you want to preview changes before pushing:

```bash
# Install dependencies (first time only)
npm install

# Start dev server
npm run dev

# Open http://localhost:8080
```

---

## Need Help?

- Eleventy docs: https://www.11ty.dev/docs/
- XML basics: The schemas in `/schemas/` show expected structure
- GitHub Pages: https://docs.github.com/en/pages
