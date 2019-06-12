var BrowserTable = {};
var databindtogrid;
var result;
var toDate, fromDate;
var zipcode = '', cityid = '', acctType = '';
var Tables, BrowserData;
var month1, year1, month2, year2;
var date11 = new Date();
var date22 = new Date();
var defopen = 1;
var length = '';
var Counttable;
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var mode = '';
var preferenceId = '';
function LoadGrid() {

    try {
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
            $("#statusBill").attr('disabled', 'disabled');
        }
        if (databindtogrid.length <= 10)
            autoheightPrimary = true;
        //Getting the source data with ajax GET request
        source = {
            datatype: "array",
            datafields: [
            { name: 'PreferenceId'},
            { name: 'PreferenceName' },
             { name: 'NoOfCustomer', type: 'number' },
            ],
            //async: false,
            record: 'Table',
            sortable: true,
            localdata: databindtogrid
        };
        var dataAdapter = new $.jqx.dataAdapter(source,
            { contentType: 'application/json; charset=utf-8' }
        );

        $("#jqxgrid").jqxGrid({
            width: "99.8%",
            //autoheight: autoheightPrimary,
            height: GridHeight * .79,
            columnsheight: 38,
            rowsheight: 34,
            theme: 'darkblue',
            altrows: true,
            source: dataAdapter,
            sortable: true,
            selectionmode: 'singlerow', //To trigger row select event

            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50','60','70','80'],
            pagesize: 20,
            columnsresize: true,
            columnsreorder: true,
            columns:
            [
                { text: 'PreferenceId', dataField: 'PreferenceId', width: '0%', hidden: true, },
                { text: 'Preference Name', dataField: 'PreferenceName', width: '50%', },
                { text: 'No. Of Account', dataField: 'NoOfCustomer', width: '50%', },
            ]
        });
    } catch (e) {
        console.log(e.message);
    }

}
function LoadChildGrid() {
    autoheightPrimary = false;
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    var source = {
        datatype: "array",
        datafields: [
         { name: 'CustomerName' },
         { name: 'UtilityAccountNumber', type: 'number' }      
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxgrid2").jqxGrid({
        width: "100%",
        autoheight: autoheightPrimary,
        height: "300",
        source: dataAdapter,

        theme: 'darkblue',
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Customer Name', dataField: 'CustomerName', width: '50%' },           
            { text: 'Utility Account Number', dataField: 'UtilityAccountNumber', width: '50%' }
        ]
    });

    //$("#jqxchildgrid").on('bindingcomplete', function () {
    //    if ($(window).width() < 1025) {
    //        $("#jqxchildgrid").jqxGrid('autoresizecolumns');
    //    }
    //});
}
function showHideDiv() {
    $('#chartDiv').show();
}

$(document).ready(function () {
    try {
        $('#jqxgrid').show();
        $('.grid-section_1').show();
        $('#nodata_div').hide();        
        submit();

        $('#btnFilter').click(function () {
            mode = '';
            preferenceId = '';
            submit();//LoadFilterData();

        })
        $("#jqxgrid").bind('rowselect', function (event) {
            var row = event.args.rowindex;
            var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
            if (datarow.TotalCount > 0) {
                LoadChildGrid();
            }
            //$("#jqxgrid").jqxGrid('rowunselect', row);
        });
    } catch (e) {
        console.log(e.message);
    }   

});

function BindHeader() {
    //$('#lblNewsMsg').text(Counttable[0]["NoOfAccount"]);
    //$('#lblServiceMsg').text(Counttable[1]["NoOfAccount"]);
    //$('#lblNewsLetterMsg').text(Counttable[2]["NoOfAccount"]);
    //$('#lblTotalMsg').text(Counttable[6]["NoOfAccount"]);

    $('#lblNewsMsg').text(Counttable[0]["NoOfCustomer"]);
    $('#lblServiceMsg').text(Counttable[1]["NoOfCustomer"]);
    $('#lblNewsLetterMsg').text(Counttable[2]["NoOfCustomer"]);
    $('#lblTotalMsg').text(Counttable[6]["NoOfCustomer"]);
}
function ConvertData() {
    try {

        Tables = new Array();
        $.map(BrowserData, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        BrowserTable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}

function getusage_date_time() {

    var startDate = $('#txtDateFrom').val();
    var endDate = $('#txtDateTo').val();
    var dsplit = endDate.split("/");
    var dateEnds = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
    dsplit = startDate.split("/");
    var dateStarts = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
    $('#lblCurrent').text(monthNames[dateEnds.getMonth()] + ' ' + dateEnds.getDate() + ', ' + dateEnds.getFullYear());
    $('#lblBefore').text(monthNames[dateStarts.getMonth()] + ' ' + dateStarts.getDate() + ', ' + dateStarts.getFullYear());

}


function submit() {
    try {
        //var startDate = $('#txtDateFrom').val();
        //var endDate = $('#txtDateTo').val();

        //if (startDate != '' && endDate != '') {
        //    if (Date.parse(startDate) > Date.parse(endDate)) {
        //        $("#txtDateTo").val('');
        //        alert("From date should not be greater than to date");
        //        $("#txtDateTo").val("");
        //        return false;
        //    }
        //}
        loader.showloader();
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
        if (mode == "") { mode = "1";}
        //var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        //var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();

        var ddlAccountType = ($('#ddlAccountType').val() == 'Account Type' || $('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();

       
        
        var param = {            
            cityid: city,
            ZipCode: zip,
            CustomerType: ddlAccountType,
            Mode: mode,
            PreferenceId:preferenceId

        }
        $.ajax({
            type: "Post",
            url: "Marketing-Preference.aspx/getData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                loader.hideloader();
                data = data.d;
                result = $.parseJSON(data);                
                $('#hdnParamValues').val(city + '|' + zip + '|' + ddlAccountType+'|'+mode+'|'+preferenceId);
                //if (result != null) {
                //    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

                //    if (startDate != '' && endDate != '') {
                //        var dsplit = endDate.split("/");
                //        var dateEnds = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
                //        dsplit = startDate.split("/");
                //        var dateStarts = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
                //        $('#To_Date').text(months[dateEnds.getMonth()] + ' ' + dateEnds.getDate() + ', ' + dateEnds.getFullYear());
                //        $('#From_Date').text(months[dateStarts.getMonth()] + ' ' + dateStarts.getDate() + ', ' + dateStarts.getFullYear());
                //    }
                //}
                if (mode == "1") {
                    $("#gridsection2").hide();
                    $("#jqxgrid2").hide();
                    Counttable = result.Table;
                    databindtogrid = result.Table;
                    BindHeader();                                     
                    if (Counttable[6]["NoOfAccount"] == 0) {
                        $(".grid-section").hide(); $('#jqxgrid').hide();
                        $('#jqxchildgrid').hide();
                        $('#nodata_div').show();
                    }
                    else {

                        $('#nodata_div').hide();
                        $(".grid-section").show();
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
                        LoadGrid();
                        //   LoadChartData();
                        // LoadChart();
                        Bindbargraph();
                    }
                }
                else
                {
                    var name = $('.left-active-sprites ul li a.active').closest('li').attr('class');
                    if (name == "chart") {
                        $("#chartDiv").hide();
                        $("#graphDiv").show();
                    }
                    else {
                        $("#chartDiv").show();
                        $("#graphDiv").hide();
                        $("#jqxgrid2").hide();
                    }
                    $("#gridsection2").show();
                    $("#jqxgrid2").show();
                    gridid = 'jqxgrid2';
                    databindtogrid = '';
                    databindtogrid = result.Table;                                      
                    LoadChildGrid();
                }
            },
            error: function (request, status, error) {
                //w2alert('Error!! ' + request.statusText); 
                loader.hideloader();
            }
        });

    }
    catch (e) {
    }
}
function LoadChartData() {
    try {
        processed_json = new Array();   
        $.map(databindtogrid, function (obj, i) {
            if (obj["ResultType"] ==1) {
                processed_json.push({
                    name: obj.PreferenceName,
                    y: obj.NoOfAccount,
                    color: colorarrHEX[i],
                    title: obj.PreferenceName
                });
            }
        });

        if (processed_json.length > 0) {
            BindPieChartWithoutLabel('chartDiv', 'Count');
                        
        } else {
            //if (type == 'dashboard') {
            //    $('#servicechart').html(nodataLabel);
            //    $('#gridservice').html(nodataLabel);
            //}
            //else {
            //    $('#data-viewer-popup').html(nodataLabel);
            //    $('#grid-viewer-popup').html(nodataLabel);
            //}
        }

    } catch (e) { }
}

function LoadChart() {
    try {
        processed_json = new Array();     
        yaxis = 'Number of Account';
        $.map(databindtogrid, function (obj, i) {
            if (obj["ResultType"] == 1) {
                processed_json.push({
                    name: obj.PreferenceName,
                    y: obj.NoOfAccount,
                    color: colorarrHEX[i],
                    title: obj.PreferenceName
                });
            }
        });

        if (processed_json.length > 0) {            
            populateChart('column', 'chartDiv', false);
                      
        } else {            
            
        }

        //dtOutageChartjs = processed_json;
    } catch (e) { }
}
function Bindbargraph() {
    if (databindtogrid != null) {
        processed_json = new Array();
        var PrfID = '';
        yaxis = 'Number of customer';
        $.map(databindtogrid, function (obj, i) {
            if (obj["ResultType"] == 1) {
                processed_json.push({
                    name: obj.PreferenceName,
                    y: obj.NoOfCustomer,
                    color: colorarrHEX[i],
                    title: obj.PreferenceName                 
                });
            }
        });

        if (processed_json.length > 0) {          
            BindGrapheigh('column', 'chartDiv', false,name,databindtogrid);
        }               
       
    }
}
function BindGrapheigh(type, id, showindecimal, name, dt) {
    $('#' + id).highcharts({
        credits: {
            enabled: false
        },
        //chart: { zoomType: 'xy' },
        chart: {
            type: type,
            options3d: {
                enabled: enable3d,
                alpha: 15,
                beta: 0
            }, events: {
                drilldown: function (e) {
                    if (!e.seriesOptions) {
                        var adprocessed_json4 = chartclick(e.point.title, type, e.point.drilldown, 0);
                        if (e.point.drilldown.toLowerCase().indexOf('zipcode') < 0)
                            excludedrillup = false;
                        else {
                            excludedrillup = true;
                        }
                        var chart = this,
                            drilldowns = {
                                'Paid-Customer': {
                                    name: e.point.name,
                                    data: adprocessed_json4
                                }

                            },
                            series = drilldowns['Paid-Customer'];
                        series.id = e.point.drilldown;

                        chart.addSeriesAsDrilldown(e.point, series);

                    }

                },

                drillup: function (e) {
                    if (e.seriesOptions.id != null && (e.seriesOptions.id.toLowerCase() == 'paid' || e.seriesOptions.id.toLowerCase() == 'unpaid' || e.seriesOptions.id.toLowerCase() == 'city' || e.seriesOptions.id.toLowerCase() == 'unplanned' || e.seriesOptions.id.toLowerCase() == 'planned') || (e.seriesOptions.name != null && e.seriesOptions.name.toLowerCase() == 'zipcode')) {
                        subBackToMain(type, excludedrillup);
                    }
                }
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
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: false
            //backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        }

   ,
        yAxis: {
            allowDecimals: false,
            min: 0,
            maxPadding: 0.09,
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

                enabled: true,
                rotation: -25,
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
        plotOptions: {

            series: {
                dataLabels: {
                    stacking: 'normal',

                    align: 'center',
                    rotation: 0,//#4867
                    // x: 0,//#4867
                    y: -7,//#4867
                    enabled: true,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        //return this.y;
                       return (showindecimal == true || showindecimal == undefined || showindecimal == null) ? Highcharts.numberFormat(this.y, 0) : Highcharts.numberFormat(this.y, 0);
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
                            chartclick(this.title, dt);

                        }
                    }
                }
            }
        },

        tooltip: {
             formatter: function () {                  
                // return '<b>' + this.point.name + ':</b> ' + changetoK(Math.abs(this.y));
                 return '<b>' + this.point.name + ':</b> ' + this.y;
            }
            //formatter: function () {
            //    return this.point.title + ': <b>' + Math.abs(this.y) + '<b>';
            //    // + ' ' + this.series.tooltipOptions.valueSuffix + '<b>';
            //    //if (this.point.series.yAxis.axisTitle!=null)
            //    //return this.point.series.yAxis.axisTitle.textStr + ' : </b>' + ((showindecimal == true || showindecimal == undefined || showindecimal == null) ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0));
            //}
        },
        series: [{
            showInLegend: false,
            type: type,
            name: name,
            data: processed_json,
            color: colorarrHEX[0]            
            //colorByPoint: (showcolors && (type == 'column'))


        }
        ],
        drilldown: {
            series: [{
                id: 'Paid',
                name: 'Paid',
                data: processed_json2
            }, {
                id: 'Unpaid',
                name: 'Unpaid',
                data: processed_json3
            }, {
                id: 'Planned',
                name: 'Planned',
                data: processed_json2
            }, {
                id: 'Unplanned',
                name: 'Unplanned',
                data: processed_json3
            }, {
                id: 'Power',
                name: 'Power',
                data: processed_json2
            }, {
                id: 'Water',
                name: 'Water',
                data: processed_json3
            }, {
                id: 'Gas',
                name: 'Gas',
                data: processed_json4
            }]
        }

    });
}
function chartclick(title,dt) {
    var QueryID;
    var module;
    ChartTitle = title;
    mode = "2";    
    if (dt != null)
    {
        var dtcount = dt.length;
        for (i = 0; i < dtcount; i++)
        {
            if (dt[i]["PreferenceName"] == title)
            {
                preferenceId = dt[i]["PreferenceId"];
                break;
            }
        }
    }
       // QueryID = '4';
     //   module = 'Number of Notification'    
   // var param = { QueryID: QueryID, Mode: getmodeforparameter(title) };
    //if (title == 'Active') {
    //    color = 0;
    //}
    
    
  //  $('#lblmodule').text(module);
   // $('#lblmode').text(title);
  //  $('#lblmodule').css('color', colorarrHEX[color]);
  //  $('#lblmode').css('color', colorarrHEX[color]);
    //FilterData(param);
    submit();
}