import areaData from './areaData';
//处理地区数据
const getData = (array = areaData, code) => {
	let newArray = []
	let obj = {}
	array.map(item => {
		let newItem = {
			code: item.adcode,
			text: item.name,
			districts: item.districts
		} 
		newArray.push(newItem);
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
	getProvince(code){
		return getData(areaData, code);
	},
	//获取市数据源
	getCity(item, code){
		return getData(item.districts, code);
	},
	//获取县/区数据源
	getArea(item, code){
		return getData(item.districts, code);
	},
	//根据code返回省市县数据
	getTextByCode(code, simple = false) {
		let res = [];
        let province = code.substring(0, 2) + '0000'
        let city = code.substring(0, 4) + '00'
        let provinceObj = this.getProvince(province)
        let cityObj = this.getCity(provinceObj, city)
        let areaObj = this.getArea(cityObj, code)
        res.push(provinceObj.text)
        res.push(cityObj.text)
        res.push(areaObj.text)
		return res.join("-");
	}
}