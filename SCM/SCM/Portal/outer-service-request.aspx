<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="outer-service-request.aspx.cs" Inherits="CustomerPortal.outer_service_request" %>
<%@ Register Src="~/OuterHeader.ascx" TagPrefix="uc1" TagName="OuterHeader" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControls/AccountLengthUserControl.ascx" TagPrefix="uc1" TagName="AccountLengthUserControl" %>
<%@ Register Src="~/UserControls/ZipCode.ascx" TagPrefix="uc1" TagName="ZipCode" %>
<%@ Register Src="~/UserControls/Footer.ascx" TagPrefix="uc1" TagName="Footer" %>
<%@ Register Src="~/ServiceRequest.ascx" TagPrefix="uc1" TagName="ServiceRequest" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title><%= CustomerPortal.Translator.T("ML_PL_Lbl_ServiceRequest") %></title>  
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
     <!-- Message for disable javascript in Browser -->
<noscript>
    For full functionality of this site it is necessary to enable JavaScript. Here are the <a href="http://www.enable-javascript.com/" target="_blank">instructions how to enable JavaScript in your web browser</a>.
</noscript>
    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
    <link rel="stylesheet" href="include/jquery-ui-1.8.14.custom.css" type="text/css" />
    <link rel="stylesheet" href="include/jquery.ui.timepicker.css?v=0.3.1" type="text/css" />
    <link id="stylecss1" href="<%#string.Format("{1}/css/{0}","login-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />
    <link id="stylecss2" href="<%#string.Format("{1}/css/{0}","style-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />
    <link href="css/bootstrap.css" rel="stylesheet" />
    
    <script src="js/jquery-1.7.js"></script>
        <script type="text/javascript" src="js/detect-zoom.js"></script>
    <script type="text/javascript">
        toastr.error("Error");
        alert("Error");
         var k = jQuery.noConflict();
    </script>

    <script src="js/jquery-1.12.3.min.js"></script>
    <link rel="stylesheet" href="js/themes/base/jquery.ui.all.css" />
	<script src="js/ui/jquery.ui.core.js"></script>
    <script src="js/ui/jquery.ui.widget.js"></script>
    <script src="js/ui/jquery.ui.position.js"></script>
    <script src="js/ui/jquery.ui.autocomplete.js"></script>
    <script src="https://www.google.com/recaptcha/api.js" type="text/javascript"></script> 

    <script src="js/Translator.js"></script>
    <script type="text/javascript" src="include/jquery.ui.core.min.js"></script>
    <script type="text/javascript" src="include/jquery.ui.widget.min.js"></script>
    <script type="text/javascript" src="include/jquery.ui.tabs.min.js"></script>
    <script type="text/javascript" src="include/jquery.ui.position.min.js"></script>
    <script type="text/javascript" src="include/jquery.ui.timepicker.js?v=0.3.1"></script>
    <script type="text/javascript" src="js/jquery.plugin.js"></script>
    <script type="text/javascript" src="js/jquery.timeentry.js"></script>
    <link href="Toaster/toastr.css" rel="stylesheet" type="text/css"/>
    <script src="Toaster/toastr.js" type="text/javascript"></script>
    <script src="js/outer_service_request.js" type="text/javascript"></script>
    <link href="js/w2Ui/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="js/w2Ui/w2ui-1.4.2.min.js"></script>
    <script src="js/blockScreen.js" type="text/jscript"></script>
    <script src="js/AjaxFileUpload/ajaxfileupload.js" type="text/javascript"></script>
    <script src="js/Validate.js" type="text/javascript"></script>
    <script src="js/loader.js"></script>
    <script src="js/common.js"></script>
   
    <script src="js/jquery.mask.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            try {
               
                $('#btnRemoveFile').hide();             
                $("#txttime").val('09:00AM');
                $('#txtContact').mask('(000) 000-0000'); 
                $('#txtAlternatePhone').mask('(000) 000-0000'); 
                $('#txtHomePhone').mask('(000) 000-0000');
                $('#txtBusinessPhone').mask('(000) 000-0000'); 
                $('#txtMOHomePhone').mask('(000) 000-0000');
                $('#txtMOBusinessPhone').mask('(000) 000-0000'); 
                $('#txtTHomePhone').mask('(000) 000-0000'); 
                $('#txtTBusinessPhone').mask('(000) 000-0000');
            }
            catch (ex) {
                console.log(ex.message);
            }

            $("select").each(function () {
                var s = this;
                for (i = 0; i < s.length; i++) {
                    s.options[i].title = s.options[i].text;
                    
                }
                if (s.selectedIndex > -1)
                    s.onmousemove = function () {
                        s.title = s.options[s.selectedIndex].text;
                    };
            });
        });
     
        function Count(text, long) {
            var maxlength = new Number(long); // Change number to your max length.
            if (text.value.length > maxlength) {
                text.value = text.value.substring(0, maxlength);
              
               toastr.warning(" More than " + long + "Character not allowed")//more than 100/1000 character not allowed
            }
        }

        function File_OnChange(sender) {
            var filename = $(sender).val().replace(/^.*[\\\/]/, '');
            if (filename != "") {
                $("#nofile").html(filename);
                $('#btnRemoveFile').show();
            }
        }
        function removeFile() {
            $('#flupload').val('');
            var control = $("#flupload");
            control.replaceWith(control = control.clone(true));
            $('#btnRemoveFile').hide();
            //$("#nofile").html('No File Chosen');
            $("#nofile").html($("#SrvcRqust_i_NoFile").text());
            return false;
        }
    </script>

    <style type="text/css">
        .ajax__calendar_month, .ajax__calendar_year {
            height: 44px;
            width: 35px !important;
            line-height:10px;
        }
        .ajax__calendar_day {
                line-height: 15px;
               text-align:center !important;
               height:21px !important;
        }
        .ajax__calendar_body {
               margin-left: -5px !important;
        }
        .ajax__calendar_today.ajax__calendar_footer {
            padding-top: 0px  !important;
    position: relative  !important;
    top: -7px  !important;
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

        .service_fill_box input[type="text"] {
            width: 75%;
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

        .w2ui-tag .w2ui-tag-body {
            background-color: rgba(60,60,60,.82);
            display: inline-block;
            position: absolute;
            border-radius: 4px;
            padding: 4px 10px;
            margin-left: 21px !important;
            margin-top: 0;
            color: #fff !important;
            box-shadow: 1px 1px 3px #000;
            line-height: 100%;
            font-size: 11px;
            font-family: Verdana,Arial,sans-serif;
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
            height: 89%;
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
                    height: 91% !important;
            }
            .setting_save_box {
                 padding-top: 12px;
            }
        }
        .service_fill_box > p {
            font-weight:normal;
        }
        @media (min-width: 1200px) and (max-width:1366px) {
            .inner_mid_section {
                height: 81%;
                margin-top: 15px;
            }
        }
        .ajax__calendar_day.ajax__calendar_day {
            height:17px !important;
        }
        .ajax__calendar_dayname.ajax__calendar_dayname {
             height:23px !important;
        }

        .icon-cal{
                float: left;
    margin: -19px 0px 0px -28px !important;
        position: relative;
    top: -4px;
        }

         .icon-cal1{
               float: left;
             margin: -19px 0px 0px -28px;
        }
         .icon-calender{
             float: left;
             margin: 7px 0px 0px -28px !important;
         }
         /* For IE 9 IE 10 IE 11 */
@media screen and (min-width:0\0) {
  .icon-cal1 {
    float: left;
    margin: 4px 0 0 -28px !important;
}
  .icon-cal{
            float: left;
            margin: 4px 0px 0px -28px!important;
        }
  .icon-calender{
             float: left;
             margin: 5px 0px 0px -28px !important;
         }
  .service_fill_box_ie{
        margin-bottom:3px!important;
    }
    }


/* For IE 8 */
@media \0screen {
    .service_fill_box_ie{
        margin-bottom:3px!important;
    }
    .icon-cal1 {
    float: left;
    margin: 4px 0 0 -28px !important;
}
  .icon-cal{
            float: left;
            margin: 4px 0px 0px -28px!important;
        }
  .icon-calender{
             float: left;
             margin: 5px 0px 0px -28px !important;
         }
}
@-moz-document url-prefix() { 
   .icon-cal1 {
    float: left;
    margin: 4px 0 0 -28px !important;
}
 .icon-cal{
            float: left;
            margin: 4px 0px 0px -28px!important;
        }
 .icon-calender{
             float: left;
             margin: 5px 0px 0px -28px !important;
         }
}  
               .setting_save_box .buttons_area { 
    border-top: #d6d6d6 1px solid  !important;
    padding-top:10px !important
}
               .modal-content{ padding-bottom:0 !important}
    </style>
     <script type="text/javascript">
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
    </script>


</head>
<body>
    <form id="form1" runat="server">

        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <uc1:AccountLengthUserControl runat="server" ID="AccountLengthUserControl" />
        <asp:HiddenField ID="hdnFlag" Value="load" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdn" Value="" runat="server" />
        <asp:HiddenField ID="hdfCurrentDate" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnMoveDate" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnHolidayLst" runat="server" ClientIDMode="Static" />
        <input type="hidden" class="activeli_list" value="service" />
        <asp:HiddenField ID="hdnFileExtension" runat="server" ClientIDMode="Static" />
        <span globalize="ML_SERVICE_Navigation_Title" id="titletext" style="display: none"></span>

        <!-- Header starts -->
        <uc1:OuterHeader runat="server" ID="OuterHeader" />
        <!-- Header ends -->

        <!-- section starts -->
        <section class="inner_mid_section service_text" id="devices">
            <div class="container inner-mid-container">
                <div class="col-lg-12 energy_mid_box without_sidebar">
                    <h1 style="border-bottom: 2px solid #F4F4F4 !important; width: 100%;">
                        <img src="images/icon_service_sidebar.svg" style="padding-right: 5px; margin-top: -3px; float: left;" />
                        <span class="head_icon_flat icon_services"></span>
                        <span globalize="ML_SERVICE_Navigation_Title"><%= CustomerPortal.Translator.T("ML_SERVICE_Navigation_Title") %></span> </h1>
                    <span id="errorMsg" style="float: right;">ERROR</span>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="r">
                            <div class="col-lg-12">
                                <div class="row" style="margin-left: -30px;" id="r1">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p globalize="ML_Default_Lbl_Account"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Account") %></p>
                                        </div>
                                        <div id="divAccountNumber" class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                            <p>
                                                <asp:TextBox ID="txtAccountNo" runat="server" MaxLength="20" Style="color: Black;" globalize="ML_SrvcRqust_lbl_Accnt" placeholder="Service Account Number"
                                                    ClientIDMode="Static"  title="Service Account Number"></asp:TextBox>

                                            </p>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text" style="margin-bottom: 12px;">
                                            <p globalize="ML_SrvcRqust_Date"><%= CustomerPortal.Translator.T("ML_SrvcRqust_Date") %></p>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                            <p>
                                                <asp:Label ID="lblDate" runat="server" globalize="ML_SrvcRqust_lbl_Date" ></asp:Label>
                                            </p>
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p globalize="ML_SrvcRqust_ddl_Reason"><%= CustomerPortal.Translator.T("ML_SrvcRqust_ddl_Reason") %></p>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                            <p class="reason_select">
                                                <asp:DropDownList ID="ddl_Reason" runat="server" mandatory="1"  ToolTip="Reason"
                                                 globalize="ML_SrvcRqust_ddl_Reason"   Style="width: 95%; margin: 0px;" ClientIDMode="Static">
                                                </asp:DropDownList>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            
                                <div class="row" style="margin-left: -30px;" id="r2">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div id="TableService1">
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_SERVICE_Lbl_ScheduleDate"><%= CustomerPortal.Translator.T("ML_SERVICE_Lbl_ScheduleDate") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtDate" runat="server" title="Schedule Date" ReadOnly="true" globalize="ML_SrvcRqust_txtbx_Date" ClientIDMode="Static" placeholder="Schedule Date"></asp:TextBox>
                                                    <ajaxToolkit:CalendarExtender ID="Cal_Date" runat="server" TargetControlID="txtDate"
                                                        Format="MM/dd/yy" OnClientDateSelectionChanged="checkForPreviousDate" PopupPosition="BottomRight" />
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text" style="display:none">
                                                <p globalize="ML_SrvcRqust_txtbx_FirstName"><%= CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_FirstName") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box" style="display:none;">
                                                <p>
                                                    <asp:TextBox ID="txtName" runat="server" Style="color: Black;" mandatory="1" title="First Name" ClientIDMode="Static"
                                                        onkeypress="return IsAlpha(event);" globalize="ML_SrvcRqust_txtbx_FirstName" placeholder="First Name" MaxLength="30"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p globalize="ML_CustomerRegistration_Txt_LastName"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Txt_LastName") %></p>                                                
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtLastName" runat="server" Style="color: Black;" mandatory="1" title="Last Name" ClientIDMode="Static"
                                                        onkeypress="return IsAlpha(event);" globalize="ML_CustomerRegistration_Txt_LastName" placeholder="Last Name" MaxLength="30"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p globalize="ML_CustomerRegistration_Lbl_MobileNum"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_MobileNum") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtContact" runat="server" MaxLength="14" Style="color: Black;" globalize="ML_MYACCOUNT_Txt_PrimaryPhone" placeholder="Primary Phone"
                                                        ClientIDMode="Static" mandatory="1" title="Primary Phone"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="clearfix"></div>
                                            <%-- Bug 6351- Start --%>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p globalize="ML_CustomerRistration_AlternateNum"><%= CustomerPortal.Translator.T("ML_CustomerRistration_AlternateNum") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                
                                                    <asp:TextBox ID="txtAlternatePhone" runat="server" MaxLength="14" Style="color: Black;" globalize="ML_SrvcRqust_txtbx_BP" placeholder="Alternate Phone"
                                                        ClientIDMode="Static" title="Alternate Phone"  onblur="javascript:validPhone(this.value,'txtAlternatePhone');"></asp:TextBox>
                                                </p>
                                            </div>
                                            <%-- Bug 6351- End --%>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div id="TableService2">
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p globalize="ML_SrvcRqust_p_ST"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_ST") %></p>
                                            </div>
                                            <div class="col-lg-5 col-md-6 col-sm-6 col-xs-5 service_fill_box">
                                                <p class="schedule_time">
                                                    <asp:DropDownList ID="ddlHours" runat="server" ClientIDMode="Static">
                                                        <asp:ListItem Text="1" Value="1" globalize="ML_SrvcRqust_LItem_1"></asp:ListItem>
                                                        <asp:ListItem Text="2" Value="2" globalize="ML_SrvcRqust_LItem_2"></asp:ListItem>
                                                        <asp:ListItem Text="3" Value="3" globalize="ML_SrvcRqust_LItem_3"></asp:ListItem>
                                                        <asp:ListItem Text="4" Value="4" globalize="ML_SrvcRqust_LItem_4"></asp:ListItem>
                                                        <asp:ListItem Text="5" Value="5" globalize="ML_SrvcRqust_LItem_5"></asp:ListItem>
                                                        <asp:ListItem Text="6" Value="6" globalize="ML_SrvcRqust_LItem_6"></asp:ListItem>
                                                        <asp:ListItem Text="7" Value="7" globalize="ML_SrvcRqust_LItem_7"></asp:ListItem>
                                                        <asp:ListItem Text="8" Value="8" globalize="ML_SrvcRqust_LItem_8"></asp:ListItem>
                                                        <asp:ListItem Text="9" Value="9" globalize="ML_SrvcRqust_LItem_9"></asp:ListItem>
                                                        <asp:ListItem Text="10" Value="10" globalize="ML_SrvcRqust_LItem_10"></asp:ListItem>
                                                        <asp:ListItem Text="11" Value="11" globalize="ML_SrvcRqust_LItem_11"></asp:ListItem>
                                                        <asp:ListItem Text="12" Value="12" globalize="ML_SrvcRqust_LItem_12"></asp:ListItem>
                                                    </asp:DropDownList>
                                                    <asp:DropDownList ID="ddlMin" runat="server" ClientIDMode="Static">
                                                        <asp:ListItem Text="00" Value="00" globalize="ML_SrvcRqust_LItem_00"></asp:ListItem>
                                                        <asp:ListItem Text="15" Value="15" globalize="ML_SrvcRqust_LItem_15"></asp:ListItem>
                                                        <asp:ListItem Text="30" Value="30" globalize="ML_SrvcRqust_LItem_30"></asp:ListItem>
                                                        <asp:ListItem Text="45" Value="45" globalize="ML_SrvcRqust_LItem_45"></asp:ListItem>
                                                    </asp:DropDownList>
                                                    <asp:DropDownList ID="ddlAmpm" runat="server" ClientIDMode="Static">
                                                        <asp:ListItem Text="AM" Value="AM" globalize="ML_SrvcRqust_LItem_AM"></asp:ListItem>
                                                        <asp:ListItem Text="PM" Value="PM" Selected="True" globalize="ML_SrvcRqust_LItem_PM"></asp:ListItem>
                                                    </asp:DropDownList>
                                                </p>
                                            </div>



                                            <%--<div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p globalize="ML_SrvcRqust_txtbx_MiddleName"><%= CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_MiddleName") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtMiddleName" runat="server" MaxLength="30" Style="color: Black;" title="Middle Name" ClientIDMode="Static"
                                                        onkeypress="return IsAlpha(event);" globalize="ML_SrvcRqust_txtbx_MiddleName" placeholder="Middle Name"></asp:TextBox>
                                                </p>
                                            </div>--%>


                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p globalize="ML_SERVICE_Lbl_Pets"><%= CustomerPortal.Translator.T("ML_SERVICE_Lbl_Pets") %></p>
                                            </div>
                                            <div class="col-lg-5 col-md-6 col-sm-7 col-xs-5 service_fill_box">
                                                <p>
                                                    <asp:CheckBox ID="chk_Pets" runat="server" globalize="ML_SrvcRqust_chkbx_Pets" ClientIDMode="Static" />
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6  service_text">
                                                <p globalize="ML_SERVICE_Lbl_LockedGates"><%= CustomerPortal.Translator.T("ML_SERVICE_Lbl_LockedGates") %></p>
                                            </div>
                                            <div class="col-lg-5 col-md-6 col-sm-7 col-xs-5 service_fill_box">
                                                <p>
                                                    <asp:CheckBox ID="chk_Locked_gates" runat="server" globalize="ML_SrvcRqust_chkbx_LG" ClientIDMode="Static" />
                                                </p>
                                            </div>
                                         
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <%--MOVE IN LEFT SIDE CONTENT--%>
                            <div id="divMoveInLhs" class="divHide">
                                 <uc1:ServiceRequest runat="server" ID="ServiceRequest" />
                            </div>
                            <div id="divMoveInLhs1" class="divHide">
                               
                                <div class="secServiceTitle" globalize="ML_SrvcRqust_div_Where">
                                    <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_Where") %>
                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="row" style="margin-left: -30px;">
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_SrvcRqust_p_SN"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_SN") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtStreetNo" runat="server" MaxLength="5" ClientIDMode="Static" ToolTip="Street Number" globalize="ML_SrvcRqust_txtbx_SN" onkeypress="return IsNumeric(event);" mandatory="1"  onpaste="return false" autocomplete="off"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_CONNECTME_Lbl_Apt"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Apt") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtUnitNo" runat="server" MaxLength="5" ClientIDMode="Static" ToolTip="Apt/Unit#" globalize="ML_SrvcRqust_txtbx_UnitNo" placeholder="Apt/Unit#"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_SrvcRqust_p_State"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_State") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtState" runat="server" MaxLength="35" ClientIDMode="Static" ToolTip="State" mandatory="1" onkeypress="return IsAlpha(event);" globalize="ML_SrvcRqust_txtbx_Static" placeholder="State"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_SrvcRqust_p_WhrMove"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_WhrMove") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtDateOfMoving" runat="server" ClientIDMode="Static" ToolTip="When are you moving in?"
                                                        mandatory="1" ReadOnly="true" globalize="ML_SrvcRqust_txtbx_MDate" placeholder="Moving Date"></asp:TextBox>
                                                      <asp:ImageButton CssClass="icon-cal" ID="btnDate" runat="server" ImageUrl="~/images/Icon-calendar.png" />
                                                    <ajaxToolkit:CalendarExtender ID="Cal_DateOfMoving" runat="server" TargetControlID="txtDateOfMoving"
                                                        Format="MM/dd/yy" OnClientDateSelectionChanged="checkForMoveDate" PopupPosition="BottomRight" />
                                                      
                                                </p>
                                                 <div globalize="ML_SrvcRqust_div_BD"  class="move_in_pro">
                                                <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_BD") %>
                                            </div>
                                            </div>
                                           
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <%--MOVE IN RIGHT SIDE CONTENT--%>
                                            <div id="divMoveInRhs" class="divHide">
                                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                    <p class="schedule_date" globalize="ML_SrvcRqust_p_StrretName"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_StrretName") %></p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                    <p>
                                                        <asp:TextBox ID="txtStreetName" runat="server" MaxLength="35" globalize="ML_SrvcRqust_txtbx_SName7" ClientIDMode="Static" ToolTip="Street Name"
                                                            mandatory="1" placeholder="Street Name" onkeypress="return IsAlpha(event);"></asp:TextBox>
                                                    </p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                    <p class="schedule_date" globalize="ML_Register_Lbl_City"><%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %></p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                    <p>
                                                        <asp:TextBox ID="txtCity" runat="server" MaxLength="35" ClientIDMode="Static" ToolTip="City" mandatory="1"
                                                            onkeypress="return IsAlpha(event);" globalize="ML_SrvcRqust_txtbx_City5" placeholder="City"></asp:TextBox>
                                                    </p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                    <p class="schedule_date" globalize="ML_SrvcRqust_P_ZipCode"><%= CustomerPortal.Translator.T("ML_SrvcRqust_P_ZipCode") %></p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                    <p>
                                                        <asp:TextBox ID="txtZipCode" CssClass="ZipCode" runat="server" ClientIDMode="Static" ToolTip="Zip Code" globalize="ML_SrvcRqust_txtbx_ZipCode1"
                                                            mandatory="1" TextMode="SingleLine" class="box" value="" size="30" MaxLength="5" onkeypress="return IsNumeric(event);" placeholder="Zip Code"></asp:TextBox>
                                                        <uc1:ZipCode runat="server" ID="ZipCode" />
                                                         </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <%--MOVE IN CONTACT INFO--%>
                                <div class="secServiceTitle" globalize="ML_SrvcRqust_div_ContactInfo">
                                   <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_ContactInfo") %>
                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="row" style="margin-left: -30px;" id="divContactInfo">
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_CustomerRegistration_Lbl_MobileNum"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_MobileNum") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <%--<asp:TextBox ID="txtHomePhone" runat="server" ClientIDMode="Static" ToolTip="Primary Phone" globalize="ML_MYACCOUNT_Txt_PrimaryPhone"
                                                        MaxLength="12" mandatory="1" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" placeholder="Primary Phone"></asp:TextBox>--%>
                                                    <asp:TextBox ID="txtHomePhone" runat="server" ClientIDMode="Static" ToolTip="Primary Phone" globalize="ML_MYACCOUNT_Txt_PrimaryPhone"
                                                        MaxLength="14" mandatory="1" placeholder="Primary Phone"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_Register_Lbl_EmailId"><%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtEmailAddress" runat="server" ClientIDMode="Static" ToolTip="Email"
                                                        mandatory="1" value="" MaxLength="50" globalize="ML_SrvcRqust_txtbx_emailAdd" placeholder="Email"></asp:TextBox>
                                                </p>
                                            </div>
                                        </div>
                                        <%--MOVE IN CONTACT INFO--%>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_CustomerRistration_AlternateNum"><%= CustomerPortal.Translator.T("ML_CustomerRistration_AlternateNum") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>                                                    
                                                    <asp:TextBox ID="txtBusinessPhone" runat="server" ClientIDMode="Static" ToolTip="Alternative Phone"
                                                        MaxLength="14" globalize="ML_SrvcRqust_txtbx_BP" placeholder="Alternate Phone" onblur="javascript:validPhone(this.value,'txtBusinessPhone');">
                                                    </asp:TextBox>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <%--MOVE IN MAILING INFO--%>
                                <div class="secServiceTitle" globalize="ML_SrvcRqust_div_MailAdd">
                                    <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_MailAdd") %>
                                </div>
                                <div style="padding-top:7px; padding-bottom:2px;">
                                    <asp:CheckBox ID="chkMoveIn" runat="server"  ClientIDMode="Static"  style="position: relative;left: 9px;top:2px; margin:2px 7px 0;"/>
                                     <span globalize="ML_SrvcRqust_chkbx_SAMA"> <%= CustomerPortal.Translator.T("ML_SrvcRqust_chkbx_SAMA") %></span>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="row" style="margin-left: -30px;">
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_SrvcRqust_p_SNO"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_SNO") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtMStreetNo" runat="server" MaxLength="5" ClientIDMode="Static" ToolTip="Street Number" onpaste="return false" autocomplete="off"
                                                        mandatory="1" onkeypress="return IsNumeric(event);" CssClass="mailing" placeholder="Street Number" globalize="ML_SrvcRqust_txtbx_SNO"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_CONNECTME_Lbl_Apt"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Apt") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtMUnitNo" runat="server" MaxLength="5" ClientIDMode="Static" ToolTip="Unit No" placeholder="Apt/Unit#"
                                                        CssClass="mailing" globalize="ML_SrvcRqust_txtbx_UnitN"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_SrvcRqust_p_State"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_State") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtMState" runat="server" MaxLength="35" ClientIDMode="Static" ToolTip="State"
                                                        mandatory="1" CssClass="mailing" onkeypress="return IsAlpha(event);" placeholder="State" globalize="ML_SrvcRqust_txtbx_MState"></asp:TextBox>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <%--MOVE IN MAILING ADDRESS--%>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_SrvcRqust_p_StrretName"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_StrretName") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtMStreetName" runat="server" MaxLength="35" ClientIDMode="Static" ToolTip="Street Name"
                                                        mandatory="1" CssClass="mailing" globalize="ML_SrvcRqust_txtbx_SName7" placeholder="Street Name" onkeypress="return IsAlpha(event);"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_Register_Lbl_City"><%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtMCity" runat="server" MaxLength="35" ClientIDMode="Static" ToolTip="City" mandatory="1"
                                                        CssClass="mailing" onkeypress="return IsAlpha(event);" globalize="ML_SrvcRqust_txtbx_City5" placeholder="City"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_SrvcRqust_P_ZipCode"><%= CustomerPortal.Translator.T("ML_SrvcRqust_P_ZipCode") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtMZipCode" CssClass="ZipCode" runat="server" ClientIDMode="Static" ToolTip="Zip Code" globalize="ML_SrvcRqust_txtbx_ZipCode1"
                                                        mandatory="1" TextMode="SingleLine" class="box" value="" size="30" MaxLength="5" onkeypress="return IsNumeric(event);"  placeholder="Zip Code"></asp:TextBox>
                                                <uc1:ZipCode runat="server" ID="ZipCode1" />
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <%--MOVE OUT LEFT SIDE CONTENT--%>
                            <div id="divMoveOutLhs" class="divHide">
                                <div class="secServiceTitle" globalize="ML_SrvcRqust_div_When">
                                   <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_When") %>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 service_text">
                                    <p class="schedule_date" globalize="ML_SrvcRqust_p_WenOut"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_WenOut") %></p>
                                </div>
                                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12 service_fill_box" style="padding-left: 5px;">
                                    <p>
                                        <asp:TextBox ID="txtMODateofmoving" runat="server" ClientIDMode="Static" ToolTip="When?"
                                            mandatory="1" ReadOnly="true" globalize="ML_SrvcRqust_txtbx_When" placeholder="Moving Out Time" Style="width:27.4%!important;"></asp:TextBox>
                                        <asp:ImageButton CssClass="icon-cal icon-calender" ID="btnMODate" runat="server" ImageUrl="~/images/Icon-calendar.png" />
                                        <ajaxToolkit:CalendarExtender ID="Cal_MODateofmoving" runat="server" TargetControlID="txtMODateofmoving" PopupButtonID="btnMODate"
                                            Format="MM/dd/yy" OnClientDateSelectionChanged="checkForMoveDate" PopupPosition="BottomRight" />
                                        <span globalize="ML_SrvcRqust_Req"> <%= CustomerPortal.Translator.T("ML_SrvcRqust_Req") %></span>
                                    </p>
                                </div>
                                <%--MOVE OUT CONTACT INFO--%>
                                <div class="secServiceTitle" globalize="ML_SrvcRqust_div_ContactInfo">
                                  <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_ContactInfo") %>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="row" style="margin-left: -30px;">
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_CustomerRegistration_Lbl_MobileNum"> <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_MobileNum") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtMOBusinessPhone" runat="server" ClientIDMode="Static" ToolTip="Primary Phone" placeholder="Primary Phone" globalize="ML_MYACCOUNT_Txt_PrimaryPhone"
                                                        MaxLength="14" mandatory="1" onblur="javascript:validPhone(this.value,'txtMOBusinessPhone');"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_Register_Lbl_EmailId"> <%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtMOEmailAddress" runat="server" ClientIDMode="Static" ToolTip="Email" placeholder="Email"
                                                        value="" MaxLength="50" mandatory="1" globalize="ML_SrvcRqust_txtbx_emailAdd"></asp:TextBox>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <%--MOVE OUT CONTACT INFO--%>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_CustomerRistration_AlternateNum"><%= CustomerPortal.Translator.T("ML_CustomerRistration_AlternateNum") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>                                                   
                                                    <asp:TextBox ID="txtMOHomePhone" runat="server" ClientIDMode="Static" ToolTip="Alternative Phone" placeholder="Alternative Phone"
                                                        MaxLength="14" globalize="ML_SrvcRqust_txtbx_AltPhn" onblur="javascript:validPhone(this.value,'txtMOHomePhone');"></asp:TextBox>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <%--MOVE OUT MAILING INFO--%>
                                <div class="secServiceTitle" globalize="ML_SrvcRqust_div_MailAdd">
                                   <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_MailAdd") %>
                                </div>
                                
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="row" style="margin-left: -30px;">
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_CustomerRegistration_Txt_StreetNumber"> <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Txt_StreetNumber") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtMOStreetNo" runat="server" MaxLength="5" ClientIDMode="Static" ToolTip="Street Number" placeholder="Street Number" onpaste="return false" autocomplete="off"
                                                        mandatory="1" globalize="ML_CustomerRegistration_Txt_StreetNumber"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_CONNECTME_Lbl_Apt"> <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Apt") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtMOUnitNo" runat="server" MaxLength="5" globalize="ML_SrvcRqust_txtbx_MOUnit" ClientIDMode="Static" placeholder="Apt/Unit#" ToolTip="Apt/Unit#"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_SrvcRqust_p_State"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_State") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <%--<asp:TextBox ID="txtMOState" runat="server" MaxLength="35" ClientIDMode="Static" ToolTip="State" globalize="ML_SrvcRqust_txtbx_State2"
                                                        mandatory="1" onkeypress="return IsAlpha(event);" placeholder="State"></asp:TextBox>--%>

                                                    <asp:DropDownList ID="txtMOState" ClientIDMode="Static" runat="server" mandatory="1" globalize="ML_SrvcRqust_txtbx_State2"  CssClass="reset">
                                       
                                                    </asp:DropDownList>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <%--MOVE OUT RIGHT SIDE CONTENT--%>
                                            <div id="divMoveOutRhs" class="divHide">

                                                <%--MOVE OUT MAILING ADDRESS--%>
                                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                    <p class="schedule_date" globalize="ML_SrvcRqust_p_StrretName"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_StrretName") %></p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                    <p>
                                                        <asp:TextBox ID="txtMOStreetName" runat="server" MaxLength="35" ClientIDMode="Static" ToolTip="Street Name"
                                                            mandatory="1" globalize="ML_SrvcRqust_txtbx_SName7" onkeypress="return IsAlpha(event);"></asp:TextBox>
                                                    </p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                    <p class="schedule_date" globalize="ML_Register_Lbl_City"><%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %></p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                    <p>
                                                        <asp:TextBox ID="txtMOCity" runat="server" MaxLength="35" globalize="ML_SrvcRqust_txtbx_City5" placeholder="City" ClientIDMode="Static" ToolTip="City" mandatory="1" onkeypress="return IsAlpha(event);"></asp:TextBox>
                                                    </p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                    <p class="schedule_date" globalize="ML_SrvcRqust_P_ZipCode"><%= CustomerPortal.Translator.T("ML_SrvcRqust_P_ZipCode") %></p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                    <p>
                                                        <asp:TextBox ID="txtMOZipCode" CssClass="ZipCode" runat="server" ClientIDMode="Static" placeholder="Zip Code" ToolTip="Zip Code" globalize="ML_SrvcRqust_txtbx_ZipCode1"
                                                            mandatory="1" TextMode="SingleLine" class="box" value="" size="30" MaxLength="5" onkeypress="return IsNumeric(event);"></asp:TextBox>
                                                    <uc1:ZipCode runat="server" ID="ZipCode2" />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <%--SERVICE TRANSFER LEFT SIDE CONTENT--%>
                            <div id="divServiceLhs" class="divHide">
                                <div class="secServiceTitle" globalize="ML_SrvcRqust_div_When">
                                        <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_When") %>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date" globalize="ML_SrvcRqust_p_WenOut"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_WenOut") %></p>
                                </div>
                                <div class="col-lg-9 col-md-9 col-sm-8 col-xs-6 service_fill_box" style="padding-left:5px;">
                                    <p>
                                        <asp:TextBox ID="txtTODateOfMoving" runat="server" ClientIDMode="Static" ToolTip="When are you moving out?"
                                            mandatory="1" ReadOnly="true" globalize="ML_SrvcRqust_txtbx_MOut" placeholder="Moving Out Time" Style="width:27.4%!important;"></asp:TextBox>
                                         <asp:ImageButton CssClass="icon-cal icon-calender" ID="btnMOOUT" runat="server" ImageUrl="~/images/Icon-calendar.png" />
                                        <ajaxToolkit:CalendarExtender ID="Cal_TODateOfMoving" runat="server" TargetControlID="txtTODateOfMoving" PopupButtonID="btnMOOUT"
                                            Format="MM/dd/yy" OnClientDateSelectionChanged="checkForMoveDate" PopupPosition="BottomRight" />
                                        <span globalize="ML_SrvcRqust_Req"><%= CustomerPortal.Translator.T("ML_SrvcRqust_Req") %></span>
                                    </p>
                                </div>
                                <%--SERVICE TRANSFER WHERE--%>
                                <div class="secServiceTitle" globalize="ML_SrvcRqust_div_Where">
                                    <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_Where") %>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="row" style="margin-left: -30px;">
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_CustomerRegistration_Txt_StreetNumber">     <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Txt_StreetNumber") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtTStreetNo" runat="server" MaxLength="5" ClientIDMode="Static" ToolTip="Street Number" onpaste="return false" autocomplete="off"
                                                        mandatory="1"  globalize="ML_CustomerRegistration_Txt_StreetNumber"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_SrvcRqust_p_StrretName">  <%= CustomerPortal.Translator.T("ML_SrvcRqust_p_StrretName") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtTStreetName" runat="server" MaxLength="35" ClientIDMode="Static" ToolTip="Street Name"
                                                        mandatory="1" globalize="ML_SrvcRqust_txtbx_SName7"  onkeypress="return IsAlpha(event);"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_Register_Lbl_City"> <%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtTCity" runat="server" MaxLength="35" globalize="ML_SrvcRqust_txtbx_City5" placeholder="City" ClientIDMode="Static" ToolTip="City" mandatory="1" onkeypress="return IsAlpha(event);"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_SrvcRqust_P_ZipCode"><%= CustomerPortal.Translator.T("ML_SrvcRqust_P_ZipCode") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtTZipCode" CssClass="ZipCode" runat="server" ClientIDMode="Static" ToolTip="Zip Code" placeholder="Zip Code"
                                                        mandatory="1" TextMode="SingleLine" class="box" globalize="ML_SrvcRqust_txtbx_ZipCode1" value="" size="30" MaxLength="5" onkeypress="return IsNumeric(event);"></asp:TextBox>
                                                <uc1:ZipCode runat="server" ID="ZipCode3" />
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text" style="display:none;">
                                                <p class="schedule_date" globalize="ML_SrvcRqust_p_Mod"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_Mod") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box" style="display:none;">
                                                <p>
                                                    <asp:TextBox ID="txtTMod" runat="server" MaxLength="150" ClientIDMode="Static" ToolTip="Mod" globalize="ML_SrvcRqust_txtbx_Mod" placeholder="Mod"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text" >
                                                <p class="schedule_date" globalize="ML_CONNECTME_Lbl_Apt"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Apt") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtTUnitNo" runat="server" MaxLength="5" ClientIDMode="Static" ToolTip="Apt/Unit#" globalize="ML_SrvcRqust_txtbx_UN2" placeholder="Apt/Unit#"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_SrvcRqust_p_State"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_State") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                  <%--  <asp:TextBox ID="txtTState" runat="server" MaxLength="35" ClientIDMode="Static" ToolTip="State" placeholder="State"
                                                        mandatory="1" onkeypress="return IsAlpha(event);" globalize="ML_SrvcRqust_txtbx_State6"></asp:TextBox>--%>
                                                    <asp:DropDownList ID="txtTState" ClientIDMode="Static" runat="server" mandatory="1" globalize="ML_SrvcRqust_txtbx_Static"  CssClass="reset">
                                       
                                                    </asp:DropDownList>

                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_SrvcRqust_p_WhrMove"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_WhrMove") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtTDateOfMoving" runat="server" ClientIDMode="Static" ToolTip="When are you moving in?"
                                                        mandatory="1" ReadOnly="true" globalize="ML_SrvcRqust_txtbx_DateOfMove" placeholder="Moving in Time"></asp:TextBox>
                                                       <asp:ImageButton CssClass="icon-cal1" ID="btnDateMO" runat="server" ImageUrl="~/images/Icon-calendar.png" />
                                                    <ajaxToolkit:CalendarExtender ID="Cal_TDateOfMoving" runat="server" TargetControlID="txtTDateOfMoving" PopupButtonID="btnDateMO"
                                                        Format="MM/dd/yy" OnClientDateSelectionChanged="checkForMoveDate" PopupPosition="BottomRight" />
                                                </p>
                                            </div>
                                            <div globalize="ML_SrvcRqust_div_nxtBD" style="float: left; margin-left: 15px; padding-top: 5px;">
                                               <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_nxtBD") %>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                                <%--SERVICE TRANSFER CONTACT INFO--%>
                                <div class="secServiceTitle" globalize="ML_SrvcRqust_div_ContactInfo">
                                    <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_ContactInfo") %>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="row" style="margin-left: -30px;">
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_CustomerRegistration_Lbl_MobileNum"> <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_MobileNum") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>                                                    
                                                    <asp:TextBox ID="txtTBusinessPhone" runat="server" ClientIDMode="Static" ToolTip="Primary Phone" placeholder="Primary Phone"
                                                        MaxLength="14" mandatory="1" globalize="ML_MYACCOUNT_Txt_PrimaryPhone" onblur="javascript:validPhone(this.value,'txtTBusinessPhone');"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_Register_Lbl_EmailId"> <%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtTEmailAddress" runat="server" ClientIDMode="Static" ToolTip="Email"
                                                        mandatory="1" value="" globalize="ML_SrvcRqust_txtbx_emailAdd" MaxLength="50" placeholder="Email"></asp:TextBox>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <%--SERVICE TRANSFER CONTACT--%>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_CustomerRistration_AlternateNum"><%= CustomerPortal.Translator.T("ML_CustomerRistration_AlternateNum") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>                                                   
                                                    <asp:TextBox ID="txtTHomePhone" runat="server" ClientIDMode="Static" ToolTip="Alternative Phone" placeholder="Alternative Phone"
                                                        MaxLength="14" globalize="ML_SrvcRqust_txtbx_BusinessPhn" onblur="javascript:validPhone(this.value,'txtTHomePhone');"></asp:TextBox>
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <%--SERVICE TRANSFER MAILING INFO--%>
                                <div class="secServiceTitle" globalize="ML_SrvcRqust_div_MailAdd">
                                   <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_MailAdd") %>
                                </div>
                                <div style="padding-top:7px; padding-bottom:2px;">
                                    <asp:CheckBox ID="autoFillAddress" runat="server"  ClientIDMode="Static" style="position: relative;left: 9px;top:2px; margin:2px 7px 0;"/>
                                      <span globalize="ML_SrvcRqust_chkbx_SAMA"><%= CustomerPortal.Translator.T("ML_SrvcRqust_chkbx_SAMA") %></span>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="row" style="margin-left: -30px;">
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_CustomerRegistration_Txt_StreetNumber"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Txt_StreetNumber") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtTMStreetNo" runat="server" MaxLength="5" ClientIDMode="Static" ToolTip="Street Number" 
                                                        mandatory="1" globalize="ML_CustomerRegistration_Txt_StreetNumber" CssClass="mailing"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_SrvcRqust_p_StrretName"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_StrretName") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtTMStreetName" runat="server" MaxLength="35" ClientIDMode="Static" ToolTip="Street Name"
                                                        mandatory="1" CssClass="mailing" globalize="ML_SrvcRqust_txtbx_SName7" placeholder="Street Name" onkeypress="return IsAlpha(event);"></asp:TextBox>
                                                </p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_Register_Lbl_City"><%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtTMCity" runat="server" MaxLength="35" ClientIDMode="Static" ToolTip="City" mandatory="1" placeholder="City"
                                                        CssClass="mailing" globalize="ML_SrvcRqust_txtbx_city7" onkeypress="return IsAlpha(event);"></asp:TextBox>
                                                </p>
                                            </div>
                                          
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <%--SERVICE TRANSFER RIGHT SIDE CONTENT--%>
                                            <div id="divServiceRhs" class="divHide">

                                                <%--SERVICE TRANSFER MAILING--%>
                                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text" style="display:none;">
                                                    <p class="schedule_date" globalize="ML_SrvcRqust_p_Mod"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_Mod") %></p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box" style="display:none;">
                                                    <p>
                                                        <asp:TextBox ID="txtTMMod" globalize="ML_SrvcRqust_txtbx_Mod3" MaxLength="150" runat="server" ClientIDMode="Static" ToolTip="Mod" CssClass="mailing" placeholder="Mod"></asp:TextBox>
                                                    </p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                    <p class="schedule_date" globalize="ML_CONNECTME_Lbl_Apt"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Apt") %></p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                    <p>
                                                        <asp:TextBox ID="txtTMUnitNo" runat="server" MaxLength="5" globalize="ML_SrvcRqust_txtbx_Uno" placeholder="Apt/Unit#" ClientIDMode="Static" ToolTip="Apt/Unit#"
                                                            CssClass="mailing"></asp:TextBox>
                                                    </p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                    <p class="schedule_date" globalize="ML_SrvcRqust_p_State"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_State") %></p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                    <p>
                                                       <%-- <asp:TextBox ID="txtTMState" runat="server" MaxLength="35" ClientIDMode="Static" ToolTip="State" placeholder="State"
                                                            mandatory="1" globalize="ML_SrvcRqust_txtbx_State9" CssClass="mailing" onkeypress="return IsAlpha(event);"></asp:TextBox>--%>
                                                          <asp:DropDownList ID="txtTMState" ClientIDMode="Static" runat="server" mandatory="1" globalize="ML_SrvcRqust_txtbx_Static"  CssClass="mailing">
                                       
                                                         </asp:DropDownList>

                                                    </p>
                                                </div>
                                                  <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_SrvcRqust_P_ZipCode"><%= CustomerPortal.Translator.T("ML_SrvcRqust_P_ZipCode") %></p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                <p>
                                                    <asp:TextBox ID="txtTMZipCode" CssClass="ZipCode" runat="server" ClientIDMode="Static" ToolTip="Zip Code" placeholder="Zip Code"
                                                        mandatory="1" globalize="ML_SrvcRqust_txtbx_ZipCode1" TextMode="SingleLine" class="box" value="" size="30" MaxLength="5" onkeypress="return IsNumeric(event);" ></asp:TextBox>
                                                <uc1:ZipCode runat="server" ID="ZipCode4" />
                                                </p>
                                            </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 service_right_boxs">
                            <div class="row"></div>
                        </div>
                    </div>
                    <hr class="divider_line hide_move_in" style="float: left; width: 100%; margin-top: -13px; margin-bottom: 10px;" />
                    <div class="row" id="div_Attachement">
                        <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5">
                            <p globalize="ML_CONNECTME_Lbl_AddAttach" style="padding-left: 15px;"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_AddAttach") %></p>
                        </div>
                        <div class="col-lg-9 col-md-9 col-sm-8  col-xs-7">
                            <p>
                                <span class="newbutton_outer file-input btn btn-primary btn-file ieBtn" globalize="ML_SrvcRqust_ChooseF"><%= CustomerPortal.Translator.T("ML_SrvcRqust_ChooseF") %>
                        <asp:FileUpload ID="flupload" runat="server" onchange="File_OnChange(this)" Style="width: 175px;" ClientIDMode="Static" />
                                </span><i id="nofile" globalize="ML_SrvcRqust_i_NoFile" style="margin-left: 10px;"> <%= CustomerPortal.Translator.T("ML_SrvcRqust_i_NoFile") %></i><img id="btnRemoveFile" title="Remove" src="images/notification_icon/Payment_DeleteIcon.png"
                                    onclick="return removeFile();" />
                            </p>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-4">
                            <p globalize="ML_SERVICE_Lbl_Comments" style="padding-left: 15px;"><%= CustomerPortal.Translator.T("ML_SERVICE_Lbl_Comments") %></p>
                        </div>
                        <div class="col-lg-9 col-md-9 col-sm-6">
                            <p style="font-weight:normal;" class="text_width_box">
                                <asp:TextBox ID="txt_Comments" runat="server" TextMode="MultiLine" title="Additional Comments" placeholder="Additional Comments" ClientIDMode="Static" globalize="ML_SrvcRqust_txtbx_Comment"
                                    onkeypress="return CountDescription(this, 500);" onChange="Count(this,500)" class="comment" Rows="7" Style="width: 89%;border-color: #d6d6d6;">

                                </asp:TextBox>
                            </p>
                            <p class="service_text1" globalize="ML_SrvcRqust_p_info" style="display: inline-block; margin-top: 0px;font-weight:normal;"><%= CustomerPortal.Translator.TT_ProductName("ML_SrvcRqust_p_info") %></p>
                        </div>
                           <div class="col-lg-3 col-md-3 col-sm-4 col-xs-6 service_text">
                                  <p class="schedule_date" style="padding-left: 15px;"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_Captcha") %></p>
                                </div>
                                <div class="col-lg-9 col-md-9 col-sm-6 col-xs-6 service_fill_box">
                                    
                                      
                                        <input type="hidden" class="hiddenRecaptcha required" name="hiddenRecaptcha" id="hiddenRecaptcha">
                                        <div class="g-recaptcha" data-sitekey="<%=System.Configuration.ConfigurationManager.AppSettings["RecaptchaKey"] %>"></div>
                                       
                                   
                                </div>
                    </div>


                </div>
                <div class="setting_save_box" id="divOther" style="display: table;">
                     <div class="buttons_area">
                    <input type="button" id="btnSaveChanges" class="submit-button" value='<%# CustomerPortal.Translator.T("ML_OTP_Btn_Submit") %>' globalize="ML_OTP_Btn_Submit"  />
                   <%-- <a href="default.aspx" id="btncancel" class="submit-button" style="margin-left: 13px; float:left;">Cancel</a>--%>
                </div></div>
                 <div id="divMoveIn" class="setting_save_box" style="display: none;">
                     <div class="buttons_area">
                   <%-- <input type="button" id="btnSaveChanges1" value="Submit"   />--%>
                      <%--   <a href="default.aspx" id="cancel" class="submit-button" style="margin-left: 13px; float:left;">Cancel</a>--%>
                      <%--    <asp:Button ID="btnSaveChanges1" runat="server" class="submit-button"  Text="Continue" globalize="ML_SERVICE_BTN_Submit" ClientIDMode="Static"/>--%>
                      <div id="disclaimer"  style="margin-bottom: 0px; padding-left: 22px;margin-left: 13px;     width: 75%;float:left; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ServiceDisclaimer) %>!important;">
                          <b><span globalize="ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer" style="color: red;"><%# CustomerPortal.Translator.T("ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer") %></span><span style="color: red;">:</span> </b>
                          <span globalize="ML_Service_Disclaimer" runat="server" style="color: black;"><%= CustomerPortal.Translator.TT_ProductName("ML_Service_Disclaimer") %></span>
                     </div> 
                               <asp:Button ID="BtnSumit" runat="server" class="submit-button"  Text='<%# CustomerPortal.Translator.T("ML_Billing_Txt_btnSubmit") %>'  ClientIDMode="Static" />                    
                       <%--   <asp:Button ID="BtnBack" runat="server" class="submit-button"  Text="Previous" globalize=""  ClientIDMode="Static"/>                 --%>    
                   
                     </div>
                    
                 </div>
                     
            </div>
            </div>
        </section>
        <!-- End Section -->
        <div id="page_loader">
        </div>
        <!-- Footer starts -->
        <uc1:Footer runat="server" ID="Footer" />
        <!-- Footer ends -->
         <!-- Modal HTML -->
       
          <span globalize="ML_SERVICES_Txt_ExceedLimit" id="IDfilesize" style="display: none"><%= CustomerPortal.Translator.T("ML_SERVICES_Txt_ExceedLimit") %></span>
<%--        <span globalize="ML_Connectme_ErrMsg_FileExt" id="IDfileExt" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_FileExt") %></span>--%>
        <span globalize="ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo" id="IDMandatory" style="display: none"><%= CustomerPortal.Translator.T("ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo") %></span>
        <span globalize="ML_service_request_ErrMsg_TimeBand" id="IDTimeBand" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_TimeBand") %></span>
        <span globalize="ML_service_request_ErrMsg_PlEnter" id="IDEnterText" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_PlEnter") %></span>
        <span globalize="ML_service_request_ErrMsg_PlSelect" id="IDSelectText" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_PlSelect") %></span>
        <span globalize="ML_service_request_ErrMsg_Weekday" id="IDWeekday" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_Weekday") %></span>
        <span globalize="ML_service_request_ErrMsg_WorkingDays" id="IDWorkingDay" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_WorkingDays") %></span>
        <span globalize="ML_service_request_ErrMsg_Holiday" id="IDHoliday" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_Holiday") %></span>
        <span globalize="ML_service_request_ErrMsg_FutureDate" id="IDFutureDate" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_FutureDate") %></span>
        <span globalize="ML_service_request_ErrMsg_DataHoliday" id="IDDateHoliday" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_ErrMsg_DataHoliday") %></span>
        <span globalize="ML_service_request_Msg_SentSuccess" id="SentSuccess" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_Msg_SentSuccess") %></span>
        <span globalize="ML_service_request_Msg_SentFailed" id="SentFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_service_request_Msg_SentFailed") %></span>
        <span globalize="ML_SERVICES_Txt_ExceedLimit" id="FileSizeErr" style="display: none"><%= CustomerPortal.Translator.T("ML_SERVICES_Txt_ExceedLimit") %></span>
        <span globalize="ML_Connectme_ErrMsg_FileExt" id="FileTypeErr" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_FileExt") %></span>
        <span globalize="ML_Error_Msg_AlphabetOnly" id="ML_Error_Msg_AlphabetOnly" style="display: none"><%= CustomerPortal.Translator.T("ML_Error_Msg_AlphabetOnly") %></span>
        <span globalize="ML_ErrorLength_Msg_AccountNumber" id="ML_ErrorLength_Msg_AccountNumber" style="display: none"><%= CustomerPortal.Translator.T("ML_ErrorLength_Msg_AccountNumber") %></span>
        <span globalize="ML_ServiceRequest_Msg_NotSubmit" id="lblNotSent" style="display: none"><%= CustomerPortal.Translator.T("ML_ServiceRequest_Msg_NotSubmit") %></span>
        <span globalize="ML_ServiceRequest_Msg_MovinInOut" id="msgMoveInOut" style="display: none"><%= CustomerPortal.Translator.T("ML_ServiceRequest_Msg_MovinInOut") %></span>
        <span globalize="ML_SrvcRqust_i_NoFile" id="SrvcRqust_i_NoFile" style="display: none"><%= CustomerPortal.Translator.T("ML_SrvcRqust_i_NoFile") %></span>

    </form>
    <script src="js/bootstrap.js"></script>
</body>
</html>
