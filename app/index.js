/**
 * generator-example
 *
 * Copyright(c) 2014 npmawesome.com
 * MIT Licensed
 *
 * @author Alex Gorbatchev <alex.gorbatchev@gmail.com>
 * @author André König <andre.koenig@posteo.de>
 */

'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var pkg = require('../package.json');

module.exports = NpmAwesomeExampleGenerator;

function NpmAwesomeExampleGenerator (args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.pkg = pkg;

  // Will be asked
  this.modulename;

  // Will be extended by `modulename` after asking
  this.projectname = 'example-';

  // Will be extended by `projectname`
  this.repouri = 'https://github.com/npmawesome/';

  // Will be extended by the asked slug
  this.articleuri = 'http://npmawesome.com/posts/';

  this.on('end', function () {
    if (!options['skip-install']) {
      this.spawnCommand('npm', ['install','--save', this.modulename]);
    }
  }.bind(this));
}

util.inherits(NpmAwesomeExampleGenerator, yeoman.generators.Base);

NpmAwesomeExampleGenerator.prototype.questions = function questions () {
  var done = this.async();
  var prompts = [];

  this.log(this.readFileAsString(path.join(__dirname, 'header.txt')));

  prompts.push({
    name: 'modulename',
    message: 'About what module is this example (npm module name)?'
  });

  prompts.push({
    name: 'slug',
    message: 'The corresponding article slug (e.g. "2014-08-11-verror")?',
  });

  prompts.push({
    name: 'nodejitsu',
    type: 'confirm',
    default: false,
    message: 'Is this article going to be published on Nodejitsu?',
  });

  this.prompt(prompts, function (props) {
    this.nodejitsu = props.nodejitsu;
    this.modulename = props.modulename;
    this.projectname = this.projectname + this.modulename;
    this.repouri = this.repouri + this.projectname;
    this.articleuri = this.articleuri + props.slug;

    done();
  }.bind(this));
};

NpmAwesomeExampleGenerator.prototype.templates = function templates () {
  this.template('_package.json', 'package.json');
  this.template('_index.js', 'index.js');
  this.template('README.md', 'README.md');
};

NpmAwesomeExampleGenerator.prototype.statics = function statics () {
  this.copy('gitignore', '.gitignore');
  this.copy('LICENSE', 'LICENSE');
};