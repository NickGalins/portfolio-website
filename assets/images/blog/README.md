# Blog Images Directory

This directory contains hero images and other visual assets for blog posts.

## Current Needs

### Hero Image for "Writers Are Performers" Post
**File needed:** `multidisciplinary-writer-hero.jpg`
**Suggested theme:** Theater stage with spotlight, performance concept, or writing/storytelling visual metaphor
**Dimensions:** Approximately 1200x600px (2:1 ratio works well)
**Format:** JPG or PNG

### Author Photo
**File needed:** `../author-nick.jpg` (in parent images directory)
**Description:** Professional headshot of Nicholas Galinski
**Dimensions:** Square format, at least 256x256px
**Format:** JPG

## Usage

Hero images are referenced in blog post XML files:
```xml
<heroImage>/assets/images/blog/multidisciplinary-writer-hero.jpg</heroImage>
<heroAlt>Description of the image</heroAlt>
```

They display:
- Full-width at the top of individual blog posts
- As thumbnails in the featured post section on the blog listing page
- As smaller thumbnails in regular post previews

## Image Guidelines

- **Hero images:** 1200x600px minimum, 2:1 aspect ratio
- **Format:** JPG for photos, PNG for graphics with transparency
- **File size:** Optimize for web (aim for under 200KB)
- **Alt text:** Always provide descriptive alt text in the XML
