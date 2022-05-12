'use strict';

function asModule(module, defaultModule = {}) {
  return module.default || module || defaultModule;
}

const plugins = [];

const context = require.context('@', true, /\/plugins\/((?!index).)*\.(js)$/);
const keys = context.keys();
for (const key of keys) {
  const plugin = asModule(context(key));
  if (plugin) {
    plugins.push(plugin);
  }
}

export default {
  install: (app) => plugins.forEach((plugin) => app.use(plugin)),
};
