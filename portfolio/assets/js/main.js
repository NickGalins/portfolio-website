// ==========================================================================
// Sidebar Toggle (Mobile)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('is-open');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
          sidebar.classList.remove('is-open');
        }
      }
    });
  }
  
  // ==========================================================================
  // Navigation Section Toggles
  // ==========================================================================
  
  const sectionToggles = document.querySelectorAll('.nav-section__toggle');
  
  sectionToggles.forEach(toggle => {
    // Start with first section expanded
    if (toggle === sectionToggles[0]) {
      toggle.setAttribute('aria-expanded', 'true');
    }
    
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
    });
  });
  
  // ==========================================================================
  // Highlight Current Page in Nav
  // ==========================================================================
  
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.sidebar__nav a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('is-current');
      
      // Expand parent sections
      const section = link.closest('.nav-section');
      if (section) {
        const toggle = section.querySelector('.nav-section__toggle');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'true');
        }
      }
    }
  });
  
  // ==========================================================================
  // Video Hero - Pause when not visible (performance)
  // ==========================================================================
  
  const heroVideo = document.querySelector('.video-hero__video');
  
  if (heroVideo) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroVideo.play();
        } else {
          heroVideo.pause();
        }
      });
    }, { threshold: 0.25 });
    
    observer.observe(heroVideo);
  }
});
