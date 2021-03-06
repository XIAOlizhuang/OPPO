var app=angular.module("myApp",["ng","ngRoute"]);
//配置路由词典
app.config(function($routeProvider){
    $routeProvider.when("/myDiscuss",{templateUrl:"tpl/discuss_main.html",controller:"discussCtrl"})
    .otherwise({redirectTo:"/myDiscuss"});
});
//创建控制器
app.controller("discussCtrl",["$scope","$http","$routeParams",function($scope,$http,$routeParams){
    $scope.hasMore=true;
    $http.get("data/getbypages.php?start=0").success(
        function(data){
            console.log(data);
            $scope.blogList=data;
        }
    );
    //加载更多
    $scope.loadMore=function(){
        $http.get("data/getbypages.php?start="+$scope.blogList.length)
            .success(function(data){
                console.log(data);
                if(data.length<6){
                    //没有更多数据：将按钮隐藏掉显示一个提示
                    $scope.hasMore=false;
                }
                //将数组拼起来保存在dishLish中
                $scope.blogList=$scope.blogList.concat(data);
            });
    }
}]);
