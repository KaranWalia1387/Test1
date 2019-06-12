var Servicetable, CityID;
var defOpen = 1;
var mode = '1';
var databindtogrid;
TitleExport = 'service-report';
gridid = 'jqxgrid';
var divId = 'div-Servicechart';
var autoheightbool = false;
var autoheightPrimary = false;
var EndDate = "";
var StartDate = "";
var dtTo, dtFrom;
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

Date.prototype.getMonthName = function () {

    return this.monthNames[this.getMonth()];
};
Date.prototype.getShortMonthName = function () {

    return this.getMonthName().substr(0, 3);
};
var imagerenderer = function (row, datafield, value) {
    switch (datafield) {
        case 'City/ZipCode': return getView(row, value); break;
        default: return getresult(row, value); break;
    }

}

function getDate1() {

    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    dtTo = curr_month + 1 + "-" + curr_date + "-" + curr_year;
    dtFrom = curr_month + "-" + curr_date + "-" + (curr_year);
};

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
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    var gridColumns = [];//Array used store grid column properties
    var dataFieldColumns = [];//Array used to store grid column datafield
    var colDataFieldArray = [];
    colDataFieldArray.push("Created_Date");
    colDataFieldArray.push("Pending");
    colDataFieldArray.push("Completed");
    colDataFieldArray.push("Total");
    source = {
        datatype: "array",
        //datafields: dataFieldColumns,
        datafields: [
           { name: 'Created_Date', type: 'date' },
           { name: 'Completed', type: 'text' },
           { name: 'Pending', type: 'number' },
           { name: 'Total', type: 'text' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };

    try {
        var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );
    } catch (e) {

    }

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
    try {
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
            pagesizeoptions: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
            pagesize: 10,

            columnsresize: true,
            columnsreorder: true,
            columns:
           [
               { text: 'Created Date', dataField: 'Created_Date', width: '25%', columndate:'date', cellsformat: "MM/dd/yyyy" },
                { text: 'Attended Request', dataField: 'Completed', width: '25%' },
                { text: 'Pending Request', dataField: 'Pending', width: '25%' },
               { text: 'Total Requests', dataField: 'Total', width: '25%' }

           ]
            //columns: gridColumns
        });
    } catch (e)
    {
        
    }
    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).size() < 1025) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });
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
   
    getDate1();
    $('#btnFilter').click(function () {
      
        Submit1();
        var frm = $('#txtDateFrom').val();
        var to = $('#txtDateTo').val();
        if (frm != "" && to != "") {
            dateBindFirst(frm, to);
        }
        else if (frm != "" && to == "")
        {
            dateBindFirst(frm, EndDate);
            $('#txtDateTo').val(EndDate);
        }
        
        //  chartgraphsection(defOpen);
    });
    /* Usage page filter */
    $('#filter_btn_explorer').click(function () {
        $(this).toggleClass('active');
        $('#divFilter').toggle();
    });
    /* Usage page filter */
    //checkClientTimeZone();
    chartdivid = 'div-Servicechart';
    //For Mutually Exclusive Search Criteria
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
    //$('#defDate').text(firstDay.toLocaleDateString('EN') + '  ' + date.toLocaleDateString('EN'));

    //var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? date.toLocaleDateString('EN') : convertlocaltoutc($('#txtDateTo').val());
    //var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? firstDay.toLocaleDateString('EN') : convertlocaltoutc($('#txtDateFrom').val());
   // Servicetable = ServiceSample.LoadGridData(mode, dtFrom, dtTo, '', '', '', '').value;
    EndDate = dtTo;
    StartDate = dtFrom;
    Submit1();
 
    $('.imgtoggle').click(function () {

        $('.content').slideToggle('slow');
        var oldSrc = $('.imgtoggle').attr('src');
        var minusImg = "..\\images\\ArrowsMinus.png";
        var plusImg = "..\\images\\ArrowsPlus.png";
        oldSrc = oldSrc == minusImg ? plusImg : minusImg;
        $('.imgtoggle').attr('src', oldSrc);
    });


});




function getDate(dt) {
    try {
        var dat = new Date(dt);
        var str = dat.getMonth() + 1 + "/" + dat.getDate() + "/" + dat.getFullYear();
        return str;
    }
    catch (e) {
        
    }
}

//---------------Krishna Murari

function Submit1()
{
    getusage_date_time();
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
        if (dtFrom == "") {
            dtFrom = StartDate;
        }
        if (dtTo == "") {
            dtTo = EndDate;
        }
        var ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();
        if (ddlAccountType != '')
            mode = 3;
        var param =
            {
                mode: mode,
                datefrom: dtFrom,
                dateto: dtTo,
                cityid: city,
                zip: zip,
                customertype: ddlAccountType,
                reason:''
            };
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "ServiceSample.aspx/LoadGridData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                try {
                    data = data.d;
                    var result = $.parseJSON(data);
                    $('#hdnParamValues').val(mode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType + '|' + '');

                    databindtogrid = result.Table1;
                    var databindtograph = result.Table1;
                    var databindtolbl = result.Table;

                    if (databindtolbl[0]["SR_Count"] == 0 && databindtolbl[1]["SR_Count"] == 0 && databindtolbl[2]["SR_Count"] == 0) {
                        $('#nodata_div').show();
                        //$('#nodata_div1').show();
                        $('#nodata_div').html('<font color="Red">No Service Data available</font>');
                        //$('#nodata_div1').html('<font color="Red">No Data</font>');
                        $('#orderCompleted').text("0");
                        $('#demandusageval').text("0");
                        $('#totalOrder').text("0");
                        $('#jqxgrid').hide();
                        $('#chartDiv').hide();
                    }
                    else {
                        $('#orderCompleted').text(databindtolbl[0]["SR_Count"]);
                        $('#demandusageval').text(databindtolbl[1]["SR_Count"]);
                        $('#totalOrder').text(databindtolbl[2]["SR_Count"]);
                        $('#nodata_div').hide(); $('#jqxgrid').show();
                        $('#chartDiv').show();
                    }
                    if (mode == '1') {
                        // 
                        gridid = 'jqxgrid';
                        loadfilterChart(); LoadGrid();

                    }
                    else {

                        gridid = 'jqxgrid';
                        loadfilterChart(); LoadGrid();

                    }
                    loader.hideloader();
                }
                    catch (e)
                {
                    loader.hideloader();
                }
            },
            error: function (request, status, error) { loader.hideloader(); alert('Error!!' + request.statusText); }
        });
    }
    catch(e)
    {

    }
}


//added this function to get row index
var row;
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

//By Krishna Murari

function getusage_date_time() {
    var startDate = $('#txtDateFrom').val();
    var endDate = $('#txtDateTo').val();
    var dsplit = endDate.split("/");
    var dateEnds = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
    dsplit = startDate.split("/");
    var dateStarts = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
    $('#defDate').text(monthNames[dateStarts.getMonth()] + ' ' + dateStarts.getDate() + ', ' + dateStarts.getFullYear() + ' - ' + monthNames[dateEnds.getMonth()] + ' ' + dateEnds.getDate() + ', ' + dateEnds.getFullYear());
}

function getMonthName(monthIndex) {
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    return monthIndex > 0 || monthIndex < 13 ? month[monthIndex - 1] : "error in index";

}

function loadfilterChart() {
    var processed_json = [];
    var processed_json2 = [];
    $.map(databindtogrid, function (obj, i) {
        var date = new Date(obj.Created_Date);
        var year1 = date.getUTCFullYear();
        var month = date.getUTCMonth();
        var day = date.getDate();
        processed_json.push({
            name: (month + 1) + '/' + day ,
           // name: obj.Created_Date.slice(0,-5),
            y: obj.Pending,
            year: year1,
        })
        , processed_json2.push({
            name: (month + 1) + '/' + day ,
            //name: obj.Created_Date.slice(0, -5),
            month: day + getMonthName(month + 1),
            day: day + getMonthName(day),
            y: obj.Completed,
            year: year1,
        })
    });
    $('#chartDiv').highcharts({
        chart: {
            zoomType: 'x', type: 'areaspline'
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: false
        },
        credits: {
            enabled: false
        },
        //exporting: {
        //    enabled: false
        //},
        title: {
            text: '',
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            maxPadding: 0.09,
            title: {
                text: 'Number of Service Requests',
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
           // lineColor: '#999',
           // lineWidth: 1,
            formatter: function () {
                return this.value; // clean, unformatted number for year
            },
            type: "category",
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                //text: ''
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
            labels: {

                enabled: true,
                rotation: -70,
                style: {
                    color: '#333333',
                    margin: "-20px",
                    fontSize: '10px',
                }
            },
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
     tooltip: {
         shared: false,        
         //useHTML: true,
         //headerFormat: '<small><b>Date: </b>{point.key}</small><table>',
         //pointFormat: '<tr><td><b>{series.name}: </b></td>' +
         //    '<td style="text-align: right">{point.y}</td></tr>',
         //footerFormat: '</table>',
         formatter: function () {
             //return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': '+'</b>' + changetoK(Math.abs(this.y));
             return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': ' + '</b>' + this.y;
         }
     },

     series: [
          {
              showInLegend: true,
              name: 'Attended Request',
              data: processed_json2,
              color: colorarrHEX[3],//'#D5D5D5', // interval of 1 day}
          },
             {
                 showInLegend: true,
                 name: 'Pending Request ',
                 data: processed_json,
                 color: colorarrHEX[1],//'#8CC1C9', // interval of 1 day
             }
       
        ]

   })

}



