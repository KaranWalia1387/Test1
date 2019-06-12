<%@ Page Title="Connect Me" Language="C#" MasterPageFile="ConnectMeMasterPage.master" AutoEventWireup="true" CodeBehind="connect-me.aspx.cs" Inherits="CustomerPortal.connect_me" EnableEventValidation="false" ValidateRequest="false" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControls/ZipCode.ascx" TagPrefix="uc1" TagName="ZipCode" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <script src="js/ui/jquery.ui.core.js"></script>
	<script src="js/ui/jquery.ui.widget.js"></script>
<script src="js/ui/jquery.ui.position.js"></script>
<script src="js/ui/jquery.ui.autocomplete.js"></script>
    <link rel="stylesheet" href="js/themes/base/jquery.ui.all.css">
       
    <%: System.Web.Optimization.Styles.Render("~/Content/cssConnect-Me") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsConnect-Me")%>
    <style type="text/css">
        .icon-cal {
    float: left;
    margin: 4px 0px 0px -28px;
}
        .div_disclaimer {
        width:82%;}

        .w2ui-popup {
            z-index: 9999999999 !important;
        }


        .sigWrapper  .required{ vertical-align:top}
    </style>
   
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>   
    <asp:HiddenField ID="hdnFlag" Value="load" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnDR" Value="0" runat="server" ClientIDMode="Static" />
   <asp:HiddenField ID="hdnTwitter" Value="0" runat="server" ClientIDMode="Static" />
    <div style="height: 75%; overflow: auto;" class="hgt" >
        <input type="hidden" class="activeli_list" value="connect" />
        <div class="social" id="divConnectMe" style="display:none">
            <div id="div_general">

                <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt">
                    <p globalize="ML_Master_lbl_CustName"><%= CustomerPortal.Translator.T("ML_Master_lbl_CustName") %></p>
                </div>
                <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                    <p>
                        <asp:Label ID="lblCustName" runat="server" Text="N/a" ></asp:Label>
                    </p>
                </div>
                <div class="clear_both"></div>
                <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt">
                    <p globalize="ML_Default_Lbl_Account"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Account") %></p>
                </div>
                <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                    <p>
                        <asp:Label ID="lblaccountno" runat="server" Text="N/a"></asp:Label>
                    </p>
                </div>
                <div class="clear_both"></div>
                <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt">
                    <p globalize="ML_SrvcRqust_Date"><%= CustomerPortal.Translator.T("ML_SrvcRqust_Date") %></p>
                </div>
                <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                    <p>
                        <asp:Label ID="lblDate" runat="server" Text="N/a" ClientIDMode="Static"></asp:Label>
                    </p>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt">
                    <p globalize="ML_CONNECTME_Lbl_Topic"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Topic") %></p>
                </div>
                <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                    <p class="topic_box">
                        <asp:DropDownList ID="ddl_topic" runat="server" mandatory="1" title="Topic" globalize="ML_ConnectMe_Topic"
                            ClientIDMode="Static">
                        </asp:DropDownList>
                    </p>
                </div>
                  <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt">
                    <p globalize="ML_Notification_lbl_Subject"><%= CustomerPortal.Translator.T("ML_Notification_lbl_Subject") %></p>
                </div>
                <%--bug id 5740--%>
                <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                    <p>
                        <asp:TextBox ID="txt_Subject" runat="server" mandatory="1" title="Subject" globalize="ML_ConnectMe_TxtSubject"
                            ClientIDMode="Static" placeholder="Subject" onKeyUp="Count(this,50)" onChange="Count(this,50)"></asp:TextBox>
                    </p>
                </div>
                <div id="divAddresslatlong" runat="server" style="display:none;"  clientidmode="Static">
                                        <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt">
                                        <p globalize="ML_Default_Lbl_Address"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Address") %></p>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                        <p>
                                            <asp:TextBox ID="txtAddresslatlong" runat="server" ClientIDMode="Static" placeholder="Address" MaxLength="100" title="Address" mandatory="1" globalize="ML_Default_Lbl_Address"></asp:TextBox><span id="AddressSpan" style="color:#950202; display:none; padding-left:3px; font-size: 19px;">*</span>
                                        </p>
                                    </div>
                           </div>        
              
            </div>
            <div class="clear_both"></div>
            <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt">

                <p globalize="ML_CONNECTME_Lbl_AddAttach"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_AddAttach") %></p>
            </div>

            <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                <p>
                    <span class="submit-button btn btn-primary btn-file ieBtn" id="lblFileupload" globlaize="ML_ConnectMe_ChooseFile" title="Click to attach a File">
                    <%= CustomerPortal.Translator.T("ML_ConnectMe_ChooseFile") %>
                    <asp:FileUpload ClientIDMode="Static" ID="FileUpload1" ToolTip="" globalize="ML_CONNECTME_Btn_AttachFile" runat="server" onchange="File_OnChange(this)" Style="float: left; width: 230px;" />

                    </span><i id="nofile" globalize="ML_SrvcRqust_i_NoFile"><%= CustomerPortal.Translator.T("ML_SrvcRqust_i_NoFile") %></i>
                    <img id="btnRemoveFile" title='<%= CustomerPortal.Translator.TT_ProductName("ML_Billing_lbl_Remove") %>' globlaize="ML_Billing_lbl_Remove" src="images/notification_icon/Payment_DeleteIcon.png"
                        onclick="return removeFile();" />
                </p>

            </div>

            <div class="clear_both"></div>
            <div id="divComments">
                <div class="col-lg-3 col-md-3 col-sm-5 col-xs-4 customer_txt">
                    <p globalize="ML_CONNECTME_Lbl_Comments" style="padding-left: 18px;"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Comments") %></p>
                </div>
                <div class="col-lg-9 col-md-9 col-sm-7 col-xs-8 customer_txt_name">
                    <p style="padding-left: 48px;"  class="text_width_box">
                        <asp:TextBox runat="server" TextMode="MultiLine" ID="txtComment" ClientIDMode="Static" Rows="7" globalize="ML_ConnectMe_TxtComments"
                            mandatory="1" title="Comments" onKeyUp="Count(this,500)" placeholder="Upto 500 characters"  onChange="Count(this,500)"></asp:TextBox>
                    </p>
                    <p class="service_text1" globalize="ML_ConnectMe_p_info" style="display: inline-block; margin-top: 0px; padding-left: 48px;">
                        <%= CustomerPortal.Translator.TT_ProductName("ML_ConnectMe_p_info") %>
                    </p>
                </div>

            </div>



            <div class="connectSection">
                <div id="div_contactInfo" style="display: none;" class="div_reason">
                    <div class="secServiceTitle" globalize="ML_CONNECTME_Lbl_ContactInfo">
                         <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_ContactInfo") %>
                    </div>
                    <i globalize="ML_CONNECTME_Lbl_ContactInfoVal"> <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_ContactInfoVal") %>
                    </i>
                    <div class="col-lg-3 col-md-3 col-sm-5 col-xs-4 customer_txt" style="display:none" globalize="ML_CONNECTME_Lbl_FName">
                        <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_FName") %>
                    </div>
                    <div style="display:none" class="col-lg-9 col-md-9 col-sm-7 col-xs-8 customer_txt_name">
                        <p>
                            <asp:TextBox ID="txtFirstName" ClientIDMode="Static" MaxLength="30" globalize="ML_CONNECTME_Txt_FName" onkeypress="return IsAlpha(event);" placeholder="First Name" runat="server" mandatory="0" ToolTip="First Name"></asp:TextBox>
                        </p>
                    </div>
                    <div class="clear_both"></div>
                    <div class="col-lg-3 col-md-3 col-sm-5 col-xs-4 customer_txt" globalize="ML_Master_lbl_CustName">
                       <%= CustomerPortal.Translator.T("ML_Master_lbl_CustName") %>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-7 col-xs-8 customer_txt_name">
                        <p>
                            <asp:TextBox ClientIDMode="Static" ID="txtLastName" MaxLength="30" onkeypress="return IsAlpha(event);" globalize="ML_Txt_CustomerName" placeholder="Name" runat="server" mandatory="1" ToolTip="Name"></asp:TextBox>
                        </p>
                    </div>
                    <div class="clear_both"></div>
                    <div class="col-lg-3 col-md-3 col-sm-5 col-xs-4 customer_txt" globalize="ML_SrvcRqust_txtbx_Contact">
                        <%= CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_Contact") %>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-7 col-xs-8 customer_txt_name">
                        <p>
                            <asp:TextBox ID="txtPhoneNumber" globalize="ML_SrvcRqust_txtbx_Contact" placeholder="Mobile Number" runat="server" mandatory="1" ToolTip="Mobile Number"
                                ClientIDMode="Static" MaxLength="14" autocomplete="off"></asp:TextBox>
                        </p>
                    </div>
                    <div class="clear_both"></div>
                </div>
                <div id="div_56" style="display: none;" class="div_reason">
                    <div class="col-lg-3 col-md-3 col-sm-5 col-xs-4 customer_txt" globalize="ML_CONNECTME_Lbl_Outage">
                       <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Outage") %>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-7 col-xs-8 customer_txt_name">
                        <p>
                            <asp:DropDownList ID="ddlOutageType" Width="53%" runat="server" ClientIDMode="Static">
                            </asp:DropDownList>
                        </p>
                    </div>
                    <div style="margin-top: 12px; float: left; width: 100%;">
                        <i>  <span id="OutageCauseDescription"></span>
                            <span globalize="ML_CONNECTME_Lbl_PowerInfoSpecific">
                            <p style="padding-left: 0px;">
                                                       <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_PowerInfoSpecific") %>
                            </p>
                        </span>
                        </i>
                        <div class="ConnectMeData" style="width: 100%; clear: both; padding-left: 15px">
                            <asp:TextBox ID="txtOutageComments" class="fulllWidth" runat="server" TextMode="MultiLine" globalize="ML_ConnectMe_OutageCommnt"
                                ClientIDMode="Static" ToolTip="Outage Comments" Style="width: 98%;" onKeyUp="Count(this,500)" onChange="Count(this,500)"></asp:TextBox>
                            <span id="OutageSpan" style="color:#950202; padding-left:3px; font-size: 16px;">*</span>

                      </div>
                    </div>
                    <div class="clear">
                        &nbsp;
                    </div>
                </div>
                <div id="div_59" class="div_reason brokenstreetlight" style="display: none;">
                    <div class="ConnectLabel" style="width: 28%; padding: 6px 0 0 7px; font-weight: normal; line-height: inherit; margin-bottom: 0px;">
                        <i globalize="ML_CONNECTME_Lbl_Status">  <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Status") %></i>
                    </div>
                    <div class="ConnectMeData">
                        <asp:RadioButtonList ID="rdoLightStatus" runat="server" RepeatDirection="Horizontal">
                            <%--<asp:ListItem globalize="ML_SmartJac_b_Off" Value="1" Selected="True"> Off</asp:ListItem>
                            <asp:ListItem globalize="ML_CONNECTME_ListItem_Flickering" Value="2"> Flickering</asp:ListItem>
                            <asp:ListItem globalize="ML_CONNECTME_ListItem_StaysOn" Value="3"> Stays On</asp:ListItem>--%>
                        </asp:RadioButtonList>
                    </div>
                    <div class="ConnectLabel" style="width: 28%; padding: 6px 0 0 7px; font-weight: normal; line-height: inherit; margin-bottom: 0px;">
                        <i globalize="ML_CONNECTME_Lbl_DamageInfo"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_DamageInfo") %></i>
                    </div>
                    <div class="ConnectMeData">
                        <asp:RadioButtonList ID="rdoVisibleDamage" runat="server" RepeatDirection="Horizontal">
                           <%-- <asp:ListItem globalize="ML_EFFICIENCY_Yes" Value="1" Selected="True">Yes</asp:ListItem>
                            <asp:ListItem globalize="ML_CustomerRegistration_rdb_Poolno" Value="2">No</asp:ListItem>--%>
                        </asp:RadioButtonList>
                    </div>
                    <div class="ConnectLabel" style="width: 41%; padding: 6px 0 0 7px; font-weight: normal; line-height: inherit; margin-bottom: 0px;">
                        <i globalize="ML_CONNECTME_Lbl_DamageDesc"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_DamageDesc") %></i>
                    </div>
                    <div class="ConnectMeData" style="width: 97%;">
                        <asp:TextBox globalize="ML_CONNECTME_Txt_DamageDesc" placeholder="Damage Description" ID="txtDamageDescription" runat="server" Style="width: 98%; margin: 0 0 0 24px;" TextMode="MultiLine" ClientIDMode="Static" MaxLength="50"></asp:TextBox>
                    </div>
                    <div class="ConnectLabel" style="width: 41%; padding: 6px 0 0 7px; font-weight: normal; line-height: inherit; margin-bottom: 0px;">
                        <i globalize="ML_CONNECTME_Lbl_EnterPole"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_EnterPole") %></i>
                    </div>
                    <div class="ConnectMeData" style="width: 97%;">
                        <asp:TextBox globalize="ML_CONNECTME_Txt_PoleNum" ID="txtPoleNumber" placeholder="Pole Number" runat="server" Style="width: 100%; margin: 0 0 0 24px;"></asp:TextBox>
                    </div>
                </div>
                <div id="div_closeststreet" class="div_reason" style="display: none;">
                    <div class="secServiceTitle" globalize="ML_CONNECTME_Lbl_TellLocation" style="display: none;">
                        <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_TellLocation") %>
                    </div>
                    <i globalize="ML_CONNECTME_Lbl_RepairInfo">  <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_RepairInfo") %>
                    </i>
                    <div class="secServiceTitle" style="margin-bottom: 14px;" globalize="ML_CONNECTME_Lbl_Location">
                        <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Location") %>
                    </div>

                    <div class="col-lg-3 col-md-3 col-sm-5 col-xs-4 customer_txt" globalize="ML_CONNECTME_Lbl_Street">
                        <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Street") %>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-7 col-xs-8 customer_txt_name">
                        <p>
                            <asp:TextBox ID="txtStreetNumber" MaxLength="5" globalize="ML_CONNECTME_Txt_Street" ClientIDMode="Static" placeholder="Street Number" runat="server" ToolTip="Street Number"></asp:TextBox>
                        </p>
                    </div>
                    <div class="clearfix"></div>
                    <div class="col-lg-3 col-md-3 col-sm-5 col-xs-4 customer_txt" globalize="ML_SrvcRqust_p_StrretName">
                          <%= CustomerPortal.Translator.T("ML_SrvcRqust_p_StrretName") %>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-7 col-xs-8 customer_txt_name">
                        <p>
                            <asp:TextBox ID="txtStreetName" MaxLength="35" globalize="ML_CONNECTME_Txt_StreetNme" ClientIDMode="Static" placeholder="Street Name" runat="server" ToolTip="Street Name" mandatory="1"></asp:TextBox>
                        </p>
                    </div>
                    <div class="clearfix"></div>
                    <div class="col-lg-3 col-md-3 col-sm-5 col-xs-4 customer_txt" globalize="ML_CONNECTME_Lbl_Apt">
                       <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Apt") %>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-7 col-xs-8 customer_txt_name">
                        <p>
                            <asp:TextBox ID="txtUnit" MaxLength="5" globalize="ML_CONNECTME_Txt_Apt" ClientIDMode="Static" runat="server" placeholder="Unit" ToolTip="Apt/Unit"></asp:TextBox>
                        </p>
                    </div>
                    <div class="clearfix"></div>
                    <div class="col-lg-3 col-md-3 col-sm-5 col-xs-4 customer_txt" globalize="ML_Register_Lbl_City">
                          <%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-7 col-xs-8 customer_txt_name">
                        <p>
                            <asp:TextBox ID="txtCity" MaxLength="35" globalize="ML_CONNECTME_Txt_City" ClientIDMode="Static" runat="server" ToolTip="City" placeholder="City" mandatory="1" onkeypress="return IsAlpha(event);"></asp:TextBox>
                        </p>
                    </div>
                    <div class="clearfix"></div>
                    <div class="col-lg-3 col-md-3 col-sm-5 col-xs-4 customer_txt" globalize="ML_CONNECTME_Lbl_Zip">
                         <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Zip") %>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-7 col-xs-8 customer_txt_name">
                        <p>
                            <asp:TextBox ID="txtZipcode" globalize="ML_CONNECTME_Txt_Zip" ClientIDMode="Static" runat="server" placeholder="Zip" ToolTip="Zip" mandatory="1" TextMode="SingleLine" class="box ZipCode"
                                value="" size="30" MaxLength="5" onkeypress="return IsNumeric(event);"></asp:TextBox>
                            <uc1:ZipCode runat="server" class="box" title="Zip Code" ID="ZipCode2" ClientIDMode="Static" />
                        </p>
                    </div>
                    <div class="clearfix"></div>
                    <div class="col-lg-3 col-md-3 col-sm-5 col-xs-4 customer_txt" globalize="ML_CONNECTME_Lbl_NearestStreet">
                        <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_NearestStreet") %>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-7 col-xs-8 customer_txt_name">
                        <p>
                            <asp:TextBox ID="txtNearestCrossStreet" MaxLength="35" runat="server" ToolTip="Nearest Cross Street" ClientIDMode="Static"
                                mandatory="1" globalize="ML_CONNECTME_Txt_NearestStreet" placeholder="Nearest Cross Street"></asp:TextBox>
                        </p>
                    </div>
                    <div class="clearfix"></div>
                    <div class="ConnectLabel" style="clear: both; font-weight: normal; line-height: inherit; margin: 10px 0; padding: 0; width: 100%;">
                        <i><span globalize="ML_CONNECTME_Lbl_LocationDesc">
                            <p style="padding-left: 0px;" globalize="ML_CONNECTME_Lbl_LocationDesc"> <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_LocationDesc") %> </p>
                        </span></i>
                    </div>
                    <div class="ConnectMeData" style="width: 100%; clear: both; padding-left: 15px;">
                        <asp:TextBox  globalize="ML_CONNECTME_Txt_LocDesc"  class="fulllWidth" ID="txtLocationDescription" runat="server" TextMode="MultiLine" ClientIDMode="Static" onKeyUp="Count(this,120)" onChange="Count(this,120)" MaxLength="120" Style="width: 98%"></asp:TextBox>
                    </div>
                    <div class="clear_both"></div>

                </div>
                <div id="div_61" class="div_reason brokenstreetlight" style="display: none;">
                    <div class="secServiceTitle" style="margin-bottom: 15px;" globalize="ML_CONNECTME_Lbl_Reporting">
                       <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Reporting") %>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_AddressReporting">
                        <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_AddressReporting") %>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                        <asp:TextBox globalize="ML_CONNECTME_Txt_AddressReporting" MaxLength="100" ID="txtTLocation" placeholder="Address Reporting" runat="server" ToolTip="Address" ClientIDMode="Static"
                            mandatory="1"></asp:TextBox>
                    </div>
                    <div class="clear_both"></div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_AddressReportingDesc">
                       <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_AddressReportingDesc") %>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                        <asp:TextBox globalize="ML_CONNECTME_Txt_AddressReportingDesc" MaxLength="100" placeholder="Address Reporting Desc" ID="txtTDescription" runat="server" ToolTip="Description" ClientIDMode="Static"
                            mandatory="1"></asp:TextBox>
                    </div>
                    <div class="clear_both"></div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_EnergyTheft">
                       <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_EnergyTheft") %>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                        <asp:TextBox ID="txtTDate" globalize="ML_CONNECTME_Txt_DateAddressReporting" placeholder="Date Address Reporting" runat="server" ToolTip="Date energy theft<br>initially began (if known)"
                            ClientIDMode="Static" onblur="javascript:checkdate(document.getElementById('txtTDate'))"></asp:TextBox>
                        <asp:ImageButton CssClass="icon-cal" ID="btnTDate" runat="server" ImageUrl="~/images/Icon-calendar.png" />
                        <ajaxToolkit:CalendarExtender ID="Cal_Date" runat="server" TargetControlID="txtTDate" PopupButtonID="btnTDate"
                            Format="MM/dd/yy" />
                    </div>
                    <div class="clear_both"></div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_PersonName">
                       <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_PersonName") %>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                        <asp:TextBox globalize="ML_CONNECTME_Txt_PersonName" MaxLength="60" ID="txtTName" placeholder="Person Name" runat="server" ClientIDMode="Static" ToolTip="Name of person commiting <br>energy theft (if known)"></asp:TextBox>
                    </div>
                    <div class="clear_both"></div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_AddressPerson">
                        <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_AddressPerson") %>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                        <asp:TextBox ID="txtTAddress" placeholder="Person Address" MaxLength="100" ClientIDMode="Static" globalize="ML_CONNECTME_Txt_AddressPerson" runat="server" ToolTip="Address of person commiting<br> energy theft (if known)"></asp:TextBox>
                    </div>
                    <div class="clear_both"></div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_OccupationPerson">
                        <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_OccupationPerson") %>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                        <asp:TextBox ID="txtTOccupation" MaxLength="30" globalize="ML_CONNECTME_Txt_OccupationPerson" placeholder="Occupation Person" runat="server" ClientIDMode="Static" ToolTip="Occupation of person<br> commiting energy theft (if known)"></asp:TextBox>
                    </div>
                    <div class="clear_both"></div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_OtherPerson">
                         <%= CustomerPortal.Translator.TT_ProductName("ML_CONNECTME_Lbl_OtherPerson") %>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                        <asp:TextBox ID="txtTOther" globalize="ML_CONNECTME_Txt_OtherPerson" MaxLength="100" ClientIDMode="Static" placeholder="Other Participants" runat="server" ToolTip="Other participants, or <br>information SUS should be aware of"></asp:TextBox>
                    </div>
                    <div class="clear">
                        &nbsp;
                    </div>
                    <div class="secServiceTitle" globalize="ML_CONNECTME_Lbl_PartInfo">
                         <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_PartInfo") %>
                    </div>
                    <p style="padding-left: 16px;">
                        <strong globalize="ML_CONNECTME_Lbl_SUSContact"><%= CustomerPortal.Translator.TT_ProductName("ML_CONNECTME_Lbl_SUSContact") %></strong>
                    </p>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_YourName">
                      <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_YourName") %>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                        <asp:TextBox globalize="ML_CONNECTME_Txt_ReporterName" MaxLength="60" placeholder="Your Name" ID="txtReporterName" runat="server" ClientIDMode="Static" ToolTip="Your Name"></asp:TextBox>
                    </div>
                    <div class="clear_both"></div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_ReporterAddress">
                         <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_ReporterAddress") %>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                        <asp:TextBox ID="txtReporterAddress" MaxLength="100" globalize="ML_CONNECTME_Txt_ReporterAddress" placeholder="Reporter Address" runat="server" ClientIDMode="Static" ToolTip="Your Address"></asp:TextBox>
                    </div>
                    <div class="clear_both"></div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_ReporterPhone">
                        <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_ReporterPhone") %>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">                     
                        <asp:TextBox ID="txtReporterPhone" globalize="ML_CONNECTME_Txt_ReporterPhone" placeholder="Reporter Phone" runat="server" ToolTip="Your Telephone" MaxLength="14"
                            ClientIDMode="Static" onblur="javascript:validPhone(this.value,'txtReporterPhone');"></asp:TextBox>
                    </div>
                    <div class="clear_both"></div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_ReporterEmail">
                        <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_ReporterEmail") %>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                        <asp:TextBox ID="txtReporterEmail" globalize="ML_CONNECTME_Txt_ReporterEmail" ClientIDMode="Static" placeholder="Reporter Email" runat="server" ToolTip="Your Email" mandatory="1" value="" MaxLength="50">
                        </asp:TextBox>
                    </div>
                    <div class="secServiceTitle" style="margin-bottom: 15px;" globalize="ML_CONNECTME_Lbl_Relation">
                         <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Relation") %>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12  customer_txt_name">
                        <asp:TextBox ID="txtSuspectRelation" MaxLength="20" globalize="ML_CONNECTME_Txt_Relation" placeholder="Suspect Relation" runat="server" ToolTip="Your Relation to Suspect" ClientIDMode="Static" Style="width: 98%; margin-left: 10px; margin-top: 5px;"></asp:TextBox>
                    </div>
                    <div class="secServiceTitle" globalize="ML_CONNECTME_Lbl_Service" style="margin-bottom: 12px;">
                         <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Service") %>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_Register_Lbl_EmailId">
                         <%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                        <asp:TextBox ID="txtEmailAddress" placeholder="Email ID" globalize="ML_SrvcRqust_txtbx_emailAdd" runat="server" ToolTip="Email ID" mandatory="1" value="" MaxLength="50" ClientIDMode="Static"></asp:TextBox>
                    </div>
                </div>
                <div id="div_47" class="div_reason" style="display: none;">

                    <div class="secServiceTitle" globalize="ML_CONNECTME_Lbl_Form">
                          <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Form") %>
                    </div>
                    <div class="ConnectLabel" globalize="ML_CONNECTME_Lbl_Program">
                         <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Program") %>
                    </div>
                    <div class="ConnectLabelColon">
                        :
                    </div>
                    <div class="ConnectMeData">
                        <asp:Label globalize="ML_CONNECTME_Lbl_ProgramVal" ID="lbldrprogram" runat="server" ToolTip="DR Program" ClientIDMode="Static"></asp:Label>
                    </div>
                    <div class="ConnectLabel" globalize="ML_CONNECTME_Lbl_Terms">
                        <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Terms") %>
                    </div>
                    <div class="ConnectLabelColon">
                        :
                    </div>
                    <div class="ConnectMeData">
                        <asp:Label ID="lbltermsconditions" globalize="ML_CONNECTME_Lbl_TermsVal" runat="server" ClientIDMode="Static" ToolTip="Terms and Conditions"></asp:Label>
                    </div>
                    <div class="secServiceTitle" globalize="ML_CONNECTME_Lbl_ApplicantInfo">
                          <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_ApplicantInfo") %>
                    </div>
                    <div class="ConnectLabel" globalize="ML_CONNECTME_Lbl_ApplicantContact">
                         <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_ApplicantContact") %>
                    </div>
                    <div class="ConnectLabelColon">
                        :
                    </div>
                    <div class="ConnectMeData">
                        <asp:TextBox ID="txtcontectname" placeholder="Contect Name" globalize="ML_CONNECTME_Txt_ApplicantContactVal" ClientIDMode="Static" runat="server" MaxLength="90" ToolTip="Contact Name"></asp:TextBox>
                    </div>
                    <div class="ConnectLabel" globalize="ML_SrvcRqust_div_MailAdd">
                        <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_MailAdd") %>
                    </div>
                    <div class="ConnectLabelColon">
                        :
                    </div>
                    <div class="ConnectMeData">
                        <asp:TextBox ID="txtmallingaddress" placeholder="Mailling Address" ClientIDMode="Static" runat="server" globalize="ML_CONNECTME_Txt_MailAddVal" ToolTip="Mailling Address" MaxLength="100"></asp:TextBox>
                    </div>

                    <div class="ConnectLabel" globalize="ML_Register_Lbl_City">
                          <%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %>
                    </div>
                    <div class="ConnectLabelColon">
                        :
                    </div>
                    <div class="ConnectMeData">
                        <asp:TextBox ID="txtDRcity" placeholder="City" runat="server" globalize="ML_CONNECTME_Txt_MailCityVal" ClientIDMode="Static" ToolTip="City" MaxLength="35"></asp:TextBox>
                    </div>

                    <div class="ConnectLabel" globalize="ML_SrvcRqust_p_State">
                        <%= CustomerPortal.Translator.T("ML_SrvcRqust_p_State") %>
                    </div>
                    <div class="ConnectLabelColon">
                        :
                    </div>
                    <div class="ConnectMeData">
                        <asp:TextBox ID="txtstate" placeholder="State" runat="server" ClientIDMode="Static" globalize="ML_CONNECTME_Txt_MailStateVal" ToolTip="State" MaxLength="35"></asp:TextBox>
                    </div>

                    <div class="ConnectLabel" globalize="ML_SrvcRqust_P_ZipCode">
                        <%= CustomerPortal.Translator.T("ML_SrvcRqust_P_ZipCode") %>
                    </div>
                    <div class="ConnectLabelColon">
                        :
                    </div>
                    <div class="ConnectMeData">
                        <asp:TextBox ID="txtzip" globalize="ML_CONNECTME_Txt_MailZipVal" ClientIDMode="Static" placeholder="Zip" runat="server" ToolTip="Zip" TextMode="SingleLine" class="box" value="" size="30" mandatory="1" MaxLength="5" onkeypress="return IsNumeric(event);"></asp:TextBox>
                    </div>

                    <div class="ConnectLabel" globalize="ML_SrvcRqust_txtbx_Contact">
                        <%= CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_Contact") %>
                    </div>
                    <div class="ConnectLabelColon">
                        :
                    </div>
                    <div class="ConnectMeData">
                      
                        <asp:TextBox ID="txtphoneNo" globalize="ML_CustomerRegistration_Lbl_MobileNum" placeholder="Phone Number" runat="server" mandatory="1" ToolTip="Phone Number"
                            ClientIDMode="Static" MaxLength="14"></asp:TextBox>
                    </div>

                    <div class="ConnectLabel" globalize="ML_Register_Lbl_EmailId">
                                                <%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %>
                    </div>
                    <div class="ConnectLabelColon">
                        :
                    </div>
                    <div class="ConnectMeData">
                        <asp:TextBox ID="txtemailId" globalize="ML_Register_Lbl_EmailId" runat="server" ToolTip="Email ID" mandatory="1" placeholder="Ex:abc@smartusys.com" value="" MaxLength="50" ClientIDMode="Static"></asp:TextBox>
                    </div>
                    <div class="secServiceTitle" globalize="ML_CONNECTME_Lbl_MailDisclaimer">
                        <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_MailDisclaimer") %>
                    </div>
                    <div class="ConnectMeData" style="width: 98%; float: right;">
                        <asp:Label ID="lbldisclamer" globalize="ML_CONNECTME_Lbl_MailDisclaimerVal" runat="server" ClientIDMode="Static" ToolTip="DISCLAIMER"></asp:Label>
                    </div>


                </div>
            </div>

            <div id="divSign" class="sigPad" style="display: none">
                <div class="ConnectLabel" globalize="ML_CONNECTME_Lbl_Signature" style="width: 32.3%;">
                     <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Signature") %>
                </div>
                
                <div class="sig sigWrapper" style="width:29%;">
                    <div class="typed"></div>
                    <canvas class="pad" width="198" height="55"></canvas>
                    <input type="hidden" name="output" class="output" runat="server" id="signval" globalize="ML_CONNECTME_Lbl_Signature" clientidmode="Static" mandatory="1" validatemessage="Signature" />
                    <div class="clearButton" globalize="ML_CONNECTME_Lbl_Clear"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Clear") %></div>
                </div>
            </div>



        </div>
   
        <div id="divTwitter" style="display: none; width: 98%; padding-left: 1%; text-align: center;" class="social">
            <a class="twitter-timeline" style="margin: auto;" data-dnt="true" data-href="<%=twitterurl %>"
                data-widget-id="<%=twitterwidgetid %>" data-link-color="#79a412" data-related="twitterapi,twitter"
                data-aria-polite="assertive" lang="EN" globalize="ML_CONNECTME_Anchor_Tweets"><%= CustomerPortal.Translator.TT_ProductName("ML_CONNECTME_Anchor_Tweets") %></a>
            <script>
                !function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + "://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } }(document, "script", "twitter-wjs");
            </script>
        </div>

       <%-- <div id="divTwitter1" style="display: none; width: 98%; padding-left: 1%; text-align: center;" class="social">
     <ul>
         <li ng-repeat="x in records">
             <h4>{{x}}</h4>
         </li>
     </ul>
              
        </div>--%>


        <div style="overflow-x: hidden; text-align: center; padding: 10px 50px 0; display: none" id="divFacebook" class="social">

            <div class="fb-page" data-href="<%=fburl %>" data-width="2000" data-height="680" data-small-header="false" data-adapt-container-width="false" data-hide-cover="false" data-show-facepile="true" data-show-posts="true">
                <div class="fb-xfbml-parse-ignore">
                    <blockquote cite="<%=fburl%>">
                    </blockquote>

                </div>
            </div>


            <script type="text/javascript">
                (function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));

            </script>
        </div>
        <div id="divYoutube" style="display: none; width: 98%; padding-top: 11px; padding-left: 2%;" class="social">
            <script type="text/javascript">
                $(document).ready(function () {
                    goClicked();
                });
            </script>
            <div id="youmax"></div>
            <script type="text/javascript">
                function goClicked() {
                    $('#youmax').empty().append(' loading ...');
                    $('#youmax').youmax({
                        apiKey: 'AIzaSyAjQndtEz0FlPGI_hpSD4XCdW7FDsscvH0',
                        youTubeChannelURL: "<%=youtubeurl%>",//$('#youTubeChannelUrl').val(),

                        youTubePlaylistURL: $('#youTubePlaylistUrl').val(),
                        youmaxDefaultTab: "UPLOADS",
                        youmaxColumns: 3,
                        showVideoInLightbox: false,
                        maxResults: 15,
                    });
                }

            </script>
        </div>



    </div>


    <div class="setting_save_box">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 customer-padding n_bt">
            <div class="buttons_area">
                 <div class="div_disclaimer" style="float: left; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeDisclaimer) %>!important">
                    <b><span globalize="ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer" style="color: red; float: left;" inputtype="" validatemessage="Disclaimer" title="Disclaimer"><%= CustomerPortal.Translator.T("ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer") %></span>
                        <span style="color: red;">:</span></b>
                    <span class="cls_disclaimer" globalize="ML_ConnectMe_Disclaimer"><%= CustomerPortal.Translator.TT_ProductName("ML_ConnectMe_Disclaimer") %></span>
                </div>

                <input type="button" id="BtnSubmitComment" globalize="ML_CONNECTME_BTN_Submit" value='<%# CustomerPortal.Translator.T("ML_CONNECTME_BTN_Submit") %>' class="submit-button" />
            </div>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 customer-padding connect_email_box" style="border-top: 1px solid #ccc; margin-top: 10px; padding-top: 12px !important;">
            <div class="customer-details" style="padding: 0 !important; margin: 0; border: 0px;">
                <ul class="custo_details_1">
                    <li id="liCService" runat="server"><b><span  id="lblCustomer"><%= CustomerPortal.Translator.T("ML_CONNECTME_Span_CustServ") %> </span>&nbsp;</b>
                        <asp:Label globalize="ML_CONNECTME_Span_CustServtext"  ID="lblCService" Text="N/A" runat="server"></asp:Label></li>
                    <li id="liemail1" runat="server"><b><span><%= CustomerPortal.Translator.T("ML_CONNECTME_Span_Email") %> </span>&nbsp;</b>
                        <asp:Label  globalize="ML_CONNECTME_Span_Emailtext" ID="lblEmail" runat="server" Text="N/A"></asp:Label></li>
                  </ul>
                <ul class="custo_details_2">
                    <li  id="liBEnq" runat="server"><b><span><%= CustomerPortal.Translator.T("ML_CONNECTME_Span_CustServ2") %>  </span>&nbsp;</b>
                        <asp:Label globalize="ML_CONNECTME_Span_BillingQueries" ID="lblBEnq" Text="N/A" runat="server"></asp:Label></li>
                    <li id="liemail2" runat="server"><b><span><%= CustomerPortal.Translator.T("ML_CONNECTME_Span_Email") %> </span>&nbsp;</b>
                        <asp:Label globalize="ML_CONNECTME_Span_EmailBillingtext" ID="lblBEmail" runat="server"></asp:Label></li>
                </ul>
            </div>
        </div>
    </div>


    <script type="text/javascript">
        $(document).ready(function () {

            $('.addressDropdown').change(function () {
                $('#hdnFlag').val('load');
            });


        });
    </script>

    <script src="js/script_sign/jquery.signaturepad.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            if ($('.sigPad').css('display') == 'block') {
                $('.sigPad').signaturePad({ drawOnly: true });
            }
            //           $('.sigPad').getSignatureString();
            //Set Default Div Load
            <% if (CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeContactUs, false) == false)
               { %>
            <% if (CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeFacebook, false) == true)
               {%>

            $('#divConnectMe').hide();
            $(".social").hide();
            $("#divFacebook").show();
            $(".n_bt").hide();
            $(".hgt").toggleClass("hgt_new");
            $(".hgt").removeClass("hgt");
            $(".setting_save_box").css("padding-top", "0").css("border-top", "0");
            $('.nav_left li.active').removeClass('active');
            $('.icon_fb').addClass('active');
            <% }%>
               <%else if (CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeTwitter, false) == true)
               {%>
            $('#divConnectMe').hide();
            $(".social").hide();
            $("#divTwitter").show();
            $(".n_bt").hide();
            $(".hgt").toggleClass("hgt_new");
            $(".hgt").removeClass("hgt");
            $(".setting_save_box").css("padding-top", "0").css("border-top", "0");
            $('.nav_left li.active').removeClass('active');
            $('.icon_twitter').addClass('active');
            <%}%>
             <%else if (CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeYoutube, false) == true)
               {%>
            $('#divConnectMe').hide();
            $(".social").hide();
            $("#divYoutube").show();
            $(".n_bt").hide();
            $(".hgt").toggleClass("hgt_new");
            $(".hgt").removeClass("hgt");
            $(".setting_save_box").css("padding-top", "0").css("border-top", "0");
            $('.nav_left li.active').removeClass('active');
            $('.icon_youtube_new').addClass('active');
            <%}%>
          
            <% } %>
            <% else
               { %>
            $('#divConnectMe').show();
            <% } %>

            //END
        });

        var MaxLength = 120;
        $("#txtLocationDescription").keypress(function (e) {
            if ($(this).val().length >= MaxLength) {
                e.preventDefault();
            }
        });
        var MaxLengths = 50;
        $("#txtDamageDescription").keypress(function (e) {
            if ($(this).val().length >= MaxLength) {
                e.preventDefault();
            }
        });

        $(".icon_fb").click(function () {
            $(".social").hide();
            $("#divFacebook").show();
            $(".n_bt").hide();
            $(".hgt").toggleClass("hgt_new");
            $(".hgt").removeClass("hgt");
            $(".setting_save_box").css("padding-top", "0").css("border-top", "0");
        });

        $(".icon_twitter").click(function () {
            $(".social").hide();
            $("#divTwitter").show();
            $(".n_bt").hide();
            $(".hgt").toggleClass("hgt_new");
            $(".hgt").removeClass("hgt");
            $(".setting_save_box").css("padding-top", "0").css("border-top", "0");
        });
        $(".icon_youtube_new").click(function () {
            $(".social").hide();
            $("#divYoutube").show();
            $(".n_bt").hide();
            $(".hgt").toggleClass("hgt_new");
            $(".hgt").removeClass("hgt");//#divTwitter

            $(".setting_save_box").css("padding-top", "0").css("border-top", "0");
        });
        $(".nav_left").on('click', 'li', function () {
            $('.nav_left li.active').removeClass('active');
            $(this).addClass('active');
        })

    </script>
    <asp:HiddenField ID="hdnNotification" ClientIDMode="Static"  runat="server" />
    <script src="js/script_sign/json2.min.js" type="text/javascript"></script>
    <span globalize="ML_Footer_a_ConnectMe" id="titletext" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_Footer_a_ConnectMe") %></span>
    <span globalize="ML_SERVICES_Txt_ExceedLimit" id="IDfilesize" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_SERVICES_Txt_ExceedLimit") %></span>
<%--    <span globalize="ML_Connectme_ErrMsg_FileExt" id="IDfileExt" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_Connectme_ErrMsg_FileExt") %></span>--%>
    <span globalize="ML_Connectme_ErrMsg_ValidEmailID" id="IDEmail" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_Connectme_ErrMsg_ValidEmailID") %></span>
    <span globalize="ML_Connectme_ErrMsg_Morethan" id="IDMoreText" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_Connectme_ErrMsg_Morethan") %></span>
    <span globalize="ML_Connectme_ErrMsg_NoCharacters" id="IDNoCharacters" style="display: none;"><%= CustomerPortal.Translator.TT_ProductName("ML_Connectme_ErrMsg_NoCharacters") %></span>
    <span globalize="ML_Connectme_ErrMsg_SignedDocument" id="IDSignedDocument" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_Connectme_ErrMsg_SignedDocument") %></span>
    <span globalize="ML_Connectme_ErrMsg_FileFailed" id="IDFileFailed" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_Connectme_ErrMsg_FileFailed") %></span>
    <span globalize="ML_Connectme_ErrMsg_Comment_Failed" id="IDCommentFailed" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_Connectme_ErrMsg_Comment_Failed") %></span>
    <span globalize="ML_Connectme_ErrMsg_MessageReceived" id="IDMessageReceived" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_Connectme_ErrMsg_MessageReceived") %></span>
    <span globalize="ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo" id="AllMandatory" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo") %></span>
    <span globalize="ML_ConnectMe_ChooseFile" id="lblChooseFile" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_ConnectMe_ChooseFile") %></span>
    <span globalize="ML_SrvcRqust_i_NoFile" id="lblNoFile" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_SrvcRqust_i_NoFile") %></span>
    <span globalize="ML_SvngLdr_lstItem_Select" id="ddlSelect" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_SvngLdr_lstItem_Select") %></span>
    <asp:HiddenField ID="hdnPromotionId" Value="0" runat="server" ClientIDMode="Static" />
    <span globalize="ML_SERVICE_Place_Mandatory" id="subjectmandatory" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_SERVICE_Place_Mandatory") %></span>
    <span globalize="ML_Outage_span_Report_Outage" id="subjectReportOutage" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_Outage_span_Report_Outage") %></span>
    <span globalize="ML_BILLING_Navigation_ConnectMe" id="subjectBillingQuery" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_BILLING_Navigation_ConnectMe") %></span>
	<span globalize="ML_SrvcRqust_i_NoFile" id="ML_SrvcRqust_i_NoFile" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_SrvcRqust_i_NoFile") %></span>
</asp:Content>
