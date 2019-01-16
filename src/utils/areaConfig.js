import areaData from './areaData';
//处理地区数据
const getData = (type, code, simple = false) => {
	let array = []
	areaData.map(item => {
		let newItem = {
			code: item.id,
			text: simple ? item.name : item.extName,
			parent: item.pid
		} 
		if(item.pid == code){
			array.push(newItem);
			return
		}
		if(!code && item.type == type){
			array.push(newItem);
		}
	})
	return array
}
export default {
	//获取省份数据源
	getProvince(){
		return getData(0);
	},
	//获取市数据源
	getCity(code, simple = false){
		return getData(1, code, simple);
	},
	//获取县/区数据源
	getArea(code, simple = false){
		return getData(2, code, simple);
	},
	//根据code返回省市县数据
    getTextByCode(code, simple = false) {
        let res = [];
        let provice = code.substring(0,2)+ '0000';
        let city = code.substring(0,4) + '00';
        areaData.map(item => {
        	let extName = simple ? item.name : item.extName;
        	if(provice == item.id){
                res.push(extName);
                if(provice == city){
                	return
                }
            }
            if(city == item.id){
                res.push(extName);
                if(city == code){
                	return
                }
            }

            if (code == item.id) {
                res.push(extName);
            }
        })
        return res.join(" ");
    }
}