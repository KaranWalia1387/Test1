var hashtable = {};
var city = '';
var divId = 'div-ViewUserchart'; //added chart control
var usertable;
var defOpen = 1;
var autoheightbool = false;
var autoheightPrimary = false;
var popupdetails;
var jsonBillgridData, jsonPaymentgridData, jsonConnectMedata, jsonServiceRequestData, jsonServicePlandata;
var TimeOffSet = (new Date()).getTimezoneOffset();
var ZipcodeDetails = '';
var colorarrHEX = ['#1f8aa7', '#a19999', '#ac4040', '#30cd94', '#cda24c', '#6ab3c8', '#a27cb0', '#28aca6', '#4d4366', '#6e8953', '#087189', '#decc00', '#f1c354'];
var mode = '1';
var databindtogrid;
var JsonMap;
var zip = '';
var GridHeight = '';
var ViewObj = '';
gridid = 'jqxgrid';
percentwidth = .98;
var custId = '';


var RebateDiv;
var ProgramDiv;
var str = '';
var count = 1;

function FillCustomerDetails(popupdetails) {
    jsonBillgridData = popupdetails.Tables[1].Rows;
    jsonPaymentgridData = popupdetails.Tables[2].Rows;
    jsonConnectMedata = popupdetails.Tables[3].Rows;
    jsonServiceRequestData = popupdetails.Tables[4].Rows;
    jsonServicePlandata = popupdetails.Tables[0].Rows;

    MarketingPreferences(popupdetails.Tables[6].Rows);
    if (popupdetails.Tables[7].Rows != null && popupdetails.Tables[7].Rows.length > 0) {
        LoadMeterNumberGrid(popupdetails.Tables[7].Rows);
    }
    LoadMeterNumberGrid(popupdetails.Tables[7].Rows);
}

function ConvertData() {
    try {
        Tables = new Array();
        $.map(CustomerData, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        usertable = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}

function LoadProfile(popupdetails, AccountNumber) {
    // for (var i = 0; i < databindtogrid.length; i++) {
    // if (databindtogrid[i].CustomerId == custId) {

    //for (var i = 0; i < popupdetails.length; i++) {
    //    if (AccountNumber == popupdetails[i].Accountnumber) {
      
    //$('#custName').html(popupdetails.Tables[0].Rows[0]["FullName"]);
    //$('#lblCustName').html(popupdetails.Tables[0].Rows[0]["FullName"]);
    //$('#lblLoginId').html(popupdetails.Tables[0].Rows[0]["FullName"]);
    //$('#lblCity').html(popupdetails.Tables[0].Rows[0]["CityName"]);
    //$('#lblZipCode').html(popupdetails.Tables[0].Rows[0]["ZipCode"]);
    //$('#statusUser').html(popupdetails.Tables[0].Rows[0]["Status"]);
    //$('#accounttype').html(popupdetails.Tables[0].Rows[0]["CustomerType"]);
    //$('#paperBill').html(popupdetails.Tables[0].Rows[0].Paperless);
    //$('#lblEmailId').html(popupdetails.Tables[0].Rows[0].EmailID);
    //$('#lblAlternateEmailId').html(popupdetails.Tables[0].Rows[0].AlternateEmailID != '' ? popupdetails.Tables[0].Rows[0].AlternateEmailID : 'N/A');
    //$('#lblMobile').html(popupdetails.Tables[0].Rows[0].MobilePhone != '' ? (popupdetails.Tables[0].Rows[0].MobilePhone).replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : popupdetails.Tables[0].Rows[0].MobilePhone);
    //$('#lblCreateDate').html(popupdetails.Tables[0].Rows[0].CreatedDate);
    //$('#lblAlternateNumber').html(popupdetails.Tables[0].Rows[0].HomePhone == '' || popupdetails.Tables[0].Rows[0].HomePhone == null ? 'N/A' : (popupdetails.Tables[0].Rows[0].HomePhone).replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3"));
    //// Load Map Location
    //latitude = popupdetails.Tables[0].Rows[0].Latitude;
    //longitude = popupdetails.Tables[0].Rows[0].Longitude;
    //cityname = popupdetails.Tables[0].Rows[0].CityName;
    //zipcode = popupdetails.Tables[0].Rows[0].ZipCode;
    //addr1 = popupdetails.Tables[0].Rows[0].Address1;
    //addr2 = popupdetails.Tables[0].Rows[0].Address2;
    ////    break;
    ////}

    //// }
    //var iplogin = popupdetails.Tables[0].Rows[0]["IPAddress"] == null ? 'N/A' : popupdetails.Tables[0].Rows[0]["IPAddress"];
    //var parseddate = popupdetails.Tables[0].Rows[0]["LastLoginDateTime"] == null ? 'Never' : new Date(popupdetails.Tables[0].Rows[0]["LastLoginDateTime"]);
    ////bug id 17962 resolved

    //if (parseddate != 'Never') {
    //    var hours = parseddate.getHours() > 12 ? parseddate.getHours() - 12 : parseddate.getHours();
    //    var am_pm = parseddate.getHours() >= 12 ? "PM" : "AM";
    //    hours = hours < 10 ? "0" + hours : hours;
    //    var minutes = parseddate.getMinutes() < 10 ? "0" + parseddate.getMinutes() : parseddate.getMinutes();
    //    var seconds = parseddate.getSeconds() < 10 ? "0" + parseddate.getSeconds() : parseddate.getSeconds();
    //    $('#textStatus').html(iplogin + " & " + (parseddate.getMonth() < 9 ? '0' + (parseddate.getMonth() + 1).toString() : parseddate.getMonth() + 1) + '/'
    //       + (parseddate.getDate() < 10 ? '0' + parseddate.getDate().toString() : parseddate.getDate()) + '/' + parseddate.getFullYear() + " " + hours + ":" + minutes + ":" + seconds + " " + am_pm);
    //} else {
    //    $('#textStatus').html(iplogin + " & " + parseddate);
    //}

    //    }
    //}


    for (var i = 0; i < popupdetails.length; i++) {
        if (AccountNumber == popupdetails[i].Accountnumber) {

            $('#custName').html(popupdetails[i].FullName);
            $('#lblCustName').html(popupdetails[i].FullName);
            $('#lblLoginId').html(popupdetails[i].FullName);
            $('#lblCity').html(popupdetails[i].CityName);
            $('#lblZipCode').html(popupdetails[i].ZipCode);
            $('#statusUser').html(popupdetails[i].Status);
            $('#accounttype').html(popupdetails[i].CustomerType);
            $('#paperBill').html(popupdetails[i].Paperless);
            $('#lblEmailId').html(popupdetails[i].EmailID);
            $('#lblAlternateEmailId').html(popupdetails[i].AlternateEmailID != '' ? popupdetails[i].AlternateEmailID : 'N/A');
            $('#lblMobile').html(popupdetails[i].MobilePhone != '' ? (popupdetails[i].MobilePhone).replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : popupdetails[i].MobilePhone);
            $('#lblCreateDate').html(popupdetails[i].CreatedDate);
            $('#lblAlternateNumber').html(popupdetails[i].HomePhone == '' || popupdetails[i].HomePhone == null ? 'N/A' : (popupdetails[i].HomePhone).replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3"));
            // Load Map Location
            latitude = popupdetails[i].Latitude;
            longitude = popupdetails[i].Longitude;
            cityname = popupdetails[i].CityName;
            zipcode = popupdetails[i].ZipCode;
            addr1 = popupdetails[i].Address1;
            addr2 = popupdetails[i].Address2;
            //    break;
            //}

            // }
            var iplogin = (popupdetails[i].IPAddress == null || popupdetails[i].IPAddress =="") ? 'N/A' : popupdetails[i].IPAddress;
            var parseddate = popupdetails[i].LastLoginDateTime == null ? 'Never' : new Date(popupdetails[i].LastLoginDateTime);
            //bug id 17962 resolved

            if (parseddate != 'Never') {
                var hours = parseddate.getHours() > 12 ? parseddate.getHours() - 12 : parseddate.getHours();
                var am_pm = parseddate.getHours() >= 12 ? "PM" : "AM";
                hours = hours < 10 ? "0" + hours : hours;
                var minutes = parseddate.getMinutes() < 10 ? "0" + parseddate.getMinutes() : parseddate.getMinutes();
                var seconds = parseddate.getSeconds() < 10 ? "0" + parseddate.getSeconds() : parseddate.getSeconds();
                $('#textStatus').html(iplogin + " & " + (parseddate.getMonth() < 9 ? '0' + (parseddate.getMonth() + 1).toString() : parseddate.getMonth() + 1) + '/'
                   + (parseddate.getDate() < 10 ? '0' + parseddate.getDate().toString() : parseddate.getDate()) + '/' + parseddate.getFullYear() + " " + hours + ":" + minutes + ":" + seconds + " " + am_pm);
            } else {
                $('#textStatus').html(iplogin + " & " + parseddate);
            }

        }
    }

}


$(document).ready(function () {

    $('#ddlAddress').change(function () {
        bindDataonaddressChange();
    });

    $(document).on("click", ".details", function () {
        popupDetail();

    });
    $(".details").trigger('click');
});

function popupDetail() {
    loader.showloader();
    $('#primary').addClass('active');
    $('#property').removeClass('active');
    $('#profile').removeClass('active');
    $('#PropAddress').removeClass('active');
    $('#locationCustomer').removeClass('active');
    $('#locations').removeClass('active');
    $('#notifications').removeClass('active');
    $('#bill_pay').removeClass('active');
    $('#serviceRequest').removeClass('active');
    $('#Servicerequests').removeClass('active');
    $('#home').addClass('active');
    $('#profile').removeClass('active');
    $('#location').removeClass('active');
    $('#notify').removeClass('active');
    $('#billpay').removeClass('active');
    $('#requests').removeClass('active');
    $('#plans').removeClass('active');
    $('#Rebate').removeClass('active');
    $('#Rebateprogram').removeClass('active');
    $('#connectMeRequest').removeClass('active');
    $('#MarketPref').removeClass('active');
    $('#Market').removeClass('active');
    $('#requests').removeClass('active');
    $('#UsageDiv').removeClass('active');
    $('#Usage').removeClass('active');
    $('#CompareMeDiv').removeClass('active');
    $('#CompareMe').removeClass('active');
    // var ids = $(this).data('id');
    custId = CustId;
    accnumber = Accnumber;
    // var statusforlink = ids.split(",")[2];
    // $('#custId').val(custId);

    //To load propery tab details
    var custDetails = Customer.GetddlCustDetails(custId);

    ZipcodeDetails = JSON.parse(custDetails.value);
    BindDropdownPopAddress(JSON.parse(custDetails.value), accnumber);
    var AccountNumber = $('#ddlAddress option:selected').val();
    for (var i = 0; i < ZipcodeDetails.length; i++) {
        if (AccountNumber == ZipcodeDetails[i].Accountnumber) {

            divbasicDt = "<div class='DivProp-format'><table style='width:100%'><tr><td><b>Utility Account No:</b></td><td><span >" + ZipcodeDetails[i].UtilityAccountNumber + "</span></td></tr><tr><td><b>City Name:   </b></td><td><span >" + ZipcodeDetails[i].CityName + "</span></td></tr><tr><td><b>Account Type:   </b></td><td><span >" + ZipcodeDetails[i].AccountType + "</span></td></tr><tr><td><b>Zipcode:    </b></td><td><span >" + ZipcodeDetails[i].ZipCode + "</span></td></tr></table></div>"
            $('#DivBasicDetails').html('');
            $('#DivBasicDetails').html(divbasicDt);
            //********************
            LoadProfile(ZipcodeDetails, AccountNumber);
            //********************
            break;
        }
    }
    var p = 'UserName>' + ZipcodeDetails[0].UserName + '&Password>' + ZipcodeDetails[0].Password;

    //if (statusforlink == "Active") {
    //    $('#lnkToPortal').css('display', 'block');
    //    $('#lnkToPortal').attr('href', $('#portalweb').val() + '?key=' + Customer.Encrypt(p).value);
    //    $('#lnkToPortal').attr('target', '_new');
    //}
    //else {
    //    $('#lnkToPortal').css('display', 'none');
    //}


    popupdetails = Customer.LoadPopupDetailsData(accnumber, TimeOffSet).value;
    FillCustomerDetails(popupdetails);
    //LoadProfile(popupdetails);


    loader.hideloader();
}

function bindDataonaddressChange() {
    $("#location").css('height', '350px');
    var divRebate = Customer.GetCustomerProgram($('#ddlAddress').val(), 3).value;
    var divProg = Customer.GetCustomerProgram($('#ddlAddress').val(), 1).value;
    LoadAdminRebate(divRebate);
    LoadAdminProgram(divProg);
    LoadNotification();
    LoadUserMapLocation(latitude, longitude, cityname, zipcode, addr1, addr2);
    popupdetails = Customer.LoadPopupDetailsData($('#ddlAddress').val(), TimeOffSet).value;
    LoadServiceRequestGrid(popupdetails.Tables[4].Rows);
    ServicePlans(popupdetails.Tables[0].Rows);
    LoadConnectMeRequestGrid(popupdetails.Tables[3].Rows);
    jsonBillgridData = popupdetails.Tables[1].Rows;
    jsonPaymentgridData = popupdetails.Tables[2].Rows;
    LoadPaymentGrid(popupdetails.Tables[2].Rows);
    LoadBillGrid(popupdetails.Tables[1].Rows);
    LoadMeterNumberGrid(popupdetails.Tables[7].Rows)
    var divbasicDt = '';
    var address = $('#ddlAddress option:selected').val();
    for (var i = 0; i < ZipcodeDetails.length; i++) {
        if (address == ZipcodeDetails[i].Accountnumber) {
            divbasicDt = "<div class='DivProp-format'><table style='width:100%'><tr><td><b>Utility Account No:</b></td><td><span >" + ZipcodeDetails[i].UtilityAccountNumber + "</span></td></tr><tr><td><b>City Name:   </b></td><td><span >" + ZipcodeDetails[i].CityName + "</span></td></tr><tr><td><b>Account Type:   </b></td><td><span >" + ZipcodeDetails[i].AccountType + "</span></td></tr><tr><td><b>Zipcode:    </b></td><td><span >" + ZipcodeDetails[i].ZipCode + "</span></td></tr></table></div>"
            $('#DivBasicDetails').html('');
            $('#DivBasicDetails').html(divbasicDt);
            break;
        }
    }
    LoadPropertyDetails();
}

function MarketingPreferences(preferenceData) {
    for (var i = 0; i < preferenceData.length; i++) {
        if (preferenceData[i].PreferenceName == "News Releases") {
            $('#lblNewsRelease').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
        }
        else if (preferenceData[i].PreferenceName == "Service Offerings") {
            $('#lblSrvcOff').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
        }
        else if (preferenceData[i].PreferenceName == "Newsletters") {
            $('#lblNewsletter').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
        }
        else if (preferenceData[i].PreferenceName == "Energy Savings Toolkits") {
            $('#lblEnrgyToolkt').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
        }
        else if (preferenceData[i].PreferenceName == "Cool Tips Brochures") {
            $('#lblBrochures').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
        }
        else (preferenceData[i].PreferenceName == "Community Benefit Programs")
        {
            $('#lblCommBnftProgs').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
        }
    }
}

function LoadMeterNumberGrid(MeterNumberData) {
    autoheightPrimary = false;
    if (MeterNumberData.length <= 10)
        autoheightPrimary = true;
    source = {
        datatype: "array",
        datafields: [

             { name: 'MeterId' },
         { name: 'MeterNumber' },
         { name: 'IsAMI' },
          { name: 'MeterType' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: MeterNumberData
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxgridMeterNumber").jqxGrid({
        width: "100%",
        height: GridHeight * .29,
        columnsheight: 38,
        rowsheight: 34,
        altrows: true,
        source: dataAdapter,
        theme: 'darkblue',
        sortable: false,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: false,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'MeterId', dataField: 'MeterId', width: '0%', hidden: true },
             { text: 'Meter Type', dataField: 'MeterType', width: '25%' },
            { text: 'Meter Number', dataField: 'MeterNumber', width: '50%' },
             { text: 'AMI/Non AMI', dataField: 'IsAMI', width: '25%', cellsrenderer: valuerender },
        ]
    });

}
function BindDropdownPopAddress(custDetails, AccountNumber) {
    try {

        $("#ddlAddress").html('');
        $.each(custDetails, function (key, value) {
            if (value.Address2 != "")
                $('#ddlAddress').append($("<option></option>").val(value.Accountnumber).html(value.Address1 + " " + value.Address2 + ',' + " " + value.CityName + ',' + " " + value.StateCode + " - " + value.ZipCode));
            else $('#ddlAddress').append($("<option></option>").val(value.Accountnumber).html(value.Address1 + ',' + " " + value.CityName + ',' + " " + value.StateCode + " - " + value.ZipCode));
        });
        document.getElementById("ddlAddress").value = AccountNumber;
    }
    catch (e) { }
}



function LoadBillGrid(billdata) {
    autoheightPrimary = false;
    if (billdata.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
         { name: 'BillingDate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
             { name: 'BillingId', type: 'number' },
         { name: 'BillAmountThisPeriod' },
         { name: 'TranPayStatusDesc' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: billdata
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxgridbill").jqxGrid({
        width: "100%",
        height: GridHeight * .29,
        columnsheight: 38,
        rowsheight: 34,
        altrows: true,
        source: dataAdapter,
        theme: 'darkblue',
        sortable: false,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: false,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Bill Id', dataField: 'BillingId', width: '0%', hidden: true },
            { text: 'Bill Date', dataField: 'BillingDate', width: '30%', cellsformat: "MMMM dd,yyyy" },
            { text: 'Bill Amount($)', dataField: 'BillAmountThisPeriod', width: '30%' },
            { text: 'Bill Pay Status', dataField: 'TranPayStatusDesc', width: '40%' }
        ]
    });

}
function LoadPaymentGrid(paydata) {
    autoheightPrimary = false;
    if (paydata.length <= 10)
        autoheightPrimary = true;
    source = {
        datatype: "array",
        datafields: [
         { name: 'TransactionConDate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
         { name: 'BillingTransactionId', type: 'number' },
         { name: 'TransactionAmount' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: paydata
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxgridpayment").jqxGrid({
        width: "100%",
        height: GridHeight * .25,
        columnsheight: 38,
        rowsheight: 34,
        altrows: true,
        source: dataAdapter,
        theme: 'darkblue',
        sortable: false,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: false,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Transaction Id', dataField: 'BillingTransactionId', width: '0%', hidden: true },
            { text: 'Payment Date', dataField: 'TransactionConDate', width: '50%', cellsformat: "MMMM dd,yyyy" },
            { text: 'Payment Amount($)', dataField: 'TransactionAmount', width: '50%' }
        ]
    });

}

$(document).on("click", "#property", function () {
    LoadPropertyDetails();
});

$(document).on("click", "#notifications", function () {

    if (custId != null && custId != "") {
        var customerId = custId;
        var Account = $('#ddlAddress option:selected').val();
        var param = {
            CustomerId: customerId,
            Account: Account
        }
    }

    $.ajax({
        type: "POST",
        url: "../UserManagement/Customer.aspx/LoadNotificationData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function OnSuccess(response) {

            loadDataNotification(response);
        },
        error: OnErrorCS,
    });



});

$(document).on("click", "#bill_pay", function () {
    LoadBillGrid(jsonBillgridData);
    LoadPaymentGrid(jsonPaymentgridData);

});

$(document).on("click", "#connectMeRequest", function () {
    LoadConnectMeRequestGrid(jsonConnectMedata);
});

$(document).on("click", "#serviceRequest", function () {
    LoadServiceRequestGrid(jsonServiceRequestData);
});

$(document).on("click", "#serviceplans", function () {
    ServicePlans(jsonServicePlandata)
});

$(document).on("click", "#Rebateprogram", function () {
    //To fill admin Rebate/Program Details
    RebateDiv = Customer.GetCustomerProgram(accnumber, 3).value;
    ProgramDiv = Customer.GetCustomerProgram(accnumber, 1).value;
    LoadAdminRebate(RebateDiv);
    LoadAdminProgram(ProgramDiv);

});

$(document).on("click", "#btnSave", function () {
    if (ValidatePage('notify') && validateEmail('notify')) {
        loader.showloader();
        var Account = $('#ddlAddress option:selected').val();
        var param = {
            AccountNumber: Account,
            xml: xml(),

        };
        $.ajax({
            type: "POST",
            url: "../UserManagement/Customer.aspx/SaveDataNotification",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccess,
            error: OnError
        });

        function OnSuccess(data, status) {
            loader.hideloader();
            var v = JSON.parse(data.d);
            if (parseInt(v.Table[0].Status) > 0) {

                try {
                    w2alert(v.Table[0].Message);
                }
                catch (ex)
                { }

            }
            else {
                w2alert(v.Table[0].Message);

            }
        }
        function OnError(request, status, error) {
            loader.hideloader();
            w2alert(request.statusText);

        }
        loader.hideloader();
    }
});

function LoadConnectMeRequestGrid(requestdata) {
    autoheightPrimary = false;
    if (requestdata.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
         { name: 'CreatedDate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
             { name: 'MessageId', type: 'number' },
         { name: 'MessageBody' },
         { name: 'Reason' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: requestdata
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxgridrequest").jqxGrid({
        width: "100%",
        columnsheight: 38,
        rowsheight: 34,
        altrows: true,
        source: dataAdapter,
        theme: 'darkblue',
        sortable: false,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: false,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Message Id', dataField: 'MessageId', width: '0%', hidden: true },
            { text: 'Reason', dataField: 'Reason', width: '30%' },
            { text: 'Message', dataField: 'MessageBody', width: '40%', cellsrenderer: myCellFormatter },
            { text: 'Request Date', dataField: 'CreatedDate', width: '30%', cellsformat: "MMMM dd,yyyy" }
        ]
    });
    function myCellFormatter(cellvalue, options, value) {
        return '<p title="' + value + '" style="overflow: hidden;text-overflow: ellipsis;padding-bottom: 2px;text-align: left;margin-right: 2px;margin-left: 4px;margin-top: 9px;">' + value + '</p>';
    }

}

function LoadServiceRequestGrid(requestdata) {
    autoheightPrimary = false;
    if (requestdata.length <= 10)
        autoheightPrimary = true;
    source = {
        datatype: "array",
        datafields: [
         { name: 'CreatedDate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
             { name: 'MessageId', type: 'number' },
         { name: 'MessageBody' },
         { name: 'Reason' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: requestdata
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxServicegrid").jqxGrid({
        width: "100%",
        columnsheight: 38,
        rowsheight: 34,
        altrows: true,
        source: dataAdapter,
        theme: 'darkblue',
        sortable: false,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: false,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Message Id', dataField: 'MessageId', width: '0%', hidden: true },
            { text: 'Service Type', dataField: 'Reason', width: '30%' },
            { text: 'Message', dataField: 'MessageBody', width: '40%' },
            { text: 'Request Date', dataField: 'CreatedDate', width: '30%', cellsformat: "MMMM dd,yyyy" }
        ]
    });

}

function ServicePlans(plansdata) {
    var noservicemessage = "Not Subscribed";
    if (plansdata[0].PowerPlanName != null && plansdata[0].PowerPlanName != "") {
        $('#lblpowerplan').html(plansdata[0]["PowerPlanName"]);

    }
    else {
        $('#lblpowerplan').html(noservicemessage);
    }
    if (plansdata[0].WaterPlanName != null && plansdata[0].WaterPlanName != "") {
        $('#lblwaterplan').html(plansdata[0]["WaterPlanName"]);
    }
    else {
        $('#lblwaterplan').html(noservicemessage);
    }
    if (plansdata[0].GasPlanName != null && plansdata[0].GasPlanName != "") {
        $('#lblgasplan').html(plansdata[0]["GasPlanName"]);
    }
    else {
        $('#lblgasplan').html(noservicemessage);
    }
    if (plansdata[0].ElectricVehiclePlan != null && plansdata[0].ElectricVehiclePlan != "") {
        $('#lblevplan').html(plansdata[0]["ElectricVehiclePlan"]);
    }
    else {
        $('#lblevplan ').html(noservicemessage);
    }
}

var valuerender = function (row, datafield, value) {
    switch (datafield) {
        case "IsAMI":
            return "<span style='line-height:32px;padding-left: 5px;'>" + ((value == "false") ? "Non AMI" : "AMI") + "</span>";
            break;
    }
}

function showdata(param) {
    loader.showloader();
    $('#nodata_div1').hide();
    // END NEW UI 12/19/2014
    if (mode == 1) {
        mappoints = CustomerData.Table;
        $("#mapView").show();
    }
    else {
        chartgraphsection(1);
        $("#mapView").hide(); $("#mapDiv").hide();
    }
    if (databindtogrid.length == 0) {
        $('#jqxgrid').hide();
        $('#jqxchildgrid').hide();
        $('.jqgrid,#div-useremap').hide();
        $('#div-mainChart').hide();
        $('#div-UserChart').hide();
        $('#nodata_div1').show();
        $('#nodata_div1').html('<font color="Red">No Data</font>');
    }
    else {
        if (mode == '0') {
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
        $('#div-useremap').show();
        $('.nodata').hide();
        $('#div-mainChart').show();
        $('#div-UserChart').show();
        $('#nodata_div1').hide();

        LoadChart();
    }
    if (mode == 1) {
        $.ajax({
            type: "POST",
            url: "../UserManagement/Customer.aspx/LoadMap",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, status, type) {
                MapData = $.parseJSON(response.d);
                if (MapData != null) {
                    createmapCluster(JSON.parse(MapData), 'div-useremap');
                }
                else
                    createmapCluster('', 'div-useremap');
            },
            error: function (request, status, error) {
                console.log('Error!! ' + request.statusText);
                loader.hideloader();
            },
        });
        loader.hideloader();
    }
    loader.hideloader();
}

function switchview(viewshow, viewhide, viewhide2) {
    try {
        document.getElementById(viewshow).style.display = 'block';
        document.getElementById(viewhide).style.display = 'none';
        if (viewhide2 != null || viewhide2 != undefined)
            document.getElementById(viewhide2).style.display = 'none';
        chartSelect(viewshow);
    }
    catch (e) { }
}

function chartSelect(ID) {

    switch (ID) {
        case 'Statuschart':
            var Active = CustomerData.Table2[1]["Cnt"];
            var Inactive = CustomerData.Table2[2]["Cnt"];
            var Registered = CustomerData.Table2[0]["Cnt"];
            createStatus('Statuschart', Active + Inactive + Registered, Active, Inactive, Registered);
            break;
        case 'Statusbargraph':
            if (CustomerData.Table2 != null) {
                processed_jsonChart = new Array();
                var Statusrow = CustomerData.Table2;
                $.map(Statusrow, function (obj, i) {
                    if (obj.Status.toLowerCase() == "registered") {
                        processed_jsonChart.push({
                            name: obj.Status,
                            y: obj.Cnt,
                            title: obj.Status,
                            color: '#d6d23a'
                        });
                    }
                    else if (obj.Status.toLowerCase() == "active") {
                        processed_jsonChart.push({
                            name: obj.Status,
                            y: obj.Cnt,
                            title: obj.Status,
                            color: '#32D2C9'
                        });
                    }
                    else {
                        processed_jsonChart.push({
                            name: obj.Status,
                            y: obj.Cnt,
                            title: obj.Status,
                            color: '#ed5d5d'
                        });
                    }
                });
            }
            BindCRMheigh('column', 'Statusbargraph');
            break;
        case 'gridStatus':

            if (CustomerData.Table2 != null) {
                processed_jsonChart = new Array();
                var Statusrow = CustomerData.Table2;
                $.map(Statusrow, function (obj, i) {
                    processed_jsonChart.push({
                        Name: obj.Status,
                        Count: obj.Cnt,
                    });
                });
            }
            LoadGridChart('gridStatus', processed_jsonChart);
            break;
        case 'Acctypechart':
            var Commercial = CustomerData.Table3[1]["Cnt"];
            var Residential = CustomerData.Table3[0]["Cnt"];
            createAccountType('Acctypechart', Commercial + Residential, Commercial, Residential);
            break;
        case 'Acctypegrid':

            if (CustomerData.Table3 != null) {
                processed_jsonChart = new Array();
                var row = CustomerData.Table3;
                $.map(row, function (obj, i) {
                    processed_jsonChart.push({
                        Name: obj.CustomerType,
                        Count: obj.Cnt,
                    });
                });
            }
            LoadGridChart('Acctypegrid', processed_jsonChart);
            break;

            break;
        case 'Acctypebargraph':
            if (CustomerData.Table3 != null) {
                processed_jsonChart = new Array();
                var row = CustomerData.Table3;
                $.map(row, function (obj, i) {
                    if (obj.CustomerType.toLowerCase() == "residential") {
                        processed_jsonChart.push({
                            name: obj.CustomerType,
                            y: obj.Cnt,
                            title: obj.CustomerType,
                            color: '#ed5d5d'
                        });
                    }
                    else {
                        processed_jsonChart.push({
                            name: obj.CustomerType,
                            y: obj.Cnt,
                            title: obj.CustomerType,
                            color: '#32D2C9'
                        });
                    }
                });
            }
            BindCRMheigh('column', 'Acctypebargraph');
            break;
        case 'Chartbox':
            $('#achartbox').removeClass('active');
            $('#agridbox').addClass('active');
            if (CustomerData.Table1 != null) {
                processed_jsonChart = new Array();
                var row = CustomerData.Table1;
                $.map(row, function (obj, i) {
                    processed_jsonChart.push({
                        name: obj.CityName,
                        y: obj.Cnt,
                        title: obj.CityName,
                        color: colorarrHEX[i]
                    });
                });
            }

            BindCRMheigh('column', 'Chartbox');
            break;
        case 'gridbox':
            if (CustomerData.Table1 != null) {
                processed_jsonChart = new Array();
                var Statusrow = CustomerData.Table1;
                $.map(Statusrow, function (obj, i) {
                    processed_jsonChart.push({
                        name: obj.CityName,
                        y: obj.Cnt,
                    });
                });
            }
            LoadGridCustomer('gridbox', processed_jsonChart);
            $('#agridbox').removeClass('active');
            $('#achartbox').addClass('active');
            break;
        case 'chartDiv':
            changeActiveClass(ID);
            LoadChart();
            break;
        case 'graphDiv':
            changeActiveClass(ID);

            break;
    }
}

function changeActiveClass(ID) {
    $('#btnSend').hide();
    $('#pieGraph').addClass('pie').removeClass('activePie');
    $('#gridView').addClass('grid').removeClass('activeGrid');
    $('#mapView').addClass('map1').removeClass('activeMap');
    if (ID == 'graphDiv') {
        if (gridid == 'jqxchildgrid') {
            $('#btnSend').show();
        }
        $('#gridView').addClass('activeGrid').removeClass('grid');
    }
    else if (ID == 'chartDiv') {
        $('#pieGraph').addClass('activePie').removeClass('pie');
    }
    else if (ID == 'mapDiv') {

    }
}

function LoadPropertyDetails() {
    if (custId != null && custId != "") {
        var customerId = custId;
        //  $('#previousCustId').val(custId);
        var Account = $('#ddlAddress option:selected').val();

        var IsAboutMyHome = 1;
        var param = {
            CustomerId: customerId,
            IsAboutMyHome: IsAboutMyHome,
            Account: Account
        }
        $.ajax({
            type: "POST",
            url: "../UserManagement/Customer.aspx/GetCustomerPropertiesforAboutMyHome",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: onClickSucess,
            error: OnClickError
        });
    }


    LoadUserMapLocation(latitude, longitude, cityname, zipcode, addr1, addr2);
    $("#location").css('height', '400px');
}


function OnErrorCS(response) {


    loader.hideloader();
    console.log(response);
}

function LoadAdminRebate(Rebate_Div) {
    RebateDiv = Rebate_Div;
    if (RebateDiv != null) {
        for (var i = 0; i < RebateDiv.Rows.length; i++) {
            BindingAdminRebate(i);
        }
        $('#divRebate').html(str);
        str = '';
        count = 1;
    }
    else {
        $('#divRebate').html('');
        str = '';
        count = 1;
    }
}

function LoadAdminProgram(Program_Div) {
    ProgramDiv = Program_Div;
    if (ProgramDiv != null) {
        for (var i = 0; i < ProgramDiv.Rows.length; i++) {
            BindingAdminProgram(i);
        }
        $('#divProgram').html(str);
        str = '';
        count = 1;
    }
    else {
        $('#divProgram').html('');
        str = '';
        count = 1;
    }
}

function ShowContent(id) {
    try {
        var ContentDisplay = $("#" + id + "_Content").css('display');
        if (ContentDisplay == "none") {
            $("#" + id).html("Click to Hide Details");
            $("#" + id + "_Content").slideToggle("fast");
            var promotionid = id.split('_')[1];
            var result = comEnergyEfficiency.ViewSavingTip(promotionid).value;
            if (result != null) {
                $('#VC_' + promotionid).html(result.Rows[0].UpdatedCount);
            }
        }
        else {
            $("#" + id).html("Show Details");
            $("#" + id + "_Content").slideToggle("fast");
        }
    }
    catch (e) { }
}

function imgError(image) {
    image.onerror = "";
    image.src = "../images/noimage.png";
    return true;
}

function BindingAdminRebate(i) {

    var attachmentpath = "../Attachments/";
    var ImgURL = (RebateDiv.Rows[i].ImageUrl == "") ? "images/noimage.png" : (attachmentpath + '' + RebateDiv.Rows[i].ImageUrl);
    var RebateProgramDesc = RebateDiv.Rows[i].RebateProgramDesc;
    var program_status = RebateDiv.Rows[i].program_status;
    var PromotionLike = RebateDiv.Rows[i].PromotionLike;
    str += '<ul><li><div class="profile_img"><span>' + (count++) + '</span><asp:Label ID="lblPromotionId" Text=' + RebateDiv.Rows[i].PromotionId + ' runat="server" Visible="false" ClientIDMode="Static" ></asp:Label>'
    str += '<img src=' + ImgURL + ' style="width:60px!important; height:60px;" onerror="imgError(this);">'
    str += '</div><div class="details_box"><h5><div>' + RebateDiv.Rows[i].Title + '</div></h5><div class="row-1"><div class="col-lg-5 col-md-5 col-sm-4 col-xs-8 view_details"><ul>'
    str += ' <li><span style="padding-right:2px" globalize="ML_ENERGY_EFFICIENCY_Lbl_Added">Added:</span><span>' + RebateDiv.Rows[i].AddedCount + '</span></li>'
    str += ' <li><span style="padding-right:1px" globalize="ML_ENERGY_EFFICIENCY_Lbl_Viewed">Viewed:</span><span id="VC_' + RebateDiv.Rows[i].PromotionId + '">' + RebateDiv.Rows[i].VIEWS + '</span></li></ul></div>'
    str += '<div class="register_lnk col-lg-7 col-md-7 col-sm-8 col-xs-12"><ul><li><span globalize="ML_Programs_li_Type">Type: </span><span>' + RebateDiv.Rows[i].RebateProgramDesc + '</span></li><li>'
    str += '<a href="#" class="' + ((PromotionLike == "1") ? ("like_lnk") : ("like_lnk")) + '" id="LK_"+' + RebateDiv.Rows[i].PromotionId + '></a>'
    str += '<span globalize="ML_ENERGY_EFFICIENCY_Lbl_Likes"  style="padding-right:4px">Likes:</span><span id="LC_"' + RebateDiv.Rows[i].PromotionId + '">' + RebateDiv.Rows[i].LikeCount + '</span></li>'
    str += '<li class="register_eff_lnk" style=' + ((RebateProgramDesc == "Mandatory Program") ? "background:none !important" : "url(/images/divider_like_lnk.png) no-repeat left 14px !important;") + '>'
    str += '<a href="connect-me.aspx?pid=p&q=' + RebateDiv.Rows[i].Title + '>&id=' + RebateDiv.Rows[i].PromotionId + '" globalize="ML_Programs_anchor_Register"'
    str += '  </li></div><div class="show_hide_details" > <a href="#" id="ST_' + RebateDiv.Rows[i].PromotionId + '" onclick="ShowContent(id);" class="program_details_lnk"><span globalize="ML_Programs_anchor_Show_Details" class="program_details_lnk">Show Details</span></a></div></div></div>'
    str += ' </li><div class="ShowDetailsDiv" id="ST_' + RebateDiv.Rows[i].PromotionId + '_Content">' + RebateDiv.Rows[i].Description + '</div></ul>';
}

function BindingAdminProgram(i) {

    var attachmentpath = "../Attachments/";
    var ImgURL = (ProgramDiv.Rows[i].ImageUrl == "") ? "../images/noimage.png" : (attachmentpath + '' + ProgramDiv.Rows[i].ImageUrl);
    var RebateProgramDesc = ProgramDiv.Rows[i].RebateProgramDesc;
    var program_status = ProgramDiv.Rows[i].program_status;
    var PromotionLike = ProgramDiv.Rows[i].PromotionLike;
    str += '<ul><li><div class="profile_img"><span>' + (count++) + '</span><asp:Label ID="lblPromotionId" Text=' + ProgramDiv.Rows[i].PromotionId + ' runat="server" Visible="false" ClientIDMode="Static" ></asp:Label>'
    str += '<img src=' + ImgURL + ' style="width:60px!important; height:60px;" onerror="imgError(this);">'
    str += '</div><div class="details_box"><h5><div>' + ProgramDiv.Rows[i].Title + '</div></h5><div class="row-1"><div class="col-lg-5 col-md-5 col-sm-4 col-xs-8 view_details"><ul>'
    str += ' <li><span style="padding-right:2px" globalize="ML_ENERGY_EFFICIENCY_Lbl_Added">Added:</span><span>' + ProgramDiv.Rows[i].AddedCount + '</span></li>'
    str += ' <li><span style="padding-right:1px" globalize="ML_ENERGY_EFFICIENCY_Lbl_Viewed">Viewed:</span><span id="VC_' + ProgramDiv.Rows[i].PromotionId + '">' + ProgramDiv.Rows[i].VIEWS + '</span></li></ul></div>'
    str += '<div class="register_lnk col-lg-7 col-md-7 col-sm-8 col-xs-12"><ul><li><span globalize="ML_Programs_li_Type">Type: </span><span>' + ProgramDiv.Rows[i].RebateProgramDesc + '</span></li><li>'
    str += '<a href="#" class="' + ((PromotionLike == "1") ? ("like_lnk") : ("like_lnk")) + '" id="LK_"+' + ProgramDiv.Rows[i].PromotionId + '></a>'
    str += '<span globalize="ML_ENERGY_EFFICIENCY_Lbl_Likes"  style="padding-right:4px">Likes:</span><span id="LC_"' + ProgramDiv.Rows[i].PromotionId + '">' + ProgramDiv.Rows[i].LikeCount + '</span></li>'
    str += '<li class="register_eff_lnk" style=' + ((RebateProgramDesc == "Mandatory Program") ? "background:none !important" : "url(/images/divider_like_lnk.png) no-repeat left 14px !important;") + '>'
    str += '<a href="connect-me.aspx?pid=p&q=' + ProgramDiv.Rows[i].Title + '>&id=' + ProgramDiv.Rows[i].PromotionId + '" globalize="ML_Programs_anchor_Register"'
    str += '  </li></div><div class="show_hide_details" > <a href="#" id="ST_' + ProgramDiv.Rows[i].PromotionId + '" onclick="ShowContent(id);" class="program_details_lnk"><span globalize="ML_Programs_anchor_Show_Details" class="program_details_lnk">Show Details</span></a></div></div></div>'
    str += ' </li><div class="ShowDetailsDiv" id="ST_' + ProgramDiv.Rows[i].PromotionId + '_Content">' + ProgramDiv.Rows[i].Description + '</div></ul>';
}

function xml() {
    var xml, ischk;
    var phoneno = $('#HdnPhoneNo').val();
    var email = $('#HdnEmailId').val();
    xml = '<NotificationDetail><NotificationType id="1">';
    ischk = (($('#chkOutageText').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtOutageText:visible').length == 1) {
        var TxtOutageText = $('#TxtOutageText').val() != '' ? parseInt($('#TxtOutageText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtOutageText').val();
        xml += '<EmailORPhone>' + TxtOutageText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtOutageText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="2">';
    ischk = (($('#chkOutageEmail').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtOutageEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtOutageEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtOutageEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="3">';
    ischk = (($('#chkOutagePush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="4">';
    ischk = (($('#chkOutageIvr').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtOutageIvr:visible').length == 1) {
        var TxtOutageIvr = $('#TxtOutageIvr').val() != '' ? parseInt($('#TxtOutageIvr').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtOutageIvr').val();
        xml += '<EmailORPhone>' + TxtOutageIvr + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtOutageIvr').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    // for  billing checkbox   
    xml += '<NotificationType id="5">';
    ischk = (($('#chkBillingText').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBillingText:visible').length == 1) {
        var TxtBillingText = $('#TxtBillingText').val() != '' ? parseInt($('#TxtBillingText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtBillingText').val();
        xml += '<EmailORPhone>' + TxtBillingText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBillingText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="6">';
    ischk = (($('#chkBillingEmail').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBillingEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtBillingEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBillingEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="7">';
    ischk = (($('#chkBillingPush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="8">';
    ischk = (($('#chkBillingIvr').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBillingIvr:visible').length == 1) {
        var TxtBillingIvr = $('#TxtBillingIvr').val() != '' ? parseInt($('#TxtBillingIvr').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtBillingIvr').val();
        xml += '<EmailORPhone>' + TxtBillingIvr + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBillingIvr').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    // for budget checkbox
    xml += '<NotificationType id="9">';
    ischk = (($('#chkBudgetText').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBudgetText:visible').length == 1) {
        var TxtBudgetText = $('#TxtBudgetText').val() != '' ? parseInt($('#TxtBudgetText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtBudgetText').val();
        xml += '<EmailORPhone>' + TxtBudgetText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBudgetText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="10">';
    ischk = (($('#chkBudgetEmail').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBudgetEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtBudgetEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBudgetEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="11">';
    ischk = (($('#chkBudgetPush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="12">';
    ischk = (($('#chkBudgetIvr').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBudgetIvr:visible').length == 1) {
        var TxtBudgetIvr = $('#TxtBudgetIvr').val() != '' ? parseInt($('#TxtBudgetIvr').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtBudgetIvr').val();
        xml += '<EmailORPhone>' + TxtBudgetIvr + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBudgetIvr').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    // for DemandResponse Checkbox
    xml += '<NotificationType id="13">';
    ischk = (($('#chkDRText').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtDRText:visible').length == 1) {
        var TxtDRText = $('#TxtDRText').val() != '' ? parseInt($('#TxtDRText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtDRText').val();
        xml += '<EmailORPhone>' + TxtDRText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtDRText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="14">';
    ischk = (($('#chkDREmail').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtDREmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtDREmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtDREmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="15">';
    ischk = (($('#chkDRPush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="16">';
    ischk = (($('#chkDRIvr').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtDRIvr:visible').length == 1) {
        var TxtDRIvr = $('#TxtDRIvr').val() != '' ? parseInt($('#TxtDRIvr').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtDRIvr').val();
        xml += '<EmailORPhone>' + TxtDRIvr + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtDRIvr').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    //For Connect Me checkbox
    xml += '<NotificationType id="17">';
    ischk = (($('#chkConnectText').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtConnectText:visible').length == 1) {
        var TxtConnectText = $('#TxtConnectText').val() != '' ? parseInt($('#TxtConnectText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtConnectText').val();
        xml += '<EmailORPhone>' + TxtConnectText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtConnectText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }


    xml += '<NotificationType id="18">';
    ischk = (($('#chkConnectEmail').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtConnectEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtConnectEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtConnectEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="19">';
    ischk = (($('#chkConnectPush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="20">';
    ischk = (($('#chkConnectIVR').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtConnectIVR:visible').length == 1) {
        var TxtConnectIVR = $('#TxtConnectIVR').val() != '' ? parseInt($('#TxtConnectIVR').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtConnectIVR').val();
        xml += '<EmailORPhone>' + TxtConnectIVR + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtConnectIVR').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }


    //For Service checkbox
    xml += '<NotificationType id="21">';
    ischk = (($('#chkServiceText').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtConnectText:visible').length == 1) {
        var TxtConnectText = $('#TxtConnectText').val() != '' ? parseInt($('#TxtConnectText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtConnectText').val();
        xml += '<EmailORPhone>' + TxtConnectText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtConnectText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }


    xml += '<NotificationType id="22">';
    ischk = (($('#chkServiceEmail').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtServiceEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtServiceEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtServiceEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="23">';
    ischk = (($('#chkServicePush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="24">';
    ischk = (($('#chkServiceIVR').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtServiceIVR:visible').length == 1) {
        var TxtServiceIVR = $('#TxtServiceIVR').val() != '' ? parseInt($('#TxtServiceIVR').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtServiceIVR').val();
        xml += '<EmailORPhone>' + TxtServiceIVR + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtServiceIVR').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    //for leakalert
    xml += '<NotificationType id="25">';
    ischk = (($('#chkLeakAlertText').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtLeakAlertText:visible').length == 1) {
        var TxtLeakAlertText = $('#TxtLeakAlertText').val() != '' ? parseInt($('#TxtLeakAlertText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtLeakAlertText').val();
        xml += '<EmailORPhone>' + TxtLeakAlertText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtLeakAlertText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="26">';
    ischk = (($('#chkLeakAlertEmail').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtLeakAlertEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtLeakAlertEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtLeakAlertEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="27">';
    ischk = (($('#chkLeakAlertPush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="28">';
    ischk = (($('#chkLeakAlertIVR').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtLeakAlertIVR:visible').length == 1) {
        var TxtLeakAlertIVR = $('#TxtLeakAlertIVR').val() != '' ? parseInt($('#TxtLeakAlertIVR').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtLeakAlertIVR').val();
        xml += '<EmailORPhone>' + TxtLeakAlertIVR + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtLeakAlertIVR').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }
    xml += '</NotificationDetail>';

    return xml;

}

function LoadNotification() {
    if (custId != null && custId != "") {
        var customerId = custId;
        var Account = $('#ddlAddress option:selected').val();
        var param = {
            CustomerId: customerId,
            Account: Account
        }
    }
    $.ajax({
        type: "POST",
        url: "Customer.aspx/LoadNotificationData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function OnSuccess(response) {
            loadDataNotification(response);
        },
        error: OnErrorCS,

    });

}

function loadDataNotification(fnResponses) {

    //For clearing already extsting  values before filling new 
    $('input.email').css("display", "none");
    $('span.email').css("display", "block");
    $("input.txt:text").val("");
    $("span.txt input[type=checkbox]").removeAttr('checked');
    $("input.email:text").val("");
    $("span.email input[type=checkbox]").removeAttr('checked');
    // $("span.email").siblings('input').prop('checked', false);
    $("input.ivr:text").val("");
    $("span.ivr input[type=checkbox]").removeAttr('checked');
    $("span.push input[type=checkbox]").removeAttr('checked')
    ///
    try {
        var JSONDoc = fnResponses.d;

        $("#TxtOutageText").removeAttr('mandatory');
        $("#TxtOutageText").next('span').remove();
        $("#TxtOutageEmail").removeAttr("mandatory");
        $("#TxtOutageEmail").next('span').remove();
        $("#TxtOutageIvr").removeAttr("mandatory");
        $("#TxtOutageIvr").next('span').remove();

        $("#TxtBillingText").removeAttr("mandatory");
        $("#TxtBillingText").next('span').remove();
        $("#TxtBillingEmail").removeAttr("mandatory");
        $("#TxtBillingEmail").next('span').remove();
        $("#TxtBillingIvr").removeAttr("mandatory");
        $("#TxtBillingIvr").next('span').remove();
        //DR
        $("#TxtDRText").removeAttr("mandatory");
        $("#TxtDRText").next('span').remove();
        $("#TxtDREmail").removeAttr("mandatory");
        $("#TxtDREmail").next('span').remove();
        $("#TxtDRIvr").removeAttr("mandatory");
        $("#TxtDRIvr").next('span').remove();

        $("#TxtConnectText").removeAttr("mandatory");
        $("#TxtConnectText").next('span').remove();
        $("#TxtConnectEmail").removeAttr("mandatory");
        $("#TxtConnectEmail").next('span').remove();
        $("#TxtConnectIVR").removeAttr("mandatory");
        $("#TxtConnectIVR").next('span').remove();

        $("#TxtServiceText").removeAttr("mandatory");
        $("#TxtServiceText").next('span').remove();
        $("#TxtServiceEmail").removeAttr("mandatory");
        $("#TxtServiceEmail").next('span').remove();
        $("#TxtServiceIVR").removeAttr("mandatory");
        $("#TxtServiceIVR").next('span').remove();


        $("#TxtLeakAlertText").removeAttr("mandatory");
        $("#TxtLeakAlertText").next('span').remove();
        $("#TxtLeakAlertEmail").removeAttr("mandatory");
        $("#TxtLeakAlertEmail").next('span').remove();
        $("#TxtLeakAlertIVR").removeAttr("mandatory");
        $("#TxtLeakAlertIVR").next('span').remove();

        $("#TxtBudgetIvr").removeAttr("mandatory");
        $("#TxtBudgetIvr").next('span').remove();
        $("#TxtBudgetText").removeAttr("mandatory");
        $("#TxtBudgetText").next('span').remove();
        $("#TxtBudgetEmail").removeAttr("mandatory");
        $("#TxtBudgetEmail").next('span').remove();

        var mandatoryHtml = '<span class="required" style="color:#950202; padding-left:3px; font-size: 15px;">*</span>';
        if (JSONDoc.chkOutageTextChecked) {

            var TxtOutageText = JSONDoc.TxtOutageText != null ? JSONDoc.TxtOutageText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtOutageText;
            $('#chkOutageText').prop('checked', true);
            $("#TxtOutageText").css("display", "block");
            $('#TxtOutageText').val(TxtOutageText);
            $("#TxtOutageText").attr('mandatory', '1');
            $("#TxtOutageText").after(mandatoryHtml);
        }
        if (JSONDoc.chkOutageEmail) {
            $('#chkOutageEmail').prop('checked', true);
            $("#TxtOutageEmail").css("display", "block");
            $('#TxtOutageEmail').val(JSONDoc.TxtOutageEmail);
            $("#TxtOutageEmail").attr("mandatory", "1");
            $("#TxtOutageEmail").after(mandatoryHtml);
        }

        if (JSONDoc.chkOutageIvr) {
            var TxtOutageIvr = JSONDoc.TxtOutageIvr != null ? JSONDoc.TxtOutageIvr.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtOutageIvr;
            $('#chkOutageIvr').prop('checked', true);
            $("#TxtOutageIvr").css("display", "block");
            $('#TxtOutageIvr').val(TxtOutageIvr);
            $("#TxtOutageIvr").attr("mandatory", "1");
            $("#TxtOutageIvr").after(mandatoryHtml);
        }

        if (JSONDoc.chkOutagePush) {
            $('#chkOutagePush').prop('checked', true);

        }
        //BILLING
        if (JSONDoc.chkBillingText) {
            var TxtBillingText = JSONDoc.TxtBillingText != null ? JSONDoc.TxtBillingText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtBillingText;
            $('#chkBillingText').prop('checked', true);
            $("#TxtBillingText").css("display", "block");
            $('#TxtBillingText').val(TxtBillingText);
            $("#TxtBillingText").attr("mandatory", "1");
            $("#TxtBillingText").after(mandatoryHtml);
        }

        if (JSONDoc.chkBillingEmail) {
            $('#chkBillingEmail').prop('checked', true);
            $("#TxtBillingEmail").css("display", "block");
            $('#TxtBillingEmail').val(JSONDoc.TxtBillingEmail);
            $("#TxtBillingEmail").attr("mandatory", "1");
            $("#TxtBillingEmail").after(mandatoryHtml);
        }

        if (JSONDoc.chkBillingIvr) {
            var TxtBillingIvr = JSONDoc.TxtBillingIvr != null ? JSONDoc.TxtBillingIvr.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtBillingIvr;
            $('#chkBillingIvr').prop('checked', true);
            $("#TxtBillingIvr").css("display", "block");
            $('#TxtBillingIvr').val(TxtBillingIvr);
            $("#TxtBillingIvr").attr("mandatory", "1");
            $("#TxtBillingIvr").after(mandatoryHtml);
        }

        if (JSONDoc.chkBillingPush) {
            $('#chkOutagePush').prop('checked', true);
        }

        //DR
        if (JSONDoc.chkDRText) {
            var TxtDRText = JSONDoc.TxtDRText != null ? JSONDoc.TxtDRText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtDRText;
            $('#chkDRText').prop('checked', true);
            $("#TxtDRText").css("display", "block");
            $('#TxtDRText').val(TxtDRText);
            $("#TxtDRText").attr("mandatory", "1");
            $("#TxtDRText").after(mandatoryHtml);
        }

        if (JSONDoc.chkBillingEmail) {
            $('#chkDREmail').prop('checked', true);
            $("#TxtDREmail").css("display", "block");
            $('#TxtDREmail').val(JSONDoc.TxtDREmail);
            $("#TxtDREmail").attr("mandatory", "1");
            $("#TxtDREmail").after(mandatoryHtml);
        }

        if (JSONDoc.chkDRIvr) {
            var TxtDRIvr = JSONDoc.TxtDRIvr != null ? JSONDoc.TxtDRIvr.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtDRIvr;
            $('#chkDRIvr').prop('checked', true);
            $("#TxtDRIvr").css("display", "block");
            $('#TxtDRIvr').val(TxtDRIvr);
            $("#TxtDRIvr").attr("mandatory", "1");
            $("#TxtDRIvr").after(mandatoryHtml);

        }

        if (JSONDoc.chkDRPush) {
            $('#chkDRPush').prop('checked', true);

        }

        //ConnectMe
        if (JSONDoc.chkConnectText) {
            var TxtConnectText = JSONDoc.TxtConnectText != null ? JSONDoc.TxtConnectText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtConnectText;
            $('#chkConnectText').prop('checked', true);
            $("#TxtConnectText").css("display", "block");
            $('#TxtConnectText').val(TxtConnectText);
            $("#TxtConnectText").attr("mandatory", "1");
            $("#TxtConnectText").after(mandatoryHtml);
        }

        if (JSONDoc.chkConnectEmail) {
            $('#chkConnectEmail').prop('checked', true);
            $("#TxtConnectEmail").css("display", "block");
            $('#TxtConnectEmail').val(JSONDoc.TxtConnectEmail);
            $("#TxtConnectEmail").attr("mandatory", "1");
            $("#TxtConnectEmail").after(mandatoryHtml);
        }

        if (JSONDoc.chkConnectIVR) {
            var TxtConnectIVR = JSONDoc.TxtConnectIVR != null ? JSONDoc.TxtConnectIVR.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtConnectIVR;
            $('#chkConnectIVR').prop('checked', true);
            $("#TxtConnectIVR").css("display", "block");
            $('#TxtConnectIVR').val(TxtConnectIVR);
            $("#TxtConnectIVR").attr("mandatory", "1");
            $("#TxtConnectIVR").after(mandatoryHtml);
        }

        if (JSONDoc.chkConnectPush) {
            $('#chkConnectPush').prop('checked', true);
        }


        //Service
        if (JSONDoc.chkServiceText) {
            var TxtServiceText = JSONDoc.TxtServiceText != null ? JSONDoc.TxtServiceText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtServiceText;
            $('#chkServiceText').prop('checked', true);
            $("#TxtServiceText").css("display", "block");
            $('#TxtServiceText').val(TxtServiceText);
            $("#TxtServiceText").attr("mandatory", "1");
            $("#TxtServiceText").after(mandatoryHtml);
        }

        if (JSONDoc.chkServiceEmail) {
            $('#chkServiceEmail').prop('checked', true);
            $("#TxtServiceEmail").css("display", "block");
            $('#TxtServiceEmail').val(JSONDoc.TxtServiceEmail);
            $("#TxtServiceEmail").attr("mandatory", "1");
            $("#TxtServiceEmail").after(mandatoryHtml);
        }

        if (JSONDoc.chkServiceIVR) {
            var TxtServiceIVR = JSONDoc.TxtServiceIVR.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3");
            $('#chkServiceIVR').prop('checked', true);
            $("#TxtServiceIVR").css("display", "block");
            $('#TxtServiceIVR').val(TxtServiceIVR);
            $("#TxtServiceIVR").attr("mandatory", "1");
            $("#TxtServiceIVR").after(mandatoryHtml);
        }

        if (JSONDoc.chkServicePush) {
            $('#chkServicePush').prop('checked', true);
        }

        //LeakAlert
        if (JSONDoc.chkLeakAlertText) {
            var TxtLeakAlertText = JSONDoc.TxtLeakAlertText != null ? JSONDoc.TxtLeakAlertText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtLeakAlertText;
            $('#chkLeakAlertText').prop('checked', true);
            $("#TxtLeakAlertText").css("display", "block");
            $('#TxtLeakAlertText').val(TxtLeakAlertText);
            $("#TxtLeakAlertText").attr("mandatory", "1");
            $("#TxtLeakAlertText").after(mandatoryHtml);
        }

        if (JSONDoc.chkLeakAlertEmail) {
            $('#chkLeakAlertEmail').prop('checked', true);
            $("#TxtLeakAlertEmail").css("display", "block");
            $('#TxtLeakAlertEmail').val(JSONDoc.TxtLeakAlertEmail);
            $("#TxtLeakAlertEmail").attr("mandatory", "1");
            $("#TxtLeakAlertEmail").after(mandatoryHtml);
        }

        if (JSONDoc.chkLeakAlertIVR) {
            var TxtLeakAlertIVR = JSONDoc.TxtLeakAlertIVR != null ? JSONDoc.TxtLeakAlertIVR.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtLeakAlertIVR;
            $('#chkLeakAlertIVR').prop('checked', true);
            $("#TxtLeakAlertIVR").css("display", "block");
            $('#TxtLeakAlertIVR').val(TxtLeakAlertIVR);
            $("#TxtLeakAlertIVR").attr("mandatory", "1");
            $("#TxtLeakAlertIVR").after(mandatoryHtml);
        }

        if (JSONDoc.chkLeakAlertPush) {
            $('#chkLeakAlertPush').prop('checked', true);
        }


        //Budget
        if (JSONDoc.chkBudgetText) {
            var TxtBudgetText = JSONDoc.TxtBudgetText != null ? JSONDoc.TxtBudgetText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtBudgetText;
            $('#chkBudgetText').prop('checked', true);
            $("#TxtBudgetText").css("display", "block");
            $('#TxtBudgetText').val(TxtBudgetText);
            $("#TxtBudgetText").attr("mandatory", "1");
            $("#TxtBudgetText").after(mandatoryHtml);
        }

        if (JSONDoc.chkBudgetEmail) {
            $('#chkBudgetEmail').prop('checked', true);
            $("#TxtBudgetEmail").css("display", "block");
            $('#TxtBudgetEmail').val(JSONDoc.TxtBudgetEmail);
            $("#TxtBudgetEmail").attr("mandatory", "1");
            $("#TxtBudgetEmail").after(mandatoryHtml);
        }

        if (JSONDoc.chkBudgetIvr) {
            var TxtBudgetIvr = JSONDoc.TxtBudgetIvr != null ? JSONDoc.TxtBudgetIvr.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtBudgetIvr;
            $('#chkBudgetIvr').prop('checked', true);
            $("#TxtBudgetIvr").css("display", "block");
            $('#TxtBudgetIvr').val(TxtBudgetIvr);
            $("#TxtBudgetIvr").attr("mandatory", "1");
            $("#TxtBudgetIvr").after(mandatoryHtml);
        }

        if (JSONDoc.chkBudgetPush) {
            $('#chkBudgetPush').prop('checked', true);
        }


        var TextAll = $('#outage').is(':visible') ? $('#chkOutageText').prop('checked') : true
            && $('#billing').is(':visible') ? $('#chkBillingText').prop('checked') : true
            && $('#Budget').is(':visible') ? $('#chkBudgetText').prop('checked') : true
        $('#divDr').is(':visible') ? $('#chkDRText').prop('checked') : true
         && $('#connectme').is(':visible') ? $('#chkConnectText').prop('checked') : true
            && $('#service').is(':visible') ? $('#chkServiceText').prop('checked') : true
        && $('#leakalert').is(':visible') ? $('#chkLeakAlertText').prop('checked') : true;


        var EmailAll = $('#outage').is(':visible') ? $('#chkOutageEmail').prop('checked') : true
           && $('#billing').is(':visible') ? $('#chkBillingEmail').prop('checked') : true
           && $('#Budget').is(':visible') ? $('#chkBudgetEmail').prop('checked') : true
        $('#divDr').is(':visible') ? $('#chkDREmail').prop('checked') : true
         && $('#connectme').is(':visible') ? $('#chkConnectEmail').prop('checked') : true
            && $('#service').is(':visible') ? $('#chkServiceEmail').prop('checked') : true
        && $('#leakalert').is(':visible') ? $('#chkLeakAlertEmail').prop('checked') : true;


        var IVRAll = $('#outage').is(':visible') ? $('#chkOutagePush').prop('checked') : true
           && $('#billing').is(':visible') ? $('#chkBillingPush').prop('checked') : true
           && $('#Budget').is(':visible') ? $('#chkBudgetPush').prop('checked') : true
        $('#divDr').is(':visible') ? $('#chkDRPush').prop('checked') : true
         && $('#connectme').is(':visible') ? $('#chkConnectPush').prop('checked') : true
            && $('#service').is(':visible') ? $('#chkServicePush').prop('checked') : true
        && $('#leakalert').is(':visible') ? $('#chkLeakAlertPush').prop('checked') : true;


        var PushAll = $('#outage').is(':visible') ? $('#chkOutageIvr').prop('checked') : true
          && $('#billing').is(':visible') ? $('#chkBillingIvr').prop('checked') : true
          && $('#Budget').is(':visible') ? $('#chkBudgetIvr').prop('checked') : true
        $('#divDr').is(':visible') ? $('#chkDRIvr').prop('checked') : true
         && $('#connectme').is(':visible') ? $('#chkConnectIVR').prop('checked') : true
            && $('#service').is(':visible') ? $('#chkServiceIVR').prop('checked') : true
        && $('#leakalert').is(':visible') ? $('#chkLeakAlertIVR').prop('checked') : true;

        if (TextAll) {
            $('#chkTextAll').prop('checked', true)
        }
        if (EmailAll) {
            $('#chkEmailAll').prop('checked', true)
        }
        if (IVRAll) {
            $('#chkIvrAll').prop('checked', true)
        }

        if (PushAll) {
            $('#chkPushAll').prop('checked', true)
        }

        var HdnPhoneNo = JSONDoc.HdnPhoneNo != null ? JSONDoc.HdnPhoneNo.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.HdnPhoneNo;
        $('#HdnPhoneNo').val(HdnPhoneNo);
        $('#HdnEmailId').val(JSONDoc.HdnEmailId);

    }

    catch (e) {

        console.log(e.message);
    }
}


$(document).on("click", ".txtAll input[type=checkbox]", function () {
    if ($(this).prop('checked')) {
        $(".txt input[type=checkbox]").prop('checked', true);
        $("input[type='text'][class='txt']").each(function (i, obj) {


            $(obj).css('display', 'block');
            $(obj).show();
            if ($(obj).next('span').length == 1) {
                $(obj).next('span').show();
            }
            else {
                $(obj).after('<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>');
            }
        });
        $("input[type='text'][class='txt errorbox']").each(function (i, obj) {

            $(obj).css('display', 'block');
            $(obj).show();
        });
    }
    else {
        $(".txt input[type=checkbox]").prop('checked', false);
        $("input[type='text'][class='txt errorbox']").each(function (i, obj) {
            $(obj).removeClass('errorbox');
            $(obj).w2tag('');
        });
        $("input[type='text'][class='txt']").each(function (i, obj) {
            $(obj).next('span').hide();
        });

        $("input[type='text'][class='txt']").hide().css('display', 'none');

    }

});

$(document).on("click", ".emailAll input[type=checkbox]", function () {
    if ($(this).prop('checked')) {
        $(".email input[type=checkbox]").prop('checked', true);
        $("input[type='text'][class='email']").each(function (i, obj) {

            if ($(obj).css('display') == 'none') {
                $(obj).css('display', 'block');
            }
            if ($(obj).next('span').length == 1) {
                $(obj).next('span').show();
            }
            else {
                $(obj).after('<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>');
            }
        });
        $("input[type='text'][class='email errorbox']").each(function (i, obj) {

            if ($(obj).css('display') == 'none') {
                $(obj).css('display', 'block');
            }

        });
    }
    else {
        $(".email input[type=checkbox]").prop('checked', false);
        $("input[type='text'][class='email']").each(function (i, obj) {

            if ($(obj).css('display') == 'block') {
                $(obj).css('display', 'none');
            }

        });
        $("input[type='text'][class='email']").each(function (i, obj) {
            $(obj).next('span').hide();
        });
        $("input[type='text'][class='email errorbox']").each(function (i, obj) {

            if ($(obj).css('display') == 'block') {
                $(obj).css('display', 'none');
                $(obj).val('');
                $(obj).removeClass('errorbox');
            }

        });
    }

});

$(document).on("click", ".pushAll input[type=checkbox]", function () {
    if ($(this).prop('checked')) {
        $(".push input[type=checkbox]").prop('checked', true);

    }
    else {
        $(".push input[type=checkbox]").prop('checked', false);
    }

});

$(document).on("click", ".ivrAll input[type=checkbox]", function () {
    if ($(this).prop('checked')) {
        $(".ivr input[type=checkbox]").prop('checked', true);
        $("input[type='text'][class='ivr']").each(function (i, obj) {

            if ($(obj).css('display') == 'none') {
                $(obj).css('display', 'block');
            }
            if ($(obj).next('span').length == 1) {
                $(obj).next('span').show();
            }
            else {
                $(obj).after('<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>');
            }
        });
        $("input[type='text'][class='ivr errorbox']").each(function (i, obj) {

            if ($(obj).css('display') == 'none') {
                $(obj).css('display', 'block');
            }

        });
    }
    else {
        $(".ivr input[type=checkbox]").prop('checked', false);
        $("input[type='text'][class='ivr']").each(function (i, obj) {
            if ($(obj).css('display') == 'block') {
                $(obj).css('display', 'none');
            }
            $(obj).next('span').hide();
        });
        $("input[type='text'][class='ivr errorbox']").each(function (i, obj) {

            if ($(obj).css('display') == 'block') {
                $(obj).css('display', 'none');
                $(obj).val('');
                $(obj).removeClass('errorbox');
            }

        });
    }

});

function HideShowOnCheck(controlName, obj) {
    if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
        if ($('#Txt' + controlName + '').hasClass('errorbox')) {
            $('#Txt' + controlName + '').removeClass('errorbox');
            $('#Txt' + controlName + '').w2tag('');
            $('#Txt' + controlName + '').val('');

        }
        if (controlName.indexOf('Email') != -1) {
            $('#Txt' + controlName + '').val($('#HdnEmailId').val());
        }
        else {
            $('#Txt' + controlName + '').val($('#HdnPhoneNo').val());
        }
        $('#Txt' + controlName + '').hide();
        $('#Txt' + controlName + '').css('display', 'none');
        $('#Txt' + controlName + '').removeAttr('mandatory');
        $('#Txt' + controlName + '').next('span').hide();
    }
    else {
        $('#Txt' + controlName + '').css('display', 'block');
        if (controlName.indexOf('Email') != -1) {
            $('#Txt' + controlName + '').val($('#HdnEmailId').val());
        }
        else {
            $('#Txt' + controlName + '').val($('#HdnPhoneNo').val());
        }
        if ($('#Txt' + controlName + '').attr("mandatory") == undefined) {
            $('#Txt' + controlName + '').attr('mandatory', '1');
            if ($('#Txt' + controlName + '').next('span').length == 0) {
                $('#Txt' + controlName + '').after('<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>');
            }
            else {
                $('#Txt' + controlName + '').next('span').show();
            }
        }
        else {
            if ($('#Txt' + controlName + '').next('span').length == 0) {
                $('#Txt' + controlName + '').after('<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>');
            }
            else {
                $('#Txt' + controlName + '').next('span').show();
            }
        }
    }
}

$(document).on("click", ".txt input[type=checkbox]", function () {
    var ischecked = true;
    var id = $(this).attr('ID');
    var controlName = id.replace('chk', '');
    HideShowOnCheck(controlName, this);
    $(".txt input[type=checkbox]").each(function (i, obj) {
        if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
            ischecked = false;
        }
    });
    $(".txtAll input[type=checkbox]").prop('checked', ischecked);//5283
});

$(document).on("click", ".email input[type=checkbox]", function () {
    var ischecked = true;
    var id = $(this).attr('ID');
    var controlName = id.replace('chk', '');
    HideShowOnCheck(controlName, this);
    $(".email input[type=checkbox]").each(function (i, obj) {

        if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
            ischecked = false;
        }
    });
    $(".emailAll input[type=checkbox]").prop('checked', ischecked);
});

$(document).on("click", ".push input[type=checkbox]", function () {
    var ischecked = true;
    $(".push input[type=checkbox]").each(function (i, obj) {
        if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
            ischecked = false;
        }

    });
    $(".pushAll input[type=checkbox]").prop('checked', ischecked);//5283
});

$(document).on("click", ".ivr input[type=checkbox]", function () {
    var ischecked = true;
    var id = $(this).attr('ID');
    var controlName = id.replace('chk', '');
    HideShowOnCheck(controlName, this);
    $(".ivr input[type=checkbox]").each(function (i, obj) {
        if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
            ischecked = false;
        }
    });
    $(".ivrAll input[type=checkbox]").prop('checked', ischecked);//5283
});

function validateEmail(tblid) {

    var ctrls = $('#' + tblid + ' [mandatory="1"]');

    for (var i = 0; i < ctrls.length; i++) {
        var ctrlName = ctrls[i].id;
        var inputype = ctrls[i].className;
        if (ctrlName != "") {

            switch (inputype) {

                case "email":
                    var email = $('#' + ctrlName).val();
                    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                    if ($('#' + ctrlName).val().length == "") {
                        alert("Please enter valid EmailID");
                        $('#' + ctrlName).focus();
                        return false;
                    }
                    else {
                        if (!filter.test(email)) {
                            alert("Please enter valid Email.");
                            $('#' + ctrlName).focus();
                            return false;
                        }
                    }
                    break;

                case "txt":
                    var PhoneVal = $('#' + ctrlName).val();
                    if (($('#' + ctrlName).val().length < 14) || !($('#' + ctrlName).val().lastIndexOf('-') == 9)) {
                        alert("Please enter valid Mobile number.");
                        $('#' + ctrlName).focus();
                        return false;
                    }
                    var threenumsum = parseInt($('#' + ctrlName).val().charAt(1)) + parseInt($('#' + ctrlName).val().charAt(2)) + parseInt($('#' + ctrlName).val().charAt(3));
                    if (threenumsum <= 1) {
                        alert("Please enter valid Mobile number.");
                        $('#' + ctrlName).focus();
                        return false;
                    }
                    if (parseInt($('#' + ctrlName).val().charAt(1)) == 0) {
                        alert("Please enter valid Mobile number.");
                        $('#' + ctrlName).focus();
                        return false;
                    }

                    if ($('#' + ctrlName).val().split('-')[1].length > 4) {
                        alert("Please enter valid Mobile number.");
                        $('#' + ctrlName).focus();
                        return false;
                    }

                    break;
                case "ivr":
                    var PhoneVal = $('#' + ctrlName).val();
                    if (($('#' + ctrlName).val().length < 14) || !($('#' + ctrlName).val().lastIndexOf('-') == 9)) {
                        alert("Please enter valid Mobile number.");
                        $('#' + ctrlName).focus();
                        return false;
                    }
                    var threenumsum = parseInt($('#' + ctrlName).val().charAt(1)) + parseInt($('#' + ctrlName).val().charAt(2)) + parseInt($('#' + ctrlName).val().charAt(3));
                    if (threenumsum <= 1) {
                        alert("Please enter valid Mobile number.");
                        $('#' + ctrlName).focus();
                        return false;
                    }
                    if (parseInt($('#' + ctrlName).val().charAt(1)) == 0) {
                        alert("Please enter valid Mobile number.");
                        $('#' + ctrlName).focus();
                        return false;
                    }

                    if ($('#' + ctrlName).val().split('-')[1].length > 4) {
                        alert("Please enter valid Mobile number.");
                        $('#' + ctrlName).focus();
                        return false;
                    }

                    break;

            }

        }

    }
    return true;
}

function createmapCluster(data, mapId) {
    var geoJsonData = data;
    var LatLong = [data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]]; //["33.957577", "-117.737646"];
    var streetMapUrl = 'http://serverapi.arcgisonline.com/jsapi/arcgis/3.3/';
    var tiles = new L.TileLayer(streetMapUrl, { maxZoom: 19 });
    require(["esri/map", "dojo/domReady!"], function (Map) {

        if (data !== '' && data != null) {

            map = L.map('div-useremap', {
                center: LatLong,
                zoom: 5
            }).addLayer(tiles);
            map.options.minZoom = 8;
            map.options.maxZoom = 17;
        }
        else {
            map = L.map('div-useremap', {
                center: LatLong,
                zoom: 12
            }).addLayer(tiles).setView(LatLong, 12);

            map.options.minZoom = 12;
            map.options.maxZoom = 17;
        }

        L.esri.basemapLayer('Streets').addTo(map);
        map.setZoom(0);
        var markers = L.markerClusterGroup();

        var geoJsonLayer = L.geoJson(geoJsonData, {
            pointToLayer: function (feature, latlng) {
                var imagePath = "";
                imagePath = '../Leaflet/images/marker-icon.png';
                var smallIcon = L.icon({
                    iconSize: [10, 10],
                    iconAnchor: [13, 27],
                    popupAnchor: [1, -24],
                    iconUrl: imagePath
                });

                return L.marker(latlng, { icon: smallIcon });
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup('<b>' + 'Customer Name : ' + '</b>' + feature.properties.CustomerName + '<br>'
                        + '<b>' + 'Utility Account Number: ' + '</b>' + feature.properties.UtilityAccountNumber + '<br>'
                            + '<b>' + 'Address: ' + '</b>' + feature.properties.Address1);
            }

        });
        markers.addLayer(geoJsonLayer);
        map.addLayer(markers);
        if (data !== '')
            map.fitBounds(markers.getBounds());

    });


}

function OnClickError(request, status, error) {
    alert('Error!! ' + request.statusText);
}

function onClickSucess(data, status) {
    var response = JSON.parse(data.d);
    $('#lblAccountNumber').html((response)[0].UtilityAccountNumber);
    $('#txtNoofResidents').html((response)[0].NoOfResidents);
    $('#lblHomeType').html((response)[0].HomeType);
    $('#lblSolarPanel').html(((response)[0].SolarPanels == 1) ? 'Yes' : 'No, I dont have solar panels');
    $('#lblElectrivehicle').html(((response)[0].ElectricVehicle == 1) ? 'Yes' : 'No');
    $('#txtSolarPanel').html((response)[0].SolarPanels);
    $('#txtHomesize').html((response)[0].AreaDefined);
    $('#txtFloors').html((response)[0].Floors);
    $('#txtYearbuilt').html((response)[0].YearBuilt);
    $('#txtNumberofbathrooms').html((response)[0].NumberOfBathRooms);
    $('#txtNumberofhigheffapp').html((response)[0].NumberOfHighEfficiencyAppliances);
    $('#txtLotsize').html((response)[0].LotSize);
    $('#txtLandscapearea').html((response)[0].LandscapeArea);
    $('#txtsplandscapearea').html((response)[0].SpecialLandscapeArea);
    $('#lblPool').html(((response)[0].Pool == 1) ? 'Yes' : 'No');
}

//Send - Show all customer details in popup
function SendNotification() {
    var AccountNumbers = '';
    var rowindexes = $('#jqxchildgrid').jqxGrid('getselectedrowindexes');
    var boundrows = $('#jqxchildgrid').jqxGrid('getboundrows');
    var selectedrows = new Array();
    for (var i = 0; i < rowindexes.length; i++) {
        var row = boundrows[rowindexes[i]];
        if (AccountNumbers == "") {
            AccountNumbers = row['AccountNumber'];
        } else {
            var str = AccountNumbers + ',' + row['AccountNumber']
            AccountNumbers = str;
        }
    }

    $('#hdnAccountNos').val(AccountNumbers);

    if (AccountNumbers == "") {
        alert('Please select customer(s) to send notification');
        return;
    }

    $('#ddltypeofmessage').val('');
    $('#ddlMessageMode').val('0');
    $('#txtmsgsubject').val('');
    $('#txtMessage').val('');
    showhideeditor($("#ddlMessageMode").val());

    Popup.showModal('PopupAddTopic', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
}

function validateconfiguration() {
    var isvalid = (ValidatePage('outboxmsg') && GetFileSize('fileupd'))
    if (isvalid) {
        var objEditor = $find("ContentPlaceHolder1_rightpanel_txtEditor_ctl02_ctl00");
        var value = objEditor.get_content();
        if (value == "" && ($('#ddlMessageMode').val()) == "1") {
            alert('Please Enter Message');
            isvalid = false;
        }
    }
    return isvalid;
}

function ChangePassword() {
    if (ValidatePage('PopupChangePassword')) {
        if ($('#txtpassword').val() != $('#txtConfirmpassword').val()) {
            alert('Passwords do not match, please enter the same password.');
        }
        else {
            var CustId = $('#HiddenFieldCustid').val();
            if (ValidatePassword($('#txtpassword').val())) {
                if (confirm("Are you sure you want to reset password?")) {
                    var users;
                    var emailId = '';
                    var userName = '';
                    if (mode != 6)
                        users = usertable[0];//usertable.Tables[0].Rows;
                    else
                        users = usertable[6];//usertable.Tables[6].Rows;
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].CustomerId == CustId) {
                            emailId = users[i].EmailID;
                            userName = users[i].FirstName + ' ' + users[i].LastName;
                            break;
                        }
                    }
                    var result = Customer.ResetPassword(CustId, $('#txtpassword').val(), emailId, userName).value;
                    if (result != '') {
                        // ViewObj.Password = $('#txt' + CustId).val();
                        CancelState(CustId);
                        alert('Password reset successfully.');
                        $('#txtpassword').val('');
                        $('#txtConfirmpassword').val('');
                        Popup.hide('PopupChangePassword');
                    }
                } else {
                    alert('Password is not reset');
                }
            }
        }
    }
}


