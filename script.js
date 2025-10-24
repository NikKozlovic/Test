// ...new file...
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  const overlay = document.getElementById('overlay');

  function isMobile() { return window.matchMedia('(max-width:700px)').matches; }

  function setMenuOpen(open) {
    if (!menu) return;
    menu.classList.toggle('active', !!open);
    if (toggle) toggle.textContent = open ? '✕' : '☰';
    if (overlay) overlay.classList.toggle('active', !!open);
    if (overlay) overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  if (toggle) {
    toggle.addEventListener('click', () => setMenuOpen(!menu.classList.contains('active')));
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      // close menu and any open dropdowns
      setMenuOpen(false);
      document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
    });
  }

  // close with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
      document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });

  // Mobile dropdown behavior
  document.querySelectorAll('.dropdown').forEach(drop => {
    const btn = drop.querySelector('.dropbtn');

    // create internal close button (optional) if you want a visible close inside dropdown-content
    if (isMobile()) {
      const content = drop.querySelector('.dropdown-content');
      if (content && !content.querySelector('.close-dropdown')) {
        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'close-dropdown';
        closeBtn.setAttribute('aria-label', 'Close submenu');
        closeBtn.innerText = '✕';
        content.insertBefore(closeBtn, content.firstChild);
        closeBtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          drop.classList.remove('open');
        });
      }
    }

    if (btn) {
      btn.addEventListener('click', (e) => {
        if (!isMobile()) return; // keep desktop hover behavior
        e.preventDefault();
        drop.classList.toggle('open');
      });
    }
  });

  // Close dropdowns when clicking a regular link on mobile
  if (menu) {
    menu.addEventListener('click', (e) => {
      if (!isMobile()) return;
      const link = e.target.closest('a');
      if (link && !link.classList.contains('dropbtn')) {
        // close dropdowns (do not auto-close main menu unless desired)
        document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
        // optionally: setMenuOpen(false);
      }
    });
  }

  // Close dropdown when clicking outside on mobile
  document.addEventListener('click', function(event) {
    // Only apply this behavior on mobile (when menu toggle is visible)
    const menuToggle = document.querySelector('.menu-toggle');
    const isMenuToggleVisible = window.getComputedStyle(menuToggle).display !== 'none';
    
    if (!isMenuToggleVisible) return; // Skip on desktop
    
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
      const dropdownContent = dropdown.querySelector('.dropdown-content');
      const dropdownBtn = dropdown.querySelector('.dropbtn');
      
      // Check if click is outside the dropdown
      if (!dropdown.contains(event.target)) {
        // Close the dropdown by removing inline display style
        if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none';
        }
      }
    });
  });

  // Toggle dropdown on mobile when clicking the button
  document.addEventListener('DOMContentLoaded', function() {
    const dropdownBtns = document.querySelectorAll('.dropbtn');
    
    dropdownBtns.forEach(btn => {
      btn.addEventListener('click', function(event) {
        const menuToggle = document.querySelector('.menu-toggle');
        const isMenuToggleVisible = window.getComputedStyle(menuToggle).display !== 'none';
        
        if (!isMenuToggleVisible) return; // Skip on desktop (use CSS hover)
        
        event.preventDefault();
        event.stopPropagation();
        
        const dropdown = this.parentElement;
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        // Toggle this dropdown
        if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none';
        } else {
          // Close all other dropdowns first
          document.querySelectorAll('.dropdown-content').forEach(dc => {
            dc.style.display = 'none';
          });
          // Open this one
          dropdownContent.style.display = 'block';
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  
  // Toggle menu
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    menu.classList.toggle('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    // Check if menu is open and click is outside menu and toggle button
    if (menu.classList.contains('active') && 
        !menu.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      menu.classList.remove('active');
    }
  });
  
  // Prevent clicks inside menu from closing it
  menu.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});