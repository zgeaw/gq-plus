<template>
    <div>
    	<pre>1、默认参数</pre>
        <areaSelect /><br>
    	<pre>2、:level="0"</pre>
        <areaSelect :level="0"/><br>
    	<pre>3、:level="1"</pre>
        <areaSelect :level="1"/><br>
    	<pre>4、:level="2"</pre>
        <areaSelect :level="2"/><br>
    	<pre>5、value="410381"</pre>
        <areaSelect value="410381" /><br>
        <pre>6、value=['河南省', '洛阳市', '偃师市']</pre>
        <areaSelect :value="value" /><br>
    	<pre>7、value="410381 disabled"</pre>
        <areaSelect value="410381" disabled /><br>
    	<pre>8、自定义单个选择框宽度 :labelWidth="200"</pre>
        <areaSelect :labelWidth="200" /><br>
    	<pre>9、this.$GqPlus.getTextByCode('410381')</pre>
        {{label}}<br><br>
    </div>
</template>
<script>
    import { areaSelect } from 'areaGq';
    export default {
        components: { areaSelect },
        data(){
        	return {
        		label: '' ,
                value: ['河南省', '洛阳市', '偃师市']
        	}
        },
        mounted(){
        	this.label = this.$GqPlus.getTextByCode('410381')
        }
    }
</script>
