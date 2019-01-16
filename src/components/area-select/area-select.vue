<template>
    <div class="areaSelect">
        <div class="areaBox"> 
            <i class="areaArrow" :class="{active: provinceShow}"></i>           
            <input type="text" v-model="province" class="areaInput" :disabled="disabled" readonly="readonly" @click.stop="showSelect('provinceShow')" placeholder="--选择省--" :style="'width:' + labelWidth + 'px'"/>
            <div class="areaModal" :class="{hide: !provinceShow}" v-if="provinceList.length">
                <ul>
                    <li :value="item.code" v-for="item in provinceList" v-text="item.text" @click="selectProvince(item)" :class="{active: province == item.text}"></li>
                </ul>
            </div>
        </div>
        <div class="areaBox" v-if="level > 0"> 
            <i class="areaArrow" :class="{active: cityShow}"></i>            
            <input type="text" v-model="city" class="areaInput" :disabled="disabled" readonly="readonly" @click.stop="showSelect('cityShow')"  placeholder="--选择市--" :style="'width:' + labelWidth + 'px'"/>
            <div class="areaModal" :class="{hide: !cityShow}" v-if="cityList.length">
                <ul>
                    <li :value="item.code" v-for="item in cityList" v-text="item.text" @click="selectCity(item)" :class="{active: city == item.text}"></li>
                </ul>
            </div>
        </div>
        <div class="areaBox" v-if="level > 1">
            <i class="areaArrow" :class="{active: areaShow}"></i> 
            <input type="text" v-model="area" class="areaInput" :disabled="disabled" readonly="readonly" @click.stop="showSelect('areaShow')"  placeholder="--选择县/区--" :style="'width:' + labelWidth + 'px'"/>
            <div class="areaModal" :class="{hide: !areaShow}" v-if="areaList.length">
                <ul>
                    <li :value="item.code" v-for="item in areaList" v-text="item.text" @click="selectArea(item)" :class="{active: area == item.text}"></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'AreaSelect',
        props: {
            value: [String, Number],
            disabled: {
                type: Boolean,
                default: false
            },
            labelWidth: {
                type: Number,
                default: 145
            },
            level: {
                type: Number,
                default: 2
            }
        },
        watch: {
            value(val){
                this.init()
            }
        },
        data() {
            return {
                province: '',
                provinceList: this.$Area.getProvince(),
                provinceShow: false,
                city: '',
                cityList: [],
                cityShow: false,
                area: '',
                areaList: [],
                areaShow: false,
                selects: {
                    code: '000000',
                    label: ['', '', '']
                }
            }
        },
        mounted () {
            /*this.$Area.getTextByCode("110000")
            this.$Area.getTextByCode("110100")
            this.$Area.getTextByCode("110101")*/
        },
        methods: {
            //初始化数据
            init(){
                if(!this.value){
                    return
                }
                let province = this.value.substring(0, 2) + '0000'
                let city = this.value.substring(0, 4) + '00'
                let area = this.value
                if(province != '000000'){
                    this.selectProvince(this.getCode(province))
                }
                if(city.substring(2, 4) != '00'){

                    this.selectCity(this.getCode(city))
                }
                if(area.substring(4, 6) != '00'){
                    this.selectArea(this.getCode(area))
                }               
            },
            //获取code数据源
            getCode(code){
                let list = areaSelector.data.filter(item => item.code == code)
                if(list.length > 0){
                    return list[0]
                }
                return ''
            },
            //显示-隐藏下拉选择框
            showSelect(key){
                if(!this[key]){
                    this.provinceShow = false
                    this.cityShow = false
                    this.areaShow = false
                    document.addEventListener("click", () => {
                        this[key] = false
                        document.removeEventListener("click", ()=>{})
                    })
                }
                this[key] = !this[key]
            },
            //选择省份
            selectProvince(item){
                if(!item){
                    return
                }
                this.provinceShow = false
                this.province = item.text
                this.cityList = this.$Area.getCity(item.code)
                this.selects.code = item.code
                this.selects.label[0] = item.text
                this.selects.label[1] = ''
                this.selects.label[2] = ''
                this.city = ''
                this.area = ''
                this.$emit('on-change', this.selects)
            },
            //选择市
            selectCity(item){
                if(!item){
                    return
                }
                this.cityShow = false
                this.city = item.text
                this.areaList = this.$Area.getArea(item.code)
                this.selects.code = item.code
                this.selects.label[1] = item.text
                this.selects.label[2] = ''
                this.area = ''
                this.$emit('on-change', this.selects)
            },
            //选择区
            selectArea(item){
                if(!item){
                    return
                }
                this.areaShow = false
                this.area = item.text
                this.selects.code = item.code
                this.selects.label[2] = item.text
                this.$emit('on-change', this.selects)
            }
        }
    };
</script>
<style lang="less">
    @green: #006953;
    //滚动条样式
    .scrollbar(@width: 8px){
        &::-webkit-scrollbar {  width: @width;  height: 8px;  }
        &::-webkit-scrollbar-thumb {  border-radius: 5px;  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);  background: #c7c5c8;  }
        &::-webkit-scrollbar-track {  border-radius: 0;  background: #ddd; }
    }
    .areaSelect{
        display: flex; font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", FontAwesome, sans-serif;
        font-size: 12px; line-height: 1.5; color: #333;
        .hide{ display: none; }
        ul,li{ margin: 0; padding: 0; list-style: none; }
        .areaBox{
            position: relative; margin-right: 5px;
            .areaArrow{
                position: absolute; top: 50%; right: 8px; border: 2px #e2e2e2 solid; border-right: 0; border-bottom: 0;
                transform: rotate(-135deg); width: 10px; height: 10px; margin-top: -10px; transition: all 0.3s;
                &.active{ border-color: @green; }
            }
            .areaInput{
                height: 32px; line-height: 32px; background: #fff; color: #666; border: 1px #e2e2e2 solid; transition: all 0.3s;
                padding: 0 10px; border-radius: 4px; cursor: pointer; box-shadow: none; outline: none; font-size: 12px;
                &:hover, &:focus{ border-color: @green; }
            }
            .areaModal{
                position: absolute; left: 0; width: 100%; max-height: 260px; overflow: auto; margin-top: 2px;
                background: #fff; border: 1px #e2e2e2 solid; border-radius: 4px; min-width: 145px;
                .scrollbar;
                ul{
                    li{
                        padding: 0 10px; cursor: pointer; line-height: 32px;
                        &:hover{ background: #f5f2f2; }
                        &.active{ background: @green; color: #fff; }
                    }
                }
            }
        }
    }
</style>
