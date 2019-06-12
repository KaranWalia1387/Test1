<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ServiceRequest.ascx.cs" Inherits="CustomerPortal.ServiceRequest" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControls/AccountLengthUserControl.ascx" TagPrefix="uc1" TagName="AccountLengthUserControl" %>
<%@ Register Src="~/UserControls/ZipCode.ascx" TagPrefix="uc1" TagName="ZipCode" %>
<script src="js/OuterServiceRequest.js" type="text/javascript"></script>
<script src="js/jquery.creditCardValidator.js" type="text/javascript"></script>
<script src="js/jquery.disable.autocomplete.js"></script>
<script type="text/javascript">

    var calmonth = [
        {
            month:1,monthname:"January"
        },
        {
            month: 2, monthname: "February"
        }, {
            month:3, monthname: "March"
        },
        {
            month: 4, monthname: "April"
        },
        {
            month: 5, monthname: "May"
        },
        {
            month: 6, monthname: "June"
        },
        {
            month: 7, monthname: "July"
        },
        {
            month: 8, monthname: "August"
        },
        {
            month: 9, monthname: "September"
        },
        {
            month: 10, monthname: "October"
        },
        {
            month: 11, monthname: "November"
        },
        {
            month: 12, monthname: "December"
        }
        
        
    ];
        

   
    $('#txtCardNo').disableAutocomplete();
    $('#txtSecurity').disableAutocomplete();
 
    var divStatus = 0;
   

    $(document).ready(function() {
        try {
            $('#txtSecurity').disableAutocomplete();
            $('#txtRoutingNmbr')
                .blur(function() {
                    testRoutingNumber();
                });
          
            if ($('#rdoCredit').is(':checked')) {
                $('#txtAccountName').removeAttr('mandatory');
                $('#txtRoutingNmbr').removeAttr('mandatory');
                $('#txtBankName').removeAttr('mandatory');
                $('#txtBankAccNumber').removeAttr('mandatory');
            }

            $('#txtPrimaryPhone').mask('(000) 000-0000');
            $('#txtAlternatNum').mask('(000) 000-0000');
            $('#txtDOB').mask('00/00/0000');
            $('#txtSSN').mask('000-00-0000');
            $('#TxtSclSecrityNo').mask('00000000');
            $('#TxtDateOfBirth').mask('00/00/0000');

        } catch (ex) {
            console.log(ex.message);
        }

        $("select").each(function() {
                var s = this;
                for (i = 0; i < s.length; i++) {
                    s.options[i].title = s.options[i].text;

                }
                if (s.selectedIndex > -1)
                    s.onmousemove = function() {
                        s.title = s.options[s.selectedIndex].text;
                    };
            });

        $('#rdoCredit')
            .click(function() {
                if ($('#rdoCredit').attr('checked', 'true')) {
                    $('#creditcard_box').show();
                    $('#bankaccount_box').attr('style', 'display:none!important;');
                    $('#txtAccountName').removeAttr('mandatory');
                    $('#txtRoutingNmbr').removeAttr('mandatory');
                    $('#txtBankName').removeAttr('mandatory');
                    $('#txtBankAccNumber').removeAttr('mandatory');
                    $('#txtCardNo').attr('mandatory', '1');
                    $('#txtSecurity').attr('mandatory', '1');
                    paytypeid = 1;
                }
            });

        $('#ddlYear').change(function () {

            try {
                var selected_year = $("#ddlYear option:selected").text();
                var selected_month = $("#ddlMonth option:selected").val();
                DT = $('#hdnCurrentDate').val().split("-");
                var start_month = selected_month;

                if (selected_year == DT[0]) {
                    if (selected_month < (parseInt(DT[2]) + 1))
                        start_month = parseInt(DT[2]) + 1;
                    $("#ddlMonth option[value=" + start_month + "]").prop('selected', true);
                }
                else {
                    var start_month = 1;
                }
            }
            catch (e) { }
        });

        $('#ddlMonth').change(function () {
            try {
                var selected_year = $("#ddlYear option:selected").text();
                var selected_month = $("#ddlMonth option:selected").val();
                DT = $('#hdnCurrentDate').val().split("-");
                var start_month = 1;

                if (selected_year == DT[0]) {
                    if (selected_month < (parseInt(DT[2]) + 1)) {
                        $("#ddlMonth option").removeAttr('selected');
                        start_month = parseInt(DT[2]) + 1;
                        $("#ddlMonth option[value=" + start_month + "]").prop('selected', true);
                    }
                }
            }
            catch (e) { }
        });

        $('#rdoBank').click(function () {
            if ($('#rdoBank').attr('checked', 'true')) {
                $('#creditcard_box').attr('style', 'display:none!important;');
                $('#bankaccount_box').show();
                $('#txtTotlal').removeAttr('mandatory');
                // $('#txtCardNo').removeAttr('mandatory');
                $('#txtSecurity').removeAttr('mandatory');
                $('#txtAccountName').attr('mandatory', '1');
                $('#txtRoutingNmbr').attr('mandatory', '1');
                $('#txtBankName').attr('mandatory', '1');
                $('#txtBankAccNumber').attr('mandatory', '1');
                paytypeid = 2;
            }
        });
       

        $('#txtCardNo').validateCreditCard(function (result) {
            try {
                if (result.card_type != null) {
                    $('#txtCardNo').attr('maxlength', result.card_type.valid_length[0]);
                    switch (result.card_type.name) {
                    case "visa":
                        setCreditCardType('visa');
                        break;
                    case "mastercard":
                        setCreditCardType('mastercard');
                        break;
                    case "discover":
                        setCreditCardType('discover');
                        break;
                    case "amex":
                        setCreditCardType('amex');
                        break;
                    default:
                        toastr.warning($('#ML_OnetimePayment_Msg_CreditCard').text());
                        $("#ImgCard").show();
                        $('#ImgVisa').hide();
                        $('#Imgamex').hide();
                        $('#ImgMaster').hide();
                        $('#ImgDiscov').hide();
                        $('#hdnCardtype').val('');
                    }
                }
                else {
                    if ($('#txtCardNo').val().length == 5) {
                        toastr.warning($('#ML_OnetimePayment_Msg_CreditCard').text());
                        $('#txtCardNo').val('');
                    }
                    $("#ImgCard").show();
                    $('#ImgVisa').hide();
                    $('#Imgamex').hide();
                    $('#ImgMaster').hide();
                    $('#ImgDiscov').hide();
                    $('#hdnCardtype').val('');
                }
            }
            catch (e) { }
        }, { accept: ['visa', 'mastercard', 'discover', 'amex'] });
    });
  
    function testRoutingNumber() {
        //  loader.showloader();
        if ($('#txtRoutingNmbr').val() != '') {
            if (!$('#rdoCredit').prop('checked')) {
                var param = { RoutingNumber: "RoutingNumber=" + $('#txtRoutingNmbr').val() };
                $('#txtBankName').prop('readonly', false);
                if ($('#txtRoutingNmbr').val().length == 9) {
                    $.ajax({
                        type: "POST",
                        url: "one-timepayment.aspx/GetBankName",
                        data: JSON.stringify(param),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: OnSuccessBankName,
                        error: OnErrorBankName
                    });

                    function OnSuccessBankName(data, status) {
                        var result = JSON.parse(data.d);
                        if ((result != null || result != undefined) && (result.length > 0)) {
                            $('#txtBankName').val(result[0].BankName);
                            $('#txtBankName').prop('readonly', true);
                            $('#txtBankName').attr("enable", false);
                            $('#txtBankName').removeClass('errorbox');
                            return true;
                        }
                        else if (result.length == 0) {
                            error.showerror($('#txtRoutingNmbr'), $('#txtRoutingNmbr').attr('ValidateMessage'));
                            $('#txtBankName').prop('readonly', true);
                            $('#txtBankName').attr("enable", false);
                            $('#txtRoutingNmbr').val('');
                            return false;
                        }
                    }
                    function OnErrorBankName(request, status, error) {
                        toastr.error("Error")
                    }
                }

                else if ($('#txtRoutingNmbr').val().length > 0) {
                    error.showerror($('#txtRoutingNmbr'), $('#txtRoutingNmbr').attr('ValidateMessage'));
                    $('#txtBankName').val('');
                    $('#txtRoutingNmbr').val('');
                    $('#txtRoutingNmbr').focus();
                    return false;
                }
                else {
                    $('#txtBankName').val('');
                    return false;
                }
            }
            else {
                return true;
            }
        }
        
    }

    function Count(text, long) {
        var maxlength = new Number(long); // Change number to your max length.
        if (text.value.length > maxlength) {
            text.value = text.value.substring(0, maxlength);
           
            toastr.warning(" More than " + long + "Character not allowed")//more than 100/1000 character not allowed
        }
    }

    function setCreditCardType(type) {
        $('#txtSecurity').attr('maxlength', '3');
        $('#txtCardNo').attr('maxlength', '19');

        if (type.toString().indexOf("visa") > -1)
            type = "visa";
        else if (type.toString().indexOf("mastercard") > -1)
            type = "mastercard";
        else if (type.toString().indexOf("discover") > -1)
            type = "discover";
        else if (type.toString().indexOf("amex") > -1)
            type = "amex";
        else
            type = "";

        switch (type) {
        case "visa":
            $('#ImgVisa').show();
            $('#Imgamex').hide();
            $('#ImgMaster').hide();
            $('#ImgDiscov').hide();
            $('#ImgCard').hide();
            $('#hdnCardtype').val('Visa');
            maxlength = 3;
            cardlenth = 16;
            break;
        case "mastercard":
            maxlength = 3;
            cardlenth = 16;
            $('#ImgVisa').hide();
            $('#Imgamex').hide();
            $('#ImgMaster').show();
            $('#ImgDiscov').hide();
            $('#ImgCard').hide();
            $('#hdnCardtype').val('MasterCard');
            break;
        case "discover":
            maxlength = 3;
            cardlenth = 16;
            $('#ImgVisa').hide();
            $('#Imgamex').hide();
            $('#ImgMaster').hide();
            $('#ImgCard').hide();
            $('#ImgDiscov').show();
            $('#hdnCardtype').val('Discover');
            break;
        case "amex":
            maxlength = 4;
            cardlenth = 15;
            $('#ImgVisa').hide();
            $('#Imgamex').show();
            $('#ImgMaster').hide();
            $('#ImgDiscov').hide();
            $('#ImgCard').hide();
            $('#hdnCardtype').val('American Express');
            $('#txtSecurity').attr('maxlength', '4');
            $('#txtCardNo').attr('maxlength', '15');
            break;
        default:
            $("#ImgCard").show();
            $('#ImgVisa').hide();
            $('#Imgamex').hide();
            $('#ImgMaster').hide();
            $('#ImgDiscov').hide();
            $('#hdnCardtype').val('');
        }
    }

    function refresh() {
        
        if ((window.detectZoom.device().toFixed(1) >= 1.09) && (window.detectZoom.device().toFixed(1) < 1.20)) {
            $("#devices").addClass('inner_uni1');
            $("#devices").removeClass('inner_uni2');
            $("#devices").removeClass('inner_uni3');
            $("#devices").removeClass('inner_uni4');
        }
        else if ((window.detectZoom.device().toFixed(1) >= 1.20) && (window.detectZoom.device().toFixed(1) < 1.30)) {
            $("#devices").addClass('inner_uni2');
            $("#devices").removeClass('inner_uni1');
            $("#devices").removeClass('inner_uni3');
            $("#devices").removeClass('inner_uni4');
        }
        else if ((window.detectZoom.device().toFixed(1) >= 1.30) && (window.detectZoom.device().toFixed(1) < 1.50)) {
            $("#devices").addClass('inner_uni3');
            $("#devices").removeClass('inner_uni1');
            $("#devices").removeClass('inner_uni2');
            $("#devices").removeClass('inner_uni4');
        }
        else if ((window.detectZoom.device().toFixed(1) >= 1.50) && (window.detectZoom.device().toFixed(1) < 1.70)) {
            $("#devices").addClass('inner_uni4');
            $("#devices").removeClass('inner_uni1');
            $("#devices").removeClass('inner_uni2');
            $("#devices").removeClass('inner_uni3');
        }
        else {
            $("#devices").removeClass('inner_uni1');
            $("#devices").removeClass('inner_uni2');
            $("#devices").removeClass('inner_uni3');
            $("#devices").removeClass('inner_uni4');
        }

    }
    $(document).ready(function () {

        refresh();
        $(window).on('resize', refresh);
    });


 

    function toggleChevron(e) {
        $(e.target)
            .prev('.panel-heading')
            .find("i.indicator")
            .toggleClass('glyphicon glyphicon glyphicon-minus glyphicon glyphicon glyphicon-plus');
    }
    $('#accordion').on('hidden.bs.collapse', toggleChevron);
    $('#accordion').on('shown.bs.collapse', toggleChevron);

</script>
<style type="text/css">

   
    .icon-cal {
        float: left;
        margin: 7px 0px 0px -28px;
    }
    .icon-cal-1{
        float: left;
        margin: 7px 0px 0px -28px;
    }
    @media (min-width:1400px) and (max-width:3200px) {
        #Step3 {
                margin-bottom: -4px;
            }
    }

        .errorbox {
            height:auto !important;
        }
    .div_Steps {
        font-size: 13px;
        width: 100%;
        float: left;
        background: #fff;
    }
         .ajax__calendar_month {
            height: 44px;
            width: 35px !important;
        }
        .ajax__calendar_body {
               margin-left: -5px !important;
        }
         .move_in_pro {
             float: left;
            margin-right: 15px;
            padding-top: 5px;
            width: 15px;
            white-space: nowrap;
            position: relative;
            top: -21px;
            left: 27px;
        }

        

         @media (min-width: 320px) and (max-width:640px)   {
            .logo {
                text-align:right !important;
                margin-right:0 !important;
            }
            .logo img {
                max-width:100%;
                }

            .service_text p {
                font-size:12px !important;
            }
          
        }
        @media (min-width: 320px) and (max-width:480px) {
              #nofile {
                   float: left;
                    margin-top: 5px;
                    width: 100%;
            }
              .move_in_pro {
                  white-space: normal;
                  width: 100%;
              }
            }

   

        .divHide {
            display: none;
        }

        .service_fill_box input[type="text"], .service_fill_box input[type="password"], .service_fill_box select {
            width: 94%!important;
            margin-bottom:5px;
        }

        @media only screen and (min-width:768px) and (max-width:991px) {
            .reason_select select {
                width: 75% !important;
            }
             .col-sm-8 .move_in_pro {
            top: -1px;
            white-space: normal;
            width: 100%;
         }

         .col-sm-6 #txt_Comments{
             width:95% !important;
         }
        }

        .w2ui-tag .w2ui-tag-body.w2ui-tag-body {
            left: -238px !important;
              bottom: 8px !important;
              top: inherit;
        }
        .w2ui-tag .w2ui-tag-body:before {
                border-left: 5px solid transparent !important;
    border-top: 5px solid rgba(60,60,60,.82) !important;
    border-right: 5px solid transparent !important;
    margin: 2px 0px 0 15px !important;
      bottom: -10px !important;
        }

        #errorMsg {
            float: right;
            position: absolute;
            top: 8px;
            right: 0px;
            background: rgba(60,60,60,.82);
            color: white;
            padding: 3px 8px;
            box-shadow: 0px 1px 3px #ccc;
            display: none;
        }
        #r #errorMsg  {
             top: -33px;
        }
        #r1 #errorMsg  {               
                right: -102%;
        }
        /*#5471-start*/
        .ajax__calendar .ajax__calendar_container {
            margin-left: 0px !important;
            margin-top: 0px !important;
        }
        /*#5471-end*/

        .without_sidebar {
            height: 86%;
        }

        
             .inner_uni1 {
            height: 87% !important;
        }

            .inner_uni1 .setting_save_box .connect_email_box {
                margin-top: 19px !important;
                padding-top: 5px !important;
            }

        .inner_uni2 {
            height: 86% !important;
        }

            .inner_uni2 .setting_save_box {
                padding-top: 12px !important;
            }

                .inner_uni2 .setting_save_box .connect_email_box {
                    margin-top: 19px !important;
                    padding-top: 5px !important;
                }

        .inner_uni3 {
            height: 85% !important;
        }

            .inner_uni3 .setting_save_box {
                padding-top: 4px !important;
            }

                .inner_uni3 .setting_save_box .connect_email_box {
                    margin-top: 10px !important;
                    padding-top: 5px !important;
                }

        .inner_uni4 {
            height: 83% !important;
        }

            .inner_uni4 .setting_save_box .connect_email_box {
                margin-top: 5px !important;
                padding-top: 5px !important;
            }
           @media (max-width:767px) {
             .move_in_pro {
                 position: static;
            }
        }

              .header-top, header {
                position: relative;
    z-index: 999999999;
        }

                 .errorbox {
  border: 1px solid #ffa8a8!important;
  background-color: #fff4eb!important;
  height: 34px;
}

        @media (min-width: 1520px) and (max-width:3640px) {
          
            .without_sidebar {
                    height: 93% !important;
            }
            .setting_save_box {
                 padding-top: 25px;
            }
        }
        .service_fill_box > p {
            font-weight:normal;
        }
    @media (min-width: 1200px) and (max-width:1366px) {
        .inner_mid_section {
            height: 79%;
            margin-top: 15px;
        }
    }
    .start_service {
        margin-bottom: 5px;
        float: left;
        width: 100%;
    }
    .all_service_step
    {
        float:left;
        width:100%;
        /*font-family:Calibri;*/
    }
    .service_text p {
        min-height: 39px;
        line-height: 26px;  
        /*font-size:14px;*/
        font-weight:bold;
    }

        /*-- Start Breadcrumb Css --*/
        .breadcrumb_new {
    padding: 0px;
	background: #8c8c8c;
	list-style: none; 
	overflow: hidden;
    margin-top: 0px;
}
.breadcrumb_new>li+li:before {
	padding: 0;
}
.breadcrumb_new li { 
	float: left; 
}
.breadcrumb_new li.active a {
	background: brown;                   /* fallback color */
	background: #026699 ; 
    outline:none !important;
}
.breadcrumb_new li.completed a {
	/*background: brown;*/                   /* fallback color */
	background: #026699; 
}
.breadcrumb_new li.active a:after {
	border-left: 30px solid #026699 ;
}
.breadcrumb_new li.completed a:after {
	border-left: 30px solid #026699;
} 

.breadcrumb_new li a {
	color: white;
	text-decoration: none; 
	padding: 10px 0 10px 45px;
	position: relative; 
	display: block;
	float: left;
}
.breadcrumb_new li a:after { 
	content: " "; 
	display: block; 
	width: 0; 
	height: 0;
	border-top: 50px solid transparent;           /* Go big on the size, and let overflow hide */
	border-bottom: 50px solid transparent;
	border-left: 30px solid #8c8c8c;
	position: absolute;
	top: 50%;
	margin-top: -50px; 
	left: 100%;
	z-index: 2; 
}	
.breadcrumb_new li a:before { 
	content: " "; 
	display: block; 
	width: 0; 
	height: 0;
	border-top: 50px solid transparent;           /* Go big on the size, and let overflow hide */
	border-bottom: 50px solid transparent;
	border-left: 30px solid white;
	position: absolute;
	top: 50%;
	margin-top: -50px; 
	margin-left: 1px;
	left: 100%;
	z-index: 1; 
}	
.breadcrumb_new li:first-child a {
	padding-left: 15px;
}
.breadcrumb_new li a:hover { background: #026699  ; }
.breadcrumb_new li a:hover:after { border-left-color: #026699   !important; }
.breadcrumb_new li b {
        padding-right: 10px;
    font-size: 16px;
}

.repeat table {
 width: 30%;
 margin-left: 10px;
}

.repeat table td {
 width: 20%;
}

.repeat table td label {
    display: inline-block;
    font-weight: normal;
    margin-bottom: 5px;
    padding-left: 6px;
}

/*-- End Breadcrumb Css--*/
#Button1 {
    float: right;}


.service_fill_box input[type="text"], .service_fill_box input[type="password"], .service_fill_box select, input[readonly] {
    
    padding: 8px 0 7px 6px;
}
.inner_mid_section select {
        padding: 7px 0 6px;        
        float:left;
}

@media (min-width:1500px) and (max-width:3500px) {
    .service_text p {
        height:auto;
    }
}

.panel-default {
        float: left;
    width: 100%;
    border-color: #d4d4d4 -moz-use-text-color !important;
    border-style: solid none  !important;
    border-width: 1px 0 !important;
}
.panel-title > a {
    display:block;
    text-decoration:none !important;
}
.panel-heading, .panel-group .panel {
    border-radius:0px !important; 
}
.panel-default > .panel-heading{
    background:#ececec;
    color:#005a84;
    font-size:14px;
}

.hide_title_inner {
    display:none;
}

label {
    font-weight:normal;
}
.indicator  {
        padding: 4px 8px;
    background: #005a84;
    color: #fff;
    font-size: 9px;
    margin-top: -1px;
}
.inner-mid-container > h1 {
    margin-bottom:0px;
}
.all_service_step h4.panel-title {
    margin: 0 0 8px 0;
       padding: 10px 15px 10px 13px;
    background-color: #f4f4f4;
    color: #53565a;
    display: block;
    float: left;
    width: 100%;
    font-size: 16px;
    font-weight: normal;
    /*font-family: calibri;*/
}
#Step4 .service_fill_box > p > input[readonly], #Step4 .service_fill_box > p > select[readonly]
{
    background-color:#f1f1f1 !important;
    pointer-events:none;
}
.start_service span {
    font-size: 13px;
}
.all_service_step {
    float: left;
    width: 100%;
    /*font-family: Calibri;*/
    font-weight: bold;
}
.service_fill_box label {
    font-weight: normal !important;
    font-size: 13px;
}

.service_fill_box p {
    font-weight:normal;
}
/*#Step5 .start_service span {

    font-weight: bold;
}*/
    </style>



<uc1:AccountLengthUserControl runat="server" ID="AccountLengthUserControl" />
<asp:HiddenField ID="hdnFlag" Value="load" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdn" Value="" runat="server" />
<asp:HiddenField ID="hdfCurrentDate" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnMoveDate" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnHolidayLst" runat="server" ClientIDMode="Static" />
<input type="hidden" class="activeli_list" value="service" />
<span globalize="ML_SERVICE_Navigation_Title" id="titletext" style="display: none"></span>



<!-- section starts -->

<%--Start, Stop Moving Service--%>
<div class="row start_stop_wrapper" style="display: block;">

    <div class="all_service_step" id="DivSteps">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="secServiceTitle hide_title_inner">
               <%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_StartService") %>
            </div>
            


              <h4 class="panel-title"><%=CustomerPortal.Translator.T("ML_Msg_YourInformation") %>
                </h4>

            <div id="Step1" class="div_Steps">
                <div class="start_service">


                    <div style="padding-top: 7px; padding-bottom: 2px;">

                        <span style="padding-left: 14px;"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_EntrAccntInfo") %></span>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="row" style="margin-left: -30px;">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text" style="display:none">
                                    <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_FirstName") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box" style="display:none">
                                    <p>
                                        <asp:TextBox globalize="ML_SrvcRqust_txtbx_FirstName" ClientIDMode="Static" ID="txtFirstName" placeholder="First Name" ValidateMessage="Please enter first name" runat="server" CssClass="Text reset" title="First Name" Text="" MaxLength="30" TabIndex="1" onkeypress="return IsAlpha(event);" mandatory="0"></asp:TextBox>
                                        <%--  <input type="text" placeholder"First Name" />--%>
                                    </p>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                <%--    <p class="schedule_date lang_space_fix"><%=CustomerPortal.Translator.T("ML_MakeOTP_txt_EmailId") %></p>--%>
                                     <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_CustomerRegistration_Txt_LastName") %></p>

                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <%--  <input type="text" placeholder"Last Name" />--%>
                                         <asp:TextBox ID="txtLastNameMovIn" runat="server" Style="color: Black;" mandatory="1" title="Last Name" ClientIDMode="Static"
                                                        onkeypress="return IsAlpha(event);" globalize="ML_CustomerRegistration_Txt_LastName" TabIndex="1" placeholder="Last Name" MaxLength="30"  ></asp:TextBox>
                                      <%--  <asp:TextBox CssClass="reset" placeholder="Email ID" globalize="ML_SrvcRqust_txtbx_emailAdd" ID="txtAltEmailId" ValidateMessage="Please enter email id" runat="server" title="Email Address" value="" MaxLength="50" ClientIDMode="Static" TabIndex="9" mandatory="1"></asp:TextBox>--%>

                                    </p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_DOB") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <asp:TextBox ID="TxtDateOfBirth" runat="server" globalize="ML_SrvcRqust_lbl_DOB" ReadOnly="true" title="Date Of Birth" placeholder="MM/DD/YYYY" TabIndex="8" ValidateMessage="Please enter Date of Birth" class="box" ClientIDMode="Static" MaxLength="10" onkeypress="return IsNumeric(event);" mandatory="1" />
                                                    <asp:ImageButton CssClass="icon-cal" ID="BtnDateOfBirth" runat="server" ImageUrl="~/images/Icon-calendar.png" />
                                        <ajaxToolkit:CalendarExtender ID="Cal_DOB" runat="server" TargetControlID="TxtDateOfBirth" ClientIDMode="Static" PopupButtonID="BtnDateOfBirth"
                                            Format="MM/dd/yyyy" PopupPosition="BottomRight" />
                                        <%--  <input type="text" placeholder"Last Name" />--%>
                                    </p>
                                </div>


                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_CustomerRistration_AlternateNum") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <asp:TextBox ID="txtAlternatNum"  runat="server" globalize="ML_CustomerRistration_AlternateNum" ValidateMessage="Please enter Alternate phone" tooltip="Alternate Number" title="Alternate Number" placeholder="Alternate Number" TabIndex="8" class="box" ClientIDMode="Static" MaxLength="14" onblur="javascript:validPhone(this.value,'txtAlternatNum');" Style="width: 95%;" />
                                        <%-- <input type="text" placeholder"Last Name" />--%>

                                        <span style="margin-left:0px;display:none">
                                            <input type="checkbox" id="IsMobileNo2" class="IsMobile" value="1" />
                                            <i class="lang_font_style" style="display: inline-block; font-style: normal; margin-top: 3px; vertical-align: top;"><%=CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_Contact") %></i></span>
                                    </p>
                                </div>


                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 service_text">
                                    <p class="schedule_date" style="font-weight:normal;"><b><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_IsAnyAdlt") %></b></p>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 service_fill_box repeat">

                                    <%--  <select></select>--%>
                                    <asp:RadioButtonList ID="rdo_AdltLving" runat="server" ClientIDMode="Static" RepeatColumns="2">
                                      
                                    </asp:RadioButtonList>

                                </div>

                                <div class="clearfix"></div>

                            </div>
                            <%--Start, Stop Moving Service Right--%>

                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                     <p class="schedule_date lang_space_fix"><%=CustomerPortal.Translator.T("ML_MakeOTP_txt_EmailId") %></p>
                                   
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                         <asp:TextBox CssClass="reset" placeholder="Email ID" globalize="ML_SrvcRqust_txtbx_emailAdd" ID="txtAltEmailId" ValidateMessage="Please enter email id" runat="server" title="Email Address" value="" MaxLength="50" ClientIDMode="Static" TabIndex="9" mandatory="1"></asp:TextBox>
                                    </p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text" style="display:none">
                                    <p class="schedule_date" style="line-height:normal;"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_SSN") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box" style="display:none">
                                    <p>
                                        <asp:TextBox ClientIDMode="Static" globalize="ML_SrvcRqust_lbl_SSN" CssClass="reset" ID="TxtSclSecrityNo" ValidateMessage="Please enter Social Security Number" placeholder="XXX-XX-XXXX" InputType="SSN" mandatory="1" runat="server" title="SSN" Text="" MaxLength="11" TabIndex="4" onkeypress="javascript:return(IsNumeric(event))"></asp:TextBox>
                                      
                                    </p>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_MobileNum") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <asp:TextBox  ValidateMessage="Please enter Contact Phone" globalize="ML_CustomerRegistration_Lbl_MobileNum" tooltip="Contact Phone" ID="txtPrimaryPhone" mandatory="1" placeholder="Primary Phone" runat="server" class="box" value="" MaxLength="14" TabIndex="7" ClientIDMode="Static" onblur="javascript:validPhone(this.value,'txtPrimaryPhone');" Style="width: 95%;"></asp:TextBox>
                                       

                                        <span style="margin-left: 0px; line-height: 26px;display:none">
                                            <input type="checkbox" id="IsMobileNo1" value="1" class="IsMobile" />
                                            <i class="lang_font_style" style="display: inline-block; font-style: normal; margin-top: 3px; vertical-align: top;"><%=CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_Contact") %></i></span>

                                    </p>
                                </div>



                            </div>


                            <div class="clearfix"></div>


                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                <div class="div_isanyadlt">
                                    <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text" style="display:none">
                                        <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_FirstName") %></p>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box" style="display:none">
                                        <p>
                                            <asp:TextBox ClientIDMode="Static" globalize="ML_SrvcRqust_txtbx_FirstName" ValidateMessage="Please enter first name" ID="TxtFirstName1" placeholder="First Name" runat="server" CssClass="Text reset" title="First Name" Text="" MaxLength="30" TabIndex="1" onkeypress="return IsAlpha(event);"></asp:TextBox>
                                         
                                        </p>
                                    </div>


                                    
                                    <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                        <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_CustomerRegistration_Txt_LastName") %></p>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                        <p>
                                            <asp:TextBox ClientIDMode="Static" globalize="ML_CustomerRegistration_Txt_LastName" ValidateMessage="Please enter Customer Name" ID="TxtLastName1" placeholder="Customer Name" runat="server" CssClass="Text reset" title="Customer Name" Text="" MaxLength="30" TabIndex="1" onkeypress="return IsAlpha(event);"></asp:TextBox>
                                         
                                        </p>
                                    </div>
                                    
                                    <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                        <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_DOB") %></p>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                        <p>
                                            <asp:TextBox ID="txtDOB" runat="server" globalize="ML_SrvcRqust_lbl_DOB" title="Date Of Birth" placeholder="DD/MM/YYYY" TabIndex="8" class="box" ClientIDMode="Static" MaxLength="10" onkeypress="return IsNumeric(event);" />
                                            <asp:ImageButton CssClass="icon-cal-1" ID="ImageButton1" runat="server" ImageUrl="~/images/Icon-calendar.png" />
                                            <ajaxToolkit:CalendarExtender ID="Cal_DOBM" runat="server" TargetControlID="txtDOB" ClientIDMode="Static"
                                                Format="MM/dd/yyyy" PopupPosition="BottomRight" PopupButtonID="ImageButton1" />
                                          
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="div_isanyadlt">

                                    <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                        <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_Msg_Relationship") %></p>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                        <p>
                                            <asp:DropDownList ID="ddl_Relation" ClientIDMode="Static" runat="server" CssClass="reset">
                                                <asp:ListItem Text="--Select--" Value=" "></asp:ListItem>
                                                <asp:ListItem Text="Spouse" Value="0"></asp:ListItem>
                                                <asp:ListItem Text="Child" Value="1"></asp:ListItem>
                                                <asp:ListItem Text="Guardian" Value="2"></asp:ListItem>
                                                <asp:ListItem Text="Parent" Value="3"></asp:ListItem>
                                                <asp:ListItem Text="Roommate" Value="4"></asp:ListItem>
                                            </asp:DropDownList>
                                          
                                        </p>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text" style="display:none">
                                        <p class="schedule_date" style="line-height:normal;"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_SSN") %></p>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box" style="display:none">
                                        <p>
                                            <asp:TextBox ClientIDMode="Static" ID="txtSSN" CssClass="reset" placeholder="XXX-XX-XXXX" globalize="ML_SrvcRqust_lbl_SSN" ValidateMessage="Please enter Social Security Number" InputType="SSN" runat="server" title="SSN" Text="" MaxLength="11" TabIndex="4" onkeypress="javascript:return(IsNumeric(event))"></asp:TextBox>
                                       
                                        </p>
                                    </div>
                                </div>

                            </div>



                        </div>


                    </div>

                    <!-- End Step1 service -->
                </div>
                </div>


                <h4 class="panel-title"><%=CustomerPortal.Translator.T("ML_Msg_CurrentAddres") %>
                </h4>
            <div id="Step2" class="div_Steps">

                <!-- Start Step2 service -->


                <div class="start_service">
                    <div style="padding-top: 7px; padding-bottom: 2px;">
                        <span style="padding-left: 14px;"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_EntrCntcAddrss") %></span>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="row" style="margin-left: -30px;">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_CustomerRegistration_Txt_StreetNumber") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <asp:TextBox ID="txtStreetNo" CssClass="reset" runat="server" mandatory="1" ValidateMessage="Please enter Street No." globalize="ML_CustomerRegistration_Txt_StreetNumber" title="Street No." placeholder="" class="box" ClientIDMode="Static" MaxLength="5" />
                                        <%--<input type="text" placeholder"First Name" />--%>
                                    </p>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date" globalize="ML_Service_li_Type"><%=CustomerPortal.Translator.T("ML_Service_li_Type") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <asp:DropDownList ID="ddl_AddresType" ClientIDMode="Static" runat="server" mandatory="1" globalize="ML_Service_li_Type" CssClass="reset">
                                           
                                        </asp:DropDownList>

                                    </p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_City") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <asp:TextBox ClientIDMode="Static" ID="txtCity" mandatory="1" CssClass="reset" ValidateMessage="Please enter city" runat="server" ToolTip="City" globalize="ML_SrvcRqust_txtbx_City" title="City" placeholder="" class="box" MaxLength="35" onkeypress="return IsAlpha(event);" />
                                       
                                    </p>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_ZipCode1") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                     
                                        <asp:TextBox ClientIDMode="Static" ID="txtZip" InputType="ZipCode" ValidateMessage="Please enter Zipcode" mandatory="1" CssClass="ZipCode reset" runat="server" globalize="ML_SrvcRqust_txtbx_ZipCode1" title="Zip Code" placeholder="" class="box" MaxLength="5" onkeypress="return IsNumeric(event);" />
                                        <uc1:ZipCode runat="server" class="box" title="Zip Code" ID="ZipCode" ClientIDMode="Static" />
                                    </p>
                                </div>




                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 service_text hide_move_in_next">
                                    <p class="schedule_date" style="font-weight: bold;"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_isAdrssServed") %><span class="required" style="color: #950202; padding-left: 3px; font-size: 19px;">*</span> </p>


                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 service_fill_box hide_move_in_next">
                                    <p style="margin-left: 0px; margin-top: 0px;">
                                        <input id="rdoSrvDkeyes" type="radio" name="Served" value="1" />
                                        <label style="font-weight: normal;"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_isAdrssServedYes") %></label>
                                    </p>

                                    <div class="div_AccntNo" style="display: none; background: #ececec; clear: both; float: left; padding: 0 0 11px; width: 100%;">
                                        <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p><%=CustomerPortal.Translator.T("ML_OTP_txt_AcctNo") %></p>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                            <p>
                                                <asp:TextBox ID="txtAccntNo" CssClass="reset" runat="server" ValidateMessage="Please enter Account No." globalize="ML_OTP_txt_AcctNo" title="Account Number" placeholder="" InputType="UA" class="box" ClientIDMode="Static" MaxLength="10" />
                                                <ajaxToolkit:FilteredTextBoxExtender ID="FtbtxtUserId" runat="server" TargetControlID="txtAccntNo" FilterType="UppercaseLetters,Numbers"></ajaxToolkit:FilteredTextBoxExtender>
                                                <%-- <input type="text" placeholder"Last Name" />--%>
                                            </p>
                                        </div>
                                    </div>
                                    <p style="margin-left: 0px; margin-top: 0px;">
                                        <input id="rdoSrvDkeNo" type="radio" name="Served" value="0" />
                                        <label style="font-weight: normal; width: 57%;"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_isAdrssServedNo") %></label>
                                    </p>
                                </div>







                            </div>
                            <%--Start, Stop Moving Service Right--%>

                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_StreetN") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <asp:TextBox ID="txtStreetName" mandatory="1" ValidateMessage="Please enter Street name" runat="server" globalize="ML_SrvcRqust_txtbx_SName7" title="Street Name" placeholder="" CssClass="reset" class="box" ClientIDMode="Static" MaxLength="35" />
                                        <ajaxToolkit:FilteredTextBoxExtender ID="FilteredTextBoxExtender1" runat="server" TargetControlID="txtStreetName" ValidChars=" " FilterType="UppercaseLetters,Numbers,LowercaseLetters,Custom"></ajaxToolkit:FilteredTextBoxExtender>
                                       
                                    </p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Apt") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <asp:TextBox ID="TxtFlrType" CssClass="reset" runat="server" ValidateMessage="Please enter Floor Type" globalize="ML_CONNECTME_Lbl_Apt" title="Apt./Floor/Suite" placeholder="" TabIndex="8" class="box" ClientIDMode="Static" MaxLength="5"  />
                                    
                                    </p>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_State") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        
                                        <asp:DropDownList ID="txtState2" ClientIDMode="Static" runat="server" mandatory="1" globalize="ML_SrvcRqust_txtbx_Static"  CssClass="reset">
                                       
                                        </asp:DropDownList>
                                 
                                    </p>
                                </div>


                            </div>



                        </div>
                    </div>
                </div>
            </div>

            <!-- End Step2 service -->


                <h4 class="panel-title"><%=CustomerPortal.Translator.T("ML_SrvcRqust_div_Where") %></h4>

            <div id="Step3" class="div_Steps">

                <!-- Start Step3 service -->
                <div class="start_service">
                    <div style="padding-top: 7px; padding-bottom: 2px;">
                        <span style="padding-left: 14px;"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_EntrSerAddre") %></span>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="row" style="margin-left: -30px;">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date lang_space_fix"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_StrtDate") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <asp:TextBox ID="txtScheduleDate" CssClass="reset" runat="server" mandatory="1" ReadOnly="true" title="Schedule Date" globalize="ML_SrvcRqust_txtbx_Date" ClientIDMode="Static" placeholder="Date"></asp:TextBox>
                                         <asp:ImageButton CssClass="icon-cal" ID="btnSchDate" runat="server" ImageUrl="~/images/Icon-calendar.png" />
                                        <ajaxToolkit:CalendarExtender ID="Cal_DateScheduleDate" runat="server" TargetControlID="txtScheduleDate" ClientIDMode="Static" PopupButtonID="btnSchDate"
                                            Format="MM/dd/yy" OnClientDateSelectionChanged="checkForPreviousDate" PopupPosition="BottomRight" />
                                       
                                               <span globalize="ML_SrvcRqust_Req"> <%= CustomerPortal.Translator.T("ML_SrvcRqust_Req") %></span>
                                    </p>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_StreetN") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <asp:TextBox ID="txtStreetName3" mandatory="1" CssClass="reset" runat="server" globalize="ML_SrvcRqust_txtbx_SName7" ValidateMessage="Please enter Street Name" title="Street Name" placeholder="" class="box" ClientIDMode="Static" MaxLength="35" />
                                        <ajaxToolkit:FilteredTextBoxExtender ID="FilteredTextBoxExtender2" runat="server" TargetControlID="txtStreetName3" ValidChars=" " FilterType="UppercaseLetters,Numbers,LowercaseLetters,Custom"></ajaxToolkit:FilteredTextBoxExtender>
                                     
                                    </p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Apt") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <asp:TextBox ID="txtAptFlr" runat="server" globalize="ML_SrvcRqust_lbl_Floor" ValidateMessage="Please enter Floor Type" title="Apt./Floor/Suite" placeholder="" CssClass="reset" class="box" ClientIDMode="Static" MaxLength="5" />

                                    </p>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_State") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                               
                                        <asp:DropDownList ID="txtState" ClientIDMode="Static" runat="server" mandatory="1" globalize="ML_SrvcRqust_txtbx_Static" ValidateMessage="Please select State" CssClass="reset">
                                            <asp:ListItem Text="--Select--" Value=""></asp:ListItem>
                                            <asp:ListItem Text="Florida" Value="FO"></asp:ListItem>
                                            <asp:ListItem Text="Indiana" Value="IA"></asp:ListItem>
                                            <asp:ListItem Text="Kentucky" Value="KT"></asp:ListItem>
                                            <asp:ListItem Text="North Carolina" Value="NC"></asp:ListItem>
                                            <asp:ListItem Text="South Carolina" Value="SC"></asp:ListItem>
                                            <asp:ListItem Text="Ohio" Value="OH"></asp:ListItem>
                                        </asp:DropDownList>
                                       
                                    </p>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 service_text">
                                    <p class="schedule_date" style="font-weight:normal;"><b><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_OwnOrRent") %></b></p>

                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 service_fill_box">
                                    <p style="padding: 0; margin-top: 17px; line-height: 22px;">
                                        <span>
                                            <input type="radio" name="rdo_mode" value="0" clientidmode="Static" />
                                            <i style="display: inline-block; font-style: normal; margin-left: 4px; margin-top: 0; vertical-align: top;"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_Own") %></i></span>
                                        <span style="margin-left: 10px;">
                                            <input type="radio" name="rdo_mode" value="1" />
                                            <i style="display: inline-block; font-style: normal; margin-left: 4px; margin-top: 0; vertical-align: top;"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_Rent") %></i></span>
                                    </p>

                                </div>



                            </div>
                            <%--Start, Stop Moving Service Right--%>

                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_CustomerRegistration_Txt_StreetNumber") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <asp:TextBox ID="txtStreetNo3" mandatory="1" CssClass="reset" runat="server" globalize="ML_CustomerRegistration_Txt_StreetNumber" ValidateMessage="Please enter Street No." title="Street No." placeholder="" class="box" ClientIDMode="Static" MaxLength="5" />
                                        <%--  <input type="text" placeholder"Last Name" />--%>
                                    </p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date" globalize="ML_Service_li_Type"><%=CustomerPortal.Translator.T("ML_Service_li_Type") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <asp:DropDownList ID="ddl_AddressType2" ClientIDMode="Static" runat="server" mandatory="1" CssClass="reset" globalize="ML_Service_li_Type">
                                      
                                        </asp:DropDownList>
                                      
                                    </p>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"> <%=CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_City") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <asp:TextBox ID="txtCity3" mandatory="1" runat="server" ValidateMessage="Please enter city" globalize="ML_SrvcRqust_txtbx_City" title="City" placeholder="" CssClass="reset" class="box" ClientIDMode="Static" MaxLength="35" onkeypress="return IsAlpha(event);" />
                                  
                                    </p>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_ZipCode1") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <asp:TextBox ID="txtZip3" InputType="ZipCode" mandatory="1" ValidateMessage="Please enter zipcode" runat="server" CssClass="isvalidzip ZipCode reset" globalize="ML_SrvcRqust_txtbx_ZipCode1" title="Zip Code" placeholder="" class="box" ClientIDMode="Static" MaxLength="5" onkeypress="return IsNumeric(event);" />
                                     
                                        <uc1:ZipCode runat="server" class="box" title="Zip Code" ID="ZipCode1" ClientIDMode="Static" />
                                       
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- End Step3 service -->
  

                <h4 class="panel-title"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_BillAddr") %></h4>
            <div id="Step4" class="div_Steps">

                <!-- Start Step4 service -->
                <div class="start_service">
                    <div style="padding-bottom: 2px;">
                        <p style="padding: 5px 0 5px 14px;height: auto; font-size: 14px;">
                            <input type="checkbox" style="padding-right: 10px;line-height:normal !important;height:auto !important;" id="chk_billingAddress" />
                            <b style="display: inline-block; margin-left: 5px; margin-top: -1px; vertical-align: top;"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_SameNewAddr") %></b></p>
                        <span style="padding-left: 14px;"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_BillSnt") %></span>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="row" style="margin-left: -30px;">

                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 service_text">
                                <span>
                                    <p class="schedule_date" style="margin-left: 15px;font-weight:normal;">
                                        <input type="radio" clientidmode="Static" name="rdo_typeAddr" value="0" style="margin-right: 5px; margin-top: 5px; line-height: normal !important; height: auto !important; vertical-align: top;" />
                                    <%=CustomerPortal.Translator.T("ML_Msg_StreetAddress") %></span><span style="margin-left: 20px;">
                                        <input type="radio" name="rdo_typeAddr" value="1" style="margin-right: 5px; height: auto !important; line-height: normal !important; margin-top: 5px; vertical-align: top;" />
                                   <%=CustomerPortal.Translator.T("ML_Msg_POBox") %></span></p>
                            </div>

                            <div class="div_step4">

                                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <div class="div_street">
                                        <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_CustomerRegistration_Txt_StreetNumber") %></p>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                            <p>
                                                <asp:TextBox ID="txtStreetBillNo" ValidateMessage="Please enter street no" mandatory="1" runat="server" globalize="ML_CustomerRegistration_Txt_StreetNumber" title="Street No." placeholder="" CssClass="reset" class="box" ClientIDMode="Static" MaxLength="5" />
                                                <%--   <input type="text" placeholder"Last Name" />--%>
                                            </p>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p class="schedule_date" globalize="ML_Service_li_Type"><%=CustomerPortal.Translator.T("ML_Service_li_Type") %></p>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                            <p>
                                                <asp:DropDownList ID="ddl_addrType1" ClientIDMode="Static" runat="server" globalize="ML_Service_li_Type" CssClass="reset">
                                                  
                                                </asp:DropDownList>
                                            </p>
                                        </div>
                                    </div>

                                    <div class="div_PO">
                                        <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_Msg_POBox") %> </p>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                            <p>
                                                <asp:TextBox ID="txtPOBox" runat="server" mandatory="1" globalize="ML_Msg_POBox" ValidateMessage="Please enter PO Box" title="P.O. Box" placeholder="" CssClass="reset" class="box" ClientIDMode="Static" MaxLength="5" onkeypress="return IsNumeric(event);" />
                                                
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                        <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_State") %></p>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                        <p>
                                          
                                            <asp:DropDownList ID="TxtState4" ClientIDMode="Static" runat="server" mandatory="1" globalize="ML_SrvcRqust_txtbx_Static" ValidateMessage="Please select State" CssClass="reset">
                                                <asp:ListItem Text="--Select--" Value=""></asp:ListItem>
                                            <asp:ListItem Text="Florida" Value="FO"></asp:ListItem>
                                            <asp:ListItem Text="Indiana" Value="IA"></asp:ListItem>
                                            <asp:ListItem Text="Kentucky" Value="KT"></asp:ListItem>
                                            <asp:ListItem Text="North Carolina" Value="NC"></asp:ListItem>
                                            <asp:ListItem Text="South Carolina" Value="SC"></asp:ListItem>
                                            <asp:ListItem Text="Ohio" Value="OH"></asp:ListItem>
                                            </asp:DropDownList>
                                        </p>
                                    </div>



                                </div>
                                <%--Start, Stop Moving Service Right--%>

                                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <div class="div_street">
                                        <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_StreetN") %></p>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                            <p>
                                                <asp:TextBox ID="txtStreetName4" runat="server" mandatory="1" CssClass="reset" title="Street Name" globalize="ML_SrvcRqust_txtbx_SName7" placeholder="" class="box" ClientIDMode="Static" MaxLength="35" />
                                                <ajaxToolkit:FilteredTextBoxExtender ID="FilteredTextBoxExtender3" runat="server" ValidChars=" " TargetControlID="txtStreetName4" FilterType="UppercaseLetters,Numbers,LowercaseLetters,Custom"></ajaxToolkit:FilteredTextBoxExtender>
                                               
                                            </p>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Apt") %></p>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                            <p>
                                                <asp:TextBox ID="txtAptFlr4" ValidateMessage="Please enter Apt./Floor/Suite" runat="server" globalize="ML_CONNECTME_Lbl_Apt" title="Apt./Floor/Suite" class="box" CssClass="reset" ClientIDMode="Static" MaxLength="5" />
                                               
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                        <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_City") %></p>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                        <p>
                                            <asp:TextBox ID="txtCity4" mandatory="1" runat="server" ValidateMessage="Please enter City" globalize="ML_SrvcRqust_txtbx_City" CssClass="reset" title="City" placeholder="" class="box" ClientIDMode="Static" MaxLength="35" onkeypress="return IsAplha(event);" />
                                            
                                        </p>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                        <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_ZipCode1") %></p>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                        <p>
                                            <asp:TextBox ID="txtZip4" InputType="ZipCode" mandatory="1" ValidateMessage="Please enter Zipcode" runat="server" globalize="ML_SrvcRqust_txtbx_ZipCode1" CssClass="ZipCode reset" title="Zip Code" placeholder="" class="box" ClientIDMode="Static" MaxLength="5" onkeypress="return IsNumeric(event);" />
                                            <uc1:ZipCode runat="server" class="box" title="Zip Code" ID="ZipCode2" ClientIDMode="Static" />
                                            
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- End Step4 service -->

   
                <h4 class="panel-title" id="Step5_title" style="display: none;"><%=CustomerPortal.Translator.T("ML_SrvcRqust_lbl_SecyDep") %></h4>

            <div id="Step5" class="div_Steps" style="display: none;">

                <!-- Start Step5 service -->
                <div class="start_service">
                    <div style="padding-top: 7px; padding-bottom: 2px;">
                        <span style="padding:0px 15px;display:block;"><%=CustomerPortal.Translator.TT_ProductName("ML_SrvcRqust_lbl_ChargeDesc") %></span>
                    </div>

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="row" style="margin-left: -30px;">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                   <p><label globalize="ML_MYACCOUNT_Lbl_PaymentMode" style="font-weight:bold !important;"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_PaymentMode") %> </label></p> 
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                
                                    <div id="divcreditrdobtn" runat="server" clientidmode="Static" style="float:left; width:50%;padding:12px 0px 0;">
                                            <asp:RadioButton ID="rdoCredit" runat="server" GroupName="grpAddNew" value="0" ClientIDMode="Static" Checked="true" />
                                            <label for="rdoCredit" style="color: #53565a;" globalize="ML_ACCOUNT_lbl_Card"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_Card") %></label>
                                        </div>
                                        <div id="divbankrdobtn" runat="server" clientidmode="Static" style="float:left; width:50%;padding:12px 0px 0;">
                                            <asp:RadioButton ID="rdoBank" runat="server" GroupName="grpAddNew" value="1" ClientIDMode="Static" />
                                            <label for="rdoBank" style="color: #53565a;" globalize="ML_ACCOUNT_lbl_BankAcount"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_BankAcount") %></label>
                                        </div>
                                       
                                       
                                </div>
                                </div>
                             <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                
                                        </p>
                                </div>
                                </div>
                            </div>
                        </div>

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="creditcard_box">
                        <div class="row" style="margin-left: -30px;">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"><%=CustomerPortal.Translator.T("ML_ACCOUNT_txt_CardNum") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                    <asp:TextBox ID="txtCardNo" ValidateMessage="Please enter valid card no" mandatory="1" runat="server" CssClass="reset"  globalize="ML_ACCOUNT_txt_CardNum" title="Card Number" placeholder="" class="box" ClientIDMode="Static" MaxLength="19" onkeypress="return IsNumeric(event);"  autocomplete="off"/>
                                        </p>
                                       <div class="popup_right_content_area_home" style="display: inline;">
                                     <asp:Image ID="ImgCard" runat="server" ImageUrl="images/credit_card_logos_11.png" Height="30px" Visible="true" CssClass="" ClientIDMode="Static" />
                                            <asp:Image ID="ImgVisa" runat="server" ImageUrl="images/visa.jpeg" Height="30px" ClientIDMode="Static" />
                                            <asp:Image ID="ImgMaster" runat="server" ImageUrl="images/mastercard.png" Height="30px" ClientIDMode="Static" />
                                            <asp:Image ID="ImgDiscov" runat="server" ImageUrl="images/discoverNew.jpg" Height="30px" ClientIDMode="Static" />
                                            <asp:Image ID="Imgamex" runat="server" ImageUrl="images/american.jpeg" Height="30px" ClientIDMode="Static" />
                                           </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p>
                                    <span globalize="ML_ACCOUNT_DDL_Month"><%= CustomerPortal.Translator.T("ML_ACCOUNT_DDL_Month") %></span>
                                        </p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                    <asp:DropDownList ID="ddlMonth" globalize="ML_ACCOUNT_DDL_Month" runat="server" title="Month" ClientIDMode="Static" mandatory="1" CssClass="reset"></asp:DropDownList>
                                    <%-- <input type="text" placeholder"Last Name" />--%>
                                        </p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text" Style="display: none">
                                    <p class="schedule_date">Amount No.</p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box" Style="display: none">
                                    <p>
                                    <asp:TextBox ID="txtAmt" ValidateMessage="Please enter Amount" Style="display: none"  runat="server" globalize="" title="Amount No." ReadOnly="true" Text="100" class="box" ClientIDMode="Static" MaxLength="5" onkeypress="return IsNumeric(event);" Width="50%" />
                                    <span style="display: none; float: left;">(in $) </span>
                                        </p>
                                </div>

                            </div>
                            <%--Start, Stop Moving Service Right--%>

                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date"><%= CustomerPortal.Translator.T("ML_SrvcRqust_lbl_SecyCode") %></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                        <asp:TextBox ID="txtSecurity" TextMode="Password" ValidateMessage="Please enter Security code" CssClass="reset" InpuType="CVV" mandatory="1" runat="server" globalize="ML_Msg_Billing_EnterValidSecurityCode" title="Security Code" placeholder="" class="box" ClientIDMode="Static" MaxLength="3" onkeypress="return IsNumeric(event);" AutoCompleteType="None" />
                                        <%-- <input type="text" placeholder"Last Name" />--%>
                                    </p>
                                     <div class="popup_right_content_area_home" style="display: block; visibility:hidden;height:40px;">
                                        </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p>
                                    <span globalize="ML_ACCOUNT_DDL_Year" style="margin-left: 0px;"><%= CustomerPortal.Translator.T("ML_ACCOUNT_DDL_Year") %></span>
                                        </p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                    <asp:DropDownList ID="ddlYear" globalize="ML_ACCOUNT_DDL_Year" title="Year" runat="server" ClientIDMode="Static" mandatory="1" CssClass="reset"></asp:DropDownList>
                                        </p>

                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 service_fill_box">
                                </div>

                            </div>
                        </div>
                    </div>

                     <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="bankaccount_box"  style="display: none">
                        <div class="row" style="margin-left: -30px;">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p>  <label globalize="ML_ACCOUNT_lbl_HolderName" style="line-height:16px;"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_HolderName") %></label></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                  <input type="text" id="txtAccountName" onkeypress="return IsAlpha(event);"  mandatory="1" title="Account Holder Name" placeholder="First Name" runat="server" clientidmode="Static" maxlength="60" globalize="ML_ACCOUNT_lbl_HolderName" />
                                        </p>
                                </div>
                             
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p><label globalize="ML_ACCOUNT_lbl_BAnkName"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_BAnkName") %> </label></p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                         <asp:TextBox ID="txtBankName" runat="server" ReadOnly="true" onkeypress="return IsAlpha(event);" mandatory="1"
                                        OnPaste="return false;" MaxLength="30" ClientIDMode="Static" title="Bank Name" globalize="ML_ACCOUNT_lbl_BAnkName"></asp:TextBox>
                                    </p>
                                </div>
                             

                            </div>
                            <%--Start, Stop Moving Service Right--%>

                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                   <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p>
                                   <label globalize="ML_ACCOUNT_lbl_Routing"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_Routing") %> </label>
                                        </p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                   <asp:TextBox ID="txtRoutingNmbr" runat="server" MaxLength="9" onkeypress="return IsNumeric(event);" mandatory="1" ClientIDMode="Static" ToolTip="Routing Number"
                                        OnPaste="return false;" title="Routing Number" globalize="ML_ACCOUNT_lbl_Routing"></asp:TextBox>
                                        </p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p>
                                    <label globalize="ML_ACCOUNT_lbl_BAnkAccount"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_BAnkAccount") %> </label>
                                        </p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>
                                   <asp:TextBox ID="txtBankAccNumber" runat="server" MaxLength="19" onkeypress="return IsNumeric(event);" mandatory="1"
                                        OnPaste="return false;" ClientIDMode="Static" title="Bank Account Number" globalize="ML_ACCOUNT_lbl_BAnkAccount"></asp:TextBox>
                                        </p>

                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 service_fill_box">
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Step5 service -->
            </div>


                <h4 class="panel-title" id="verifyHead"><%= CustomerPortal.Translator.T("ML_Msg_PleaseVerify") %></h4>

      
            <!-- End Step6 service -->
                        </div>

        </div>
    </div>







<!-- End Section -->

<asp:HiddenField ID="hdnCurrentDate" runat="server" Value="" ClientIDMode="Static" />
 <asp:HiddenField ID="hdnCardType" runat="server" Value="" ClientIDMode="Static" />
<span  id="IDMandatory" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_Mand") %></span>
<span  id="IDTimeBand" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_TimeBand") %></span>
<span  id="IDEnterText" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_PlEnter") %></span>
<span id="IDSelectText" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_PlSelect") %></span>
<span id="IDWeekday" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_Weekday") %></span>
<span  id="IDWorkingDay" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_WorkingDays") %></span>
<span  id="IDHoliday" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_Holiday") %></span>
<span  id="IDFutureDate" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_FutureDate") %></span>
<span  id="IDDateHoliday" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_DataHoliday") %></span>
<span  id="SentSuccess" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_Msg_SentSuccess") %></span>
<span  id="SentFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_Msg_SentFailed") %></span>
<span  id="FileSizeErr" style="display: none"><%= CustomerPortal.Translator.T("ML_ServiceRequest_Msg_AttSizeExceed") %></span>
<span  id="FileTypeErr" style="display: none"><%= CustomerPortal.Translator.T("ML_ServiceRequest_Msg_AttType") %></span>
<span  id="ML_Error_Msg_AlphabetOnly" style="display: none"><%= CustomerPortal.Translator.T("ML_SvngLdr_lstItem_Select") %></span>
<span  id="ML_ErrorLength_Msg_AccountNumber" style="display: none"><%= CustomerPortal.Translator.T("ML_ErrorLength_Msg_AccountNumber") %></span>
<span  id="lblNotSent" style="display: none"><%= CustomerPortal.Translator.T("ML_ServiceRequest_Msg_NotSubmit") %></span>

