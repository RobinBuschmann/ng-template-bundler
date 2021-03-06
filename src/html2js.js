/**
 * DISCLAIMER: Core logic was copied from https://github.com/karma-runner/karma-ng-html2js-preprocessor.
 * Since karma-ng-html2js-preprocessor was designed specifically for karma,
 * I modified it to create a standalone script.
 */

/* globals module */
'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');
var clean = require('htmlclean');

var tSingle = fs.readFileSync(path.join(__dirname, './single.tmpl'), 'utf-8');
var tBundleItem = fs.readFileSync(path.join(__dirname, './bundle-item.tmpl'), 'utf-8');

var escapeTemplate = function(html) {
  return html
    .replace(/\\/g, '\\\\')
    .replace(/'/g, '\\\'')
    .replace(/\n/g, '');
};

module.exports = function (url, content, options) {
  var moduleName = options.module || url;
  var args = [];

  if(options.bundle) {
    args.push(tBundleItem, url, clean(escapeTemplate(content)));
  } else {
    args.push(tSingle, moduleName, moduleName, url, clean(escapeTemplate(content)));
  }

  return util.format.apply(this, args);
};
