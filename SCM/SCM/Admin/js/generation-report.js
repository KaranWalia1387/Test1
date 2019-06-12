var defOpen = 2;
var generationtable;
var tempTable;
var max = 0;
var dtFrom;
var dtTo;
var ddlAccountType;
var tooltip_title = '';
var unit = 1; //For Kwh unit=1 and for $, unit=2

var city = '';
var zip = '';

gridid = 'jqxgrid';
var loadsldvalue = false;
var databindtogrid;
var divId = 'chartDiv';
isdecimal = 1;
var autoheightbool = false;
var autoheightPrimary = false;
var imagerenderer = function (row, datafield, value) {
    switch (datafield) {        
        default: return getresult(row, value); break;
    }
    
   
}

var columns_model=
[
   // { text: 'Month Year', dataField: 'MonthYear', width: '33%', cellsformat: "MMMM,yyyy", cellsrenderer: imagerenderer },
    { text: 'Generation Date', dataField: 'MonthYear1', width: '50%', cellsformat: 'MM/dd/yy' },
    //{ text: 'City Name', dataField: 'CityName', width: '33%', cellsrenderer: imagerenderer },
    { text: 'Total Generation (kWh)', dataField: 'TotalGeneration', width: '50%', cellsrenderer: imagerenderer }
];

function getresult(row, value) {
    var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;

    return '<div style="text-align: left;"><span id=' + cityId + ' class=filterdrop >' + value + '</span></div>';

}



function LoadGrid() {
    if (databindtogrid.length == 0) {
        $('#divnodata').show();
        $('#jqxgrid').hide();
        $('#jqxchildgrid').hide();
    }
    else {
        $('#divnodata').hide();
        $('#jqxgrid').show();
       
    }
   
    
    source = {
        datatype: "array",
        datafields: [
        { name: 'MonthYear1', type: 'date'},
        
         { name: 'TotalGeneration', type: 'number' },
          { name: 'TotalGeneration$', type: 'number' }
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
  
 
    try {
        $("#jqxgrid").jqxGrid({
            width: "99.8%",
            //autoheight: autoheightPrimary,
            source: dataAdapter,
            sortable: true,
            height: GridHeight * .79,
            columnsheight: 38,
            rowsheight: 34,
            theme: 'darkblue',
            altrows: true,

            selectionmode: 'singlerow', //To trigger row select event
            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50','100'],
            pagesize: 100,
            columnsresize: true,
            columnsreorder: true,
            columns: columns_model
            //  ]
                   
        });
    }
    catch (e) {

    }

   
}



function LoadChildGrid() {
    autoheightbool = false;
    if (databindtogrid.Rows.length <= 10)
        autoheightbool = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
        { name: 'Generationdate', type: 'date', sorttype: "date", datefmt: "mm/dd/yy" },
        { name: 'CustomerName' },
        { name: 'CustomerType' },
        { name: 'ZipCode', type: 'number' },
        { name: 'CityName' },
        { name: 'TotalGeneration', type: 'decimal'  }
        ],
        async: false,
        record: 'Table',
        sortable: true,

        localdata: databindtogrid.Rows
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    if (databindtogrid.length > 0) {
        $("#btnExportPdf").removeAttr('disabled');
        $("#btnExportPdf").css('cursor', 'pointer');
    }
    else {
        $("#btnExportPdf").attr('disabled', 'disabled');
        $("#btnExportPdf").css('cursor', 'default');
    }

    $("#jqxchildgrid").jqxGrid({
        width: "100%",
        height: "320",
        autoheight: autoheightbool,
        source: dataAdapter,
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event

        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50','100'],
        pagesize: 100,

        columnsresize: true,
        columnsreorder: true,
        columns:
        [
         { text: 'Date Of Reading', dataField: 'Generationdate', cellsformat: "MM/dd/yy" },
         { text: 'Customer Name', dataField: 'CustomerName' },
         { text: 'Account Type', dataField: 'CustomerType' },
         { text: 'Zip Code', dataField: 'ZipCode' },
         { text: 'City Name', dataField: 'CityName' },
         { text: 'Total Generation(kWh)', dataField: 'TotalGeneration', type: 'decimal'  }
        ]
    });

    $("#jqxchildgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1024) {
            $("#jqxchildgrid").jqxGrid('autoresizecolumns');
        }
    });
}

//For high chart

function submit() {
    try {
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();

        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
              //  alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                loader.hideloader();
                return false;
            }
        }

        if (ValidatePage('divFilter')) {
            var zip = '';
            var city = '';
            if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
                var ddlCity = $('#ddlCity option:selected');
                if ($(ddlCity).attr('key') == 'CityName') {
                    city = $(ddlCity).val();
                }
                if ($(ddlCity).attr('key') == 'Zipcode') {
                    zip = $(ddlCity).val();
                }
            }
            loader.showloader();
            var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
            var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();

            var ddlAccountType = ($('#ddlAccountType').val() == '--Select--' || $('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();

            if ((city == '' && zip == '' && ddlAccountType == '')) {
                mode = 0;
            }
            else {

                mode = (city != '') ? 1 : 0;

                if (zip != '') {
                    mode = 2;
                }

                if ((city != '' || zip != '') && ddlAccountType != '') {
                    mode = 4;
                } else if (ddlAccountType != '') {
                    mode = 3;
                }
            }


            var param = {
                datefrom: dtFrom,
                dateto: dtTo,
                mode: mode,
                cityid: city,
                zip: zip,
                customertype: ddlAccountType,
                min: 0,
                max: 1

            }
            $.ajax({
                type: "POST",
                url: "Generation1.aspx/LoadGridData",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(param),
                success: OnSuccess,
                error: OnError
            });

            return true;
        }
        else {
            loader.hideloader();
            return false;
        }
    }
    catch (e) {
    }
}

function OnError(request, status, error) {
    alert('Error!! ' + request.statusText);
}

function OnSuccess(data, status) {

    //************************************
    var zip = '';
    var city = '';
    if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
        var ddlCity = $('#ddlCity option:selected');
        if ($(ddlCity).attr('key') == 'CityName') {
            city = $(ddlCity).val();
        }
        if ($(ddlCity).attr('key') == 'Zipcode') {
            zip = $(ddlCity).val();
        }
    }

    var ddlAccountType = ($('#ddlAccountType').val() == '--Select--' || $('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();

    //************************************
    
    data = data.d;
    loader.hideloader();
    var result = $.parseJSON(data);
    $('#hdnParamValues').val($('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|' + mode + '|' + city + '|' + zip + '|' + ddlAccountType + '|||||0');
    generationtable = result;
    if (mode == 4) {
        databindtogrid = result.Table1;
    }
    else {
        databindtogrid = result.Table2;
    }

    if (databindtogrid.length == 0) {
        $('#lblActualUsage').text('KWh 0');
        $('#lblProjectedUsage').text('KWh 0');
        $(".grid-section").hide(); $('#jqxgrid').hide();
        $('#jqxchildgrid').hide();
        $('#nodata_div').show();
        $('#nodata_div').html('<font color="Red">No Solar Data available</font>');
    }
    else {
        $('#nodata_div').hide();
        $(".grid-section").show();       
        gridid = 'jqxgrid';
        PiechartCommon(mode);
        LoadGrid();
        var name = $('.left-active-sprites ul li a.active').closest('li').attr('class');
        if (name == "chart") {
            $("#chartDiv").hide();
            $("#graphDiv").show();
        }
        else {
            $("#chartDiv").show();
            $("#graphDiv").hide();
        }
    }
}

function PiechartCommon(mode, caseId) {
    var tempvalue;
    $('#div-subChart').show();
    //$('#div-GenerationChart').height(400);
    $('#borderline').show();

    $('#chartDiv').removeClass("clsWidthFull");
    $('.outage_right_chart').show();
    switch (mode) {
        case 0:
        case 3:
            tempvalue = generationtable.Table2;
            $('#subChart1').html("<b>" + 'City-Monthly' + "</b>");
            break;
        case 1:
            tempvalue = generationtable.Table2;
            $('#subChart1').html("<b>" + 'Zip-Monthly' + "</b>");
            break;
        case 2:
            tempvalue = generationtable.Table2;
            $('#subChart1').html("<b>" + 'CustomerType-Monthly' + "</b>");
            break;
        case 4:
            tempvalue = generationtable.Table1;
            $('#div-subChart').hide();
            $('#borderline').hide();
            $('#chartDiv').addClass("clsWidthFull");
            // $('#div-mainChart').height('335');
            $('.outage_right_chart').hide();
            break;
    }

    var piechart = tempvalue;
    if (piechart.length > 0) {

        $('#chartDiv').show();
        $('#nodata_div').hide();
        $('#nodata_div1').hide();
    }
    else {
        $('#nodata_div').show();
        $('#nodata_div1').show();
        $('#nodata_div').html('<font color="Red">No Solar Data available</font>');
        $('#nodata_div1').html('<font color="Red">No Solar Data available</font>');
        $('#jqxgrid').hide()
        $('#jqxchildgrid').hide();
        $('#chartDiv').hide();
        $('#notifytitle').hide();
    }
    

    processed_json = new Array();
    var solarTotal = 0;
    var solarTotalProjected = 0;
    switch (unit) {
        case 1:// for KWh
            {
                $.map(piechart, function (obj, i) {
                    processed_json.push({
                        name: obj.MonthYear1.slice(0, -5),
                        y: obj.TotalGeneration,
                        color: '#FFC118',
                        title: 'Solar Usage'
                        //drilldown: 'City'                       
                    });
                    solarTotal = solarTotal + parseFloat(obj.TotalGeneration == null ? 0 : obj.TotalGeneration);
                    solarTotalProjected = 89.86; //solarTotalProjected + parseFloat(obj.TotalGeneration == null ? 0 : obj.TotalGeneration);
                    $('#lblActualUsage').text(solarTotal.toFixed(2) + ' kWh');
                    $('#lblProjectedUsage').text(solarTotalProjected.toFixed(2) + ' kWh');
                });
                color = '#FFC118'//colorarrHEX[0];
                tooltip_title = 'Generation(kWh): ';             
                BindheighSolarAdminreport('areaspline', divId, name, tooltip_title, unit, color);
            }
            break;
        case 2: //for $
            {
                $.map(piechart, function (obj, i) {
                    processed_json.push({
                        name: obj.MonthYear1.slice(0, -5),
                        y: obj.TotalGeneration$,
                        color: '#FFC118',//colorarrHEX[1],
                        title: 'Solar Usage'
                        // title: obj.ZipCode,
                        // drilldown: 'Zipcode'
                    });
                    solarTotal = solarTotal + parseFloat(obj.TotalGeneration$ == null ? 0 : obj.TotalGeneration$);
                    solarTotalProjected = 89.86;  //solarTotalProjected + parseFloat(obj.TotalGeneration$ == null ? 0 : obj.TotalGeneration$);
                    $('#lblActualUsage').text('$' + solarTotal.toFixed(2));
                    $('#lblProjectedUsage').text('$'+solarTotalProjected.toFixed(2));
                    color ='#FFC118', colorarrHEX[1];
                });
                tooltip_title = 'Generation($): ';             
                BindheighSolarAdminreport('areaspline', divId, name, tooltip_title, unit, color);
            }
            break;
    }
}

function setDate()
{
    var frm = getDateFormat($('#txtDateFrom').val());
    var to = getDateFormat($('#txtDateTo').val());
    var currentDate = new Date();
    var prevDate = new Date(new Date().setDate(new Date().getDate() - 30));
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if ($('#txtDateFrom').val() != "" && $('#txtDateTo').val() != "") {
        yr = frm.split(',')[1];
        yr1 = to.split(',')[1];
        if (yr == yr1) {
            $('#lblDateRange').text(frm.split(',')[0] + ' - ' + to.split(',')[0] + ', ' + yr);
        }
        else {
            $('#lblDateRange').text(frm + ' - ' + to);
        }
    }
    else
    {
        var bfrdate = (prevDate.getMonth() + 1) + '/' + prevDate.getDate() + '/' + prevDate.getFullYear();
        var curdate = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
        $('#txtDateFrom').val(bfrdate);
        $('#txtDateTo').val(curdate);

        var dateRange = months[prevDate.getMonth()] + ' ' + prevDate.getDate() + ', ' + prevDate.getFullYear() + ' - ' + months[currentDate.getMonth()] + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear();
        $('#lblDateRange').text(dateRange);
    }
}

$(document).ready(function () {
    chartdivid = 'chartDiv';
    mode = 0;
    var temptable = '';   
    setDate();
    submit();
    $('#Kwh').css('color', '#2dadc8');
    $('#Kwh').css({ 'font-weight': 'bold' });
    $('#dollar').css('color', 'black');
    $('#dollar').css({ 'font-weight': 'normal' });

    $('#KwhVal').click(function () {
        $('#Kwh').css('color', '#2dadc8');
        $('#Kwh').css({ 'font-weight': 'bold' });
        $('#dollar').css('color', 'black');
        $('#dollar').css({ 'font-weight': 'normal' });
        columns_model =
            [
               // { text: 'Month Year', dataField: 'MonthYear', width: '33%', cellsformat: "MMMM,yyyy", cellsrenderer: imagerenderer },
                { text: 'Generation Date', dataField: 'MonthYear1', width: '50%', cellsformat: 'MM/dd/yy' },
                //{ text: 'City Name', dataField: 'CityName', width: '33%', cellsrenderer: imagerenderer },
                { text: 'Total Generation (kWh)', dataField: 'TotalGeneration', width: '50%', cellsrenderer: imagerenderer }
            ];
        unit = 1;
        LoadGrid();     
        PiechartCommon(mode); chartgraphsection(defOpen);
    });

    $('#DollarVal').click(function () {
        $('#dollar').css('color', '#2dadc8');
        $('#dollar').css({ 'font-weight': 'bold' });
        $('#Kwh').css('color', 'black');
        $('#Kwh').css({ 'font-weight': 'normal' });
        columns_model=
            [
              
                { text: 'MonthYear', dataField: 'MonthYear1', width: '50%', cellsformat: 'MM/dd/yy' },
              
                { text: 'Total Generation ($)', dataField: 'TotalGeneration$', width: '50%', cellsrenderer: imagerenderer }
            ];
        unit = 2;
        LoadGrid();
      
        PiechartCommon(mode); chartgraphsection(defOpen);
    });

    
    $('.imgtoggle').click(function () {

        $('.content').slideToggle('slow');
        var oldSrc = $('.imgtoggle').attr('src');
        var minusImg = "..\\images\\ArrowsMinus.png";
        var plusImg = "..\\images\\ArrowsPlus.png";
        oldSrc = oldSrc == minusImg ? plusImg : minusImg;
        $('.imgtoggle').attr('src', oldSrc);
    });


    $('#btnFilter').click(function () {
        loader.showloader();
        submit();
        setDate();       
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
   
});

$(document).on("click", ".filterdrop", function () {
    var idCity = this.id;
    $('#ddlCity').val(idCity);
    var obj = $('#ddlCity option:selected');
    if (obj.index() > 0) {
        submit();
    }
});




var usertable='';

$(document).on("click", ".details", function () {
    $('#primary').addClass('active');    
    var TotalGeneration = $(this).data('id');
    usertable = databindtogrid.Rows;

   
    for (var i = 0; i < databindtogrid.Rows.length; i++) {
        if (usertable[i].TotalGeneration == TotalGeneration) {
            $('#custName').html(usertable[i].CustomerName);
            $('#lblCity').html(usertable[i].CityName);
            $('#lblZipCode').html(usertable[i].ZipCode);
            $('#accountType').html(usertable[i].CustomerType);
          
            return;
        }
    }

});

$(document).on("click", "#property", function () {   

        var customerId = $('#custId').val();
    
        for (var i = 0; i < usertable.length; i++) {
            if (usertable[i].CustomerId == customerId) {
                var address = usertable[i].Address1 + ' ' + usertable[i].Address2;
                var zipCode = usertable[i].ZipCode;               
            }      
    }
});
