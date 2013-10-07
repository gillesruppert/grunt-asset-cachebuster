# grunt-asset-cachebuster

> Cachebust images, scripts and other assets in your HTML & CSS files.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-asset-cachebuster --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-asset-cachebuster');
```

## The "asset_cachebuster" task

### Overview
In your project's Gruntfile, add a section named `asset_cachebuster` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  asset_cachebuster: {
    options: {
      buster: Date.now(),
      htmlExtension: 'html'
    },
    your_target: {
      // Target-specific file lists and/or options go here.
      // make sure you have separate file lists for your CSS and HTML files
    },
  },
})
```

### Options

#### options.buster
Type: `String`
Default value: `'123456'`

A string value that is used to append to the url of your assets. Generally, you
want this to be a timestamp or the version number of your app.

#### options.htmlExtension
Type: `String`
Default value: `'html'`

The extension of html assets. This is useful if you use a templating language
for your html where you want to cachebust assets, i.e. `'handlebars'`

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  asset_cachebuster: {
    options: {},
    files: {
      'dest/default_options.css': ['src/testing.css'],
      'dest/default_options.html': ['src/testing.html'],
    },
  },
})
```

In this example, the default options are used to cachebust html and css files.
So if the `testing.css` or `testing.html` files have content such as 

```css
h1 {
  background-image: url('testing.png');
}
```
or
```html
<script src="testing.js"></src>
<link href="testing.css" rel="stylesheet">
<img src="testing.png">
```
the generated result would be

```css
h1 {
  background-image: url('testing.png?v=123456');
}
```
or
```html
<script src="testing.js?v=123456"></src>
<link href="testing.css?v=123456" rel="stylesheet">
<img src="testing.png?v=123456">
```


#### Custom Options
```js
grunt.initConfig({
  asset_cachebuster: {
    options: {
      buster: '0.1.0',
      htmlExtension: 'htm'
    },
    files: {
      'dest/default_options.css': ['src/testing.css'],
      'dest/default_options.htm': ['src/testing.htm'],
    },
  },
})
```

In this example, custom options are used to cachebust htm and css files.
So if the `testing.css` or `testing.htm` files have content such as 

```css
h1 {
  background-image: url('testing.png');
}
```
or
```html
<script src="testing.js"></src>
<link href="testing.css" rel="stylesheet">
<img src="testing.png">
```
the generated result would be

```css
h1 {
  background-image: url('testing.png?v=0.1.0');
}
```
or
```html
<script src="testing.js?v=0.1.0"></src>
<link href="testing.css?v=0.1.0" rel="stylesheet">
<img src="testing.png?v=0.1.0">
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

 * 2013-10-07   v0.1.0   initial release
