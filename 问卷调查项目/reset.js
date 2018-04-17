Vue.component("reset",{
	name:"reset",
	template:'\
	<div class="resetButton" @click="resetButton">\
	<slot></slot>\
	</div>',
	props:{
		value:{
			type:Number
		},
		reset_flag:{
			type:Number
		}
	},
	data:function(){
		return{
			re:this.reset_flag
		}
	},
	methods:{
		resetButton:function(){
			this.re+=1;
		}
	},
	watch:{
		re:function(){
			this.$emit('res',this.re);
		}
	}
})