# Installation Guide

## Quick Start

### Option 1: Clone and Use Directly

```bash
# Clone the theme
git clone https://github.com/yourusername/grantha-theme.git my-text-site
cd my-text-site

# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# Open in browser
open http://localhost:4000
```

### Option 2: Use as Remote Theme

In your Jekyll site's `_config.yml`:

```yaml
remote_theme: yourusername/grantha-theme@v1.0.0

plugins:
  - jekyll-remote-theme
```

### Option 3: Install as a Gem

Add to your `Gemfile`:

```ruby
gem "grantha-theme", "~> 1.0"
```

Then in `_config.yml`:

```yaml
theme: grantha-theme
```

Run:

```bash
bundle install
```

## Requirements

- Ruby >= 2.7.0
- Bundler >= 2.4
- Jekyll >= 4.3

## First Steps

1. **Update `_config.yml`** with your site information
2. **Create your first text** in `_texts/` directory
3. **Add verses** in `_verses/` directory (optional)
4. **Customize colors** in `_config.yml` under `theme_settings.colors`
5. **Test locally** with `bundle exec jekyll serve`

## Troubleshooting

### Fonts not loading?

Make sure you have internet connection for Google Fonts, or self-host the fonts in `assets/fonts/`.

### Styles not applying?

Check that `assets/css/main.scss` has the front matter (two lines with `---`).

### Search not working?

Ensure `assets/js/search.js` is being loaded and check browser console for errors.

### Mobile menu not working?

Verify that `assets/js/main.js` is loaded with the `defer` attribute.

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the [example content](example/) for reference
- Check the [CHANGELOG.md](CHANGELOG.md) for updates
- Visit the [GitHub repository](https://github.com/yourusername/grantha-theme) for issues and discussions
