var defOpen = 1;
var TextMessageTable;
var databindtogrid;
gridid = 'jqxgrid';
var piechart = '';
var divId = 'div-TextMessagechart';
var mode = '';
var autoheightPrimary = false;
var imagerenderer = function (row, datafield, value) {
    return getresult(row, value);
}

function getresult(row, value) {
    var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;

    return '<div style="text-align: left;"><span id=' + cityId + ' class=filterdrop >' + value + '</span></div>';
}

function BindHeader() {
    try {
        var data = TextMessageTable.Table;
        //var actusr = 0; var regusr = 0;
        data.forEach(function (obj, i) {
            if (obj.MailStatus == "Read") {
                $('#lblRead').text(obj.MailCount);
                // actusr = parseInt(obj.Cnt);
            }
            if (obj.MailStatus == "Unread") {
                $('#lblUnread').text(obj.MailCount);
                // regusr = parseInt(obj.Cnt);
            }
            if (obj.MailStatus == "Total") {
                $('#lblTotal').text(obj.MailCount);
                //  regusr = parseInt(obj.Cnt);
            }
        });
        //  var total = actusr + regusr;

    }
    catch (e) {
        console.log(e.message);
    }

}




function LoadGrid() {

    //$("#btnSend").hide();

    autoheightPrimary = false;
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
            { name: 'CreatedDate' },
            { name: 'Read' },
            { name: 'Unread', type: 'number' },
            { name: 'Total', type: 'number' }
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
            { text: 'Date', dataField: 'CreatedDate', width: '25%', cellsrenderer: imagerenderer },
            { text: 'Read Emails', dataField: 'Read', width: '25%', cellsrenderer: imagerenderer },
            { text: 'Unread Emails', dataField: 'Unread', width: '25%', cellsrenderer: imagerenderer },
            { text: 'Total Emails', dataField: 'Total', width: '25%', cellsrenderer: imagerenderer },
            
        ]
    });
}

function PiechartCommon() {
     
    var piechart = TextMessageTable.Table1;
    if (piechart.length > 0) {
        $('#div-TextMessagechart').show();
        $('#nodata_div').hide();
        $('#nodata_div1').hide();
    }
    else {
        $('#nodata_div').show();
        $('#nodata_div1').show();     
        $('#chartDiv').css('display', 'none');
            $('#nodata_div').html('<font color="Red">No Email Data available</font>');
         
    }
   
    processed_json = new Array();
    processed_json2 = new Array();
   
    $.map(piechart, function (obj, i) {
        processed_json2.push({
            //name: (new Date(obj.CreatedDate)).toLocaleDateString('EN').slice(0, -5),
            name: (new Date(obj.CreatedDate)).getMonth() + '/' + (new Date(obj.CreatedDate)).getDate(),
            y: obj.Read,
            color: colorarrHEX[3],
            title: 'Read Emails'
        });
    });

    $.map(piechart, function (obj, i) {
        processed_json.push({
            //name: (new Date(obj.CreatedDate)).toLocaleDateString('EN').slice(0, -5),
            name: (new Date(obj.CreatedDate)).getMonth() + '/' + (new Date(obj.CreatedDate)).getDate(),
            y: obj.Unread,
            color: colorarrHEX[1],
            title: 'Unread Emails'
        });
    });


    BindhighChart3AdminSeries('areaspline', 'chartDiv', 'Unread Emails', colorarrHEX[1], 'Read Emails', colorarrHEX[3]);

}

$(document).ready(function () {

    $(window).resize(function () {
        try {
            if (gridid == 'jqxchildgrid') {
                if ($(window).width() < 1025)
                    $("#jqxchildgrid").jqxGrid('autoresizecolumns');
               
            }
        }
        catch (e) { }
    });

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
        submit(0);
        chartgraphsection(defOpen);
    });

    $('#nodata_div').hide();
 
    submit(0);
    $('#hdnParamValues').val($('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '||||||0');
  

});
$(document).on("click", ".filterdrop", function () {
    var idCity = this.id;
    $('#ddlCity').val(idCity);
    var obj = $('#ddlCity option:selected');
    if (obj.index() > 0) {
        submit(1);
    }
    resizegrid();
});
function submit(mode) {
    try {
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();
       
        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                //  alert("From date should not be greater than to date");
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
       
            if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
                var ddlCity = $('#ddlCity option:selected');
                if ($(ddlCity).attr('key') == 'CityName') {
                    city = $(ddlCity).val();
                }
                if ($(ddlCity).attr('key') == 'Zipcode') {
                    zip = $(ddlCity).val();
                }
            }

            var param = { 'datefrom': dtFrom, 'dateto': dtTo, 'mode':mode };

            $.ajax({
                type: "POST",
                url: "Email.aspx/LoadGridData",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(param),
                success: function (data) {
                    data = data.d;
                    TextMessageTable = $.parseJSON(data);
            
                    $('#hdnParamValues').val(dtFrom + '|' + dtTo + '|' + mode );
                    try{
                        databindtogrid = TextMessageTable.Table1;
                        if (databindtogrid.length == 0) {
                            $('#jqxgrid').hide(); $(".grid-section").hide();
                            $('#jqxchildgrid').hide();
                            $('#nodata_div').show();
                            $('#nodata_div').html('<font color="Red">No Email Data available</font>');
                            BindHeader();
                           
                        }
                           
                        else {
                            if (databindtogrid.length <= 10)
                                autoheightPrimary = true;  
                            $('#jqxgrid').show();
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
                            BindHeader(); PiechartCommon();
                        }
                    
                        loader.hideloader();

                      
                    } catch (e) { console.log(e); loader.hideloader(); }
                },

                error: function (request, status, error) { w2alert('Error!! ' + request.statusText); }
            });

        
    }
    catch (e) {
    }
}

function BindhighChart3AdminSeries(type, id, series1name, color1, series2name, color2) {
    
    $('#' + id).highcharts({
       
        credits: {
            enabled: false
        },
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
        
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
                text: 'Number of Emails',
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
                            DrillDown(this.category.parent.name, this.x, this.y, seriesname);
                        }
                    }
                }
            }
        },
        series: [
            {
                type: type,
                name: series2name,
                data: processed_json2,
                showInLegend: true,
                color: color2
            },
            {
            type: type,
            name: series1name,
            data: processed_json,
            showInLegend: true,
            color: color1
        }
        ]
    });
}

DrillDown(name, x, y, seriesname)
{

    alert(name);
}