Package.describe({
  name: 'scdo:scdojs',
  version: '0.5.0',
  // Brief, one-line summary of the package.
  summary: 'SCDO JavaScript API, middleware for communicating with the Scdo nodes via RPC',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/scdoproject/scdojs.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('0.5');
  api.export('Scdo', ['client', 'server']);
  api.addFiles('browserify/scdo_browserify.js', ['client', 'server']);
  api.addFiles('package-init.js', ['client', 'server']);
  
  // api.use('3stack:bignumber@2.0.0', 'client');
  // api.use('ecmascript');
  // api.mainModule('src/scdo.js');
});

// Package.onTest(function(api) {
//   api.use('ecmascript');
//   api.use('tinytest');
//   api.use('scdo:scdojs');
//   api.mainModule('scdojs-tests.js');
// });
