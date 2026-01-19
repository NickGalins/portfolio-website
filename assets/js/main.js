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
  // The navigation has collapsible sections (Content Design, Creative)
  // This code makes the section headers clickable to expand/collapse

  // Find all section toggle buttons in the navigation
  const sectionToggles = document.querySelectorAll('.nav-section__toggle');

  // Loop through each toggle button
  sectionToggles.forEach((toggle, index) => {
    // DEFAULT STATE: Start with first two sections expanded
    // (Content Design = 0, Creative = 1)
    if (index === 0 || index === 1) {
      toggle.setAttribute('aria-expanded', 'true');
    }

    // CLICK HANDLER: Toggle expanded/collapsed state
    toggle.addEventListener('click', () => {
      // Check current state (true = expanded, false = collapsed)
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      // Flip the state (!isExpanded means opposite)
      toggle.setAttribute('aria-expanded', !isExpanded);
      // NOTE: CSS uses [aria-expanded="true"] to show/hide section content
    });
  });
  
  // ==========================================================================
  // HIGHLIGHT CURRENT PAGE IN NAVIGATION
  // ==========================================================================
  // This finds the link to the current page and highlights it, plus expands
  // its parent section so the user can see where they are in the site

  // Get the current page's URL path (e.g., "/about/" or "/projects/project-id/")
  const currentPath = window.location.pathname;
  // Find all navigation links
  const navLinks = document.querySelectorAll('.sidebar__nav a');

  // Check each link to see if it matches the current page
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      // Add 'is-current' class to highlight this link (CSS styles it)
      link.classList.add('is-current');

      // EXPAND PARENT SECTION: Make sure the section containing this link is open
      // closest() finds the nearest parent element matching the selector
      const section = link.closest('.nav-section');
      if (section) {
        const toggle = section.querySelector('.nav-section__toggle');
        if (toggle) {
          // Set to expanded so user can see the highlighted link
          toggle.setAttribute('aria-expanded', 'true');
        }
      }
    }
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

    // Filter project cards (AND logic)
    projectCards.forEach(card => {
      const cardTags = (card.dataset.tags || '').split(',').map(t => t.trim());
      const matchesAll = activeFilters.every(filter => cardTags.includes(filter));
      card.classList.toggle('is-hidden', activeFilters.length > 0 && !matchesAll);
    });

    // Hide empty categories
    document.querySelectorAll('.project-category').forEach(category => {
      const visibleCards = category.querySelectorAll('.project-card:not(.is-hidden)');
      category.classList.toggle('is-empty', visibleCards.length === 0);
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
});