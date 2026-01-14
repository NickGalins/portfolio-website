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
   content/projects/content-design/  ← for Content Design work
   content/projects/creative/        ← for Creative work
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

1. Create a new XML file in `content/blog/`
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <post>
     <meta>
       <id>my-post-slug</id>
       <title>My Post Title</title>
       <date>2024-01-15</date>
       <excerpt>Brief description for the listing page.</excerpt>
       <tags>
         <tag>Topic</tag>
       </tags>
     </meta>
     <content>
       Your post content here...
     </content>
   </post>
   ```

2. Commit and push

### Editing Existing Content

1. Find the XML file you want to edit
2. Make your changes
3. Commit and push

---

## File Structure

```
portfolio/
├── content/                    # YOUR CONTENT (XML)
│   ├── navigation.xml          # Sidebar structure
│   ├── projects/
│   │   ├── content-design/     # Content Design projects
│   │   └── creative/           # Creative projects
│   ├── pages/
│   │   ├── about.xml
│   │   ├── contact.xml
│   │   └── resume.xml
│   └── blog/                   # Blog posts
│
├── assets/                     # MEDIA & STYLES
│   ├── css/main.css
│   ├── js/main.js
│   ├── images/                 # Project images
│   └── video/                  # Hero video (trailer.mp4)
│
├── _includes/                  # TEMPLATES (rarely edit)
│   └── layouts/
│
├── schemas/                    # XML VALIDATION (reference)
│
├── .github/workflows/          # AUTO-DEPLOY (don't edit)
│
├── eleventy.config.js          # BUILD CONFIG (rarely edit)
├── package.json
└── README.md
```

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
  <section id="section-id" label="Section Name">
    <category id="cat-id" label="Category Name">
      <item id="project-id" label="Project Title" />
      <!-- id must match project's meta.id -->
    </category>
  </section>
  
  <pages>
    <page id="about" label="About" />
  </pages>
</navigation>
```

---

## Adding Your Video Header

1. Export your trailer as MP4 (H.264 codec)
2. Keep it short (15-30 seconds) and under 10MB
3. Save as `assets/video/trailer.mp4`
4. The homepage will automatically use it

**Tips:**
- No audio needed (it's muted by default)
- Compress for web (HandBrake is free and works well)
- Consider a static fallback image for mobile

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
