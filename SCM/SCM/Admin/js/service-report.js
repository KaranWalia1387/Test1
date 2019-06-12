var Servicetable, CityID;
var defOpen = 1;
var mode = '1';
var databindtogrid;
TitleExport = 'service-report';
gridid = 'jqxgrid';
var divId = 'div-Servicechart';
var autoheightbool = false;
var autoheightPrimary = false;
var imagerenderer = function (row, datafield, value) {
    switch (datafield) {
        case 'City/ZipCode': return getView(row, value); break;
        default: return getresult(row, value); break;
}
    
}

function getView(row, value) {
    try {
        CityID = $('#jqxchildgrid').jqxGrid('getrowdata', row).CityId;
        //var servicePopup = $('#jqxgrid').jqxGrid('getrowdata', row)["CityName"];
        return '<div style="padding-left:5px;"><a class="details" href="#" data-id=' + CityID + ' data-backdrop="true" data-keyboard="true" data-toggle="modal" data-target=".userDetails">' + value + '</a></div>';

    }
    catch (ex) { }
}

function getresult(row, value) {
    var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;

    return '<div style="text-align: left;"><span id=' + cityId + ' class=filterdrop >' + value + '</span></div>';

}
//on page load
function LoadGrid() {
    autoheightPrimary = false;
    if (databindtogrid.length == 0) {
        $('#nodata_div').show();
    }
    else {
        $('#nodata_div').hide();
    }
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    var gridColumns = [];//Array used store grid column properties
    var dataFieldColumns = [];//Array used to store grid column datafield
    var colDataFieldArray = [];
    colDataFieldArray.push("CityName");
    colDataFieldArray.push("CityId");
    $('#ddlReason > option').each(function () {
        if (this.text.toLowerCase().indexOf('--reason--') < 0)
        colDataFieldArray.push(this.text);
    });
    colDataFieldArray.push("Total");
    for(var i=0;i<colDataFieldArray.length;i++){
        var colStr = $.trim(colDataFieldArray[i]);
        
        var colWidth = colStr.length + 1 + "%";
        //changes made for bug id 0006404
        if (colStr == 'CityName'){
            gridColumns.push({ text: 'City Name', dataField: colStr, width: '10%', cellsrenderer: imagerenderer });
            dataFieldColumns.push({ name: colStr });
        } 
        else if (databindtogrid[0][colStr] != null)
        {
                gridColumns.push({ text: colStr, dataField: colStr, width: colWidth, cellsrenderer: imagerenderer });
                dataFieldColumns.push({ name: colStr, type: 'number' });
        }
        //End Comment    
            
}
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: dataFieldColumns,
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
        
        width: "99%",
        autoheight: autoheightPrimary,
        height: GridHeight * .75,
        columnsheight: 38,
        theme: 'darkblue',
        altrows: true,
        source: dataAdapter,
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event

        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,

        columnsresize: true,
        columnsreorder: true,
        columns: gridColumns
    });

    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).size() < 1025) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });
}
//for 2nd grid after filter
function LoadChildGrid() {
    autoheightbool = false;
    if (databindtogrid.length == 0) {
        $('#nodata_div').show();
    }
    else {
        $('#nodata_div').hide();
    }
    if (databindtogrid.length <= 10)
        autoheightbool = true;
    //Getting the source data with ajax GET request
    var source = {
        datatype: "array",
        datafields: [
        { name: 'ServiceID', type: 'number' },
        { name: 'CustomerName' },
        { name: 'City/ZipCode' },
        { name: 'EmailID' },
        { name: 'Reason' },
        { name: 'NotificationBody' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var employeesAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    //var ordersSource = {
    //    datatype: "array",
    //    datafields: [
    //   { name: 'ServiceID', type: 'number' },
    //     { name: 'Reason' },
    //     { name: 'NotificationDate' },
    //     { name: 'NotificationBody' },
    //    ],
    //    async: false,
    //    root: "Orders",
    //    record: "Order",
    //    sortable: true,
    //    localdata: Servicetable.Tables[0].Rows
    //};
    //var ordersDataAdapter = new $.jqx.dataAdapter(ordersSource, { autoBind: true });
    //orders = ordersDataAdapter.records;
    ////create nested grid
    //var initrowdetails = function (index, parentElement, gridElement, record) {
    //    var id = record.uid.toString();
    //    var grid = $($(parentElement).children()[0]);
    //    var filtergroup = new $.jqx.filter();
    //    var filter_or_operator = 1;
    //    var filtervalue = id;
    //    var filtercondition = 'equal';
    //    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
    //    // fill the orders depending on the id.
    //    var ordersbyid = [];
    //    for (var m = 0; m < orders.length; m++) {
    //        var result = filter.evaluate(orders[m]["ServiceID"]);
    //        if (result)
    //            ordersbyid.push(orders[m]);
    //    }
    //    var orderssource = {
    //        datafields: [
    //            { name: 'ServiceID', type: 'string' },
    //            { name: 'Reason', type: 'string' },
    //            { name: 'NotificationDate', type: 'string' },
    //            { name: 'NotificationBody', type: 'string' }
    //        ],
    //        id: 'ServiceID',
    //        localdata: ordersbyid
    //    }
    //    if (grid != null) {
    //        grid.jqxGrid({
    //            //source: orderssource, theme: 'darkblue', width: 930, height: 52, enabletooltips: true,
    //            source: orderssource, theme: 'darkblue', width: 930, height: 52, enabletooltips: true, //4871
    //            columns: [
    //              { text: 'ServiceID', datafield: 'ServiceID', hidden: true },
    //              { text: 'Reason', datafield: 'Reason', width: '20%' },
    //              { text: 'Notification Date', datafield: 'NotificationDate', width: '19%' },
    //              { text: 'Notification Body', datafield: 'NotificationBody', width: '61%' }
    //            ]
    //        });
    //    }
    //}

    $("#jqxchildgrid").jqxGrid({
        width: "98%",
        autoheight: autoheightPrimary,
        height: "320",
        autorowheight: true,
        source: employeesAdapter,
        theme: 'darkblue',
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        enabletooltips: true,
        //rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 3px;'></div>", rowdetailsheight: 120, rowdetailshidden: true },
        //ready: function () {
        //},
        columns:
        [
            { text: 'ServiceID', dataField: 'ServiceID', width: '10%' },
            { text: 'Customer Name', dataField: 'CustomerName', width: '12%' },
            { text: 'City/ZipCode', dataField: 'City/ZipCode', width: '15%', cellsrenderer: imagerenderer },
            { text: 'EmailID', dataField: 'EmailID', width: '18%' },
            { text: 'Reason', dataField: 'Reason', width: '15%' },
            { text: 'Comment', dataField: 'NotificationBody', width: '26%' }
        ]
    });

    $("#jqxchildgrid").on('bindingcomplete', function () {
        if ($(window).size() < 1025) {
            $("#jqxchildgrid").jqxGrid('autoresizecolumns');
        }
    });
}

//For high chart
function PiechartCommon(mode, caseId) {
    var piechart = (mode == '1') ? Servicetable.Tables[0] : Servicetable.Tables[2];
    if (piechart.Rows.length > 0) {
        $('#div-Servicechart').show();
        $('#nodata_div').hide();
        $('#nodata_div1').hide();
    }
    else {
        $('#nodata_div').show();
        $('#nodata_div1').show();
        $('#nodata_div').html('<font color="Red">No Data</font>');
        $('#nodata_div1').html('<font color="Red">No Data</font>');
        $('#div-Servicechart').hide();
        $('#ServiceTitle').hide();
    }

    //To remove title if dates are blank
    var title;
    if ($('#txtDateFrom').val() != "" && $('#txtDateTo').val() != "")
        title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    else
        title = "";
    //var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    $('#ServiceTitle').html(title);

    processed_json = new Array();
    $.map(piechart.Rows, function (obj, i) {
        processed_json.push({
            name: mode == '1' ? obj.CityName : obj.Reason,
            y: mode == '1' ? obj.Total : obj.Cnt_Reason,
            color: colorarrHEX[i],
            title: mode == '1' ? obj.CityName : obj.Reason,
            drilldown:mode == '1' ?"service":""
        });
        
    });
    

    createchart(caseId, divId,'Main');
}

function chartclick(name, chartType, drilldown, type) {
 
    var tblDrill = Servicetable.Tables[2];
    processed_json2 = new Array();
    $.map(tblDrill.Rows, function (obj, i) {
       
        var value = parseInt(obj[name.trim()] == '' ? 0 : obj[name.trim()]);
        var reason = obj["Reason"];
        if (reason.toLowerCase() != 'cityid' && value != '0' && reason.toLowerCase() != 'total') {
            processed_json2.push({
                name: reason,
                y: value,
                color: colorarrHEX[i],
                title: reason
            });
        }
    });
    return processed_json2;
}


//function checkClientTimeZone() {

//    // Set the client time zone
//    var dt = new Date();
//    var tz = -dt.getTimezoneOffset();
//    Service.Setcookie(tz.toString());
//    // Expire in one year
//    dt.setYear(dt.getYear() + 1);
//}
$(document).on("click", ".filterdrop", function () {
    var idCity = this.id;
    $('#ddlCity').val(idCity);
    var obj = $('#ddlCity option:selected');
    if (obj.index() > 0) {
        submit();
    }
});
$(document).ready(function () {
    //checkClientTimeZone();
    //var date = new Date();
    //$('#txtDateFrom').val((date.getMonth() + 1) + '/1/' + (date.getFullYear()));
    //$('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    chartdivid = 'div-Servicechart';
    //For Mutually Exclusive Search Criteria
    var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : convertlocaltoutc($('#txtDateTo').val());
    Servicetable = Service.LoadGridData(mode, $('#txtDateFrom').val(), dtTo, '', '', '', '').value;
    $('#hdnParamValues').val(mode + '|' + $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '||||||0');
    databindtogrid = Servicetable.Tables[0].Rows;

    LoadGrid();
   

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


    $("#btnExcelExport").click(function () {
        try {

            document.getElementById('graphDiv').style.display = 'block';

            if (gridid == 'jqxgrid')
                LoadGrid();
            else
                LoadChildGrid();
            $("#" + gridid).jqxGrid('exportdata', 'xls', 'Service Report');
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
    try{
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();
        //For Mutually Exclusive Search Criteria
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
                //    alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }

        mode = ($('#ddlCity').val() != '') ? '2' : '1';

        var city = "";
        var zip = "";
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
        // var ddlCity = ($('#ddlCity').val() == null || $('#ddlCity').val() == '') ? '' : $('#ddlCity').val();
        var ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();
        var ddlReason = ($('#ddlReason').val() == null || $('#ddlReason').val() == '') ? '' : $('#ddlReason').val();
        if (ddlAccountType != '')
            mode = 3;
        Servicetable = Service.LoadGridData(mode, dtFrom, dtTo, city, zip, ddlAccountType, ddlReason).value;

        //for pdf
        $('#hdnParamValues').val(mode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType + '|' + ddlReason);

        databindtogrid = Servicetable.Tables[0].Rows;
        PiechartCommon(mode);
        if (databindtogrid.length == 0) {
            $('#jqxgrid').hide();
            $('#jqxchildgrid').hide();
            $('#nodata_div').show();
            $('#nodata_div1').show();
            $('#nodata_div').html('<font color="Red">No Data</font>');
            $('#nodata_div1').html('<font color="Red">No Data</font>');
        }
        if (mode == '1') {
            $('#jqxgrid').show();
            $('#jqxchildgrid').hide();
            gridid = 'jqxgrid';
            LoadGrid();
            
        }
        else {
            $('#jqxgrid').hide();
            $('#jqxchildgrid').show();
            gridid = 'jqxchildgrid';
            LoadChildGrid();
          
        }
     
       
    }
    catch (e) { }

}


//added this function to get row index
var row ;
$('#jqxchildgrid').bind('rowselect', function (event) {

    row = event.args.rowindex;
});

//getting values in popup
$(document).on("click", ".details", function () {
    var serviceID = $('#jqxchildgrid').jqxGrid('getrowdata', row).ServiceID;
  
    for (var i = 0; i < databindtogrid.length; i++) {
        if (databindtogrid[i].ServiceID == serviceID) {
            $('#lblReason').html(databindtogrid[i].Reason);
            $('#lblNotificationDate').html(databindtogrid[i].NotificationDate);
            $('#lblNotificationBody').html(databindtogrid[i].NotificationBody);

            return;
        }
}

});

