var mode = '1';
var BehaviourTable;
var databindtogrid;
TitleExport = 'userbehavior-reportnew';
gridid = 'jqxgrid';
var divId = 'div-UserBehaviourchart';
var autoheightbool = false;
var autoheightPrimary = false;
var defOpen = 1;
var imagerenderer = function (row, datafield, value) {
    return getresult(row, value);
}
function getresult(row, value) {
    var ModuleName = $('#jqxgrid').jqxGrid('getrowdata', row).ModuleName;

    return '<div style="text-align: left;"><span id=' + ModuleName + ' class=filterdrop >' + value + '</span></div>';
}
//on page load
function LoadGrid() {
    autoheightPrimary = false;

    if (databindtogrid.length == 0) {
        $('#nodata_div').show();
        $('#jqxgrid').hide();
        $('#jqxchildgrid').hide();
    }
    else {
        $('#nodata_div').hide();
        $('#jqxgrid').show();
        $('#jqxchildgrid').hide();
    }

    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
        { name: 'SRNo', type: 'number' },
        { name: 'ModuleName' },
        { name: 'Clicks', type: 'number' },
        { name: 'IOSClicks', type: 'number' },
        { name: 'AndroidClicks', type: 'number' },
        { name: 'WebClicks', type: 'number' }

        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid,
        
    };

    var dataAdapter = new $.jqx.dataAdapter(source,
    { contentType: 'application/json; charset=utf-8' }
);


    $("#jqxgrid").jqxGrid({
        width: '100%',
        autoheight: autoheightPrimary,
        height: "310",
        source: dataAdapter,
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        //Start - changed header from 'No of clicks' to 'Clicks'
        columns:
    [
        { text: 'S.No', dataField: 'SRNo', width: '0%',hidden:true },
        { text: 'Module Name', dataField: 'ModuleName', width: '18%', cellsrenderer: imagerenderer },
         { text: 'Total Clicks', dataField: 'Clicks', width: '18%', cellsrenderer: imagerenderer },
        { text: 'Clicks(IOS)', dataField: 'IOSClicks', width: '20%', cellsrenderer: imagerenderer },
         { text: 'Clicks(Android)', dataField: 'AndroidClicks', width: '24%', cellsrenderer: imagerenderer },
           { text: 'Clicks(Web)', dataField: 'WebClicks', width: '20%', cellsrenderer: imagerenderer }
    ]
    });
    //End - changed header from No of clicks to Clicks
    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1000) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });
}

//for 2nd grid after filter
function LoadChildGrid() {
    autoheightbool = false;

    if (databindtogrid.length == 0) {
        $('#nodata_div').show();
        $('#jqxchildgrid').hide();
        $('#jqxgrid').hide();
    }
    else {
        $('#nodata_div').hide();
        $('#jqxchildgrid').show();
        $('#jqxgrid').hide();
        //chartgraphsection(1);
    }

    if (databindtogrid.length <= 10) {
        autoheightbool = true;
    }

    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
         { name: 'SRNo', type: 'number' },
          { name: 'AccountNumber', type: 'number' },
           { name: 'Customer Name' },
            { name: 'CityName' },
            { name: 'ZipCode', type: 'number' },
           { name: 'Module Name' },
           { name: 'OS' },
            { name: 'DateClickedOn', type: 'date', sorttype: "date", datefmt: "dd/MM/YYYY" },
           { name: 'TimeClickedOn', type: 'text' }

        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };

    var addfilter = function () {
        var filtergroup = new $.jqx.filter();
        var filter_or_operator = 1;
        var filtervalue = 'Beate';
        var filtercondition = 'contains';
        var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
        filtervalue = 'Andrew';
        filtercondition = 'starts_with';
        var filter2 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);

        filtergroup.addfilter(filter_or_operator, filter1);
        filtergroup.addfilter(filter_or_operator, filter2);
        // add the filters.
        $("#jqxchildgrid").jqxGrid('addfilter', 'Customer Name', filtergroup);
        // apply the filters.
        $("#jqxchildgrid").jqxGrid('applyfilters');
    }
    var dataAdapter = new $.jqx.dataAdapter(source,
    { contentType: 'application/json; charset=utf-8' }
);


    $("#jqxchildgrid").jqxGrid({

        width: "100%",
        autoheight: autoheightbool,
        height: "310",
        source: dataAdapter,
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        filterable: true,
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        autoshowfiltericon: false,
        columnsresize: true,
        columnsreorder: true,
        enabletooltips: true,
        columns: [
            { text: 'S.No', dataField: 'SRNo', width: '0%', hidden: true },
            { text: 'Acc.No', dataField: 'AccountNumber', width: '10%' },
            { text: 'Customer Name', dataField: 'Customer Name' },
            { text: 'City', dataField: 'CityName', width: '10%' },
            { text: 'Zip', dataField: 'ZipCode', width: '7%' },
            { text: 'Module Name', dataField: 'Module Name', width: '14%' },
            { text: 'Platform', dataField: 'OS', width: '10%' },
            { text: 'Date Clicked On', dataField: 'DateClickedOn', width: '16%', cellsformat: "MM/dd/yyyy" },
            { text: 'Time Clicked On', dataField: 'TimeClickedOn', width: '16%', cellsformat: "hh:mm:ss" }
        ]
    });

    $("#jqxchildgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1100) {
            $("#jqxchildgrid").jqxGrid('autoresizecolumns');
}
    });
}

//For high chart
function PiechartCommonOS(mode, caseId) {
    var piechart = (mode == '1') ? BehaviourTable.Tables[0] : BehaviourTable.Tables[1];
    var j = 0;
    for (var i = 0; i < piechart.Rows.length; i++) {
        if ((parseInt(piechart.Rows[i]['Clicks']) != 0) && (parseInt(piechart.Rows[i]['ModuleName']) != 0)) {
            j = 1;
            break;
        }
    }
    if (j == 0) {
        $('#div-UserBehaviourchart').hide();
        $('#UserBehaviourTitle1').hide();
        //$('#jqxgrid').hide();                 //code commented as it is already handled in mode on button click
        //$('#jqxchildgrid').hide();
        $('#nodata_div').show();
        $('#nodata_div1').show();
        $('#nodata_div').html('<font color="Red">No Data</font>');
        $('#nodata_div1').html('<font color="Red">No Data</font>');
    }
    else {
        $('#nodata_div').hide();
        $('#nodata_div1').hide();
        $('#div-UserBehaviourchart').show();
        // $('#jqxgrid').show();                 //code commented as it is already handled in mode  on button click
       // $('#jqxchildgrid').show();
    }

    processed_json = new Array();
    $.map(piechart.Rows, function (obj, i) {
        processed_json.push({
            name: mode == '1' ? obj.ModuleName : obj.ModuleName,
            y: mode == '1' ? obj.WebClicks : obj.Clicks,
            color: colorarrHEX[i],
            title: mode == '1' ? obj.ModuleName : obj.WebClicks
        });
    });
    createchart(caseId, divId); //function writtion in common-function.js
}

function chartclick(name, chartType, drilldown, type) {
    var piechart = BehaviourTable.Tables[0];
    var type = drilldown.trim() + 'Clicks';
    processed_json4 = new Array();
    $.map(piechart.Rows, function (obj, i) {
    
        processed_json4.push({
            name:obj.ModuleName,
            y: parseInt(obj[type]),
            color: colorarrHEX[i],
            title: obj.ModuleName
        });
    });
    return processed_json4;
}
function PiechartCommon(mode, caseId) {
    var piechart = (mode == '1') ? BehaviourTable.Tables[1] : BehaviourTable.Tables[1];
    mode == '1' ? PiechartCommonOS(mode, caseId) : $('#div-UserBehaviourchart').hide();
    //To remove title if dates are blank
    var title;
    if ($('#txtDateFrom').val() != "" && $('#txtDateTo').val() != "")
        title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    else
        title = "";
    //var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    var j = 0;
    for (var i = 0; i < piechart.Rows.length; i++) {
        if ((parseInt(piechart.Rows[i]['OSClicks']) != 0) && (parseInt(piechart.Rows[i]['OS']) != 0) && (parseInt(piechart.Rows[i]['Clicks']) != 0)) {
            j = 1;
            break;
        }
    }
    if (j == 0) {

        $('#div-UserBehaviourchartos').hide();
        $('#UserBehaviourTitle').hide();
      
        $('#nodata_div').show();
        $('#nodata_div1').show();
        $('#nodata_div').html('<font color="Red">No Data</font>');
        $('#nodata_div1').html('<font color="Red">No Data</font>');
    }
    else {
        $('#nodata_div').hide();
        $('#nodata_div1').hide();
        $('#div-UserBehaviourchartos').show();
        $('#UserBehaviourTitle').html(title);
    }
    processed_json = new Array();
    $.map(piechart.Rows, function (obj, i) {
        processed_json.push({
            name: mode == '1' ? obj.OS : obj.OS,
            y: mode == '1' ? obj.OSClicks : obj.OSClicks,
            color: colorarrHEX[i],
            title: mode == '1' ? obj.OS : obj.OS,
            drilldown: mode == '1' ?obj.OS:''
        });
    });
    createchart(caseId, 'div-UserBehaviourchartos');
}

function createchart1() {
    BindPieChart('div-UserBehaviourchartos', 'Count');
}
//end of pie chart

//function checkClientTimeZone() {

//    // Set the client time zone
//    var dt = new Date();
//    var tz = -dt.getTimezoneOffset();
//    UserBehaviour.Setcookie(tz.toString());
//    // Expire in one year
//    dt.setYear(dt.getYear() + 1);
//}
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
$(document).on("click", ".filterdrop", function () {
    var idCity = this.innerText;
    $('#ddlModule').val(idCity);
    var obj = $('#ddlModule option:selected');
    if (obj.index() > 0) {
        change();
        submit();
        
    }
});
$(document).ready(function () {

    $(window).resize(function () {
        try {
            if (gridid == 'jqxchildgrid') {
                if ($(window).width() < 1100) {
                    $("#jqxchildgrid").jqxGrid('autoresizecolumns');
                }
                else {
                    LoadChildGrid();
                }
            }
            else {
                if ($(window).width() < 1000) {
                    $("#jqxgrid").jqxGrid('autoresizecolumns');
                }
                else {
                    LoadGrid();
                }
            }
        }
        catch (e) { }
    });

    //checkClientTimeZone();
    //var date = new Date();
    //$('#txtDateFrom').val((date.getMonth() + 1) + '/1/' + (date.getFullYear()));
    //$('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    chartdivid = 'div-UserBehaviourchart';
    //For MultiExclusive Search Criteria
    var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : convertlocaltoutc($('#txtDateTo').val());
    BehaviourTable = UserBehaviour.LoadGridData(mode, $('#txtDateFrom').val(), dtTo, '', '', '', '').value;
    $('#hdnParamValues').val(mode + '|' + $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '||||||0');
    databindtogrid = BehaviourTable.Tables[0].Rows;
    $("#div-UserBehaviourchartos").css('width', GridWidth * .48).css('height', GridHeight*.7);
    $("#div-UserBehaviourchart").css('width', GridWidth * .52).css('height', GridHeight*.7);
    LoadGrid();
    //PiechartCommonOS(mode);
    //PiechartCommon(mode);


    $('#ddlModule').change(function () {
        change();
    });
    $('.imgtoggle').click(function () {

        $('.content').slideToggle('slow');
        var oldSrc = $('.imgtoggle').attr('src');
        var minusImg = "..\\images\\ArrowsMinus.png";
        var plusImg = "..\\images\\ArrowsPlus.png";
        oldSrc = oldSrc == minusImg ? plusImg : minusImg;
        $('.imgtoggle').attr('src', oldSrc);
    });
    //$("#ddlCity").change(function () {
    //    var obj = $('#ddlCity option:selected');
    //    if (obj.index() > 0) {
    //        LoadUserZipcode($(obj).text());
    //    }
    //    else {
    //        $('#ddluserzipcode').empty();
    //    }
    //});

    $('#btnFilter').click(function () {
        submit();
        chartgraphsection(defOpen);
    });


    $("#btnExcelExport").click(function () {
        try {

            document.getElementById('graphDiv').style.display = 'block';

            if (gridid == 'jqxgrid')
                LoadGrid();
            else
                LoadChildGrid();
            $("#" + gridid).jqxGrid('exportdata', 'xls', 'User Behaviour Report');
            document.getElementById('graphDiv').style.display = 'none';
            if (defOpen == 1)
                document.getElementById('graphDiv').style.display = 'block';

        } catch(e) {
            if (defOpen == 1)
                document.getElementById('graphDiv').style.display = 'block';
            else {
                document.getElementById('graphDiv').style.display = 'none';
            }
        }
    });
});
function change() {
    if ($('#ddlModule').find('option:selected').text() != '--Select--') {
        $('#divHide').removeClass('hide');
    }
    else {
        $('#divHide').addClass('hide');
        $('#ddlCity').val('');
        $('#ddluserzipcode').val('');
        $('#txtSearch').val('');
    }
}
function submit() {
    try
    {
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();
        //For MultiExclusive Search Criteria
        //if (!isDate(startDate)) {
        //    alert('Invalid From date format,Please select/enter MM/DD/YYYY.');
        //    $('#txtDateFrom').focus();
        //    return false;
        //}

        //if (!isDate(endDate)) {
        //    alert('Invalid To Date format,Please select/enter MM/DD/YYYY. ');
        //    $('#txtDateTo').focus();
        //    return false;
        //}

        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                //  alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }

        mode = ($('#ddlCity').val() != '' || $('#txtSearch').val() != '' || $('#ddlModule').val() != '') ? '2' : '1';
        var city = "";
        var zip = "";
        // var zip = ($('#ddluserzipcode').val() == null || $('#ddluserzipcode').val() == '') ? '' : $('#ddluserzipcode').val();
        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        // var ddlCity = ($('#ddlCity').val() == null || $('#ddlCity').val() == '') ? '' : $('#ddlCity').val();
        var txtSearch = ($('#txtSearch').val() == null || $('#txtSearch').val() == '') ? '' : $('#txtSearch').val();
        var ddlModule = ($('#ddlModule').val() == '--Select--' || $('#ddlModule').val() == null || $('#ddlModule').val() == '') ? '' : $('#ddlModule').val();
        if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
            var ddlCity = $('#ddlCity option:selected');
            if ($(ddlCity).attr('key') == 'CityName') {
                city = $(ddlCity).val();
            }
            if ($(ddlCity).attr('key') == 'Zipcode') {
                zip = $(ddlCity).val();
            }
        }
        BehaviourTable = UserBehaviour.LoadGridData(mode, dtFrom, dtTo, city, zip, txtSearch, ddlModule).value;

        //for pdf           //ddlcity removed and city parameter added
        $('#hdnParamValues').val(mode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + txtSearch + '|' + ddlModule);
        databindtogrid = BehaviourTable.Tables[0].Rows;

        if (databindtogrid.length == 0) {
            $('#jqxgrid').hide();
            $('#jqxchildgrid').hide();
            $('#nodata_div').show();
        }

            //code commented as there was no need for showing child grid here and it has been handled in modes
            //else {
            //    $('#jqxchildgrid').show();
            //}
        else if (mode == '1') {
            $('#jqxgrid').show();
            $('#jqxchildgrid').hide();
            PiechartCommon(mode);
           // PiechartCommonOS(mode);
            gridid = 'jqxgrid';
            LoadGrid();
       
      
        }
        else {
            $('#jqxgrid').hide();
            $('#jqxchildgrid').show();
            PiechartCommon(mode);
            gridid = 'jqxchildgrid';
            LoadChildGrid();
      
       
        }
    } catch (e) {
    }
}