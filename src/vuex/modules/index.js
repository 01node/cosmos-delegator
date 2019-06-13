'use strict';

export default opts => ({
  keybase: require(`./keybase.js`).default(opts),
  validators: require(`./validators.js`).default(opts)
});
