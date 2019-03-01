import areaData from './areaData';
//处理地区数据
const getData = (array, code, type) => {
	let newArray = []
	let obj = {}
	array.map(item => {
		let newItem = {
			code: item.adcode,
			text: item.name,
			districts: item.districts
		} 
		newArray.push(newItem);
		if(type == 'name'){			
			if(code && code == item.name){
				obj = newItem
			}
			return
		}
		if(code && code == item.adcode){
			obj = newItem
		}
	})
	if(code){
		return obj
	}
	return newArray
}
export default {
	//获取省份数据源
	getProvince(code, type){
		return getData(areaData, code, type);
	},
	//获取市数据源
	getCity(item, code, type){
		return getData(item.districts, code, type);
	},
	//获取县/区数据源
	getArea(item, code, type){
		return getData(item.districts, code, type);
	},
	//根据code返回省市县数据
	getTextByCode(code, simple = false) {
		let res = [];
		let province = code.substring(0, 2) + '0000'
		let city = code.substring(0, 4) + '00'
		let provinceObj = this.getProvince(province)
		res.push(provinceObj.text)
		if(code.substring(3,6) == '000'){
			return res.join("-");
		}
		let cityObj = this.getCity(provinceObj, city)	
		res.push(cityObj.text)		
		if(code.substring(4,6) == '00'){
			return res.join("-");
		}
		let areaObj = this.getArea(cityObj, code)	
		res.push(areaObj.text)
		return res.join("-");
	}
}