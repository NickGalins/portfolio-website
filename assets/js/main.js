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
});