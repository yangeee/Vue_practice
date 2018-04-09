Vue.component("tabs",{
	template:'\
		<div class="tabs">\
			<div class="tabs-bar">\
			 <div\
			 :class="tabCls(item)"\
			 v-for="(item,index) in navList"\
			 @click="handleChange(index)">\
			 <i class="fa fa-close"\
			 @click.stop="handleClose(index)"></i>\
			 {{item.label}}\
			 </div>\
			</div>\
			<div clas="tabs=content">\
				<slot></slot>\
			</div>\
		</div>',
	props:{
		value:{
			type:[String,Number]
		}
	},
	data:function () {
		return{
			currentValue:this.value,
			navList:[]//储存tabs的标题和子组件的名字
		}
	},
	methods:{
		tabCls:function(item){
			return[
				'tabs-tab',
				{//选中的时候动态设置类
					'tabs-tab-active':item.name===this.currentValue
				}
			]
		},
	
	getTabs(){//得到子组件
		return this.$children.filter(function(item){
			return item.$options.name==='pane';
		});
	},
	updateNav(){
		this.navList=[];
		var _this=this;

		this.getTabs().forEach(function(pane,index){
			_this.navList.push({
				label:pane.label,
				name:pane.name||index
			});
			if(!pane.name) pane.name=index;
			if(index===0){
				if(!_this.currentValue){
					_this.currentValue=pane.name||index;
				}
			}
		});
		this.updateStatus();
	},
	updateStatus(){
		var tabs=this.getTabs();
		var _this=this;
		tabs.forEach(function(tab){
			return tab.show=tab.name===_this.currentValue;//给被点击的
														 //pane设置show为1
		})
	},
	handleChange:function(index){
		var nav=this.navList[index];
		var name=nav.name;
		this.currentValue=name;
		this.$emit("input",name);
		this.$emit("on-click",name);
	},
	handleClose:function(index){
		if(index>=1){
		var nav=this.navList[index-1];
		var name=nav.name;
		if(index==this.navList.length-1){
			this.currentValue=name;
			this.$emit("input",name);
			}
		}
		else{
			this.currentValue="0";
		}
		this.navList.splice(index,1);
	}
},
watch:{
	value:function(val){
		this.currentValue=val;
	},
	currentValue:function(){//每次改变都更新一次状态
		this.updateStatus();
	}
}
})