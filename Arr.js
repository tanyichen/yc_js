// console.log(urlEncode(arr||obj).slice(1))//调用
var Arr = {
	// 获取元素或对象在数组中的索引位置
	getIndex(arr, obj) {
    let index = null;
    let key = Object.keys(obj)[0];
    arr.every(function(value, i) {
        if (value[key] === obj[key]) {
            index = i;
            return false;
        }
        return true;
    });
    return index;
	},
	// 从数组中删除元素或对象
	del(oldArr,obj){
		Array.prototype.baoremove = function(dx) { 
			  if(isNaN(dx)||dx>this.length){return false;} 
			  this.splice(dx,1); 
		}
		var idx =Arr.getIndex(oldArr,obj);
		if(idx>=0){
			oldArr.baoremove(idx,1);	
		}else{
			
		}
		return oldArr;
	},  // filed =排序的key字段，是否正序isTrue，primer进行函数处理
              //  darr.sort(sortBy('ranking',false));
     sortBy(filed,isTrue,primer){
            var primer=primer|| parseFloat;
              var rev = (isTrue) ? -1 : 1;
              return function (a, b) {
                a = a[filed];
                b = b[filed];
                a = primer(a);
                b = primer(b);
                if (a < b) { return rev * -1; }
                if (a > b) { return rev * 1; }
                return 1;
              }
    }
}
var Obj={
	update(oldobj,newobj){
		for(var o in oldobj){
			if(newobj[o]){
				oldobj[o]= newobj[o];
			}
		}
		return oldobj;
	}
}
function isArrayFn(value){
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    }else{
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}
	/**
	 * 将数据格式化成树形结构返回数组 注意id===数组索引
	 * 要点 如果存在父pid 就把自己id作为父组的主键
	 * @author yichen
	 * @param object 
	 * @return Arr
	 */
	function getTree(Objdata) {
       var Objdata=Objdata || {};
       var obj= {};
       Object.assign(obj,Objdata);
       var data=[];
        for(let i in obj){
            if(obj[i].pid){
                obj[obj[i].pid]=obj[obj[i].pid]|| {};
                obj[obj[i].pid]['children']=obj[obj[i].pid]['children']||[];
                obj[obj[i].pid]['children'].push(obj[i]);
            }else{
                data.push(obj[i]);
            }
        }
        return data;
	}
    // 树结构无限分级排序 ArrTree=[{'sort':'1',children:[{'sort':'1',children:[]}],'sort:'2'}]
  // children='string',isTrue=bool是否正序
  //使用方法 sortBy2(ArrTree,'sort','children',false)
  function getTreeSortBy(ArrTree,filed,children,isTrue){
     var ArrTree=ArrTree||[];
    ArrTree= ArrTree.concat();
     var isTrue=isTrue || false;
     var children=children|| 'children';
       for(let i=0;i<ArrTree.length;i++){
          if(ArrTree[i][children] && typeof ArrTree[i][children]=='object'){
            ArrTree[i][children]= getTreeSortBy(ArrTree[i][children],filed,children,isTrue);   
          }
      }
     return ArrTree.sort(Arr.sortBy(filed,isTrue));
  }
                 
  var objUpdate=Obj.update;//修改对象
  var arrDel=Arr.del;//删除数组
  var sortBy=Arr.sortBy;//数组排序
  var arrGetIndex=Arr.getIndex;//获取数组中的索引
//   var isArrayFn=isArrayFn;
//   var getTree=getTree;
  export {
      objUpdate,
      arrDel,
      arrGetIndex,
      sortBy,
      isArrayFn,
      getTree,//对obj进行树结构无限分级；返回数组
      getTreeSortBy,//对分级后的树结构数组进行排序
  }