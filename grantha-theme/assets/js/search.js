// ═══════════════════════════════════════════════════════════════════
// SITE-WIDE SEARCH FUNCTIONALITY
// Loads from Jekyll-generated search.json and provides fast client-side search
// ═══════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (!searchInput || !searchResults) return;

  let searchIndex = [];
  let selectedIndex = -1;
  let isLoading = false;

  // ═══════════════════════════════════════════════════════════════
  // UTILITY: HTML escaping to prevent XSS
  // ═══════════════════════════════════════════════════════════════

  function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
      .toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // ═══════════════════════════════════════════════════════════════
  // LOAD SEARCH INDEX
  // ═══════════════════════════════════════════════════════════════

  async function loadSearchIndex() {
    if (isLoading) return;
    isLoading = true;

    try {
      // Try to get from localStorage first (with version check)
      const cached = getFromLocalStorage('searchIndex');
      if (cached && cached.version === '1.0' && cached.data) {
        searchIndex = cached.data;
        console.log('Loaded search index from cache');
        isLoading = false;
        return;
      }

      // Fetch from server
      const response = await fetch('/search.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Flatten into single searchable array
      searchIndex = [
        ...(data.texts || []).map(item => ({ ...item, type: 'text' })),
        ...(data.verses || []).map(item => ({ ...item, type: 'verse' })),
        ...(data.pages || []).map(item => ({ ...item, type: 'page' }))
      ];

      // Cache it
      saveToLocalStorage('searchIndex', {
        version: '1.0',
        data: searchIndex,
        timestamp: Date.now()
      });

      console.log(`Loaded ${searchIndex.length} searchable items`);

    } catch (error) {
      console.error('Failed to load search index:', error);
      showError('Search temporarily unavailable. Please try again later.');
    } finally {
      isLoading = false;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // LOCALSTORAGE HELPERS (with validation)
  // ═══════════════════════════════════════════════════════════════

  function saveToLocalStorage(key, value) {
    try {
      const serialized = JSON.stringify(value);
      // Check if we're exceeding quota
      if (serialized.length > 5000000) { // ~5MB limit
        console.warn('Search index too large to cache');
        return false;
      }
      localStorage.setItem(`grantha_${key}`, serialized);
      return true;
    } catch (error) {
      console.error('localStorage save error:', error);
      return false;
    }
  }

  function getFromLocalStorage(key) {
    try {
      const item = localStorage.getItem(`grantha_${key}`);
      if (!item) return null;

      const parsed = JSON.parse(item);

      // Validate structure
      if (!parsed || typeof parsed !== 'object') {
        return null;
      }

      // Check if cache is older than 24 hours
      if (parsed.timestamp && (Date.now() - parsed.timestamp > 86400000)) {
        localStorage.removeItem(`grantha_${key}`);
        return null;
      }

      return parsed;

    } catch (error) {
      console.error('localStorage read error:', error);
      // Clear corrupted data
      try {
        localStorage.removeItem(`grantha_${key}`);
      } catch (e) {
        // Ignore if we can't even remove it
      }
      return null;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // SEARCH FUNCTION
  // ═══════════════════════════════════════════════════════════════

  function search(query) {
    if (!query || query.length < 2) {
      searchResults.classList.remove('is-active');
      return [];
    }

    // Sanitize query
    const sanitizedQuery = query.trim().slice(0, 100); // Limit length
    const lowerQuery = sanitizedQuery.toLowerCase();

    const results = searchIndex
      .filter(item => {
        const searchableText = [
          item.title || '',
          item.title_transliteration || '',
          item.content || '',
          item.devanagari || '',
          item.transliteration || '',
          item.translation || '',
          item.author || '',
          item.category || ''
        ].join(' ').toLowerCase();

        return searchableText.includes(lowerQuery);
      })
      .slice(0, 15) // Limit to 15 results
      .map(item => {
        // Generate excerpt with context
        const content = item.content || item.translation || item.devanagari || '';
        const index = content.toLowerCase().indexOf(lowerQuery);

        let excerpt = '';
        if (index !== -1) {
          const start = Math.max(0, index - 60);
          const end = Math.min(content.length, index + sanitizedQuery.length + 60);
          excerpt = content.substring(start, end);
          if (start > 0) excerpt = '...' + excerpt;
          if (end < content.length) excerpt = excerpt + '...';
        } else {
          excerpt = content.substring(0, 150) + '...';
        }

        // Escape HTML first, then highlight (safely)
        excerpt = escapeHtml(excerpt);
        const safeQuery = escapeHtml(sanitizedQuery);
        const regex = new RegExp(`(${escapeRegex(safeQuery)})`, 'gi');
        excerpt = excerpt.replace(regex, '<mark>$1</mark>');

        return {
          title: escapeHtml(item.title || 'Untitled'),
          url: item.url || '#',
          excerpt: excerpt,
          type: item.type || 'page'
        };
      });

    return results;
  }

  // ═══════════════════════════════════════════════════════════════
  // DISPLAY RESULTS
  // ═══════════════════════════════════════════════════════════════

  function displayResults(results) {
    if (searchIndex.length === 0) {
      searchResults.innerHTML = '<div class="search__no-results">Loading search index...</div>';
      searchResults.classList.add('is-active');
      return;
    }

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search__no-results">No results found</div>';
      searchResults.classList.add('is-active');
      return;
    }

    const typeLabels = {
      text: 'Text',
      verse: 'Verse',
      page: 'Page'
    };

    const html = results.map((result, index) => `
      <div class="search__result ${index === selectedIndex ? 'is-selected' : ''}" data-url="${result.url}" data-index="${index}">
        <div class="search__result-header">
          <span class="search__result-title">${result.title}</span>
          <span class="search__result-type badge">${typeLabels[result.type] || 'Page'}</span>
        </div>
        <div class="search__result-excerpt">${result.excerpt}</div>
      </div>
    `).join('');

    searchResults.innerHTML = html;
    searchResults.classList.add('is-active');

    // Add click handlers
    searchResults.querySelectorAll('.search__result').forEach(result => {
      result.addEventListener('click', function() {
        const url = this.dataset.url;
        if (url && url !== '#') {
          window.location.href = url;
        }
      });
    });
  }

  function showError(message) {
    searchResults.innerHTML = `<div class="search__error alert alert--error">${escapeHtml(message)}</div>`;
    searchResults.classList.add('is-active');
  }

  // ═══════════════════════════════════════════════════════════════
  // EVENT HANDLERS
  // ═══════════════════════════════════════════════════════════════

  let debounceTimer;

  searchInput.addEventListener('input', function(e) {
    clearTimeout(debounceTimer);

    // Load index if not loaded
    if (searchIndex.length === 0 && !isLoading) {
      loadSearchIndex();
    }

    debounceTimer = setTimeout(() => {
      const query = e.target.value.trim();
      const results = search(query);
      displayResults(results);
      selectedIndex = -1;
    }, 300);
  });

  // Keyboard navigation
  searchInput.addEventListener('keydown', function(e) {
    const results = searchResults.querySelectorAll('.search__result');
    if (results.length === 0) return;

    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
        updateSelection(results);
        break;

      case 'ArrowUp':
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        updateSelection(results);
        break;

      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          const url = results[selectedIndex].dataset.url;
          if (url && url !== '#') {
            window.location.href = url;
          }
        }
        break;

      case 'Escape':
        searchResults.classList.remove('is-active');
        searchInput.blur();
        selectedIndex = -1;
        break;
    }
  });

  function updateSelection(results) {
    results.forEach((result, index) => {
      if (index === selectedIndex) {
        result.classList.add('is-selected');
        result.scrollIntoView({ block: 'nearest' });
      } else {
        result.classList.remove('is-selected');
      }
    });
  }

  // Close results when clicking outside
  document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove('is-active');
      selectedIndex = -1;
    }
  });

  // Focus search with '/' key
  document.addEventListener('keydown', function(e) {
    if (e.key === '/' && !e.target.matches('input, textarea')) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═══════════════════════════════════════════════════════════════

  // Pre-load search index on page load (non-blocking)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(loadSearchIndex, 1000); // Delay 1s to not block initial page load
    });
  } else {
    setTimeout(loadSearchIndex, 1000);
  }

})();
