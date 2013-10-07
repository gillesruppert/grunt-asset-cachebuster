/*
 * grunt-asset-cachebuster
 * https://github.com/gillesruppert/grunt-asset-cachebuster
 *
 * Copyright (c) 2013 Gilles Ruppert
 * Licensed under the MIT license.
 */

'use strict';

function isCss(filepath) {
  return (/\.css$/).test(filepath);
}

function isHtml(filepath, extension) {
  var htmlTest = new RegExp('\\.' + extension + '$', 'gi');
  return htmlTest.test(filepath);
}

function cacheBustCss(css, buster) {
  var img = /url\(['"]?(?!data:)([^)'"?]+)['"]?(?:\?v=[0-9]+)*\)/gi;
  return css.replace(img, 'url($1?v=' + buster + ')');
}

function cacheBustHtml(html, buster) {
  var css = /href="(.+\.css)"/gi;
  html = html.replace(css, 'href="$1?v=' + buster + '"');

  var js = /src="(.+\.js)"/gi;
  html = html.replace(js, 'src="$1?v=' + buster + '"');

  var images = /src="(.+\.)(png|gif|jpg|jpeg)"/gi;
  html = html.replace(images, 'src="$1$2?v=' + buster + '"');
  return html;
}


module.exports = function(grunt) {

  function cacheBust(src, files, options) {
    if (isCss(files.dest)) {
      grunt.file.write(files.dest, cacheBustCss(src, options.buster));
    }
    else if (isHtml(files.dest, options.htmlExtension)) {
      grunt.file.write(files.dest, cacheBustHtml(src, options.buster));
    } else {
      grunt.file.write(files.dest, cacheBustHtml(src, options.buster));
    }
    grunt.log.writeln('Assets in "' + files.dest + '" cachebusted.');
  }

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('asset_cachebuster', 'Cachebust images, scripts and other assets in your HTML & CSS files.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      buster: '123456',
      htmlExtension: 'html'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(files) {
      var src = files.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) { return grunt.file.read(filepath); })
      .join(grunt.util.normalizelf(''));

      try {
        cacheBust(src, files, options);
      } catch (e) {
        grunt.log.error('ERROR:', e.message, e);
        grunt.fail.warn('Failed to cachebust assets in: ' + files.dest);
      }
    });

  });
};
