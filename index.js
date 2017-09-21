/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-post-robot',

  included(app) {
    this._super.included(app);

    this.app.import('vendor/post-robot.js', {
      type: 'vendor'
    });

    this.app.import('vendor/post-robot.shim.js', {
      type: 'vendor',
      exports: { 'post-robot': ['default'] }
    });
  },

  treeForVendor(vendorTree) {
    var postRobotPath = path.join(this.project.root, 'node_modules', 'post-robot', 'dist');
    var postRobotTree = new Funnel(postRobotPath, {
      files: [
        'post-robot.js',
        'post-robot.js.map',
      ],
    });

    return new MergeTrees([vendorTree, postRobotTree]);
  },
};
