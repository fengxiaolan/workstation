var data = eval(menulist);
var rootMenus = {}, firstMenus = {}, secondMenus = {}, thirdMenus = {};
fnFormaterMenu(data, rootMenus, firstMenus, secondMenus, thirdMenus);
fnSetRootLevelMenu(rootMenus);

$(window).resize(function () {
    IndexTab.resetTab();
    $(".tab-list").hide();
});

$(document).ready(function() {
    // 菜单收缩
    $(".menu-drawer").click(function(e) {
        fnMenuDrawer();
    });
    // 菜单点击绑定事件
    $(".menu-ul").off().on('click','li.menu-first-li',function(event) {
        fnMenuClick(this);
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
        fnRootMenuClick(pid);
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


function resetMenu() {
    var tabContainerWidth = $("ul.top-menu-ul").width() - $(".top-menu").outerWidth() - $(".top-more").outerWidth()- $(".toolBar").outerWidth();
    // tabs实际宽度
    var tabsRealWidth = 0;
    $("ul.top-menu-ul").children("li.menu-root-li").each(function(i, o) {
        tabsRealWidth += $(o).outerWidth();
        $(o).show();
    });
    // 实际宽度 > tab容器宽度
    if (tabsRealWidth > tabContainerWidth) {
        // tabs最小宽度
        var tabsMinWidth = 0;
        $("ul.top-menu-ul").children("li.menu-root-li").each(function(i, o) {
            tabsMinWidth += $(o).outerWidth();
        });
        // 最小宽度 > tab容器宽度  需要做隐藏处理
        if (tabsMinWidth > tabContainerWidth) {
            $("ul.top-menu-ul").children("li.menu-root-li").each(function(i, o) {
                $(o).hide();
                tabsMinWidth -= $(o).outerWidth();
                if (tabsMinWidth <= tabContainerWidth) {
                    return false;
                }
            });
        }
    }
    if ($(".top-more").is(":hidden")) {
        activeTab($("li.tab-active").attr("id").replace("tab_", ""))
    }
    if ($("ul.tab-ul li.tab-title").length > 0) {
        if ($("i.tab-list-setting").is(":hidden"))
            $("i.tab-list-setting").show();
    } else {
        if ($("i.tab-list-setting").is(":visible"))
            $("i.tab-list-setting").hide();
    }
}
