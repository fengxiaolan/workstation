$(document).ready(function () {
    initData();
    initClick();
});

//获取数据
function initData() {
    getBaseInfo();
    getHandleInfos();
    getHandleCount();
    getHandlepay();
    getHandlehot();
}

//获取基础信息
function getBaseInfo() {
    $.mockjax({
        url: 'api/index/baseinfo',
        status: 200,
        contentType: 'application/json',
        responseText: {
            "imgsrc": "../images/logo.png",
            "company": "四川久远银海软件股份有限公司",
            "companyType": "国有控股企业",
            "lastLoginTime": "2019-03-28 09:12:36",
            "id": "562335",
            "allinsure": "5000",
            "employman": "4800",
            "retireman": "200",
            "arreagecost": "5000",
            "receiveStatus": "已完成",
            "townRetireInsure":{
                "name": "城镇职工养老保险",
                "joinman": "500",
                "endAuditing": "201903"
            },
            "idlenessInsure":{
                "name": "失业保险",
                "joinman": "360",
                "endAuditing": "201903"
            }
        }
    });
    $.ajax({
        type: 'GET',
        url: 'api/index/baseinfo',
        dataType: 'json',
        success: function(data){
            setBaseInfo(data);
        }
    });
}

//获取办件信息---参数status---值可选all;wait;pass;nopass
function getHandleInfos(param) {
    //param = {status: 'wait'}
    $.mockjax({
        url: 'api/index/unithandle',
        status: 200,
        contentType: 'application/json',
        responseText: {
            "code": 200,
            "total": 100,
            "info": {
                "allnum": 100,
                "applynum": 20,
                "auditnum": 10,
                "nopassnum": 10
            },
            "list": [
                {
                    "index": 1,
                    "id": 10,
                    "bussinessLog": "个人办件记录",
                    "name": "张三/移动",
                    "auditStatus": 1,
                    "auditStatusname": "已办理",
                    "handltTime": "2019-03-25 14:25:36"
                },
                {
                    "index": 2,
                    "id": 2,
                    "bussinessLog": "个人办件记录",
                    "name": "张三/移动",
                    "auditStatus": 2,
                    "auditStatusname": "待办理",
                    "handltTime": "2019-03-25 14:25:36"
                },
                {
                    "index": 3,
                    "id": 3,
                    "bussinessLog": "个人办件记录",
                    "name": "张三/移动",
                    "auditStatus": 1,
                    "auditStatusname": "已办理",
                    "handltTime": "2019-03-25 14:25:36"
                },
                {
                    "index": 4,
                    "id": 4,
                    "bussinessLog": "个人办件记录",
                    "name": "张三/移动",
                    "auditStatus": 1,
                    "auditStatusname": "待办理",
                    "handltTime": "2019-03-25 14:25:36"
                }
            ]
        }
    });
    $.ajax({
        type: 'GET',
        url: 'api/index/unithandle',
        data: param,
        dataType: 'json',
        success: function(data){
            setHandleTabitem(data.info);
            setHandleInfo(data.list);
            pageInit();
        }
    });
}

//办件统计
function getHandleCount() {
    $.mockjax({
        url: 'api/index/uhanleinfo',
        status: 200,
        contentType: 'application/json',
        responseText: {
            "allnum": 100,
            "monthnum": 90,
            "currnum": 10
        }
    });
    $.ajax({
        type: 'GET',
        url: 'api/index/uhanleinfo',
        dataType: 'json',
        success: function(data){
            setHandlenav(data);
        }
    });
}

//获取单位缴费信息--参数dateTime---值20190206
function getHandlepay(param) {
    // var param = {dateTime: 20190206}
    $.mockjax({
        url: 'api/index/unitpay',
        status: 200,
        contentType: 'application/json',
        responseText: {
            "code": 200,
            "payTime": "2019-02-21 17:18",
            "payAll": 5000,
            "retirelist": [
                {
                    "name": "个人养老保险",
                    "value": 800
                },
                {
                    "name": "单位养老保险",
                    "value": 800
                }
            ],
            "idleneslist": [
                {
                    "name": "个人失业保险",
                    "value": 900
                },
                {
                    "name": "单位失业保险",
                    "value": 800
                }
            ]
        }
    });
    //单位缴费信息
    //饼图
    $.ajax({
        type: 'GET',
        url: 'api/index/unitpay',
        data: param,
        dataType: 'json',
        success: function(data){
            if(data.code == 200){
                var retire = data.retirelist;
                var idlness = data.idleneslist;
                var retireLegend = [];
                retire.forEach(val => {
                    retireLegend.push(val.name);
                });
                var retireData = [];
                retire.forEach(val => {
                    retireData.push({name: val.name, value: val.value});
                });
                var retireall = retire.reduce(function (pre, next) {
                    return pre.value + next.value;
                });

                var idlnessLegend = [];
                idlness.forEach(val => {
                    idlnessLegend.push(val.name);
                });
                var idlnessData = [];
                idlness.forEach(val => {
                    idlnessData.push({name: val.name, value: val.value});
                });
                var idlnessall = idlness.reduce(function (pre, next) {
                    return pre.value + next.value;
                });

                pie('pie1', '养老保险', retireLegend, retireData, nFormatter(retireall, 2));
                pie('pie2', '失业保险', idlnessLegend, idlnessData, nFormatter(idlnessall, 2));

                // 信息
                $('.upayDate').text(data.payTime); //缴费时间
                $('.upaymoney').text(data.payAll); //缴费总额
            }
        }
    });
}

//获取top5
function getHandlehot() {
    $.mockjax({
        url: 'api/index/hot',
        status: 200,
        contentType: 'application/json',
        responseText: [
            {
                "topname": "单位职工险种信息变更",
                "topcom": "信息变更"
            },
            {
                "topname": "单位职工险种信息变更",
                "topcom": "信息变更"
            },
            {
                "topname": "单位职工险种信息变更",
                "topcom": "信息变更"
            },
            {
                "topname": "单位职工险种信息变更",
                "topcom": "信息变更"
            },
            {
                "topname": "单位职工险种信息变更",
                "topcom": "信息变更"
            }
        ]
    });
    $.ajax({
        type: 'GET',
        url: 'api/index/hot',
        dataType: 'json',
        success: function (data) {
            data.forEach((item,idx) => {
                    var html = ` <div class="topitem">
                    <div class="topicon">
                        <i><img src="../images/number_${idx+1}.png"></i>
                    </div>
                    <div class="topcon">
                        <p class="topname widthover" title="${item.topname}">${item.topname}</p>
                        <p class="topi">${item.topcom}</p>
                    </div>
                </div>`;
                    $('.topbox').append(html);
            })
            // for(var i=0,l=data.length; i<l; i++){
            //     var html = '<div class="topitem">'
            //         + '<div class="topicon">'
            //         + '<i><img src="../images/number_'+(i+1)+'.png"></i>'
            //         + '</div>'
            //         + '<div class="topcon">'
            //         + '<p class="topname widthover" title="'+ data[i].topname +'">' + data[i].topname + '</p>'
            //         + '<p class="topi">' + data[i].topcom + '</p>'
            //         + '</div>'
            //         + '</div>';
            //     $('.topbox').append(html);
            // }
        }
    })
}

//设置基础信息
function setBaseInfo(data) {
    $('.imgsrc img').attr("src", data.imgsrc); //图片logo
    $('.user').text(data.company); //公司名称
    $('.companyType').text(data.companyType); //公司类型
    $('.uidtext').text(data.lastLoginTime); //最近登录时间

    $('.retiremoney').text(data.allinsure); //总参保人数
    $('.retiredate').text(data.employman); //在职人数
    $('.arreagemoney').text(data.retireman);  //退休人数
    $('.arreagepay').text(data.arreagecost); //当前欠费金额
    $('.autstatus').text(data.receiveStatus); //当月应收核定

    $('.towntitle').text(data.townRetireInsure.name); //城镇职工养老保险name
    $('.townrealpay').text(data.townRetireInsure.joinman); //城镇 参保人数
    $('.townrealpaytime').text(data.townRetireInsure.endAuditing); //城镇 最后核止期号
    $('.idlenesstitle').text(data.idlenessInsure.name); //失业保险
    $('.idlerealpay').text(data.idlenessInsure.joinman); //失业 参保人数
    $('.idlerealpaytime').text(data.idlenessInsure.endAuditing); //失业 最后核止期号
}

//设置办件列表info
function setHandleTabitem(data) {
    $('.searchnav .allnum').text(data.allnum); //全部
    $('.searchnav .waitnum').text(data.applynum); //待审核
    $('.searchnav .passnum').text(data.auditnum); //已审核
    $('.searchnav .nopassnum').text(data.nopassnum); //不通过
}
//设置办件列表
function setHandleInfo(data) {
    data.forEach((item,idx) => {
        var html = `<tr class="tdrow">
                        <td class="tdcol" width="80" ><span class="logidx">${item.index}</span></td>
                        <td class="tdcol insurename" width="150"  title="${item.bussinessLog}"><p class="widthover bussinec">${item.bussinessLog}</p></td>
                        <td class="tdcol insurebase" width="80">${item.name}</td>
                        <td class="tdcol dealstatus" width="80">${item.auditStatusname}</td>
                        <td class="tdcol insuredate" width="160">${item.handltTime}</td>
                        <td class="tdcol" width="100"><span class="look">查看</span></td>
                        <td class="tdcol" width="0" style="display: none;">${item.id}</td>
                    </tr>`;

        $('.table .insuretablelog').append(html);

        //是否查看
        if(item.auditStatus == 1){
            $('.insuretablelog .look').eq(idx).addClass('lookactive');
            $('.insuretablelog .dealstatus').eq(idx).addClass('statuspass');
        } else if(item.auditStatus == 2){
            $('.insuretablelog .dealstatus').eq(idx).addClass('statuswait');
        }
    });
    pageInit();
}

//办件导航
function setHandlenav(data) {
    $('.lognav .allnum').text(data.allnum); //办件合计
    $('.lognav .waitnum').text(data.monthnum); //本月申报
    $('.lognav .passnum').text(data.currnum); //当前待审核
}

//点击事件
function initClick() {
    //切换table
    $('.searchnav .btn').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    //点击查看
    $('.insuretablelog').on('click', '.lookactive', function () {
        var throwId = $(this).parents('.tdrow').find('td:last-child').html();
        console.log(throwId);
    });

    //办件信息点击查询事件
    $('.searchall').on('click',function () {
        searchnum('all');
    });
    $('.searchwait').on('click',function () {
        searchnum('wait');
    });
    $('.searchpass').on('click',function () {
        searchnum('pass');
    });
    $('.searchonopass').on('click',function () {
        searchnum('nopass');
    });

    //点击查询单位缴费信息
    $('.searchbtn').click(function () {
        var searchval = $('.searchcon').val().trim();
        var reg = /^\b[1-3]\d{3}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;
        var flg = searchval.match(reg);
        if( searchval != null && searchval != ''){
            if( flg == null ){
                alert('输入错误，请输入“YYYYMMDD”六位数字格式\n'  );
                return false;
            }else{
                getHandlepay({dateTime: searchval});
            }
        }

    });
}

//筛选切换
function searchnum(status) {
    $('.table .insuretablelog').html('');
    getHandleInfos({status: status});
}

//设置单位缴费信息-饼图
function pie(id, title, legendData, data, num) {
    var myChart = echarts.init(document.getElementById(id));
    var colorarr;
    if(id == 'pie1'){
        colorarr = ['#2f87e0', '#6bf0eb'];
    } else if(id == 'pie2'){
        colorarr = ['#fc556b', '#feb83a'];
    }
    var option = {
        title: {
            text: title,
            subtext: num,
            textStyle: {
                color: '#999',
                fontSize: 14,
            },
            subtextStyle: {
                fontSize: 26,
                color: '#333'
            },
            x: 'center',
            y: '35%',
        },
        legend:{
            orient: 'vertical',
            icon: 'roundRect',
            x: 'center',
            y: 'bottom',
            itemGap: 15,
            formatter: function(name) {
                let target;
                for (let i = 0, l = data.length; i < l; i++) {
                    if (data[i].name == name) {
                        target = data[i].value;
                    }
                }
                if(id == 'pie1'){
                    return name + ' ' + '{blue|' + target + '}' + ' 元';
                } else if(id == 'pie2'){
                    return name + ' ' + '{red|' + target + '}' + ' 元';
                }
            },
            textStyle: {
                color: '#999',
                rich: {
                    blue: {
                        color: colorarr[0]
                    },
                    red: {
                        color: colorarr[0]
                    }
                }
            },
            data: legendData
        },
        color: colorarr,
        series:[{
            name: title,
            type:'pie',
            radius: ['50%', '60%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:data
        }]
    };
    myChart.setOption(option);
}

//数据格式化
function nFormatter(num, digits) {
    const si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

