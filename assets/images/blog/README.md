# Blog Images Directory

This directory contains hero images and other visual assets for blog posts.

## Image Specifications

### 1. Hero Images (Full-width banner on individual post pages)

**Recommended Resolution:** `1600 x 800 pixels`
**Aspect Ratio:** `2:1` (width:height)
**Minimum Resolution:** `1200 x 600 pixels`
**Maximum File Size:** `200 KB` (optimized for web)
**Format:** JPG (for photographs) or PNG (for graphics with text)

**Display Behavior:**

- Individual post pages: Full-width banner at top with max-height of 500px, uses `object-fit: cover`
- Featured post section: Displays at ~50% width in 2-column grid on desktop
- Blog listing page: Displays as square thumbnail (cropped to 1:1 aspect ratio)
- Mobile: Full-width, stacks vertically

**Design Tip:** Keep important content centered since the image will be cropped to square (1:1) for blog listing thumbnails. The center portion should look good as both 2:1 (hero) and 1:1 (thumbnail).

---

### 2. Post Thumbnails (Square images for blog listings and inline content)

**Recommended Resolution:** `400 x 400 pixels`
**Aspect Ratio:** `1:1` (square)
**Minimum Resolution:** `300 x 300 pixels`
**Maximum File Size:** `100 KB` (optimized for web)
**Format:** JPG (for photographs) or PNG (for graphics with text)

**Naming Convention:** `[post-id]-thumbnail.jpg` (e.g., `writers-are-performers-thumbnail.jpg`)

**Display Behavior:**

- Blog listing page: Displays as square thumbnail (~200px wide on desktop)
- Individual post content: Can be inserted inline as a visual break using `<figure>` tags
- Mobile: Full-width when inline, maintains square aspect ratio in listings

**Dual Purpose:** The thumbnail serves two roles:

1. **Blog listing card image** - appears as a square preview on the blog index
2. **Inline content image** - can be placed within blog post content to break up text sections

**Design Tip:** Since this is a square format, design with the full square in mind. Center your focal point and ensure the composition works within square constraints. This image is separate from the hero image and should complement it without duplicating content.

---

### 2. Author Photos

**Recommended Resolution:** `256 x 256 pixels` (square)
**Minimum Resolution:** `128 x 128 pixels`
**Aspect Ratio:** `1:1` (square)
**Maximum File Size:** `50 KB`
**Format:** JPG

**Location:** Place in parent directory: `assets/images/author-[name].jpg`

**Display Behavior:**

- Displays at 64x64px with circular crop (`border-radius: 50%`)
- Shown in author card on individual blog posts
- 256x256 ensures crisp display on retina/high-DPI screens (2x scale)

**Design Tip:** Center face in the square with padding around edges. Circular crop will cut corners, so avoid important content near edges. Use solid or simple backgrounds.

---

## Current Needs

### Hero Image for "Writers Are Performers" Post

**File needed:** `multidisciplinary-writer-hero.jpg`
**Suggested theme:** Theater stage with spotlight, performance concept, or writing/storytelling visual metaphor
**Dimensions:** 1600 x 800 pixels (2:1 ratio)
**Format:** JPG or PNG

### Thumbnail for "Writers Are Performers" Post

**File needed:** `writers-are-performers-thumbnail.jpg`
**Suggested theme:** Visual representation of multidisciplinary writing as performance (complement to hero image)
**Dimensions:** 400 x 400 pixels (1:1 square)
**Format:** JPG or PNG

### Author Photo

**File needed:** `../author-nick.jpg` (in parent images directory)
**Description:** Professional headshot of Nicholas Galinski
**Dimensions:** 256 x 256 pixels (square)
**Format:** JPG

---

## Usage in XML

Hero images are referenced in blog post XML files:

```xml
<heroImage>/assets/images/blog/multidisciplinary-writer-hero.jpg</heroImage>
<heroAlt>Description of the image for accessibility</heroAlt>
```

Author photos are referenced in the meta section:

```xml
<authorPhoto>/assets/images/author-nick.jpg</authorPhoto>
```

---

## How Images Display Across the Site

### Individual Blog Post Page (`/blog/[post-id]/`)

- **Hero image:** Full-width banner at top, max-height 500px, `object-fit: cover`
- **Author photo:** 64x64px circular thumbnail in author card

### Blog Listing Page (`/blog/`)

- **Featured post:** Hero image displays in 2-column grid (~50% width on desktop)
- **Regular previews:** Hero image cropped to 16:9 aspect ratio thumbnail (~200px wide)

### Mobile (< 768px)

- All layouts stack vertically
- Hero images extend full-width
- Thumbnails maintain 16:9 aspect ratio

---

## Image Display Behavior

**Hero Image Usage:**

1. **Individual post page:** Full-width banner at top (2:1 aspect ratio, max-height 500px)
2. **Featured post section:** Uses full 2:1 image in prominent card layout
3. **Blog listing thumbnails:** **Automatically cropped to square (1:1)** via CSS `aspect-ratio` property

**Important:** Since the hero image is cropped to 1:1 for blog listing cards, keep the most important visual content centered. The center square portion should work as a standalone composition.

**Thumbnail Image Usage:**

Separate square thumbnail images (e.g., `writers-are-performers-thumbnail.jpg`) can be used for:

1. **Blog listing cards** - replacing the hero image for better square composition control
2. **Inline content images** - placed within post content using `<figure>` tags

**Design Strategy:**

- **Hero image (2:1):** Design for wide banner display, but ensure center square looks good for cropping
- **Thumbnail (1:1):** Native square composition for listings and inline content breaks
- Test both images to ensure they complement each other visually

---

## Optimization Tips

**Compression Tools:**

- TinyPNG (<https://tinypng.com/>)
- ImageOptim (Mac)
- Squoosh (<https://squoosh.app/>)

**Export Settings:**

- JPG quality: 80-85%
- Use progressive JPG for faster perceived loading
- Strip metadata to reduce file size
- Resize to exact dimensions before optimizing

**Safe Zones for Hero Images:**

- **Critical content:** Center 60% of image (will be visible everywhere)
- **Secondary content:** Middle 80% (visible in most views)
- **Edges:** Outer 10% may be cropped in some thumbnail views
