'use strict';
/**
 * Main store module
 * @module store
 */

import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters.js';
import modules from './modules/index.js';

Vue.use(Vuex);

/**
 * Module Store
 * @param opts
 * @returns {Vuex.Store}
 */
export default (opts = {}) => {
  // provide commit and dispatch to tests
  opts.commit = (...args) => store.commit(...args);
  opts.dispatch = (...args) => store.dispatch(...args);

  const store = new Vuex.Store({
    getters,
    // strict: true,
    modules: modules(opts),
    actions: {}
  });

  return store;
};
