/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('example generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('example:app', ['../../app']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      '.gitignore',
      'LICENSE',
      'README.md',
      'index.js',
      'package.json'
    ];

    helpers.mockPrompt(this.app, {
      'slug': '2014-01-01-express',
      'modulename': 'express',
      'nodejitsu': true
    });

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
