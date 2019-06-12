var mode = '1';
var programstable;
var databindtogrid;
TitleExport = 'notification-report';
gridid = 'jqxgrid';
var divId = 'div-NotificationChart';
var autoheightbool = false;
var autoheightPrimary = false;
var defOpen = 1;
var imagerenderer = function (row, datafield, value) {
    if (datafield == 'CreatedDate') {
       return getDate(row, value)
    }
    else {
        return getresult(row, value);
    }
}

function getresult(row, value) {
    var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;
    var notifyId = $('#jqxgrid').jqxGrid('getrowdata', row).NotificationId;
    var id = cityId + '_' + notifyId;
    return '<div style="text-align: left;"><span id=' + id + ' class=filterdrop >' + value + '</span></div>';
}
function getDate(row, value) {
    var date = $('#jqxgrid').jqxGrid('getrowdata', row).CreatedDate
    //var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;
    //var notifyId = $('#jqxgrid').jqxGrid('getrowdata', row).NotificationId;
    //var id = cityId + '_' + notifyId;
    return '<div style="text-align: left;"><span  class=filterdrop >' + date.toLocaleDateString() + '</span></div>';
}

function BindHeader() {
    try {
        // var data = programstable;
        $('#lblENROLLED').text(programstable[0]["EnrollmentCount"]);
        $('#lblUnerolled').text(programstable[0]["UnEnrollmentCount"]);
        $('#lblTotal').text(programstable[0]["TotalCount"]);
    }
    catch (e) {
        console.log(e.message);
    }

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
                    { name: 'CreatedDate', type: 'date' },
                    { name: 'EnrollmentCount', type: 'number' }
            ],
            async: false,
            record: 'Table',
            sortable: true,
            localdata: databindtogrid
        };
        var dataAdapter = new $.jqx.dataAdapter(source,
            { contentType: 'application/json; charset=utf-8' });

        $("#jqxgrid").jqxGrid({
            width: "99.8%",
            //autoheight: autoheightPrimary,
            source: dataAdapter,
            height: GridHeight * .79,
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
                 { text: 'Enrollment Date', dataField: 'CreatedDate', width: '50%', cellsrenderer: imagerenderer },
                  { text: 'Number of Enrollments', dataField: 'EnrollmentCount', width: '50%', cellsrenderer: imagerenderer }
               ]
        });

    }
    catch (e) {
        console.log(e.message);
    }
}

function LoadChildGrid() {
    autoheightbool = false;
    if (databindtogrid.length <= 10)
        autoheightbool = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
                   { name: 'ID', type: 'number' },
                   { name: 'CityId', type: 'number' },
                   { name: 'CityName' },
                   { name: 'EEType' },
                   { name: 'Title' },
                   { name: 'PeopleEnrolled', type: 'number' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    // Load icon in cell // NEW UI 12/17/2014
    var imagerenderer = function (row, datafield, value) {
        switch (datafield) {
            case "Read": return getRead(row, value); break;
            default: break;
        }
    }

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
                   { text: 'ID', dataField: 'ID', width: '0%', hidden: true },
                   { text: 'City Name', dataField: 'CityName', width: '30%', cellsrenderer: imagerenderer },
                   { text: 'Title', dataField: 'Title', width: '40%', cellsrenderer: imagerenderer },//, cellsrenderer: imagerenderer
                   { text: 'Users Enrolled', dataField: 'PeopleEnrolled', width: '30%', cellsrenderer: imagerenderer }//, cellsrenderer: imagerenderer
        ]
    });

    $("#jqxchildgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxchildgrid").jqxGrid('autoresizecolumns');
        }
    });
}



function FillChartData() {
    try {
        processed_json = new Array();
        processed_json2 = new Array();

        yaxis = 'Number of Enrollments';


        $.map(databindtogrid, function (obj, i) {
            processed_json.push({
                name: mode = obj.CreatedDate.slice(0, -5),
                y: mode = obj.EnrollmentCount,
                title: mode = obj.CreatedDate
            });
        });


        BindPaperless('areaspline', 'chartDiv', 'Total Enrollment');

    } catch (e) { }
}

// NEW UI 12/17/2014
//for get lock icon showing in grid
function getRead(row, value) {
    CustId = $('#jqxchildgrid').jqxGrid('getrowdata', row).CustomerId;
    return '<div style="text-align: center;">' + (value == "No" ? '<img src="../images/folder_close.png" class="Gridimage" title="' + value + '"/>' : '<img src="../images/folder_open.png" class="Gridimage" title="' + value + '" />') + '</a></div>';
}


$(document).ready(function () {

    chartdivid = 'div-NotificationChart';

    $('#nodata_div').hide();
    $('#nodata_div1').hide();
    submit();
    $('.imgtoggle').click(function () {

        $('.content').slideToggle('slow');
        var oldSrc = $('.imgtoggle').attr('src');
        var minusImg = "..\\images\\ArrowsMinus.png";
        var plusImg = "..\\images\\ArrowsPlus.png";
        oldSrc = oldSrc == minusImg ? plusImg : minusImg;
        $('.imgtoggle').attr('src', oldSrc);
    });

    $('#btnFilter').click(function () {
        submit(); chartgraphsection(defOpen);
    });


});
$(document).on("click", ".filterdrop", function () {
    var idCity = this.id.split('_')[0];
    var notify = this.id.split('_')[1];
    $('#ddlCity').val(idCity);
    var obj = $('#ddlCity option:selected');
    $('#ddlNotificationtype').val(notify);
    var objNotify = $('#ddlNotificationtype option:selected');
    if (obj.index() > 0 && objNotify.index() > 0) {
        submit();
    }
});

function submit() {
    try {
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();
        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                //alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }
        loader.showloader();
        var zip = "";
        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        var city = "";
        var ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();

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
                mode = 4;
            }
        }

        //for pdf
        $('#hdnParamValues').val(mode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType);
       
        var param = {
            mode: mode,
            datefrom: dtFrom,
            dateto: dtTo,
            cityid: city,
            //zip: '',
            zip: zip,
            eetype: ddlAccountType,
        }
        $.ajax({
            type: "POST",
            url: "PaperlessBillSample.aspx/LoadGrid",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                data = data.d;
                var result = $.parseJSON(data);
                if (result != null) {
                    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

                    if (startDate != '' && endDate != '') {
                        var dsplit = endDate.split("/");
                        var dateEnds = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
                        dsplit = startDate.split("/");
                        var dateStarts = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
                        $('#lblCurrent').text(months[dateEnds.getMonth()] + ' ' + dateEnds.getDate() + ', ' + dateEnds.getFullYear());
                        $('#lblBefore').text(months[dateStarts.getMonth()] + ' ' + dateStarts.getDate() + ', ' + dateStarts.getFullYear());
                    }
                    //OutageTable = result; 
                    programstable = result.Table;
                    databindtogrid = result.Table1;
                    //paperlessbilltable.Tables[0].Rows;
                    BindHeader();
                    for (var i = 0; i < databindtogrid.length; i++) {

                        var dateEnds = new Date(databindtogrid[i]["CreatedDate"]);
                        databindtogrid[i]["CreatedDate"] = (dateEnds.getMonth() + 1) + '/' + dateEnds.getDate() + '/' + dateEnds.getFullYear();
                    }
                    //for pdf
                    $('#hdnParamValues').val(mode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType);

                    if (databindtogrid.length == 0) {
                        $(".grid-section").hide(); $('#jqxgrid').hide();
                        $('#jqxchildgrid').hide();
                        $('#nodata_div').show();
                    } else {
                        $('#nodata_div').hide();
                        $(".grid-section").show();
                        $('#jqxgrid').show();
                        var name = $('.left-active-sprites ul li a.active').closest('li').attr('class');
                        if (name == "chart") {
                            $("#chartDiv").hide();
                            $("#graphDiv").show();
                        }
                        else {
                            $("#chartDiv").show();
                            $("#graphDiv").hide();
                        }
                        gridid = 'jqxgrid';
                        LoadGrid(); FillChartData();


                    }
                    loader.hideloader();
                }
            },
            error: function (request, status, error) { loader.hideloader(); alert('Error!! ' + request.statusText); }
        });
    } catch (e) { loader.hideloader(); alert('Error!! '); }
}

function BindPaperless(type, id, series1name) {

    $('#' + id).highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: type,
            options3d: {
                enabled: enable3d,
                alpha: 15,
                beta: 0
            }
        },
        title: {
            text: title
           ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
            //zoomType: 'xy'
        },
        legend: {
            enabled: false,
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: false
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            maxPadding: 1.5,
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
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
                    fontWeight: 'bold',
                    fontSize: '3px',
                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                }
            }
        },
        tooltip: {
            shared: false,
            useHTML: true,
           
            formatter: function () {
               // return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': </b>' + changetoK(Math.abs(this.y));
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
                dataLabels: {
                    stacking: 'normal',

                    align: 'center',
                    rotation: -30,//#4867
                    // x: 0,//#4867
                    y: -7,//#4867
                    enabled: false,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        return (changetoK(this.y));
                    },
                    style: {
                        color: 'black',
                        fontSize: '9px'
                    }

                }
            }
        },
        series: [{
            type: type,
            name: series1name,
            data: processed_json,
            color: colorarrHEX[0],
            showInLegend: true,

        }
        ]
    });
}