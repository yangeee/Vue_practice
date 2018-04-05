function isValueNumber(value){
	return (/(^-[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value+"");
}

Vue.component('input-number',{
	template:'\
	<div class="input-number">\
	<input\
		type="text"\
		:value="currentValue"\
		@change="handleChange"\
		@keyup.up="show_up"\
		@keyup.down="show_down">\
		<button\
			@click="handleDown"\
			:disabled="currentValue<=min">-</button>\
		<button\
			@click="handleUp"\
			:disabled="currentValue>=max">+</button>\
	</div>',
	//父组件传下的数据
	props:{
		max:{
			type:Number,
			default:Infinity
		},
		min:{
			type:Number,
			default:-Infinity
		},
		value:{
			type:Number,
			default:0
		}
	},
	data:function(){
		return{
			currentValue:this.value//获取初始的value的值，便于操作
		}							//之后还是靠updateValue(val)获取
	},
	watch:{//这里只是一个监听传递的作用，改变还是靠handleChange()
		currentValue:function(val){
			this.$emit("input",val);//当currentValue改变时，改变输入框的value
			this.$emit("on-change",val);
		},
		value:function(val){
			this.updateValue(val);//过滤从父组件传过来的数据
		}
	},
	methods:{
		//简单的加减函数
		handleUp:function(){
			if(this.currentValue>=this.max) return;
			this.currentValue+=1;
		},
		handleDown:function(){
			if (this.currentValue<=this.min) return;
			this.currentValue-=1;
		},
		updateValue:function(val){
			if(val>this.max) val=this.max;//进行过滤，如果超过了限定值，则应用最大值
			if(val<this.min) val=this.min;
			this.currentValue=val;
		},
		handleChange:function(event){
			var val=event.target.value.trim();//trim去掉2端的空白字符
			var max=this.max;
			var min=this.min;
			if(isValueNumber(val)){//判断是否是数字
				val=Number(val);//把对象转换成数字
				this.currentValue=val;
				if(val>max)
					this.currentValue=max;//如果超出规定的最大值，则设置为规定的最大值
				else if (val<min) {
					this.currentValue=min;
				}
				else{
					event.target.value=this.currentValue;//在中间的则把输入框的值设置为
				}										//此值
			}
		},
		show_up:function(){
			this.currentValue+=1;
		},
		show_down:function(){
			this.currentValue-=1;
		}
	},
	mounted:function(){
		this.updateValue(this.value);
	}
});