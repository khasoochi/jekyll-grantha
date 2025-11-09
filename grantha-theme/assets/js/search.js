// ═══════════════════════════════════════════════════════════════════
// SEARCH FUNCTIONALITY
// Simple client-side search for texts
// ═══════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (!searchInput || !searchResults) return;

  let searchIndex = [];
  let selectedIndex = -1;

  // ═══════════════════════════════════════════════════════════════
  // BUILD SEARCH INDEX
  // ═══════════════════════════════════════════════════════════════

  async function buildSearchIndex() {
    // In production, this would load from a JSON file generated at build time
    // For now, we'll index the current page content
    const content = document.querySelector('.content');
    if (!content) return;

    const paragraphs = content.querySelectorAll('p, .verse, .commentary');

    searchIndex = Array.from(paragraphs).map((el, index) => ({
      id: index,
      title: findNearestHeading(el),
      content: el.textContent.trim(),
      url: window.location.pathname + '#' + (el.id || `section-${index}`),
      element: el
    }));
  }

  function findNearestHeading(element) {
    let current = element;
    while (current && current !== document.body) {
      const prevHeading = current.previousElementSibling;
      if (prevHeading && /^H[1-6]$/.test(prevHeading.tagName)) {
        return prevHeading.textContent;
      }
      current = current.previousElementSibling || current.parentElement;
    }
    return document.title;
  }

  // ═══════════════════════════════════════════════════════════════
  // SEARCH FUNCTION
  // ═══════════════════════════════════════════════════════════════

  function search(query) {
    if (!query || query.length < 2) {
      searchResults.classList.remove('is-active');
      return [];
    }

    const lowerQuery = query.toLowerCase();

    const results = searchIndex
      .filter(item => {
        return item.content.toLowerCase().includes(lowerQuery) ||
               item.title.toLowerCase().includes(lowerQuery);
      })
      .slice(0, 10) // Limit to 10 results
      .map(item => {
        const index = item.content.toLowerCase().indexOf(lowerQuery);
        const start = Math.max(0, index - 50);
        const end = Math.min(item.content.length, index + query.length + 50);

        let excerpt = item.content.substring(start, end);
        if (start > 0) excerpt = '...' + excerpt;
        if (end < item.content.length) excerpt = excerpt + '...';

        // Highlight query
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        excerpt = excerpt.replace(regex, '<mark>$1</mark>');

        return {
          ...item,
          excerpt
        };
      });

    return results;
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // ═══════════════════════════════════════════════════════════════
  // DISPLAY RESULTS
  // ═══════════════════════════════════════════════════════════════

  function displayResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search__no-results">No results found</div>';
      searchResults.classList.add('is-active');
      return;
    }

    const html = results.map((result, index) => `
      <div class="search__result ${index === selectedIndex ? 'is-selected' : ''}" data-url="${result.url}" data-index="${index}">
        <div class="search__result-title">${result.title}</div>
        <div class="search__result-excerpt">${result.excerpt}</div>
      </div>
    `).join('');

    searchResults.innerHTML = html;
    searchResults.classList.add('is-active');

    // Add click handlers
    searchResults.querySelectorAll('.search__result').forEach(result => {
      result.addEventListener('click', function() {
        window.location.href = this.dataset.url;
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // EVENT HANDLERS
  // ═══════════════════════════════════════════════════════════════

  let debounceTimer;

  searchInput.addEventListener('input', function(e) {
    clearTimeout(debounceTimer);

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
          window.location.href = results[selectedIndex].dataset.url;
        }
        break;

      case 'Escape':
        searchResults.classList.remove('is-active');
        searchInput.blur();
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
    }
  });

  // Initialize
  buildSearchIndex();

})();
