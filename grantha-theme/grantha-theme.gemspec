# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "grantha-theme"
  spec.version       = "1.0.0"
  spec.authors       = ["Your Name"]
  spec.email         = ["your.email@example.com"]

  spec.summary       = "A beautiful Jekyll theme for Sanskrit, Prakrit, and Pali texts"
  spec.description   = "Grantha is a responsive Jekyll theme designed specifically for classical Indic texts with parallel text display, commentary system, verse numbering, critical apparatus, and comprehensive scholarly features."
  spec.homepage      = "https://github.com/yourusername/grantha-theme"
  spec.license       = "MIT"

  spec.metadata["plugin_type"] = "theme"
  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://github.com/yourusername/grantha-theme"
  spec.metadata["changelog_uri"] = "https://github.com/yourusername/grantha-theme/blob/main/CHANGELOG.md"
  spec.metadata["bug_tracker_uri"] = "https://github.com/yourusername/grantha-theme/issues"
  spec.metadata["documentation_uri"] = "https://github.com/yourusername/grantha-theme/wiki"

  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))!i)
  end

  spec.add_runtime_dependency "jekyll", "~> 4.3"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.17"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.8"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4"

  spec.add_development_dependency "bundler", "~> 2.4"
  spec.add_development_dependency "rake", "~> 13.0"
  spec.add_development_dependency "webrick", "~> 1.8"

  spec.required_ruby_version = ">= 2.7.0"
end
