define(['angular', 'require', 'angular-route'], function (angular, require) {

    var app = angular.module('webapp', [
        'ngRoute'
    ]);


    app.config(['$routeProvider', '$controllerProvider',
        function($routeProvider, $controllerProvider) {
            $routeProvider.
                when('/dashboard', {
                    templateUrl: 'src/biz/dashboard/dashboard.html',
                    controller: 'dashboardController',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['src/biz/dashboard/dashboard.js'], function (controller) {
                                $controllerProvider.register('dashboardController', controller);      //由于是动态加载的controller，所以要先注册，再使用
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/flotchart', {
                    templateUrl: 'src/biz/flotchart/flotchart.html',
                    controller: 'flotchartController',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['src/biz/flotchart/flotchart.js'], function (controller) {
                                $controllerProvider.register('flotchartController', controller);      //由于是动态加载的controller，所以要先注册，再使用
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/morrischart', {
                    templateUrl: 'src/biz/morrischart/morrischart.html',
                    controller: 'morrischartController',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['src/biz/morrischart/morrischart.js'], function (controller) {
                                $controllerProvider.register('morrischartController', controller);      //由于是动态加载的controller，所以要先注册，再使用
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/table', {
                    templateUrl: 'src/biz/table/table.html',
                    controller: 'tableController',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['src/biz/table/table.js'], function (controller) {
                                $controllerProvider.register('tableController', controller);      //由于是动态加载的controller，所以要先注册，再使用
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/form', {
                    templateUrl: 'src/biz/form/form.html',
                    controller: 'formController',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['src/biz/form/form.js'], function (controller) {
                                $controllerProvider.register('formController', controller);      //由于是动态加载的controller，所以要先注册，再使用
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/form', {
                    templateUrl: 'src/biz/form/form.html',
                    controller: 'formController',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['src/biz/form/form.js'], function (controller) {
                                $controllerProvider.register('formController', controller);      //由于是动态加载的controller，所以要先注册，再使用
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                
                otherwise({
                    redirectTo: '/dashboard'      //angular就喜欢斜杠开头
                });
        }]);

    return app;
});