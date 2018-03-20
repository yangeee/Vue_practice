var app = new Vue({
	el: '#app',
	data: {
		list: [
		{
			name: "株洲Apple",
			productList: [
			{
				id: '1',
				name: 'iPhone 7',
				price: 6188,
				count: 1,
				status : 1
			},
			{
				id: '2',
				name: 'iPad Pro',
				price: 5188,
				count: 1,
				status : 1
			},
			{
				id: '3',
				name: 'MacBook Pro',
				price: 21488,
				count: 1,
				status : 1
			}
			]
		},
		{
			name: "长沙Apple",
			productList: [
			{
				id: '1',
				name: 'iPhone 7',
				price: 6188,
				count: 1,
				status : 1
			},
			{
				id: '2',
				name: 'iPad Pro',
				price: 5188,
				count: 1,
				status : 1
			},
			{
				id: '3',
				name: 'MacBook Pro',
				price: 21488,
				count: 1,
				status : 1
			}
			]
		},
		{
			name: "杭州Apple",
			productList: [
			{
				id: '1',
				name: 'iPhone 7',
				price: 6188,
				count: 1,
				status : 1
			},
			{
				id: '2',
				name: 'iPad Pro',
				price: 5188,
				count: 1,
				status : 1
			},
			{
				id: '3',
				name: 'MacBook Pro',
				price: 21488,
				count: 1,
				status : 1
			}
			]
		}
		]
	},
	computed: {
		  	//循环求和
		  	totalPrice: function() {
		  		var total = 0;
		  		for(var i = 0; i < this.list.length; i++) {
		  			for(var j = 0; j < this.list[i].productList.length; j++) {
		  				var item = this.list[i].productList[j];
		  				if(item.status) {
		  					total += item.price * item.count;
		  				}
		  			}
		  		}
		  		return total != 0 ? total.toString().replace(/\B(?=(\d{3})+$)/g,',') : 0;
		  	}
		  },
		  methods: {
		  	handleTableItem: function(tableItem) {
		  		//这里设置：小分类的全选按钮按下后，各独立按钮状态变化
		  		var status = this.isCheckedTableItem(tableItem);
		  		status = status ? 0 : 1;
		  		for(var i = 0; i < tableItem.productList.length; i++) {
		  			tableItem.productList[i].status = status;
		  		}
		  	},
		  	isCheckedTableItem: function(tableItem) {
		  		//判断小分类的全选按钮的状态
		  		var status = true;
		  		for(var i = 0; i < tableItem.productList.length; i++) {
		  			if(!tableItem.productList[i].status) {
		  				status = false;
		  				return status;
		  			}
		  		}
		  		return status;
		  	},
		  	//改变某条记录选中状态
		  	handleChecked: function(item) {
		  		item.status = !item.status;
		  	},
		  	handleReduce: function(item) {
		  		if(item.count === 1) return;
		  		item.count--;
		  	},
		  	handleAdd: function(item) {
		  		item.count++;
		  	},
		  	handleRemove: function(index, tableIndex) {
		  		this.list[tableIndex].productList.splice(index, 1);
		  	},
		    //返回某独立按钮的状态
		    isChecked: function(item) {
		    	return item.status;
		    },
		    isCheckedAll: function() {
	  			//列表全为true该status才为true，否则为false
	  			var status = true;
	  			for(var i = 0; i < this.list.length; i++) {
		  			//一旦列表的status有一个为false则status就为false
		  			for(var j = 0; j < this.list[i].productList.length; j++) {
		  				if(!this.list[i].productList[j].status) {
		  					status = false;
		  					return status;
		  				}
		  			}
		  		}
		  		return status;
		  	},
		  	checkAll: function() {
		  		
		  		var status = this.isCheckedAll();//检测是否为全选
		  		status = status ? 0 : 1;//假设不是全选，status为flase，则赋值状态为相反的true
		  		for(var i = 0; i < this.list.length; i++) {
		  			for(var j = 0; j < this.list[i].productList.length; j++) {
		  				this.list[i].productList[j].status = status;
		  			}//当点击全选按钮后，会将所有的按钮状态全部设置为true
		  		} 
		  	}
		  }
	})