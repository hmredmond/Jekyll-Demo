---
title: Jekyll CMS User Guide
date: 2017-10-10 14:41:00 Z
permalink: "/guidelines/"
layout: page
---

This is a high level overview of how to enter content into the CMS for Cyber Essentials. 

## Site variables

### Piwik Settings

The site Id and Domain for the Piwik code is also set in the Siteleaf settings page (or in the config.yaml file)


## Menus

The menus are configured in the menu collection. 

There are two main menus - the primary menu which appears at the top of the page and the footer menu. 

To use the correct link, find the page in site leaf, view the advanced settings, and copy the _permalink_ value.


## Images

Throughout the CMS there is the option to specify different images for different device sizes. 

If no tablet or mobile image is specified, then the default one is used. If no mobile is specified, but there is a tablet image, then the tablet image is used. 

## Promos

Promos will display on the following pages types:

* information page

The promo displayed will be the one sharing the same catagory as the containing page. 

E.g. if the information_page has a category of 'abc', then the promo also with the category 'abc' will be the one that is displayed. 

## Homepage

### Recent news

All posts tagged with [Public] will valid for display here. Only the most recent 3 items will be displayed. 

All other items can be accessed from the site map. 


## Information Pages

### Downloads

If the information page has a download file associated, then the page will allow the user to download it. 

If no type or name is given to the file, it will be determined from the selected file. 

### Affiliate pages

Any page with a category of affiliate will appear with the affiliate header image. 