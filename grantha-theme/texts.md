---
layout: default
title: Texts
permalink: /texts/
---

# Text Collection

Browse our collection of classical Indic texts with scholarly apparatus.

## Available Texts

{% if site.texts.size > 0 %}

<div class="grid grid--2">
  {% for text in site.texts %}
    <div class="card">
      <div class="card__header">
        <h3 class="card__title">
          <a href="{{ text.url | relative_url }}">{{ text.title }}</a>
        </h3>
      </div>

      <div class="card__body">
        {% if text.title_transliteration %}
          <p class="text-muted roman">{{ text.title_transliteration }}</p>
        {% endif %}

        {% if text.author %}
          <p><strong>Author:</strong> {{ text.author }}</p>
        {% endif %}

        {% if text.category %}
          <p><span class="badge badge--accent">{{ text.category }}</span></p>
        {% endif %}

        {% if text.excerpt %}
          <p>{{ text.excerpt | strip_html | truncatewords: 30 }}</p>
        {% endif %}
      </div>

      <div class="card__footer">
        <a href="{{ text.url | relative_url }}" class="btn btn--primary btn--small">
          Read Text →
        </a>
      </div>
    </div>
  {% endfor %}
</div>

{% else %}

<div class="alert alert--info">
  <p>No texts have been added yet. Check back soon!</p>
  <p>To add texts, create files in the <code>_texts</code> directory.</p>
</div>

{% endif %}

## Browse by Category

{% assign categories = site.texts | map: "category" | uniq | compact %}

{% if categories.size > 0 %}
<div class="mt-xl">
  {% for category in categories %}
    <h3>{{ category | capitalize }}</h3>
    <ul>
      {% assign category_texts = site.texts | where: "category", category %}
      {% for text in category_texts %}
        <li>
          <a href="{{ text.url | relative_url }}">{{ text.title }}</a>
          {% if text.title_transliteration %}
            <span class="text-muted">- {{ text.title_transliteration }}</span>
          {% endif %}
        </li>
      {% endfor %}
    </ul>
  {% endfor %}
</div>
{% endif %}

---

## How to Use

1. **Browse** texts above or use the search function
2. **Read** with parallel Devanagari and Roman scripts
3. **Explore** commentaries by expanding the commentary sections
4. **Bookmark** your favorite verses for later
5. **Adjust** font size and theme to your preference

Need help? Visit the [Help page](/help/).
