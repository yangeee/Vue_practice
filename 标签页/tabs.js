Vue.component("tabs",{
	template:'\
		<div class="tabs">\
			<div class="tabs-bar">\
			 <div\
			 v-show="ok"\
			 :class="tabCls(item)"\
			 v-for="(item,index) in navList"\
			 :key="index"\
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
			ok:true,
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
				name:pane.name||index,
				ok:true
			});
			if(!pane.name) pane.name=index;//如果没有自定义名字，就设置为序号
			if(index===0){//当序号为0时
				if(!_this.currentValue){//如果此时显示为空，就设置下
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
		if(this.navList.length>1&&index==this.navList.length-1){//判断大于1个标签才显示前一个标签，并关闭选择的标签
		var nav=this.navList[index-1];//等于他上一个
		var name=nav.name;//获得Name值来控制显示
		this.currentValue=name;//这里主要是为了获得删除后一个自动
		this.$emit("input",name);//显示前一个的效果	
		}
		else{//当已经是最后一个标签时，直接默认为0
			if(this.navList.length==1)
			{
				this.currentValue="0";
				this.navList.splice(index,1);
				return;
			}
			this.currentValue=this.navList[index+1].name;
		}
		this.navList.splice(index,1);//删除数组
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