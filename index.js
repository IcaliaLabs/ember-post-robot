/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-post-robot',

  included(app) {
    this._super.included(app);

    this.app.import('node_modules/post-robot/dist/post-robot.js', {
      type: 'vendor'
    });

    this.app.import('vendor/post-robot.shim.js', {
      type: 'vendor',
      exports: { 'post-robot': ['default'] }
    });
  }
};
