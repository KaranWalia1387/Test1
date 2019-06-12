<%@ Page Title="Billing" Language="C#" MasterPageFile="~/BillingMaster.Master" AutoEventWireup="true" CodeBehind="BillPayment.aspx.cs" Inherits="CustomerPortal.BillPayment" EnableEventValidation="false" %>
<%@ Register Src="UserControls/AddUpdatePayment.ascx" TagName="AddUpdatePayment" TagPrefix="uc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <script src="js/Translator.js" type="text/javascript"></script>
    <link href="css/error.css" rel="stylesheet" />
       <script src="js/angular/angular.js"></script>

    <script src="js/jquery.creditCardValidator.js" type="text/javascript"></script>
   <script src="js/BillPayment.js" type="text/javascript"></script>
  
 
    <style type="text/css">
        .right_bill_box{
            height:225px;
            overflow-y:auto;
        }
        .profile-details table td, th {
    padding: 7px 10px;
    width: 20%;
    border: 1px solid #ccc;
    border-spacing: 0px;
    border-collapse: collapse;
}
        .my_acc_tbl .address-1 {
    width: 93%;
}
        .popup_area .popup_area_home{
            width:100%;
        }
         .popup_area .popup_area_home .popup_left_content_area_home {
                background: #f2f2f2 none repeat scroll 0 0;
                border-top: 1px solid #b7b7b7;
                float: left;
            color: #5c5c5c;
                margin: 0 0 1px;
                padding: 6px 13px;
                width: 100%;
            }

            .popup_area .popup_area_home .popup_right_content_area_home {
                float: left;
                margin: 0 0 3px;
                padding: 7px 13px 6px;
                width: 100%;
            }

        .payment_info_tbl > table tr th, .payment_info_tbl >  table tr td {
            border:1px solid #ccc;
            font-size:12px;
            padding: 5px 8px;
        }
        .payment_info_tbl > table tr th {
        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#f7f7f7+2,e4e4e4+100 */
            background: #f7f7f7; /* Old browsers */
            background: -moz-linear-gradient(top,  #f7f7f7 2%, #e4e4e4 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(top,  #f7f7f7 2%,#e4e4e4 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to bottom,  #f7f7f7 2%,#e4e4e4 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f7f7f7', endColorstr='#e4e4e4',GradientType=0 ); /* IE6-9 */
            padding: 11px 8px;
            }

            .payment_info_tbl > table tr:nth-child(even) td {
               background:#f3f6fa;
                }
        .card_type_img {
                width: 57px;
                 float: left;
                 text-align:center;
        }
        .payment_info_tbl > table tr td label, .payment_info_tbl > table tr td input[type="radio"] {
            margin-bottom:0px;
            margin-top:0px;
        }
        .payment_info_tbl > table tr:hover td{
            background:#e6f0ff;
        }

        .card_type_img > img {
          max-height: 31px;
          float: none;
        }
        .card_type_lbl {
            float: left;
            padding-top:9px;
            font-size: 12px;
            }
        .add-card {
            padding: 0.8% 3.5% 0 17px;
        }
        .edit_del_btn {
            text-align:center;
        }
        .edit_del_btn > div {
            float:none;
            display:inline-block;
        }
        
                  .popup_area_new .popup_area_home {
                color: #808080;
                display: block;
                font-size: 14px;
                margin: 2% auto 0;
                width: 90%;
            }

                    .popup_area_new .bottom_area_home {
                border-top: 2px solid #b9b9b9;
                clear: both;
                margin-top: 25px;
                padding: 10px;
            }

                    .popup_area_new .popup_left_content_area_home {
                float: left;
                margin: 0 0 10px;
                padding-top: 6px;
                width: 36%;
            }
            .popup_area_new .popup_right_content_area_home {
                float: left;
                margin: 0 0 10px;
                width: 64%;
            }
        table.PayNowTable {
            width: 100%;
            border: 2px solid #dadada;
        }

            table.PayNowTable td {
                padding: 20px 20px;
                border: 2px solid #dadada;
            }

        .BillTab1 {
            float: left;
            width: 180px;
            margin: 5px 0px 5px 30px;
        }

        .BillTab2 {
            float: left;
            width: 250px;
            margin: 5px 0px;
        }

        .green {
            color: Green;
        }

        .red {
            color: Red;
        }

        .TableCellContainerContent {
            height: 162px;
        }

        .TableCellContainerContentBig {
            height: auto;
        }

            .TableCellContainerContentBig .TableCellHeaderIconBilling {
                width: auto;
            }

        .extraStyling {
            width: 54% !important;
        }

        .energy_mid_box .right_content_box {
            height: 98%;
        }

        .popup_right_content_area_home select#ddlMonth, .popup_right_content_area_home select#ddlYear {
            width: 30.3% !important;
        }

       #divPopup #errorMsg {
            top: -35px;
            right: 107px;
        }

      #change-pwd-divPopup #errorMsg {
              top: 8px;
       }
              .no_amnt_msg{
            width:100%;
            float:left;
            padding: 7px 10px 0px;
            margin-bottom: -8px;
            display:none;
        }
        .no_amnt_msg p{
            margin-bottom:0px;
            float: right;
            margin-right: 43px;
            color: #f91010;
            font-size: 13px;
            
        }
      #w2ui-tag-totalAmount .w2ui-tag-body {
     left: -118px!important;
}
      .w2ui-tag-totalAmount .w2ui-tag-body:before { 
    bottom: -12px;
    left: -25px;
    transform: rotate(90deg);
}
      #BillQueryPopup  .popup_area_home .popup_left_content_area_home {
    width: 36%;
    float: left;
    margin: 0px 0px 0;
    padding-top: 6px;
    border-top:6px;
    background:none;
    padding-left:0;
}
#BillQueryPopup  .popup_area_home .popup_right_content_area_home {
    width: 64%;
    float: left;
    margin: 0px 0px 0;
        padding: 7px 0 0px;
}
        #BillQueryPopup .popup_area_home {
            width: 90%;
            margin: 2% auto 0px;
            display: block;
            color: #808080;
            font-size: 14px;
        }

        #BillQueryPopup .submit-button{
            margin-bottom:0;
        }
       
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#change-pwd-divPopup .modal-dialog").removeClass("popup_area");
            $("#change-pwd-divPopup .modal-dialog").addClass("popup_area_new");
        });
    </script>
    <asp:HiddenField runat="server" ID="hdnBillingPeriod" />
    <input type="hidden" class="activeli_list" value="billing" />
    <div class="top_conte_box_mob" style="height: 87%; overflow: auto;">
        <div class="total_bills" style="width: 98% !important;">
            <div class="Left_Bill_area">
                <div class="all_bill_box">
                    <h3 globalize="ML_BillPayment_Header_Payment"><%= CustomerPortal.Translator.T("ML_BillPayment_Header_Payment") %></h3>

                    <div class="balance" style="padding-bottom: 0;">
                        <div class="type_of_wash smart_time_box" style="text-align: left; width: 100%; padding-bottom: 10px;">
                            <asp:Label ID="lblBillPaidDate" runat="server" globalize="ML_BillPayment_Lbl_BillPayDate" Style="display: inline-block; min-width: 19%;"><%= CustomerPortal.Translator.T("ML_BillPayment_Lbl_BillPayDate") %></asp:Label><asp:Label ID="lblBillPaidPeriod" runat="server" Style="display: inline-block; min-width: 65%;"></asp:Label><!--Code Modified for bug ID: 0009759-->
                            <asp:Label ID="lblHeadpowerDueDate" runat="server"  Width="19%" Style="width: auto;" globalize="ML_BillPayment_Lbl_DueDate" ><%= CustomerPortal.Translator.T("ML_BillPayment_Lbl_DueDate") %></asp:Label>
                            <asp:Label ID="lblpowerDueDate" runat="server" Width="60%"></asp:Label>
                            <div style="width: 55%; float: left; padding-top: 5px; display:<%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"none":"block"%>">
                                <input type="radio" id="rdblbltotalamount" name="Regular" value="lbltotalamount" style="text-align: left;" />
                                <label style="width: 59%" globalize="ML_Billing_lbl_Balance"><%= CustomerPortal.Translator.T("ML_Billing_lbl_Balance") %> </label>
                               
                            </div>
                            <div style="float: left; width: 39%; display:<%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"none":"block"%>">
                                <asp:Label runat="server" ID="lbltotalamount" MaxLength="5" Width="63%" ReadOnly="True" Style="text-align: center;font-size: 107.7%;padding-top: 8px;    padding-bottom: 0px;"></asp:Label>
                            </div>
                            <br />
                              <div class="no_amnt_msg">
                                <p><%# CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_NoBillingText")%></p>
                            </div>
                        </div>
                    </div>
                    <hr style="border: 1px solid #f4f4f4; float: left; margin: 5px 0 0 -9px; width: 103%;" />

                    <div class="balance" style="padding-top: 7px;">
                        <div class="type_of_wash smart_time_box" style="text-align: left; width: 100%;">
                            <input type="radio" name="Regular" checked="checked" value="totalAmount" style="float: left; margin-top: 10px;" />
                            <label style="width: 46.5%; float: left; padding-right: 10px; padding-top: 8px;" globalize="ML_Billing_lbl_Amount"><%= CustomerPortal.Translator.T(CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"ML_PrepayBill_Msg_AmountRecharge":"ML_Billing_lbl_Amount") %> </label>
                            <!--Globalize added for bug ID: 0009759-->
                           
                            <%--&nbsp;<asp:Label clientidmode="Static" name="checkbox" id="totalAmount" globalize="ML_BillPayment_TotalAmount" class="extraStyling" runat="server" maxlength="5" style="float: left; width: 25% !important;font-size: 107.7%; margin-top:8px; margin-left: 10px; text-align: right" readonly="readonly"></asp:Label>--%>
                            &nbsp;<asp:TextBox ID="totalAmount" ClientIDMode="Static" name="checkbox" globalize="ML_BillPayment_TotalAmount" class="extraStyling" runat="server" MaxLength="9" Style="float: left; width: 25% !important; font-size: 107.7%; margin-top: 8px; margin-left: 10px; text-align: center"></asp:TextBox>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right_Bill_area" id="right_Bill_area" runat="server">
                <div class="all_bill_box right_bill_box">
                    <h3 globalize="ML_BillPayment_Lbl_PayWith"><%= CustomerPortal.Translator.T("ML_BillPayment_Lbl_PayWith") %></h3>


                    <div class="white_div">

                        <uc1:AddUpdatePayment ID="AddUpdatePayment1" runat="server" />
                        <div class="right-area-tabular"></div>
                    </div>


                    <div id="RegisteredPaymentMode" style="display:none">
                        <%--End #5893--%>
                    </div>

                    <div id="PaymentTable" ng-app="BillPaymentApp" ng-controller="BillPaymentController" ng-cloak="">
                        <div id="RegisteredCard" ng-repeat="x in r.Table1">
                            <div ng-class="($index%2==0)?'white_div' : 'gray_div'">
                        <div class="left-area-tabular type_of_wash">
                            <input type="radio" name="Regular1" id="creditcard_{{$index}}" value="{{x.CreditCardid}}"  vaultid="{{x.CreditCardid}}" PaymentJunctionCustId="{{x.PaymentJunctionCustId}}" />
                            <img  ng-src="{{x.CardType|cardTypeImage}}" />
                            <label>{{x.Cardnumber|maskcardNumber}}</label>
                        </div>
                          <div class="right-area-tabular">
                              <a id="{{x.CreditCardid}}" class="remove card" style="color:red;cursor:pointer;text-decoration:none"ValidateMessage="{{removeValidateMessage}}" title="{{removetitle}}">{{removetext}}</a>
                          </div>
                            </div>
                        </div>
                        <div id="RegisteredBank" ng-repeat="x in r.Table2">
                             <div ng-class="(($index+cnt1)%2==0)?'white_div':'gray_div'">
                           <div class="left-area-tabular type_of_wash">
                           <input type="radio" name="Regular1" id="bankaccount_{{$index|Count}}" value="{{x.BankAccountID}}"  vaultid="{{x.BankAccountID}}" PaymentJunctionCustId="{{x.PaymentJunctionCustId}}" />
                           <img src="images/Bank_image.png" alt="" width="50" />
                            <label>{{x.BankAccount|maskcardNumber}}</label>
                        </div>
                          <div class="right-area-tabular">
                              <a id="{{x.BankAccountID}}" class="remove bank" style="color:red;cursor:pointer;text-decoration:none" ValidateMessage="{{removeValidateMessage}}" title="{{removetitle}}">{{removetext}}</a>
                          </div>
                               </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
       <div style="margin: 5px; padding: 5px;">
       <div id="disclaimer" style="float: left; margin-bottom: 0px; padding-left:22px; padding-top:129px; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingDisclaimer) %>!important;">
        <b><span globalize="ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer" style="color: red;"><%= CustomerPortal.Translator.T("ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer") %></span><span style="color: red;">:</span> </b>
        <span globalize="ML_Billing_Span_Disclaimertxt" runat="server" style="color: black;"><%= CustomerPortal.Translator.T("ML_Billing_Span_Disclaimertxt") %></span>
    </div>
</div>
    </div>

    <div class="setting_save_box">
        <div class="buttons_area" style="text-align: center;">
            <input id="CanBtn" type="button" value='<%# CustomerPortal.Translator.T("ML_BillPayment_Button_Cancel") %>' onclick="cancel()" class="cancel-button" globalize="ML_BillPayment_Button_Cancel" >
            <input id="NextBtn" type="button" value='<%# CustomerPortal.Translator.T("ML_BillPayment_Button_Next") %>' class="submit-button nextClick" globalize="ML_BillPayment_Button_Next">
        </div>
    </div>

    <div class="clear">
        <asp:HiddenField ID="hdfCurrentDate" runat="server" />
        <asp:Label ID="lblBillingID" runat="server" Style="display: none;"></asp:Label>
        <asp:HiddenField ID="hdnDefPayment" runat="server" />
        <%--#5893--%>
        <asp:HiddenField ID="hdnTPAmount" runat="server" />
        <asp:HiddenField ID="hdnWaterAmount" runat="server" />
        <asp:HiddenField ID="hdnPowerAmount" runat="server" />
        <asp:HiddenField ID="hdnSolidAmount" runat="server" />
        <asp:HiddenField ID="hdnGasAmount" runat="server" />
    </div>
     <script type="text/javascript">
        var tblid, payid, paytypeid, paycardid, defaultpayid;
        var secLength = 0; // for using validation for 3or 4 char length of credit card
        var totalamount = $('#<%=hdnTPAmount.ClientID %>').val();


        function checkForPreviousDate(sender, args) {
            DT = $('#' + '<%=hdfCurrentDate.ClientID%>').val().split("-");
            var d = new Date(DT[0], DT[2], DT[1]);
            if (sender._selectedDate < d) {

                error.showerror('#' + '<%=hdfCurrentDate.ClientID%>', 'Please enter amount greater than 0.');
                sender._selectedDate = new Date();
                sender._textbox.set_Value(sender._selectedDate.format(sender._format));
            }
        }
        function loadDefaultParam() {
            var defaultpayment = $("input[name=Regular1]:checked").attr('id');
            if (defaultpayment.indexOf("bank") != -1) {
                paycardid = $("input[name=Regular1]:checked").attr('value');
                parameters = "&type=bank" + "&wtra=" + $('#<%=hdnWaterAmount.ClientID %>').val() + "&pwram=" + $('#<%=hdnPowerAmount.ClientID %>').val() + "&sldam=" + $('#<%=hdnSolidAmount.ClientID %>').val() + "&gasam=" + $('#<%=hdnGasAmount.ClientID %>').val();
    }
    else {
        paycardid = $("input[name=Regular1]:checked").attr('value');
        parameters = "&type=credit" + "&wtra=" + $('#<%=hdnWaterAmount.ClientID %>').val() + "&pwram=" + $('#<%=hdnPowerAmount.ClientID %>').val() + "&sldam=" + $('#<%=hdnSolidAmount.ClientID %>').val() + "&gasam=" + $('#<%=hdnGasAmount.ClientID  %>').val();
    }
}
$(document).ready(function () {
    window.onload = function () {

        window.onbeforeunload = function () {
            return 'Do not press back button or Refresh....';
        };

    };
   if(parseFloat($('#<%=lbltotalamount.ClientID %>').text().trim()) <= 0)
   {
       $('#rdblbltotalamount').attr('disabled', true);
       $('.no_amnt_msg').css("display", "block");
   }
   else {
       $('#rdblbltotalamount').attr('checked', 'checked');
   }
    angular.element('#PaymentTable').scope().loadPaymentInfo();//call to bind list for payment
    setTimeout(function () {// time out added to load parameters after angular fields loaded
        //loadDefaultParam();
    }, 5000)
    var paymentmode = '<%=CustomerPortal.SessionAccessor.PaymentMode.ToString()%>';
            var tab = BillPayment.GetDropDownValues().value;

            $('#' + '<%=totalAmount.ClientID%>').on('keypress', function (e) {
                 return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46 && $('#' + '<%=totalAmount.ClientID%>').val().indexOf('.') < 0);
            });

            $('.nextClick').click(function () {
                window.onbeforeunload = null;
                var pay = $('input[name=Regular1]:checked').val();
                var id = $("input[name=Regular1]:checked").attr('id');
                var value = $("input[name=Regular]:checked").attr('value');              
                var vaultid = $("input[name=Regular1]:checked").attr('vaultid');
                var passedString;

                var url;
                var amount = 0;
                var bilid = $('#<%=lblBillingID.ClientID %>').text();
                if (value == 'totalAmount')
                    amount = $('#<%=totalAmount.ClientID %>').val();
                else
                    amount = $('#<%=lbltotalamount.ClientID %>').text();


                if (amount.indexOf('.') > 0) {
                    var arr = amount.split('.');
                    if (parseInt(arr[0]) <= 0 && parseInt(arr[1]) <= 0) {
                        error.showerror('#<%=totalAmount.ClientID %>', $('#alertmsg').html());
                        return;
                    }
                    amount = parseFloat(amount).toFixed(2);
                }
                else {
                    if (amount =="" ) {
                        error.showerror('#<%=totalAmount.ClientID %>', $('#validamt').html());
                        return;
                    }
                    else if (parseInt(amount) <= 0) {
                        error.showerror('#<%=totalAmount.ClientID %>', $('#alertmsg').html());
                        return;
                    }
                }

                var paymentmode = '<%=CustomerPortal.SessionAccessor.PaymentMode.ToString()%>';

                if (paymentmode == 3) {
                    loader.showloader();
                    var currency = "USD";
                    var paidAmount = $('#totalAmount').val();

                    var param = "currency=" + currency + "&amount=" + paidAmount + "&emailid=" + '<%=CustomerPortal.SessionAccessor.EmailID.ToString()%>' + "&InvoiceNumber=" + bilid;


                    var parameter = {
                        param: param
                    };
                    function OnSuccess(data, status) {

                        loader.hideloader();
                        var waterAmount;
                        var powerAmount;
                        var solidAmount;
                        var gasAmount;
                        if ($('#<%=hdnWaterAmount.ClientID %>').val() == '')
                            waterAmount = 0.0;
                        else
                            waterAmount = $('#<%=hdnWaterAmount.ClientID %>').val();

                        if ($('#<%=hdnPowerAmount.ClientID %>').val() == '')
                            powerAmount = 0.0;
                        else
                            powerAmount = $('#<%=hdnPowerAmount.ClientID %>').val();

                        if ($('#<%=hdnSolidAmount.ClientID %>').val() == '')
                            solidAmount = 0.0;
                        else
                            solidAmount = $('#<%=hdnSolidAmount.ClientID %>').val();

                        if ($('#<%=hdnGasAmount.ClientID %>').val() == '')
                            gasAmount = 0.0;
                        else
                            gasAmount = $('#<%=hdnGasAmount.ClientID %>').val();

                        var params = waterAmount + "|" + powerAmount + "|" + solidAmount + "|" + gasAmount;
                        params += "|" + amount + "|" + bilid + "|" + paycardid + "|" + totalamount;
                        // passedString=  '<% CustomerPortal.AESEncryption.EncryptAndroid("+params+");%>'

                        localStorage.setItem('passedString', params);


                        window.location.href = data.d;

                    }
                    function OnError(request, status, error) {
                        loader.hideloader();
                        //alert("Error");
                        toastr.error("Error");
                    }
                    $.ajax({
                        type: "POST",
                        url: "BillPayment.aspx/PayPalMethod",
                        data: JSON.stringify(parameter),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: OnSuccess,
                        error: OnError
                    });

                }
                else if (paymentmode == 2) {
                    loader.showloader();
                    if (pay == undefined) {
                        //w2alert('Please Select Payment Mode.');
                        toastr.warning($('#ML_RecurringBill_ddl').text());
                        loader.hideloader();
                        return;
                    }
                    if (id.indexOf('creditcard_') >= 0) {

                        passedString = common.GetEncryptedData(parameters + "&totam=" + amount + '&bilid=' + bilid + '&pay=' + paycardid + '&actual=' + totalamount + '&Vaultid=' + vaultid).value;

                        url = "Payment.aspx?val=" + passedString;
                        location.href = url;
                    }
                    else if (id.indexOf('bankaccount_') >= 0) {

                        passedString = common.GetEncryptedData(parameters + "&totam=" + amount + '&bilid=' + bilid + '&pay=' + paycardid + '&actual=' + totalamount + '&Vaultid=' + vaultid).value;
                        url = "Payment.aspx?val=" + passedString;
                        location.href = url;
                    }
                    loader.hideloader();
                }

                else {
                    if (pay == undefined) {
                        //w2alert('Please Select Payment Mode.');
                        loader.hideloader();
                        toastr.warning($('#ML_RecurringBill_ddl').text());
                        return;
                    }
                    if (id.indexOf('creditcard_') >= 0) {

                        passedString = common.GetEncryptedData(parameters + "&totam=" + amount + '&bilid=' + bilid + '&pay=' + paycardid + '&actual=' + totalamount).value;
                        url = "Payment.aspx?val=" + passedString;
                        location.href = url;
                    }
                    else if (id.indexOf('bankaccount_') >= 0) {
                        passedString = common.GetEncryptedData(parameters + "&totam=" + amount + '&bilid=' + bilid + '&pay=' + paycardid + '&actual=' + totalamount).value;
                        url = "Payment.aspx?val=" + passedString;
                        location.href = url;
                    }
                }

            });


            //var cards = BillPayment.GetRegusteredCard();
            //var v = cards.value.split("|")[1];

            //$('#RegisteredPaymentMode').append(cards.value.split("|")[0]);
            defaultpayid = $("input[name=Regular1]:checked").val();
            TranslateMultiLingualControls();
            function setCreditCardOnChange(payid) {

                for (var j = 0; j < r.Table1.length; j++) {
                    if (r.Table1[j]["CreditCardid"] == payid) {
                        paycardid = payid;
                        parameters = "&type=credit" + "&wtra=" + $('#<%=hdnWaterAmount.ClientID %>').val() + "&pwram=" + $('#<%=hdnPowerAmount.ClientID %>').val() + "&sldam=" + $('#<%=hdnSolidAmount.ClientID %>').val() + "&gasam=" + $('#<%=hdnGasAmount.ClientID %>').val();//#5896
                        return;
                    }
                }
            }

            function setBankOnChange(payid) {
                for (var i = 0; i < r.Table2.length; i++) {
                    if (r.Table2[i]["BankAccountID"] == payid) {
                        paycardid = payid;
                        // $('#RegisteredBank option[value=' + payid + ']').attr('selected', 'selected');
                        parameters = "&type=bank" + "&wtra=" + $('#<%=hdnWaterAmount.ClientID %>').val() + "&pwram=" + $('#<%=hdnPowerAmount.ClientID %>').val() + "&sldam=" + $('#<%=hdnSolidAmount.ClientID %>').val() + "&gasam=" + $('#<%=hdnGasAmount.ClientID %>').val();//#5896
                        return;
                    }
                }
            }
            $(document).on('click', '.remove', function () {
                toastr.clear();
                var msg;
                var id = this.id;
                $('#hdnvaultid').val(id);               
                if (id == $("input[name=Regular1]:checked").attr('vaultid')) {
                    //w2alert('You can not delete default Payment Account.');
                    //toastr.warning('You can not delete default Payment Account.')
                    toastr.warning($('#ML_MyAccount_ErrMsg_DelDefault').text())
                    return false;
                }
                id += "|" + $("#hdnpayjuntionid").val() + "|" + $('#bankSuccessDelMsg').html() + "|" + $('#CardSuccessdelMsg').html() + "|" + $('#TxnFailedMsg').html();
                var i = 0;
                if (this.className.indexOf('bank') <= 0) {
                    i = confirm($('#ConfrmDel').text());
                }
                else {
                    i = confirm($('#ML_MyAccount_Msg_DeleteBankInfo').text());
                }
                
                if (i == 1) {

                    if (this.className.indexOf('bank') <= 0) {
                        msg = BillPayment.RemoveCard(id, "1").value;

                    } else {
                        msg = BillPayment.RemoveCard(id, "2").value;
                    }
                    alert(msg);
                    angular.element('#PaymentTable').scope().loadPaymentInfo();
                    //var cards = BillPayment.GetRegusteredCard();

                    //$('#RegisteredPaymentMode').text('');
                    //$('#RegisteredPaymentMode').append(cards.value);

                }
            });

            $(document).on('change', '#RegisteredCard', function () {
                setCreditCardOnChange($("input[name=Regular1]:checked").attr('value'));
            })

            $(document).on('change', '[id ^= "RegisteredBank"]', function () {
                setBankOnChange($("input[name=Regular1]:checked").attr('value'));
            })

            $('#CancelBtn').click(function () {
                $('#SelectPaymentMode').show();
                $('#divthankyou').show();
                $('#BankAccountConfirm').hide();
            });

        });

        function cancel() {
            window.onbeforeunload = null;
            var url = "BillDashboard.aspx";
            location.href = url;
         }
         function padRight(str, num) {
             var sub = "";
             //var substr = str.substring(str.length - 4);
             if (str.length < num) {
                 for (i = str.length; i < num; i++) {
                     sub = sub + "0";
                 }
                 return str + sub;
             }
             else
                 return str;

         }

        function GetAccountNumer(payid) {
            var tab;
            tab = BillPayment.GetDropDownValues().value;
            for (var j = 0; j < tab.Tables[0].Rows.length; j++) {
                if (tab.Tables[0].Rows[j]["CreditCardId"] == payid) {
                    return tab.Tables[0].Rows[j]["CardNumber"];
                }
            }
        }
    </script>
      <asp:HiddenField ID="hdnpayjuntionid" runat="server" ClientIDMode="Static" />
     <asp:HiddenField ID="hdnvaultid" runat="server" ClientIDMode="Static" />
    <span globalize="ML_Title_Billing" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Billing") %></span>
    <span globalize="ML_Account_Span_ErrMsg_Success_Card_Delete" id="CardSuccessdelMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Success_Card_Delete") %></span>
    <span globalize="ML_Account_Span_ErrMsg_Success_BankAccount_Delete" id="bankSuccessDelMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Success_BankAccount_Delete") %></span>
    <span globalize="ML_Account_Span_ErrMsg_Transaction_Failed" id="TxnFailedMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Transaction_Failed") %></span>
    <span globalize="ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo" id="EnterAllInfo" style="display: none"><%= CustomerPortal.Translator.T("ML_BillPayment_Lbl_PayWith") %></span>
    <span globalize="ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo" id="AllMandatory" style="display: none"><%= CustomerPortal.Translator.T("ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo") %></span>
    <span globalize="ML_MyAccount_Msg_InvalidRouting" id="InvalidRouting" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_InvalidRouting") %></span>
    <span globalize="ML_MyAccount_Msg_NewRouting" id="NewRouting" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_NewRouting") %></span>
     <span globalize="ML_MyAccount_Msg_DeleteCreditInfo" id="ConfrmDel" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_DeleteCreditInfo") %></span>
     <span globalize="ML_Billing_lbl_Remove" id="ML_Billing_lbl_Remove" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_lbl_Remove") %></span>
     <span globalize="ML_MyAccount_ErrMsg_DelDefault" id="ML_MyAccount_ErrMsg_DelDefault" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_ErrMsg_DelDefault") %></span> 
    <span globalize="ML_MyAccount_Msg_DeleteBankInfo" id="ML_MyAccount_Msg_DeleteBankInfo" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_DeleteBankInfo") %></span><%--added by priyansha--%>
     <span globalize="ML_RecurringBill_ddl_SelectMode" id="ML_RecurringBill_ddl" style="display: none"><%= CustomerPortal.Translator.T("ML_RecurringBill_ddl_SelectMode") %></span><%--added by priyansha--%>
     <span globalize="ML_Billing_alert_BillingPaymentAmount" id="alertmsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_alert_BillingPaymentAmount") %></span>
    <span globalize="ML_Billing_Alert_Valid_Payment_amount" id="validamt" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_Alert_Valid_Payment_amount") %></span>

</asp:Content>
