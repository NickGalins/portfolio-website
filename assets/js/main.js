// ============================================================================
// MAIN JAVASCRIPT FOR PORTFOLIO SITE
// ============================================================================
// This file handles:
// 1. Mobile sidebar toggle (open/close hamburger menu)
// 2. Navigation section collapsing/expanding
// 3. Highlighting the current page in navigation
// 4. Video performance optimization
// ============================================================================

// WAIT FOR PAGE TO LOAD
// DOMContentLoaded fires when HTML is fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // SIDEBAR TOGGLE (Mobile)
  // ==========================================================================
  // On small screens, the sidebar is hidden by default and can be toggled
  // with a hamburger menu button

  // Get references to the sidebar and toggle button
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');

  // Only set up toggle if both elements exist on the page
  if (sidebarToggle && sidebar) {
    // CLICK HANDLER: Toggle 'is-open' class when hamburger button is clicked
    // The CSS uses this class to show/hide the sidebar
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('is-open');
    });

    // CLICK OUTSIDE HANDLER: Close sidebar when clicking outside on mobile
    // This provides better UX - clicking on the main content closes the menu
    document.addEventListener('click', (e) => {
      // Only run on mobile screens (768px or less)
      if (window.innerWidth <= 768) {
        // Check if click was outside both sidebar and toggle button
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
          sidebar.classList.remove('is-open');
        }
      }
    });
  }

  // ==========================================================================
  // SIDEBAR COLLAPSE TOGGLE (Desktop)
  // ==========================================================================
  // Allows users to collapse/expand the sidebar on desktop screens

  const collapseToggle = document.getElementById('sidebar-collapse');

  if (collapseToggle && sidebar) {
    // Check for saved preference
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed) {
      sidebar.classList.add('is-collapsed');
    }

    collapseToggle.addEventListener('click', () => {
      sidebar.classList.toggle('is-collapsed');
      // Save preference
      localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('is-collapsed'));
    });
  }

  // ==========================================================================
  // SIDEBAR SCROLL INDICATORS
  // ==========================================================================
  // Shows "More" indicators at top/bottom when sidebar content overflows

  const sidebarContent = document.querySelector('.sidebar__content');
  const topIndicator = document.querySelector('.sidebar__scroll-indicator--top');
  const bottomIndicator = document.querySelector('.sidebar__scroll-indicator--bottom');

  function updateScrollIndicators() {
    if (!sidebarContent || !topIndicator || !bottomIndicator) return;

    const { scrollTop, scrollHeight, clientHeight } = sidebarContent;

    // Show top indicator if scrolled down
    topIndicator.classList.toggle('is-visible', scrollTop > 10);

    // Show bottom indicator if more content below
    bottomIndicator.classList.toggle('is-visible', scrollTop + clientHeight < scrollHeight - 10);
  }

  if (sidebarContent) {
    // Run on scroll
    sidebarContent.addEventListener('scroll', updateScrollIndicators);
    // Run on load and resize
    window.addEventListener('load', updateScrollIndicators);
    window.addEventListener('resize', updateScrollIndicators);
    // Also run immediately
    updateScrollIndicators();
  }

  // ==========================================================================
  // NAVIGATION SECTION TOGGLES
  // ==========================================================================
  // The navigation has collapsible sections (Case Studies, Individual Samples)
  // - Category text link navigates to landing page
  // - Chevron button expands/collapses the submenu

  // Find all expand buttons in the navigation
  const sectionExpands = document.querySelectorAll('.nav-section__expand');
  // Find all section links (for current page highlighting)
  const sectionLinks = document.querySelectorAll('.nav-section__link');

  // STORAGE KEY for remembering expanded sections
  const NAV_STATE_KEY = 'navExpandedSections';

  // Get saved section states from localStorage (or empty object)
  function getSavedNavState() {
    try {
      return JSON.parse(localStorage.getItem(NAV_STATE_KEY)) || {};
    } catch {
      return {};
    }
  }

  // Save section states to localStorage
  function saveNavState(state) {
    localStorage.setItem(NAV_STATE_KEY, JSON.stringify(state));
  }

  // Loop through each expand button
  sectionExpands.forEach((expandBtn) => {
    const section = expandBtn.closest('.nav-section');
    const sectionId = section?.dataset.sectionId;

    // DEFAULT STATE: All sections start collapsed
    // (unless they have a saved expanded state or contain current page)
    expandBtn.setAttribute('aria-expanded', 'false');

    // CLICK HANDLER: Toggle expand/collapse when clicking the chevron button
    // This does NOT navigate - only expands/collapses the submenu
    expandBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = expandBtn.getAttribute('aria-expanded') === 'true';
      expandBtn.setAttribute('aria-expanded', !isExpanded);

      // Save state to localStorage
      if (sectionId) {
        const state = getSavedNavState();
        state[sectionId] = !isExpanded;
        saveNavState(state);
      }
    });
  });

  // ==========================================================================
  // HIGHLIGHT CURRENT PAGE IN NAVIGATION + RESTORE SAVED STATES
  // ==========================================================================
  // This finds the link to the current page and highlights it, plus expands
  // its parent section so the user can see where they are in the site.
  // Also restores any manually expanded sections from localStorage.

  // Get the current page's URL path (e.g., "/about/" or "/projects/project-id/")
  const currentPath = window.location.pathname;
  // Find all navigation links
  const navLinks = document.querySelectorAll('.sidebar__nav a');
  // Get saved nav states
  const savedNavState = getSavedNavState();

  // First, restore saved expanded states
  sectionExpands.forEach((expandBtn) => {
    const section = expandBtn.closest('.nav-section');
    const sectionId = section?.dataset.sectionId;
    if (sectionId && savedNavState[sectionId]) {
      expandBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Check each link to see if it matches the current page
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');

    // Check for exact match OR if current path is within this section's landing page
    if (linkHref === currentPath) {
      // Add 'is-current' class to highlight this link (CSS styles it)
      link.classList.add('is-current');

      // EXPAND PARENT SECTION: Make sure the section containing this link is open
      // closest() finds the nearest parent element matching the selector
      const section = link.closest('.nav-section');
      if (section) {
        const expandBtn = section.querySelector('.nav-section__expand');
        if (expandBtn) {
          // Set to expanded so user can see the highlighted link
          expandBtn.setAttribute('aria-expanded', 'true');
        }
      }
    }

    // Also check if this is a section landing page link that matches current path
    if (link.classList.contains('nav-section__link') && linkHref === currentPath) {
      link.classList.add('is-current');
      // Also expand the section when on its landing page
      const section = link.closest('.nav-section');
      if (section) {
        const expandBtn = section.querySelector('.nav-section__expand');
        if (expandBtn) {
          expandBtn.setAttribute('aria-expanded', 'true');
        }
      }
    }
  });

  // Auto-expand section if we're on a project page within that section
  // Check landing pages to determine which section we're in
  sectionLinks.forEach((link) => {
    const landingPath = link.dataset.landing;
    const section = link.closest('.nav-section');
    const expandBtn = section?.querySelector('.nav-section__expand');

    // If current path starts with the landing path (e.g., /case-studies/ matches /case-studies/some-project/)
    // OR if current path is a project under this section
    if (landingPath && expandBtn && (currentPath === landingPath || currentPath.startsWith(landingPath.replace(/\/$/, '') + '/'))) {
      expandBtn.setAttribute('aria-expanded', 'true');
      if (currentPath === landingPath) {
        link.classList.add('is-current');
      }
    }
  });

  // ==========================================================================
  // LANDING PAGE TAGS TOGGLE
  // ==========================================================================
  // On category landing pages, tags are collapsed by default with a toggle button

  const tagsToggles = document.querySelectorAll('.landing-card__tags-toggle');

  tagsToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent card link from firing
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
    });
  });
  
  // ==========================================================================
  // VIDEO HERO - Performance Optimization
  // ==========================================================================
  // This pauses the homepage video when it's scrolled out of view to save
  // bandwidth and CPU resources. It resumes when scrolled back into view.

  // Find the video hero element (only exists on homepage)
  const heroVideo = document.querySelector('.video-hero__video');

  if (heroVideo) {
    // INTERSECTION OBSERVER: Watches when element enters/leaves viewport
    // This is a modern browser API that efficiently detects visibility
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // entry.isIntersecting = true means video is visible on screen
        if (entry.isIntersecting) {
          heroVideo.play();     // Resume video playback
        } else {
          heroVideo.pause();    // Pause to save resources
        }
      });
    }, {
      threshold: 0.25  // Trigger when 25% of the video is visible
    });

    // Start observing the video element
    observer.observe(heroVideo);
  }

  // ==========================================================================
  // TAG FILTERING (Desktop Only)
  // ==========================================================================
  // Allows users to filter project cards on the homepage by selecting tags.
  // Uses AND logic - projects must match ALL selected tags to be shown.
  // Maximum of 5 tags can be selected at once.
  // Filter panel is collapsible with dynamic status message.

  const MAX_FILTERS = 5;
  let activeFilters = [];

  const filterToggle = document.getElementById('filter-toggle');
  const filterContent = document.getElementById('filter-content');
  const filterStatus = document.getElementById('filter-status');
  const filterButtons = document.querySelectorAll('.tag-filter');
  const clearButton = document.getElementById('clear-filters');
  const actionsContainer = document.querySelector('.tag-filters__actions');
  const projectCards = document.querySelectorAll('.project-card[data-tags]');
  const noResultsMessage = document.getElementById('no-results');

  // Update the status message based on active filters
  function updateStatusMessage() {
    if (!filterStatus) return;

    if (activeFilters.length === 0) {
      filterStatus.textContent = 'Showing all projects. Select up to 5 filters.';
    } else if (activeFilters.length === 1) {
      const remaining = MAX_FILTERS - activeFilters.length;
      filterStatus.textContent = `Showing projects with the "${activeFilters[0]}" tag. Add up to ${remaining} more filter${remaining !== 1 ? 's' : ''}.`;
    } else if (activeFilters.length < MAX_FILTERS) {
      const remaining = MAX_FILTERS - activeFilters.length;
      const tagList = activeFilters.map(t => `"${t}"`).join(', ');
      filterStatus.textContent = `Showing projects with ${tagList} tags. Add up to ${remaining} more filter${remaining !== 1 ? 's' : ''}.`;
    } else {
      const tagList = activeFilters.map(t => `"${t}"`).join(', ');
      filterStatus.textContent = `Showing projects with ${tagList} tags. Maximum filters reached.`;
    }
  }

  function updateFilters() {
    // Update button states
    filterButtons.forEach(btn => {
      const isActive = activeFilters.includes(btn.dataset.tag);
      btn.classList.toggle('is-active', isActive);
      // Disable non-active buttons when at max
      btn.disabled = !isActive && activeFilters.length >= MAX_FILTERS;
    });

    // Show/hide clear button container
    if (actionsContainer) {
      actionsContainer.classList.toggle('is-visible', activeFilters.length > 0);
    }

    // Update status message
    updateStatusMessage();

    // FLIP Animation: First - capture current positions of visible cards
    const firstPositions = new Map();
    projectCards.forEach(card => {
      if (!card.classList.contains('is-hidden')) {
        const rect = card.getBoundingClientRect();
        firstPositions.set(card, { x: rect.left, y: rect.top });
      }
    });

    // Determine which cards to hide/show
    const cardsToHide = [];
    const cardsToShow = [];
    let visibleCount = 0;

    projectCards.forEach(card => {
      const cardTags = (card.dataset.tags || '').split(',').map(t => t.trim());
      const matchesAll = activeFilters.every(filter => cardTags.includes(filter));
      const shouldHide = activeFilters.length > 0 && !matchesAll;
      const isCurrentlyHidden = card.classList.contains('is-hidden');

      if (shouldHide && !isCurrentlyHidden) {
        cardsToHide.push(card);
      } else if (!shouldHide && isCurrentlyHidden) {
        cardsToShow.push(card);
        visibleCount++;
      } else if (!shouldHide && !isCurrentlyHidden) {
        visibleCount++;
      }
    });

    // Show/hide no results message
    if (noResultsMessage) {
      noResultsMessage.classList.toggle('is-visible', visibleCount === 0 && activeFilters.length > 0);
    }

    // Animate cards out with pop effect
    cardsToHide.forEach(card => {
      card.classList.remove('is-filtering-in');
      card.classList.add('is-filtering-out');

      card.addEventListener('animationend', function handler() {
        card.classList.add('is-hidden');
        card.classList.remove('is-filtering-out');

        // After hiding, trigger slide animation for remaining cards
        animateCardSlide(firstPositions);
      }, { once: true });
    });

    // Show cards with pop in effect
    cardsToShow.forEach(card => {
      card.classList.remove('is-hidden', 'is-filtering-out');
      card.classList.add('is-filtering-in');

      card.addEventListener('animationend', function handler() {
        card.classList.remove('is-filtering-in');
      }, { once: true });
    });

    // If no cards are being hidden, still animate any position changes
    if (cardsToHide.length === 0 && cardsToShow.length > 0) {
      // Delay slightly to let new cards appear first
      requestAnimationFrame(() => {
        animateCardSlide(firstPositions);
      });
    }
  }

  // FLIP Animation: Animate cards sliding to new positions with jiggle during movement
  function animateCardSlide(firstPositions) {
    projectCards.forEach(card => {
      if (card.classList.contains('is-hidden') || card.classList.contains('is-filtering-out')) return;

      const first = firstPositions.get(card);
      if (!first) return; // Card wasn't visible before

      const last = card.getBoundingClientRect();
      const deltaX = first.x - last.left;
      const deltaY = first.y - last.top;

      // Only animate if position actually changed
      if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
        // Invert: Set transform to start position
        card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        card.style.transition = 'none';

        // Play: Animate to final position with jiggle during slide
        requestAnimationFrame(() => {
          // Add jiggle class at the start of slide
          card.classList.add('is-sliding');
          card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          card.style.transform = '';

          // Remove jiggle class when slide ends
          card.addEventListener('transitionend', function handler(e) {
            if (e.propertyName === 'transform') {
              card.classList.remove('is-sliding');
            }
          }, { once: true });
        });
      }
    });
  }

  // Set up filter toggle (collapsible)
  if (filterToggle && filterContent) {
    filterToggle.addEventListener('click', () => {
      const isExpanded = filterToggle.getAttribute('aria-expanded') === 'true';
      filterToggle.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // Only set up filtering if filter buttons exist (homepage only)
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.dataset.tag;
        if (activeFilters.includes(tag)) {
          activeFilters = activeFilters.filter(t => t !== tag);
        } else if (activeFilters.length < MAX_FILTERS) {
          activeFilters.push(tag);
        }
        updateFilters();
      });
    });

    if (clearButton) {
      clearButton.addEventListener('click', () => {
        activeFilters = [];
        updateFilters();
      });
    }
  }

  // ==========================================================================
  // IMAGE MAGNIFIER
  // ==========================================================================
  // Creates a circular magnifying glass effect when hovering over images
  // with the .magnifier-image class

  const magnifierImages = document.querySelectorAll('.magnifier-image');

  magnifierImages.forEach(img => {
    const container = img.closest('.magnifier-container');
    if (!container) return;

    let lens;
    const zoomLevel = 2; // 2x zoom

    // Create magnifier lens element
    function createLens() {
      lens = document.createElement('div');
      lens.className = 'magnifier-lens';
      container.appendChild(lens);
      lens.style.display = 'none';
    }

    // Calculate and update lens position and background
    function moveLens(e) {
      if (!lens) return;

      const rect = img.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      // Get lens dimensions
      const lensWidth = lens.offsetWidth;
      const lensHeight = lens.offsetHeight;

      // Allow lens to bleed off edges - only constrain cursor position
      // Keep cursor within image, but lens can extend beyond
      const cursorX = Math.max(0, Math.min(x, rect.width));
      const cursorY = Math.max(0, Math.min(y, rect.height));

      // Position the lens centered on cursor (can extend beyond image)
      lens.style.left = (cursorX - lensWidth / 2) + 'px';
      lens.style.top = (cursorY - lensHeight / 2) + 'px';

      // Calculate background position for zoom effect using actual cursor position
      const bgX = -((cursorX * zoomLevel) - (lensWidth / 2));
      const bgY = -((cursorY * zoomLevel) - (lensHeight / 2));

      // Set background image and position
      lens.style.backgroundImage = `url('${img.src}')`;
      lens.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;
      lens.style.backgroundPosition = `${bgX}px ${bgY}px`;
    }

    // Show lens on mouse enter
    img.addEventListener('mouseenter', () => {
      if (!lens) createLens();
      lens.style.display = 'block';
    });

    // Hide lens on mouse leave
    img.addEventListener('mouseleave', () => {
      if (lens) lens.style.display = 'none';
    });

    // Update lens position on mouse move
    img.addEventListener('mousemove', moveLens);
  });

  // ==========================================================================
  // CONTENT HISTORY - Open details when navigating to anchor
  // ==========================================================================
  // When clicking a link to an anchor on the content-history page (either from
  // the left nav or the TOC), open the associated details/zippy element.

  function openDetailsForHash(hash) {
    if (!hash) return;

    // Find the target section
    const targetSection = document.querySelector(hash);
    if (!targetSection) return;

    // Find the details element within this section
    const details = targetSection.querySelector('.landing-section__details');
    if (details) {
      details.setAttribute('open', '');
    }
  }

  // Handle initial page load with hash
  if (window.location.hash) {
    openDetailsForHash(window.location.hash);
  }

  // Handle clicks on anchor links (TOC and nav)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    // Check if it's a same-page anchor or anchor to content-history
    if (href.startsWith('#') || href.includes('/content-history/#')) {
      const hash = href.includes('#') ? '#' + href.split('#')[1] : null;
      if (hash) {
        // Small delay to let the browser navigate first
        setTimeout(() => openDetailsForHash(hash), 50);
      }
    }
  });

  // Handle browser back/forward navigation
  window.addEventListener('hashchange', () => {
    openDetailsForHash(window.location.hash);
  });
});