# Project Tag Filtering System

## Overview

The homepage features a tag-based filtering system for project cards (desktop only). Users can select up to 5 tags to filter which projects are displayed. Uses AND logic - projects must match ALL selected tags to appear.

---

## Tag Categories

### Design

- Content Design
- Event Experience
- Game
- Systems Design

### Copy Types

- UX Writing
- Technical Writing
- API Documentation
- Product Writing
- UI/UX
- Marketing
- Narrative
- Content Writing
- Creative
- Trust & Safety

### Scope

- Case Study
- Writing Sample
- Other Sample

### Other

- GenAI
- Prototyping
- Information Architecture
- Content Strategy

---

## How It Works

### For Users

1. Filter UI appears above the project grid on desktop (hidden on mobile)
2. Click tags to toggle them on/off
3. Active tags are highlighted
4. Projects update in real-time to show only those matching ALL selected tags
5. Maximum of 5 tags can be selected at once
6. "Clear all" button resets filters

### For Developers

#### Adding Tags to Projects

Tags are defined in each project's XML file under `<meta><tags>`:

```xml
<meta>
  <id>project-id</id>
  <title>Project Title</title>
  <tags>
    <tag>Content Design</tag>
    <tag>UI/UX</tag>
    <tag>Case Study</tag>
  </tags>
</meta>
```

#### Filter UI Location

The filter UI is in `index.njk`, between the intro section and the featured projects grid.

#### Styling

Filter styles are in `assets/css/main.css` under the "Tag Filters" section.

#### JavaScript

Filter logic is in `assets/js/main.js` under the "TAG FILTERING" section.

---

## Complete Tag Reference

| Category | Tags |
|----------|------|
| Design | Content Design, Event Experience, Game, Systems Design |
| Copy Types | UX Writing, Technical Writing, API Documentation, Product Writing, UI/UX, Marketing, Narrative, Content Writing, Creative, Trust & Safety |
| Scope | Case Study, Writing Sample, Other Sample |
| Other | GenAI, Prototyping, Information Architecture, Content Strategy |

**Total: 21 tags across 4 categories**

---

## Session Progress: Updating Project Tags

We are updating each project XML file to use the standardized tags. Use the numbered reference below when assigning tags.

### Numbered Tag Reference

**Design:**
1. Content Design
2. Event Experience
3. Game
4. Systems Design

**Copy Types:**
5. UX Writing
6. Technical Writing
7. API Documentation
8. Product Writing
9. UI/UX
10. Marketing
11. Narrative
12. Content Writing
13. Creative
14. Trust & Safety

**Scope:**
15. Case Study
16. Writing Sample
17. Other Sample

**Other:**
18. GenAI
19. Prototyping
20. Information Architecture
21. Content Strategy

### Migration Notes

The following changes were made to consolidate tags:
- **Content Management** tag removed (previously merged into Change Management)
- **VSCode** tag removed
- **Technical Documentation** renamed to **Technical Writing**
- **Product Documentation** renamed to **Product Writing**
- **UX Documentation** renamed to **UX Writing**
- **Documentation** category removed - all tags moved to **Copy Types**
- **Trust & Safety** moved from Secondary Skills to Copy Types
- **Game Design** and **Game Writing** combined into **Game**
- **Secondary Skills** category renamed to **Other**
- **Change Management**, **Project Management**, **People Management**, **Cross-functional Collaboration** removed
- **Event Experience** added to Design category

### Projects Need Update

All 11 project XML files need to be updated with the new tag names.

---

## Notes

- Tags must match exactly (case-sensitive)
- Each project can have multiple tags from any category
- The filter system only affects the homepage cards, not the sidebar navigation
- Filter UI is hidden on mobile devices (< 768px)
