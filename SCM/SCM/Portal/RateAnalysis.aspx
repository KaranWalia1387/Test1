<%@ Page Title="Rate Analysis" Language="C#" MasterPageFile="~/BillingMaster.Master" AutoEventWireup="true" CodeBehind="RateAnalysis.aspx.cs" Inherits="CustomerPortal.RateAnalysis" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <script src="js/highchart_js/highcharts.js"></script>
    <script src="js/highchart_js/common-chart.js"></script>
    <script src="js/common.js"></script>
    <script src="js/RateAnalysis.js"></script>
    <style type="text/css">
        .profile-details table td, th {
            padding: 7px 10px 6px;
            width: 20%;
            border: 1px solid #ccc;
            border-spacing: 0px;
            border-collapse: collapse;
        }

        .acc_inner_box_1 .profile-details:nth-child(odd) {
            background: #f4f4f4;
        }

        .acc_inner_box_1 .profile-details input {
            margin-top: 1px;
        }

        .profile-details {
            padding: 0px 0 0px 2.8%;
            width: 100%;
            line-height: 37px;
            height: 40px;
        }

        .my_account_table .profile-details {
            line-height: normal;
            height: auto;
        }

        .inner-right-sub {
            padding: 0px;
        }

        .my_acc_tbl table tr td {
            text-align: left;
            padding: 10px 15px;
        }

        .my_acc_tbl table tr:nth-child(odd) {
            background: #f4f4f4;
        }

        .my_acc_tbl table tr:first-child td, .my_acc_tbl table tr:first-child th {
            font-weight: bold;
        }

        .radio_btn1 {
            position: relative;
            top: 2px;
            margin-right: 10px !important;
        }

        .energy_mid_box .right_content_box {
            height: 97%;
        }

        .mailingaddressclose {
            color: #000;
            float: right;
            font-size: 21px;
            font-weight: 700;
            line-height: 1;
            opacity: 1 !important;
            text-shadow: 0 1px 0 #fff;
            background: none;
            border: none;
            float: right;
        }

        .cmpr_value_box {
            font-size: 25px;
            padding: 20px;
            text-align: center;
        }
        .default-address-1
        {
            width:100%;
        }
        .address-1
        {
            width:100%;
        }
    </style>
    
    <input type="hidden" class="activeli_list" value="rateanalysis" />
    <div class="right_content_box" style="position: relative; width: 100%;">
        <div class="top_conte_box_mob" style="height: 90%; overflow: auto;">
            <div class="inner-right-sub acc_inner_box_1" style="border: 0px;">
                <div id="rowpowerplan" runat="server" class="profile-details ">
                    <div class="selector-text" globalize="ML_SETTING_Lbl_PowerPlan"><%= CustomerPortal.Translator.T("ML_SETTING_Lbl_PowerPlan") %> </div>
                    <div class="power-plan-selector">
                        <asp:Label ID="lblpowerplan" runat="server" Text="1"></asp:Label>
                    </div>
                </div>
                <div id="rowwaterplan" runat="server" class="profile-details water_plain">
                    <div class="selector-text" globalize="ML_Setting_Lbl_WaterPlan"><%= CustomerPortal.Translator.T("ML_Setting_Lbl_WaterPlan") %>  </div>
                    <div class="radio-button-box">
                        <asp:Label ID="lblwaterplan" runat="server" Text="2" Style="margin-top: 0px;"></asp:Label>
                    </div>
                </div>
                <div id="rowgasplan" runat="server" class="profile-details water_plain ">
                    <div class="selector-text" globalize="ML_Setting_Lbl_GasPlan"><%= CustomerPortal.Translator.T("ML_Setting_Lbl_GasPlan") %> </div>
                    <div class="radio-button-box">
                        <asp:Label ID="lblgasplan" runat="server" Text="3" Style="margin-top: 0px;"></asp:Label>
                    </div>
                </div>

                <div id="rowevplan" runat="server" class="divevplan profile-details water_plain">
                    <div id="divevplan" runat="server" class="selector-text" globalize="ML_SETTING_Lbl_ElectricVehiclePlan"><%= CustomerPortal.Translator.T("ML_SETTING_Lbl_ElectricVehiclePlan") %></div>
                    <div class="power-plan-selector">
                        <asp:Label ID="lblevplan" runat="server" Text="4"></asp:Label>
                    </div>
                </div>
            </div>

            <div class="inner-right-sub" style="background: #ccc; padding-bottom: 0px; padding-top: 1px; height: 38px; border: 0px;">
                <div class="profile-details">
                    <div class="inner-address">
                        <b><span globalize="ML_WU_Lbl_Rates"><%= CustomerPortal.Translator.T("ML_WU_Lbl_Rates") %></span></b>
                    </div>
                </div>
            </div>
            <div class="inner-right-sub" style="border: 0px;">

                <div class="my_account_table">
                    <div class="profile-details my_acc_tbl pro_add" style="padding: 0">
                        <table class="table">
                            <tr>
                                <td style="width: 23%;padding-left:25px;" globalize="ML_Billing_lbl_CompareRates"><%= CustomerPortal.Translator.T("ML_Billing_lbl_CompareRates") %></td>
                                <td style="width: 80%;" globalize="ML_CONNECTME_Lbl_Desc"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Desc") %></td>
                            </tr>
                            <%--<tr>
                                <td>
                                    <input type="radio" class="radio_btn1" />
                                    Rate Name</td>
                                <td>Dummy Text</td>
                                <td>
                                    <img src="images/icon_mark.png" alt="edit" class="editcommaddress" data-toggle="modal" data-target="#divAddressPopup_123" /></td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" class="radio_btn1" />
                                    Rate Name</td>
                                <td>Dummy Text</td>
                                <td>
                                    <img src="images/icon_mark.png" alt="edit" class="editcommaddress" data-toggle="modal" data-target="#divAddressPopup_123" /></td>
                            </tr>--%>
                            <asp:Repeater ID="rpt_RatesList" runat="server" ClientIDMode="Static">
                                <ItemTemplate>
                                    <tr>
                                        <td style="width: 25%;">
                                            <div class="default-address-1">
                                                <input style="margin-left: 14px;" id="rdobtnPlan_<%#Eval("PlanId") %>" type="radio" name="plan" />
                                                <label class="planName" id="lblPlanName_<%#Eval("PlanId") %>"><%#Eval("PlanName") %></label>
                                            </div>
                                        </td>
                                        <td style="width: 75%;">
                                            <div class="address-1">
                                                <label id="lblPlanDesc_<%#Eval("PlanId") %>"><%#Eval("Description") %></label>
                                            </div>
                                        </td>
                                    </tr>
                                    <div class="clear_both"></div>
                                </ItemTemplate>
                            </asp:Repeater>
                        </table>

                        <%-- <table border="0" width="100%">
                            <tr>
                                <td style="border-bottom: 0px; width: 25%;">
                                    <div class="default-address-1">
                                        <strong><span globalize="ML_MYACCOUNT_Lbl_Default"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_Default") %></span></strong>
                                    </div>
                                </td>
                                <td style="border-bottom: 0px; width: 75%;">
                                    <div class="address-1">
                                        <strong><span globalize="ML_CONNECTME_Lbl_Desc"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Desc") %></span></strong>
                                    </div>
                                </td>
                            </tr>
                            <asp:Repeater ID="rpt_RatesList" runat="server" ClientIDMode="Static">
                                <ItemTemplate>
                                    <tr>
                                        <td style="width: 25%;">
                                            <div class="default-address-1">
                                                <input style="margin-left: 14px;" id="rdobtnProperty_<%#Eval("AddressId") %>" type="radio" name="properties" onchange="propertyChange(this);" defaultpayment="<%#Eval("DefaultPayID")%>:<%#Eval("DefaultPayType")%>" value='<%#Eval("AccountNumber")%>:<%#Eval("AddressId")%>' class="address-button-billing rdbdefault" <%#string.IsNullOrEmpty(Eval("DefaultAddressId").ToString())?"":"checked='checked'"%> />
                                            </div>
                                        </td>
                                        <td style="width: 75%;">
                                            <div class="address-1">
                                                <label id="lblpropertyaddress_<%#Eval("AddressId") %>"><%#Eval("Properties") %></label>
                                            </div>
                                        </td>
                                    </tr>
                                    <div class="clear_both"></div>
                                </ItemTemplate>
                            </asp:Repeater>
                        </table>--%>
                    </div>
                </div>
            </div>
        </div>

        <div class="setting_save_box">
            <div class="buttons_area">
                <a href="#" id="btnShow"  class="submit-button" globalize="ML_Compare_Spending_Screen_Title_Compare_Spending"><%= CustomerPortal.Translator.T("ML_Compare_Spending_Screen_Title_Compare_Spending") %></a>
            </div>
        </div>
    </div>
    <div id="divRatePopup" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div id="divAddressPopup_ChangePass" class="modal-content editMain">
                <div class="modal-header">
                    <button type="button" class="mailingaddressclose" data-dismiss="modal">
                        <img src="images/cross-icon.png" /></button>
                    <h4 class="modal-title" globalize="ML_Billing_lbl_RateComparison"><%= CustomerPortal.Translator.T("ML_Billing_lbl_RateComparison") %></h4>
                </div>
                <div class="modal-body" style="padding-bottom: 0px;">
                    <div class="cmpr_value_box">
                        <div id="chartAnalysis">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      <span globalize="ML_Msg_Billing_SelectRate" id="compRates" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_Billing_SelectRate") %></span>
    <span globalize="ML_Msg_Billing_CompareRate" id="YCompRate" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_Billing_CompareRate") %></span>
</asp:Content>
