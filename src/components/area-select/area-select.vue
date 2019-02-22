<template>
    <div class="areaSelect">
        <div class="areaBox"> 
            <i class="areaArrow" :class="{active: provinceShow}" v-if="!disabled"></i>           
            <input type="text" v-model="province" class="areaInput" :disabled="disabled" readonly="readonly" @click.stop="showSelect('provinceShow')" placeholder="--选择省--" :style="'width:' + labelWidth + 'px'"/>
            <div class="areaModal" :class="{hide: !provinceShow}" v-if="provinceList.length">
                <ul>
                    <li :value="item.code" v-for="item in provinceList" v-text="item.text" @click="selectProvince(item)" :class="{active: province == item.text}"></li>
                </ul>
            </div>
        </div>
        <div class="areaBox" v-if="level > 0"> 
            <i class="areaArrow" :class="{active: cityShow}" v-if="!disabled"></i>            
            <input type="text" v-model="city" class="areaInput" :disabled="disabled" readonly="readonly" @click.stop="showSelect('cityShow')"  placeholder="--选择市--" :style="'width:' + labelWidth + 'px'"/>
            <div class="areaModal" :class="{hide: !cityShow}">
                <ul v-if="cityList.length">
                    <li :value="item.code" v-for="item in cityList" v-text="item.text" @click="selectCity(item)" :class="{active: city == item.text}"></li>
                </ul>
                <p class="noData" v-else>无匹配市</p>
            </div>
        </div>
        <div class="areaBox" v-if="level > 1">
            <i class="areaArrow" :class="{active: areaShow}" v-if="!disabled"></i> 
            <input type="text" v-model="area" class="areaInput" :disabled="disabled" readonly="readonly" @click.stop="showSelect('areaShow')"  placeholder="--选择县/区--" :style="'width:' + labelWidth + 'px'"/>
            <div class="areaModal" :class="{hide: !areaShow}">
                <ul v-if="areaList.length">
                    <li :value="item.code" v-for="item in areaList" v-text="item.text" @click="selectArea(item)" :class="{active: area == item.text}"></li>
                </ul>
                <p class="noData" v-else>无匹配县/区</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'AreaSelect',
        props: {
            value: [String, Number],//初始化六位数字code码
            //是否禁用地区选择组件，默认不禁用
            disabled: {
                type: Boolean,
                default: false
            },
            //自定义单个选择框宽度
            labelWidth: {
                type: Number,
                default: 145
            },
            //0显示省 1显示省-市 2显示省-市-县，默认为2
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
                province: '',//省
                provinceList: this.$GqPlus.getProvince(),//省 数据列表
                provinceShow: false,//省 下拉框展开状态
                city: '',//市
                cityList: [],//市 数据列表
                cityShow: false,//市 下拉框展开状态
                area: '',//县/区 
                areaList: [],//县/区 数据列表
                areaShow: false,//县/区 下拉框展开状态
                selects: {//选择的值
                    code: '000000',
                    label: ['', '', '']
                }
            }
        },
        mounted(){
            this.init()
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
                if(province != '000000'){//渲染省份
                    this.selectProvince(this.getCode(0, province))
                }
                if(city.substring(2, 4) != '00'){//渲染市
                    this.selectCity(this.getCode(1, city, this.getCode(0, province)))
                }
                if(area.substring(4, 6) != '00'){//渲染区
                    this.selectArea(this.getCode(2, area, this.getCode(1, city, this.getCode(0, province))))
                }               
            },
            //获取code数据源
            getCode(level, code, item){
                if(level == 0){
                    return this.$GqPlus.getProvince(code)
                }
                if(level == 1){
                    return this.$GqPlus.getCity(item, code)
                }
                if(level == 2){
                    return this.$GqPlus.getArea(item, code)
                }
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
                this.cityList = this.$GqPlus.getCity(item)
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
                this.areaList = this.$GqPlus.getArea(item)
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
<style lang="less" scoped>
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
                transform: rotate(-135deg); width: 8px; height: 8px; margin-top: -6px; transition: all 0.3s; box-sizing: border-box;
                &.active{ border-color: @green; }
            }
            .areaInput{
                height: 32px; line-height: 32px; background: #fff; color: #666; border: 1px #e2e2e2 solid; transition: all 0.3s;
                padding: 0 10px; border-radius: 4px; cursor: pointer; box-shadow: none; outline: none; font-size: 12px; box-sizing: border-box;
                &:hover, &:focus{ border-color: @green; }
                &[disabled]{ cursor: not-allowed; background: #f4f4f4; border-color: #f4f4f4; color: #666; }
            }
            .areaModal{
                position: absolute; left: 0; width: 100%; max-height: 260px; overflow: auto; margin-top: 2px; z-index: 8;
                background: #fff; border: 1px #e2e2e2 solid; border-radius: 4px; min-width: 145px; box-shadow: 0 1px 6px rgba(0,0,0,.1);
                .scrollbar;
                ul{
                    li{
                        padding: 0 10px; cursor: pointer; line-height: 32px;
                        &:hover{ background: #f5f2f2; }
                        &.active{ background: @green; color: #fff; }
                    }
                }
                .noData{ margin: 0; padding: 6px 0; text-align: center; color: #999; }
            }
        }
    }
</style>
