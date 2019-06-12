<%@ Page Title="" Language="C#" MasterPageFile="Master.Master" AutoEventWireup="true"
    CodeBehind="payment-history.aspx.cs" Inherits="CustomerPortal.history_payment" %>

<%@ Register Src="UserControls/Dispute_Bill.ascx" TagName="Dispute_Bill" TagPrefix="uc1" %>
<%@ Register Src="UserControls/Electric_bill_discount.ascx" TagName="Electric_bill_discount"
    TagPrefix="uc2" %>
<%@ Register Src="UserControls/NotificationUserControl.ascx" TagName="Notifiocations"
    TagPrefix="uc5" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Payment History </title>
    <style type="text/css">
        table#TableBill
        {
            width: 100%;
        }
        .SmartHomeStatus
        {
            width: 102px;
            cursor: pointer;
        }
        .TableCellContainerContent
        {
            height: 162px;
        }
        
        .green
        {
            color: Green; font-weight:bold;
        }
        .red
        {
            color: Red; font-weight:bold;
        }
        
        .BillLabelData
        {
            width: 345px;
            float: left;
            text-align: left;
            padding-left: 10px;
            margin-top: 3px;
        }
        .BillLabelDataValue
        {
            width: 170px;
            float: left;
            text-align: right;
            padding-right: 15px;
            margin-top: 3px;
        }
        .PopupDiv
        {
            display: none;
            background-color: White;
            width: 500px;
            height: 300px;
            border: 1px solid #b5b5b5;
            -webkit-border-radius: 10px;
            text-align: left;
            -moz-border-radius: 10px;
            border-radius: 10px;
            padding: 15px 25px;
            margin: 5px;
        }
        
        .PopupDiv input[type="text"], .PopupDiv input[type="password"]
        {
            margin-left: 0px;
            border: 1px solid #B5B5B5;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            padding: 6px 0px 6px 6px;
            width: 190px;
            font-size: .9em;
        }
        
        
        .PopupDiv select
        {
            width: 198px;
        }
        #divPopup label
        {
            cursor: pointer;
            margin-right: 10px;
        }
        .PopupDiv h3
        {
            font-size: 20px;
            text-align: center;
            padding-bottom: 5px;
            border-bottom: 1px solid #dadada;
            margin-bottom: 5px;
        }
        
        .popupLabel
        {
            float: left;
            width: 120px;
            padding: 22px 5px 0px 5px;
            margin-left: 20px;
        }
        .popupData
        {
            float: left;
            width: 220px;
            padding: 15px 5px 0px 5px;
        }
        
        .popupLabelcard
        {
            float: left;
            width: 100px;
            padding: 14px 5px 0px 5px !important;
            margin-left: 20px;
        }
         .QuestionMark{height:15px;}
        .popupDatacard
        {
            float: left;
            width: 100px;
            padding: 14px 5px 0px 5px !important;
        }
        
        .popupDatacardNew
        {
            float: left;
            width: 200px;
            padding: 14px 25px 0px 5px !important;
        }
        
        .SmallData
        {
            float: left;
            width: 50px;
            padding: 0px;
        }
        .PopupDiv .SmallData input[type="text"]
        {
            width: 40px;
        }
        .SmallLabel
        {
            float: left;
            width: 90px;
            padding: 7px 5px 0px 5px;
        }
        .popCloseBtn
        {
            margin-top: -10px;
            margin-right: -20px;
        }
    </style>
    <script src="js/popup.js" type="text/javascript"></script>
    <script type="text/javascript">

        $(document).ready(function () {
            $('#watercalculation').click(function () {
                Popup.showModal('divPopup', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
            });

            $('#BtnClose').click(function () {
                Popup.hide('divPopup');
            });
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <table id="TableBill">
        <tr>
            <td width="25%">
                <uc2:Electric_bill_discount ID="Electric_bill_discount1" runat="server" />
                <%--<uc5:notifiocations ID="Notifiocations1" runat="server" />--%>
            </td>
            <td width="50%" rowspan="2">
                <div class="TableCellContainer">
                    <div class="TableCellContainerHeader">
                        <div class="BillHistoryIcon">
                            &nbsp;</div>
                        <div class="TableCellHeaderTitle">
                            Payment History</div>

                             <%--    nirmal--%>
                            <div style="float: right; padding-top: 0px;">
                            <div style="color: #666; padding-bottom: 3px; text-align:right;">
                                Service Account #:&nbsp;<asp:Label ID="lblPowerAccNo" runat="server"></asp:Label></div>
                            <div style="color: #666;">
                                Property Address :
                                <asp:Label ID="CurrentAddress" runat="server"></asp:Label>
                            </div>
                            
                        </div>
                       
                    </div>
                    <div class="TableCellContainerContent" style="height: 420px; overflow-y: scroll;">
                        <div id="divPower" style="padding-bottom: 10px; margin-bottom: 10px;">
                            <div style="text-align: center; margin-top: 10px; font-size: 1em; font-weight: bold;">
                                <div style="width: 180px; float: left; text-align: left; padding-left: 15px; padding-top: 7px; display:none;">
                                    <asp:Label ID="lblAccountNumber" runat="server"></asp:Label></div>
                                <div style="width: 370px; float: right; text-align: right; padding-right: 25px; padding-top: 7px;
                                    font-weight: bold;">
                                    Billing Period :&nbsp;
                                    <asp:Label ID="lblBillingPeriod" runat="server"></asp:Label></div>
                                <div class="clear">
                                    &nbsp;</div>
                                <div style="width: 300px; float: right; text-align: right; padding-right: 25px; padding-top: 7px;
                                    display: none;">
                                    <asp:Label ID="lblPowerCharges" runat="server"></asp:Label>
                                </div>
                                <div class="clear">
                                    &nbsp;</div>
                            </div>
                            <div style="text-align: center; margin-top: 0px; font-size: 1em; font-weight: normal;
                                color: #a0a0a0; padding-left: 30px;">
                                <div style="text-align: left; padding-left: 0px;">
                                    <div id="divbilldetails" runat="server">
                                    </div>
                                    <div class="clear">
                                        &nbsp;</div>
                                    <div style="margin-top: 15px; padding-left: 35px;">
                                        <div class="BillLabelData">
                                            Total Bill This Period
                                        </div>
                                        <div class="BillLabelDataValue">
                                          <asp:Label ID="lblBillAmount" runat="server"></asp:Label>
                                        </div>
                                        <div class="BillLabelData">
                                           Previous Balance Due
                                        </div>
                                        <div class="BillLabelDataValue">
                                             <asp:Label ID="lblTotalAmount" runat="server"></asp:Label>
                                        </div>
                                        <div class="BillLabelData">
                                           Late Payment/Penalty Charges
                                        </div>
                                        <div class="BillLabelDataValue">
                                         <asp:Label ID="lblLastPayment" runat="server"></asp:Label>


                                           
                                        </div>
                                        
                                        <div class="BillLabelData">
                                            Amount Paid This Period
                                        </div>
                                        <div class="BillLabelDataValue">
                                            <asp:Label ID="lblTotalPaid" runat="server"></asp:Label>
                                        </div>
                                        <div class="BillLabelData">
                                            Paid Date
                                        </div>
                                        <div class="BillLabelDataValue">
                                            <asp:Label ID="lblPaidDate" runat="server"></asp:Label>
                                        </div>

                                        <div class="BillLabelData" style="font-weight: bold; color: #666">
                                            Remaining Balance Due
                                        </div>
                                        <div class="BillLabelDataValue">
                                             <asp:Label ID="lblCurrentBill" runat="server"></asp:Label>
                                        </div>
                                        <div class="clear">
                                            &nbsp;</div>
                                    </div>
                                    <div class="clear">
                                        &nbsp;</div>
                                </div>
                                <div class="clear">
                                    &nbsp;</div>
                            </div>
                        </div>
                    </div>
                    <div class="TableCellContainerFooter" style="padding: 0px;">
                    <div style="height: 35px; float: right; margin-right: 20px; line-height:33px; width: 210px; display:none;">
                            <a href="https://get.adobe.com/reader/"><label style="font-weight: bold; float:left; cursor:pointer;">
                                Download Acrobat Reader</label>
                            <img src="images/logo_adobe.png" style="margin-top:4px;" height="28px" width="40px" /></a>
                        </div>

                        <div style="height: 35px; float: right; margin-right: 20px; line-height:33px; width: 94px;">
                            <label style="font-weight: bold; float:left;">
                                View Bill</label>
                            <asp:ImageButton ID="btnExporttoExcel" runat="server" ImageUrl="images/Icon_pdf.png" style="margin-top:4px;"
                                OnClick="btnExporttoExcel_Click" />
                        </div>
                        
                        <div class="clear">
                                    &nbsp;</div>
                    </div>
                </div>
            </td>
            <td width="25%">
                <uc1:Dispute_Bill ID="Dispute_Bill1" runat="server" />
            </td>
        </tr>
        <tr>
            <td width="25%">
                <div class="TableCellContainer">
                    <div class="TableCellContainerHeader">
                        <div class="BillingIcon">
                            &nbsp;</div>
                        <div class="TableCellHeaderTitle">
                            <a href="BillingDashboard.aspx">Utility Bill</a></div>
                    </div>
                    <div class="TableCellContainerContent">
                        <div style="text-align: center; margin-top: 20px; font-size: 1em; font-weight: bold;">
                            <div style="width: 140px; float: left; text-align: left; padding-left: 15px;">
                                Current Total Bill Due</div>
                            <div style="width: 140px; float: left; text-align: right; padding-right: 15px; font-weight: normal;">
                                <asp:Label ID="lblPowerPayment" runat="server"></asp:Label>
                            </div>
                            <div class="clear">
                                &nbsp;</div>
                        </div>
                    </div>
                    <div class="TableCellContainerFooter">
                        &nbsp;</div>
                </div>
            </td>
            <td width="25%">
                <div class="TableCellContainer">
                    <div class="TableCellContainerHeader">
                        <div class="UsageIcon">
                            &nbsp;</div>
                        <div class="TableCellHeaderTitle">
                            <a href="power-usage.aspx">Usage</a></div>
                    </div>
                    <div class="TableCellContainerContent">
                        <div id="MyAccountUsage" style="height: 175px; text-align: left;">
                            <table width="100%" border="0" class="AccountDetails">
                                <tbody>
                                    <tr>
                                        <td class="labels" style="width: 190px;">
                                            Current Power Usage:
                                        </td>
                                        <td class="Value">
                                            <asp:Label ID="lblPoCuUs" runat="server" Text="" Style="text-align: right; font-weight: normal;"></asp:Label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="TableCellContainerFooter">
                        &nbsp;</div>
                </div>
            </td>
        </tr>
    </table>
    <div id="divPopup" class="PopupDiv" style="display: none; height: 230px; position: absolute;
        visibility: visible; top: 80px; z-index: 103; width: 500px;">
        <input type="button" id="BtnClose" value="" class="popCloseBtn" />
        <h3 globalize="ML_BILLDASHBOARD_h4_H1Calculation">
            How is this calculated?</h3>
        <div id="divwaterrates" runat="server">
        </div>
    </div>
    <script type="text/javascript">
        $(function () {
            $(".TableCellHeaderIcon img").hover(
        function () {
            var arr = $(this).attr('src').split('.');
            var temp = arr[0];
            //$(this).attr('src', temp + '_ro.png');
        },
        function () {
            //$(this).attr('src', temp - '_ro.png'+'.png');
        });
        });

    </script>
</asp:Content>
