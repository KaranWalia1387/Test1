var mode = '1';
var Usertable;
var databindtogridvar, UserData, Tables;
TitleExport = 'User-report';
gridid = 'jqxgrid';
var zip = '';
var divId = 'chartDiv';
var autoheightbool = false;
var autoheightPrimary = false;
var appendEmail = '';
var defOpen = 2;

var imagerenderer = function (row, datafield, value) {
    if (datafield == "Status")
        return getstatus(row, value);
    else
        return getresult(row, value);
}
var checkboxFormatter = function (row, value) {
    var EmailID = $('#jqxchildgrid').jqxGrid('getrowdata', row).EmailID;
    return "<input type='checkbox' id=" + EmailID + " name='checkboxIsBCC' class='emailCC' >";
}



function BindHeader() {
    try {
        var data = Usertable.Table;
        //var actusr = 0; var regusr = 0;
        data.forEach(function (obj, i) {
            if (obj.STATUS == "Active") {
                $('#lblActUsr').text(obj.UserCount);
                // actusr = parseInt(obj.Cnt);
            }
            if (obj.STATUS == "Deactivated") {
                $('#lblInActUsr').text(obj.UserCount);
                // actusr = parseInt(obj.Cnt);
            }
            
            if (obj.STATUS == "Registered") {
                $('#lblRegUsr').text(obj.UserCount);
                // regusr = parseInt(obj.Cnt);
            }
            if (obj.STATUS == "Total") {
                $('#lblTotalUsr').text(obj.UserCount);
                //  regusr = parseInt(obj.Cnt);
            }
        });
        //  var total = actusr + regusr;

    }
    catch (e) {
        console.log(e.message);
    }

}



//for get status icon showing in grid
function getstatus(row, value) {

    var CustId = $('#jqxchildgrid').jqxGrid('getrowdata', row).CustomerId;
    var src = value == 'Registered' ? "../images/registered.png" : value == "Active" ? "../images/active.png" : "../images/inactive.png";
    var imgid = value + '_' + CustId;
    return '<div style="text-align: center;"><img id=' + imgid + ' class="registerimg" src=' + src + ' /></div>';
}
function getresult(row, value) {
    var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;

    return '<div style="text-align: left;"><span id=' + cityId + ' class=filterdrop >' + value + '</span></div>';
}
function SelectAll() {
    appendEmail = '';

    if ($('input[name=checkboxMain]').is(':checked')) {
        $("input[name=checkboxIsBCC]")  // for all checkboxes
            .each(function () { // first pass, create name mapping
                this.checked = true;

                var emailId = this.id;
                appendEmail += emailId + ';';
            });
    } else {
        $('input[name=checkboxIsBCC]').attr('checked', false);
    }

}

function SendNotification() {
    var AccountNumbers = '';
    var rowindexes = $('#jqxchildgrid').jqxGrid('getselectedrowindexes');
    var boundrows = $('#jqxchildgrid').jqxGrid('getboundrows');
    var selectedrows = new Array();
    for (var i = 0; i < rowindexes.length; i++) {
        var row = boundrows[rowindexes[i]];
        if (AccountNumbers == "") {
            AccountNumbers = row['AccountNumber'];
        } else {
            var str = AccountNumbers + ',' + row['AccountNumber']
            AccountNumbers = str;
        }
        //selectedrows.push(row);
    }

    $('#hdnAccountNos').val(AccountNumbers);

    if (AccountNumbers == "") {
        alert('There is no row selected');
        return;
    }

    $('#ddltypeofmessage').val('');
    $('#ddlMessageMode').val('0');
    $('#txtmsgsubject').val('');
    $('#txtMessage').val('');
    showhideeditor($("#ddlMessageMode").val());

    Popup.showModal('PopupAddTopic', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
}

function validateconfiguration() {
    var isvalid = (ValidatePage('outboxmsg') && GetFileSize('fileupd'))

    var objEditor = $find("ContentPlaceHolder1_rightpanel_txtEditor_ctl02_ctl00");
    var value = objEditor.get_content();
    if (value == "" && ($('#ddlMessageMode').val()) == "1") {
        alert('Please Enter Message');
        isvalid = false;
    }

    return isvalid;
}

//on page load

function LoadGrid() {
    try {
        autoheightPrimary = false;
        if (databindtogrid.length <= 10)
            autoheightPrimary = true;
        //Getting the source data with ajax GET request
        source = {
            datatype: "array",
            datafields: [
                { name: 'CreatedDate' },
                { name: 'Registered', type: 'number' },
                { name: 'Active', type: 'number' },
                { name: 'Deactivated', type: 'number' }
            ],
            async: false,
            record: 'Table',
            sortable: true,
            localdata: databindtogrid
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });


        $("#jqxgrid").jqxGrid({
            width: "99.8%",
            //autoheight: autoheightPrimary,
            source: dataAdapter,
            height: GridHeight * .81,
            columnsheight: 38,
            rowsheight: 34,
            theme: 'darkblue',
            altrows: true,
            sortable: true,
            selectionmode: 'singlerow', //To trigger row select event
            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50', '100'],
            pagesize: 20,
            columnsresize: true,
            columnsreorder: true,
            columns:
            [
                { text: 'Created Date', dataField: 'CreatedDate', width: '25%', cellsrenderer: imagerenderer },
                { text: 'Registered', dataField: 'Registered', width: '25%', cellsrenderer: imagerenderer },
                { text: 'Active', dataField: 'Active', width: '25%', cellsrenderer: imagerenderer },
                { text: 'Inactive', dataField: 'Deactivated', width: '25%', cellsrenderer: imagerenderer }
            ]
        });
    }
    catch (e) { console.log(e.message);}
}
function RegisterImg(StatusId, custId) {

    var confirmMsg = '';
    var alertMsg = '';
    var status = '';
    switch (StatusId) {
        case 'Inactive':
            confirmMsg = "Are you sure you want to enable this user?";
            alertMsg = 'Enabled';
            status = '1';
            break;
        case 'Active':
            confirmMsg = "Are you sure you want to disable this user?";
            alertMsg = 'Disabled';
            status = '2';
            break;
        case 'Registered':
            confirmMsg = "Are you sure you want to disable this user?";
            alertMsg = 'Disabled';
            status = '2';
            break;
        default:
            break;
    }
    if (confirm(confirmMsg)) {
        var result = User.ChangeStatus(custId, status).value;
        if (result == "1")
            alert('User has been ' + alertMsg + ' successfully.');
        else
            alert('User is not ' + alertMsg);
        submit();
    } else {
        //alert('User is not ' + alertMsg);
    }

}
//for 2nd grid after filter

function LoadChildGrid() {
    try{  $("#btnSend").show();
        autoheightbool = false;
        if (databindtogrid.length <= 10)
            autoheightbool = true;
        //Getting the source data with ajax GET request
        source = {
            datatype: "array",
            datafields: [
                { name: 'CustomerId' },
                { name: 'Customer Name' },
                { name: 'EmailID' },
                { name: 'MobilePhone' },
                { name: 'Address1' },
                { name: 'CityName' },
                { name: 'ZipCode', type: 'number' },
                { name: 'CreatedDate' },
                { name: 'Customer Type' },
                { name: 'Status' },
                { name: 'AccountNumber' }
            ],
            async: false,
            record: 'Table',
            sortable: true,
            localdata: databindtogrid
        };
        var dataAdapter = new $.jqx.dataAdapter(source,
            { contentType: 'application/json; charset=utf-8' }
        );
        $('#jqxchildgrid').jqxScrollBar({
            height: 10, width: 50

        }).on('valuechanged', function () {

        });

        $("#jqxchildgrid").jqxGrid({
            width: "100%",
            autoheight: autoheightbool,
            height: "320",
            source: dataAdapter,
            sortable: true,
            selectionmode: 'checkbox', //To trigger row select event

            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50'],
            pagesize: 20,
            //showtoolbar: true,

            columnsresize: true,
            columnsreorder: true,
            enabletooltips: true,
            rendertoolbar: function (toolbar) {
                //var container = $("<div style='overflow: hidden; position: relative; margin: 5px;'></div>");
                //var sendEmailButton = $("<input type='button' name='btnSend' class='emailSend' value='Send Notification'  onClick='SendNotification();'/>");
                //container.append(sendEmailButton);
                //toolbar.append(container);
            },
            columns:
            [
                //{
                //    text: "", width: '8%',
                //editable: true, edittype: 'checkbox', cellsrenderer: checkboxFormatter,
                //editoptions: { value: "True:False" },
                //},
                { text: 'Customer Name', dataField: 'Customer Name', width: '17%' },
                { text: 'EmailID', dataField: 'EmailID', width: '18%' },
                { text: 'Mobile Phone', dataField: 'MobilePhone', width: '15%' },
                { text: 'Address', dataField: 'Address1', width: '14%' },
                { text: 'City Name', dataField: 'CityName', width: '11%' },
                { text: 'Zip Code', dataField: 'ZipCode', width: '9%' },
                { text: 'Created Date', dataField: 'CreatedDate', width: '14%' },
                { text: 'Account Type', dataField: 'Customer Type', width: '14%' },
                { text: 'Status', dataField: 'Status', width: '7%', cellsrenderer: imagerenderer, align: 'center' },
                { text: 'AccountNumber', dataField: 'AccountNumber', width: '0', hidden: true },
            ],

        });

        $("#jqxchildgrid").jqxGrid('hidecolumn', 'AccountNumber');

        $("#jqxchildgrid").on('bindingcomplete', function () {
            if ($(window).width() < 1400) {
                $("#jqxchildgrid").jqxGrid('autoresizecolumns');
            }
        });
    }

    catch (e)
    { console.log(e.message);}
}

//For high chart

//function chartclick(name, chartType, drilldown, type) {
//    var tempTable;
//    var processed_json4 = new Array();
//    if (drilldown.indexOf('mode') >= 0) {
//        if (name != '') {
//            tempTable = Usertable.Tables[0];
//            var residentialCount = 0;
//            var commercialCount = 0;
//            $.map(tempTable.Rows, function (obj, i) {
//                if (name == obj["ZipCode"])
//                { obj["Customer Type"].toLowerCase() == 'residential' ? residentialCount++ : commercialCount++; }
//            });
//            processed_json4.push({
//                name:"Residential",
//                y: residentialCount,
//                color: 'green',
//                title: "Residential"
//            });
//            processed_json4.push({
//                name: "Commercial",
//                y: commercialCount,
//                color: 'red',
//                title: "Commercial"
//            });
//            if (type != 1)
//                changeSubDiv(name.trim().toLowerCase(), 'Zipcode', chartType,1);
//            return processed_json4;
//        }
//    }
//   else if (drilldown.indexOf('Zipcode') < 0) {
//        if (name != '') {
//            tempTable = Usertable.Tables[3];

//            $.map(tempTable.Rows, function(obj, i) {
//                if (name.trim().toLowerCase() == obj["CityName"].trim().toLowerCase())
//                    processed_json4.push({
//                        name: obj.ZipCode,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.ZipCode,
//                        drilldown: 'Zipcode'
//                    });
//            });
//            if (type != 1)
//                changeSubDiv(name.trim().toLowerCase(),'City',chartType);
//            return processed_json4;
//        }
//    }

//else {
//        tempTable = Usertable.Tables[4];
//        $.map(tempTable.Rows, function (obj, i) {
//            if (name.trim().toLowerCase() == obj["ZipCode"].trim().toLowerCase())
//                processed_json4.push({
//                    name: obj.CustomerType,
//                    y: obj.Cnt,
//                    color: colorarrHEX[i],
//                    title: obj.CustomerType

//                });
//        });
//        if (type != 1)
//            changeSubDiv(name.trim().toLowerCase(), 'Zipcode', chartType);
//        return processed_json4;
//    }
//}
//function changeSubDiv(name, type, chartType, mode) {

//    var tempTable = Usertable.Tables[5];
//    if (mode == 1)
//        tempTable = Usertable.Tables[0];
//    var statusRegistered = 0;
//    var statusActive = 0;
//    var statusInactive = 0;
//    var cusCommercial = 0;
//    var cusResidential = 0;
//    var cityZip = '';
//    var processed_json = new Array();
//    var processed_json1 = new Array();

//    $.map(tempTable.Rows, function (obj, i) {
//        if (obj.CityName.trim().toLowerCase() == name || obj.ZipCode == name) {
//            var cusType = obj.CustomerType != undefined ? obj.CustomerType : obj["Customer Type"];
//            cusType.toLowerCase() == 'residential' ? cusResidential++ : cusCommercial++;
//                obj.Status.toLowerCase() == 'registered' ? statusRegistered++ : obj.Status.toLowerCase() == 'active' ? statusActive++ : statusInactive++;
//            }
//        });
//        processed_json.push({
//            name: 'Registered',
//            y: statusRegistered,
//            color: 'yellow',
//            title: 'Registered'

//        });
//        processed_json.push({
//            name: 'Active',
//            y: statusActive,
//            color: 'green',
//            title: 'Active'

//        });
//        processed_json.push({
//            name: 'InActive',
//            y: statusInactive,
//            color: 'red',
//            title: 'InActive'

//        });
//        processed_json1.push({
//            name: 'Residential',
//            y: cusResidential,
//            color: 'green',
//            title: 'Residential'

//        });
//        processed_json1.push({
//            name: 'Commercial',
//            y: cusCommercial,
//            color: 'red',
//            title: 'Commercial'

//        });

//        if (type == 'Zipcode') {
//            $('#subChart1').html("<b>" + 'Status-Zipcode' + "</b>");
//            $('#subChart2').html("<b>" + 'Account Type-Zipcode' + "</b>");
//        } else {
//            $('#subChart1').html("<b>" + 'Status-City' + "</b>");
//            $('#subChart2').html("<b>" + 'Account Type-City' + "</b>");
//        }
//    switch (chartType) {
//        case 'pie':
//            createchartWithSeries('i0', 'div-subChart1', processed_json, 'Status');
//            createchartWithSeries('i0', 'div-subChart2', processed_json1, 'CustomerType');
//            break;
//        case 'column':
//            createchartWithSeries('i1', 'div-subChart1', processed_json, 'Status');
//            createchartWithSeries('i1', 'div-subChart2', processed_json1, 'CustomerType');
//            break;
//        case 'line':
//            createchartWithSeries('i2', 'div-subChart1', processed_json, 'Status');
//            createchartWithSeries('i2', 'div-subChart2', processed_json1, 'CustomerType');
//            break;
//        case 'area':
//            createchartWithSeries('i3', 'div-subChart1', processed_json, 'Status');
//            createchartWithSeries('i3', 'div-subChart2', processed_json1, 'CustomerType');
//            break;
//        }

//}

//function subBackToMain(chartType, type,name) {
//    $('#subChart1').html("<b>" + 'Status' + "</b>");
//    $('#subChart2').html("<b>" + 'Account Type' + "</b>");
//    var pieChartTable1 = Usertable.Tables[1];
//    if(name!=undefined && name.toLowerCase()=='zipcode')
//        pieChartTable1 = Usertable.Tables[2];
//    var subChart1Series = new Array();
//    var subChart2Series = new Array();
//    $.map(pieChartTable1.Rows, function (obj, i) {

//        subChart1Series.push({
//            name: obj.Status,
//            y: obj.Cnt,
//            color: colorarrHEX[i],
//            title: obj.Status
//        });
//    });

//    var pieChartTable2 = Usertable.Tables[2];
//    if (name != undefined && name.toLowerCase() == 'zipcode')
//        pieChartTable1 = Usertable.Tables[23];
//    $.map(pieChartTable2.Rows, function (obj, i) {

//        subChart2Series.push({
//            name: obj.CustomerType,
//            y: obj.Cnt,
//            color: colorarrHEX[i],
//            title: obj.CustomerType
//        });
//    });

//    switch (chartType) {
//        case 'pie':
//            createchartWithSeries('i0', 'div-subChart1', subChart1Series, 'Paid');
//            createchartWithSeries('i0', 'div-subChart2', subChart2Series, 'Unpaid');
//            break;
//        case 'column':
//            createchartWithSeries('i1', 'div-subChart1', subChart1Series, 'Paid');
//            createchartWithSeries('i1', 'div-subChart2', subChart2Series, 'Unpaid');
//            break;
//        case 'line':
//            createchartWithSeries('i2', 'div-subChart1', subChart1Series, 'Paid');
//            createchartWithSeries('i2', 'div-subChart2', subChart2Series, 'Unpaid');
//            break;
//        case 'area':
//            createchartWithSeries('i3', 'div-subChart1', subChart1Series, 'Paid');
//            createchartWithSeries('i3', 'div-subChart2', subChart2Series, 'Unpaid');
//            break;
//    }
//}

function PiechartCommon(mode, caseId) {

    // var tempvalue;
    // tempvalue = Usertable.Table1;
    //switch (mode) {
    //    case 1:
    //        tempvalue = Usertable.Tables[0];
    //        $('#subChart1').html("<b>" + 'Status' + "</b>");
    //        $('#subChart2').html("<b>" + 'Account Type' + "</b>");
    //        break;
    //    case 2:
    //        tempvalue = Usertable.Tables[1];
    //        $('#subChart1').html("<b>" + 'Status' + "</b>");
    //        $('#subChart2').html("<b>" + 'Account Type' + "</b>");
    //        break;
    //    case 3:
    //        tempvalue = Usertable.Tables[1];
    //        $('#subChart1').html("<b>" + 'Status' + "</b>");
    //        $('#subChart2').html("<b>" + 'Account Type' + "</b>");
    //        break;
    //    case 4:
    //        tempvalue = Usertable.Tables[1];
    //        $('#div-subChart').hide();
    //        $('#borderline').hide();
    //        $('#div-mainChart').height('335');
    //        break;
    //    case 5:
    //        tempvalue = Usertable.Tables[1];
    //        $('#subChart1').html("<b>" + 'ZipCode Users' + "</b>");
    //        $('#subChart2').html("<b>" + 'Status' + "</b>");
    //        break;
    //}

    var piechart = Usertable.Table1;
    if (piechart.length > 0) {
        $('#chartDiv').show();
        $('#nodata_div').hide();
        $('#nodata_div2').hide();
        $('#graphdivarea').css('display', 'Block');
    }
    else {
        $('#nodata_div').show();
        $('#nodata_div2').show();
        $('#graphdivarea').css('display', 'none');
        $('#nodata_div').html('<font color="Red">No User Data available</font>');
        $('#nodata_div2').html('<font color="Red">No User Data available</font>');
        $('#chartDiv').hide();
    }
    //if (piechart.length > 0) {
    //    $('#div-Userchart').show();
    //    $('#nodata_div').hide();
    //    $('#nodata_div1').hide();
    //} else {
    //    $('#nodata_div').show();
    //    $('#nodata_div1').show();
    //    $('#nodata_div').html('<font color="Red">No Data</Font>');
    //    $('#nodata_div1').html('<font color="Red">No Data</Font>');
    //    $('#div-Userchart').hide();
    //    $('#jqxgrid').hide();
    //    $('#jqxchildgrid').hide();
    //    $('#UserTitle').hide();
    //}

    ////To remove title if dates are blank
    //var title;
    //if ($('#txtDateFrom').val() != "" && $('#txtDateTo').val() != "")
    //    title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    //else
    //    title = "";
    ////var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    //$('#UserTitle').html("<b>" + title + "</b>");
    processed_json = new Array();
    processed_json2 = new Array();
    processed_json3 = new Array();
    //switch (mode) {
    //    case 1:
    //        {
    $.map(piechart, function (obj, i) {
        processed_json.push({
            name: obj.CreatedDate.slice(0, -5).replace('-','/'),//(new Date(obj.CreatedDate)).toLocaleDateString('EN').slice(0, -5),
            y: obj.Registered,
            color: colorarrHEX[0],
            title: 'Registered'
        });
    });

    $.map(piechart, function (obj, i) {
        processed_json2.push({
            name: obj.CreatedDate.slice(0, -5).replace('-', '/'),//(new Date(obj.CreatedDate)).toLocaleDateString('EN').slice(0, -5),
            y: obj.Active,
            color: colorarrHEX[3],
            title: 'Active'
        });
    });

    $.map(piechart, function (obj, i) {
        processed_json3.push({
            name: obj.CreatedDate.slice(0, -5).replace('-', '/'),//(new Date(obj.CreatedDate)).toLocaleDateString('EN').slice(0, -5),
            y: obj.Deactivated,
            color: colorarrHEX[1],
            title: 'Inactive'

        });
    });

  
    BindhighChart3AdminSeries('areaspline', 'chartDiv', 'Registered', colorarrHEX[0], 'Active', colorarrHEX[3], 'Inactive', colorarrHEX[1]);
  

}

$(document).on("click", ".registerimg", function () {
    var idLock = this.id;
    var StatusId = idLock.split('_')[0];
    var custId = idLock.split('_')[1];
    RegisterImg(StatusId, custId);
});
$(document).on("click", ".filterdrop", function () {
    var idCity = this.id;
    $('#ddlCity').val(idCity);
    var obj = $('#ddlCity option:selected');
    if (obj.index() > 0) {
        submit();
    }
});
$(document).ready(function () {
    var beforedate = new Date(new Date().setDate(new Date().getDate() - 30));
    var date = new Date();
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    $('#lblCurrent').text(months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear());
    $('#lblBefore').text(months[beforedate.getMonth()] + ' ' + beforedate.getDate() + ', ' + beforedate.getFullYear());
    var bfrdate = (beforedate.getMonth() + 1) + '/' + beforedate.getDate() + '/' + beforedate.getFullYear();
    var curdate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    $('#txtDateFrom').val(bfrdate);
    $('#txtDateTo').val(curdate);

    $('#filter_btn_explorer').click(function () {
        $(this).toggleClass('active');
        $('#divFilter').toggle();
    });

    $('#btnFilter').click(function () {
        var bfrdate = $('#txtDateTo').val().split('/');
        var aftdate = $('#txtDateFrom').val().split('/');
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $('#lblCurrent').text(months[bfrdate[0] - 1] + ' ' + bfrdate[1] + ', ' + bfrdate[2]);
        $('#lblBefore').text(months[aftdate[0] - 1] + ' ' + aftdate[1] + ', ' + aftdate[2]);
        submit();
        chartgraphsection(defOpen);
    });
    $('#gridVw').click(function () {
        defOpen = 1;
        chartgraphsection(defOpen);
    });
    $('#chartView').click(function () {
        defOpen = 2;
        chartgraphsection(defOpen);
       
    });
   
    submit();
   
    $('#hdnParamValues').val($('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '||||||0');
   

    $('.imgtoggle').click(function () {

        $('.content').slideToggle('slow');
        var oldSrc = $('.imgtoggle').attr('src');
        var minusImg = "..\\images\\ArrowsMinus.png";
        var plusImg = "..\\images\\ArrowsPlus.png";
        oldSrc = oldSrc == minusImg ? plusImg : minusImg;
        $('.imgtoggle').attr('src', oldSrc);
    });
   
});

function submit() {
    try {
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();
       
        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                // alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }
        loader.showloader();
        var city = "";
        var zip = "";
        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        var ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();
        var searchUser = ($('#txtSearch').val() == null || $('#txtSearch').val() == '') ? '' : $('#txtSearch').val();

        if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
            var ddlCity = $('#ddlCity option:selected');
            if ($(ddlCity).attr('key') == 'CityName') {
                city = $(ddlCity).val();
            }
            if ($(ddlCity).attr('key') == 'Zipcode') {
                zip = $(ddlCity).val();
            }
        }

        if ((city == '' && zip == '' && ddlAccountType == '')) {
            mode = 1;
        }
        else {

            mode = (city != '') ? 2 : 1;

            if (zip != '') {
                mode = 3;
            }

            if ((city != '' || zip != '') && ddlAccountType != '') {
                mode = 4;
            } else if (ddlAccountType != '') {
                mode = 5;
            }
        }

        var param = { 'datefrom': dtFrom, 'dateto': dtTo, 'cityid': city, 'zipcode': zip, 'customertype': ddlAccountType };
        
        $.ajax({
            type: "POST",
            url: "User.aspx/LoadGridData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                data = data.d;
                Usertable = $.parseJSON(data);
        
                $('#hdnParamValues').val(dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType);

                databindtogrid = Usertable.Table1;
                if (databindtogrid.length == 0) {
                    $('#jqxgrid').hide();
                    $('#jqxchildgrid').hide();
                    $('#nodata_div').show();
                    $('#nodata_div').html('<font color="Red">No User Data available</font>');
                    $('#nodata_div2').show();
                    $('#nodata_div2').html('<font color="Red">No User Data available</font>');
                                        
                }
                if (mode == 1) {
                    if (databindtogrid.length <= 10)
                        autoheightPrimary = true;
                    $('#jqxgrid').show();
                    $('#jqxchildgrid').hide();
                    gridid = 'jqxgrid';
                    LoadGrid();
                    BindHeader(); PiechartCommon(mode);
                }
                else {
                    $('#jqxgrid').show();
                    $('#jqxchildgrid').hide();
                    PiechartCommon(mode);
                    gridid = 'jqxgrid';
                    BindHeader();
                    LoadGrid();
                    //LoadChildGrid();
                }
                loader.hideloader();

                chartgraphsection(defOpen);
            },

            error: function (request, status, error) { w2alert('Error!! ' + request.statusText); }
        });
        //for pdf


        //
    }
    catch (e) { }
}
function removeFile() {
    $('#fileupd').val('');
    var control = $("#fileupd");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    return false;
}

function BindhighChart3AdminSeries(type, id, series1name, color1, series2name, color2, series3name, color3) {

    $('#' + id).highcharts({
        chart: {
            type: type,
            options3d: {
                enabled: enable3d,
                alpha: 15,
                beta: 0
            }
        },
        credits: {
            enabled: false
        },
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: false

        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            maxPadding: 0.09,
            title: {
                text: 'Number of customers',
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'red',
                    fontSize: '5px'
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },

        xAxis: {
            labels: {
                rotation: -70,
                style: {
                    color: '#333333',
                    margin: "-20px",
                    fontSize: '10px',
                }
            },
            type: "category",
            name: 'Customer Count',
            title: {
                style: {
                    color: '#333',
                    //fontWeight: 'bold',
                    fontSize: '12px',
                   // fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                }
            }
        },
        tooltip: {
            shared: false,
          
            useHTML: true,
            
            formatter: function () {
                //return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': </b>' + changetoK(Math.abs(this.y));
                return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': </b>' + this.y;
            }
            
        },


        plotOptions: {
            areaspline: {
                fillOpacity: 0.8,
                lineWidth: null,
                states: {
                    hover: {
                        enabled: true,
                        lineWidth: 0.05
                    }
                },
                marker: {
                    enabled: false
                }
            },
            series: {
               // pointWidth: 11,
                dataLabels: {
                    stacking: 'normal',
                    align: 'center',
                    rotation: -30,//#4867
                    // x: 0,//#4867
                    y: -7,
                    enabled: false,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        //return this.y;
                        return (changetoK(this.y));
                        //return Highcharts.numberFormat(this.y, 0);
                    },
                    style: {
                        color: 'black',
                        fontSize: '9px'
                    }

                },

                point: {
                    pointer: 'cursor',
                    events: {
                        click: function () {
                        }
                    }
                }
            }
        },

        series: [{
            type: type,
            name: series1name,
            data: processed_json,
            showInLegend: true,
            color: color1

        }, {
            type: type,
            name: series2name,
            data: processed_json2,
            showInLegend: true,
            color: color2
        },
        {
            type: type,
            name: series3name,
            data: processed_json3,
            showInLegend: true,
            color: color3
        }
        ]

   });
}