/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

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
  },

  // Override the vendor tree to include the post-robot javascript dist files:
  treeForVendor(tree) {
    const vendorTrees = [];

    vendorTrees.push(new Funnel('node_modules/post-robot/dist', { destDir: '.' }));

    if (tree) {
      vendorTrees.push(tree);
    }

    return mergeTrees(vendorTrees, { overwrite: true });
  }
};
