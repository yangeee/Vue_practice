Vue.component("tab",{
	template:'\
	<div class="tab" v-show="show" >\
		<slot></slot>\
	</div>',
	props:{
		value:{
			type:Number
	 	}
	},
	data:function(){
		return{
			show:false,
			currentValue:this.value
		}
	},
	methods:{

	},
	watch:{
		
	},
	mounted(){
		this.$parent.updateNav();
	}

})