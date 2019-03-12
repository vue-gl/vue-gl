---
title: false
---

# Components

{% assign groups = site.pages | group_by: 'dir' | sort: 'name' %}
{%- for group in groups -%}
  {% assign dir = group.name | split: '/' %}
  {% if dir[1] == 'components' %}

## {{ dir[2] | capitalize }}

{% assign components = group.items | sort: 'name' %}
    {%- for component in components %}
      {%- assign array_rev = component.name | split: '' | reverse -%}
      {%- assign name_rev = array_rev | join: '' | remove_first: 'dm.' -%}
      {%- assign array = name_rev | split: '' | reverse -%}
      {%- assign words = array | join: '' | split: '-' -%}
      {%- capture disp -%}
      {%- for word in words -%}
        {{ word | capitalize }}
      {%- endfor -%}
      {%- endcapture %}

* [{{ disp }}]({{ component.url | relative_url }}#content-wrapper)

    {%- endfor %}
  {% endif %}
{%- endfor -%}
