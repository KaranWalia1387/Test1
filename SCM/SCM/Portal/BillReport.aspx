<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BillReport.aspx.cs" Inherits="CustomerPortal.BillReport" Title="Bill View" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="js/Translator.js" type="text/javascript"></script>
    <style>
        table , table tr{
        background-color:#E6E6E6!important;
        margin-top:2px;

        }
                             body,form {
                               margin-top: -8px;
                               /*background-color:black;*/
                             }
                             .logorow tr td {
                             width:33.33%;
                             padding:1px 2px 1px 2px;
                                text-align:center
                             }
                                 .logorow tr td div {
                                 text-align:left;
                                 width:80%;
                                 margin-left:10%;
                                 }
                             .fr {
                             float:right;
                             }
                             .bodyrow {
                             margin-top:3px;
                             }
                             .fntheader {
                             font-size:25px;
                             
                             }
                             .tlt {
                             font-size:18px;
                            font-weight:bold;
                             }
    </style>
    <link rel="shortcut icon" type="image/x-icon" href="<%#string.Format("{0}/images/favicon.ico",CustomerPortal.SessionAccessor.BaseUrl)%>" />
</head><body><form id="form1" runat="server">
    <div style="display:none">
    <table style="width:100%;background-color:#E6E6E6;margin-top:2px" class="  width:33.33%; padding:1px 2px 1px 2px;text-align:center">
        <tr><td style="border-right:solid thin"><img src="http://smartusys.com/images/SUS_Logo.png" /></td><td style="border-right:solid thin">
            <div style=" text-align:left;width:80%; margin-left:10%;" globalize="ML_BILLING_Lbl_CompanyAddr"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_CompanyAddr") %></div></td><td style=""><span style="float:right;vertical-align:top;" class="fntheader" globalize="ML_BILLING_Lbl_CurrentStatement">Your current statement</span><br /><br />
    <asp:Label ID="lbl_name" runat="server" Text="" CssClass="fr" globalize="ML_BILLING_Lbl_CurrentName"></asp:Label>
                            </td></tr>

    </table>
        
          <table style="width:100%;background-color:#E6E6E6;" class="bodyrow">
        <tr><td style="width:67%">
            <div style="margin-left:5%">
                <span class="fntheader" globalize="ML_BILLING_Lbl_AccountInfo"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_AccountInfo") %></span><br />
                <span class="tlt" globalize="ML_BILLING_Lbl_CustomerAccount"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_CustomerAccount") %> </span>
                <asp:Label ID="lbl_customeraccount" runat="server" globalize="ML_BILLING_Lbl_CustomerAccountVal" Text=""></asp:Label><br /><br />
                  <span class="tlt" globalize="ML_BILLING_Lbl_ServiceAccount"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_ServiceAccount") %></span>
                <asp:Label ID="lbl_serviceaccount" runat="server" globalize="ML_BILLING_Lbl_ServiceAccountVal" Text=""></asp:Label><br />
                <br /><br />
                  <span class="tlt">Service Account : </span>
                <asp:Label ID="Label3" runat="server" Text=""></asp:Label><br />

            </div>

            </td><td style=""><span style="float:right;vertical-align:top;">For Billing and service inquiries call<br />
(909) 217-3344, 24 hrs a day, 7 days a week.<br />
Date bill prepared: July 15, 2014</span><br /><br />
                            </td></tr>
            <tr>
                <td colspan="2">
                      <hr />
                </td>
            </tr>
                 <tr><td style="width:67%">
            <div style="margin-left:5%">
                <span class="fntheader" globalize="ML_BILLING_Lbl_AccountSummary"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_AccountSummary") %></span><br />
                <span class="tlt" globalize="ML_BILLING_Lbl_BillAmount"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_BillAmount") %></span>
                <asp:Label ID="Label1" runat="server" Text="" globalize="ML_BILLING_Lbl_Label1" ></asp:Label><br />
                  <span class="tlt" globalize="ML_BILLING_Lbl_PaymentDate"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_PaymentDate") %> </span>
                <asp:Label ID="Label4" runat="server" Text="" globalize="ML_BILLING_Lbl_Label4"></asp:Label>
                <hr />
                <br />
                  <span class="tlt" globalize="ML_BILLING_Lbl_FwdBalance"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_FwdBalance") %></span>
                <asp:Label ID="Label5" runat="server" Text="" globalize="ML_BILLING_Lbl_Label5"></asp:Label><br />
                 <span class="tlt" globalize="ML_BILLING_Lbl_NewCharges"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_NewCharges") %> </span>
                <asp:Label ID="Label6" runat="server" Text="" globalize="ML_BILLING_Lbl_Label6"></asp:Label><br />
                <hr />
                  <span class="tlt" globalize="ML_BILLING_Lbl_TotalAmount"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_TotalAmount") %> </span>
            </div>

            </td><td style=""><span style="float:right;vertical-align:top;">For Billing and service inquiries call<br />
(909) 217-3344, 24 hrs a day, 7 days a week.<br />
Date bill prepared: July 15, 2014</span><br /><br />
                            </td></tr>
            <tr> <td colspan="2">
                      <hr />
                </td></tr>
                  <tr><td style="width:67%">
            <div style="margin-left:5%">
                <span class="fntheader" globalize="ML_BILLING_Lbl_Header"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_Header") %> </span><br />
                <span class="tlt" globalize="ML_BILLING_Lbl_AmountLastBill"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_AmountLastBill") %>  </span>
                <asp:Label ID="Label7" runat="server" Text="" globalize="ML_BILLING_Lbl_Label7" ></asp:Label><br />
                  <span globalize="ML_BILLING_Lbl_MeterDuration" ><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_MeterDuration") %>  </span>
                <asp:Label ID="Label8" runat="server" Text="" globalize="ML_BILLING_Lbl_Label8"></asp:Label>
                <hr />
                <br />
                  <span class="tlt" globalize="ML_BILLING_Lbl_TotalElectricity"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_TotalElectricity") %>  </span>
                <asp:Label ID="Label9" runat="server" Text="" globalize="ML_BILLING_Lbl_Label9"></asp:Label><br />
                <hr />
                 <span class="tlt" globalize="ML_BILLING_Lbl_AvgElectricity"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_AvgElectricity") %> </span>
                <asp:Label ID="Label10" runat="server" Text="" globalize="ML_BILLING_Lbl_Label10"></asp:Label><br />
                <hr />
                  <span class="tlt" globalize="ML_BILLING_Lbl_ElectricityUsage"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_ElectricityUsage") %> </span>
            </div>
                      <div style="margin-left:5%" id="chart">


                      </div>

            </td><td style=""><span style="float:right;vertical-align:top;">For Billing and service inquiries call<br />
(909) 217-3344, 24 hrs a day, 7 days a week.<br />
Date bill prepared: July 15, 2014</span><br /><br />
                            </td></tr>
    </table>
    </div>
    </form>
</body>
</html>
