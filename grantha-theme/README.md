# Grantha Theme

A beautiful, responsive Jekyll theme designed specifically for Sanskrit, Prakrit, and Pali texts with full scholarly apparatus. Perfect for creating online editions of classical Indic texts with commentary, critical apparatus, and modern scholarly features.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Jekyll](https://img.shields.io/badge/jekyll-4.0+-green.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

## ✨ Features

### Core Text Features
- **Parallel Text Display**: Three display modes - side-by-side, stacked, or toggle between Devanagari and Roman scripts
- **Verse Numbering**: Automatic verse numbering with deep-linking and anchor links
- **Commentary System**: Expandable/collapsible commentary sections supporting multiple commentators
- **Critical Apparatus**: Display variant readings and textual notes
- **Footnotes**: Full support for scholarly footnotes with popup preview
- **Breadcrumb Navigation**: Clear navigation hierarchy
- **Chapter Navigation**: Previous/next chapter links

### Reading Experience
- **Dark Mode**: Easy on the eyes with beautiful dark theme (saves preference)
- **Font Size Controls**: Adjustable text size with 4 levels
- **Reading Progress**: Visual progress bar showing reading completion
- **Bookmarks**: Save favorite passages (stored locally)
- **Search**: Fast client-side search across all content
- **Keyboard Shortcuts**: Efficient navigation for power users
- **Smooth Scrolling**: Beautiful animated scrolling to sections

### Technical Features
- **Mobile-First Design**: Fully responsive from 320px to 4K displays
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Accessibility**: WCAG AA compliant with screen reader support
- **Print Styles**: Optimized for printing with clean, readable output
- **Fast Loading**: Optimized CSS/JS, lazy loading, minimal dependencies
- **SEO Optimized**: Semantic HTML, OpenGraph, Twitter Cards
- **No Dependencies**: Pure Vanilla JS, no jQuery or frameworks

## 📸 Screenshots

*(Add screenshots of your theme here)*

## 🚀 Quick Start

### Installation

1. **Clone the theme**:
   ```bash
   git clone https://github.com/yourusername/grantha-theme.git
   cd grantha-theme
   ```

2. **Install dependencies**:
   ```bash
   bundle install
   ```

3. **Run locally**:
   ```bash
   bundle exec jekyll serve
   ```

4. **View in browser**:
   Open [http://localhost:4000](http://localhost:4000)

### As a Remote Theme

Add to your `_config.yml`:

```yaml
remote_theme: yourusername/grantha-theme
```

## 📝 Configuration

### Basic Configuration

Edit `_config.yml`:

```yaml
# Site settings
title: Your Text Repository
description: Classical Indic texts with scholarly apparatus
baseurl: ""
url: "https://yoursite.com"

# Theme settings
theme_settings:
  fonts:
    devanagari: "Adishila"  # Font for Devanagari text
    roman: "Cormorant Garamond"  # Font for Roman text

  colors:
    light_mode:
      background: "#FAF8F3"
      text: "#2C2416"
      accent: "#8B4513"
      vermillion: "#E34234"
      ochre: "#CC7722"
      gold: "#D4AF37"

    dark_mode:
      background: "#1C1810"
      text: "#E8E6E0"
      accent: "#D4A574"
      vermillion: "#FF6B5E"
      ochre: "#E69952"
      gold: "#FFD700"

  features:
    parallel_text: true
    verse_numbering: true
    commentary: true
    progress_tracker: true
    night_mode: true
    search: true
    bookmarks: true
    critical_apparatus: true
    footnotes: true

  layout:
    sidebar_position: "left"  # or "right"
    toc_sticky: true
    breadcrumbs: true
    chapter_navigation: true
```

### Collections

Define your collections:

```yaml
collections:
  texts:
    output: true
    permalink: /:collection/:name
  verses:
    output: true
    permalink: /:collection/:name
```

## 📖 Creating Content

### Text Pages (Chapters)

Create a file in `_texts/bhagavad-gita-chapter-2.md`:

```yaml
---
layout: text
title: भगवद्गीता - अध्याय २
title_transliteration: Bhagavadgītā - Adhyāya 2
category: mahābhārata
author: व्यास
translator: "Edwin Arnold"
commentator: शङ्कराचार्य
script: devanagari
language: sanskrit

# Enable features
parallel_text: true
verse_numbering: true
commentary: true
critical_apparatus: false
sandhi_split: false
show_ornaments: true

# Structure
chapters: 18
current_chapter: 2
previous_chapter: /texts/bhagavad-gita-chapter-1
next_chapter: /texts/bhagavad-gita-chapter-3

# Display
layout_style: "manuscript"
---

# Chapter Title

Your chapter content here...

## Verse 1

<div class="verse" id="verse-2-1">
  <span class="verse__number">2.1</span>
  <a href="#verse-2-1" class="verse__anchor">#</a>

  <div class="verse__devanagari devanagari">
    Sanskrit verse in Devanagari...
  </div>

  <div class="verse__transliteration roman">
    Transliteration in IAST...
  </div>

  <div class="verse__translation roman">
    English translation...
  </div>

  <div class="verse__meter">
    Meter: <em>anuṣṭubh</em>
  </div>
</div>
```

### Verse Pages

Create a file in `_verses/bg-2-47.md`:

```yaml
---
layout: verse
text: bhagavad-gita
chapter: 2
verse: 47
meter: anuṣṭubh

devanagari: |
  कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।
  मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥

transliteration: |
  karmaṇy-evādhikāras te mā phaleṣu kadācana |
  mā karma-phala-hetur bhūr mā te saṅgo'stv akarmaṇi ||

translation: |
  You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.

commentary:
  - type: bhāṣya
    author: शङ्कराचार्य
    script: roman
    content: |
      Commentary text in Markdown...

  - type: tīkā
    author: Another commentator
    script: devanagari
    content: |
      More commentary...

critical_apparatus:
  - reading: "कर्मण्येवाधिकारस्ते"
    source: "All major manuscripts"
    note: "Universal reading"
---

Additional content here...
```

### Commentary

Add expandable commentary sections:

```html
<div class="commentary">
  <div class="commentary__header">
    <div class="commentary__title">
      <span class="commentary__type">Bhāṣya</span>
      <span class="commentary__author">Śaṅkarācārya</span>
    </div>
    <div class="commentary__toggle"></div>
  </div>
  <div class="commentary__body">
    <div class="commentary__content commentary__content--roman">
      <p>Commentary text here...</p>
    </div>
  </div>
</div>
```

### Critical Apparatus

```html
<div class="critical-apparatus">
  <div class="critical-apparatus__label">Critical Apparatus</div>
  <div class="critical-apparatus__entry">
    <span class="critical-apparatus__reading">variant reading</span>
    <span class="critical-apparatus__source">manuscript source</span>
    <span class="critical-apparatus__note">explanatory note</span>
  </div>
</div>
```

## 🎨 Customization

### Colors

Override colors in your `_sass/_custom.scss`:

```scss
:root {
  --color-accent: #your-color;
  --color-background: #your-color;
}
```

### Fonts

The theme uses Google Fonts by default. To use custom fonts:

1. Add font files to `assets/fonts/`
2. Update `assets/css/main.scss`:

```scss
@font-face {
  font-family: 'Adishila';
  src: url('../fonts/Adishila-Regular.woff2') format('woff2');
  font-display: swap;
}
```

### Layouts

Override any layout by creating a file with the same name in your `_layouts/` directory.

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `t` | Toggle dark/light theme |
| `f` | Focus search |
| `b` | Toggle bookmark |
| `+` or `=` | Increase font size |
| `-` | Decrease font size |
| `0` | Reset font size |
| `?` | Show keyboard shortcuts help |

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📱 Mobile Features

- Touch-friendly navigation
- Optimized font sizes
- Collapsible sidebar
- Hamburger menu
- Swipe gestures (where applicable)

## ♿ Accessibility

- Semantic HTML5
- ARIA labels where needed
- Keyboard navigation
- Focus indicators
- Color contrast ratios (WCAG AA)
- Screen reader friendly
- Skip to content link
- Reduced motion support

## 🖨️ Print Styles

The theme includes optimized print styles:

- Hides navigation and UI elements
- Expands all commentary
- Shows URLs for links
- Page break optimization
- Optimized typography

## 🔧 Development

### File Structure

```
grantha-theme/
├── _includes/           # Reusable components
│   ├── header.html
│   ├── footer.html
│   ├── sidebar.html
│   ├── breadcrumbs.html
│   ├── chapter-navigation.html
│   ├── progress-tracker.html
│   └── bookmark-button.html
├── _layouts/           # Page layouts
│   ├── default.html
│   ├── text.html
│   └── verse.html
├── _sass/             # SCSS modules
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _base.scss
│   ├── _layout.scss
│   ├── _components.scss
│   ├── _scholarly.scss
│   ├── _print.scss
│   └── _utilities.scss
├── assets/
│   ├── css/
│   │   └── main.scss
│   ├── js/
│   │   ├── main.js
│   │   └── search.js
│   ├── fonts/
│   └── images/
├── example/           # Example content
├── _config.yml
└── README.md
```

### Adding New Features

1. Add SCSS to appropriate module in `_sass/`
2. Add JavaScript to `assets/js/main.js`
3. Create include file if needed
4. Update documentation

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This theme is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 🙏 Credits

### Fonts
- **Noto Sans Devanagari**: Google Fonts
- **Cormorant Garamond**: Google Fonts (Christian Thalmann)

### Inspiration
- Classical manuscript traditions
- Modern web typography
- Digital humanities projects

### Built With
- [Jekyll](https://jekyllrb.com/)
- Vanilla JavaScript (ES6+)
- SCSS/Sass
- CSS Grid & Flexbox

## 📞 Support

- **Documentation**: [Full documentation](https://github.com/yourusername/grantha-theme/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/grantha-theme/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/grantha-theme/discussions)

## 🗺️ Roadmap

- [ ] Multi-language support
- [ ] Advanced search with filters
- [ ] Export to PDF
- [ ] Verse comparison tool
- [ ] Audio integration for chanting
- [ ] Interactive sandhi splitter
- [ ] Manuscript viewer integration
- [ ] Collaborative annotation

## 📚 Example Sites

Sites using this theme:
- *Your site here - submit a PR!*

## ⭐ Star History

If you find this theme useful, please consider giving it a star on GitHub!

---

**Made with ❤️ for preserving and sharing classical Indic texts**
