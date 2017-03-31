//app入口文件
var app = angular.module('app',[]);

//指定controller
app.controller('myController',['$scope','$http',function($scope,$http){
	$scope.data=['香蕉','苹果','草莓','橘子','荔枝','地瓜','番薯'];
	$scope.datab=['香蕉1','苹果1','草莓1','橘子1','荔枝1','地瓜1','番薯1'];
	//定义一个对象来存放选择框的数据
	$scope.selectData={
		selectOne : '',
		selectTwo : ''
	}
	//指定查询按钮的样式
	$scope.chlickBtn = {
		classStyle:'chlick-button',
		btnName:'查询',
		info:{
			id:'001',
			name:'abc'
		},
		funcMethod:function(obj){
			$scope.funcRest(obj)
		}
	};
	$scope.funcRest=function(obj){
		
		console.log('查询/重置方法函数被调用啦！id='+obj.id)
	}
	
	$scope.chlickBtnB = {
		classStyle:'chlick-button',
		btnName:'重置',
		info:{
			id:'002',
			name:'cbd'
		},
		funcMethod:function(obj){
			//测试指令调用时候是否可以调用到controller层方法，yes
			$scope.funcRest(obj)
		}
	};
	
	//tabale数据层
	$scope.tableSet={
		tableHeads:['姓名', '班级' ,'户籍'],
		tableKeys:['name','class','home'],
		getinfo:''
	};
	$http({
		url:'table.json',
		method:"GET"
	}).then(function(res){
		$scope.tableSet.getinfo = res.data;
	});
	
	//menutab 数据层
	$scope.menuSet={
		menuTabData:[
			{
				oneLevel:'重庆',
				twoLevel:['九龙坡','巴南区','大渡口','南岸区']
			},
			{
				oneLevel:'四川',
				twoLevel:['成都','乐山','大竹','泸州']
			}
		],
		
		showSecond:function(){
			return true;
		}
	};
}]);
//指令命令select
app.directive('selectoption',['$http',function($http){
	return{
		restrict:'E',
		replace:true,
		templateUrl:'select.html',
		scope:{
			fruits:"=datab"
		},
		link: function(scope, ele, attr) {
			//默认关闭选择下拉框
			scope.isShowbox = false ; 
			scope.selectedName = '请稍等';
			scope.selectfruit = function(){
				if(scope.isShowbox === false ){
					scope.isShowbox = true
				}else{
					scope.isShowbox = false
				}
			};
			scope.chooseIterm = function(iterm){
				scope.selectedName = iterm
				scope.isShowbox = false ; 
			};
		}
	}
}]);

//指令命令，按钮功能实现
app.directive('buttonQuery',[function(){
	return{
		restrict:'E',
		replace:true,
		template:'<button ng-click='+'buttonClick(btnSet.info)'+' class={{btnSet.classStyle}}>{{btnSet.btnName}}</button>',
		scope:{
			btnSet:'=data'
		},
		link:function(scope,ele,attr){
			scope.buttonClick = scope.btnSet.funcMethod
		}
	}
}]);

//指令命令，表格功能实现
app.directive('tableGrid',['$http',function($http){
	return{
		restrict:'E',
		replace:true,
		templateUrl:'table.html',
		scope:{
			data:'=data'
		},
		link:function(scope,ele,attr){
			
		}
	}
}]);

//指令命令，二级菜单展开实现
app.directive('menuTab',['$http',function($http){
	return{
		restrict:'E',
		replace:true,
		templateUrl:'menu.html',
		scope:{
			data:'=data'
		},
		link:function(scope,ele,attr){
			scope.isSecondCityShow = false;
			scope.showSecond = function(abc){
				console.log(scope.isSecondCityShow[abc])
				scope.isSecondCityShow[abc]=false
				console.log(abc)
				if(scope.isSecondCityShow == false ){
					scope.isSecondCityShow = true;
				}else{
					scope.isSecondCityShow = false;
				}
				
			};
		}
	}
}]);