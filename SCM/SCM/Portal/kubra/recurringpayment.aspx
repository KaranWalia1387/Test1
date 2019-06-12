<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="recurringpayment.aspx.cs" Inherits="CustomerPortal.recurringpaymnet" EnableEventValidation="false" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Src="~/kubra/UserControl/AddUpdatePayment.ascx" TagName="AddUpdatePayment" TagPrefix="uc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%#string.Format("{0}/js/jquery-1.8.3.min.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
    <script src="<%#string.Format("{0}/js/MyAccount.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
    <script src="<%#string.Format("{0}/js/Translator.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
    <link href="<%#string.Format("{0}/js/w2Ui/w2ui-1.4.2.min.css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" />
    <script src="<%#string.Format("{0}/js/w2Ui/w2ui-1.4.2.min.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
    <script src="<%#string.Format("{0}/js/w2Ui/w2ui-1.4.2.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
    <link href="<%#string.Format("{0}/js/w2Ui/w2ui-1.4.2.css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" />
    <script src="<%#string.Format("{0}/js/jquery.creditCardValidator.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
    <script src="../js/AddKubraPayment.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:ScriptManager runat="server"></asp:ScriptManager>
    <script type="text/javascript">

        var r = '';
        var databindtogrid;
        var editcolumn = false;
        var flagDeleteRow = false;
        var accountId = 0;
        var accounttype = '';

        function LoadGrid(name) {
            $('#wugrid').w2grid({
                name: name,
                show: {
                    toolbar: false,
                    footer: false
                },
                multiSearch: true,
                searches: [
                     { field: 'CardTypOrBankAcc', caption: 'Card Type / Bank Account', type: 'text' },
                     { field: 'Number', caption: 'Number', type: 'text' },
                     { field: 'NickName', caption: 'Nick Name', size: '20%', type: 'text' },
                     { field: 'Flag', caption: 'Recurring Profile Set', size: '20%', type: 'text' },
                     { field: 'Default', caption: 'Default', size: '20%', type: 'text' }

                ],
                columns: [
                    {
                        field: 'CardTypOrBankAcc', caption: 'Card Type / Bank Account', size: '20%', sortable: true, render: function (record) {
                            if (record.CardTypOrBankAcc == 0)
                                return 'Bank Account';
                            else
                                return 'Credit Card';
                        }
                    },
                    { field: 'Number', caption: 'Number', size: '30%', sortable: true },
                    { field: 'NickName', caption: 'Nick Name', size: '30%', sortable: true },
                    {
                        field: 'img', caption: '', size: '15%', sortable: true,
                        render: function (record) {
                            return '<div id="' + record.accountID + '" accounttype="' + record.CardTypOrBankAcc + '"  title="Select" class="deleterow"><input type="radio" name="paymentaccount" /></div>';
                        }
                    },
                      {
                          field: 'Flag', caption: 'Recurring Profile Set', size: '18%', sortable: true,
                          render: function (record) {
                              if (record.Flag == 1)
                                  return '<div id="' + record.accountID + '" accounttype="' + record.CardTypOrBankAcc + '"  title="Select" class=""><input type="checkbox" name="' + record.accountID + '" value="" checked  disabled readonly></div>';
                              else
                                  return '<div id="' + record.accountID + '" accounttype="' + record.CardTypOrBankAcc + '"  title="Select" class=""><input type="checkbox" name="' + record.accountID + '" value="" disabled readonly></div>';
                          }
                      }
                ],

                records: databindtogrid,

            });
        }


        function LoadAccount(accountType) {
            $("#ddlAccount").empty();
            var param = { accountType: accountType };
            $.ajax({
                type: "POST",
                url: "recurringpayment.aspx/LoadAccountDetails",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (json) {
                    var obj = JSON.parse(json.d);

                    $(obj).each(function () {
                        $("#ddlAccount").append($("<option></option>").attr("value", this.accountID).html(this.Number));
                    });
                },
                error: function (e) {
                    alert(e.Message);
                }
            });
        }

        $(document).ready(function () {

            try {
                var paymentdata = accountkubra.LoadW2UIGridData().value;
                if (paymentdata != null) {
                    databindtogrid = paymentdata.Rows;
                    if (databindtogrid.length != 0 || databindtogrid != null) {
                        LoadGrid('wugrid');
                        LoadAccount('CC');
                    }


                }

                //Payment Type Change event

                $("#ddlPaymentType").change(function () {
                    var paymentType = $('#ddlPaymentType :selected').val();

                    LoadAccount(paymentType);

                });

                $('#rdFixed').click(function (e) {
                    $('input[type=radio][name="ctl00$ContentPlaceHolder1$recurring1"]:checked').removeAttr('checked');
                    $("#ddlPaymentFrequencySetting").change();
                });

                $('#rdAuto').click(function (e) {
                    $('input[type=radio][name="ctl00$ContentPlaceHolder1$recurring2"]:checked').removeAttr('checked');

                });

                $("#ddlPaymentFrequencySetting").change(function ()
                {

                    if ($('#ddlPaymentFrequencySetting :selected').val() == 1) {
                        $('#FixedMonthly').hide();
                        $('#FixedWeekly').show();
                        $("#FixedMonthly input[name='ctl00$ContentPlaceHolder1$recurring2']").attr('checked', false);
                        $("#FixedWeekly input[name='ctl00$ContentPlaceHolder1$recurring2']").attr("checked", true);
                    }                   
                    else {
                        $('#FixedWeekly').hide();
                        $('#FixedMonthly').show();
                        $("#FixedWeekly input[name='ctl00$ContentPlaceHolder1$recurring2']").attr('checked', false);
                        $("#FixedMonthly input[name='ctl00$ContentPlaceHolder1$recurring2']").attr("checked", true);                        
                      
                    }

                });

                $("#ddlPaymentPeriodSetting").change(function () {

                    if ($('#ddlPaymentPeriodSetting :selected').val() == 1) {
                        $('#lstPaydiv').hide();

                    }
                    else {
                        $('#lstPaydiv').show();
                    }

                });



            }
            catch (e) {
                console.log(e.message);
            }

            $('.deleterow').live('click', function (e) {
                var grid = this;
                try {
                    accountId = grid.id;
                    accounttype = ($(grid).attr('accounttype') == 1 ? 'CC' : 'ACH');

                }
                catch (e) {
                    console.log(e.message);
                }
            });

            $("#btnSaveRecurring").click(function () {

                var param = "";
                var item = $('input[name="ctl00$ContentPlaceHolder1$recurring"]:checked').val();

                accountId = $('#ddlAccount :selected').val();
                accounttype = $('#ddlPaymentType :selected').val();

                if ($("#txtStartPayment").val() == '') {
                    w2alert("Please select start payment date");
                    return;
                }
                var payfreqsett = $('#ddlPaymentPeriodSetting :selected').val();
                if (payfreqsett == 2)
                {

                    if ($("#txtLastPayment").val() == '')
                    {
                        w2alert("Please select last payment date");
                        return;
                    }

                }
                if ($('input[name="ctl00$ContentPlaceHolder1$recurring"]:checked').val() == undefined) {
                    w2alert("Please select recurring option");
                    return;
                }
                if (item == 1) {
                    if ($('#txtPaymentAmount').val() == '') {
                        w2alert("Please enter payment amount");
                        return;
                    }

                    param += "&paymentamount=" + $('#txtPaymentAmount').val();
                    var type = $('input[name="ctl00$ContentPlaceHolder1$recurring2"]:checked').val();
                    if (type == 2)
                        param += "&paymentfrequency=" + $("#FixedMonthly option:selected").val();
                    else if (type == 3)
                        param += "&paymentfrequency=" + $("#FixedWeekly option:selected").val();
                }
                if (item == 2) {
                    if ($('#txtPaymentAmountAuto').val() == '') {
                        w2alert("Please enter payment amount");
                        return;
                    }
                    if ($('input[type=radio][name="ctl00$ContentPlaceHolder1$recurring1"]:checked').val() == undefined) {
                        w2alert("Please select payment option");
                        return;
                    }
                    param += "&paymentSchedule=" + $('input[type=radio][name="ctl00$ContentPlaceHolder1$recurring1"]:checked').val();
                    if ($('input[type=radio][name="ctl00$ContentPlaceHolder1$recurring1"]:checked').val() == 4)
                        param += "&paymentfrequency=" + $("#SelectedDate option:selected").val();


                    param += "&maxpaymentamount=" + $('#txtPaymentAmountAuto').val();
                }
                param += "&recurringoption=" + $('input[name="ctl00$ContentPlaceHolder1$recurring"]:checked').val(),
                param += "&startpayment=" + $("#txtStartPayment").val(),
                param += "&paymentperiodsetting=" + $('#ddlPaymentPeriodSetting :selected').val(),
                param += "&paymentfrequencysetting=" + $('#ddlPaymentFrequencySetting :selected').val();
                param += "&lastpayment=" + $("#txtLastPayment").val();
                var inputparam = {
                    json: param,                    
                    payment: (accountId + ':' + accounttype),
                }
                loader.showloader();
                $.ajax({
                    type: "POST",
                    url: "recurringpayment.aspx/SaveRecurringData",
                    data: JSON.stringify(inputparam),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });
            });

            $("#btnDeleteRecurring").click(function () {

                loader.showloader();
                $.ajax({
                    type: "POST",
                    url: "recurringpayment.aspx/DeleteRecurringData",
                    //data: JSON.stringify(inputparam),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccessDelete,
                    error: OnError
                });
            });


        });

        $(document).ready(function () {
            if ($("#wugrid input:checkbox:checked").length > 0) {

                $("#btnDeleteRecurring").attr("disabled", false);
            }
            else {

                $("#btnDeleteRecurring").attr("disabled", true);
            }

            $('#btnUpdate').click(function () {
                $('#divupdaterecur').hide();
                $('#divaddrecur').show();
                return false;
            });
        });


        function OnSuccessDelete(data, status) {
            loader.hideloader();
            var result = data.d;
            var Messages = result.split(',')[2].split(':');
            if (status == 'success') {
                alert("Recurring payment profile deleted Sucessfully");
                location.reload();
                //LoadGrid('wugrid');
            }
            else {
                w2alert(status);
            }
        }

        function OnError(data, status) {
            alert(request.statusText);
            loader.hideloader();
        }
        function OnSuccess(data, status) {
            loader.hideloader();
            var result = data.d;
            var Messages = result.split(',')[2].split(':');
            if (status == 'success') {
                var length = Messages.length;
                if (length <= 2) {
                    var usermessage = Messages[1].replace("\"", "");
                    if (usermessage == 'null') {
                        alert("Recurring payment profile created Sucessfully");
                        location.reload();
                    }
                    else
                        w2alert(usermessage);
                }
                else {

                    Message = Messages[1].replace("\"", "") + '.' + Messages[2].replace("\"", "");

                    if (Messages[2].replace("\"", "") == '' || Messages[2].replace("\"", "") == 'null') {
                        alert("Recurring payment profile created Sucessfully");
                        location.reload();
                    }
                    else
                        w2alert(Message);
                }
            }
            else {
                w2alert(status);
            }
        }

        function checkDate(sender, args)
        {
            var payfreqsett = $('#ddlPaymentPeriodSetting :selected').val();          
            if (payfreqsett == 2)
            {
                if (Date.parse(sender._selectedDate.format("MM/dd/yyyy")) >= Date.parse($("#txtLastPayment").val()))
                {
                    w2alert("Start payment date can't greater than last payment date!");                   
                    sender._selectedDate = new Date();
                    // set the date back to the current date
                    sender._textbox.set_Value(sender._selectedDate.format(sender._format))
                }

            }
            
        }
        
    </script>
    <style type="text/css">
        @media screen and (min-width:0\0){
        .right_content_box ul li {
            height:auto;
        }
        }
        .name-feild {
            /*margin-left: 16px;*/
            width: 20%;
            margin-bottom: 15px;
        }

        #ulFixed .name-feild, #ulAuto .name-feild {
            width: 26%;
        }

        #ulFixed .name-feild, #ulAuto .name-feild, #ulFixed .sub-name, #ulAuto .sub-name {
            margin-bottom: 0px;
        }

        .sub-name {
            width: 30%;
            float: left;
            margin-bottom: 15px;
        }



        .inner-right-sub {
            padding-top: 0px;
            padding-bottom: 0px;
        }

        .profile-details {
            width: 100%;
            padding: 11px 22px;
        }

        .acc_inner_box_1 .profile-details:nth-child(odd) {
            background: #f4f4f4;
        }

        .inner_mid_section select, .inner_mid_section input[type="text"] {
            width: 69%;
        }

        .fixed_pay_inpt {
            margin-top: 1px !important;
            margin-right: 6px !important;
        }

        .right_content_box ul li {
            border-bottom: 0px solid #f4f4f4;
        }

        .rec_payment_box .name-feild {
            line-height: 25px;
        }

        /*#ulFixed .name-feild {
            line-height: 35px;
        }*/

        .ajax__calendar .ajax__calendar_container {
            margin-top: 0 !important;
        }

        .sub_name_recurr ul {
            margin: 23px 0px 0px 17px;
            padding: 0;
            list-style: none;
        }

            .sub_name_recurr ul li {
                margin: 0;
                padding: 0;
                width: 100%;
            }

            .sub_name_recurr ul ul {
                clear: both;
                width: 100%;
                margin: 10px 0px 5px 15px;
                padding: 7px 0px 0px 20px;
                border-top: 1px solid #F0F0F0;
            }

                .sub_name_recurr ul ul li {
                    margin: 0;
                    border: none !important;
                    padding: 3px 0px 0px 0px;
                    width: 100%;
                }


                    .sub_name_recurr ul ul li input[type="text"] {
                        margin: 0;
                        padding: 4px 5px;
                        float: left;
                        width: 18%;
                    }

                    .sub_name_recurr ul ul li select {
                        margin: 0px 0 2px 0px;
                        padding: 4px 5px;
                        float: left;
                        /*width:18%*/
                    }

        .buttons_area {
            border-top: 1px solid #f4f4f4;
            border-bottom: 0px solid #fff;
        }
    </style>
    <section class="inner_mid_section">
        <div class="container inner-mid-container">
            <div class="energy_mid_box">
                <h1>
                    <img src="../images/icon_myaccount_sidebar.svg" style="padding-right: 7px; margin-top: -3px; float: left;">
                    <span class="head_icon_flat icon_myaccount"></span>
                    <span globalize="ML_MYACCOUNT_h1_Myaccount"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_h1_Myaccount") %></span>
                </h1>
                <div class="sidebar_toggle">Sidebar Navigation</div>
                <div class="nav_left">
                    <ul>
                     <li class="icon_profile"><a href="account.aspx"><span globalize="ML_MYACCOUNT_Navigation_Profile"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Navigation_Profile") %></span></a></li>
                       <li class="icon_setting"><a href="../Settings.aspx"><span globalize="ML_MyAccount_div_Settings"><%= CustomerPortal.Translator.T("ML_MyAccount_div_Settings") %></span></a></li>            
                       <li class="ico_recurringpayment active"><a><span>Recurring Payment</span></a></li>
                    </ul>
                    <div class="banner_left_img">
                        <img src="../images/banner_ads/image004.png" />
                        <a href="programs.aspx">
                            <img src="../images/banner_ads/image003.png" /></a>
                    </div>
                </div>
                <div class="right_content_box" style="position: relative;">
                    <div style=" overflow: auto;">
                        <div class="inner-right-right-section">
                            <div id="accountdetails" class="inner-right-sub acc_inner_box_1" style="border: 0px;display:none">
                                <div class="profile-details">
                                    <div class="name-feild" globalize="ML_MYACCOUNT_Lbl_Name"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_Name") %></div>
                                    <div class="sub-name">
                                        <asp:Label ID="lblName" runat="server" Text=""></asp:Label></div>
                                </div>
                                <div class="profile-details">
                                    <div class="name-feild" globalize="ML_MYACCOUNT_Lbl_CustomerAccount"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_CustomerAccount") %></div>
                                    <div class="sub-name">
                                        <asp:Label ID="lblCustomerAccount" runat="server" Text=""></asp:Label></div>
                                </div>

                            </div>

                            <div id="divPayment" runat="server" class="inner-right-sub" style="border: 0px; display:none;">
                                <div class="profile-details" style="background: #ededed; padding-bottom: 8px; padding-top: 8px;">
                                    <div class="inner-address"><b><span globalize="ML_MYACCOUNT_Lbl_PaymentInfo"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_PaymentInfo") %> </span></b>(<span globalize="ML_MyAccount_span_Default"><%= CustomerPortal.Translator.T("ML_MyAccount_span_Default") %></span>)</div>
                                </div>
                                <div id="wugrid" style="height: 280px !important; overflow: auto; width: 100% !important; z-index: 99;">
                                </div>
                            </div>
                            
                          <div id="divupdaterecur" runat="server" clientidmode="Static" class="rec_payment_account">
                            <div class="profile-details" style="background: #ededed; padding-bottom: 8px; padding-top: 8px;">
                                <div class="inner-address"><b><span> Recurring Payments </span></b></div>
                            </div>
                        <div class="profile-details">
                            <div id="AccountDetails">
                                    <div class="name-feild" globalize="">Card Type/ Bank account:</div> 
                                    <div class="sub-name">                                 
                                       <asp:TextBox ID="txtCard" runat="server" ReadOnly="true"></asp:TextBox>                                        
                                     </div> 
                                    <div class="name-feild" globalize="">Number:</div> 
                                    <div class="sub-name">                                 
                                       <asp:TextBox ID="txtNumber" runat="server" ReadOnly="true"></asp:TextBox>
                                    </div>
                                <div class="clearfix"></div>
                                   <div class="name-feild" globalize="">Nick Name:</div> 
                                    <div class="sub-name">                                 
                                       <asp:TextBox ID="txtNickName" runat="server" ReadOnly="true"></asp:TextBox>
                                    </div>
                                <div class="buttons_area">                       
                                  
                                  <asp:Button ID="btnDeleteRecurring" runat="server" ClientIDMode="Static" CssClass="submit-button" Text="Delete" OnClientClick="return false;"/>
                                   <asp:Button ID="btnUpdate" runat="server" ClientIDMode="Static" CssClass="submit-button" Text="Update"  />
                               </div>
                            </div>
                             </div>
                            </div>
                            
                            <div id="divaddrecur" runat="server" clientidmode="Static" class="rec_payment_box">
                                 <div class="profile-details" style="background: #ededed; padding-bottom: 8px; padding-top: 8px;">
                                    <div class="inner-address"><b><span>Enter Your Payment Information </span></b></div>
                                </div>
                                <div class="profile-details">
                                    <div class="name-feild" globalize="">Method of Payment:</div> 
                                    <div class="sub-name">                                 
                                        <asp:DropDownList ID="ddlPaymentType" runat="server" ClientIDMode="Static">
                                            <asp:ListItem Text="Credit Card" Value="CC"></asp:ListItem>
                                            <asp:ListItem Text="Bank Account" Value="ACH"></asp:ListItem>
                                        </asp:DropDownList>
                                     </div> 
                                    <div class="name-feild" globalize="">Account Number:</div> 
                                    <div class="sub-name">                                 
                                        <asp:DropDownList ID="ddlAccount" runat="server" ClientIDMode="Static">
                                        </asp:DropDownList>
                                     </div>
                                    <div class="name-feild" globalize="">Start Payment:</div>
                                    <div class="sub-name">
                                        <asp:TextBox ID="txtStartPayment" Enabled="false" runat="server" ClientIDMode="Static" style="  width: 69%;  margin-right: 6px;"></asp:TextBox>
                                        <asp:ImageButton runat="server" ID="imgbtnCalender" ImageUrl="~/images/Icon-Calendar.svg" Style="vertical-align: middle;"></asp:ImageButton>
                                        <asp:CalendarExtender ID="Cal_Date" runat="server" TargetControlID="txtStartPayment" Format="MM/dd/yyyy"
                                            Enabled="True" PopupButtonID="imgbtnCalender" OnClientDateSelectionChanged="checkDate">
                                        </asp:CalendarExtender>                                        
                                    </div> 
                                                                  
                                    
                                    <div class="name-feild" globalize="">Payment Period Setting:</div>
                                    <div class="sub-name">
                                        <asp:DropDownList ID="ddlPaymentPeriodSetting" runat="server" ClientIDMode="Static">
                                            <asp:ListItem Text="Valid until further notice" Value="1"></asp:ListItem>
                                            <asp:ListItem Text="End of a given date (LastPayment)" Value="2"></asp:ListItem>
                                            <%--<asp:ListItem Text="2" Value="2"></asp:ListItem>--%>
                                        </asp:DropDownList>
                                    </div>
                                    <div class="clear"></div>                                  
                                      <br />    
                                    <div id="lstPaydiv" runat="server" clientidmode="Static" style="display:none;">                                                                
                                        <div class="name-feild" globalize="">Last Payment:</div>
                                        <div class="sub-name">
                                            <asp:TextBox ID="txtLastPayment" runat="server" Enabled="false" ClientIDMode="Static" style="  width: 69%;  margin-right: 6px;"></asp:TextBox>
                                            <asp:ImageButton runat="server" ID="imgbtnCalender2" ImageUrl="~/images/Icon-Calendar.svg" Style="vertical-align: middle;"></asp:ImageButton>
                                            <asp:CalendarExtender ID="Cal_Date1" runat="server" TargetControlID="txtLastPayment" Format="MM/dd/yyyy"
                                                Enabled="True" PopupButtonID="imgbtnCalender2">
                                            </asp:CalendarExtender>
                                        </div>     
                                     </div>   
                                    
                                                             
                                </div>
                                     <div class="clear"></div>
                                    <br />                          
                                    <div class="name-feild" globalize="" style="background: #ededed; width:100%;   margin-bottom:0;   padding: 6px 26px;font-size:14px;"><b>Recurring Option: </b></div>
                                   <div class="profile-details">
                                    <div class="sub_name_recurr" style="width:100%; clear:both; margin:0px auto;">                                           
                                        <ul style="margin:0; padding-top:10px;">
                                            <li id="rdFixed"><input class="fixed_pay_inpt" type="radio" name="recurring" value="1" runat="server" id="rdofixed" clientidmode="Static" /><b> Fixed Payment Amount</b>
                                                <ul id="ulFixed">
                                                    <div class="name-feild" globalize="">Payment Amount:</div>
                                                    <div class="sub-name" style="margin-bottom:3px;"><asp:TextBox ID="txtPaymentAmount" runat="server" onkeypress="return IsNumeric(event);" MaxLength="3" ClientIDMode="Static"></asp:TextBox></div>
                                                     <div class="clear"></div>
                                                    <li>
                                                    <div class="name-feild" globalize="">Payment Frequency Setting:</div>
                                                    <div class="sub-name" >
                                                        <asp:DropDownList ID="ddlPaymentFrequencySetting" runat="server" ClientIDMode="Static">                                            
                                                            <asp:ListItem Text="Pay weekly on weekOfDay" Value="1"></asp:ListItem>
                                                            <asp:ListItem Text="Payment monthly on dayOfMonth" Value="2"></asp:ListItem>
                                                        </asp:DropDownList>
                                                    </div> 
                                                        </li>
                                                    <li id="FixedMonthly" runat="server" clientidmode="Static">
                                                        <div class="name-feild"><input type="radio" name="recurring2"  value="2" runat="server" id="radiorecurring2" clientidmode="Static"/> <span>Pay Monthly on</span></div>
                                                        <div class="sub-name">
                                                        <select name="DueDate" runat="server" id="ddlMonthly" clientidmode="Static">
                                                        <option value="1">01</option>
                                                        <option value="2">02</option>
                                                        <option value="3">03</option>
                                                        <option value="4">04</option>   
                                                        <option value="5">05</option>
                                                        <option value="6">06</option>
                                                        <option value="7">07</option>
                                                        <option value="8">08</option> 
                                                        <option value="9">09</option>
                                                        <option value="10">10</option>
                                                        <option value="11">11</option>
                                                        <option value="12">12</option>  
                                                        <option value="13">13</option>
                                                        <option value="14">14</option>
                                                        <option value="15">15</option>  
                                                        <option value="16">16</option>
                                                        <option value="17">17</option>
                                                        <option value="18">18</option>  
                                                        <option value="19">19</option>
                                                        <option value="20">20</option>
                                                        <option value="21">21</option>
                                                        <option value="22">22</option>
                                                        <option value="23">23</option>
                                                        <option value="24">24</option>
                                                        <option value="25">25</option>
                                                        <option value="26">26</option>
                                                        <option value="27">27</option>
                                                        <option value="28">28</option>
                                                        <option value="29">29</option>                                                                                                            
                                                        </select>
                                                            </div></li>
                                                    <li id="FixedWeekly" runat="server" clientidmode="Static">
                                                        <div class="name-feild"><input type="radio" name="recurring2"  value="3" runat="server" id="radioWekly" clientidmode="Static" style="margin-right: 3px;position: relative;top: 2px;"/><span>Pay Weekly on</span></div>
                                                        <div class="sub-name">
                                                         <select name="DueDate" runat="server" id="ddlWeekly" clientidmode="Static">
                                                        <option value="1">Monday</option>
                                                        <option value="2">Tuesday</option>
                                                        <option value="3">Wednesday</option>
                                                        <option value="4">Thursday</option>                                                        
                                                        <option value="5">Friday</option> 
                                                        </select>
                                                            </div>

                                                    </li>                                                    
                                                </ul>
                                            </li>
                                            <br />
                                            <li id="rdAuto"><input class="fixed_pay_inpt" type="radio"  name="recurring" value="2" checked="true" runat="server" id="rdordAuto" clientidmode="Static"/><b> Auto Payment Amount</b>
                                                <ul id="ulAuto">
                                                    <div class="name-feild">Payment Amount:</div>
                                                    <div class="sub-name"><asp:TextBox ID="txtPaymentAmountAuto" runat="server" onkeypress="return IsNumeric(event);" MaxLength="3" ClientIDMode="Static"></asp:TextBox></div>
                                                    <li id="BillArr" ><input type="radio" name="recurring1" value="2" checked="true" runat="server" id="rdbbillAri" clientidmode="Static" />&nbsp;&nbsp;&nbsp;when bill arrives</li>
                                                    <li id="OnDueDate"><input type="radio" name="recurring1" value="3" runat="server" id="rdbpaymentScheduleOnDueDate" clientidmode="Static" />&nbsp;&nbsp;&nbsp;on Due Date</li>
                                                    <li id="SelectedDate"><input type="radio" name="recurring1" value="4" runat="server" id="rdbpaymentScheduleSelectedDate" clientidmode="Static" style=" margin-top: 12px;"/>&nbsp;&nbsp;&nbsp;
                                                       <select name="DueDate" runat="server" id="ddlpaymentSchedule" clientidmode="Static" style="  width: 12%;  margin-right: 5px; margin-left:0;position:relative; top:6px;">
                                                        <option value="28">28</option>
                                                        <option value="29">29</option>
                                                        <option value="30">30</option>
                                                        <option value="31">31</option>                                                        
                                                        </select> <span style="padding-top: 10px;">days before the due date</span></li>                                                      
                                                </ul>
                                            </li>
                                        </ul>                                    
                                    </div>
                            </div>
                           
                                  <div class="buttons_area">                              
                                    <asp:Button ID="btnSaveRecurring" runat="server" ClientIDMode="Static" CssClass="submit-button" Text="Save" OnClientClick="return false;" globalize="ML_MYACCOUNT_Button_SaveAll" />
                                    <asp:Button ID="btnDeleteRecurring1" runat="server" Visible="false" ClientIDMode="Static" CssClass="submit-button" Text="Delete" OnClientClick="return false;" globalize="ML_RecurringBill_Caption_Delete" />
                                </div>
                            </div> </div>
                    </div>
                   
                </div>
                <!-- End Right Box -->
                
            </div>
        </div>
    </section>

    </section>
</asp:Content>
