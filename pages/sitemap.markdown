---
title: Sitemap
date: 2017-09-19 13:21:00 Z
permalink: "/sitemap/"
layout: page
---

### Landing Pages

{% assign menuItems = site.menus | where:"title","Primary Navigation"  %}              
{% for page in menuItems[0].items %}
  * [{{page[0]}}]({{page[1]}})
{% endfor %}

<hr/>

### News Posts
{% assign mostRecentPosts = site.posts | limit: 6 %}
{% for post in  mostRecentPosts %}
{% unless post.published == false %}
* [{{post.title}}]({{post.url | prepend: site.baseurl }})
{% endunless %}
{% endfor %}

<hr/>

### Pages

{% for page in site.information-pages %}

 {% assign inCurrentMenu = false %}
   {% for menuItems in menuItems[0].items %}
     {% unless inCurrentMenu %}
        {% if page.url == menuItems[1] %}
          {% assign inCurrentMenu = true %}
        {% endif %}
     {% endunless %}
   {% endfor %}

  {% unless page.published == false  or inCurrentMenu == true %}
    {% unless page.sitemap == false or page.url contains 'robots.txt' or page.url contains 'sitemap.xml'  %}
* [{{page.title}}]({{page.url | prepend: site.baseurl }})
    {% endunless %}
  {% endunless %}
{% endfor %}

{% for page in site.pages %}
   {% assign inCurrentMenu = false %}
   {% for menuItems in menuItems[0].items %}
     {% unless inCurrentMenu %}
        {% if page.url == menuItems[1] %}
          {% assign inCurrentMenu = true %}
        {% endif %}
     {% endunless %}
   {% endfor %}
 {% unless page.published == false  or inCurrentMenu == true %}
  {% unless page.sitemap == false or page.url contains 'robots.txt' or page.url contains 'sitemap' or page.url contains '404' or page.url contains 'maintenance'  %}
* [{{page.title}}]({{page.url | prepend: site.baseurl }})
  {% endunless %}
  {% endunless %}
{% endfor %}