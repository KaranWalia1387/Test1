var Servicetable;
gridid = 'jqxgrid';

$(document).ready(function () {
    try
    {
        //checkClientTimeZone();
        var date = new Date();

        $('#txtDateFrom').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getFullYear() - 2));
        $('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());

        Servicetable = $.parseJSON(LoginDetails.GetData(convertlocaltoutc($('#txtDateFrom').val()), convertlocaltoutc($('#txtDateTo').val())).value);

        $('#hdnParamValues').val($('#txtDateFrom').val() + '|' + $('#txtDateTo').val());

        LoadGrid();

        $('#btnFilter').click(function () { submit(); });

        $("#excelExportServiceRequest").click(function () { $("#" + gridid).jqxGrid('exportdata', 'xls', 'Failed Login Request Analysis'); });

        $('.imgtoggle').click(function () {
            try {
                $('.content').slideToggle('slow');
                var oldSrc = $('.imgtoggle').attr('src');
                var minusImg = "..\\images\\ArrowsMinus.png";
                var plusImg = "..\\images\\ArrowsPlus.png";
                oldSrc = oldSrc == minusImg ? plusImg : minusImg;
                $('.imgtoggle').attr('src', oldSrc);
            }
            catch (e) {
            }
        });
    }
    catch (e) {       
    }
});

//function checkClientTimeZone() {
//    try{
//        // Set the client time zone
//        var dt = new Date();
//        var tz = -dt.getTimezoneOffset();
//        LoginDetails.setcookie(tz.toString());
//        // Expire in one year
//        dt.setYear(dt.getYear() + 1);
//    }
//    catch (e) {        
//    }
//}

function LoadGrid() {
    try {
        data = Servicetable.Table;
        autoheightPrimary = false;
        if (Servicetable.length == 0) {
            $('#nodata_div').show();
        }
        else {
            $('#nodata_div').hide();
        }
        if (Servicetable.length <= 10)
            autoheightPrimary = true;
        //Getting the source data with ajax GET request
        source = {
            datatype: "array",
            datafields: [
                { name: 'LoginhistoryId' },
                { name: 'CustomerID' },
                { name: 'LoginDateTime', type: 'date' },
                { name: 'IPAddress' },
                { name: 'LoginStatus' },
                { name: 'LoginStatusDesc' },
                { name: 'HomePhone' },
                { name: 'UserName' },
                { name: 'Name' },
                { name: 'EmailID' }
             ],
            async: false,
            record: 'Table',
            sortable: true,
            localdata: data
        };

        var dataAdapter = new $.jqx.dataAdapter(source,
            { contentType: 'application/json; charset=utf-8' }
        );

        $("#jqxgrid").jqxGrid({

            width: "100%",
            autoheight: autoheightPrimary,
            height: "320",
            source: dataAdapter,
            sortable: true,
            selectionmode: 'singlerow', //To trigger row select event

            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50'],
            pagesize: 20,

            columnsresize: true,
            columnsreorder: true,
            columns:
            [
                { text: 'Login History Id', dataField: 'LoginhistoryId', hidden: true },
                { text: 'Customer ID', dataField: 'CustomerID', hidden: true },
                { text: 'Login Date/Time', dataField: 'LoginDateTime', cellsformat: "MM/dd/yyyy HH:mm", width: '25%' },
                { text: 'IP Address', dataField: 'IPAddress', width: '25%' },
                { text: 'Login Status', dataField: 'LoginStatus', width: '25%', hidden: true },
                { text: 'Login Status', dataField: 'LoginStatusDesc', width: '25%' },
                { text: 'Home Phone', dataField: 'HomePhone', width: '17%', hidden: true  },
                { text: 'User Name', dataField: 'UserName', width: '25%' },
                { text: 'Name', dataField: 'Name', width: '15%', hidden: true },
                { text: 'Email', dataField: 'EmailID', width: '17%', hidden: true }
            ]
        });

        $("#jqxgrid").on('bindingcomplete', function () {
            if ($(window).width() < 1025) {
                $("#jqxgrid").jqxGrid('autoresizecolumns');
            }
        });
    }
    catch (e) {
        alert(e.message);

    }
}


function submit() {
    var startDate = $('#txtDateFrom').val();
    var endDate = $('#txtDateTo').val();

    if (!isDate(startDate)) {
        alert('Invalid From date format,Please select/enter MM/DD/YYYY.');
        $('#txtDateFrom').focus();
        return false;
    }

    if (!isDate(endDate)) {
        alert('Invalid To Date format,Please select/enter MM/DD/YYYY. ');
        $('#txtDateTo').focus();
        return false;
    }

    if (startDate != '' && endDate != '') {
        if (Date.parse(startDate) > Date.parse(endDate)) {
            $("#txtDateTo").val('');
            //alert("From date should not be greater than to date");
            alert("'From Date' should not be greater than 'To date'");
            $("#txtDateTo").val("");
            return false;
        }
    }

    var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
    var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();

    Servicetable = $.parseJSON(LoginDetails.GetData(dtFrom, dtTo).value);

    //for pdf
    $('#hdnParamValues').val(dtFrom + '|' + dtTo);
    databindtogrid = Servicetable.Table;
    if (Servicetable.length == 0) {
        $('#jqxgrid').hide();
        $('#nodata_div').show();
        $('#nodata_div1').show();
        $('#nodata_div').html('<font color="Red">No Data</font>');
        $('#nodata_div1').html('<font color="Red">No data</font>');
    }
    LoadGrid();
}