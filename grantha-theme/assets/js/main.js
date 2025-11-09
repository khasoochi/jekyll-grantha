// ═══════════════════════════════════════════════════════════════════
// GRANTHA THEME - Main JavaScript
// Progressive enhancement for Indic text reading experience
// ═══════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // THEME TOGGLE (Dark/Light Mode)
  // ═══════════════════════════════════════════════════════════════

  function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    toggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // FONT SIZE CONTROLS
  // ═══════════════════════════════════════════════════════════════

  function initFontControls() {
    const decreaseBtn = document.getElementById('font-decrease');
    const increaseBtn = document.getElementById('font-increase');
    const resetBtn = document.getElementById('font-reset');

    if (!decreaseBtn || !increaseBtn) return;

    const fontSizes = ['small', 'medium', 'large', 'xlarge'];
    let currentIndex = parseInt(localStorage.getItem('fontSizeIndex')) || 1; // medium

    function updateFontSize(index) {
      document.body.classList.remove(...fontSizes.map(s => `font-size-${s}`));
      document.body.classList.add(`font-size-${fontSizes[index]}`);
      localStorage.setItem('fontSizeIndex', index);
      currentIndex = index;
    }

    // Apply saved font size
    updateFontSize(currentIndex);

    decreaseBtn.addEventListener('click', function() {
      if (currentIndex > 0) {
        updateFontSize(currentIndex - 1);
      }
    });

    increaseBtn.addEventListener('click', function() {
      if (currentIndex < fontSizes.length - 1) {
        updateFontSize(currentIndex + 1);
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        updateFontSize(1); // Reset to medium
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // MOBILE MENU TOGGLE
  // ═══════════════════════════════════════════════════════════════

  function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', function() {
      const isActive = this.classList.toggle('is-active');
      mobileNav.classList.toggle('is-active');
      this.setAttribute('aria-expanded', isActive);
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // COMMENTARY TOGGLE
  // ═══════════════════════════════════════════════════════════════

  function initCommentary() {
    const commentaries = document.querySelectorAll('.commentary');

    commentaries.forEach(function(commentary) {
      const header = commentary.querySelector('.commentary__header');
      if (!header) return;

      header.addEventListener('click', function() {
        commentary.classList.toggle('is-expanded');
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // PARALLEL TEXT MODE TOGGLE
  // ═══════════════════════════════════════════════════════════════

  function initParallelText() {
    const toggle = document.getElementById('text-mode-toggle');
    const content = document.getElementById('text-content');

    if (!toggle || !content) return;

    const modes = ['side-by-side', 'stacked', 'toggle'];
    let currentMode = 0;

    toggle.addEventListener('click', function() {
      currentMode = (currentMode + 1) % modes.length;
      const newMode = modes[currentMode];

      // Remove all mode classes
      modes.forEach(mode => content.classList.remove(`parallel-text--${mode}`));

      // Add new mode class
      content.classList.add(`parallel-text--${newMode}`);

      // Update button text
      const modeNames = {
        'side-by-side': 'Side by Side',
        'stacked': 'Stacked',
        'toggle': 'Toggle'
      };
      toggle.innerHTML = `<span class="d-none d-md-inline">${modeNames[newMode]}</span><span class="d-md-none">Layout</span>`;

      // For toggle mode, add click handler
      if (newMode === 'toggle') {
        content.addEventListener('click', function() {
          this.classList.toggle('show-roman');
        });
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // READING PROGRESS TRACKER
  // ═══════════════════════════════════════════════════════════════

  function initProgressTracker() {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;

    function updateProgress() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;

      progressBar.style.width = Math.min(progress, 100) + '%';
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress();
  }

  // ═══════════════════════════════════════════════════════════════
  // BOOKMARKS
  // ═══════════════════════════════════════════════════════════════

  function initBookmarks() {
    const bookmarkBtn = document.getElementById('bookmark-btn');
    if (!bookmarkBtn) return;

    const currentUrl = window.location.pathname;
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

    function isBookmarked() {
      return bookmarks.some(b => b.url === currentUrl);
    }

    function updateButton() {
      if (isBookmarked()) {
        bookmarkBtn.classList.add('is-bookmarked');
        bookmarkBtn.setAttribute('title', 'Remove bookmark');
      } else {
        bookmarkBtn.classList.remove('is-bookmarked');
        bookmarkBtn.setAttribute('title', 'Bookmark this page');
      }
    }

    bookmarkBtn.addEventListener('click', function() {
      if (isBookmarked()) {
        // Remove bookmark
        bookmarks = bookmarks.filter(b => b.url !== currentUrl);
      } else {
        // Add bookmark
        bookmarks.push({
          url: currentUrl,
          title: document.title,
          date: new Date().toISOString()
        });
      }

      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      updateButton();
      updateBookmarksList();
    });

    updateButton();
    updateBookmarksList();
  }

  function updateBookmarksList() {
    const bookmarksList = document.getElementById('bookmarks-items');
    if (!bookmarksList) return;

    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

    if (bookmarks.length === 0) {
      bookmarksList.innerHTML = '<li class="text-muted" style="font-size: var(--font-size-small);">No bookmarks yet</li>';
      return;
    }

    bookmarksList.innerHTML = bookmarks.map(bookmark => `
      <li>
        <a href="${bookmark.url}">
          ${bookmark.title}
          <span class="remove-bookmark" data-url="${bookmark.url}">×</span>
        </a>
      </li>
    `).join('');

    // Add remove handlers
    bookmarksList.querySelectorAll('.remove-bookmark').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.dataset.url;
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        const filtered = bookmarks.filter(b => b.url !== url);
        localStorage.setItem('bookmarks', JSON.stringify(filtered));
        updateBookmarksList();

        // Update button if we're on the removed page
        if (url === window.location.pathname) {
          const btn = document.getElementById('bookmark-btn');
          if (btn) {
            btn.classList.remove('is-bookmarked');
          }
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // AUTO-GENERATE TABLE OF CONTENTS
  // ═══════════════════════════════════════════════════════════════

  function initAutoTOC() {
    const tocList = document.getElementById('toc-list');
    if (!tocList) return;

    const content = document.querySelector('.content');
    if (!content) return;

    const headings = content.querySelectorAll('h2, h3, h4');
    if (headings.length === 0) return;

    const tocHtml = Array.from(headings).map(heading => {
      // Create ID if doesn't exist
      if (!heading.id) {
        heading.id = heading.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }

      const level = parseInt(heading.tagName.substring(1));
      const indent = (level - 2) * 1; // 0 for h2, 1 for h3, 2 for h4

      return `
        <li class="toc__item" style="margin-left: ${indent}rem;">
          <a href="#${heading.id}" class="toc__link">
            ${heading.textContent}
          </a>
        </li>
      `;
    }).join('');

    tocList.innerHTML = tocHtml;

    // Highlight current section
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = tocList.querySelector(`a[href="#${id}"]`);

        if (link) {
          if (entry.isIntersecting) {
            // Remove active from all
            tocList.querySelectorAll('.toc__link').forEach(l => l.classList.remove('toc__link--active'));
            // Add to current
            link.classList.add('toc__link--active');
          }
        }
      });
    }, { rootMargin: '-100px 0px -80% 0px' });

    headings.forEach(heading => observer.observe(heading));
  }

  // ═══════════════════════════════════════════════════════════════
  // SIDEBAR TOGGLE (Mobile)
  // ═══════════════════════════════════════════════════════════════

  function initSidebarToggle() {
    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', function() {
      sidebar.classList.toggle('is-active');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
      if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
        sidebar.classList.remove('is-active');
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // KEYBOARD SHORTCUTS
  // ═══════════════════════════════════════════════════════════════

  function initKeyboardShortcuts() {
    const hint = document.getElementById('keyboard-hint');

    function showHint(text) {
      if (!hint) return;
      hint.textContent = text;
      hint.classList.add('is-visible');
      setTimeout(() => hint.classList.remove('is-visible'), 2000);
    }

    document.addEventListener('keydown', function(e) {
      // Don't trigger if user is typing in an input
      if (e.target.matches('input, textarea, select')) return;

      switch(e.key) {
        case 't':
          // Toggle theme
          const themeToggle = document.getElementById('theme-toggle');
          if (themeToggle) {
            themeToggle.click();
            showHint('Theme toggled');
          }
          break;

        case 'f':
          // Focus search
          const search = document.getElementById('search-input');
          if (search) {
            e.preventDefault();
            search.focus();
            showHint('Search focused');
          }
          break;

        case 'b':
          // Toggle bookmark
          const bookmarkBtn = document.getElementById('bookmark-btn');
          if (bookmarkBtn) {
            bookmarkBtn.click();
            showHint('Bookmark toggled');
          }
          break;

        case '+':
        case '=':
          // Increase font size
          const increaseBtn = document.getElementById('font-increase');
          if (increaseBtn) {
            e.preventDefault();
            increaseBtn.click();
            showHint('Font size increased');
          }
          break;

        case '-':
          // Decrease font size
          const decreaseBtn = document.getElementById('font-decrease');
          if (decreaseBtn) {
            e.preventDefault();
            decreaseBtn.click();
            showHint('Font size decreased');
          }
          break;

        case '0':
          // Reset font size
          const resetBtn = document.getElementById('font-reset');
          if (resetBtn) {
            resetBtn.click();
            showHint('Font size reset');
          }
          break;

        case '?':
          // Show help
          showHint('t: theme | f: search | b: bookmark | +/-: font size | 0: reset');
          break;
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // SANDHI SPLIT TOGGLE
  // ═══════════════════════════════════════════════════════════════

  function initSandhiSplit() {
    const toggle = document.getElementById('sandhi-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function() {
      this.classList.toggle('is-active');
      // Implementation would depend on how sandhi split data is stored
      // This is a placeholder for the feature
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // SMOOTH SCROLL TO ANCHORS
  // ═══════════════════════════════════════════════════════════════

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL without jumping
          history.pushState(null, null, href);
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═══════════════════════════════════════════════════════════════

  function init() {
    initThemeToggle();
    initFontControls();
    initMobileMenu();
    initCommentary();
    initParallelText();
    initProgressTracker();
    initBookmarks();
    initAutoTOC();
    initSidebarToggle();
    initKeyboardShortcuts();
    initSandhiSplit();
    initSmoothScroll();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
