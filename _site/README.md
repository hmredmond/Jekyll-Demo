# CMS UI workflow

A workflow UI project for the Jekyll base cms site.

[Jekyll documentation is here.](https://jekyllrb.com/)

<hr>

## Dependencies

**If you're on a Mac**: Run `./install-script.sh` to install NPM dependencies, Jekyll, and Sass. This will also check to make sure you have Homebrew, Ruby, and Node installed as well, and if not, will download them for you.

**If you're on a Windows or Linux computer**: please be sure to have Ruby, Rubygems, Jekyll and Sass gems, Node, npm, and Grunt installed. The `install-script.sh` file made for Mac terminals will not work for you.

<hr>

## Getting started

Check out the `_config.yml` file first, to set your variables. This config file is read only once when you start your server; so if you make changes to this file while your server is running, you will need to restart your server to see the changes.

**On your local computer:** Run `jekyll server` to serve locally.

In a separate terminal tab/window, run `sass watch` to watch for changes in `assets/scss` and compile your Sass files into CSS, the result of which is your styles end up in `assets/css/main.min.css` and included in your site's `head` tag.

<hr>

## NPM commands:

The following commands can be run from the console. 

#### npm run start

Compiles the site and runs from the source. Watches the source and updates the served pages as required. 

#### npm run deploy 

Compiles the site into the the deploy folder. 

#### npm run clean

Runs a gulp task that removes/deletes the folder where the site is deployed to

#### npm run test

Runs a gulp task that performs linting for the site - html validation, bootstrap validation and js hint validation. 

#### npm run sass

Runs a gulp task that compiles the sass into css

#### npm run watch

Runs a gulp task that watches the sass folder and compiles after any changes.

<hr>

## Gulp Workflow:

### Config

The gulp tasks have a custom config file in the workflow folder. This defines the projects paths for source, deploy, sass and css. It can be extended as required and used in any of the gulp files as config.<value>. 

### Workflow folder

The workflow folder contains all of the js scripts which define the gulp tasks. The tasks are organised in grouped files to make reading them easier. 

<hr>

## Includes:

* File tree with `_data/`, `_includes/`, `_layouts/`, `_posts/`, `_site/`, `assets/`, `category/`, `tag/` and other subfolders.
* Asset setup with Sass. gulp setup for managing assets.
* Initial categories and tags structures, and corresponding layouts.
