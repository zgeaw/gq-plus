import AreaSelect from './components/area-select';
import areaConfig from './utils/areaConfig';

const components = {
    AreaSelect
};

const axios = require('axios');
//加载地区数据
const loadArea = async () => {
    try {
        axios.get('http://172.16.0.145:50720/gangquan360-web/area/areaList')
        const response = await axios.get('http://172.16.0.145:50720/gangquan360-web/area/areaList');
        if(response.data.success){
            let url= URL.createObjectURL(
                new Blob([new Uint8Array([0xEF,0xBB,0xBF]),JSON.stringify(response.data.data)],{"type":"text/plain"})
            );
            let downA = document.createElement("A");
            downA.innerHTML = "下载查询好城市的文件";
            downA.href = url;
            downA.download="area-data.js";
            document.body.appendChild(downA);
            downA.click();
        }
    } catch (e) {}
}
window.downLoadArea = loadArea;
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
