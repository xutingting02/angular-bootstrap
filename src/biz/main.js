(function (win) {
    /*
     * 文件依赖
     */
    var config = {
        baseUrl: 'dep',           //依赖相对路径
        paths: {                    //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
            'angular': 'angular/angular',
            'angular-route': 'angular-route/angular-route',
            'jquery': 'jquery/jquery',
            'metisMenu': 'metisMenu/metisMenu',
            'bootstrap': 'bootstrap/bootstrap',
            'raphael': 'raphael/raphael',
            'morris': 'morris/morris',
            'flot': 'Flot/jquery.flot',
            'flottool': 'flot.tooltip/jquery.flot.tooltip',
            'router': '../src/biz/router'
        },
        shim: {                     //引入没有使用requirejs模块写法的类库。例如underscore这个类库，本来会有一个全局变量'_'。这里shim等于快速定义一个模块，把原来的全局变量'_'封装在局部，并导出为一个exports，变成跟普通requirejs模块一样
            'angular': {
                exports: 'angular'
            },
            'angular-route': {
                deps: ['angular'],   //依赖什么模块
                exports: 'ngRouteModule'
            },
            'jquery': {
                exports: 'jquery'
            },
            'metisMenu': {
                exports: 'metisMenu'
            },
            'bootstrap': {
                exports: 'bootstrap'
            },
            'morris': {
                exports: 'morris'
            },
            'raphael': {
                exports: 'raphael'
            },
            'flot': {
                exports: 'flot'
            },
            'flottool': {
                exports: 'flottool'
            }

        }
    };

    require.config(config);

    require(['angular', 'router', 'jquery', 'metisMenu'], function(angular, router, $){

        angular.bootstrap(document, ['webapp']);
        $('#side-menu').metisMenu();
        $(window).bind("load resize", function() {
            topOffset = 50;
            width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
            if (width < 768) {
                $('div.navbar-collapse').addClass('collapse');
                topOffset = 100; // 2-row-menu
            } else {
                $('div.navbar-collapse').removeClass('collapse');
            }

            height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                $("#page-wrapper").css("min-height", (height) + "px");
            }
        });

        var url = window.location;
        var element = $('ul.nav a').filter(function() {
            return this.href == url || url.href.indexOf(this.href) == 0;
        }).addClass('active').parent().parent().addClass('in').parent();
        if (element.is('li')) {
            element.addClass('active');
        }
    });

})(window);