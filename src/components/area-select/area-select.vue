<template>
  <div class="areaSelect">
    <template v-if="!searchForm.show">
      <div class="areaBox">
        <i class="areaArrow"
           :class="{active: provinceShow}"
           v-if="!disabled"></i>
        <input type="text"
               v-model="province"
               class="areaInput"
               :disabled="disabled"
               readonly="readonly"
               @click.stop="showSelect('provinceShow')"
               placeholder="--选择省--"
               :style="'width:' + labelWidth + 'px'" />
        <div class="areaModal"
             :class="{hide: !provinceShow}"
             v-if="provinceList.length">
          <ul>
            <li :value="item.code"
                v-for="(item, index) in provinceList"
                :key="index"
                v-text="item.text"
                @click="selectProvince(item)"
                :class="{active: province == item.text}"></li>
          </ul>
        </div>
      </div>
      <div class="areaBox"
           v-if="level > 0">
        <i class="areaArrow"
           :class="{active: cityShow}"
           v-if="!disabled"></i>
        <input type="text"
               v-model="city"
               class="areaInput"
               :disabled="disabled"
               readonly="readonly"
               @click.stop="showSelect('cityShow')"
               placeholder="--选择市--"
               :style="'width:' + labelWidth + 'px'" />
        <div class="areaModal"
             :class="{hide: !cityShow}">
          <ul v-if="cityList.length">
            <li :value="item.code"
                v-for="(item, index) in cityList"
                :key="index"
                v-text="item.text"
                @click="selectCity(item)"
                :class="{active: city == item.text}"></li>
          </ul>
          <p class="noData"
             v-else>无匹配市</p>
        </div>
      </div>
      <div class="areaBox"
           v-if="level > 1">
        <i class="areaArrow"
           :class="{active: areaShow}"
           v-if="!disabled"></i>
        <input type="text"
               v-model="area"
               class="areaInput"
               :disabled="disabled"
               readonly="readonly"
               @click.stop="showSelect('areaShow')"
               placeholder="--选择县/区--"
               :style="'width:' + labelWidth + 'px'" />
        <div class="areaModal"
             :class="{hide: !areaShow}">
          <ul v-if="areaList.length">
            <li :value="item.code"
                v-for="(item, index) in areaList"
                :key="index"
                v-text="item.text"
                @click="selectArea(item)"
                :class="{active: area == item.text}"></li>
          </ul>
          <p class="noData"
             v-else>无匹配县/区</p>
        </div>
      </div>
    </template>
    <div class="areaBox"
         v-else>
      <i class="areaArrow"
         :class="{active: areaShow}"
         v-if="!disabled"></i>
      <input type="text"
             v-model="searchForm.keyWork"
             class="areaInput"
             placeholder="--请输入--"
             @input="inputSearchChange"
             :style="'width:' + labelWidth * (level + 1) + 'px'" />
      <div class="areaModal"
           :class="{hide: !searchForm.listShow}">
        <ul v-if="searchForm.list.length">
          <li :value="item.code"
              v-for="(item, index) in searchForm.list"
              :key="index"
              @click="searchListSelect(item.code)"
              v-html="item.text"></li>
        </ul>
        <p class="noData"
           v-else>无匹配数据</p>
      </div>
    </div>
    <div class="areaSearch"
         v-if="showSearch">
      <img @click="searchForm.show = !searchForm.show"
           src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDU3ODc3MDE4NkFEMTFFOUI4ODY5NTUxNkYwODhDQkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDU3ODc3MDI4NkFEMTFFOUI4ODY5NTUxNkYwODhDQkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NTc4NzZGRjg2QUQxMUU5Qjg4Njk1NTE2RjA4OENCRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NTc4NzcwMDg2QUQxMUU5Qjg4Njk1NTE2RjA4OENCRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt2+qPEAAAP/SURBVHja7JdbaBxVGMf/Z87M5tKwSUvaiBXBB4VSUcEHEYVWIVYLWrwgah6qVBAD5kHRFx+kiJBXQRDBFn2wpRdbJVhNKxWU+mB80KcgCEXQXtKAuTS72Z2Zc/zNbko3u4lrNpA82IH/zpzLnPP/vu//fXPWeO+1nlegdb5uEAjrO8zgc/yiC1OWYobTWOpQr1xuh3zaL2N2MOFmpkzI6Ac5nVaYnlXqJ3hJKlspMZXHpS7/ybEVeaCdlfbK2LMseJzNX6HdzeaTtDvAi6xwmPFz9O+T99GqPVDDtYPFhxW0DSlJWT/9gp9v5N0v8maGzTfI+buYs1upfRxbPlaU3KvYvAHB4moJdLLZezLhkKwZ13zxbYV2RIFJ6ub9jNUHVSzsVpgbVlv7q7LlvAK/T0FQWg2Bx5R2DSm6PC4b7ZVyY8svQbC9P6Vw7jzPh2XtgGxyhu5PW8uCtNQr496V8YGC4n6ZZGxZRdWSCN24gvgdGtPy9n3CkGlFDWiehv5+Jm6TKR5VvPmISl04YDlJX9ufcYf6nb5EI1/T062yHwBqQFMCgd2DQYmc+bY6bGpQazTtNiKYA/kNeGAjBDqzviOMFtHBLlk2rEdzDZgHMe0SYRhb5LJs/+y7kfUZiBXRWLhAsJab9z/JhlcR723yrYjQmFtw40X50tzSscfVIa/9NSXNFHBS3RznZnXHrQ7xdsulrWQB1svkZHOdiwhcsz7rc07q7Zb6NjUSEPUhsAFzpltLQ2N+5Pd5zcd36ursr+RzddOejdW4V4iA9jacgTcCdz1E1etulamS3v/RPHuWEmHiRlgYYqYfK6rjzjemUEYiq5AxKFOfshrlKYBF9wKNLoidqZCrR/Ms0HcsfgnLn1Tf1n5t6sOpeTW1xlTefQC3PALjaerIIaAGNCUQRZPk9FsK83m12f1K4tv1X+QcB1uVRh8o9FtI4tf4XkyCrDassBBFvxPf304od/kjCsd9zDhO765/t97vVDk6qdjeg/emqAHHlEXPmevwC2gqwugCtOI5xcnrmu7JqSt6Se32EGeBEXb6vPIBkkhRdVUEJ/MEbn9KNt1CexbkEetJ7mhBf688C3xYdVVqCiolg+rROflgWGnAR8k/w+KFTJbEnBRA7Qoog75A4XqZ+yhzDzL2KGMnWGcP95nWj2TGzOPeAzLxNtw3SM8pcCGLOOAEhGDl3qRwbef5APiTEDzL/XuwEyKcIbS5xQPJomsSfLiAhXK87FxKpMNykx1gHmLeUV7ISF1Zy0PpVMUTnjOjMXgi+Iy+3rU+FU8Qmqe5nwb9bJV9JW9a62P5FeQ6gCdGeX6YkIyux/8CChIkpK8gMN9YQm78N/y/E/hHgAEAyfBzDgbYgakAAAAASUVORK5CYII=">
    </div>
  </div>
</template>
<script>
export default {
    name: 'AreaSelect',
    props: {
        value: [String, Number, Array], //初始化六位数字code码或数组
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
        },
        //是否开启搜索功能
        showSearch: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        value(val) {
            this.init(val);
        }
    },
    data() {
        return {
            province: '', //省
            provinceList: this.$GqPlus.getProvince(), //省 数据列表
            provinceShow: false, //省 下拉框展开状态
            city: '', //市
            cityList: [], //市 数据列表
            cityShow: false, //市 下拉框展开状态
            area: '', //县/区
            areaList: [], //县/区 数据列表
            areaShow: false, //县/区 下拉框展开状态
            selects: {
                //选择的值
                code: '000000',
                label: ['', '', '']
            },
            //搜索参数
            searchForm: {
                show: false,
                keyWork: '',
                list: [],
                listShow: false
            },
            searchFormInt: {}
        };
    },
    mounted() {
        this.init();
        Object.assign(this.searchFormInt, this.searchForm);
    },
    methods: {
        //初始化数据
        init(val) {
            let newVal = val || this.value;
            if (!newVal || newVal == '000000') {
                this.province = '';
                this.city = '';
                this.area = '';
                return;
            }
            let province = '';
            let city = '';
            let area = '';
            let isString = typeof newVal;
            let array = '';
            if (isString == 'object') {
                if (newVal.length == 0) {
                    this.province = '';
                    this.city = '';
                    this.area = '';
                    return;
                }
                if (newVal.length > 0) {
                    province = newVal[0];
                    this.selectProvince(this.getName(0, province, {}, 'name'));
                }
                if (newVal.length > 1) {
                    city = newVal[1];
                    this.selectCity(
                        this.getName(
                            1,
                            city,
                            this.getName(0, province, {}, 'name'),
                            'name'
                        )
                    );
                }
                if (newVal.length > 2) {
                    area = newVal[2];
                    this.selectArea(
                        this.getName(
                            2,
                            area,
                            this.getName(
                                1,
                                city,
                                this.getName(0, province, {}, 'name'),
                                'name'
                            ),
                            'name'
                        )
                    );
                }
                return;
            }
            if (isString == 'number') {
                newVal = newVal.toString();
            }
            province = newVal.substring(0, 2) + '0000';
            city = newVal.substring(0, 4) + '00';
            area = newVal;
            if (province != '000000') {
                //渲染省份
                this.selectProvince(this.getCode(0, province));
            }
            if (city.substring(2, 4) != '00') {
                //渲染市
                this.selectCity(
                    this.getCode(1, city, this.getCode(0, province))
                );
            }
            if (area.substring(4, 6) != '00') {
                //渲染区
                this.selectArea(
                    this.getCode(
                        2,
                        area,
                        this.getCode(1, city, this.getCode(0, province))
                    )
                );
            }
        },
        //获取name数据源
        getName(level, name, item, type) {
            if (level == 0) {
                return this.$GqPlus.getProvince(name, type);
            }
            if (level == 1) {
                return this.$GqPlus.getCity(item, name, type);
            }
            if (level == 2) {
                return this.$GqPlus.getArea(item, name, type);
            }
        },
        //获取code数据源
        getCode(level, code, item) {
            if (level == 0) {
                return this.$GqPlus.getProvince(code);
            }
            if (level == 1) {
                return this.$GqPlus.getCity(item, code);
            }
            if (level == 2) {
                return this.$GqPlus.getArea(item, code);
            }
        },
        //显示-隐藏下拉选择框
        showSelect(key) {
            if (!this[key]) {
                this.provinceShow = false;
                this.cityShow = false;
                this.areaShow = false;
                document.addEventListener('click', () => {
                    this[key] = false;
                    document.removeEventListener('click', () => {});
                });
            }
            this[key] = !this[key];
        },
        //选择省份
        selectProvince(item) {
            if (!item) {
                return;
            }
            this.provinceShow = false;
            this.province = item.text;
            this.cityList = this.$GqPlus.getCity(item);
            this.selects.code = item.code;
            this.selects.label[0] = item.text;
            this.selects.label[1] = '';
            this.selects.label[2] = '';
            this.city = '';
            this.area = '';
            this.onChange();
        },
        //选择市
        selectCity(item) {
            if (!item) {
                return;
            }
            this.cityShow = false;
            this.city = item.text;
            this.areaList = this.$GqPlus.getArea(item);
            this.selects.code = item.code;
            this.selects.label[1] = item.text;
            this.selects.label[2] = '';
            this.area = '';
            this.onChange();
        },
        //选择区
        selectArea(item) {
            if (!item) {
                return;
            }
            this.areaShow = false;
            this.area = item.text;
            this.selects.code = item.code;
            this.selects.label[2] = item.text;
            this.onChange();
        },
        //改变地区
        onChange() {
            this.selects.label = this.selects.label.filter(item => item);
            this.$emit('on-change', this.selects);
        },
        //搜索框内容改变
        inputSearchChange() {
            if (!this.searchForm.keyWork) {
                this.searchForm.list = [];
                this.searchForm.listShow = false;
                return;
            }
            this.searchForm.list = this.$GqPlus.searchArea(
                this.searchForm.keyWork
            );
            this.searchForm.listShow = true;
        },
        //搜索列表点击事件
        searchListSelect(code) {
            Object.assign(this.searchForm, this.searchFormInt);
            this.init(code);
        }
    }
};
</script>
<style>
.hotSearchKey { color: #ed4014; }
</style>
<style lang="less" scoped>
@green: #006953;
//滚动条样式
.scrollbar(@width: 8px) {
  &::-webkit-scrollbar {
    width: @width;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #c7c5c8;
  }
  &::-webkit-scrollbar-track {
    border-radius: 0;
    background: #ddd;
  }
}
.areaSelect {
  display: flex;
  font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei",
    FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB",
    "Hiragino Sans GB W3", FontAwesome, sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: #333;
  .hide {
    display: none;
  }
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .areaBox {
    position: relative;
    margin-right: 5px;
    .areaArrow {
      position: absolute;
      top: 50%;
      right: 8px;
      border: 2px #e2e2e2 solid;
      border-right: 0;
      border-bottom: 0;
      transform: rotate(-135deg);
      width: 8px;
      height: 8px;
      margin-top: -6px;
      transition: all 0.3s;
      box-sizing: border-box;
      &.active {
        border-color: @green;
      }
    }
    .areaInput {
      height: 32px;
      line-height: 32px;
      background: #fff;
      color: #666;
      border: 1px #e2e2e2 solid;
      transition: all 0.3s;
      padding: 0 10px;
      border-radius: 4px;
      cursor: pointer;
      box-shadow: none;
      outline: none;
      font-size: 12px;
      box-sizing: border-box;
      &:hover,
      &:focus {
        border-color: @green;
      }
      &[disabled] {
        cursor: not-allowed;
        background: #f4f4f4;
        border-color: #f4f4f4;
        color: #666;
      }
    }
    .areaModal {
      position: absolute;
      left: 0;
      width: 100%;
      max-height: 260px;
      overflow: auto;
      margin-top: 2px;
      z-index: 8;
      background: #fff;
      border: 1px #e2e2e2 solid;
      border-radius: 4px;
      min-width: 145px;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
      .scrollbar;
      ul {
        li {
          padding: 0 10px;
          cursor: pointer;
          line-height: 32px;
          &:hover {
            background: #f5f2f2;
          }
          &.active {
            background: @green;
            color: #fff;
          }
        }
      }
      .noData {
        margin: 0;
        padding: 6px 0;
        text-align: center;
        color: #999;
      }
    }
  }
  .areaSearch {
    img {
      cursor: pointer;
    }
  }
}
</style>
