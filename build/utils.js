var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('../config');

exports.assetsPath = function(_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.docs.assetsSubDirectory;

  return path.join(assetsSubDirectory, _path);
}

exports.resolve = function(dir) {
  return path.join(__dirname, '..', dir);
}

exports.cssLoaders = function(options) {
  options = options || {};

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap,
    },
  };

  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader];

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      });
    }

    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: 'css-loader',
        fallback: 'vue-style-loader',
      });
    } else {
      return ['vue-style-loader'].concat(loaders);
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
  };
}

exports.styleLoaders = function(options) {
  var output = [];
  var loaders = exports.cssLoaders(options);

  for (var extension in loaders) {
    var loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output;
}
