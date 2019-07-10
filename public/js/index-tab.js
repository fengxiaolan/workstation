define(['jquery'], function ($) {
    function initTab() {

    }
    // 添加tab
    function addTab(id, title, url) {
        if (getTab(id)) {
            return activeTab(id);
        }
        var tabHtml = '';
        tabHtml += '<li class="tab-title">';
        tabHtml += '<span>' + title + '</span>';
        tabHtml += '<i class="tab-close">×</i>';
        tabHtml += '</li>';
        var $tabHtml = $(tabHtml).attr("id", "tab_" + id).attr("title", title);
        $(".tab-list-setting").before($tabHtml);

        // 添加iframe
        // var tabContentHtml = '';
        // tabContentHtml += '<div class="tab-item">';
        // tabContentHtml += '</div>';
        // var $tabContentHtml = $(tabContentHtml);
        var $iframe = $('<iframe frameborder="0" scrolling="yes" class="tab-iframe"></iframe>');
        $iframe.attr("id", "iframe_" +id).attr("name", "iframe_" +id);
        if (url) {
            if (url.indexOf("?") > 0) {
                $iframe.attr("src", url+"&___businessId="+id);
            } else {
                $iframe.attr("src", url+"?___businessId="+id);
            }
        }
        // $tabContentHtml.append($iframe);
        $(".tab-content").append($iframe);

        // 添加监听
        $tabHtml.bind("click", function () {
            activeTab(id);
        });
        $tabHtml.children("i.tab-close").bind("click", function () {
            closeTab(id);
        });
        // 加入下拉
        addToTabList(id, title);
        // 重新排版
        resetTab();
        // 激活tab
        activeTab(id);

    }
    // 激活tab
    function activeTab(id) {
        var $tab = $(getTab(id));
        if (!$tab[0]) return;

        // 隐藏tab显示，并隐藏后面一个
        if ($tab.is(":hidden")) {
            $tab.show();
            $tab.siblings(".tab-title").each(function(i, o) {
                if ($(o).is(":visible")) {
                    $(o).hide();
                    return false;
                }
            });
        }

        if ($tab.hasClass("tab-active")) return;
        if ($tab.hasClass("work-table")) {
            $('.work-table').addClass('tab-active');
            $tab.siblings().removeClass("tab-active");
        } else {
            $tab.addClass("tab-active").siblings().removeClass("tab-active");
        }
        window["ACT_TAB"] = id;
        // 激活iframe
        $(getIframe(id)).addClass("iframe-show").siblings().removeClass("iframe-show");

    }
    // 关闭tab
    function closeTab(id) {
        var $tab = $(getTab(id));
        if (!$tab[0]) return;

        var newActiveId;
        if ($tab.hasClass("tab-active")) {
            newActiveId = ($tab.next("li.tab-title")[0] || $tab.prev("li.tab-title")[0] || $("li.work-table")[0]).id;
        } else {
            newActiveId = ($("li.tab-active")[0] || $("li.work-table")[0]).id;
        }
        $("#tab_" + id).remove();
        $("#iframe_" + id).remove();
        // 从下拉中移出
        removeFromTabList(id);

        resetTab();
        if (!newActiveId) {
            // 打开工作台
            $("li.work-table").click();
            return;
        }
        newActiveId = newActiveId.replace("tab_", "");
        activeTab(newActiveId);
    }
    // 关闭所有tab
    function closeAllTab() {
        $("ul.tab-ul").children("li.tab-title").each(function() {
            var id = $(this).attr("id").replace("tab_", "");
            $("#tab_" + id).remove();
            $("#iframe_" + id).remove();
            removeFromTabList(id);
        });
        resetTab();
        // 打开工作台
        $('.work-table').addClass('tab-active');
        $("li.work-table").click();
    }
    // tab重新排版
    function resetTab() {
        // tab容器宽度 = tab-ul - work-table - tab-list-setting
        var tabContainerWidth = $("ul.tab-ul").width() - $("li.work-table").outerWidth() - $("i.tab-list-setting").outerWidth()-10;
        // tabs实际宽度
        var tabsRealWidth = 0;
        $("ul.tab-ul li.tab-title span").removeClass("tab-min-width");
        $("ul.tab-ul").children("li.tab-title").each(function(i, o) {
            tabsRealWidth += $(o).outerWidth();
            $(o).show();
        });
        // 实际宽度 > tab容器宽度
        if (tabsRealWidth > tabContainerWidth) {
            $("ul.tab-ul li.tab-title span").addClass("tab-min-width");

            // tabs最小宽度
            var tabsMinWidth = 0;
            $("ul.tab-ul").children("li.tab-title").each(function(i, o) {
                tabsMinWidth += $(o).outerWidth();
            });
            // 最小宽度 > tab容器宽度  需要做隐藏处理
            if (tabsMinWidth > tabContainerWidth) {
                $("ul.tab-ul").children("li.tab-title").each(function(i, o) {
                    $(o).hide();
                    tabsMinWidth -= $(o).outerWidth();
                    if (tabsMinWidth <= tabContainerWidth) {
                        return false;
                    }
                });
            }
        }
        if ($("li.tab-active").is(":hidden")) {
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
    function getTab(id) {
        return document.getElementById("tab_" + id);
    }
    function getIframe(id) {
        return document.getElementById("iframe_" + id);
    }
    // 添加到tabList
    function addToTabList(id, title) {
        var tabListHtml = '';
        tabListHtml += '<li>';
        tabListHtml += '<span>' + title + '</span>';
        tabListHtml += '<i class="fa fa-close"></i>';
        tabListHtml += '</li>';
        var $tabListHtml = $(tabListHtml).attr("id", "tab_list_" + id).attr("title", title);
        $(".tab-list").append($tabListHtml);

        // 添加监听
        $tabListHtml.bind("click", function () {
            activeTab(id);
        });
        $tabListHtml.children("i.fa-close").bind("click", function () {
            closeTab(id);
        });
    }
    // 从tabList中移出
    function removeFromTabList(id) {
        $("#tab_list_" + id).remove();
    }
    // tabList显示
    function showTabList(o) {
        var pos = $(o).position();
        var left = pos.left;
        // 超出屏幕 位置调整
        var xx = pos.left + $(".tab-list").outerWidth() - $(".menu-tab").width();
        if(xx > 0){
            left = left - xx - 8;
        }
        var maxHeight = $(".tab-content").height();
        $(".tab-list").css({
            "left": left,
            "max-height": maxHeight
        });
        if ($(".tab-list").is(":visible")) {
            $(".tab-list").fadeOut();
        } else {
            $(".tab-list").slideDown();
        }
    }

    return {
        addTab: addTab,
        activeTab: activeTab,
        closeTab: closeTab,
        closeAllTab: closeAllTab,
        resetTab: resetTab,
        showTabList: showTabList
    }
})

