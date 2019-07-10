require.config({
    // baseUrl: "plugin/js",
    paths: {
        "jquery": "plugin/js/jquery-1.12.4.min",
        "IndexTab": "public/js/index-tab",
        "indexMenu": "public/js/index-menu"
    }
})

var data = eval(menulist);
let rootMenus = {}, firstMenus = {}, secondMenus = {}, thirdMenus = {};

require(['jquery', 'IndexTab', 'indexMenu'], function ($, IndexTab, indexMenu) {
    // $('#menuul').load('public/html/menuVertical.html');
    //菜单栏初始化
    indexMenu.fnFormaterMenu(data, rootMenus, firstMenus, secondMenus, thirdMenus);
    indexMenu.fnSetRootLevelMenu(rootMenus);

    $(window).resize(function () {
        IndexTab.resetTab();
        $(".tab-list").hide();
    });

    $(document).ready(function() {
        // 菜单收缩
        $(".menu-drawer").click(function(e) {
            indexMenu.fnMenuDrawer();
        });
        // 菜单点击绑定事件
        $(".menu-ul").off().on('click','li.menu-first-li',function(event) {
            indexMenu.fnMenuClick(this);
            event.stopPropagation();
            return;
        });
        // 工作台点击
        $(".tab-ul li.work-table").click(function() {
            fnOpenWorkTable();
        });
        // tab下拉点击
        $(".tab-list-setting").click(function() {
            IndexTab.showTabList(this);
        });
        // 关闭所有点击
        $(".close-all-tab").click(function() {
            IndexTab.closeAllTab();
        });
        $(".to-work-table").click(function() {
            fnOpenWorkTable();
        });

        //鼠标移入
        $(document).bind('mousedown', function(e){
            $(".tab-list").fadeOut();
            $('.top-list').fadeOut();
        });
        $(".tab-list").hover(function() {}, function(){
            $(this).hide();
        });

        $('.top-menu-more').click(function () {
            $('.top-list').show();
        })
        $('.top-list').hover(function() {}, function(){
            $(this).hide();
        });
        $('.nav-mini.left-nav .menu-first-li').hover(function () {},function () {
            $('.nav-mini.left-nav  .menu-second-li').removeClass("menu-folder-open");
            $('.nav-mini.left-nav  .menu-second-li').children("ul").slideUp();
            $($('.nav-mini.left-nav .menu-second-li').find("a i")[1]).removeClass("fa-angle-up").addClass("fa-angle-down");
        });

        //根菜单
        $('.top-menu-ul > li.menu-root-li').off().click(function (event) {
            $(this).addClass('active').siblings().removeClass('active');
            var pid =$(this).data("pid");
            indexMenu.fnRootMenuClick(pid);
            event.stopPropagation();
            return false;
        })
    });

    /**
     * 打开工作台
     */
    function fnOpenWorkTable() {
        IndexTab.activeTab("workTable");
    }






});
