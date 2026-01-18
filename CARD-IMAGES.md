# Homepage Card Images Documentation

## Overview
The homepage displays project cards organized by category. Each card can display a thumbnail image that appears at 70% opacity by default and fades to 100% on hover.

## How It Works

### Image Location
All card images are stored in: `assets/images/`

### Image Specifications
- **Format:** JPG (recommended) or PNG
- **Dimensions:** 600x600px minimum (1:1 square aspect ratio)
- **Color:** RGB 8-bit, sRGB color profile
- **Quality:** 70-80% compression for JPG
- **File size:** Under 100KB per image ideally

### Template Configuration
Card images are mapped in `index.njk` using a Nunjucks object:

```nunjucks
{% set cardImages = {
  'everland-trust-safety': 'everland-trust-safety-card.jpg',
  'aws-ai-agents': 'aws-ai-agents-tools-card.jpg',
  'sacred-grounds-shop': 'sg-shop-processes-card.jpg'
} %}
```

The key is the project's `id` from `navigation.xml`, and the value is the image filename.

### Adding New Card Images

1. **Create the image** at 600x600px (or larger), export as JPG with sRGB profile
2. **Name the file** descriptively (e.g., `project-name-card.jpg`)
3. **Add to** `assets/images/`
4. **Update** `index.njk` by adding a new line to the `cardImages` object:
   ```nunjucks
   'project-id': 'your-image-filename.jpg'
   ```

### Remaining Projects Needing Images

**Technical Writing Samples:**
- `google-translate-lens` - Google - Translate with Lens
- `sacred-grounds-rulebook` - Sacred Grounds - Rulebook Examples
- `aws-api-documentation` - AWS - API Documentation

**Case Studies (Storytelling & Marketing):**
- `everland-narrative` - Everland - Narrative, Dialogue, & Creative Micro-copy
- `sacred-grounds-supernal` - The Supernal Gardens - Live Gamified Event Experience
- `sacred-grounds-influencer` - Sacred Grounds - Influencer Marketing Campaign

**Creative Writing Samples:**
- `oathforger-chapter-1` - Oathforger, Chapter 1 - Long Form Narrative
- `short-form` - Elgato & DiceEnvy - Podcast Ad Reads

### CSS Styling
Card image styles are in `assets/css/main.css`:

```css
.project-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
  transition: opacity var(--transition-base);
}

.project-card:hover .project-card__image img {
  opacity: 1;
}
```

Cards without images show a gradient placeholder defined by `.project-card__placeholder`.

### Example: Adding All Remaining Images

After adding the image files, update `index.njk`:

```nunjucks
{% set cardImages = {
  'everland-trust-safety': 'everland-trust-safety-card.jpg',
  'aws-ai-agents': 'aws-ai-agents-tools-card.jpg',
  'sacred-grounds-shop': 'sg-shop-processes-card.jpg',
  'google-translate-lens': 'google-translate-lens-card.jpg',
  'sacred-grounds-rulebook': 'sacred-grounds-rulebook-card.jpg',
  'aws-api-documentation': 'aws-api-documentation-card.jpg',
  'everland-narrative': 'everland-narrative-card.jpg',
  'sacred-grounds-supernal': 'sacred-grounds-supernal-card.jpg',
  'sacred-grounds-influencer': 'sacred-grounds-influencer-card.jpg',
  'oathforger-chapter-1': 'oathforger-chapter-1-card.jpg',
  'short-form': 'short-form-card.jpg'
} %}
```

Then rebuild the site with `npm run build` or `npm run dev`.
