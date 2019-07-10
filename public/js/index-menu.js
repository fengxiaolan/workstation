define(['jquery','IndexTab'], function ($,IndexTab) {
    /**
     * 菜单收缩
     */
    function fnMenuDrawer() {
        if (!$('.left-nav').hasClass('nav-mini')) {
            //收缩
            $('.menu-second-li.menu-li-show').removeClass('menu-li-show');
            $('.menu-second-li').children('ul').removeAttr('style');
            $('.menu-first-li.menu-li-show').removeClass('menu-li-show');
            $('.menu-first-li').children('ul').removeAttr('style');
            $('.left-nav').addClass('nav-mini');
            $('.menu-tab').css({'left': '85px'});
            $('.content').css({'left': '85px'});
            $('.search-input').css({'width': '60%'});
        }else{
            //展开
            $('.left-nav').removeClass('nav-mini');
            $('.menu-tab').css({'left': '256px'});
            $('.content').css({'left': '256px'});
            $('.search-input').css({'width': '80%'});
        }
    }

    //菜单点击收缩
    function fold(o){
        if ($(o).children("ul").length) {
            if ($(o).hasClass("menu-folder-open")) {
                $(o).removeClass("menu-folder-open");
                $(o).children("ul").slideUp();
                $($(o).find("a i")[1]).removeClass("fa-angle-up").addClass("fa-angle-down");
            } else {
                $(o).addClass("menu-folder-open");
                $(o).children("ul").slideDown();
                $($(o).find("a i")[1]).removeClass("fa-angle-down").addClass("fa-angle-up");
                $($(o).siblings(".menu-folder-open").find("a i")[1]).removeClass("fa-angle-up").addClass("fa-angle-down");
                $(o).siblings(".menu-folder-open").children("ul").slideUp();
                $(o).siblings(".menu-folder-open").removeClass("menu-folder-open");
            }

        } else {
            // 打开菜单
            var menuId = $(o).attr("id").replace("menu_", "");
            var menuUrl = $(o).attr("data-url");
            var menuName = $($(o).find("a cite")[0]).text();
            if (menuUrl && "undefined" != menuUrl && "null" != menuUrl) {
                IndexTab.addTab(menuId, menuName, menuUrl);
            }
        }
    }
    /**
     * 菜单点击
     * @param o
     */
    function fnMenuClick(o) {
        if (!$('.left-nav').hasClass('nav-mini')){
            $('.menu-ul').find('.menu-li-show').removeClass('menu-li-show');
            $(o).addClass('menu-li-show');
            fold(o);
        } else if(($('.left-nav').hasClass('nav-mini') && !$(o).hasClass('menu-first-li'))){
            fold(o);
        }
    }

    /**
     * 跟菜单点击
     * */
    function fnRootMenuClick(pid) {
        fnSetFirstLevelMenu(firstMenus,pid);
    }

    /**
     * 菜单数据格式化
     * @param data
     * @param rootMenus 根菜单
     * @param firstMenus 一级菜单
     * @param secondMenus 二级菜单
     * @param thirdMenus 三级菜单
     */
    function fnFormaterMenu(data, rootMenus, firstMenus, secondMenus, thirdMenus) {
        if (data && data.length) {
            rootMenus['rootMenu'] = data;
            for (var i=0;i<data.length;i++) {
                var first = data[i];
                if (first.childNode && first.childNode.length) {
                    firstMenus[first.menuId] = first.childNode;
                    for (var j=0;j<first.childNode.length;j++) {
                        var second = first.childNode[j];
                        if (second.childNode && second.childNode.length) {
                            secondMenus[second.menuId] = second.childNode;
                            for (var k=0;k<second.childNode.length;k++) {
                                var third = second.childNode[k];
                                if (third.childNode && third.childNode.length) {
                                    thirdMenus[third.menuId] = third.childNode;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * 根菜单
     * */
    function fnSetRootLevelMenu(rootMenus, menuId) {
        if (rootMenus) {
            if (!menuId) {
                menuId = "rootMenu";
            }
            var menus = rootMenus[menuId];
            var menuHtml = '';
            for (var i=0;i<menus.length;i++) {
                var menu = menus[i];
                if ('show' == menu.isShow) {
                    menuHtml += '<li id="menu_' + menu.menuId + '" class="menu-root-li"  data-pid="' + menu.menuId + '">';
                    menuHtml += '<a>';
                    menuHtml += '<i class="fa fa-navicon" style="padding-right: 5px;"></i>';
                    menuHtml += '<span>' + menu.menuName + '</span>';
                    menuHtml += '</a>';
                    menuHtml += '</li>';
                }
            }
            $(".top-menu-ul").empty().append(menuHtml);
            $('.top-menu-ul li:first-child').addClass('active');
            var ppid = $('.top-menu-ul li:first-child').attr('data-pid');
            fnSetFirstLevelMenu(firstMenus,ppid);
        }
    }

    /**
     * 设置一级菜单
     * @param firstMenus
     * @param menuId
     */
    function fnSetFirstLevelMenu(firstMenus, menuId) {
        if (firstMenus) {
            var menus = firstMenus[menuId];
            var menuHtml = '';
            for (var i=0;i<menus.length;i++) {
                var menu = menus[i];
                if ('show' == menu.isShow) {
                    menuHtml += '<li id="menu_' + menu.menuId + '" class="menu-first-li" data-url="' + menu.url + '">';
                    menuHtml += '<a >';
                    menuHtml += '<i class="fa fa-navicon"></i>';
                    menuHtml += '<cite>' + menu.menuName + '</cite>';
                    if (menu.childNode && menu.childNode.length) {
                        menuHtml += '<i class="fa fa-angle-down nav-more"></i>';
                    } else {
                        menuHtml += '<i></i>';
                    }
                    menuHtml += '</a>';
                    menuHtml += '</li>';
                }
            }
            $(".menu-ul").empty().append(menuHtml);
            fnSetSecondLevelMenu(secondMenus);
        }
    }

    /**
     * 设置二级菜单
     * @param secondMenus
     * @param menuId
     */
    function fnSetSecondLevelMenu(secondMenus, menuId) {
        if (secondMenus) {
            if (menuId) {
                setChildMenu(secondMenus, menuId, "second");
            } else {
                $(".menu-ul").find("li.menu-first-li").each(function(i, o) {
                    var menuId = o.id.replace("menu_", "");
                    setChildMenu(secondMenus, menuId, "second");
                });
            }
            fnSetThirdLevelMenu(thirdMenus);
        }
    }


    /**
     * 设置三级菜单
     * @param thirdMenus
     * @param menuId
     */
    function fnSetThirdLevelMenu(thirdMenus, menuId) {
        if (thirdMenus) {
            if (menuId) {
                setChildMenu(thirdMenus, menuId, "third");
            } else {
                $(".menu-ul").find("li.menu-second-li").each(function(i, o) {
                    var menuId = o.id.replace("menu_", "");
                    setChildMenu(thirdMenus, menuId, "third");
                });
            }
        }
    }

    /***
     * 设置菜单
     * **/
    function setChildMenu(Menus, menuId, level) {
        var menus = Menus[menuId];
        if (menus) {
            var menuHtml = '';
            menuHtml += '<ul class="menu-' + level + '">';
            for (var i=0;i<menus.length;i++) {
                var menu = menus[i];
                if ('show' == menu.isShow) {
                    menuHtml += '<li id="menu_' + menu.menuId + '" class="menu-' + level + '-li" data-url="' + menu.url + '">';
                    menuHtml += '<a >';
                    menuHtml += '<i></i>';
                    menuHtml += '<cite>' + menu.menuName + '</cite>';
                    if (menu.childNode && menu.childNode.length) {
                        menuHtml += '<i class="fa fa-angle-down"></i>';
                    } else {
                        menuHtml += '<i></i>';
                    }
                    menuHtml += '</a>';
                    menuHtml += '</li>';
                }
            }
            menuHtml += '</ul>';
            $("#menu_" + menuId).append(menuHtml);

            //二级点击事件
            $(".menu-second ").off().delegate('li.menu-second-li','click',function(event) {
                console.log('second', this)
                event.stopPropagation();
                fnMenuClick(this);
                event.stopPropagation();
                return;
            });

            $(".menu-third ").off().delegate('li.menu-third-li','click',function(event) {
                console.log('third', this)
                fnMenuClick(this);
                event.stopPropagation();
                return;
            });
        }
    }

    return {
        fnMenuDrawer: fnMenuDrawer,
        fnRootMenuClick: fnRootMenuClick,
        fnSetRootLevelMenu: fnSetRootLevelMenu,
        fnFormaterMenu: fnFormaterMenu,
        fnMenuClick: fnMenuClick,
    }
});


