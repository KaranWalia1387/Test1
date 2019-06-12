var GridHeight1 = 320;
var TimeOffSet = (new Date()).getTimezoneOffset();


$(document).ready(function () {
    //========= On Change title as text in textBox ========
    $(".txtDiv input[type=text].txt").on('change', function () {
        $(this).prop('title', $(this).val());
    });
    $(".divEmail input[type=text].email").on('change', function () {
        $(this).prop('title', $(this).val());
    });
    $(".divIVR input[type=text].ivr").on('change', function () {
        $(this).prop('title', $(this).val());
    });


    $(".txt input[type=checkbox]").click(function () {
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

    $(".email input[type=checkbox]").click(function () {
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

    $(".push input[type=checkbox]").click(function () {
        var ischecked = true;
        $(".push input[type=checkbox]").each(function (i, obj) {
            if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
                ischecked = false;
            }

        });
        $(".pushAll input[type=checkbox]").prop('checked', ischecked);//5283
    });

    $(".ivr input[type=checkbox]").click(function () {
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
})

function HideShowOnCheck(controlName, obj) {
    if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
        if ($('#Txt' + controlName + '').hasClass('errorbox')) {
            $('#Txt' + controlName + '').removeClass('errorbox');
            $('#Txt' + controlName + '').w2tag('');
            $('#Txt' + controlName + '').val('');
            $('#w2ui-tag-Txt' + controlName + '').remove();

        }
        if (controlName.indexOf('Email') != -1) {
            $('#Txt' + controlName + '').val($('#HdnEmailId').val());
        }
        else {
            $('#Txt' + controlName + '').val($('#HdnPhoneNo').val().replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3"));
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
            $('#Txt' + controlName + '').val($('#HdnPhoneNo').val().replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3"));
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


function LoadProfile(popupdetails, databindtogridpoup, AccountNumber) {
    for (var i = 0; i < popupdetails.length; i++) {
        //if (popupdetails[i].CustomerId == custId && popupdetails[i].Accountnumber == AccountNumber) {
        if (popupdetails[i].Accountnumber == AccountNumber) {
            $('#custName').html(popupdetails[i].CustomerName);
            $('#lblCustName').html(popupdetails[i].CustomerName);
            $('#lblLoginId').html(popupdetails[i].UserName);
            $('#lblCity').html(popupdetails[i].CityName);
            $('#lblZipCode').html(popupdetails[i].ZipCode);
            $('#statusUser').html(popupdetails[i].Status);
            $('#accounttype').html(popupdetails[i].AccountType);
            $('#paperBill').html(popupdetails[i].PaperBillStatus);
            $('#lblEmailId').html(popupdetails[i].EmailID);
            $('#lblAlternateEmailId').html(popupdetails[i].AlternateEmailID != '' ? popupdetails[i].AlternateEmailID : 'N/A');
            $('#lblMobile').html(popupdetails[i].MobileNumber != '' ? (popupdetails[i].MobileNumber).replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : popupdetails[i].MobileNumber);
            $('#lblCreateDate').html(popupdetails[i].CreatedDate);
            $('#lblAlternateNumber').html(popupdetails[i].AlternateNumber == '' || popupdetails[i].AlternateNumber == null ? 'N/A' : (popupdetails[i].AlternateNumber).replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3"));
            // Load Map Location
            latitude = popupdetails[i].Latitude;
            longitude = popupdetails[i].Longitude;
            cityname = popupdetails[i].CityName;
            zipcode = popupdetails[i].ZipCode;
            addr1 = popupdetails[i].Address1;
            addr2 = popupdetails[i].Address2;
            // break;

            var iplogin = (popupdetails[i].IPAddress == null || popupdetails[i].IPAddress == "") ? 'N/A' : popupdetails[i].IPAddress;;
            var parseddate = popupdetails[i].LastLoginAttempt == null || popupdetails[i].LastLoginAttempt == '' ? 'Never' : new Date(popupdetails[i].LastLoginAttempt);
            //bug id 17962 resolved

            if (parseddate != 'Never') {
                parseddate = new Date((parseddate * 1) + ((-(new Date().getTimezoneOffset())) * 60 * 1000));
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

function MarketingPreferences(preferenceData) {
    for (var i = 0; i < preferenceData.length; i++) {
        //if (preferenceData[i].PreferenceName == "News Releases") {
        if (preferenceData[i].PreferenceId == "1") {
            $('#lblNewsRelease').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
        }
            //else if (preferenceData[i].PreferenceName == "Service Offerings") {
        else if (preferenceData[i].PreferenceId == "2") {
            $('#lblSrvcOff').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
        }
            //else if (preferenceData[i].PreferenceName == "Newsletters") {
        else if (preferenceData[i].PreferenceId == "3") {
            $('#lblNewsletter').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
        }
            //else if (preferenceData[i].PreferenceName == "Energy Savings Toolkits") {
        else if (preferenceData[i].PreferenceId == "4") {
            $('#lblEnrgyToolkt').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
        }
            // else if (preferenceData[i].PreferenceName == "Cool Tips Brochures") {
        else if (preferenceData[i].PreferenceId == "5") {
            $('#lblBrochures').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
        }
            //else (preferenceData[i].PreferenceName == "Community Benefit Programs")
        else (preferenceData[i].PreferenceId == "6")
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
        height: GridHeight1 * .40,
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


var valuerender = function (row, datafield, value) {
    switch (datafield) {
        case "IsAMI":
            return "<span style='line-height:32px;padding-left: 5px;'>" + ((value == "false") ? "Non AMI" : "AMI") + "</span>";
            break;
    }
}

$(document).on("click", "#property", function () {
    LoadPropertyDetails();

});

$(document).on("click", "#notifications", function () {

    if ($('#custId').val() != null && $('#custId').val() != "") {
        var customerId = $('#custId').val();
        var Account = $('#ddlAddress option:selected').val();
        var param = {
            CustomerId: customerId,
            Account: Account
        }
    }


    var url1 = $('#hdnCommonUrl').val() + "/UserManagement/Customer.aspx/LoadNotificationData";

    $.ajax({
        type: "POST",
        url: url1,// "/UserManagement/Customer.aspx/LoadNotificationData",
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

    //For checking if view bill has to be shown
    var hdnViewBill = $("#hdnViewBill").val();

    if (hdnViewBill) {
        if (hdnViewBill == "2") //Infosend integration
        {
            LoadBillGridWithPDf(jsonBillgridData);
        }
        else {
            LoadBillGrid(jsonBillgridData);
        }
    }
    else {
        LoadBillGrid(jsonBillgridData);
    }


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


function imgError(image) {
    image.onerror = "";
    image.src = "../images/noimage.png";
    return true;
}

$(document).on("click", "#btnSavePopUP", function () {
    if (ValidatePage('notify') && validateEmail('notify')) {
        loader.showloader();
        var Account = $('#ddlAddress option:selected').val();
        var param = {
            AccountNumber: Account,
            xml: xml(),

        };
        var url1 = $('#hdnCommonUrl').val() + "/UserManagement/Customer.aspx/SaveDataNotification";
        $.ajax({
            type: "POST",
            url: url1,//"UserManagement/Customer.aspx/SaveDataNotification",
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
                    alert(v.Table[0].Message);
                }
                catch (ex)
                { }

            }
            else {
                alert(v.Table[0].Message);

            }
        }
        function OnError(request, status, error) {
            loader.hideloader();
            w2alert(request.statusText);

        }
    }
});

function BindDropdownPopAddress(custDetails, AccountNumber) {
    try {

        $("#ddlAddress").html('');
        $.each(custDetails, function (key, value) {
            if (value.Address2 != "")
                $('#ddlAddress').append($("<option></option>").val(value.Accountnumber).html(value.Address1 + " " + value.Address2 + ',' + " " + value.CityName + ',' + " " + value.StateCode + " - " + value.ZipCode));
            else if ((value.Address2 == "") && (value.Address1 == "")) {
                $('#ddlAddress').append($("<option></option>").val(value.Accountnumber).html(value.CityName + ',' + " " + value.StateCode + " - " + value.ZipCode));
            }
            else { $('#ddlAddress').append($("<option></option>").val(value.Accountnumber).html(value.Address1 + ',' + " " + value.CityName + ',' + " " + value.StateCode + " - " + value.ZipCode)); }

        });
        document.getElementById("ddlAddress").value = AccountNumber;
    }
    catch (e) { }
}

function LoadPropertyDetails() {
    if ($('#custId').val() != null && $('#custId').val() != "") {
        var customerId = $('#custId').val();
        $('#previousCustId').val($('#custId').val());
        var Account = $('#ddlAddress option:selected').val();

        var IsAboutMyHome = 1;
        var param = {
            CustomerId: customerId,
            IsAboutMyHome: IsAboutMyHome,
            Account: Account
        }

        var url1 = $('#hdnCommonUrl').val() + "/UserManagement/Customer.aspx/GetCustomerPropertiesforAboutMyHome";

        $.ajax({
            type: "POST",
            url: url1,//"UserManagement/Customer.aspx/GetCustomerPropertiesforAboutMyHome",
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

    if ($('#txtHomesize').text() == '' || $('#txtHomesize').html() == '') {
        $('#txtHomesize').next('span').hide();
    }
    else if ($('#txtLotsize').text() == '') {
        $('#txtLotsize').next('span').hide();
    }
    else if ($('#txtLandscapearea').text() == '') {
        $('#txtLandscapearea').next('span').hide();
    }
    else if ($('#txtsplandscapearea').text() == '') {
        $('#txtsplandscapearea').next('span').hide();
    }
}


function OnClickError(request, status, error) {
    alert('Error!! ' + request.statusText);
}

function OnErrorCS(response) {


    //loader.hideloader();
    console.log(response);
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
         { name: 'BillAmountThisPeriod', type: 'decimal' },
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
        height: 208,// GridHeight1 * .29,
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
            { text: 'Bill Amount($)', dataField: 'BillAmountThisPeriod', width: '30%', cellsformat: 'd2' },
            { text: 'Bill Pay Status', dataField: 'TranPayStatusDesc', width: '40%' }
        ]
    });

}


function viewBillFormatter(cellvalue, options, value) {
    return '<div style="text-align: center;" ><a style="text-align:left; float:left;margin-top:7px;margin-left:10px;" target="_blank" href="' + value + '">' + '<img src="../images/view_all_pdf.png" />' + '</a></div>';
}

function LoadBillGridWithPDf(billdata) {
    autoheightPrimary = false;
    if (billdata.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
         { name: 'BillingDate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
             { name: 'BillingId', type: 'number' },
         { name: 'BillAmountThisPeriod', type: 'decimal' },
         { name: 'TranPayStatusDesc' },
         { name: 'BillingPdfUrl' }
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
        height: 300,// GridHeight1 * .29,
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
            { text: 'Bill Date', dataField: 'BillingDate', width: '35%', cellsformat: "MMMM dd,yyyy" },
            { text: 'Bill Amount($)', dataField: 'BillAmountThisPeriod', width: '35%', cellsformat: 'd2' },
            //{ text: 'Bill Pay Status', dataField: 'TranPayStatusDesc', width: '20%' },
            { text: 'View Bill', dataField: 'BillingPdfUrl', width: '30%', cellsrenderer: viewBillFormatter }
        ]
    });

}

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
function LoadPaymentGrid(paydata) {
    autoheightPrimary = false;
    if (paydata.length <= 10)
        autoheightPrimary = true;
    source = {
        datatype: "array",
        datafields: [
         { name: 'TransactionConDate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
         { name: 'BillingTransactionId', type: 'number' },
         { name: 'TransactionAmount', type: 'decimal' }
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
        height: 348,// GridHeight1 * .29,
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
            { text: 'Payment Amount($)', dataField: 'TransactionAmount', width: '50%', cellsformat: 'd2' }
        ]
    });

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


function loadDataNotification(fnResponses) {

    //For clearing already extsting  values before filling new 
    $('input.email').css("display", "none");
    $('span.email').css("display", "block");
    $("input.txt:text").val("").hide();
    $("span.txt input[type=checkbox]").removeAttr('checked');
    $("input.email:text").val("").hide();
    $("span.email input[type=checkbox]").removeAttr('checked');
    // $("span.email").siblings('input').prop('checked', false);
    $("input.ivr:text").val("").hide();
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
        else {
            var TxtOutageText = JSONDoc.TxtOutageText != null ? JSONDoc.TxtOutageText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtOutageText;
            $('#TxtOutageText').val(TxtOutageText);
        }

        if (JSONDoc.chkOutageEmail) {
            $('#chkOutageEmail').prop('checked', true);
            $("#TxtOutageEmail").css("display", "block");
            $('#TxtOutageEmail').val(JSONDoc.TxtOutageEmail);
            $("#TxtOutageEmail").attr("mandatory", "1");
            $("#TxtOutageEmail").after(mandatoryHtml);
        }
        else {
            $('#TxtOutageEmail').val(JSONDoc.TxtOutageEmail);
        }
        if (JSONDoc.chkOutageIvr) {
            var TxtOutageIvr = JSONDoc.TxtOutageIvr != null ? JSONDoc.TxtOutageIvr.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtOutageIvr;
            $('#chkOutageIvr').prop('checked', true);
            $("#TxtOutageIvr").css("display", "block");
            $('#TxtOutageIvr').val(TxtOutageIvr);
            $("#TxtOutageIvr").attr("mandatory", "1");
            $("#TxtOutageIvr").after(mandatoryHtml);
        }
        else {
            var TxtOutageIvr = JSONDoc.TxtOutageIvr != null ? JSONDoc.TxtOutageIvr.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtOutageIvr;
            $('#TxtOutageIvr').val(TxtOutageIvr);
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
        else {
            var TxtBillingText = JSONDoc.TxtBillingText != null ? JSONDoc.TxtBillingText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtBillingText;
            $('#TxtBillingText').val(TxtBillingText);
        }

        if (JSONDoc.chkBillingEmail) {
            $('#chkBillingEmail').prop('checked', true);
            $("#TxtBillingEmail").css("display", "block");
            $('#TxtBillingEmail').val(JSONDoc.TxtBillingEmail);
            $("#TxtBillingEmail").attr("mandatory", "1");
            $("#TxtBillingEmail").after(mandatoryHtml);
        }
        else {
            $('#TxtBillingEmail').val(JSONDoc.TxtBillingEmail);
        }

        if (JSONDoc.chkBillingIvr) {
            var TxtBillingIvr = JSONDoc.TxtBillingIvr != null ? JSONDoc.TxtBillingIvr.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtBillingIvr;
            $('#chkBillingIvr').prop('checked', true);
            $("#TxtBillingIvr").css("display", "block");
            $('#TxtBillingIvr').val(TxtBillingIvr);
            $("#TxtBillingIvr").attr("mandatory", "1");
            $("#TxtBillingIvr").after(mandatoryHtml);
        }
        else {
            var TxtBillingIvr = JSONDoc.TxtBillingIvr != null ? JSONDoc.TxtBillingIvr.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtBillingIvr;
            $('#TxtBillingIvr').val(TxtBillingIvr);
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
        else {
            var TxtDRText = JSONDoc.TxtDRText != null ? JSONDoc.TxtDRText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtDRText;
            $('#TxtDRText').val(TxtDRText);
        }

        if (JSONDoc.chkBillingEmail) {
            $('#chkDREmail').prop('checked', true);
            $("#TxtDREmail").css("display", "block");
            $('#TxtDREmail').val(JSONDoc.TxtDREmail);
            $("#TxtDREmail").attr("mandatory", "1");
            $("#TxtDREmail").after(mandatoryHtml);
        }
        else {
            $('#TxtDREmail').val(JSONDoc.TxtDREmail);
        }

        if (JSONDoc.chkDRIvr) {
            var TxtDRIvr = JSONDoc.TxtDRIvr != null ? JSONDoc.TxtDRIvr.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtDRIvr;
            $('#chkDRIvr').prop('checked', true);
            $("#TxtDRIvr").css("display", "block");
            $('#TxtDRIvr').val(TxtDRIvr);
            $("#TxtDRIvr").attr("mandatory", "1");
            $("#TxtDRIvr").after(mandatoryHtml);
        }
        else {
            var TxtDRIvr = JSONDoc.TxtDRIvr != null ? JSONDoc.TxtDRIvr.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtDRIvr;
            $('#TxtDRIvr').val(TxtDRIvr);
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
        else {
            var TxtConnectText = JSONDoc.TxtConnectText != null ? JSONDoc.TxtConnectText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtConnectText;
            $('#TxtConnectText').val(TxtConnectText);
        }

        if (JSONDoc.chkConnectEmail) {
            $('#chkConnectEmail').prop('checked', true);
            $("#TxtConnectEmail").css("display", "block");
            $('#TxtConnectEmail').val(JSONDoc.TxtConnectEmail);
            $("#TxtConnectEmail").attr("mandatory", "1");
            $("#TxtConnectEmail").after(mandatoryHtml);
        }
        else {
            $('#TxtConnectEmail').val(JSONDoc.TxtConnectEmail);
        }

        if (JSONDoc.chkConnectIVR) {
            var TxtConnectIVR = JSONDoc.TxtConnectIVR != null ? JSONDoc.TxtConnectIVR.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtConnectIVR;
            $('#chkConnectIVR').prop('checked', true);
            $("#TxtConnectIVR").css("display", "block");
            $('#TxtConnectIVR').val(TxtConnectIVR);
            $("#TxtConnectIVR").attr("mandatory", "1");
            $("#TxtConnectIVR").after(mandatoryHtml);
        }
        else {
            var TxtConnectIVR = JSONDoc.TxtConnectIVR != null ? JSONDoc.TxtConnectIVR.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtConnectIVR;
            $('#TxtConnectIVR').val(TxtConnectIVR);
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
        else {
            var TxtServiceText = JSONDoc.TxtServiceText != null ? JSONDoc.TxtServiceText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtServiceText;
            $('#TxtServiceText').val(TxtServiceText);
        }

        if (JSONDoc.chkServiceEmail) {
            $('#chkServiceEmail').prop('checked', true);
            $("#TxtServiceEmail").css("display", "block");
            $('#TxtServiceEmail').val(JSONDoc.TxtServiceEmail);
            $("#TxtServiceEmail").attr("mandatory", "1");
            $("#TxtServiceEmail").after(mandatoryHtml);
        }
        else {
            $('#TxtServiceEmail').val(JSONDoc.TxtServiceEmail);
        }

        if (JSONDoc.chkServiceIVR) {
            var TxtServiceIVR = JSONDoc.TxtServiceIVR.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3");
            $('#chkServiceIVR').prop('checked', true);
            $("#TxtServiceIVR").css("display", "block");
            $('#TxtServiceIVR').val(TxtServiceIVR);
            $("#TxtServiceIVR").attr("mandatory", "1");
            $("#TxtServiceIVR").after(mandatoryHtml);
        }
        else {
            var TxtServiceIVR = JSONDoc.TxtServiceIVR.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3");
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
        else {
            var TxtLeakAlertText = JSONDoc.TxtLeakAlertText != null ? JSONDoc.TxtLeakAlertText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtLeakAlertText;
            $('#TxtLeakAlertText').val(TxtLeakAlertText);
        }

        if (JSONDoc.chkLeakAlertEmail) {
            $('#chkLeakAlertEmail').prop('checked', true);
            $("#TxtLeakAlertEmail").css("display", "block");
            $('#TxtLeakAlertEmail').val(JSONDoc.TxtLeakAlertEmail);
            $("#TxtLeakAlertEmail").attr("mandatory", "1");
            $("#TxtLeakAlertEmail").after(mandatoryHtml);
        }
        else {
            $('#TxtLeakAlertEmail').val(JSONDoc.TxtLeakAlertEmail);
        }

        if (JSONDoc.chkLeakAlertIVR) {
            var TxtLeakAlertIVR = JSONDoc.TxtLeakAlertIVR != null ? JSONDoc.TxtLeakAlertIVR.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtLeakAlertIVR;
            $('#chkLeakAlertIVR').prop('checked', true);
            $("#TxtLeakAlertIVR").css("display", "block");
            $('#TxtLeakAlertIVR').val(TxtLeakAlertIVR);
            $("#TxtLeakAlertIVR").attr("mandatory", "1");
            $("#TxtLeakAlertIVR").after(mandatoryHtml);
        }
        else {
            var TxtLeakAlertIVR = JSONDoc.TxtLeakAlertIVR != null ? JSONDoc.TxtLeakAlertIVR.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtLeakAlertIVR;
            $('#TxtLeakAlertIVR').val(TxtLeakAlertIVR);
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
        else {
            $('#TxtBudgetEmail').val(JSONDoc.TxtBudgetEmail);
        }

        if (JSONDoc.chkBudgetIvr) {
            var TxtBudgetIvr = JSONDoc.TxtBudgetIvr != null ? JSONDoc.TxtBudgetIvr.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtBudgetIvr;
            $('#chkBudgetIvr').prop('checked', true);
            $("#TxtBudgetIvr").css("display", "block");
            $('#TxtBudgetIvr').val(TxtBudgetIvr);
            $("#TxtBudgetIvr").attr("mandatory", "1");
            $("#TxtBudgetIvr").after(mandatoryHtml);
        }
        else {
            var TxtBudgetIvr = JSONDoc.TxtBudgetIvr != null ? JSONDoc.TxtBudgetIvr.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtBudgetIvr;
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


function OpenCustomerDetail(ids, custId, accnumber, statusforlink, databindtogridpoup) {
    try {
        //$('#gird_show_css').modal('hide');
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

        $('#custId').val(custId);

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

                //******************************************
                LoadProfile(ZipcodeDetails, databindtogridpoup, AccountNumber);
                //******************************************
                break;
            }
        }
        var p = 'UserName>' + ZipcodeDetails[0].UserName + '&Password>' + ZipcodeDetails[0].Password;

        if (statusforlink == "Active") {
            $('#lnkToPortal').css('display', 'block');
            $('#lnkToPortal').attr('href', $('#portalweb').val() + '?key=' + Customer.Encrypt(p).value);
            $('#lnkToPortal').attr('target', '_new');
        }
        else {
            $('#lnkToPortal').css('display', 'none');
        }

        //Start - Load notify,payment,requests and plans tab
        //popupdetails = Customer.LoadPopupDetailsData(accnumber, TimeOffSet).value;


        //Check for view bill pdf
        if ($('#hdnViewBill')) {
            if ($('#hdnViewBill').val() == "2") //For infosend billing pdf
            {
                popupdetails = Customer.LoadPopupDetailsDataWithBillingPdf(accnumber, TimeOffSet).value;
            }
            else {
                popupdetails = Customer.LoadPopupDetailsData(accnumber, TimeOffSet).value;
            }
        }
        else {
            popupdetails = Customer.LoadPopupDetailsData(accnumber, TimeOffSet).value;
        }

        FillCustomerDetails(popupdetails);
        //LoadProfile(popupdetails,databindtogridpoup);
        //End


    }
    catch (e) {
        console.log(e);
    }
}