$(document).ready(function () {
    initData();
    initClick();
});

//获取数据
function initData() {
    getBaseInfo();
    getInsureInfo();
    getHandleCount();
    getHandleInfos();
}
//获取基础信息
function getBaseInfo() {
    $.mockjax({
        url: 'api/person/pbaseinfo',
        status: 200,
        contentType: 'application/json',
        responseText: {
            "code": 200,
            "imgsrc": "../images/logo.png",
            "username": "某某",
            "id": 23,
            "uid": "510921555555555555",
            "insured": 1,
            "insuredname": "正常参保",
            "retirebalance": 5000,
            "retireUpdatetime": "2019-03-27",
            "accumulateArrearage": 5000,
            "accumulateArrearageTimestart": "2019-01",
            "accumulateArrearageTimeend": "2019-03",
            "townRetireInsure":{
                "name": "城镇职工养老保险",
                "realPay": "36月",
                "endAuditing": "201903"
            },
            "idlenessInsure":{
                "name": "失业保险",
                "realPay": "36月",
                "endAuditing": "201903"
            }
        }
    });
    $.ajax({
        type: 'GET',
        url: 'api/person/pbaseinfo',
        dataType: 'json',
        success: function(data){
            if(data.code == 200){
                setBaseInfo(data);
            }
        }
    });
}

//获取参保信息
function getInsureInfo() {
    $.mockjax({
        url: 'api/person/insure',
        status: 200,
        contentType: 'application/json',
        responseText: {
            "code": 200,
            "total": 5,
            "list": [
                {
                    "index": 1,
                    "id": 1,
                    "insureClassfiy": "城镇职工养老保险",
                    "insureDate": "2019-03-25 14:23:43",
                    "insureBase": "10000",
                    "insureStatus": 1,
                    "insureStatusname": "正常参保",
                    "insureUnit": "四川省久远银海软件股份有限公司"
                },
                {
                    "index": 2,
                    "id": 2,
                    "insureClassfiy": "城镇职工养老保险",
                    "insureDate": "2019-03-25 14:23:43",
                    "insureBase": "10000",
                    "insureStatus": 2,
                    "insureStatusname": "暂停参保",
                    "insureUnit": "四川省久远银海软件股份有限公司"
                }
            ]
        }
    });
    $.ajax({
        type: 'GET',
        url: 'api/person/insure',
        dataType: 'json',
        success: function(data){
            if(data.code == 200){
                setInsureInfo(data.list);
            }
        }
    });
}

//获取办件信息---参数status---值可选all;wait;pass;nopass
function getHandleInfos(params) {
    //param = {status: 'wait'}
    $.mockjax({
        url: 'api/person/hanlelog',
        status: 200,
        contentType: 'application/json',
        responseText: {
            "code": 200,
            "total": 100,
            "currentPage": 0,
            "pageSize": 10,
            "info": {
                "allAuditing": 100,
                "waitAuditing": 50,
                "passAuditing": 30,
                "notAuditing": 20
            },
            "list": [
                {
                    "index": 1,
                    "id": 1,
                    "businessClassfiy": "参保人员信息变更登记",
                    "applicant": "某某",
                    "insureDate": "2019-03-25 14:23:43",
                    "insureStatus": 1,
                    "insureStatusname": "审核通过"
                },
                {
                    "index": 2,
                    "id": 2,
                    "businessClassfiy": "参保人员信息变更登记",
                    "applicant": "某某",
                    "insureDate": "2019-03-25 14:23:43",
                    "insureStatus": 2,
                    "insureStatusname": "待审核"
                },
                {
                    "index": 3,
                    "id": 3,
                    "businessClassfiy": "参保人员信息变更登记",
                    "applicant": "某某",
                    "insureDate": "2019-03-25 14:23:43",
                    "insureStatus": 3,
                    "insureStatusname": "审核不通过"
                },
                {
                    "index": 4,
                    "id": 4,
                    "businessClassfiy": "参保人员信息变更登记",
                    "applicant": "某某",
                    "insureDate": "2019-03-25 14:23:43",
                    "insureStatus": 1,
                    "insureStatusname": "审核通过"
                },
                {
                    "index": 5,
                    "id": 5,
                    "businessClassfiy": "参保人员信息变更登记",
                    "applicant": "某某",
                    "insureDate": "2019-03-25 14:23:43",
                    "insureStatus": 1,
                    "insureStatusname": "审核通过"
                },
                {
                    "index": 6,
                    "id": 6,
                    "businessClassfiy": "参保人员信息变更登记",
                    "applicant": "某某",
                    "insureDate": "2019-03-25 14:23:43",
                    "insureStatus": 1,
                    "insureStatusname": "审核通过"
                },
                {
                    "index": 7,
                    "id": 7,
                    "businessClassfiy": "参保人员信息变更登记",
                    "applicant": "某某",
                    "insureDate": "2019-03-25 14:23:43",
                    "insureStatus": 1,
                    "insureStatusname": "审核通过"
                },
                {
                    "index": 8,
                    "id": 8,
                    "businessClassfiy": "参保人员信息变更登记",
                    "applicant": "某某",
                    "insureDate": "2019-03-25 14:23:43",
                    "insureStatus": 1,
                    "insureStatusname": "审核通过"
                }
            ]
        }
    });
    $.ajax({
        type: 'GET',
        url: 'api/person/hanlelog',
        data: params,
        dataType: 'json',
        success: function(data) {
            if (data.code == 200) {
                setHandleInfo(data.list);
                setHandleTabitem(data.info);
            }
        }
    });
}

//获取办件统计
function getHandleCount(){
    $.mockjax({
        url: 'api/persong/phanleinfo',
        status: 200,
        contentType: 'application/json',
        responseText: {
            "code": 200,
            "allAuditing": 100,
            "waitAuditing": 50,
            "passAuditing": 30,
            "notAuditing": 20
        }
    });
    $.ajax({
        type: 'GET',
        url: 'api/persong/phanleinfo',
        dataType: 'json',
        success: function(data) {
            if (data.code == 200) {
                setHandlenav(data);
            }
        }
    });
}

//设置基础信息
function setBaseInfo(data) {
    $('.imgsrc img').attr("src", data.imgsrc); //图片logo
    $('.user').text(data.username); //用户名
    $('.insurestatus').text(data.insuredname); //参保状态
    $('.uidtext').text(data.uid); //身份证号

    $('.retiremoney').text(data.retirebalance); //养老账户余额
    $('.retiredate').text(data.retireUpdatetime); //养老账户变更日期
    $('.arreagemoney').text(data.accumulateArrearage); //社保欠费金额
    $('.arreagestart').text(data.accumulateArrearageTimestart); //社保欠费区间起
    $('.arreageend').text(data.accumulateArrearageTimeend); ////社保欠费区间终

    $('.towntitle').text(data.townRetireInsure.name); //城镇职工养老保险name
    $('.idlenesstitle').text(data.idlenessInsure.name); //城镇 实际缴费
    $('.townrealpay').text(data.townRetireInsure.realPay); //城镇 最后核止期号
    $('.townrealpaytime').text(data.townRetireInsure.endAuditing); //失业保险name
    $('.idlerealpay').text(data.idlenessInsure.realPay); //失业 实际缴费
    $('.idlerealpaytime').text(data.idlenessInsure.endAuditing); //失业 最后核止期号
}

//设置参保信息
function setInsureInfo(data) {
    data.forEach((item,idx) => {
        // let html = `<tr class="tdrow">
        //                 <td class="tdcol" width="80"><span class="logidx">${item.index}</span></td>
        //                 <td class="tdcol insurename" width="190" title="${item.insureClassfiy}"><p class="widthover insurec">${item.insureClassfiy}</p></td>
        //                 <td class="tdcol insuredate" width="180">${item.insureDate}</td>
        //                 <td class="tdcol insurebase" width="180">${item.insureBase}</td>
        //                 <td class="tdcol dealstatus" width="180">${item.insureStatusname}</td>
        //                 <td class="tdcol insureunit" width="308" title="${item.insureUnit}"><p class="widthover insureu">${item.insureUnit}</p></td>
        //             </tr>`;
        let html = `<tr class="tdrow">
                        <td  rowspan="1" colspan="1"><span class="logidx">${item.index}</span></td>
                        <td rowspan="1" colspan="1" class="insurename"  title="${item.insureClassfiy}"><p class="widthover insurec">${item.insureClassfiy}</p></td>
                        <td rowspan="1" colspan="1" class=" insuredate" >${item.insureDate}</td>
                        <td rowspan="1" colspan="1" class="insurebase">${item.insureBase}</td>
                        <td rowspan="1" colspan="1" class="dealstatus" >${item.insureStatusname}</td>
                        <td rowspan="1" colspan="1" class=" insureunit"  title="${item.insureUnit}"><p class="widthover insureu">${item.insureUnit}</p></td>
                    </tr>`;
        $('.table .insuretable').append(html);

        if(item.insureStatus == 1){
            $('.insuretable .dealstatus').eq(idx).addClass('statuspass');
        } else if(item.insureStatus == 2){
            $('.insuretable .dealstatus').eq(idx).addClass('statuswait');
        } else if(item.insureStatus == 3){
            $('.insuretable .dealstatus').eq(idx).addClass('statusnopass');
        }
    });
}

//设置办件列表
function setHandleInfo(data) {
    data.forEach((item,idx) => {
        var html = `<tr class="tdrow">
                        <td class="tdcol" width="80"><span class="logidx">${item.index}</span></td>
                        <td class="tdcol insurename" width="260" title="${item.businessClassfiy}"><p class="widthover bussinec">${item.businessClassfiy}</p></td>
                        <td class="tdcol insuredate" width="180">${item.applicant}</td>
                        <td class="tdcol insurebase" width="190">${item.insureDate}</td>
                        <td class="tdcol dealstatus" width="238">${item.insureStatusname}</td>
                        <td class="tdcol" width="156"><span class="look">查看</span></td>
                        <td class="tdcol" width="0" style="display: none;">${item.id}</td>
                    </tr>`;

        $('.table .insuretablelog').append(html);

        // 查看是否可点击
        if(item.insureStatus == 1){
            $('.insuretablelog .look').eq(idx).addClass('lookactive');
            $('.insuretablelog .dealstatus').eq(idx).addClass('statuspass');
        } else if(item.insureStatus == 2){
            $('.insuretablelog .dealstatus').eq(idx).addClass('statuswait');
        } else if(item.insureStatus == 3){
            $('.insuretablelog .dealstatus').eq(idx).addClass('statusnopass');
        }
    });
    pageInit();
}

//办件统计信息总览
function setHandlenav(data) {
    $('.lognav .allnum').text(data.allAuditing); //全部
    $('.lognav .waitnum').text(data.waitAuditing); //待审核
    $('.lognav .passnum').text(data.passAuditing); //已审核
    $('.lognav .nopassnum').text(data.notAuditing); //审核未通过
}

//办件信息table切换
function setHandleTabitem(data){
    $('.searchnav .allnum').text(data.allAuditing);
    $('.searchnav .waitnum').text(data.waitAuditing);
    $('.searchnav .passnum').text(data.passAuditing);
    $('.searchnav .nopassnum').text(data.notAuditing);
}

//点击事件
function initClick() {
    //切换table
    $('.searchnav .btn').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
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

    //点击列表查看
    $('.insuretablelog').on('click', '.lookactive', function () {
        var throwId = $(this).parents('.tdrow').find('td:last-child').html();
        console.log(throwId);
    });
}

//筛选切换
function searchnum(status) {
    $('.table .insuretablelog').html('');
    getHandleInfos({status: status});
}