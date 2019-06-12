var mode = '1';
var paperlessbilltable = {};
var databindtogrid, PaperlessBillData, Tables;
TitleExport = 'paperlessbill-report';
gridid = 'jqxgrid';
var divId = 'div-paperlessbillChart';
var autoheightbool = false;
var autoheightPrimary = false;
var defOpen = 1;
var piechart = '';


var imagerenderer = function (row, datafield, value) {
    return getresult(row, value);
}
function getresult(row, value) {
    var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;

    return '<div style="text-align: left;"><span id=' + cityId + ' class=filterdrop >' + value + '</span></div>';

}
//on page load
function LoadGrid() {
    autoheightPrimary = false;
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
        { name: 'CityName' },
              { name: 'CityId', type: 'number' },
         { name: 'Cnt', type: 'number' }
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
    $("#jqxgrid").jqxGrid({
        //autoheight: autoheightPrimary,
       
        width:"100%",
        source: dataAdapter,
        
        height: GridHeight * .79,
        columnsheight: 38,
        theme: 'darkblue',
        altrows: true,
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event

        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,

        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'City Name', dataField: 'CityName', width: '50%', cellsrenderer: imagerenderer },
            { text: 'Paperless Bill Count', dataField: 'Cnt', width: '50%', cellsrenderer: imagerenderer }
        ]
    });
}

function LoadChildGrid() {
    autoheightbool = false;
    if (databindtogrid.length <= 10)
        autoheightbool = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
        { name: 'FirstName' },
        { name: 'LastName' },
         { name: 'EmailID' },
         { name: 'CityName' },
         { name: 'ZipCode', type: 'number' },
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );


    $("#jqxchildgrid").jqxGrid({
        width: "100%",
        autoheight: autoheightbool,
        height: "320",
        source: dataAdapter,
        theme: 'darkblue',
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event

        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,

        columnsresize: true,
        columnsreorder: true,
        enabletooltips: true,
        columns:
        [
            { text: 'First Name', dataField: 'FirstName', width: '20%' },
            { text: 'Last Name', dataField: 'LastName', width: '20%' },
            { text: 'Email', dataField: 'EmailID', width: '20%' },
            { text: 'City Name', dataField: 'CityName', width: '20%' },
            { text: 'Zip Code', dataField: 'ZipCode', width: '20%' },
        ]
    });

    $("#jqxchildgrid").on('bindingcomplete', function () {
        if ($(window).width() < 600) {
            $("#jqxchildgrid").jqxGrid('autoresizecolumns');
        }
    });
}

//For high 
function PiechartCommon(mode, caseId) {
    piechart = (mode == '1') ? paperlessbilltable.Tables[0] : paperlessbilltable.Tables[1];
    //To remove title if dates are blank
    var title;
    if ($('#txtDateFrom').val() != "" && $('#txtDateTo').val() != "")
        title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    else
        title = "";
    //var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    $('#PaperlessTitle').html(title);
    if (piechart.Rows.length > 0) {
        $('#div-paperlessbillChart').show();
        $('#nodata_div').hide();
        $('#nodata_div1').hide();
    }
    else {
        $('#nodata_div').show();
        $('#nodata_div1').show();
        $('#nodata_div').html('<font color="Red">No Data</font>');
        $('#nodata_div1').html('<font color="Red">No Data</font>');
        $('#div-paperlessbillChart').hide();
        $('#notifytitle').hide();
        $('#jqxgrid').hide();
        $('#jqxchildgrid').hide();
        $('#grid-section').hide();
    }
    var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    $('#notifytitle').html(title);

    processed_json = new Array();
    $.map(piechart.Rows, function (obj, i) {
        processed_json.push({
            name: mode =obj.CityName ,
            y: mode = obj.Cnt ,
            color: colorarrHEX[i],
            title: mode = obj.CityName
        });
    });
    createchart(caseId, divId); //function writtion in common-function.js
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

    $(window).resize(function () {
        try {
            if (gridid == 'jqxchildgrid') {
                if ($(window).width() < 600)
                    $("#jqxchildgrid").jqxGrid('autoresizecolumns');
                else {
                    LoadChildGrid();
                }
            }
        }
        catch (e) { }
    });

    //var date = new Date();
    //$('#txtDateFrom').val((date.getMonth() + 1) + '/1/' + (date.getFullYear()));
    //$('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    chartdivid = 'div-paperlessbillChart';
    //For mutually Exclusive search Criteria
    var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : convertlocaltoutc($('#txtDateTo').val());
    // paperlessbilltable = PaperlessBill.LoadGrid(mode, $('#txtDateFrom').val(), dtTo, '', '', '');
    
    var param = { 'mode': mode, 'datefrom': $('#txtDateFrom').val(), 'dateto': dtTo, 'cityid': '', 'zipcode': '', 'customername': '' };
    CallAjax(Error, param);
    ConvertData();
    
    $('#hdnParamValues').val(mode +'|'+ $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|||');
    if (paperlessbilltable.Tables.length != null && paperlessbilltable.Tables.length != 0) {
        databindtogrid = paperlessbilltable.Tables[0].Rows;
        LoadGrid();
        if (defOpen == 2)
        PiechartCommon(mode);
    }
    else{
        $('#nodata_div').show();
        $('#nodata_div1').show();
        $('#nodata_div').html('No Data');
        $('#nodata_div1').html('No Data');
        $('#div-paperlessbillChart').hide();
        $('#notifytitle').hide();
    }

    //$("#ddlCity").change(function () {
    //    var obj = $('#ddlCity option:selected');
    //    if (obj.index() > 0) {
    //        LoadUserZipcode($(obj).text());
    //    }
    //    else {
    //        $('#ddluserzipcode').empty();
    //    }
    //});
    $('.imgtoggle').click(function () {

        $('.content').slideToggle('slow');
        var oldSrc = $('.imgtoggle').attr('src');
        var minusImg = "..\\images\\ArrowsMinus.png";
        var plusImg = "..\\images\\ArrowsPlus.png";
        oldSrc = oldSrc == minusImg ? plusImg : minusImg;
        $('.imgtoggle').attr('src', oldSrc);
    });
    $('#btnFilter').click(function () {
        submit();
        chartgraphsection(defOpen);
    });

    $("#btnexcelExport").click(function () {
        try {

            document.getElementById('graphDiv').style.display = 'block';

            if (gridid == 'jqxgrid')
                LoadGrid();
            else
                LoadChildGrid();
            $("#" + gridid).jqxGrid('exportdata', 'xls', 'Paper Less Report');
            document.getElementById('graphDiv').style.display = 'none';
            if (defOpen == 1)
                document.getElementById('graphDiv').style.display = 'block';

        } catch (e) {
            if (defOpen == 1)
                document.getElementById('graphDiv').style.display = 'block';
            else {
                document.getElementById('graphDiv').style.display = 'none';
            }
        }
    });
});
function submit() {
    try
    {
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();
        //For mutually Exclusive search Criteria
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
                //alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }

        mode = ($('#ddlCity').val() != '') ? '2' : '1';
        var city = "";
        var zip = "";
        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        //var ddlCity = ($('#ddlCity').val() == null || $('#ddlCity').val() == '') ? '' : $('#ddlCity').val();
        var txtSearch = ($('#txtSearch').val() == null || $('#txtSearch').val() == '') ? '' : $('#txtSearch').val();
        if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
            var ddlCity = $('#ddlCity option:selected');
            if ($(ddlCity).attr('key') == 'CityName') {
                city = $(ddlCity).val();
            }
            if ($(ddlCity).attr('key') == 'Zipcode') {
                zip = $(ddlCity).val();
            }
        }
        //paperlessbilltable = PaperlessBill.LoadGrid(mode, dtFrom, dtTo, city, zip, txtSearch).value;
        var param = { 'mode': mode, 'datefrom': dtFrom, 'dateto': dtTo, 'cityid': city, 'zipcode': zip, 'customername': txtSearch };
        CallAjax(Error, param);
        ConvertData();
        databindtogrid = paperlessbilltable.Tables[0].Rows;


        //for pdf
        //bill not downloadble at page load as syntax was wrong here earlier
        $('#hdnParamValues').val(mode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + txtSearch);
             
        if (mode == '1') {
            $('#jqxgrid').show();
            $('#jqxchildgrid').hide();
            PiechartCommon(mode);
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
    }
    catch (e) { }
}

function CallAjax(fnError, param) {
    $.ajax({
        type: "POST",
        url: "PaperlessBill.aspx/LoadGrid",
        data: JSON.stringify(param),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //data: { id: 'k' },
        success: function (response, status, type) {
            PaperlessBillData = $.parseJSON(response.d);
        },
        error: fnError,
    })

}

function Error(e) {

    console.log(e);
}

function ConvertData() {
    try {
        Tables = new Array();
        $.map(PaperlessBillData, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        paperlessbilltable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}