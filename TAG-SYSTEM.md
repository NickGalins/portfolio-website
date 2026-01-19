# Project Tag Filtering System

## Overview

The homepage features a tag-based filtering system for project cards (desktop only). Users can select up to 5 tags to filter which projects are displayed. Uses AND logic - projects must match ALL selected tags to appear.

---

## Tag Categories

### Design

- Content Design
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

### Secondary Skills

- GenAI
- Prototyping
- VSCode
- Change Management
- Project Management
- People Management
- Cross-functional Collaboration
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
| Design | Content Design, Game, Systems Design |
| Copy Types | UX Writing, Technical Writing, API Documentation, Product Writing, UI/UX, Marketing, Narrative, Content Writing, Creative, Trust & Safety |
| Scope | Case Study, Writing Sample, Other Sample |
| Secondary Skills | GenAI, Prototyping, VSCode, Change Management, Project Management, People Management, Cross-functional Collaboration, Information Architecture, Content Strategy |

**Total: 22 tags across 4 categories**

---

## Session Progress: Updating Project Tags

We are updating each project XML file to use the standardized tags. Use the numbered reference below when assigning tags.

### Numbered Tag Reference

**Design:**
1. Content Design
2. Game
3. Systems Design

**Copy Types:**
4. UX Writing
5. Technical Writing
6. API Documentation
7. Product Writing
8. UI/UX
9. Marketing
10. Narrative
11. Content Writing
12. Creative
13. Trust & Safety

**Scope:**
14. Case Study
15. Writing Sample
16. Other Sample

**Secondary Skills:**
17. GenAI
18. Prototyping
19. VSCode
20. Change Management
21. Project Management
22. People Management
23. Cross-functional Collaboration
24. Information Architecture
25. Content Strategy

### Migration Notes

The following changes were made to consolidate tags:
- **Content Management** merged into **Change Management** (20)
- **Technical Documentation** renamed to **Technical Writing** (5)
- **Product Documentation** renamed to **Product Writing** (7)
- **UX Documentation** renamed to **UX Writing** (4)
- **Documentation** category removed - all tags moved to **Copy Types**
- **Trust & Safety** moved from Secondary Skills to Copy Types (13)
- **Game Design** and **Game Writing** combined into **Game** (2)

### Projects Need Update

All 11 project XML files need to be updated with the new tag names.

---

## Notes

- Tags must match exactly (case-sensitive)
- Each project can have multiple tags from any category
- The filter system only affects the homepage cards, not the sidebar navigation
- Filter UI is hidden on mobile devices (< 768px)
