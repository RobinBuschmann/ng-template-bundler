ng-template-bundler
==========

CLI utility to turn Angular templates into a javascript module, optionally with
browserify support and bundling.

Usage
-----
```
$ ng-template-bundler inputFile [inputFile] [-m module] [-o outfile] [-b basedir] [--browserify]
```
With a single input file, the module name will be the template's name if no -m option is given.
With multiple input files, the default module name will be `templates`.
Without an outfile, result will be written to stdout.


Without a module name:

```
$ ng-template-bundler test/**/*.html
angular
  .module('test/test.tmpl', [])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('test/test.tmpl', '...');
  }]);
```

With a module name:

```
$ ng-template-bundler test/**/*.html -m foo
angular
  .module('foo', [])
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('test/test.tmpl', '...');
  }]);
```

With a multiple input files:

```
$ ng-template-bundler test/**/*.html test2/**/*.html
angular
  .module('templates', [])
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('test/test.tmpl', '...');
    $templateCache.put('test/another.tmpl', ' ...');
  }]);
```

With a multiple input files and browserify:

```
$ ng-template-bundler test/**/*.html test2/**/*.html
module.exports = angular
  .module('templates', [])
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('test/test.tmpl', '...');
    $templateCache.put('test/another.tmpl', ' ...');
}]);
```

With a single input files and browserify:

```
$ ng-template-bundler test/**/*.html test2/**/*.html
module.exports = angular
  .module('templates', [])
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('test/test.tmpl', '...');
    $templateCache.put('test/another.tmpl', ' ...');
  }]);
```

```
$ ng-template-bundler test/**/*.html --browserify
module.exports = angular
  .module('test/test.tmpl', [])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('test/test.tmpl', '...');
  }]);
```

License
-------
Released under permissive MIT License.
