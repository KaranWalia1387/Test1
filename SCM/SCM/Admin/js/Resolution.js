var defOpen = 1;
var BrowserTable;
var databindtogrid;
var firstResultset;
var resolutiontable;
var toDate, fromDate;
var zipcode = '', cityid = '', acctType = '';

$(document).ready(function () {
    $('#jqxgrid').show();
    $('#divnodata').hide();
    getDate();
    setDate();
    submit();

    $('#btnFilter').click(function () {
        setDate();
        submit();
    });


    $("#btnExcelExport").click(function () {

        try {
            document.getElementById('tabledivarea').style.display = 'block';
            document.getElementById('graphDiv').style.display = 'block';

            if (gridid == 'jqxgrid')
                LoadGrid();
            else
                LoadChildGrid();
            $("#" + gridid).jqxGrid('exportdata', 'xls', 'Resolution Report');

            document.getElementById('graphDiv').style.display = 'none';
            document.getElementById('tabledivarea').style.display = 'none';

            if (defOpen == 1) {
                document.getElementById('graphDiv').style.display = 'block';
                document.getElementById('tabledivarea').style.display = 'block';
            }

        } catch (e) {
            if (defOpen == 1)
                document.getElementById('graphDiv').style.display = 'block';
            else {
                document.getElementById('graphDiv').style.display = 'none';
            }
        }
    });

});


function LoadGrid() {
    try {
        autoheightPrimary = false;
        if (databindtogrid.length == 0) {
            $('#divnodata').show();
            $('#jqxgrid').hide();
            $('#jqxchildgrid').hide();
        }
        else {
            $('#divnodata').hide();
            $('#jqxgrid').show();
            $('#jqxchildgrid').show();
        }
        if (databindtogrid.length <= 10)
            autoheightPrimary = true;

        //Getting the source data with ajax GET request
        source = {
            datatype: "array",
            datafields: [
            { name: 'screenresolution' },
            { name: 'ClickCount', type: 'number' },
            ],
            async: false,
            record: 'Table',
            sortable: true,
            localdata: firstResultset
        };
        var dataAdapter = new $.jqx.dataAdapter(source,
            { contentType: 'application/json; charset=utf-8' }
        );

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
            pagesizeoptions: ['10', '20', '30', '40', '50', '100'],
            pagesize: 20,
            columnsresize: true,
            columnsreorder: true,
            columns:
            [
                { text: 'Screen Resolution', dataField: 'screenresolution', width: '50%', },
                { text: 'Customers', dataField: 'ClickCount', width: '50%' }
            ]
        });
    } catch (e) {
        console.log(e.message);
    }

}

function submit() {
    try {

        loader.showloader();
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();
        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                //   alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                //loader.hideloader();
                return false;
            }
        }
        // loader.showloader();
        var city = '';
        var zip = '';
        //if (ValidatePage('divFilter')) {
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
            cityid: city,
            zip: zip,
            customertype: ddlAccountType

        }
        $('#hdnParamValues').val(dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType);

        $.ajax({
            type: "POST",
            url: "Resolution.aspx/LoadGridData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: OnSuccess,
            error: OnError
        });
        //}
        //else { return false; }

    }
    catch (e) { }
}

function OnSuccess(data, status) {
    loader.showloader();
    data = data.d;
    var result = $.parseJSON(data);
    resolutiontable = result;
    firstResultset = result.Table;
    databindtogrid = result.Table1;
    loader.hideloader();
    if (databindtogrid.length == 0) {
        $('#nodata_div').show(); $(".grid-section").hide();
        $('#jqxgrid').hide();
        $('#jqxchildgrid').hide();
        $('#chartDiv').hide();
        changeHeadervalues();
    }
    else {
        $(".grid-section").show();
        $('#jqxgrid').show(); $('#nodata_div').hide();
        $('#jqxchildgrid').hide();
        gridid = 'jqxgrid';
        var name = $('.left-active-sprites ul li a.active').closest('li').attr('class');
        if (name == "chart") {
            $("#chartDiv").hide();
            $("#graphDiv").show();
        }
        else {
            $("#chartDiv").show();
            $("#graphDiv").hide();
        }
        changeHeadervalues();
        //if (databindtogrid.length <= 10)
        //    autoheightPrimary = true;
        LoadChart();
        LoadGrid();
        //}
    }
    loader.hideloader();
}



// NEW UI 12/17/2014



function OnError(request, status, error) {
    loader.hideloader();
    alert('Error!! ' + request.statusText);
}

function nodatashow() {
    $('#nodata_div').show();
    $('#jqxgrid').hide();
    $('#jqxchildgrid').hide();
    $('#chartDiv').hide();
}

function changeHeadervalues() {
    //BrowserTable = Resolution.getData(fromDate, toDate, cityid, zipcode, acctType);

    $('#Resolution1').text("Users of " + firstResultset[0]["screenresolution"]);
    $('#Resolution2').text("Users of " + firstResultset[1]["screenresolution"]);
    $('#Resolution3').text("Users of " + firstResultset[2]["screenresolution"]);
    $('#Resolution4').text("Users of " + firstResultset[3]["screenresolution"]);

    $('#ResolutionCnt1').text(firstResultset[0]["ClickCount"]);
    $('#ResolutionCnt2').text(firstResultset[1]["ClickCount"]);
    $('#ResolutionCnt3').text(firstResultset[2]["ClickCount"]);
    $('#ResolutionCnt4').text(firstResultset[3]["ClickCount"]);

}

function LoadChart() {

    processed_json = new Array();
    processed_json2 = new Array();
    processed_json3 = new Array();
    processed_json4 = new Array();
    var x1, x2, x3, x4;
    //firstResultset = BrowserTable.value.Tables[0].Rows;
    if (databindtogrid.length > 0) {
        // databindtogrid = BrowserTable.value.Tables[1].Rows;
        x1 = firstResultset[0]["screenresolution"];

        if (databindtogrid.length > 0) {
            $.map(databindtogrid, function (obj, i) {
                processed_json.push({
                    name: obj.Date.slice(0, -5),
                    y: obj[x1]
                });
            });

            if (databindtogrid.length > 0) {
                x2 = firstResultset[1]["screenresolution"];
                $.map(databindtogrid, function (obj, i) {
                    processed_json2.push({
                        name: obj.Date.slice(0, -5),
                        y: obj[x2]
                    });
                });
            }

            if (databindtogrid.length > 0) {
                x3 = firstResultset[2]["screenresolution"];
                $.map(databindtogrid, function (obj, i) {
                    processed_json3.push({
                        name: obj.Date.slice(0, -5),
                        y: obj[x3]
                    });
                });
            }

            if (databindtogrid.length > 0) {
                x4 = firstResultset[3]["screenresolution"];
                $.map(databindtogrid, function (obj, i) {
                    processed_json4.push({
                        name: obj.Date.slice(0, -5),
                        y: obj[x4]
                    });
                });
            }
        }
    }

    title = 'Number Of Customers'
    BindhighChart4SeriesAdminReports('areaspline', 'chartDiv', x1, x2, x3, x4);

    //databindtogrid = BrowserTable.value.Tables[1].Rows;



}

function getDate() {

    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    toDate = curr_month + "-" + curr_date + "-" + curr_year;
    fromDate = curr_month + "-" + (curr_date) + "-" + (curr_year - 1);
}

function setDate() {
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
    else {
        var bfrdate = (prevDate.getMonth() + 1) + '/' + prevDate.getDate() + '/' + prevDate.getFullYear();
        var curdate = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
        $('#txtDateFrom').val(bfrdate);
        $('#txtDateTo').val(curdate);

        var dateRange = months[prevDate.getMonth()] + ' ' + prevDate.getDate() + ', ' + prevDate.getFullYear() + ' - ' + months[currentDate.getMonth()] + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear();
        $('#lblDateRange').text(dateRange);
    }
}

function LoadFilterData() {
    try {

        $('#jqxgrid').show();
        // $('.grid-section_1').show();
        $('#divnodata').hide();
        //fromDate = replace($('#txtDateFrom').val());
        //toDate = replace($('#txtDateTo').val());

        fromDate = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        toDate = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        if (fromDate != '' && toDate != '') {
            if (Date.parse(fromDate) > Date.parse(toDate)) {
                $("#txtDateTo").val('');
                //   alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }

        zipcode = ''; cityid = '';
        if ($('#ddlCity option:selected').attr('key') == 'CityName') {
            cityid = $('#ddlCity option:selected').val();
        }
        else if ($('#ddlCity option:selected').attr('key') == 'Zipcode') {
            cityid = $('#ddlCity option:selected').attr('cityid');
            zipcode = $('#ddlCity option:selected').val();

        }
        acctType = $('#ddlAccountType option:selected').val();
        $('#hdnParamValues').val(fromDate + '|' + toDate + '|' + cityid + '|' + zipcode + '|' + acctType);
        BrowserTable = Resolution.getData(fromDate, toDate, cityid, zipcode, acctType);
        //  loader.hideloader();

        if (BrowserTable.value.getTable("Table1").Rows.length > 0) {
            databindtogrid = BrowserTable.value.Tables[0].Rows;
            //var length = parseInt(BrowserTable.value.Tables[2].Rows.length);
            //$('.usage_date_time').html('<b>' + BrowserTable.value.Tables[2].Rows[0].BMOnth + '-' + BrowserTable.value.Tables[2].Rows[length - 1].BMOnth + '</b>')
            //LoadHeader();
            LoadChildGrid();
            LoadChart();

        }
        else {
            $('#divnodata').show();
            $('#jqxgrid').hide();
            // $('.grid-section_1').hide();
        }
    } catch (e) {
        console.log(e.message);
    }

}

function replace(text) {
    var dateArr = text.split('/');
    var val = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
    return val;

}

function LoadChildGrid() {

    autoheightPrimary = false;
    if (databindtogrid != null && databindtogrid.length == 0) {
        $('#jqxgrid').hide();
        $('#jqxchildgrid').hide();
    }
    else {
        $('#divnodata').hide();
        $('#jqxgrid').hide();
        $('#jqxchildgrid').show();

    }
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;

    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
        { name: 'screenresolution' },
            { name: 'ClickCount', type: 'number' },
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
        autoheight: autoheightPrimary,
        height: "320",
        source: dataAdapter,
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event

        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50', '100'],
        pagesize: 100,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Screen Resolution', dataField: 'screenresolution', width: '50%', },
            { text: 'Click Count', dataField: 'ClickCount', width: '50%' }
        ]
    });


}