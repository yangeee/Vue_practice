var example1 = new Vue({
  el: '#app',
  data:{
      checked:[],
      totalPrice:[],    
      list:[ 
      {
        id:1,
        name:"iphoneX",
        price:7877,
        count:0,
      },
      {
        id:2,
        name:"ipad Pro",
        price:6345,
        count:0,
      },
      {
        id:3,
        name:"MacBook Pro",
        price:21388,
        count:0,
      }
    ]
  },
  computed: {
    //计算总价
      totalMoney:function(){
                let sum = 0;
                
                for(let i=0;i<this.list.length;i++)
                {

                    sum += this.list[i].count*this.list[i].price;
                }
              
                return sum.toString().replace(/\B(?=(\d{3})+$)/g,",");
            },
      checkAll: {

                get: function() {
                    return this.checkedCount == this.list.length;
                },
                set: function(value){
                    var _this = this;
                    if (value) {   
                        this.checked = this.list.map(function(item) {
                            item.checked = true;
                            return item.id;
                        })
                    }else{
                        this.checked = [];
                        this.list.forEach(function(item,index){
                            item.checked = false;
                        });
                    }
                }
            },
            //返回选中的项数
            checkedCount: {
                get: function() {
                    return this.checked.length;
                }
            }
        },
  methods:{
    handleReduce:function(index){

      this.list[index].count--;
    },
    handleAdd:function(index){

      this.list[index].count++;
    },
    handleRemove:function(index){
      this.list.splice(index,1);
    },
    currClick:function(item,index){
 
        var _this = this;
        //判断是否选中，没被选择则设置为选中状态
        if(typeof item.checked == 'false'){
 
          this.$set(item,'checked',true);
        
        }
        //如果已经是选中状态
        else{
          item.checked = !item.checked;
          item.count=0;
      }

 
    }
}
  

});
