var DBOption;
$(document).ready(function () {
    var timeOffsetMinutes = -(new Date()).getTimezoneOffset();
    $.ajax({
        async: false,
        type: "POST",
        url: "Default.aspx/GetSiteMaintenanceDetails",
        data: "{timeoffset:'" + timeOffsetMinutes + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function OnSuccess(response) {
            if (response.d.status == "1") {
                $("#divschedulr").show();
                $("#lblDate").text(response.d.maintenacedate);
                $("#lblHours").text(response.d.hr);
                $("#lblMinutes").text(response.d.min);
                $("#lblSeconds").text(response.d.sec);
            }
            else if (response.d.status == "0") {
                $("#divschedulr").hide();
            }
            else if (response.d.status == "2") {
                window.location.href = response.d.url;
            }
        },
        failure: function (response) {

        },
        error: function (response) {

        }
    });

    try{
        $('#txtpwd').disableAutocomplete();
    }
    catch (ex) {
        var msg = ex.message;
        console.log(msg);
    }
    $(".login-sector-close").click(function () {
        $(".login-sector").hide();
    });
    // $('input[type=password]').disableAutocomplete();
    $('.nav_login_section ul li').click(function (e) {
        $('.nav_login_section ul li').removeClass('active');
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
        }

    });

    
    refresh();
    $(window).on('resize', refresh);
    $("#rmclass").css("display", "none");

    var qrStr = window.location.search;
    if (qrStr != "") {
        qrStr = qrStr.split("?")[1].split("=")[1];

        if (qrStr == 'prelogin') {
            var duration = 700;
            $(".login-sector").toggle("options");
        }
    }
    var aa = $(window).width();
    if ($(window).width() < 767) {
        $("#drp-dwn").click(function () {
            var options = { direction: 'bottom' };
            $(".login-sector").toggle("options");

        });
    } else {
        $("#drp-dwn").click(function () {

            var effect = 'slide';
            var options = { direction: 'right' };
            var duration = 500;
            $(".login-sector").toggle(effect, options, duration);

        });
    }



    //This code is use to open the forgot password Container.
    $('#lnkFPwd').click(function () {
        $("#LoginboxContainer").hide();
        $("#ForgetPswdContainer").show();
        $('#txtUserid').val('');
        // divName = "forgotPassword";
    });

    //This code is use to close the forgot password Container.
    $('#FrgtPswdCancelBtn').click(function () {
        $("#ForgetPswdContainer").hide();
        $("#LoginboxContainer").show();
        //divName = "login";
    });

    //This code is for going back to the login page from the forgot passowrd page
    $('#lnkLogin').click(function () {
        $("#LoginboxContainer").show();
        $("#ForgetPswdContainer").hide();
        //divName = "login";
    });

    //Code for About my home
    $('#BtnCloseAboutMyHome').click(function () {
        try {
            window.location = DBOption;//"dashboard.aspx";
        }
        catch (e) { return false; }
    });

    $('#btnClearSaveHomeInfo').click(function () {
        try {
            window.location = DBOption;// "dashboard.aspx";
            return false;
        }
        catch (e) { return false; }
    });

    $('#btnClearSaveBusinessInfo').click(function () {
        try {
            window.location = DBOption;// "dashboard.aspx";
            return false;
        }
        catch (e) { return false; }
    });

    $('#ddlUserAddress').change(function () {
        try {

            $('#lblAccountNumber').text($(this).val().split('#')[1]);
        }
        catch (e) { }
    });

    $('#ddlSolarPanel').change(function () {
        try {
            $('#txtSolarPanel').val('');
            if ($(this).val() == '2') {
                $('#txtSolarPanel').attr('mandatory', '0');
                $('#div_Noofsolarpanels').show();
            }
            else {
                $('#txtSolarPanel').removeAttr('mandatory');
                $('#div_Noofsolarpanels').hide();
            }
        }
        catch (e) { } 
    });

    $('#btnSaveBusinessInfo').click(function () {
        try {
            //loader.show();
            if (!$('#chkdonotenter').is(":checked")) {
                if (ValidateAllPageFieldsSingleMessage('accountdetails')) {

                    var param = '1';
                    param += '|' + $('#ddlBusinessSize').val() + '|' + $('#ddlBusinessType').val() + '|' + $('#txtNoofResident').val();
                    param += '|' + $('#txtOfficeArea').val() + '|' + $('#txtBusinnessLotSize').val() + '|' + $('#txtNoofFloors').val() + '|' + $('#txtNoOfRestrooms').val();
                    param += '|' + $('#txtBusinessLandscapeArea').val() + '|' + $('#rdbSolarPanels').find(":checked").val() + '|' + $('#txtGeneratingCapacity').val();
                    param += '|' + $('#rdbElevator').find(":checked").val() + '|' + $('#rdbHVACSystem').find(":checked").val() + '|' + $('#rdbElectricalSystem').find(":checked").val();
                    param += '|' + $('#rdbPlumingWaterSystem').find(":checked").val() + '|' + $('#rdbServerRoom').find(":checked").val() + '|' + $('#rdbSwimmingPool').find(":checked").val();

                    var result = _default.GetSetWorkplaceDetail($('#lblUtilityAccountNumber').text(), param).value;
                    if (result.Tables[0].Rows[0].STATUS == "1") {

                        //loader.hide();
                        toastr.success(result.Tables[0].Rows[0].Message);
                        window.location = DBOption;// "dashboard.aspx";
                        return false;
                    }
                    else {
                        $('.bg').hide();
                        $('.upper-footer').show();
                        $('.container').show();
                        //loader.hide();
                        toastr.error(result.Tables[0].Rows[0].Message);
                        resetAboutMyBusiness();
                        return false;
                    }

                    return false;
                }
            }
            else {
            
                var str = '1|' + $('#hdnCustomerid').val();
                var result = _default.GetSetWorkplaceDetail(str).value;
                if (result.Rows[0].STATUS == "1") {
                    toastr.success(result.Rows[0].Message);
                    window.location = DBOption;//"dashboard.aspx";
                    return false;
                }
                else {
                    $('.bg').hide();
                    $('.upper-footer').show();
                    $('.container').show();
                    toastr.error(result.Rows[0].Message)
                    resetAboutMyBusiness();
                    return false;
                }
            }

            // loader.hide();
        }
        catch (e) { return false; }
    });

    $('#btnSaveHomeInfo').click(function () {

        try {
            if (!$('#chkdonotenter').is(":checked")) {
                if (ValidateAllPageFieldsSingleMessage('mid_area_home')) {
                    var txtarr = ['txtNumberofbathrooms', 'txtLotsize', 'txtLandscapearea', 'txtsplandscapearea'];
                    for (var i = 0; i < txtarr.length; i++) {
                        if (parseInt($('#' + txtarr[i]).val()) == 0) {
                            error.showerror($('#' + txtarr[i]), 'Zero (0) is not allowed.');
                            return false;
                        }
                    }

                    if (ValidateBuiltyear()) {
                        var str = '0|' + $('#ddlUserAddress').val().split('#')[0] + '|' + $('#ddlHomeType').val();
                        if ($('#ddlSolarPanel').val() == '1')
                            str += '|' + 0;
                        else
                            str += '|' + $('#txtSolarPanel').val();

                        var evcheck = 0;
                        var poolcheck = 0;
                        if ($('[id$=rdbEVyes]').is(':checked') == true) {

                            evcheck = 1;


                        }
                        if ($('[id$=rdbPoolYes]').is(':checked') == true) {
                            poolcheck = 1;


                        }

                        str += '|' + $('#ddlNoOfResidents').val() + '|' + $('[id$=txtHomesize]').val();
                        str += '|' + evcheck + '|' + $('[id$=txtFloors]').val() + '|' + $('[id$=txtYearbuilt]').val();
                        str += '|' + poolcheck + '|' + $('[id$=txtNumberofbathrooms]').val() + '|' + $('[id$=txtNumberofhigheffapp]').val();
                        str += '|' + $('[id$=txtLotsize]').val() + '|' + $('[id$=txtLandscapearea]').val() + '|' + $('[id$=txtsplandscapearea]').val();
                        var result = _default.setMyHomeInfo(str).value;
                        if (result.Rows[0].Status == "1") {
                            toastr.success(result.Rows[0].Message);
                             window.location = DBOption;// "dashboard.aspx";
                        }
                        else {
                            $('.bg').hide();
                            $('.upper-footer').show();
                            $('.container').show();
                            toastr.error('Your submission was unsuccessful, please try again.');

                            //w2alert('Your submission was unsuccessful, please try again.');
                            resetAboutMyHome();
                            return false;
                        }
                    }
                }
                else { return false; }
            }
            else {
                var str = '1|' + $('#hdnCustomerid').val();
                var result = _default.setMyHomeInfo(str).value;
                if (result.Rows[0].Status == "1") {
                    toastr.success(result.Rows[0].Message);
                    window.location = DBOption;//"dashboard.aspx";
                    return false;
                }
                else {
                    $('.bg').hide();
                    $('.upper-footer').show();
                    $('.container').show();
                    toastr.error(result.Rows[0].Message)
                    resetAboutMyHome();
                    return false;
                }
            }
            return false;
        }
        catch (e) { return false; }
    });
    function resetAddress() {
        try {
            $("#ddlUserAddress option[value='" + $('#ddlUserAddress').val() + "']").remove();
            if ($('#ddlUserAddress > option').length > 0) {
                toastr.warning('Please enter for another address')
                //w2alert('Please enter for another address');
                $('#RegisteredHomeContainer select').prop('selectedIndex', 0);
                $('#RegisteredHomeContainer input[type=text]').val('');
                $('#div_Noofsolarpanels').hide();
                $('#lblAccountNumber').text($('#ddlUserAddress').val());
            }
            else {
                //resetAboutMyHome();
                window.location = DBOption;//"dashboard.aspx";
            }
        }
        catch (e) { }
    }

    function resetAboutMyHome() {
        try {
            $('#RegisteredHomeContainer').hide();
            $('#logologin').show();
            $('#LoginboxContainer').show();
            $('#RegisteredHomeContainer input[type=text]').val('');
            $('#RegisteredHomeContainer select').prop('selectedIndex', 0);
            $('#ddlNoOfResidents').val('');
            $('#txtHomesize').val('');
        }
        catch (e) { }
    }

    function resetAboutMyBusiness() {
        try {
            $('#RegisteredBusinessContainer').hide();
            $('#logologin').show();
            $('#LoginboxContainer').show();
            $('#RegisteredBusinessContainer input[type=text]').val('');
            $('#RegisteredBusinessContainer select').prop('selectedIndex', 0);
            $('#txtNoofResident').val('');
          //  $('#txtHomesize').val('');
        }
        catch (e) { }
    }

    function BindBusinessSize(data) {
        try {
            $('#ddlBusinessSize').empty();
            for (var i = 0; i < data.Rows.length; i++) {
                $('#ddlBusinessSize').append($("<option></option>").val(data.Rows[i]["MasterCode"]).html(data.Rows[i]["Name"]));
            }
        }
        catch (e) { }
    }

    function BindBusinessType(data) {
        try {
            $('#ddlBusinessType').empty();
            for (var i = 0; i < data.Rows.length; i++) {
                $('#ddlBusinessType').append($("<option></option>").val(data.Rows[i]["MasterCode"]).html(data.Rows[i]["Name"]));
            }
        }
        catch (e) { }
    }

    function BindAddress(data) {
        try {
            $('#ddlUserAddress').empty();
            for (var i = 0; i < data.Rows.length; i++) {
                $('#ddlUserAddress').append($("<option></option>").val(data.Rows[i]["AccountNumber"] + '#' + data.Rows[i]["PremiseNumber"]).html(data.Rows[i]["Address"]));
                if (data.Rows.length < 2) { $('#ddlUserAddress').hide(); }
            }

            $('#lblAccountNumber').text($('#ddlUserAddress').val().split('#')[1]);
        }
        catch (e) { }
    }

    function BindHomeType(data) {
        try {
            $('#ddlHomeType').empty();
            for (var i = 0; i < data.Rows.length; i++) {
                $('#ddlHomeType').append($("<option></option>").val(data.Rows[i]["Id"]).html(data.Rows[i]["NAME"]));
            }
        }
        catch (e) { }
    }

    function BindNoOfResidents(data) {
        try {
            $('#ddlNoOfResidents').empty();
            for (var i = 0; i < data.Rows.length; i++) {
                $('#ddlNoOfResidents').append($("<option></option>").val(data.Rows[i]["Id"]).html(data.Rows[i]["Name"]));
            }
        }
        catch (e) { }
    }

    function isCookiesEnabled() {
        try {
            if (navigator.cookieEnabled)
                return true;
            else
                return false;
        }
        catch (e) {
            console.log('Error in isCookiesEnabled');
        }
    }
    //This code will fired on the click of forgot password popup submit button.
    $('#BtnSubmit').click(function () {

        try {
           if ($('#txtUserid').val() != "") {
                $('#showloadingscreen').show();
                $.ajax({
                    type: "POST",
                    url: "Default.aspx/ForgotPassword",
                    data: "{uidOrEmail:'" + $("#txtUserid").val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function OnSuccess(response) {

                        showmessage(response.d);
                        $('#showloadingscreen').hide();
                    },
                    failure: function (response) {
                        toastr.error(response.d);
                        $('#showloadingscreen').hide();

                    },
                    error: function (response) {

                        $('#showloadingscreen').hide();

                    }
                });


                return false;
            }
            else {
                toastr.warning("Please enter User ID or Email ID");
                return false;
            }
        }
        catch (e) { }
    });

    function showmessage(msg) {
        if (msg == '' || msg == null) {
            toastr.error('Sorry. Your account data is not available at this time. Please try again later or contact customer support.');
            return;
        }

        $('#txtUserid').val('');
        $('#txtSecurityAns').val('');
        toastr.error(msg)
        // w2alert(msg);
    }

    $('#btnlogin').click(function () {

        if (isCookiesEnabled() == false) {
            toastr.warning('Cookies are not enabled. Please enable cookies from browser settings.')
            return false;
        }
        if ($('#txtLogin').val() == "" && $('#txtpwd').val() == "") {
            $('#errorMsg').fadeIn(500).delay(3000).fadeOut(1000);
            $('#errorMsg').html($('#uservalidation').text());
            return false;
        }
        else if ($('#txtpwd').val() == "") {
            error.showerror($('#txtpwd'), $('#ML_Default_Lbl_Password').text());
            return false;
        }
        else if ($('#txtLogin').val() == "") {
            error.showerror($('#txtLogin'), $('#ML_Default_Lbl_UserID').text());
            return false;
        }
        else {
            try {
                loader.showloader();
                var loginresult;
                var param = {
                    username: $("#txtLogin").val(), password: $("#txtpwd").val(), rememberme: $('#rememberMeCheck').is(':checked'), calledFrom: "LN"
                }
                $.ajax({
                    type: "POST",
                    url: "Default.aspx/validateLogin",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function OnSuccess(response) {
                        loginresult = $.parseJSON(response.d);
                        if (loginresult != null) {
                            var maintable = loginresult[0];
                            var counttable = loginresult[1];


                            if (counttable.CoulmnCount > 2) {
                                 DBOption = loginresult[0]['DashboardOption'];
                                switch (DBOption) {
                                    case "1":
                                        DBOption = "Dashboard.aspx";
                                        break;
                                    case "2": DBOption = "DashboardCustom.aspx"; break;
                                    case "3": DBOption = "DashboardCustom3_3.aspx"; break;
                                    default: DBOption = "Dashboard.aspx";
                                }
                                $("#hdnIsValid").val(1);
                                if (maintable != null) {
                                    // if (maintable.Rows[0].Role == 3) {
                                    if (maintable.HomeInfoStatus == 'False' || maintable.HomeInfoStatus == '0') {
                                        $('#hdnCustomerid').val(maintable.Customerid);
                                        $('#privacypolicy').val(maintable.RegistrationPrivacyPol);
                                        $('#termsconditions').val(maintable.RegistrationTermCond);
                                        var dt = new Date();
                                        if ($('#rememberMeCheck').is(':checked')) {
                                            dt.setMonth(dt.getMonth() + 2);
                                            document.cookie = "UName=" + $('#txtLogin').val() + "; expires=" + dt;
                                            document.cookie = "PWD=" + $('#txtpwd').val() + "; expires=" + dt;
                                        }
                                        else {
                                            dt.setMonth(dt.getMonth() - 1);
                                            document.cookie = "UName=" + $('#txtLogin').val() + "; expires=" + dt;
                                            document.cookie = "PWD=" + $('#txtpwd').val() + "; expires=" + dt;
                                        }
                                        resetlogin('');
                                        //islogin = 1;
                                        $("#errorMsg").remove();//Remove Already existing  Error block
                                        $("<span id='errorMsg' style='position: static;'></span>").insertBefore(".close_icon");//Insert it before close Icon 
                                        customerpropertiesresult = _default.GetCustomerProperties().value;
                                        if (customerpropertiesresult != null) {
                                            BindAddress(customerpropertiesresult.Tables[0]);
                                            if (customerpropertiesresult.Tables[0].Rows.length > 1) {
                                                $('.useraddress').show();
                                            }
                                            else { $('.useraddress').hide(); }
                                            
                                            BindHomeType(customerpropertiesresult.Tables[1])
                                            BindNoOfResidents(customerpropertiesresult.Tables[2])
                                            $('#LoginboxContainer').hide();
                                            $('#loginLogo').hide();
                                            if (loginresult[0].CustomerType == "2") {
                                                $('#lblUtilityAccountNumber').text(loginresult[0].PremiseNumber);
                                                var dropdownbind = _default.GetSetWorkplaceDetail(loginresult[0].UtilityAccountNumber, 0).value;
                                                BindBusinessSize(dropdownbind.Tables[1]);
                                                BindBusinessType(dropdownbind.Tables[2]);
                                                $('#RegisteredBusinessContainer').show(); $('#RegisteredHomeContainer').hide();
                                            }
                                            else { $('#RegisteredHomeContainer').show(); $('#RegisteredBusinessContainer').hide(); $('#lblUtilityAccountNumber').val(''); }
                                            
                                            $('.bg').show();
                                            $('.upper-footer').hide();
                                            $('.container').hide();
                                            $('.main.container1').show();
                                            loader.hideloader();
                                            return false;
                                        }
                                        else {
                                            resetlogin('Your account isn\'t activated. Please contact customer support.');
                                            loader.hideloader();
                                            return false;
                                        }
                                         }
                                       
                                    else if (maintable.STATUS == 0) {
                                        resetlogin(maintable.Message);
                                        loader.hideloader();
                                        return false;
                                    }
                                        //End Comment
                                    else {
                                        window.location = DBOption;
                                    }

                                }
                                else {
                                    resetlogin('Your account isn\'t activated. Please contact customer support.');
                                    loader.hideloader();
                                    return false;
                                }
                            }
                            else {
                                resetlogin(maintable.Message);
                                loader.hideloader();
                                return false;
                            }

                        }
                        else
                        {
                            toastr.clear();
                            toastr.error($('#idErrMsg')[0].title);
                            loader.hideloader();
                            return false;
                        }
                    },

                    failure: function (response) {
                        toastr.clear();
                        resetlogin('Your account isn\'t activated. Please contact customer support.');
                        loader.hideloader();
                        return false;

                    },
                    error: function (response) {
                        toastr.clear();
                        //resetlogin('Your account isn\'t activated. Please contact customer support.');
                        toastr.error($('#idErrMsg')[0].title);
                        loader.hideloader();
                        return false;
                    }
                });
            }

            catch (e) { return false; }
        }
    });

    $(".help_popup_link .glyphicon-question-sign").click(function (e) {
        $(".help_popup_box").toggle();
        e.stopPropagation();
    });
    $(document).click(function (e) {
        if (!$(e.target).is('.help_popup_box, .help_popup_box *')) {
            $(".help_popup_box").hide();
        }
    });

    $(".help_popup_link_1 .glyphicon-question-sign").click(function (e) {
        $(".help_popup_box_1").toggle();
        e.stopPropagation();
    });
    $(document).click(function (e) {
        if (!$(e.target).is('.help_popup_box_1, .help_popup_box_1 *')) {
            $(".help_popup_box_1").hide();
        }
    });
    $(".help_conte_box").hide();
    $('#elm1').hover(
           function () { $('#help_conte_box1').addClass('show') },
           function () { $('#help_conte_box1').removeClass('show') }
    )

    $('#elm2').hover(
function () { $('#help_conte_box2').addClass('show') },
function () { $('#help_conte_box2').removeClass('show') }
)
    $('#elm3').hover(
function () { $('#help_conte_box3').addClass('show') },
function () { $('#help_conte_box3').removeClass('show') }
)
    $('#elm4').hover(
function () { $('#help_conte_box4').addClass('show') },
function () { $('#help_conte_box4').removeClass('show') }
)
    $('#elm5').hover(
function () { $('#help_conte_box5').addClass('show') },
function () { $('#help_conte_box5').removeClass('show') }
)
    $('#elm6').hover(
function () { $('#help_conte_box6').addClass('show') },
function () { $('#help_conte_box6').removeClass('show') }
)
    $('#elm7').hover(
function () { $('#help_conte_box7').addClass('show') },
function () { $('#help_conte_box7').removeClass('show') }
    )
});

$(window).load(function () {
    try{
    var solarMessage = $('#solarPanelMessage').text();             
    $('#solarhelplink').text(solarMessage);
    $('#homeSizehelplink').html($('#homeSizeMessage').text());
    $('#electricVehiclehelplink').text($('#electricVehicleMessage').text());
    $('#numberofhighefficiencyhelplink').text($('#noOfAppliancesMessage').text());
    $('#lotSizehelplink').text($('#lotSizeMessage').text());
    $('#landscapeAreahelplink').text($('#landscapAreaMessage').text());
    $('#speciallandscapeAreahelplink').text($('#specialLandscapAreaMessage').text());
    }
    catch (ex) {
        var msg = ex.message;
        console.log(msg);
    }
});




//function checkClientTimeZone() {
//    // Set the client time zone
//    var dt = new Date();
//    var tz = -dt.getTimezoneOffset();
//    var parameter = "{str:'" + tz.toString() + "'}";
//    $.ajax({
//        type: "POST",
//        url: "dashboard.aspx/setcookie",
//        contentType: "application/json; charset=utf-8",
//        data: parameter,
//        datatype: "json",
//    });
//}

function refresh() {

}

//This function is use to reset the control's of login box.
function resetlogin(message) {
    try {
        //$('#txtLogin').val(''); //acc to new functionality by manoj
        if (message != '') {
            $('#txtpwd').val('');
            $('#lblMsg').text(message);
            $('#lblMsg').show();
            $('#lblMsg').fadeIn(500).delay(4000).fadeOut(1000);
        }
    }
    catch (e) { }
}