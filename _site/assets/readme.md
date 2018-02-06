## Assets

Structure outline

|- _scss
|- css
|- favicons
|- fonts
|- img
|- js
  |- _src
  |- vendor
|- outdatedbrowser


### _scss

The source files for the sass code. This is compiled by the gulp command 'gulp styles' and included as a task in the 'npm start' workflow.

The source compiles into css/style.css.

### css

The output of the compiled sass code

### favicons

All of the favicons required for the site (generated from the site https://realfavicongenerator.net/)

### fonts

Any font definitions which are required for the site.

### img

This image folder should contain any images which are not customisable on the site - e.g. logos, display assets. Not content images. All content images should be uploaded via the CMS UI (if using siteleaf) or stored in the _uploads folder.

### JS

The root of the folder contains the compiled, converted and minified into native and supportable JS from the _src folder. 
The root only contains custom js files and is treated by Babel to ensure that any ES6 content is converted into JS supported by all browsers. 

#### _src

Any custom js scripts which require babel conversion and minification into the root of the JS folder. 

#### vendor

The vendor folder contains all the JS scripts from thrid party sources. These should not be changed or treated, but used as recieved from the vendor sites. 

### outdatedbrowser

Third party source to support outdated browser and suggest a newer / supported browser. 