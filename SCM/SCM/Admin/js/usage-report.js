var defOpen = 2 // #4708
var usagetable;
var tempTable;
var colModel_Power;
var colModel_Water;
var colModel_Gas;
var power_month;
var water_month;
var gas_month;
var yaxisname;
var max = 0;
var databindtogrid;
var unit = 1;
var mode = 1;
var GridHeight = '';
TitleExport = 'usage-report';
gridid = 'jqxgrid';
var divId = 'div-Usagechart';
isdecimal = 1;
var autoheightbool = false;
var autoheightPrimary = false;
var colorarrHEX = new Array();
colorarrHEX = fillcolor();
var color;
function fillcolor() {
    var colorarray = ['#ed5d5d', '#d6d23a', '#32d2c9', '#f19c08', '#4dd304', '#999999', '#00ac79', '#a10014', '#ff5a00', '#1d00f8', '#087189', '#decc00', '#f1c354'];

    for (i = 0; i < 150; i++) {
        var color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

        colorarray.push(color);
    }
    return colorarray;
}
//on page load
//var imagerenderer = function (row, datafield, value) {
    
//    return getresult(row, value==''?value:value.toFixed(2));
//}
function getresult(row, value) {
    var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;

    return '<div style="text-align: left;"><span id=' + cityId + ' class=filterdrop >' + value + '</span></div>';

}

colModel_Power = [
               { text: 'Usage Date', dataField: 'UsageDate', width: '50%' },
               //{ text: 'City Name', dataField: 'CityName', width: '30%', hidden:true },
               { text: 'Total Power Usage ($)', dataField: 'TotalUsageDollar', width: '50%' }

];

function LoadGrid() {
    try {

        $("#btnSend").hide();
        autoheightPrimary = false;
        if (databindtogrid.length == 0) {
            $('#jqxgrid').hide();
            $('#divnodata').show();
        }
        else {
            $('#jqxgrid').show();
            $('#divnodata').hide();
        }
        if (databindtogrid.length <= 10)
            autoheightPrimary = true;
        //Getting the source data with ajax GET request
        source = {
            datatype: "array",
            datafields: [
             { name: 'UsageDate', type: 'text' },
             { name: 'TotalUsageDollar', type: 'number' },
             { name: 'TotalUsageKWH', type: 'number' },
             { name: 'TotalUsageHCF', type: 'number' },
             { name: 'TotalUsageGL', type: 'number' },
             { name: 'TotalUsageCCF', type: 'number' }
            ],
            async: false,
            record: 'Table',
            sortable: true,
            localdata: databindtogrid
        };
        var dataAdapter = new $.jqx.dataAdapter(source,
            { contentType: 'application/json; charset=utf-8' }
        );


        $("#jqxgrid").jqxGrid({
            width: "99.8%",
            autoheight: autoheightPrimary,
            source: dataAdapter,
            sortable: true,
            height: GridHeight * .79,
            columnsheight: 38,
            rowsheight: 34,
            theme: 'darkblue',
            altrows: true,
            selectionmode: 'singlerow', //To trigger row select event
            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50', '100'],
            pagesize: 20,
            columnsresize: true,
            columnsreorder: true,
            columns: colModel_Power         


        });

        $("#jqxgrid").on('bindingcomplete', function () {
            if ($(window).width() < 1366) {
                $("#jqxgrid").jqxGrid('autoresizecolumns');
            }
        });
    }
    catch (e) {
    }
}

$(document).ready(function () {
    document.getElementById('power_unit').style.display = 'block';
    var beforedate = new Date(new Date().setDate(new Date().getDate() - 30));
    var date = new Date();
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    $('#lblCurrent').text(months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear());
    $('#lblBefore').text(months[beforedate.getMonth()] + ' ' + beforedate.getDate() + ', ' + beforedate.getFullYear());
    var bfrdate = (beforedate.getMonth() + 1) + '/' + beforedate.getDate() + '/' + beforedate.getFullYear();
    var curdate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    $('#txtDateFrom').val(bfrdate);
    $('#txtDateTo').val(curdate);
    $("#usagetype").change(function () {
        changeUnit();
    });

});


colChildModel_Power = [
              { text: 'Date Of Reading', dataField: 'Usagedate', cellsformat: "MM/dd/yyyy", width: '20%', },
          { text: 'Customer Name', dataField: 'Customer Name', width: '20%' },
          { text: 'Account Type', dataField: 'Customer Type', width: '20%' },
          { text: 'Zip Code', dataField: 'ZipCode', width: '10%' },
          { text: 'City Name', dataField: 'CityName', width: '10%' },
          { text: 'Total Power Usage (kWh)', dataField: 'TotalUsage', width: '20%' },
          { text: 'AccountNumber', dataField: 'AccountNumber', width: '0', hidden: true },

];

//for 2nd grid after filter
function LoadChildGrid() {
    autoheightbool = false;
    if (databindtogrid.length == 0) {
        $('#jqxchildgrid').hide();
        $('#divnodata').show();
    }
    else {
        $('#jqxchildgrid').show();
        $('#divnodata').hide();
    }
    if (databindtogrid.length <= 10)
        autoheightbool = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
        { name: 'UsageDate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
        { name: 'Customer Name' },
        { name: 'Customer Type' },
        { name: 'ZipCode' },
        { name: 'CityName' },
        { name: 'TotalUsage', type: 'decimal' },
        { name: 'TotalWaterUsage', type: 'decimal' },
        { name: 'TotalGasUsage', type: 'decimal' },
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
    var supportsOrientationChange = "onorientationchange" in window,
     orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    window.addEventListener(orientationEvent, function () {
        var GridHeight = $(window).height() - 331;
        $("#jqxgrid").jqxGrid({ height: GridHeight });
        var modechild = ($('#ddlCity').val() != '') ? '2' : '1';
        if (modechild == 2) {
            $("#jqxchildgrid").jqxGrid({ height: GridHeight });
        }
    }, false);
    $("#jqxchildgrid").jqxGrid({

        width: "100%",
        height: "320",
        autoheight: autoheightbool,
        source: dataAdapter,

        sortable: true,
        selectionmode: 'checkbox', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        rendertoolbar: function (toolbar) {
            $("#btnSend").show();
        },
        columns: colModel_Power
  
    });
    

    $("#jqxchildgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1366) {
            $("#jqxchildgrid").jqxGrid('autoresizecolumns');
        }
    });
}


//For high chart
function PiechartCommon(mode, caseId) {
    var tempvalue;
    $('#div-subChart').show();
   // $('#chartDiv').height(100);
    $('#borderline').show();

   

    var tempvalue = usagetable.Table;
    var piechart = usagetable.Table1;

    if (piechart.length > 0) {
        $('#divnodata').hide();
        $('#chartDiv').show();
        $('#usagetitle').show();
    }
    else {
        $('#divnodata').show();
        $('#divnodata').html('<font color="Red">No Usage Data Available</font>');       
        $('#usagetitle').hide(); $('#chartDiv').hide();
    }

    //Removed title if dates are blank
    var title;
    if ($('#txtDateFrom').val() == "" && $('#txtDateTo').val() == "")
        title = "";
    else
        title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    $('#usagetitle').html("<b>" + title + "</b>");

    processed_json = new Array();
    var powerTotal = 0;
    var GasTotal = 0;
    var waterTotal = 0;
    var unittype;
    var ColorValue;
   // var projectedUsage = 89.86;
    switch (mode) {
        case 0:
        case 1:
            if (unit == 1) {
                unittype = "$";
                $.map(piechart, function (obj, i) {
                    processed_json.push({
                        name: obj.UsageDate.slice(0,-5),
                        y: obj.TotalUsageDollar,
                        color: 'rgba(48, 205, 148, 0.498039)',
                        title: 'Power'
                    });
                });
                ColorValue = 'rgba(48, 205, 148, 0.498039)';
                tempvalue.forEach(function (obj, i) {                   
                    $('#lblActualUsage').text('$' + changetoK(obj.TotalUsageDollar));
                    $('#lblProjectedUsage').text('$' + changetoK(obj.ProjectedUsageDollar));
                });
            }
            else {
                unittype = "kWh";
                $.map(piechart, function (obj, i) {
                    processed_json.push({
                        name: obj.UsageDate.slice(0, -5),
                        y: obj.TotalUsageKWH,
                        color: 'rgba(48, 205, 148, 0.498039)',
                        title: 'Power'
                    });
                });
                ColorValue = 'rgba(48, 205, 148, 0.498039)';
                tempvalue.forEach(function (obj, i) {
                    $('#lblActualUsage').text(changetoK(obj.TotalUsageKWH) + ' kWh');
                    $('#lblProjectedUsage').text(changetoK(obj.ProjectedUsage) + ' kWh');
                });
            }


            break;
        case 2:
            if (unit == 1) {
                unittype = "$";
                $.map(piechart, function (obj, i) {
                    processed_json.push({
                        name: obj.UsageDate.slice(0, -5),
                        y: obj.TotalUsageDollar,
                        color: 'rgba(50, 210, 201, 0.498039)',
                        title: 'Water'
                    });
                });
                ColorValue = 'rgba(50, 210, 201, 0.498039)';
                tempvalue.forEach(function (obj, i) {
                    $('#lblActualUsage').text('$' + changetoK(obj.TotalUsageDollar));
                    $('#lblProjectedUsage').text('$' + changetoK(obj.ProjectedUsageDollar));
                });
            }
            else if (unit == 2) {
                unittype = "Gal";
                $.map(piechart, function (obj, i) {
                    processed_json.push({
                        name: obj.UsageDate.slice(0, -5),
                        y: obj.TotalUsageGL,
                        color: 'rgba(50, 210, 201, 0.498039)',
                        title: 'Water'
                    });
                });
                ColorValue = 'rgba(50, 210, 201, 0.498039)';
                tempvalue.forEach(function (obj, i) {
                    $('#lblActualUsage').text(changetoK(obj.TotalUsageGL) + ' Gal');
                    $('#lblProjectedUsage').text(changetoK(obj.ProjectedUsageGallon) + ' Gal');
                });
            }
            else {
                unittype = "HCF";
                $.map(piechart, function (obj, i) {
                    processed_json.push({
                        name: obj.UsageDate.slice(0, -5),
                        y: obj.TotalUsageHCF,
                        color: 'rgba(50, 210, 201, 0.498039)',
                        title: 'Water'
                    });
                });
                ColorValue = 'rgba(50, 210, 201, 0.498039)';
                tempvalue.forEach(function (obj, i) {
                    $('#lblActualUsage').text(changetoK(obj.TotalUsageHCF) + ' HCF');
                    $('#lblProjectedUsage').text(changetoK(obj.ProjectedUsage) + ' HCF');
                });
            }
            break;
        case 3:
            if (unit == 1) {
                unittype = "$";
                $.map(piechart, function (obj, i) {
                    processed_json.push({
                        name: obj.UsageDate.slice(0, -5),
                        y: obj.TotalUsageDollar,
                        color: 'rgba(237, 93, 93, 0.498039)',
                        title: 'Gas'
                    });
                });
                ColorValue = 'rgba(237, 93, 93, 0.498039)';
                tempvalue.forEach(function (obj, i) {
                    $('#lblActualUsage').text('$' + changetoK(obj.TotalUsageDollar));
                    $('#lblProjectedUsage').text('$' + changetoK(obj.ProjectedUsageDollar));
                });
            }
            else {
                unittype = "CCF";
                $.map(piechart, function (obj, i) {
                    processed_json.push({
                        name: obj.UsageDate.slice(0, -5),
                        y: obj.TotalUsageCCF,
                        color: 'rgba(237, 93, 93, 0.498039)',
                        title: 'Gas'
                    });
                });
                ColorValue ='rgba(237, 93, 93, 0.498039)';
                tempvalue.forEach(function (obj, i) {
                    $('#lblActualUsage').text(changetoK(obj.TotalUsageCCF)+' CCF');
                    $('#lblProjectedUsage').text(changetoK(obj.ProjectedUsage) + ' CCF');
                });
            }
            break;

    }
    var type;
    if ($('#usagetype').val() == "power") {
        type = "POWER";
    }
    else if ($('#usagetype').val() == "water") {
        type = "WATER";
    }
    else{
        type = "GAS";
    }
    BindheighUsageAdminreport('areaspline', 'chartDiv', type, unittype, ColorValue);
}
    
    


$(document).on("click", ".filterdrop", function () {
    var idCity = this.id;
    $('#ddlCity').val(idCity);
    var obj = $('#ddlCity option:selected');
    if (obj.index() > 0) {
        submit();
    }
});


$(document).ready(function () {
    unit = 2; mode = 1;
    $('#dollar').css('color', '#2dadc8');
    $('#dollar').css({ 'font-weight': 'bold' });
    //code for resize grid by anuj
    $(window).resize(function () {
        try {
            if (gridid == 'jqxchildgrid') {
                if ($(window).width() < 1366) {
                    $("#jqxchildgrid").jqxGrid('autoresizecolumns');
                }
                else {
                    LoadChildGrid();
                }
            }
            else {
                if ($(window).width() < 1100) {
                    $("#jqxgrid").jqxGrid('autoresizecolumns');
                }
                else {
                    LoadGrid();
                }
            }
        }
        catch (e) { }
    });
    /////set units value acording to click
    $('#dollar').click(function () {
        $('#dollar').css('color', '#2dadc8');
        $('#dollar').css({ 'font-weight': 'bold' });
        $('#Kwh').css('color', 'black');
        $('#Kwh').css({ 'font-weight': 'normal' });
        $('#gl').css('color', 'black');
        $('#gl').css({ 'font-weight': 'normal' });
        $('#hcf').css('color', 'black');
        $('#hcf').css({ 'font-weight': 'normal' });
        $('#ccf').css('color', 'black');
        $('#ccf').css({ 'font-weight': 'normal' });
        unit = 1; mode = 1;
        changeUnit();
        $('#hdnParamValues').val($('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|' + mode + '|||' + unit);
    });
    $('#Kwh').click(function () {
        unit = 2; mode = 1;
        changeUnit();
        $('#Kwh').css('color', '#2dadc8');
        $('#Kwh').css({ 'font-weight': 'bold' });
        $('#dollar').css('color', 'black');
        $('#dollar').css({ 'font-weight': 'normal' });
        $('#hdnParamValues').val($('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|' + mode + '|||' + unit);
    });
    $('#gl').click(function () {
        $('#gl').css('color', '#2dadc8');
        $('#gl').css({ 'font-weight': 'bold' });
        $('#hcf').css('color', 'black');
        $('#hcf').css({ 'font-weight': 'normal' });
        $('#dollar').css('color', 'black');
        $('#dollar').css({ 'font-weight': 'normal' });
        unit = 2;
        changeUnit();
        mode = 2;
        $('#hdnParamValues').val($('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|' + mode + '|||' + unit);
    });
    $('#hcf').click(function () {
        $('#hcf').css('color', '#2dadc8');
        $('#hcf').css({ 'font-weight': 'bold' });
        $('#gl').css('color', 'black');
        $('#gl').css({ 'font-weight': 'normal' });
        $('#dollar').css('color', 'black');
        $('#dollar').css({ 'font-weight': 'normal' });
        unit = 3; mode = 2;
        changeUnit();
        $('#hdnParamValues').val($('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|' + mode + '|||' + unit);
    });
    $('#ccf').click(function () {
        $('#ccf').css('color', '#2dadc8');
        $('#ccf').css({ 'font-weight': 'bold' });
        $('#dollar').css('color', 'black');
        $('#dollar').css({ 'font-weight': 'normal' });
        unit = 2; mode = 3;
        changeUnit();
        $('#hdnParamValues').val($('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|' + mode + '|||' + unit);
    });
    //code end
    $('#gridVw').click(function () {
        defOpen = 1;
        chartgraphsection(defOpen);
        LoadGrid();//Bug Id 22636
    });
    $('#chartView').click(function () {
        defOpen = 2;
        chartgraphsection(defOpen);

    });
   
    $('#btnSend').click(function () {
        SendNotification();

        return false;
    });

    $('#pdfExport').click(function () {
        Usage1.pdfExport();
        return false;
    });


    chartdivid = 'div-Usagechart';

    changeUnit();

    $('.imgtoggle').click(function () {

        $('.content').slideToggle('slow');
        var oldSrc = $('.imgtoggle').attr('src');
        var minusImg = "..\\images\\ArrowsMinus.png";
        var plusImg = "..\\images\\ArrowsPlus.png";
        oldSrc = oldSrc == minusImg ? plusImg : minusImg;
        $('.imgtoggle').attr('src', oldSrc);
    });
    $('#btnFilter').click(function () {
        var bfrdate = $('#txtDateTo').val().split('/');
        var aftdate = $('#txtDateFrom').val().split('/');
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $('#lblCurrent').text(months[bfrdate[0] - 1] + ' ' + bfrdate[1] + ', ' + bfrdate[2]);
        $('#lblBefore').text(months[aftdate[0] - 1] + ' ' + aftdate[1] + ', ' + aftdate[2]);
        changeUnit();
    });
       


    // START NEW UI 10/1/2015
    $("#ddlMessageMode").change(function (i, obj) {
        var opt = $(this).val();
        showhideeditor(opt);

    });




    $("#ClosePopupAddTopic").click(function () {
        Popup.hide('PopupAddTopic');
    });

    $('#btnRemoveFile').hide();
    showhideeditor($("#ddlMessageMode").val());

    // END NEW UI 10/1/2015


});

function submit() {
    try {
        //loader.showloader();
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();

        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                // loader.hideloader();
                return false;
            }
        }
        else if (startDate == "") {
            alert("Please select From date");
            return false;
        }
        else if (endDate == "") {
            alert("Please select To date");
            return false;
        }
        loader.showloader();
        var city = '';
        var zip = '';
        if (ValidatePage('divFilter')) {
            if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
                var ddlCity = $('#ddlCity option:selected');
                if ($(ddlCity).attr('key') == 'CityName') {
                    city = $(ddlCity).val();
                }
                if ($(ddlCity).attr('key') == 'Zipcode') {
                    zip = $(ddlCity).val();
                }
            }

            var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
            var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();

            var ddlAccountType = ($('#ddlAccountType').val() == '--Select--' || $('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();

         
            var param = {
                datefrom: dtFrom,
                dateto: dtTo,
                mode: mode,
                cityid: city,
                zip: zip,
                customertype: ddlAccountType

            }
            //$('#hdnParamValues').val(convertlocaltoutc(dtFrom) + '|' + convertlocaltoutc(dtTo) + '|' + mode + '|' + city  + '|' + ddlAccountType + '|' + unit);
            $('#hdnParamValues').val(dtFrom + '|' + dtTo + '|' + mode + '|' + city + '|' + ddlAccountType + '|' + unit);

            $.ajax({
                type: "POST",
                url: "Usage1.aspx/LoadGridData",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(param),
                success: OnSuccess,
                error: OnError
            });
        }
        else {
            loader.hideloader();
            return false;
        }

    }
    catch (e) { }
}

function OnError(request, status, error) {
    loader.hideloader();
    alert('Error!! ' + request.statusText);
}

function OnSuccess(data, status) {
    data = data.d;
    var result = $.parseJSON(data);
    //databindtogrid = (mode > 1 && mode != 5) ? result.Table2 : result.Table3;
    usagetable = result;
    databindtogrid = result.Table1;

    if (databindtogrid.length == 0) {
        $('#jqxgrid').hide(); $('#divnodata').show();
        $('#jqxchildgrid').hide(); $('#chartDiv').hide();
        $('#usagetitle').hide(); //$('#graphdivarea').hide();
        $('#divnodata').html('<font color="Red">No Usage Data available</font>');
        PiechartCommon(mode);
    }
    else
    {
        PiechartCommon(mode);
        chartgraphsection(defOpen);

        if (mode > 0) {           
            if (databindtogrid.length <= 10)
                autoheightPrimary = true;
            $('#jqxgrid').show();
            $('#jqxchildgrid').hide();
            gridid = 'jqxgrid';
            LoadGrid();
        }
        else {
            $('#jqxgrid').show();
            $('#jqxchildgrid').hide();
            gridid = 'jqxgrid';
            LoadGrid();
           
        }
    }
    loader.hideloader();
}

function nodatashow() {
    $('#divnodata').show();
    $('#jqxgrid').hide();
    $('#jqxchildgrid').hide();
    $('#chartDiv').hide();
}

// START NEW UI 10/1/2015



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


function showhideeditor(opt) {
    if (opt == 1) {
        $(".email").show();
        $(".texttype").addClass('hide');
        $("#txtMessage").removeAttr('mandatory', '1');
        $("#txtEditor").attr('mandatory', '1');
        $("#txtmsgsubject").attr('mandatory', '1');
    }
    else {
        $(".email").hide();
        $(".texttype").removeClass('hide');
        $("#txtMessage").attr('mandatory', '1');
        $("#txtEditor").removeAttr('mandatory');
        $("#txtmsgsubject").attr('mandatory', '0');
        // getLength();
    }
}

//function GetFileSize(fileid) {
//    if ($('#fileupd').val() != '') {
//        try {
//            var fileSize = 0;
//            //for IE
//            if ($.browser.msie) {
//                //before making an object of ActiveXObject, 
//                //please make sure ActiveX is enabled in your IE browser
//                var objFSO = new ActiveXObject("Scripting.FileSystemObject"); var filePath = $("#" + fileid)[0].value;
//                var objFile = objFSO.getFile(filePath);
//                var fileSize = objFile.size; //size in kb
//                fileSize = fileSize / 1048576; //size in mb 
//                if (fileSize >= 5) {
//                    alert("File size exceeds 5 MB. Please try uploading smaller size file.")
//                    return false;
//                }
//            }
//                //for FF, Safari, Opeara and Others
//            else {
//                fileSize = $('#fileupd')[0].files[0].size //size in kb
//                //fileSize = $("#fUpload")[0].files[0].size //size in kb
//                fileSize = fileSize / 1048576; //size in mb
//                if (fileSize >= 5) {
//                    alert("File size exceeds 5 MB. Please try uploading smaller size file.")
//                    return false;
//                }
//            }
//        }
//        catch (e) {
//        }
//    }
//    else {
//        if ($("#txtEditor").val() == '') {
//            alert("Please enter message");
//            return false;
//        }
//        else {
//            if ($('#ddltypeofmessage').val() == '0') {
//                alert("Please select type of message.");
//                return false;
//            }

//            if ($('#txtmsgsubject').val() == '' && $('#ddlMessageMode').val() == 1) {
//                alert('Please enter subject.');   //alert("Please enter subject. " + $('#ddlMessageMode').val());
//                return false;
//            }
//            else
//                return true;
//        }
//    }
//}

function File_OnChange(sender) { $('#btnRemoveFile').show(); }
function removeFile() {
    $('#fileupd').val('');
    var control = $("#fileupd");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    return false;
}

function getLength() {
    var textbox = $("#ddlMessageMode").val();
    var txtbxlength = (textbox == 0 || textbox == 2) ? 200 : 500;
    document.getElementById("spanTxt").innerHTML = "Max Characters:" + txtbxlength;

    var txtMessage = $("#txtMessage").val();
    if (txtMessage.trim().length >= txtbxlength) {
        $("#txtMessage").val(txtMessage.substring(0, txtbxlength));
    }

}

function removeFile() {
    $('#fileupd').val('');
    var control = $("#fileupd");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    return false;
}

// END NEW UI 10/1/2015




function changeUnit() {  
    if ($('#usagetype').val() == "power") {
        document.getElementById('power_unit').style.display = 'block';
        document.getElementById('water_unit').style.display = 'none';
        document.getElementById('gas_unit').style.display = 'none';
        mode = 1;
        if (unit == 1) {
            $('#dollar').css('color', '#2dadc8');
            $('#dollar').css({ 'font-weight': 'bold' });
            $('#Kwh').css('color', 'black');
            $('#Kwh').css({ 'font-weight': 'normal' });
            colModel_Power = [
               { text: 'Usage Date', dataField: 'UsageDate', width: '50%', cellsformat: "MMMM,yyyy"},
               //{ text: 'City Name', dataField: 'CityName', hidden: true },
               { text: 'Total Power Usage ($)', dataField: 'TotalUsageDollar', width: '50%' }

            ];
        }
        else {
            $('#Kwh').css('color', '#93d400');
            $('#Kwh').css({ 'font-weight': 'bold' });
            $('#dollar').css('color', 'black');
            $('#dollar').css({ 'font-weight': 'normal' });
            colModel_Power = [
              { text: 'Usage Date', dataField: 'UsageDate', width: '50%', cellsformat: "MMMM,yyyy" },
              //{ text: 'City Name', dataField: 'CityName', hidden: true },
              { text: 'Total Power Usage (kWh)', dataField: 'TotalUsageKWH', width: '50%' }

            ];
        }
    }
    else if ($('#usagetype').val() == "water") {
        document.getElementById('power_unit').style.display = 'none';
        document.getElementById('water_unit').style.display = 'block';
        document.getElementById('gas_unit').style.display = 'none';
        mode = 2;
        if (unit == 1) {
            $('#dollar').css('color', '#93d400');
            $('#dollar').css({ 'font-weight': 'bold' });
            $('#hcf').css('color', 'black');
            $('#hcf').css({ 'font-weight': 'normal' });
            $('#gl').css('color', 'black');
            $('#gl').css({ 'font-weight': 'normal' });
            colModel_Power = [
                     { text: 'Usage Date', dataField: 'UsageDate', width: '50%', cellsformat: "MMMM,yyyy" },
                    //{ text: 'City Name', dataField: 'CityName',cellsrenderer: imagerenderer, hidden: true },
                    { text: 'Total Water Usage ($)', dataField: 'TotalUsageDollar', width: '50%' }

            ];
                     
        }
        else if (unit == 3) {
            $('#hcf').css('color', '#93d400');
            $('#hcf').css({ 'font-weight': 'bold' });
            $('#dollar').css('color', 'black');
            $('#dollar').css({ 'font-weight': 'normal' });
            $('#gl').css('color', 'black');
            $('#gl').css({ 'font-weight': 'normal' });
            colModel_Power = [
                        { text: 'Usage Date', dataField: 'UsageDate', width: '50%', cellsformat: "MMMM,yyyy" },
                       //{ text: 'City Name', dataField: 'CityName',cellsrenderer: imagerenderer, hidden: true },
                       { text: 'Total Water Usage (HCF)', dataField: 'TotalUsageHCF', width: '50%' }
            ];

        }
        else {
            $('#gl').css('color', '#93d400');
            $('#gl').css({ 'font-weight': 'bold' });
            $('#dollar').css('color', 'black');
            $('#dollar').css({ 'font-weight': 'normal' });
            $('#hcf').css('color', 'black');
            $('#hcf').css({ 'font-weight': 'normal' });
            colModel_Power = [
                   { text: 'Usage Date', dataField: 'UsageDate', width: '50%', cellsformat: "MMMM,yyyy" },
                  //{ text: 'City Name', dataField: 'CityName',cellsrenderer: imagerenderer, hidden: true },
                  { text: 'Total Water Usage (Gal)', dataField: 'TotalUsageGL', width: '50%' }

            ];

        }
    }
    else if ($('#usagetype').val() == "gas") {
        document.getElementById('power_unit').style.display = 'none';
        document.getElementById('water_unit').style.display = 'none';
        document.getElementById('gas_unit').style.display = 'block';
        mode = 3;

        if (unit == 1) {
            $('#dollar').css('color', '#93d400');
            $('#dollar').css({ 'font-weight': 'bold' });
            $('#ccf').css('color', 'black');
            $('#ccf').css({ 'font-weight': 'normal' });
            colModel_Power = [
                     { text: 'Usage Date', dataField: 'UsageDate', width: '50%', cellsformat: "MMMM,yyyy" },
                    //{ text: 'City Name', dataField: 'CityName', hidden: true },
                    { text: 'Total Gas Usage ($)', dataField: 'TotalUsageDollar', width: '50%' }
            ];         

        }
        else {
            $('#ccf').css('color', '#93d400');
            $('#ccf').css({ 'font-weight': 'bold' });
            $('#dollar').css('color', 'black');
            $('#dollar').css({ 'font-weight': 'normal' });
            colModel_Power = [
                   { text: 'Usage Date', dataField: 'UsageDate', width: '50%', cellsformat: "MMMM,yyyy" },
                  //{ text: 'City Name', dataField: 'CityName', hidden: true },
                  { text: 'Total Gas Usage (CCF)', dataField: 'TotalUsageCCF', width: '50%' }
            ];

        }
    }
    submit();  
}