---
layout: page
permalink: /publications/
title: publications
description: Peer reviewed conference or journal publications in reversed chronological order.
years: [2024]
published: false
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
