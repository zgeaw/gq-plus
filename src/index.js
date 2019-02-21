import areaSelect from './components/area-select';
import areaConfig from './utils/areaConfig';

const components = {
    areaSelect
};
const install = function(Vue, opts = {}) {
    if (install.installed) return;

    Object.keys(components).forEach(key => {
        Vue.component(key, components[key]);
    });

    Vue.prototype.$Area = areaConfig;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
    version: process.env.VERSION, 
    install,
    ...components
};

module.exports.default = module.exports = API;
