'use strict';

function asModules(module, defaultModule = []) {
  return module.default || defaultModule;
}

const teleports = [];

const context = require.context('@@', true, /\/teleport\/index.(js)$/);
const keys = context.keys();
for (const key of keys) {
  const modules = asModules(context(key));
  for (const module of modules) {
    const { component, attrs } = module;
    teleports.push({ is: component.default || component, attrs });
  }
}

export default teleports;
