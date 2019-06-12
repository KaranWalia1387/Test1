<%@ Page Title="Payment" Language="C#" MasterPageFile="~/BillingMaster.Master" AutoEventWireup="true" CodeBehind="Payment.aspx.cs" Inherits="CustomerPortal.Payment" %>


<%@ Register Src="~/UserControls/BillDisclaimer.ascx" TagPrefix="uc1" TagName="BillDisclaimer" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
     <style type="text/css">
         .all_bill_box .right-area-tabular {
             display: inline-block;
             float: right;
             margin: 0 auto;
             padding: 7px;
             text-align: left;
             width: 30%;
         }

         .right-area-alt {
             overflow: hidden;
         }

         .right-area-tabular {
             display: inline-block;
             float: right;
             margin: 0 auto;
             padding: 1%;
             text-align: right;
             width: 36% !important;
         }

         .right_bill_box {
             float: left;
             margin-left: 2%;
             min-height: 200px;
             height:200px;
             overflow-y:auto;
             width: 98%;
         }
         #disclaimer{
             margin-top:120px
         }

         @media (min-width:768px) and (max-width:991px) {
             .all_bill_box .right-area-tabular {
                 padding: 7px 0 !important;
             }

             input[type="image"] {
                 width: 19px !important;
                 margin: 3px 0 0 2px !important;
             }
         }

         .ajax__calendar .ajax__calendar_container {
             margin-left: 0 !important;
             margin-top: 0 !important;
         }

         .justifytext {
             width: 90%;
             text-align: center;
             margin: 2px auto;
             overflow-x: visible;
         }






             .justifytext span {
                 margin: 0;
                 padding: 0;
                 display: block;
                 font-size: 17px;
                 color: #393939;
             }


             .justifytext table td {
                 padding: 6px 23px 6px 23px;
                 font-size: 13px;
                 text-align: left;
             }

                 .justifytext table td span {
                     font-size: 13px;
                 }

                     .justifytext table td span.boldtext {
                         font-size: 12px;
                         font-weight: bold;
                     }

             .justifytext table th {
                 padding: 8px 23px 8px 13px;
             }

             .justifytext tr td {
                 border: 1px solid #ececec;
             }


             .justifytext tr th {
                 background: #f4f4f4;
             }

         .justifytext {
             width: 90%;
             text-align: center;
             margin: 20px auto;
             overflow-x: visible;
         }

             .justifytext h2 {
                 margin: 25px 0px 3px;
                 padding: 0;
                 font-weight: bold;
                 font-size: 36px;
                 color: #828282;
             }

             .justifytext b {
                 margin: 5px 0px 20px;
                 padding: 0;
                 display: block;
                 font-weight: bold;
                 font-size: 26px;
                 color: #393939;
             }

         #page_loader {
             width: 100%;
             height: 100%;
             background: rgba(0, 0, 0, .9);
             display: none;
             position: fixed;
             font-family: 'MyriadPro-Regular';
             top: 0px;
             z-index: 999999;
             bottom: 0;
             opacity: 1;
             left: 0;
             right: 0;
         }

         .page_loader_with_icon {
             background-image: url(images/loader.gif);
             background-repeat: no-repeat;
             background-position: center center;
             display: block;
             height: 100px;
             width: 130px;
             margin: 0 auto;
         }

         .page_load_container {
             position: fixed;
             top: 0;
             left: 0;
             right: 0;
             bottom: 0;
             margin: auto;
             width: 48%;
             height: 250px;
             text-align: center;
             color: #040404;
             background: #fff;
             border-radius: 8px;
             padding: 23px 0px;
         }


         #page_loader b {
             margin: 0;
             padding: 26px 0px 7px;
             font-size: 26px;
             color: #2a3e66;
             display: block;
             text-align: center;
         }

         #page_loader p {
             margin: 0;
             padding: 10px 0px 0px;
             display: block;
             font-size: 19px;
             color: #2d2e2e;
             text-align: center;
         }
         .loader-none{
             display:none;
         }
     </style>
    <script type="text/javascript">
        var ResultTable = {};
        $(function () {
            $("#hrefPrint").click(function () {
                // Print the DIV.
                $("#divthankpay").print();
                return (false);
            });
        });
        $(document).ready(function () {

            window.onload = function () {

                window.onbeforeunload = function () {
                    return 'Do not press back button or Refresh....';
                };

            };


            var paytypeid = $('#<%=hdnCreditOrBank.ClientID %>').val();
            var payid = $('#<%=hdnPayId.ClientID %>').val();
            var userprofileid = $('#<%=hdnUserProfileId.ClientID %>').val();
            var secLength = 0;
            if ($('#<%=hdnCreditOrBank.ClientID %>').val() == "1") {
                GetCardTypeInner(payid);
            } else {

            }

            fillDetails(payid, paytypeid);
            function validatefields() {
                //Added by khushbu kansal for bug id 11615
                var expiry_date = $('#expiry')[0].textContent;
                var exp_date = expiry_date.split('/')
                var cur_date = new Date();
                var cur_month = cur_date.getMonth();
                var cur_year = cur_date.getFullYear().toString().substr(2, 2);

                if ($('#securityCode').val().length < secLength) {                   
                    error.showerror('#securityCode', $('#EnterSecCode').text());
                    //  alert('Please enter ' + secLength + ' digits security code.');
                    // alert('Please enter 3 to 5 digits security code.');
                    $('#securityCode').focus();
                    return false;

                }
                else {
                if (exp_date[1] > cur_year) {
                    return true;
                }
                else {
                    if (exp_date[0] > cur_month) {
                        return true;
                    }
                    else {
                        //alert($('#ExpiredMsg').text());
                        toastr.error($('#ExpiredMsg').text());
                        return false;

                    }
                }
                }
            }
            $('#btnOK').click(function () {

                var url = "BillDashboard.aspx";

                location.href = url;
            });


            $('#CancelBtn').click(function () {
                <%-- var parameters = "&Water=" + $('#<%=hdnWaterAmount.ClientID %>').val() + "&Electric=" + $('#<%=hdnPowerAmount.ClientID %>').val() + "&Solid=" + $('#<%=hdnSolidAmount.ClientID %>').val() + "&Gas=" + $('#<%=hdnGasAmount.ClientID %>').val();
                //var passedString = btoa(parameters);
                var passedString = common.GetEncryptedData(parameters).value;
                var url = "BillPayment.aspx?qs=1" + "&val=" + passedString;--%>
                //Modified due to Bug 9036
                window.onbeforeunload = null;
                var url = "BillDashboard.aspx";

                location.href = url;
            });
            $('#ConfirmBtn').click(function () {
                window.onbeforeunload = null;
                var amount = 0;
                var PaymentMode = '<%=CustomerPortal.SessionAccessor.PaymentMode%>';
                var str = $('#<%=lblBillingID.ClientID %>').text() + '|' + payid + '|' + paytypeid + '|';
                var powerAmount;
                var waterAmount;
                var solidAmount;
                var gasAmount;

                if (paytypeid == 1 && validatefields()) {                   
                    if ($('#<%=amountAuthorised.ClientID %>').text() != '') {
                        if ($('#<%=amountAuthorised.ClientID %>').text() <= 0) {
                            //alert('Please enter valid amount.');
                            error.showerror('#<%=amountAuthorised.ClientID %>', 'Please enter valid amount.');
                            return false;
                        } else {


                            if ($('#<%=hdnPowerAmount.ClientID %>').val() != '') {
                                str += getFormatedValue($('#<%=hdnPowerAmount.ClientID %>').val()) + '|';
                                powerAmount = parseFloat($('#<%=hdnPowerAmount.ClientID %>').val()).toFixed(2);
                                amount = parseFloat(amount + powerAmount);
                            } else {
                                str += "0.00" + '|';
                            }
                            if ($('#<%=hdnWaterAmount.ClientID %>').val() != '') {
                                str += getFormatedValue($('#<%=hdnWaterAmount.ClientID %>').val()) + '|';
                                waterAmount = parseFloat($('#<%=hdnWaterAmount.ClientID %>').val()).toFixed(2);
                                amount = parseFloat(amount + waterAmount);
                            } else {
                                str += "0.00" + '|';
                            }
                            if ($('#<%=hdnSolidAmount.ClientID %>').val() != '') {
                                str += getFormatedValue($('#<%=hdnSolidAmount.ClientID %>').val()) + '|';
                                solidAmount = parseFloat($('#<%=hdnSolidAmount.ClientID %>').val()).toFixed(2);
                                amount = parseFloat(amount + solidAmount);
                            } else {
                                str += "0.00" + '|';
                            }
                            //#5896-Start
                            if ($('#<%=hdnGasAmount.ClientID %>').val() != '') {
                                str += getFormatedValue($('#<%=hdnGasAmount.ClientID %>').val());
                                gasAmount = parseFloat($('#<%=hdnGasAmount.ClientID %>').val()).toFixed(2);
                                amount = parseFloat(amount + gasAmount);
                            } else {
                                str += "0.00";
                            }
                            //#5896-End
                        }
                    } else {
                        //alert('Please enter amount.');
                        error.showerror('#<%=amountAuthorised.ClientID %>', 'Please enter amount.');
                        $('#<%=amountAuthorised.ClientID %>').focus();
                        return false;

                    }

                } else if (paytypeid == "2") {
                    if ($('#<%=amountAuthorised.ClientID %>').text() != '') {
                        if ($('#<%=amountAuthorised.ClientID %>').text() <= 0) {
                            // alert('Please enter valid amount.');
                            error.showerror('#<%=amountAuthorised.ClientID %>', 'Please enter valid amount.');
                                return false;
                                $("#div1").hide();
                            } else {
                                if ($('#<%=hdnPowerAmount.ClientID %>').val() != '') {
                                    str += $('#<%=hdnPowerAmount.ClientID %>').val() + '|';
                            } else {
                                str += 0 + '|';
                            }
                            if ($('#<%=hdnWaterAmount.ClientID %>').val() != '') {
                                    str += $('#<%=hdnWaterAmount.ClientID %>').val() + '|';
                            } else {
                                str += 0 + '|';
                            }
                            if ($('#<%=hdnSolidAmount.ClientID %>').val() != '') {
                                    str += $('#<%=hdnSolidAmount.ClientID %>').val() + '|';
                                } else {
                                    str += 0 + '|';
                                }
                                //#5896-Start
                                if ($('#<%=hdnGasAmount.ClientID %>').val() != '') {
                                    str += $('#<%=hdnGasAmount.ClientID %>').val();
                                } else {
                                    str += 0;
                                }
                                //#5896-End
                                if ($('#<%=hdnPowerAmount.ClientID %>').val() != '') {
                                    powerAmount = parseFloat($('#<%=hdnPowerAmount.ClientID %>').val());
                                    amount = parseFloat(amount + powerAmount);
                                }
                                if ($('#<%=hdnWaterAmount.ClientID %>').val() != '') {
                                    waterAmount = parseFloat($('#<%=hdnWaterAmount.ClientID %>').val());
                                amount = parseFloat(amount + waterAmount);
                            }
                            if ($('#<%=hdnSolidAmount.ClientID %>').val() != '') {
                                    solidAmount = parseFloat($('#<%=hdnSolidAmount.ClientID %>').val());
                                amount = parseFloat(amount + solidAmount);
                            }
                                //#5896-Start
                            if ($('#<%=hdnGasAmount.ClientID %>').val() != '') {
                                    gasAmount = parseFloat($('#<%=hdnGasAmount.ClientID %>').val());
                                amount = parseFloat(amount + gasAmount);
                            }
                                //#5896-End
                        }
                    } else {
                        //alert('Please enter amount.');
                        error.showerror('#<%=amountAuthorised.ClientID %>', 'Please enter amount.');
                        $('#<%=amountAuthorised.ClientID %>').focus();
                        return false;

                    }
                } else {

                    return false;
                }

                var authAmt = parseFloat($("#amountAuthorised").text());
                var maxBillAmt = parseFloat($('#hdndrMaxbilling').val());
                if (authAmt > maxBillAmt) {
                    //w2alert($("#spnMaxPaymentAmtMsg").text() + ' ' + $('#hdndrMaxbilling').val());
                    toastr.warning($("#spnMaxPaymentAmtMsg").text() + ' $' + $('#hdndrMaxbilling').val());
                    return;
                }

                //loader.showloader(); 
                $("#div1").show();
                $('#todayDate').text($('#txtScheduleDate').val());
                str += "|" + $('#txtScheduleDate').val();
                str += "|" + userprofileid;


                str += "|" + $('#cardNumber').text();
                if (paytypeid == 1)
                    str += "|" + $('#securityCode').val();
                //  var result = BillPayment.PayBill(str).value;
                //alert(result);
                loader.showloader();
                var parameter = {
                    str: str
                };

                $.ajax({
                    type: "POST",
                    url: "BillPayment.aspx/PayBill",
                    data: JSON.stringify(parameter),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError,
                    async: true
                });
                function OnSuccess(data, status) {
                    loader.hideloader();
                    data = data.d;
                    var resultdata = $.parseJSON(data);
                    ConvertData(resultdata)
                    if (ResultTable.Tables[0] != null) {


                        //Added for multilingual purpose

                        var dt = new Date();
                        var date = ((dt.getMonth() + 1) > 10 ? (dt.getMonth() + 1) : "0" + (dt.getMonth() + 1)) + "/" + (dt.getDate() > 10 ? dt.getDate() : "0" + dt.getDate()) + "/" + dt.getFullYear()
                        var ampm = dt.getDate() >= "12" ? "PM" : "AM";
                        var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

                        //End Comment
                        //$('#lblTransactionID').text(result.Rows[0]["transactionid"]);
                        if (ResultTable.Tables[0].Rows["Status"] != '0') {

                            $("#div1").hide();
                            $('#changeText').text($('#PayProcessing').text());
                            $('#divthankpay').show();
                            $('#disclaimer').hide();
                            $('#ConfirmBtn').hide();
                            $('#CancelBtn').hide();
                            $('#securityCode').attr('readonly', 'readonly');
                            $('.total_bills').hide();
                            $('#btnOK').show();
                            $('.buttons_area').hide();
                            if (PaymentMode == 2) {

                                if (ResultTable.Tables[0].Rows["Status"] == '1') {
                                    $('#lblTransactionID').text(ResultTable.Tables[0].Rows["Transactionid"]);
                                    $('#lblPayDate').text(ResultTable.Tables[0].Rows["Date"]);
                                    $('#lblAmount').text(ResultTable.Tables[0].Rows["Amount"]);
                                    $('#lblTransactionFees').text(ResultTable.Tables[0].Rows["AmtSurcharge"]);
                                    $('#lblTotal').text(ResultTable.Tables[0].Rows["AmtTotal"]);
                                }
                                else {
                                    if (ResultTable.Tables[0] != null) {
                                        //w2alert(ResultTable.Tables[0].Rows["message"].toString());
                                        toastr.error($('#TransFailed').text())
                                    }
                                }

                            }
                            else if (PaymentMode == 0) {

                                if (ResultTable.Tables[0].Rows["Status"] == '1') {

                                    //var left = totalamount - amount;
                                    var totalamount = $('#<%=hdnTPAmount.ClientID %>').val();
                                    //var left =getFormatedValue(totalamount - amount); 
                                    var left = ResultTable.Tables[0].Rows["RemainingBalance"];
                                    if (left > 0) {
                                        $('#lblBalanceleft').attr('class', 'red');
                                        $('#lblBalanceleft').text('$' + left);
                                    } else if (left < 0) {
                                        $('#lblBalanceleft').attr('class', 'green');
                                        $('#lblBalanceleft').text('$' + left + ' CR');
                                    } else {
                                        $('#lblBalanceleft').attr('class', 'green');
                                        $('#lblBalanceleft').text('$' + left);
                                    }

                                    var temp = ResultTable.Tables[0].Rows["Message"];
                                    var str = temp.replace("<Balance>", ResultTable.Tables[0].Rows["RemainingBalance"]);
                                    //str = str.replace("DATE", date);   As per BA Message
                                    ////str = str.replace("TIME", time + " " + ampm);
                                    //str = str.replace("TIME", time);
                                    document.getElementById('SuccessfulTrans').innerHTML = str;
                                    $('#' + '<%=imgbtnCalender.ClientID%>').attr('disabled', 'disabled');
                                }
                                else if (ResultTable.Tables[0].Rows["Status"] == '2') {
                                    var msg = ResultTable.Tables[0].Rows["Message"] + ": " + $('#txtScheduleDate').val();
                                    document.getElementById('SuccessfulTrans').innerHTML = msg;
                                    $('#' + '<%=imgbtnCalender.ClientID%>').attr('disabled', 'disabled');
                                }
                                else if (ResultTable.Tables[0].Rows["Status"] == '0') // Added by RS handle the status 0
                                {

                                    $("#div1").hide();
                                    //w2alert($('#TransFailed').text());
                                    toastr.error($('#TransFailed').text())
                                }

                            }

                            else {
                                $("#div1").hide();
                                //w2alert($('#TransFailed').text());
                                toastr.error($('#TransFailed').text())
                            }
                        } else {
                                if (ResultTable.Tables[0].Rows["Statuscode"] == 'DT') {
                                    toastr.error($('#duplicateTrans').text());
                                }else if(ResultTable.Tables[0].Rows["Statuscode"] == '97')
                                    toastr.error($('#wrongcvvlbl').text());
                                else
                                    toastr.error($('#TransFailed').text());
                        }
            } else toastr.error($('#TransFailed').text());
        }
                function OnError(request, status, error) {
                    loader.hideloader();
                    $("#div1").hide();
                    //alert("Error");
                    toastr.error("Error");
                }
                $("#div1").hide();
                // loader.hideloader();
            });
            function ConvertData(resultdata) {
                try {
                    var Tables = new Array();
                    $.map(resultdata, function (obj, i) {
                        Tables.push({
                            name: i,
                            Rows: obj,
                        });
                    });
                    ResultTable['Tables'] = Tables;
                }
                catch (e) {
                    console.log(e.message)
                }
            }
            function GetCardTypeInner(number) {
                number = getDetails(number);
                var re = new RegExp("^4[0-9]{5}|^4[0-9]{6}|^4[0-9]{7}|^4[0-9]{8}|^4[0-9]{9}|^4[0-9]{10}|^4[0-9]{11}|^4[0-9]{12}|^4[0-9]{13}|^4[0-9]{14}|^4[0-9]{15}$");
                if (number.toLowerCase() == "visa") {
                    $('#imgcreditcardinner').attr('src', 'images/icon-visa.png');
                    secLength = 3;
                    $('#securityCode').attr('maxlength', '3');
                    return false;
                }
                re = new RegExp("^3[47][0-9]{5}|^3[47][0-9]{6}|^3[47][0-9]{7}|^3[47][0-9]{8}|^3[47][0-9]{9}|^3[47][0-9]{10}|^3[47][0-9]{11}|^3[47][0-9]{12}|^3[47][0-9]{13}|^3[47][0-9]{14}|^3[47][0-9]{15}$");
                if (number.toLowerCase() == "american_express") {
                    $('#imgcreditcardinner').attr('src', 'images/american_express.png');
                    secLength = 4;
                    $('#securityCode').attr('maxlength', '4');
                    return false;
                }
                re = new RegExp("^5[1-5][0-9]{5}|^5[1-5][0-9]{6}|^5[1-5][0-9]{7}|^5[1-5][0-9]{8}|^5[1-5][0-9]{9}|^5[1-5][0-9]{10}|^5[1-5][0-9]{11}|^5[1-5][0-9]{12}|^5[1-5][0-9]{13}|^5[1-5][0-9]{14}|^5[1-5][0-9]{15}$");
                if (number.toLowerCase() == "mastercard") {
                    $('#imgcreditcardinner').attr('src', 'images/icon-mastercard.png');
                    secLength = 3;
                    $('#securityCode').attr('maxlength', '3');
                    return false;
                }
                re = new RegExp("^6(?:011|5[0-9]{2})[0-9]{2}|^6(?:011|5[0-9]{2})[0-9]{3}|^6(?:011|5[0-9]{2})[0-9]{4}|^6(?:011|5[0-9]{2})[0-9]{5}|^6(?:011|5[0-9]{2})[0-9]{6}|^6(?:011|5[0-9]{2})[0-9]{7}|^6(?:011|5[0-9]{2})[0-9]{8}|^6(?:011|5[0-9]{2})[0-9]{9}|^6(?:011|5[0-9]{2})[0-9]{10}|^6(?:011|5[0-9]{2})[0-9]{11}|^6(?:011|5[0-9]{2})[0-9]{12}$");
                if (number.toLowerCase() == "discover") {
                    $('#imgcreditcardinner').attr('src', 'images/discoverNew.jpg');
                    secLength = 3;
                    $('#securityCode').attr('maxlength', '3');
                    return false;
                }

                $('#imgcreditcardinner').attr('src', 'images/credit_card_logo.png');
                return false;
            }

            function getFormatedValue(val) {
                var indx = ('' + val).split('.');
                if (indx.length == 1) val += '.00';
                else if (indx[1].length == 0) { val = indx[0] + '.00'; }
                else if (indx[1].length == 1) { val = indx[0] + '.' + indx[1] + '0'; }
                else if (indx[1].length == 2) { val = indx[0] + '.' + indx[1] }
                else val = indx[0] + '.' + indx[1].substr(0, 2);
                return val;
            }

            function getDetails(payid) {
                var tab;
                tab = BillPayment.GetDropDownValues().value;

                for (var j = 0; j < tab.Tables[0].Rows.length; j++) {
                    if (tab.Tables[0].Rows[j]["CreditCardid"] == payid) {
                        return tab.Tables[0].Rows[j]["CardType"];
                    }
                }
            }

            function fillDetails(payid, paytypeId) {
                var tab;
                tab = BillPayment.GetDropDownValues().value;
                var fee = BillPayment.GetConviniencefee($('#amountAuthorised').text()).value;
                $('#fee').text(fee);
                $('#lbltotal').text((parseFloat($('#amountAuthorised').text()) + parseFloat($('#fee').text())).toFixed(2));                
                if (paytypeId == "1") {
                    for (var j = 0; j < tab.Tables[0].Rows.length; j++) {
                        if (tab.Tables[0].Rows[j]["CreditCardid"] == payid) {
                            $('#bankorAccount').text($('#NameOnCard').text());
                            $('#lblCrdtBank').text($('#CrdNum').text());
                            $('#crdType').text($('#CrdTyp').text());
                            $('#Label3').text($('#Crddebit').text());
                            var cardnmbr = tab.Tables[0].Rows[j]["Cardnumber"];
                            
                            cardnmbr = "****" + cardnmbr.substring(cardnmbr.length - 4);
                            $('#CustName').text($('#NameOnCard').text());
                            $('#cardNumber').text(cardnmbr);
                            //$('#CustomerName').text();
                            //$('#nameCustomer').text();
                            $('#cardType').text(tab.Tables[0].Rows[j]["CardType"]);
                            $('#expiry').text(tab.Tables[0].Rows[j]["ExpiryDate"]);
                            $('.creditcard').show();
                        }

                    }
                }
                else if (paytypeId == "2") {
                    for (var j = 0; j < tab.Tables[1].Rows.length; j++) {
                        if (tab.Tables[1].Rows[j]["BankAccountID"] == payid) {
                            $('#bankorAccount').text($('#AccNum').text());
                            $('#imgcreditcardinner').attr('src', 'images/Bank_image.png');
                            $('#imgcreditcardinner').attr('width', '90px');
                            $('#imgcreditcardinner').attr('height', '30px');
                            $('#crdType').text($('#Accounttype').text());
                            $('#Label3').text($('#Bankimage').text());
                            var routing = tab.Tables[1].Rows[j]["BankAccount"];
                            routing = "****" + routing.substring(routing.length - 4);
                            $('#lblCrdtBank').text($('#AccNum').text());
                            $('#cardNumber').text(routing);
                            $('#CustomerName').text(tab.Tables[1].Rows[j]["BankRoutingNumber"]);
                            $('#CustName').text($('#AccHoldrName').text());
                            $('#nameCustomer').text(tab.Tables[1].Rows[j]["BankRoutingNumber"]);
                            $('#cardType').text(tab.Tables[1].Rows[j]["accountType"]);
                            //$('#expiry').text(tab.Tables[0].Rows[j]["CardExpDate"]);
                            $('.creditcard').hide(); //$('#creditName').hide();
                        }

                    }
                }
            }
            //code added to display span id=alerMsg in multilingual for bug id: 0009768
            AlertMsgDisplay();
            function AlertMsgDisplay() {
                var AlertString;
                var chkhdnIsProcessingFee = $('#hdndrIsProcessingFee').val();
                var chkhdnMaxBill = $('#hdndrMaxbilling').val();
                if (parseInt(chkhdnIsProcessingFee) > 0) {
                    AlertString = $('#drIsProFee').text().replace('XXXXX', chkhdnIsProcessingFee);
                    if (parseInt(chkhdnMaxBill) > 0) {
                        AlertString += $('#drMaxBill').text().replace('XXXXX', chkhdnMaxBill);
                    }
                }
                else {

                    AlertString += $('#MaxBill').text().replace('XXXXX', chkhdnMaxBill);
                }

                //$('#alertMsg').text(AlertString);
            }
            //EndComment


        });
    </script>
    <script type="text/javascript" src="js/print.js"></script>
    <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
    <input type="hidden" class="activeli_list" value="billing" />
    <div class="total_bills" style="width: 98% !important;">
         <div id="page_loader" style="align-content:center">
        <div class="page_load_container">
        <div class="page_loader_with_icon"></div>
        <b><%= CustomerPortal.Translator.T("ML_BILLING_Header_loadertextheader") %></b>
        <p><%= CustomerPortal.Translator.T("ML_BILLING_Header_loadertext") %></p>
     </div>
    </div>
        <div class="Left_Bill_area">
            <div class="all_bill_box">
                <h3 id="changeText" globalize="ML_BILLING_Header_VerifyPymntAmnt"><%= CustomerPortal.Translator.T("ML_BILLING_Header_VerifyPymntAmnt") %></h3>

                <div class="white_div" style="display:none;">
                    <div class="left-area-tabular type_of_wash">

                        <label id="bankorAccount"></label>
                    </div>
                    <div class="right-area-tabular" style="padding-left: 0px;">
                        <label id="nameCustomer" style="word-wrap: break-word;"></label>
                    </div>
                </div>
                <div class="gray_div">
                    <div class="left-area-tabular type_of_wash">
                        <label id="Label1" globalize="ML_Billing_lbl_PayDate"><%= CustomerPortal.Translator.T("ML_Billing_lbl_PayDate") %></label>

                    </div>
                    <div class="right-area-tabular">
                        <label id="todayDate"><% Response.Write(DateTime.Now.ToString("MM/dd/yyyy")); %></label>
                    </div>
                </div>
                <div class="white_div">
                    <div class="left-area-tabular type_of_wash">
                        <label id="Label2" globalize="ML_BILLING_Lbl_AmountAuthrzd"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_AmountAuthrzd") %></label>

                    </div>
                    <div class="right-area-tabular">
                        <b>$</b><asp:Label runat="server" ID="amountAuthorised" ClientIDMode="Static"></asp:Label>
                    </div>
                </div>
                <div style="display:block;" class="gray_div">
                      <div class="left-area-tabular type_of_wash">
                        <label id="Label6" globalize="ML_Payment_Lbl_Rcpt_Convienfee"><%= CustomerPortal.Translator.T("ML_Payment_Lbl_Rcpt_Convienfee") %></label>
                    </div>
                    <div class="right-area-tabular">
                           <b>$</b><label id="fee" ></label>
                    </div>
                     <div class="right-area-tabular" style="display:none;">
                        <asp:TextBox ID="txtScheduleDate" runat="server" ClientIDMode="Static" Width="93px" ReadOnly="true" globalize="ML_BillPayment_TxtSchduledDate"></asp:TextBox>
            <asp:ImageButton runat="server" ID="imgbtnCalender" ImageUrl="~/images/Icon-Calendar.svg" Style="vertical-align: middle; margin: 3px 0 0 5px;"></asp:ImageButton>
            <cc:CalendarExtender ID="Cal_Date" runat="server" TargetControlID="txtScheduleDate" Format="MM/dd/yyyy"
                            Enabled="True" PopupButtonID="imgbtnCalender">
            </cc:CalendarExtender>
                    </div>
                </div>
                        <div class="white_div">
                    <div class="left-area-tabular type_of_wash">
                        <label globalize="ML_Payment_Lbl_Rcpt_totAmnt"><%= CustomerPortal.Translator.T("ML_Payment_Lbl_Rcpt_totAmnt") %></label>

                    </div>
                    <div class="right-area-tabular">
                        <b>$</b><label runat="server" clientidmode="Static" id="lbltotal" ></label>
                    </div>
                </div>
                <div class="creditcard gray_div" height: 34px;">
                    <div class="left-area-tabular type_of_wash">
                        <label id="Label5" globalize="ML_Billing_lbl_SecCode"><%= CustomerPortal.Translator.T("ML_Billing_lbl_SecCode") %></label>

                    </div>
                    <div class="right-area-tabular">
                        <input type="password" id="securityCode" maxlength="3" mandatory="1" title="Security Code" onkeypress="return IsNumeric(event);" style="width: 80%; margin-top: -3px;" type="password" autocomplete="off" />

                    </div>
                </div>
            </div>
        </div>
        <div class="right_Bill_area">
            <div class="all_bill_boxpayment right_bill_box">
                <h3 style="padding-top: 16px;"></h3>
                 <div class="payment_step" style="display:none;">
                      <div class="left-area-tabular type_of_wash" id="creditName">

                        <label id="CustName"></label>
                    </div>
                    <div class="right-area-tabular" style="padding-left: 0px;">
                        <label id="CustomerName" style="word-wrap: break-word;"></label>
                    </div></div>
                <div class="payment_step">
                    <div class="left-area-tabular type_of_wash">
                        <label id="crdType"></label>
                    </div>
                    <div class="right-area-tabular">
                        <label id="cardType"></label>
                    </div>
                </div>
                <div class="payment_step" runat="server" id="cardrow">
                    <div class="left-area-tabular type_of_wash">
                        <label id="Label3"></label>
                    </div>
                    <div class="right-area-tabular right-area-alt">
                        <img id="imgcreditcardinner" />
                    </div>
                </div>
                <div class="payment_step">
                    <div class="left-area-tabular type_of_wash">
                        <label id="lblCrdtBank"></label>

                    </div>
                    <div class="right-area-tabular">
                        <label id="cardNumber"></label>
                    </div>
                </div>
                <div class="payment_step" runat="server" id="expirydaterow">
                    <div class="left-area-tabular type_of_wash">
                        <label id="Label4" globalize="ML_BILLING_Lbl_ExpryDate"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_ExpryDate") %></label>
                    </div>
                    <div class="right-area-tabular">
                        <label id="expiry"></label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="buttons_area">           
        <input id="ConfirmBtn" type="button" class="submit-button" value='<%# CustomerPortal.Translator.T("ML_Billing_Txt_btnSubmit") %>' globalize="ML_Billing_Txt_btnSubmit" />
           <input id="CancelBtn" type="button" class="cancel-button" value='<%# CustomerPortal.Translator.T("ML_BillPayment_Button_Cancel") %>' globalize="ML_BillPayment_Button_Cancel" />
    </div>
   
    <div>
        <asp:HiddenField ID="hdnCreditOrBank" runat="server" />
        <asp:Label ID="lblBillingID" runat="server" Style="display: none;"></asp:Label>
        <asp:HiddenField ID="hdnTPAmount" runat="server" />
        <asp:HiddenField ID="hdnWaterAmount" runat="server" />
        <asp:HiddenField ID="hdnPowerAmount" runat="server" />
        <asp:HiddenField ID="hdnSolidAmount" runat="server" />
        <asp:HiddenField ID="hdnPayId" runat="server" />
        <asp:HiddenField ID="hdnGasAmount" runat="server" />
         <asp:HiddenField ID="hdnUserProfileId" runat="server" />




        <div id="divthankpay" style="display: none; padding:10px 10px 10px 25px">
            <div class="bottom_billed_boxes" style="width: 98%">
                <div class="all_bill_box">
                    <div class="justifytext table-responsive">
                            <img src="images/paymenticon.png" />
                            <h2><%=CustomerPortal.Translator.T("ML_Payment_Lbl_Rcpt_Thankyou") %></h2>
                            <b><%= CustomerPortal.Translator.T("ML_Payment_Lbl_Rcpt_TranSucess") %></b>
                            <span><strong><%= CustomerPortal.Translator.T("ML_Payment_Lbl_Rcpt_TranDetails") %></strong></span>

                            <%--  A confirmation email has been sent to your Email ID.--%>
                            <table style="width: 60%;margin:30px auto 10px;">                               
                                <tr>
                                <td width="50%"><span class="boldtext"><%= CustomerPortal.Translator.T("ML_Payment_Lbl_Rcpt_TranID") %></span></td>
                                <td width="50%"><span id="lblTransactionID"></span></td>
                                </tr>

                                 <tr>
                                <td><span class="boldtext"><%= CustomerPortal.Translator.T("ML_Payment_Lbl_Rcpt_PayDate") %></span></td>
                                <td> <span id="lblPayDate"></span></td>
                                </tr>

                                 <tr>
                                <td><span class="boldtext"><%= CustomerPortal.Translator.TT_ProductName("ML_Payment_Lbl_Rcpt_Amnt") %> </span></td>
                                <td> <span id="lblAmount"></span></td>
                                </tr>

                                
                                 <tr>
                                <td><span class="boldtext"><%= CustomerPortal.Translator.T("ML_Payment_Lbl_Rcpt_Convienfee") %></span></td>
                                <td> <span id="lblTransactionFees"></span></td>
                                </tr>
                                 <tr>
                                <td><span class="boldtext"><%= CustomerPortal.Translator.TT_ProductName("ML_Payment_Lbl_Rcpt_totAmnt") %> </span></td>
                                <td> <span id="lblTotal"></span></td>
                                </tr>


                           <%--     <tr>
                                <td><span class="boldtext">Mode Of Payment: </span></td>
                                <td> <span id="lblTransactionFee"></span></td>
                                </tr>--%>
                                
                             
                                
                                 <tr>
                                <td colspan="2"><span class="boldtext" style="text-align:right;"><a href="#" id="hrefPrint"><%= CustomerPortal.Translator.TT_ProductName("ML_Payment_lnk_Rcpt_Print") %> </a></span></td>
                                </tr>

                                </table>

                        </div>
                     <div>
        <span id="alertMsg" runat="server" clientidmode="Static" style="display: none"></span>

    </div>
    
                    <%--added for multilingual purpose--%>
                    <div id="SuccessfulTrans"></div>
                    <%--end comment--%>

                   <%--Commented by Abhilash Jha
                    Your online payment has been successfully submitted.
                        <br />
                    A confirmation email has been sent to your Email ID.
                        <span>Your Transaction ID: </span><span id="lblTransactionID"></span>
                    <br />
                    <br />
                    <span style="display:none">Your balance is now: </span><span id="lblBalanceleft" style="display:none"></span>--%>
                </div>
            </div>
        </div>
    </div>
    <uc1:BillDisclaimer runat="server" ID="BillDisclaimer" />
    <div class="buttons_area_Ok">
   
        <input id="btnOK" type="button" class="submit-button" value="<%= CustomerPortal.Translator.TT_ProductName("ML_Payment_lnk_Rcpt_okbtn") %>" style="display: none; margin-top:10px" />
    </div>
   

    <span globalize="ML_Billing_Span_Payment" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_Span_Payment") %></span>
    <span id="EnterSecCode" style="display: none;" globalize="ML_MYACCOUNT_alert_securitycode"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_alert_securitycode") %></span>
     <span id="ExpiredMsg" style="display: none;" globalize="ML_Billing_Msg_CardExpErr"><%= CustomerPortal.Translator.T("ML_Billing_Msg_CardExpErr") %></span>
    <span id="TransFailed" style="display: none;" globalize="ML_BillPayment_Span_Msg_UnsuccessfulPay"><%= CustomerPortal.Translator.T("ML_BillPayment_Span_Msg_UnsuccessfulPay") %></span>
    <span id="duplicateTrans" style="display: none;" globalize="ML_BillPayment_Span_Msg_DuplicateTransaction"><%= CustomerPortal.Translator.T("ML_BillPayment_Span_Msg_DuplicateTransaction") %></span>
     <span id="wrongcvvlbl" style="display: none;" globalize="ML_BillPayment_Span_Msg_WrongCVVmsg"><%= CustomerPortal.Translator.T("ML_BillPayment_Span_Msg_WrongCVVmsg") %></span>
    <span id="TransSuccess" style="display: none;" globalize="ML_BillPayment_Span_Msg_SuccessfulBillPay"><%= CustomerPortal.Translator.T("ML_BillPayment_Span_Msg_SuccessfulBillPay") %></span>
    <!-- Code added to display span id= alerMsg in multilingual form for bug id=0009768-->
    <asp:HiddenField ID="hdndrIsProcessingFee" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdndrMaxbilling" runat="server" ClientIDMode="Static" />
    <span id="drIsProFee" globalize="ML_Billing_Span_drIsProcessingFee" style="display: none" clientidmode="Static"><%= CustomerPortal.Translator.T("ML_Billing_Span_drIsProcessingFee") %></span>
    <span id="drMaxBill" globalize="ML_Billing_Span_drMaxbilling" style="display: none" clientidmode="Static"><%= CustomerPortal.Translator.T("ML_Billing_Span_drMaxbilling") %></span>
     <span id="MaxBill" globalize="ML_Billing_Span_Maxbilling" style="display: none" clientidmode="Static"><%= CustomerPortal.Translator.T("ML_Billing_Span_Maxbilling") %></span>
    <span id="NameOnCard" globalize="ML_Billing_lbl_NameOnCard" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_lbl_NameOnCard") %></span>
    <span id="AccNum" globalize="ML_Billing_lbl_AccNum" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_lbl_AccNum") %></span>
    <span id="CrdNum" globalize="ML_Billing_lbl_CrdNum" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_lbl_CrdNum") %></span>
    <span id="CrdTyp" globalize="ML_ACCOUNT_Lbl_CardType" style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_CardType") %></span>
    <span id="Crddebit" globalize="ML_ACCOUNT_lbl_Card" style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_Card") %></span>
    <span id="Bankimage" globalize="ML_ACCOUNT_lbl_bank" style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_bank") %></span>
    <span id="BnkNam" globalize="ML_ACCOUNT_lbl_BAnkName" style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_BAnkName") %></span>
    <span id="Accounttype" globalize="ML_ACCOUNT_lbl_Accounttype" style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_Accounttype") %></span>
    <span id="PayProcessing" globalize="ML_Billing_Msg_PayProcessing" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_Msg_PayProcessing") %></span>
    <span id="spnMaxPaymentAmtMsg" globalize="ML_Billing_Msg_MaxPayAmount" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_Msg_MaxPayAmount") %></span>
    <span id="AccHoldrName" globalize="ML_ACCOUNT_lbl_HolderName" style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_HolderName") %></span>
   
    <!-- End Comment for bug id=0009768 -->   
  <div id="div1" style="background-image: url('../images/loader.gif');
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: .7;
    display: none;
    position: absolute;
    top: 0px;
    z-index: 99999999;" >

  </div>
</asp:Content>
