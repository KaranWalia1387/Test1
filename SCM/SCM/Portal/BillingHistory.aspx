<%@ Page Title="Billing History" Language="C#" MasterPageFile="~/BillingMaster.Master"
    AutoEventWireup="true" CodeBehind="BillingHistory.aspx.cs"
    Inherits="CustomerPortal.BillingHistory" %>

<%@ MasterType VirtualPath="~/BillingMaster.Master" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit"
    TagPrefix="ajaxToolkit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody"
    runat="server">
    <input type="hidden" class="activeli_list" value="billing" />
    <asp:ScriptManager runat="server"></asp:ScriptManager>
    <%: System.Web.Optimization.Styles.Render("~/Content/cssBillingHistory") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsBillingHistory") %>
    <script type="text/javascript">

        var jsonData = [];
         <% if (Session.Count != 0 && ViewState["Data"] != null)
        { %>
        jsonData = <%=Newtonsoft.Json.JsonConvert.SerializeObject(ViewState["Data"], Newtonsoft.Json.Formatting.Indented)%>
             languageCode = '<%=Session["LanguageCode"].ToString() %>'

            <% } %>
        $(document).ready(function () {
            $('.active').removeClass('active');
            $('.icon_history').addClass('active');
            $('#btnSubmit').val($('#spansubmit').text());
        });
    </script>
    <style>
       
        #billQuery_contact .modal-content {
            padding-bottom: 0px !important;
        }

        #billQuery_contact .cancel-button {
            margin-bottom: 0 !important;
        }

        #billQuery_contact .popup_area .bottom_area_home {
            padding: 10px 10px 0px 10px !important;
            overflow: hidden !important;
        }

        .energy_mid_box .right_content_box {
            height: 97% !important;
        }

        #wugrid > div {
            height: 472px !important;
        }

        .w2ui-grid {
            overflow: visible !important;
        }
    </style>

    <div id="jqxBillingHistory" style="display: none;"></div>
    <div id="wugrid" style="height: 100% !important; overflow: auto; width: 100% !important; z-index: 99;">
    </div>
    <div class="billing_area_div_grid_history" id="divbilldetails"
        display="none" runat="server" clientidmode="Static">
    </div>
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 customer-padding"
        style="height: 10%; display: none;">
        <div class="history_bottom_area">
            <div class="history_bill">
                <ul>
                    <li>
                        <a class="lnkAll" href="#" globalize="ML_Notification_Services_All">
                            <%= CustomerPortal.Translator.T("ML_Notification_Services_All") %></a>
                    </li>
                    <li>
                        <a class="lnkBilling" href="#" globalize="ML_Title_Billing">
                            <%= CustomerPortal.Translator.T("ML_Title_Billing") %></a>
                    </li>
                    <li>
                        <a class="lnkPayments" href="#" globalize="ML_Billing_Span_Payment">
                            <%= CustomerPortal.Translator.T("ML_Billing_Span_Payment") %></a>
                    </li>
                </ul>
            </div>
            <div class="from_to_selection_date">
                <div class="form smart_time_box" style="width: 40%; text-align: right;">
                    <label globalize="ML_Settings_Lbl_From" style="float: left; padding-top: 5px;">
                        <%= CustomerPortal.Translator.T("ML_Settings_Lbl_From") %></label>
                    <div style="float: right; width: 80%">
                        <asp:TextBox ID="txtFromdate" runat="server" placeholder="From date"
                            globalize="ML_BillingHistory_Txt_FromDate" Style="width: 76% !important; padding: 3px 15px;"></asp:TextBox>

                        <asp:ImageButton ID="frmDt" runat="server" ImageUrl="~/images/icon-cal.png"
                            Style="float: left; padding: 0px 0px 6px 3px;" />
                        <%--Bug 5373 END--%>
                        <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server"
                            TargetControlID="txtFromdate" PopupButtonID="frmDt"
                            Format="MM/dd/yyyy" OnClientShown="onCalendarShown" />
                    </div>
                </div>
                <div class="to smart_time_box" style="text-align: right; width: 60%; margin-left: 0px; float: right">
                    <label style="float: left; padding-right: 2%; padding-left: 1%; padding-top: 5px;"
                        globalize="ML_Settings_Lbl_To">
                        <%= CustomerPortal.Translator.T("ML_Settings_Lbl_To") %></label>
                    <asp:TextBox ID="txtTodate" runat="server" placeholder="To Date"
                        globalize="ML_BillingHistory_Txt_ToDate" Style="width: 43% !important; padding: 3px 15px;"></asp:TextBox>
                    <%--Bug 5373 Start--%>
                    <asp:ImageButton ID="toDt" runat="server" ImageUrl="~/images/icon-cal.png"
                        Style="float: left; padding: 0px 0px 6px 3px;" />
                    <%--Bug 5373 END--%>
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server"
                        TargetControlID="txtTodate"
                        Format="MM/dd/yyyy" OnClientShown="onCalendarShown1"
                        PopupButtonID="toDt" />
                    <input type="submit" class="submit-button" id="submitDate"
                        globalize="ML_BillingHistory_Button_Go" value='<%# CustomerPortal.Translator.T("ML_BillingHistory_Button_Go") %>' />
                </div>
            </div>
        </div>
    </div>
    <input type="hidden" runat="server" id="hdnFromText" />
    <input type="hidden" runat="server" id="hdnToText" />
    <span globalize="ML_Title_Billing_History" id="titletext"
        style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Billing_History") %></span>
    <span globalize="ML_BillingHistory_GridTransactionDate"
        id="GridTransactiondate" style="display: none"><%= CustomerPortal.Translator.T("ML_BillingHistory_GridTransactionDate") %></span>
    <span globalize="ML_BillingHistory_GridTransactionAmount"
        id="GridTransactionAmount" style="display: none"><%= CustomerPortal.Translator.T("ML_BillingHistory_GridTransactionAmount") %></span>
    <span globalize="ML_BillingHistory_GridStatus" id="GridStatus"
        style="display: none"><%= CustomerPortal.Translator.T("ML_BillingHistory_GridStatus") %></span>
    <span globalize="ML_BillingHistory_Span_ViewBill" id="GridBill"
        style="display: none"><%= CustomerPortal.Translator.T("ML_BillingHistory_Span_ViewBill") %></span>
    <span globalize="ML_Master_btn_Submit" id="spansubmit" style="display: none"><%= CustomerPortal.Translator.T("ML_Master_btn_Submit") %></span>
    <span globalize="ML_BillingHistory_GridLinkView" id="GridLink_view"
        style="display: none"><%= CustomerPortal.Translator.T("ML_BillingHistory_GridLinkView") %></span>
</asp:Content>
