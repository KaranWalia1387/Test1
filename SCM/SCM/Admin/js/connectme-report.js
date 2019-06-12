var defOpen = 1;
var Connectmetable;
var mode = '1';
var databindtogrid;
TitleExport = 'connectme-report';
gridid = 'jqxgrid';
var divId = 'chartDiv';
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
    return getresult(row, value);
};

function getDate1() {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    dtTo = curr_month + 1 + "-" + curr_date + "-" + curr_year;
    dtFrom = curr_month + "-" + curr_date + "-" + (curr_year);
};

function getresult(row, value) {
    var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;
    return '<div style="text-align: left;"><span id=' + cityId + ' class=filterdrop >' + value + '</span></div>';
}

//on page load
function LoadGrid() {
    autoheightPrimary = false;
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    source = {
        datatype: "array",
        datafields: [
           { name: 'Created_Date', type: 'date' },
           { name: 'RespondedMessages', type: 'number' },
           { name: 'PendingMessages', type: 'number' },
           { name: 'TotalMessages', type: 'number' }
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
    try {
        $("#jqxgrid").jqxGrid({
            width: "99.8%",
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
                { text: 'Month Year', dataField: 'Created_Date', width: '25%', columntype: Date, cellsformat: 'MM/dd/yyyy' },
                { text: 'Responded Messages', dataField: 'RespondedMessages', width: '25%' },
                { text: 'Pending Messages', dataField: 'PendingMessages', width: '25%' },
                { text: 'Total Messages', dataField: 'TotalMessages', width: '25%' }

            ]
        });
    }
    catch (e) {
        console.log(e.message);
    }
}

//for 2nd grid after filter
function LoadChildGrid() {
    autoheightbool = false;
    if (databindtogrid.length <= 10)
        autoheightbool = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
         { name: 'Created_Date', type: 'date' },
         { name: 'RespondedMessages', type: 'text' },
         { name: 'PendingMessages', type: 'text' },
         { name: 'TotalMessages', type: 'text' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    try {
        $("#jqxchildgrid").jqxGrid({
            width: "100%",
            autoheight: autoheightbool,
            height: "320",
            source: dataAdapter,
            sortable: true,
            selectionmode: 'singlerow', //To trigger row select event
            columnsresize: true,
            columnsreorder: true,
            enabletooltips: true,
            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
            pagesize: 10,
            columns:
            [
                 { text: 'Month Year', dataField: 'Created_Date', width: '25%' },
                { text: 'Responded Messages', dataField: 'RespondedMessages', width: '25%' },
                { text: 'Pending Messages', dataField: 'PendingMessages', width: '25%' },
                { text: 'Total Messages', dataField: 'TotalMessages', width: '25%' }
            ]
        });
    }
    catch (e) {
        console.log(e.message);
    }
}

//For high chart
function PiechartCommon(mode, caseId) {
    //var piechart = (mode == '1') ? Connectmetable.Tables[0] : Connectmetable.Tables[1];
    try {
        var piechart;
        var subPiechart;

        switch (parseInt(mode)) {
            case 1:
                piechart = Connectmetable.Table1;
                subPiechart = Connectmetable.Table1;
                break;
            case 2:
                piechart = Connectmetable.Table1;
                subPiechart = Connectmetable.Table1;
                break;
            case 3:
                piechart = Connectmetable.Table1;
                subPiechart = Connectmetable.Table1;
                break;
        }
        $('#connectMeTitle').html('');
        //To remove title if dates are blank
        var title;
        if ($('#txtDateFrom').val() != "" && $('#txtDateTo').val() != "")
            title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
        else
            title = "";
        //var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
        $('#connectMeTitle').html("<b>" + title + "</b>");

        if (piechart.length > 0) {
            $('#chartDiv').show();
            $('#connectMeTitle').show();
            $('#nodata_div').hide();
            $('#nodata_div1').hide();
        }
        else {
            $('#nodata_div').show();
            $('#nodata_div1').show();
            $('#nodata_div').html('<font color="Red">No Connect Me Data available</font>');
            $('#nodata_div1').html('<font color="Red">No Connect Me Data available</font>');
            $('#chartDiv').hide();
            $('#connectMeTitle').hide();
            $('#jqxgrid').hide();
            $('#jqxchildgrid').hide();
        }
        
        processed_json = new Array();
        processed_json1 = new Array();
        processed_json2 = new Array();
        
        switch (parseInt(mode)) {
            case 1:
                $.map(piechart, function (obj, i) {
                    processed_json.push({
                        name: obj.Created_Date.slice(0, -5),
                        y: obj.RespondedMessages,
                        color: '#30cd94',
                        title: 'Connect Me',
                    });

                    processed_json2.push({
                        name: obj.Created_Date.slice(0, -5),
                        y: obj.PendingMessages,
                        color: '#ed5d5d',
                        title: 'Connect Me',
                    });
                });
                break;
            case 2:
                $.map(piechart, function (obj, i) {
                    var date = new Date(obj.Created_Date);
                    var year1 = date.getUTCFullYear();
                    var month = date.getUTCMonth();
                    var day = date.getUTCDate();
                    processed_json.push({
                        name: (month + 1) + '/' + day,
                        y: obj.RespondedMessages,
                        color: '#30cd94',
                        title: 'Connect Me',
                    });

                    processed_json2.push({
                        name: (month + 1) + '/' + day,
                        y: obj.PendingMessages,
                        color: '#ed5d5d',
                        title: 'Connect Me',
                    });
                });
                break;
            case 3:
                $.map(piechart, function (obj, i) {
                    var date = new Date(obj.Created_Date);
                    var year1 = date.getUTCFullYear();
                    var month = date.getUTCMonth();
                    var day = date.getUTCDate();
                    processed_json.push({
                        name: (month + 1) + '/' + day,
                        y: obj.RespondedMessages,
                        color: '#30cd94',
                        title: 'Connect Me',
                    });

                    processed_json2.push({
                        name: (month + 1) + '/' + day,
                        y: obj.PendingMessages,
                        color: '#ed5d5d',
                        title: 'Connect Me',
                    });
                });
                break;
        }
        BindhighChart2SeriesAdminReports('areaspline', 'chartDiv', 'Responded Messages', '#30cd94', 'Pending Messages', '#ed5d5d');
    }
    catch (e) {
        console.log(e.message);
    }


}

function chartclick(name, chartType, drilldown, type) {
    var tempTable;
    var processed_json4 = new Array();
    if (drilldown.indexOf('ReadStatusMode') >= 0) {
        if (drilldown.indexOf('ReadStatusMode1') == 0) {
            var res = name.split("-");
            tempTable = Connectmetable.Tables[1];
            $.map(tempTable.Rows, function (obj, i) {
                if (obj.CityName == res) {
                    processed_json4.push({
                        name: obj.CityName + '-' + obj.TopicName,
                        y: obj.TotalTopic,
                        color: colorarrHEX[i],
                        title: obj.CityName + '-' + obj.TopicName,
                        //drilldown: 'ReadStatusMode1'
                    });
                }
            });

        }
        else if (drilldown.indexOf('ReadStatusMode2') == 0) {
            var res = name.split("-");
            tempTable = Connectmetable.Tables[2];
            $.map(tempTable.Rows, function (obj, i) {
                if (obj.ZipCode == res) {
                    processed_json4.push({
                        name: obj.ZipCode + '-' + obj.TopicName,
                        y: obj.TotalTopic,
                        color: colorarrHEX[i],
                        title: obj.ZipCode + '-' + obj.TopicName,
                        //drilldown: 'ReadStatusMode1'
                    });
                }
            });
        }
        else if (drilldown.indexOf('ReadStatusMode3') == 0) {
            var res = name.split("-");
            tempTable = Connectmetable.Tables[2];
            $.map(tempTable.Rows, function (obj, i) {
                if (obj.CustomerTypeDesc == res) {
                    processed_json4.push({
                        name: obj.CustomerTypeDesc + '-' + obj.TopicName,
                        y: obj.TotalTopic,
                        color: colorarrHEX[i],
                        title: obj.CustomerTypeDesc + '-' + obj.TopicName,
                        //drilldown: 'ReadStatusMode1'
                    });
                }
            });
        }
        return processed_json4;
    }
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

    getDate1()
    chartdivid = 'chartDiv';
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
    //$('#defDate').text(firstDay.toLocaleDateString('EN') + '  ' + date.toLocaleDateString('EN'));
    submit1();
    //Ruchika(20-Oct-2015): 'mode' as parameter is not being used in new implementation of Admin reports for Connectme. Procedure returs data without it. Discussed with Saurabh.
    //Connectmetable = Connectme1.LoadGridData(mode, dtFrom, dtTo, '', '', '').value;

    //$('#hdnParamValues').val(mode +'|'+ $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '||||||0');
    //databindtogrid = Connectmetable.Tables[1].Rows;
    //Connectmetable.Tables[0].Rows[1]["cnt"]
    //$('#lblRespondedMsg').text(Connectmetable.Tables[0].Rows[1]["cnt"]);
    //$('#lblPendingMsg').text(Connectmetable.Tables[0].Rows[0]["cnt"]);
    //$('#lblTotalMsg').text(Connectmetable.Tables[0].Rows[2]["cnt"]);
    //LoadGrid();
    //PiechartCommon(mode);

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
        submit1();
    });

    //By Krishna Murari----Generate report in Excel
    //$("#btnExcelExport").click(function () {
    //    try {
    //        if (document.getElementById('tabledivarea').style.display == 'block') {
    //            LoadGrid();
    //            $("#" + gridid).jqxGrid('exportdata', 'xls', 'Connect Me Report');
    //        }
    //        else {
    //            document.getElementById('graphdivarea').style.display = 'none';
    //            document.getElementById('tabledivarea').style.display = 'block';

    //            LoadGrid();
    //            $("#" + gridid).jqxGrid('exportdata', 'xls', 'Connect Me Report');
    //            document.getElementById('graphdivarea').style.display = 'block';
    //            document.getElementById('tabledivarea').style.display = 'none';
    //        }
    //    } catch (e) {

    //    }
    //});


});

//By Krishna Murari
function getusage_date_time() {
    var startDate = $('#txtDateFrom').val();
    var endDate = $('#txtDateTo').val();
    var dsplit = endDate.split("/");
    var dateEnds = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
    dsplit = startDate.split("/");
    var dateStarts = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
    $('#lblDateRange').text(monthNames[dateStarts.getMonth()] + ' ' + dateStarts.getDate() + ', ' + dateStarts.getFullYear() + ' - ' + monthNames[dateEnds.getMonth()] + ' ' + dateEnds.getDate() + ', ' + dateEnds.getFullYear());
    //  $('#lblDateRange').text(monthNames[dateEnds.getMonth()] + ' ' + dateEnds.getDate() + ', ' + dateEnds.getFullYear() + ' - ' + monthNames[dateStarts.getMonth()] + ' ' + dateStarts.getDate() + ', ' + dateStarts.getFullYear());   
}
function submit1() {
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

        mode = city != '' ? (zip == '' ? '2' : '3') : (zip == '' ? '1' : '3');

        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        if (dtFrom == "") {
            dtFrom = StartDate;

        }
        if (dtTo == "") {
            dtTo = EndDate;
        }
        dtFrom = getDate(dtFrom);
        dtTo = getDate(dtTo);
        var ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();
        //if (ddlAccountType != '')
        //{ mode = 3; }
        var param =
            {
                mode: mode,
                datefrom: dtFrom,
                dateto: dtTo,
                cityid: city,
                zip: zip,
                customertype: ddlAccountType
            };
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "Connectme1.aspx/LoadGrid",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                try {
                    data = data.d;
                    var result = $.parseJSON(data);
                    Connectmetable = result;
                    databindtogrid = result.Table1;



                    PiechartCommon(mode);
                    $('#hdnParamValues').val(mode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType);
                    if (databindtogrid.length == 0 && result.Table.length == 0) {
                        $('#lblRespondedMsg').text("0");
                        $('#lblPendingMsg').text("0");
                        $('#lblTotalMsg').text("0");
                        $('#jqxgrid').hide();
                        $('#jqxchildgrid').hide();
                        $('#nodata_div').show();
                        $('#nodata_div').html('<font color="Red" style="position: relative;top: 10px;font-size: 13px;">No Connect Me Data available</font>');
                    }
                    else {

                        $('#nodata_div').hide();
                        $('#lblPendingMsg').text(result.Table[0]["cnt"]);
                        $('#lblRespondedMsg').text(result.Table[1]["cnt"]);
                        $('#lblTotalMsg').text(result.Table[2]["cnt"]);
                        $("#iPendingMsg").text(result.Table[0]["MessageType"])
                        $("#demandusagetext").text(result.Table[1]["MessageType"])
                        $("#iTotalMessage").text(result.Table[2]["MessageType"])

                    }
                    if (mode == '1') {
                        $('#jqxgrid').show();
                        $('#jqxchildgrid').hide();
                        gridid = 'jqxgrid';
                        LoadGrid();

                    }
                    else {
                        $('#jqxgrid').hide();
                        if (databindtogrid.length > 0) {
                            $('#jqxchildgrid').show();
                            $('#nodata_div').hide();
                            $('#nodata_div1').hide();
                        } else {
                            $('#jqxchildgrid').hide();
                            $('#nodata_div').show();
                            $('#nodata_div1').show();
                            $('#nodata_div').html('<font color="Red">No Connect Me Data available</font>');
                            $('#nodata_div1').html('<font color="Red">No Connect Me Data available</font>');
                        }
                        gridid = 'jqxchildgrid';
                        LoadChildGrid();

                    }
                    loader.hideloader();
                } catch (e) {
                    loader.hideloader();
                }
            },
            error: function (request, status, error) { loader.hideloader(); alert('Error!! ' + request.statusText); }
        });
    }
    catch (e) {

    }
}

function getDate(dt) {
    try {
        var dat = new Date(dt);
        var str = dat.getMonth() + 1 + "/" + dat.getDate() + "/" + dat.getFullYear();
        return str;
    }
    catch (e) {
        console.log(e.message);
    }
}

