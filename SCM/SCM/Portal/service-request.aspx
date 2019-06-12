<%@ Page Title="Service" Language="C#" MasterPageFile="Master.Master" AutoEventWireup="true" CodeBehind="service-request.aspx.cs" Inherits="CustomerPortal.service_request" EnableEventValidation="false" ValidateRequest="false" UICulture="es" Culture="es-MX" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControls/ZipCode.ascx" TagPrefix="uc1" TagName="ZipCode" %>
<%@ Register Src="~/ServiceRequest.ascx" TagPrefix="uc1" TagName="ServiceRequest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--Logout Code Start--%>
    <link href="<%#string.Format("{0}/css/jquery-ui.css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" />
    <script src="<%#string.Format("{0}/js/store.min.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
    <script src="<%#string.Format("{0}/js/jquery-idleTimeout.min.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
    <%--Logout Code End--%>
    <%: System.Web.Optimization.Styles.Render("~/Content/cssService-Request") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsService-Request")%>
    <script src="https://www.google.com/recaptcha/api.js" type="text/javascript"></script> 
    <link rel="stylesheet" href="include/jquery-ui-1.8.14.custom.css" type="text/css" />
    <link rel="stylesheet" href="include/jquery.ui.timepicker.css?v=0.3.1" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <style type="text/css">
        .service_fill_box .schedule_time select {
    margin: 0 3% 5px 5px; 
}
         #disclaimer, #disclaimerMoveIn {
                width:86%;
        }
        .all_service_step > div {
            padding:0px;
        } 
        #IsMobileNo1  {
            margin:0px;
                position: relative;
    top: 5px;
        }
        input[type="radio"]:focus {
            line-height:normal !important;
            height:auto !important;
        }
        .service_fill_box input[type=checkbox], .service_fill_box input[type=checkbox]:focus  {
                width: 23px !important;
                height: 23px !important;
        }
        #chk_billingAddress {
                margin-left: 0px;
        }
        .inner-mid-container {
                height: 96%;
        }
        @media (min-width:1500px) and (max-width:3500px) {
            .setting_save_box{
                 padding-bottom: 6px;
                 padding-top: 20px;
            }
        }

         .icon-cal{
            float: left;
            margin: -16px 0px 0px -28px!important;
        }
         .icon-cal1 {
    float: left;
        margin: -15px 0 0 -28px;
}
         .icon-calender{
             float: left;
             margin: 5px 0px 0px -28px !important;
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
         .service_fill_box_ie{
        margin-bottom:3px!important;
    }
    </style>
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnableScriptGlobalization="true">
    </asp:ScriptManager>
    <asp:HiddenField ID="hdnFlag" Value="load" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdn" Value="" runat="server" />
    <asp:HiddenField ID="hdfCurrentDate" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMoveDate" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnHolidayLst" runat="server" ClientIDMode="Static" />
    <input type="hidden" class="activeli_list" value="service" />
    <span globalize="ML_SERVICE_Navigation_Title" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_SERVICE_Navigation_Title") %></span>
    <section class="inner_mid_section" id="devices">
        <div class="container inner-mid-container">
            <div class="col-lg-12 energy_mid_box without_sidebar" style="padding-bottom:0px;">
            	<h1 style="border-bottom: 2px solid #F4F4F4 !important; width:100%;">
                     <img src="images/icon_service_sidebar.svg" style="padding-right:5px; margin-top: -3px; float: left;" />
                    <span class="head_icon_flat icon_services"></span>
                    <span globalize="ML_SERVICE_Navigation_Title"><%= CustomerPortal.Translator.T("ML_SERVICE_Navigation_Title") %></span> </h1>
                  <span id="errorMsg" style="float:right;">ERROR</span>
                <div class="row">
                 	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div class="col-lg-12">
                        	<div class="row" style="margin-left:-30px;" id="r1">
                            	<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                        <p globalize="ML_Default_Lbl_Account"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Account") %></p>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                        <p><asp:Label ID="lblAccountno" runat="server" globalize="ML_SrvcRqust_lbl_Accnt"></asp:Label></p>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text" style="padding-top: 8px;padding-bottom: 8px;">
                                        <p globalize="ML_SrvcRqust_Date"><%= CustomerPortal.Translator.T("ML_SrvcRqust_Date") %></p>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box" style="padding-top: 8px;padding-bottom: 8px;" >
                                        <p> <asp:Label ID="lblDate" runat="server" globalize="ML_SrvcRqust_lbl_Date"></asp:Label></p>
                                    </div>                                   
                                 </div>

                                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                     <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p globalize="ML_SrvcRqust_ddl_Reason"><%= CustomerPortal.Translator.T("ML_SrvcRqust_ddl_Reason") %></p>
                                    </div>
                                      <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                            <p class="reason_select">
                                             <asp:DropDownList ID="ddl_Reason" runat="server" mandatory="1" ToolTip="Reason" globalize="ML_SrvcRqust_ddl_Reason" 
                                                    Style="width: 171px; margin: 0px; text-transform:capitalize;" ClientIDMode="Static">
                                                </asp:DropDownList>
                                            </p>
                                        </div>
                                </div>                                 
                       	   </div>
                        </div>
                        
                       <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">  
                           <div class="row" style="margin-left:-30px;" id="r">
                             <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">   
                           <div id="TableService1">
                        <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	<p class="schedule_date" globalize="ML_SERVICE_Lbl_ScheduleDate"><%= CustomerPortal.Translator.T("ML_SERVICE_Lbl_ScheduleDate") %></p>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                        	<p> <asp:TextBox ID="txtDate" runat="server" title="Schedule Date" ReadOnly="true" globalize="ML_SrvcRqust_txtbx_Date" ClientIDMode="Static" placeholder="Date"></asp:TextBox>
                                    <ajaxToolkit:CalendarExtender ID="Cal_Date" runat="server" TargetControlID="txtDate" ClientIDMode="Static"
                                        Format="MM/dd/yy" OnClientDateSelectionChanged="checkForPreviousDate" PopupPosition="BottomRight" /></p>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	<p globalize="ML_SERVICE_Lbl_PersonAvailable"><%= CustomerPortal.Translator.T("ML_SERVICE_Lbl_PersonAvailable") %></p>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                        	<p> <asp:TextBox ID="txtName" MaxLength="60" runat="server" Style="color: Black;" mandatory="1" title="Person Available" ClientIDMode="Static"
                                        onkeypress="return IsAlpha(event);" globalize="ML_SrvcRqust_txtbx_PA"  placeholder="Person Available"></asp:TextBox>
                                  </p>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	<p globalize="ML_SrvcRqust_p_PPN"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_MobileNum") %></p>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                        	<p> 
                                <asp:TextBox ID="txtContact" runat="server" MaxLength="14" Style="color: Black;" globalize="ML_SrvcRqust_txtbx_Contact" placeholder="Primary Phone"
                                        ClientIDMode="Static" mandatory="1" title="Primary Phone"></asp:TextBox>
                        	</p>
                        </div>   
                               <%-- Bug 6351- Start --%>
                                 <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	<p globalize="ML_CustomerRistration_AlternateNum"><%= CustomerPortal.Translator.T("ML_CustomerRistration_AlternateNum") %></p>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                        	<p> 
                                <asp:TextBox ID="txtAlternatePhone" runat="server" MaxLength="14" Style="color: Black;" globalize="ML_SrvcRqust_txtbx_BP" placeholder="Alternate Phone"
                                        ClientIDMode="Static" title="Alternate Phone" onblur="javascript:validPhone(this.value,'txtAlternatePhone');"></asp:TextBox>

                        	</p>
                        </div>   
                               <%-- Bug 6351- End --%>
               		 </div> 
               	 </div>
 <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                     <div id="TableService2" class="divHide">
                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	    <p globalize="ML_SrvcRqust_p_ST"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_ST") %></p>
                            </div>
                            <div class="col-lg-5 col-md-6 col-sm-5 col-xs-5 service_fill_box service_fill_box_ie">
                        	    <p class="schedule_time">
                                 <asp:DropDownList ID="ddlHours" runat="server" ClientIDMode="Static" title="Hours" globalize="ML_DDLHOUR_SERVICEREQUEST" onChange="checkScheduleTime();">
                                            <asp:ListItem Text="1" Value="1"  globalize="ML_SrvcRqust_LItem_1"></asp:ListItem>
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
                                 <asp:DropDownList ID="ddlMin" runat="server" ClientIDMode="Static" title="Minutes" globalize="ML_DDLMINUTES_SERVICEREQUEST" onChange="checkScheduleTime();">
                                            <asp:ListItem Text="00" Value="00" globalize="ML_SrvcRqust_LItem_00"></asp:ListItem>
                                            <asp:ListItem Text="15" Value="15" globalize="ML_SrvcRqust_LItem_15"></asp:ListItem>
                                            <asp:ListItem Text="30" Value="30" globalize="ML_SrvcRqust_LItem_30"></asp:ListItem>
                                            <asp:ListItem Text="45" Value="45" globalize="ML_SrvcRqust_LItem_45"></asp:ListItem>
                                        </asp:DropDownList>
                                 <asp:DropDownList ID="ddlAmpm" runat="server" ClientIDMode="Static"  title="AM/PM" globalize="ML_DDLAMPM_SERVICEREQUEST">
                                            <asp:ListItem Text="AM" Value="AM" globalize="ML_SrvcRqust_LItem_AM"></asp:ListItem>
                                            <asp:ListItem Text="PM" Value="PM" Selected="True" globalize="ML_SrvcRqust_LItem_PM"></asp:ListItem>
                                        </asp:DropDownList>
                                 </p>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	    <p globalize="ML_SERVICE_Lbl_Pets"><%= CustomerPortal.Translator.T("ML_SERVICE_Lbl_Pets") %></p>
                            </div>
                            <div class="col-lg-5 col-md-6 col-sm-8 col-xs-5 service_fill_box">
                        	    <p> <asp:CheckBox ID="chk_Pets" runat="server" globalize="ML_SrvcRqust_chkbx_Pets" ClientIDMode="Static" /></p>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6  service_text">
                        	    <p globalize="ML_SERVICE_Lbl_LockedGates"><%= CustomerPortal.Translator.T("ML_SERVICE_Lbl_LockedGates") %></p>
                            </div>
                            <div class="col-lg-5 col-md-6 col-sm-8 col-xs-5 service_fill_box">
                        	    <p><asp:CheckBox ID="chk_Locked_gates" runat="server" globalize="ML_SrvcRqust_chkbx_LG" ClientIDMode="Static"/></p>
                            </div>   
                          </div>
                     </div>                
                 
                </div> 
                       </div>          
                        
                              <%--MOVE IN LEFT SIDE CONTENT--%>
                         <div id="divMoveInLhs" class="divHide">
                                <uc1:ServiceRequest runat="server" id="ServiceRequest" />
                             </div>
                            <div id="divMoveInLhs1" class="divHide">
                              <div class="secServiceTitle" globalize="ML_SrvcRqust_div_Where">
                                        <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_Where") %>
                              </div>  
                              
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">  
                             <div class="row" style="margin-left:-30px;">
                             <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">  
                                  <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date" globalize="ML_CustomerRegistration_Txt_StreetNumber"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Txt_StreetNumber") %></p>
                                </div> 
                                  <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p> <asp:TextBox ID="txtStreetNo" runat="server" ClientIDMode="Static" ToolTip="Street Number" maxlength="5" globalize="ML_CustomerRegistration_Txt_StreetNumber" mandatory="1" placeholder="Street Number" onpaste="return false" autocomplete="off"></asp:TextBox></p>
                                            </div>
                                  <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date" globalize="ML_CONNECTME_Lbl_Apt"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Apt") %></p>
                                </div>                        
                                  <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                       <p>   <asp:TextBox ID="txtUnitNo" runat="server" ClientIDMode="Static" ToolTip="Apt/Unit#" globalize="ML_SrvcRqust_txtbx_UnitNo" maxlength="5" placeholder="Apt/Unit#"></asp:TextBox></p>
                                    </div> 
                                  <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date" globalize="ML_SrvcRqust_p_State"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_State") %></p>
                                </div>                        
                                  <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                    <p>      <asp:TextBox ID="txtState" runat="server" ClientIDMode="Static" ToolTip="State" mandatory="1" onkeypress="return IsAlpha(event);" globalize="ML_SrvcRqust_txtbx_Static" MaxLength="35" placeholder="State"></asp:TextBox></p>
                                    </div> 
                                  <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                    <p class="schedule_date" globalize="ML_SrvcRqust_p_WhrMove"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_WhrMove") %></p>
                                </div>                        
                                  <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                      <p>    <asp:TextBox ID="txtDateOfMoving" runat="server" ClientIDMode="Static" ToolTip="When are you moving in?"
                                                mandatory="1" ReadOnly="true" globalize="ML_SrvcRqust_txtbx_MDate"  placeholder="Moving Date"></asp:TextBox>
                                            <ajaxToolkit:CalendarExtender ID="Cal_DateOfMoving" runat="server" TargetControlID="txtDateOfMoving" ClientIDMode="Static"
                                                Format="MM/dd/yy" OnClientDateSelectionChanged="checkForMoveDate" PopupPosition="BottomRight" /></p>
                                       <div globalize="ML_SrvcRqust_div_BD" class="move_in_pro">
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
                                            <p> <asp:TextBox ID="txtStreetName" runat="server" globalize="ML_SrvcRqust_txtbx_SName7" ClientIDMode="Static" ToolTip="Street Name"
                                                    maxlength="35"    mandatory="1" placeholder="Street Name"></asp:TextBox></p>
                                                    </div>
                                          <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p class="schedule_date" globalize="ML_Register_Lbl_City"><%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %></p>
                                        </div>                        
                                          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                 <p>  <asp:TextBox ID="txtCity" runat="server" ClientIDMode="Static" ToolTip="City" mandatory="1"
                                                        onkeypress="return IsAlpha(event);" globalize="ML_SrvcRqust_txtbx_City5" placeholder="City" MaxLength="35"></asp:TextBox>   </p>
                                            </div> 
                                          <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p class="schedule_date" globalize="ML_SrvcRqust_P_ZipCode"><%= CustomerPortal.Translator.T("ML_SrvcRqust_P_ZipCode") %></p>
                                        </div>                        
                                          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                              			    <p>    <asp:TextBox ID="txtZipCode" CssClass="ZipCode" runat="server" ClientIDMode="Static" ToolTip="Zip Code" globalize="ML_SrvcRqust_txtbx_ZipCode1"
                                            mandatory="1" TextMode="SingleLine" class="box" value="" size="30" MaxLength="5" onkeypress="return IsNumeric(event);"  placeholder="Zip Code"></asp:TextBox> 
                                              <uc1:ZipCode runat="server" id="ZipCode" style="position:relative"/>
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
                                  <div class="row" style="margin-left:-30px;">
                                     <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">  
                                          <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p class="schedule_date" globalize="ML_CustomerRegistration_Lbl_MobileNum">  <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_MobileNum") %></p>
                                        </div> 
                                          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                            <p> 
                                                <asp:TextBox ID="txtHomePhone" runat="server" ClientIDMode="Static" ToolTip="Primary Phone" globalize="ML_CustomerRegistration_Lbl_MobileNum"
                                                        MaxLength="14" mandatory="1" placeholder="Primary Phone"></asp:TextBox>
                                                </p>
                                                    </div>    
                                          <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p class="schedule_date" globalize="ML_Register_Lbl_EmailId"><%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %></p>
                                         </div> 
                                          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                            <p> <asp:TextBox ID="txtEmailAddress" runat="server" ClientIDMode="Static" ToolTip="Email ID"
                                                        mandatory="1" value="" MaxLength="30" globalize="ML_SrvcRqust_txtbx_emailAdd"  placeholder="Email ID"></asp:TextBox>
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
                                                          <asp:TextBox ID="txtBusinessPhone" runat="server" ClientIDMode="Static" ToolTip="Alternative Phone" MaxLength="14" globalize="ML_SrvcRqust_txtbx_BP" placeholder="Alternate Phone" onblur="javascript:validPhone(this.value,'txtBusinessPhone');"> </asp:TextBox>

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
                                        <asp:CheckBox ID="chkMoveIn" runat="server" ClientIDMode="Static" style="position: relative;left: 9px;top: 2px;" />
                                  <span globalize="ML_SrvcRqust_chkbx_SAMA"> <%= CustomerPortal.Translator.T("ML_SrvcRqust_chkbx_SAMA") %></span>
                              </div>
                              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">  
                                  <div class="row" style="margin-left:-30px;">
                                     <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">  
                                          <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p class="schedule_date" globalize="ML_CustomerRegistration_Txt_StreetNumber"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Txt_StreetNumber") %></p>
                                        </div> 
                                          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                            <p>  <asp:TextBox ID="txtMStreetNo" MaxLength="5" runat="server" ClientIDMode="Static" ToolTip="Street Number" onpaste="return false" autocomplete="off"
                                                        mandatory="1"  CssClass="mailing" placeholder="Street Number" globalize="ML_CustomerRegistration_Txt_StreetNumber"></asp:TextBox></p>
                                                    </div>
                                          <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p class="schedule_date" globalize="ML_CONNECTME_Lbl_Apt"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Apt") %></p>
                                        </div>                        
                                          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                               <p>   <asp:TextBox ID="txtMUnitNo" MaxLength="5" runat="server" ClientIDMode="Static" ToolTip="Apt/Unit#" placeholder="Apt/Unit#"
                                                        CssClass="mailing" globalize="ML_SrvcRqust_txtbx_UnitN"></asp:TextBox>       </p>
                                            </div> 
                                          <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p class="schedule_date" globalize="ML_SrvcRqust_p_State"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_State") %></p>
                                        </div>                        
                                          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                        <p>     <asp:TextBox ID="txtMState" MaxLength="35" runat="server" ClientIDMode="Static" ToolTip="State"
                                                    mandatory="1" CssClass="mailing" onkeypress="return IsAlpha(event);" placeholder="State" globalize="ML_SrvcRqust_txtbx_MState"></asp:TextBox></p>
                                        </div> 
                           			</div> 
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    	<%--MOVE IN MAILING ADDRESS--%>
                                          <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p class="schedule_date" globalize="ML_SrvcRqust_p_StrretName" ><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_StrretName") %></p>
                                        </div> 
                                          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                            <p>   <asp:TextBox ID="txtMStreetName" MaxLength="35" runat="server" ClientIDMode="Static" ToolTip="Street Name"
                                                        mandatory="1" CssClass="mailing" globalize="ML_SrvcRqust_txtbx_SName7" placeholder="Street Name"></asp:TextBox></p>
                                                    </div>
                                          <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p class="schedule_date" globalize="ML_Register_Lbl_City"><%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %></p>
                                        </div>                        
                                          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                 <p><asp:TextBox ID="txtMCity" MaxLength="35" runat="server" ClientIDMode="Static" ToolTip="City" mandatory="1"
                                                        CssClass="mailing" onkeypress="return IsAlpha(event);" globalize="ML_SrvcRqust_txtbx_City5" placeholder="City"></asp:TextBox>  </p>
                                            </div> 
                                          <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                            <p class="schedule_date" globalize="ML_SrvcRqust_P_ZipCode"><%= CustomerPortal.Translator.T("ML_SrvcRqust_P_ZipCode") %></p>
                                        </div>                        
                                          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                          <p>     <asp:TextBox ID="txtMZipCode" CssClass="ZipCode" runat="server" ClientIDMode="Static" ToolTip="Zip Code" globalize="ML_SrvcRqust_txtbx_ZipCode1"
                                                    mandatory="1" TextMode="SingleLine" class="box" value="" size="30" MaxLength="5" onkeypress="return IsNumeric(event);"  placeholder="Zip Code"></asp:TextBox>
                                           <uc1:ZipCode runat="server" id="ZipCode1" style="position:relative" />
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
                                         <div class="col-lg-3 col-md-3 col-sm-4 col-xs-6 service_text">
                        	               <p class="schedule_date" globalize="ML_SrvcRqust_p_WenOut">  <%= CustomerPortal.Translator.T("ML_SrvcRqust_p_WenOut") %></p>
                                           </div> 
                                         <div class="col-lg-9 col-md-9 col-sm-8 col-xs-6 service_fill_box" style="padding-left: 1px;">
                         	                <p>  <asp:TextBox ID="txtMODateofmoving" runat="server" ClientIDMode="Static" ToolTip="When?"
                                                    mandatory="1" ReadOnly="true" globalize="ML_SrvcRqust_txtbx_When" placeholder="Moving Out Time" Style="width:27.4%!important;"></asp:TextBox>
                                                <%-- <img id="btnMODate" src="images/Icon-calendar.png" class="icon-cal"></img>--%>
                                                   <asp:ImageButton CssClass="icon-cal icon-calender" ID="btnMODate" runat="server" ImageUrl="~/images/Icon-calendar.png" />
                                                <ajaxToolkit:CalendarExtender ID="Cal_MODateofmoving" runat="server" TargetControlID="txtMODateofmoving" ClientIDMode="Static"  PopupButtonID="btnMODate"
                                                    Format="MM/dd/yy" OnClientDateSelectionChanged="checkForMoveDate" PopupPosition="BottomRight" />
                                                <span globalize="ML_SrvcRqust_Req"> <%= CustomerPortal.Translator.T("ML_SrvcRqust_Req") %></span>
                        	                </p>
                                          </div>
                                         <%--MOVE OUT CONTACT INFO--%>
                                         <div class="secServiceTitle" globalize="ML_SrvcRqust_div_ContactInfo">
                                              <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_ContactInfo") %>
                                         </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">  
                                           <div class="row" style="margin-left:-30px;">
                                             <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">                                          
                                                 <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                        <p class="schedule_date" globalize="ML_CustomerRegistration_Lbl_MobileNum"> <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_MobileNum") %></p>
                                                 </div> 
                                                 <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                    <p>                                                         
                                                        <asp:TextBox ID="txtMOBusinessPhone" runat="server" ClientIDMode="Static" globalize="ML_CustomerRegistration_Lbl_MobileNum" MaxLength="14" 
                                                            mandatory="1" onblur="javascript:validPhone(this.value,'txtMOBusinessPhone');"></asp:TextBox>
                                                    </p>
                                                 </div>    
                                                 <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                    <p class="schedule_date" globalize="ML_Register_Lbl_EmailId"><%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %></p>
                                                 </div> 
                                                 <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                    <p> <asp:TextBox ID="txtMOEmailAddress" runat="server" ClientIDMode="Static" ToolTip="Email ID" placeholder="Email ID"
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
                                                        MaxLength="14" globalize="ML_SrvcRqust_txtbx_AltPhn" onblur="javascript:validPhone(this.value,'txtMOHomePhone');" ></asp:TextBox>
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
                                   <div class="row" style="margin-left:-30px;">
                                     <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">       
                                          
                                          <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	                <p class="schedule_date" globalize="ML_CustomerRegistration_Txt_StreetNumber"> <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Txt_StreetNumber") %></p>
                                        </div> 
                                          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                        	                <p>  <asp:TextBox ID="txtMOStreetNo" runat="server" MaxLength="5" ClientIDMode="Static" ToolTip="Street Number" placeholder="Street Number" onpaste="return false" autocomplete="off"
                                                mandatory="1" globalize="ML_CustomerRegistration_Txt_StreetNumber"></asp:TextBox>
                        	                </p>
                                                    </div>
                                          <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	                <p class="schedule_date" globalize="ML_CONNECTME_Lbl_Apt"> <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Apt") %></p>
                                        </div>                        
                                          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                               <p><asp:TextBox ID="txtMOUnitNo" runat="server" globalize="ML_SrvcRqust_txtbx_MOUnit" ClientIDMode="Static" placeholder="Apt/Unit#" ToolTip="Apt/Unit#" MaxLength="5"></asp:TextBox>
                                               </p>
                                            </div> 
                                          <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	                <p class="schedule_date" globalize="ML_SrvcRqust_p_State"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_State") %></p>
                                        </div>                        
                                          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                        <p>    
                                              <%--<asp:TextBox ID="txtMOState" runat="server" ClientIDMode="Static" ToolTip="State" globalize="ML_SrvcRqust_txtbx_State2"
                                                mandatory="1" onkeypress="return IsAlpha(event);" placeholder="State" MaxLength="35"></asp:TextBox>--%>

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
                        	            <p>     <asp:TextBox ID="txtMOStreetName" runat="server" ClientIDMode="Static" ToolTip="Street Name"
                                            mandatory="1" globalize="ML_SrvcRqust_txtbx_SName7" placeholder="Street Name" MaxLength="35"></asp:TextBox>
                        	            </p>
                                                </div>
                                      <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	            <p class="schedule_date" globalize="ML_Register_Lbl_City"><%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %></p>
                                      </div>                        
                                      <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                             <p> <asp:TextBox ID="txtMOCity" runat="server" globalize="ML_SrvcRqust_txtbx_City5" placeholder="City" ClientIDMode="Static" ToolTip="City" mandatory="1" onkeypress="return IsAlpha(event);" MaxLength="35"></asp:TextBox>
                                             </p>
                                        </div> 
                                      <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	            <p class="schedule_date" globalize="ML_SrvcRqust_P_ZipCode"><%= CustomerPortal.Translator.T("ML_SrvcRqust_P_ZipCode") %></p>
                                      </div>                        
                                      <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                      <p>     <asp:TextBox ID="txtMOZipCode" CssClass="ZipCode" runat="server" ClientIDMode="Static" placeholder="Zip Code" ToolTip="Zip Code" globalize="ML_SrvcRqust_txtbx_ZipCode1"
                                            mandatory="1" TextMode="SingleLine" class="box" value="" size="30" MaxLength="5" onkeypress="return IsNumeric(event);" ></asp:TextBox>
                                      <uc1:ZipCode runat="server" id="ZipCode2" style="position:relative" />
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
                        	       <p class="schedule_date" globalize="ML_SrvcRqust_p_WenOut"> <%= CustomerPortal.Translator.T("ML_SrvcRqust_p_WenOut") %></p>
                                   </div> 
                                  <div class="col-lg-9 col-md-9 col-sm-8 col-xs-6 service_fill_box" style="padding-left: 1px;">
                         	        <p>   <asp:TextBox ID="txtTODateOfMoving" runat="server" ClientIDMode="Static" ToolTip="When are you moving out?"
                                        mandatory="1" ReadOnly="true" globalize="ML_SrvcRqust_txtbx_MOut" placeholder="Moving Out Time" Style="width:27.4%!important;"></asp:TextBox>
                                      <%--   <img id="btnMOVEDate" src="images/Icon-calendar.png" class="icon-cal"></img>--%>
                                          <asp:ImageButton CssClass="icon-cal icon-calender" ID="btnMOVEDate" runat="server" ImageUrl="~/images/Icon-calendar.png" />
                                    <ajaxToolkit:CalendarExtender ID="Cal_TODateOfMoving" runat="server" TargetControlID="txtTODateOfMoving" ClientIDMode="Static" PopupButtonID="btnMOVEDate"
                                        Format="MM/dd/yy" OnClientDateSelectionChanged="checkForMoveDate" PopupPosition="BottomRight"  />
                                        <span globalize="ML_SrvcRqust_Req"> <%= CustomerPortal.Translator.T("ML_SrvcRqust_Req") %></span>
                        	        </p>
                                  </div>
                                   <%--SERVICE TRANSFER WHERE--%>
                                      <div class="secServiceTitle" globalize="ML_SrvcRqust_div_Where">
                                                <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_Where") %>
                                      </div>  
                            	 <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">  
                                   <div class="row" style="margin-left:-30px;">
                                     <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">                                          
                                      <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	            <p class="schedule_date" globalize="ML_CustomerRegistration_Txt_StreetNumber">  <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Txt_StreetNumber") %></p>
                                    </div> 
                                      <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                        	            <p>  <asp:TextBox ID="txtTStreetNo" runat="server" ClientIDMode="Static" ToolTip="Street Number" onpaste="return false" autocomplete="off"
                                        mandatory="1"  MaxLength="5" globalize="ML_CustomerRegistration_Txt_StreetNumber" ></asp:TextBox>
                        	            </p>
                                                </div>
                                      <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	            <p class="schedule_date" globalize="ML_SrvcRqust_p_StrretName"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_StrretName") %></p>
                                    </div> 
                                      <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                        	            <p>  <asp:TextBox ID="txtTStreetName" runat="server" MaxLength="35" ClientIDMode="Static" ToolTip="Street Name"
                                        mandatory="1" globalize="ML_SrvcRqust_txtbx_SName7" ></asp:TextBox>
                        	            </p>
                                                </div>
                                      <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	            <p class="schedule_date" globalize="ML_Register_Lbl_City"><%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %></p>
                                    </div>                        
                                      <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                             <p>  <asp:TextBox ID="txtTCity" runat="server" globalize="ML_SrvcRqust_txtbx_City5" placeholder="City" ClientIDMode="Static" MaxLength="35"  ToolTip="City" mandatory="1" onkeypress="return IsAlpha(event);"></asp:TextBox>
                                             </p>
                                        </div> 
                                      <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	            <p class="schedule_date" globalize="ML_SrvcRqust_P_ZipCode"><%= CustomerPortal.Translator.T("ML_SrvcRqust_P_ZipCode") %></p>
                                    </div>                        
                                      <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                          <p>  <asp:TextBox ID="txtTZipCode" CssClass="ZipCode" runat="server" ClientIDMode="Static" ToolTip="Zip Code" placeholder="Zip Code"
                                        mandatory="1" TextMode="SingleLine" class="box" globalize="ML_SrvcRqust_txtbx_ZipCode1" value="" size="30" MaxLength="5" onkeypress="return IsNumeric(event);"></asp:TextBox>
                                        <uc1:ZipCode runat="server" id="ZipCode3" style="position:relative" />
                                               </p>
                                        </div>
                                      </div>
                                     <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"> 
                                     	<div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text" style="display:none;">
                        	            <p class="schedule_date" globalize="ML_SrvcRqust_p_Mod"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_Mod") %></p>
                                      </div>
                                      <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box" style="display:none;">
                        	            <p>     <asp:TextBox ID="txtTMod" runat="server"  MaxLength="50" ClientIDMode="Static" ToolTip="Mod" globalize="ML_SrvcRqust_txtbx_Mod" placeholder="Mod"></asp:TextBox>
                        	            </p>
                                                </div>
                                      <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	            <p class="schedule_date" globalize="ML_CONNECTME_Lbl_Apt"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Apt") %></p>
                                    </div>                        
                                      <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                           <p>  <asp:TextBox ID="txtTUnitNo" runat="server" ClientIDMode="Static" ToolTip="Apt/Unit#" globalize="ML_SrvcRqust_txtbx_UN2" placeholder="Apt/Unit#" MaxLength="5"></asp:TextBox>
                                           </p>
                                        </div> 
                                      <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	            <p class="schedule_date" globalize="ML_SrvcRqust_p_State"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_State") %></p>
                                    </div>                        
                                      <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                        <p>   
                                           <%-- <asp:TextBox ID="txtTState" runat="server" ClientIDMode="Static" ToolTip="State" placeholder="State"
                                             mandatory="1" onkeypress="return IsAlpha(event);" globalize="ML_SrvcRqust_txtbx_State6" MaxLength="35"></asp:TextBox>--%>
                                             <asp:DropDownList ID="txtTState" ClientIDMode="Static" runat="server" mandatory="1" globalize="ML_SrvcRqust_txtbx_Static"  CssClass="reset">
                                       
                                             </asp:DropDownList>

                                        </p>
                                        </div> 
                                      <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	            <p class="schedule_date" globalize="ML_SrvcRqust_p_WhrMove"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_WhrMove") %></p>
                                    </div>                        
                                      <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                          <p>    <asp:TextBox ID="txtTDateOfMoving" runat="server" ClientIDMode="Static" ToolTip="When are you moving in?"
                                        mandatory="1" ReadOnly="true" globalize="ML_SrvcRqust_txtbx_DateOfMove" placeholder="Moving in Time"></asp:TextBox>
                                           <%--   <img id="btnDateMoIN" src="images/Icon-calendar.png" class="icon-cal1"></img>--%>
                                          <asp:ImageButton CssClass="icon-cal1" ID="btnDateMoIN" runat="server" ImageUrl="~/images/Icon-calendar.png" />

                                    <ajaxToolkit:CalendarExtender ID="Cal_TDateOfMoving" runat="server" TargetControlID="txtTDateOfMoving" ClientIDMode="Static" PopupButtonID="btnDateMoIN"
                                        Format="MM/dd/yy" OnClientDateSelectionChanged="checkForMoveDate" PopupPosition="BottomRight"/>
                                          </p>
                                        </div> 
                                      <div globalize="ML_SrvcRqust_div_nxtBD" style="float: left;margin-left: 15px;padding-top: 5px;">
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
                                       <div class="row" style="margin-left:-30px;">
                                         <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"> 
                                         <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	                    <p class="schedule_date" globalize="ML_CustomerRegistration_Lbl_MobileNum"> <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_MobileNum") %></p>
                                         </div> 
                                         <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                        	                <p> 
                                             
                                                <asp:TextBox ID="txtTBusinessPhone" runat="server" ClientIDMode="Static" ToolTip="Primary Phone" placeholder="Primary Phone"
                                                MaxLength="14" mandatory="1" globalize="ML_SrvcRqust_txtbx_HomePhn" onblur="javascript:validPhone(this.value,'txtTBusinessPhone');"></asp:TextBox>
                                             </p>
                                         </div>    
                                         <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	                <p class="schedule_date" globalize="ML_Register_Lbl_EmailId"> <%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %></p>
                                         </div> 
                                         <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                        	                <p>  <asp:TextBox ID="txtTEmailAddress" runat="server" ClientIDMode="Static" ToolTip="Email ID"
                                                mandatory="1" value="" globalize="ML_SrvcRqust_txtbx_EmailAdd1" MaxLength="50"  placeholder="Email ID"></asp:TextBox>
                                                
                                            </p>
                               			 </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"> 
                                         <%--SERVICE TRANSFER CONTACT--%>
                                            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                <p class="schedule_date" globalize="ML_CustomerRistration_AlternateNum"> <%= CustomerPortal.Translator.T("ML_CustomerRistration_AlternateNum") %></p>
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
                                              <div>
                                                        <asp:CheckBox ID="autoFillAddress" runat="server"   ClientIDMode="Static" />
                                                  <span globalize="ML_SrvcRqust_chkbx_SAMA"><%= CustomerPortal.Translator.T("ML_SrvcRqust_chkbx_SAMA") %></span>
                                              </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">  
                                       <div class="row" style="margin-left:-30px;">
                                         <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">  
                                                        
                                              <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	                    <p class="schedule_date" globalize="ML_CustomerRegistration_Txt_StreetNumber"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Txt_StreetNumber") %></p>
                                            </div> 
                                              <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                        	                    <p>  <asp:TextBox ID="txtTMStreetNo" runat="server" ClientIDMode="Static" ToolTip="Street Number" placeholder="Street Number"
                                                   mandatory="1" MaxLength="5" globalize="ML_CustomerRegistration_Txt_StreetNumber"  CssClass="mailing"></asp:TextBox>
                        	                    </p>
                                                        </div>
                                              <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	                    <p class="schedule_date" globalize="ML_SrvcRqust_p_StrretName"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_StrretName") %></p>
                                            </div> 
                                              <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                        	                    <p>  
                                                     <asp:TextBox ID="txtTMStreetName" runat="server" ClientIDMode="Static" ToolTip="Street Name"
                                                      mandatory="1" CssClass="mailing" globalize="ML_SrvcRqust_txtbx_SName7" placeholder="Street Name" MaxLength="35"></asp:TextBox>
                        	                    </p>
                                                        </div>
                                              <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                        	                    <p class="schedule_date" globalize="ML_Register_Lbl_City"><%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %></p>
                                            </div>                        
                                              <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                     <p>
                                                         <asp:TextBox ID="txtTMCity" runat="server" ClientIDMode="Static" ToolTip="City" mandatory="1" placeholder="City"
                                                                  CssClass="mailing" globalize="ML_SrvcRqust_txtbx_city7" onkeypress="return IsAlpha(event);" MaxLength="35"></asp:TextBox>
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
                                                               <p>    <asp:TextBox ID="txtTMMod" MaxLength="50" globalize="ML_SrvcRqust_txtbx_Mod3" runat="server" ClientIDMode="Static" ToolTip="Mod" CssClass="mailing" placeholder="Mod"></asp:TextBox>
                                                               </p>
                                                            </div>
                                                          <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                            <p class="schedule_date" globalize="ML_CONNECTME_Lbl_Apt"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Apt") %></p>
                                                        </div>                        
                                                          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                               <p>   <asp:TextBox ID="txtTMUnitNo" runat="server" MaxLength="5" globalize="ML_SrvcRqust_txtbx_Uno" placeholder="Apt/Unit#" ClientIDMode="Static" ToolTip="Apt/Unit#"
                                                                         CssClass="mailing"></asp:TextBox>
                                                               </p>
                                                            </div> 
                                                          <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6 service_text">
                                                            <p class="schedule_date" globalize="ML_SrvcRqust_p_State"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_State") %></p>
                                                        </div>                        
                                                          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-6 service_fill_box">
                                                            <p>  
                                                                      <%--<asp:TextBox ID="txtTMState" runat="server" MaxLength="35" ClientIDMode="Static" ToolTip="State" placeholder="State"
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
                                                    mandatory="1" globalize="ML_SrvcRqust_txtbx_ZipCode1" TextMode="SingleLine" class="box" value="" size="30" MaxLength="5" onkeypress="return IsNumeric(event);"></asp:TextBox>
                                               <uc1:ZipCode runat="server" id="ZipCode4"  style="position:relative"/>
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
                 <hr class="divider_line hide_move_in" style="float:left; width:100%; margin-top:-16px; margin-bottom:10px;" />
             <div class="row hide_move_in">
            	<div class="col-lg-3 col-md-3 col-sm-4 col-xs-5">
                	<p globalize="ML_CONNECTME_Lbl_AddAttach" style="padding-left:15px;font-size:12px;font-weight:bold;"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_AddAttach") %></p>
              	</div>               
                 <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                		<p style="margin-top:0;line-height:29px;"><span class="newbutton submit-button file-input btn btn-primary btn-file"  id="lblFileupload" globalize="ML_SrvcRqust_ChooseF">Choose File
                        <asp:FileUpload ID="flupload" runat="server" onchange="File_OnChange(this)" Style="width: 175px;" ClientIDMode="Static" />
                	   </span> <i id="nofile" globalize="ML_SrvcRqust_i_NoFile"><%= CustomerPortal.Translator.T("ML_SrvcRqust_i_NoFile") %></i><img id="btnRemoveFile" title="Remove" src="images/notification_icon/Payment_DeleteIcon.png"
                                    onclick="return removeFile();" style="display:none" /></p>
              	</div>
                 <div class="clearfix"></div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                	<p globalize="ML_SERVICE_Lbl_Comments" style="padding-left:15px;font-size:12px;font-weight:bold;"><%= CustomerPortal.Translator.T("ML_SERVICE_Lbl_Comments") %></p>
              	</div>
                <div class="col-lg-9 col-md-9 col-sm-6 col-xs-12">
                	<p class="text_width_box"><asp:TextBox ID="txt_Comments" runat="server" TextMode="MultiLine" title="Additionalb  test Comments" placeholder="Additional Comments" ClientIDMode="Static" globalize="ML_SrvcRqust_txtbx_Comment"
                      onkeypress="return CountDescription(this, 500);" onChange="Count(this,500)" class="comment" Rows="4" style="width:89%;border-color:#d6d6d6; height:90px !important;">

                	   </asp:TextBox>
                	</p>
                 <p class="service_text1" globalize="ML_SrvcRqust_p_info" style=" display: inline-block;margin-top: 0px;font-weight:normal;"><%= CustomerPortal.Translator.TT_ProductName("ML_SrvcRqust_p_info") %> </p>
              	</div>
              </div>
             
              
                </div>
             <div id="divOther" class="setting_save_box" style="display:table;">     
                 <div id="disclaimer" class="dis_spani" style="float: left; margin-bottom: 0px; padding-left: 22px; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ServiceDisclaimer) %>!important;">
                      <b><span globalize="ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer" style="color: red;"><%# CustomerPortal.Translator.T("ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer") %></span><span style="color: red;">:</span> </b>
                      <span globalize="ML_Service_Disclaimer" runat="server" style="color: black;"><%= CustomerPortal.Translator.TT_ProductName("ML_Service_Disclaimer") %></span>
                 </div> 
                 <input type="button" id="btnSaveChanges" class="submit-button" value='<%# CustomerPortal.Translator.T("ML_OTP_Btn_Submit") %>' globalize="ML_OTP_Btn_Submit" />
            </div>
            <div id="divMoveIn" class="setting_save_box" style="display: none;">
                     <div class="buttons_area">
                   <div id="disclaimerMoveIn"class="dis_spani" style="float: left; margin-bottom: 0px; padding-left: 22px; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ServiceDisclaimer) %>!important;">
                      <b><span globalize="ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer" style="color: red;"><%# CustomerPortal.Translator.T("ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer") %></span><span style="color: red;">:</span> </b>
                      <span globalize="ML_Service_Disclaimer" runat="server" style="color: black;"><%= CustomerPortal.Translator.TT_ProductName("ML_Service_Disclaimer") %></span>
                 </div> 
                        <%-- <a href="default.aspx" id="cancel" class="submit-button" style="margin-left: 13px; float:left;">Cancel</a>--%>
                  
                          <asp:Button ID="BtnSumit" runat="server" class="submit-button"  Text='<%# CustomerPortal.Translator.T("ML_Billing_Txt_btnSubmit") %>'  globalize="ML_Billing_Txt_btnSubmit" ClientIDMode="Static"/>      
                  
                     </div></div>
            </div>
    </section>
    <!-- End Section -->
    <span globalize="ML_SvngLdr_lstItem_Select" id="lblSelect" style="display: none"><%= CustomerPortal.Translator.T("ML_SvngLdr_lstItem_Select") %></span>
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
    <span globalize="ML_ConnectMe_ChooseFile" id="lblChooseFile" style="display: none"><%= CustomerPortal.Translator.T("ML_ConnectMe_ChooseFile") %></span>
    <span globalize="ML_ServiceRequest_Msg_NotSubmit" id="lblNotSent" style="display: none"><%= CustomerPortal.Translator.T("ML_ServiceRequest_Msg_NotSubmit") %></span>
    <span globalize="ML_ServiceRequest_Msg_MovinInOut" id="msgMoveInOut" style="display: none"><%= CustomerPortal.Translator.T("ML_ServiceRequest_Msg_MovinInOut") %></span>
    <span globalize="ML_SERVICES_Txt_ExceedLimit" id="IDfilesize" style="display: none"><%= CustomerPortal.Translator.T("ML_SERVICES_Txt_ExceedLimit") %></span>
     <span globalize="ML_Connectme_ErrMsg_FileExt" id="IDfileExt" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_FileExt") %></span>
      <span globalize="ML_Connectme_ErrMsg_ValidEmailID" id="mailtext" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_ValidEmailID") %></span>
</asp:Content>
