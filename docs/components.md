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
      {%- assign array = component.name | split: '' | reverse | join: '' | remove_first: 'dm.' | split: '' | reverse | join: '' | split: '-' -%}
      {%- capture disp -%}
      {%- for word in array -%}
        {{ word | capitalize }}
      {%- endfor -%}
      {%- endcapture %}
* [{{ disp }}]({{ component.url | relative_url }}#content-wrapper)
    {%- endfor %}
  {% endif %}
{%- endfor -%}
