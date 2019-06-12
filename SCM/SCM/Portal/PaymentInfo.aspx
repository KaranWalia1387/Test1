<%@ Page Title="" Language="C#" MasterPageFile="~/MyAccount.master" AutoEventWireup="true" CodeBehind="PaymentInfo.aspx.cs" Inherits="CustomerPortal.PaymentInfo" %>

<%@ Register Src="~/UserControls/AddUpdatePayment.ascx" TagPrefix="uc1" TagName="AddUpdatePayment" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <script src="js/jquery-1.8.3.min.js" type="text/javascript"></script>
    <script src="js/MyAccount.js" type="text/javascript"></script>
    <script src="js/Translator.js" type="text/javascript"></script>
    <link href="../js/w2Ui/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="../js/w2Ui/w2ui-1.4.2.min.js" type="text/javascript"></script>
    <script src="js/w2Ui/w2ui-1.4.2.js" type="text/javascript"></script>
    <link href="js/w2Ui/w2ui-1.4.2.css" rel="stylesheet" />

    <style type="text/css">
        #grid_wugrid_toolbar {
            display: none !important;
        }

        #grid_wugrid_body {
            top: 0 !important;
        }

        label#lblcardtype img {
            margin-right: 3px;
        }

        .input-phone {
            background: #fff;
        }

        .profile-details {
            width: 100%;
            padding: 11px 22px;
        }

        .gray-box {
            padding: 9px 22px;
        }

        .gray-box_rem_marg {
            padding: 6px 22px !important;
        }

        .selector-text {
            margin: 0px;
            font-weight: bold;
        }

        .power-plan-selector span {
            padding: 0px;
        }

        .inner-right-sub {
            padding-top: 0px;
        }

        .my_account_divider {
            border-top: 1px solid #ccc;
            float: left;
            margin-bottom: 10px;
            margin-left: 0px;
            margin-top: 11px;
            width: 100%;
        }

        .profile-details .name-feild {
            font-weight: bold;
        }

        .profile-details table td, th {
            padding: 7px 10px;
            width: 20%;
            border: 1px solid #ccc;
            border-spacing: 0px;
            border-collapse: collapse;
        }

        .my_acc_tbl table td, th {
            width: 80%;
            padding-left: 3%;
        }

        .my_acc_tbl .address-1 {
            width: 50%;
        }


        .my_acc_tbl table td:nth-child(2n+1), th:nth-child(2n+1) {
            width: 20%;
            padding-left: 3%;
        }

        .acc_inner_box_1 .profile-details:nth-child(odd) {
            background: #f4f4f4;
        }

        .acc_inner_box_1 .profile-details input {
            margin-top: 1px;
        }

        .DefaultbtnsSmall {
            background-position: -0px 0px;
            font-weight: bold;
            padding: 5px 26px;
            margin-bottom: 5px;
            -webkit-border-radius: 9px;
            -moz-border-radius: 9px;
            border-radius: 9px;
        }
         .inner_uni1
        {
            height:81% !important;
        }
        .inner_uni2
        {
            height:80% !important;
        }
        .inner_uni2 .setting_save_box
        {
            padding-top:12px !important;
        }
        .inner_uni3
        {
            height:78% !important;
        }
       .inner_uni3 .setting_save_box
        {
            padding-top:4px !important;
        }
         .inner_uni4
        {
            height:75% !important;
        }
            .w2ui-grid .w2ui-grid-body table td {
             padding-left:17px !important;
         }
    </style>

    <script type="text/javascript">
        var r = '';
        var databindtogrid;
        var editcolumn = false;
        var flagDeleteRow = false;

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
                     { field: 'EXPDate', caption: 'EXP Date', size: '20%', type: 'text' },
                     { field: 'Default', caption: 'Default', size: '20%', type: 'text' }

                ],
                columns: [
                    { field: 'CardTypOrBankAcc', caption: 'Card Type / Bank Account', size: '20%', sortable: true, resizable: false, },
                    { field: 'Number', caption: 'Number', size: '20%', sortable: true, resizable: false, },
                    { field: 'EXPDate', caption: 'EXP Date', size: '20%', sortable: true, resizable: false, },
                    { field: 'Default', caption: 'Default', size: '20%', sortable: true,resizable:false, }
                ],
                records: databindtogrid,
            });
        }

        $(document).ready(function () {
            $(".payment_info").addClass('active');
            try {
                $('#addnewpayment').hide();
                var paymentdata = account.LoadW2UIGridData().value;
                if (paymentdata != null) {
                    databindtogrid = paymentdata.Rows;
                    if (databindtogrid.length != 0 || databindtogrid != null) {
                        LoadGrid('wugrid');
                    }
                }
            }
            catch (e) {
                console.log(e.message);
            }

            k('.deleterow').live('click', function (e) {
                try {
                    var grid = this;
                    var res = w2confirm('Do you want to delete?', function (obj) {
                        if (obj == 'Yes') {
                            // flagDeleteRow = true;

                            var msg = account.deleteRecord(grid.id).value;
                            w2alert(msg);
                            databindtogrid = account.LoadW2UIGridData().value.Rows;
                            if (databindtogrid.length != 0 || databindtogrid != null) {
                                //The following code loads w2ui grid with a different name everytime a record is deleted.                                
                                LoadGrid($('#wugrid').attr('name') + Math.floor((Math.random() * 100) + 7));

                            }
                        }
                    })
                }
                catch (e) {
                    console.log(e.message);
                }
            });

            $('#btnEnrollNow').click(function () {
                $('#addnewpayment').show();
                $('#divconfirmbackbuttons').show();
                $('#btnEnrollNow').hide();
                if (common.checksession().value) {
                    location.reload();
                }
                isenroll = true;
                $('#divEdittitle').show();
                $('#divEditEnrollNow').show();
                $('#divEnrollNow').hide();
                $('#divconfirmbackbuttons').show();
                $('#divcreditbankinfo').hide();
                $('#divSaveButton').hide();
            });

            $('#btnBackBank').click(function () {
                $('#addnewpayment').hide();
                if (isenroll) {
                    $('#btnEnrollNow').show();
                    $('#divEdittitle').hide();
                    $('#divEditEnrollNow').hide();
                    $('#divEnrollNow').show();
                    $('#divconfirmbackbuttons').hide();
                    $('#divcreditbankinfo').show();
                    $('#divSaveButton').show();
                }
                else {
                    iswithdraw = false;
                    $('#divAlreadyEnrolled').show();
                    $('#divchangetext').show();
                    $('#divchangebuttons').show();
                    $('#divEdittitle').hide();
                    $('#divEditEnrollNow').hide();
                    $('#divconfirmbackbuttons').hide();
                    $('#divcreditbankinfo').show();
                    $('#divSaveButton').show();
                }
            });

            function createParameters() {
                return param = "";
            }

            $('#btnConfirmBank').click(function () {
                if ($('#chkBankDraft').prop("checked") == true) {
                    var param = {
                        json: createParameters(),
                        payment: ($('#wugrid div input[type=radio]:checked').val() == undefined ? null : $('#wugrid div input[type=radio]:checked').val()),
                    }
                    loader.showloader();
                    $.ajax({
                        type: "POST",
                        url: "PaymentInfo.aspx/SaveDataAsync",
                        data: JSON.stringify(param),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: OnSuccess,
                        error: OnError
                    });
                }
                else {
                    w2alert("Kindly authorize SCM ");
                }
            });

            function OnSuccess(data, status) {
                if ((JSON.parse(data.d).Table[0].Status) > 0) {
                    w2alert(JSON.parse(data.d).Table[0].Message);
                    $('#addnewpayment').hide();
                    if (isenroll) {
                        $('#btnEnrollNow').show();
                        $('#divEdittitle').hide();
                        $('#divEditEnrollNow').hide();
                        $('#divEnrollNow').show();
                        $('#divconfirmbackbuttons').hide();
                        $('#divcreditbankinfo').show();
                        $('#divSaveButton').show();
                    }
                }
                else
                    w2alert('Your request could not send successfully.');
                loader.hideloader();
            }

            function OnError(request, status, error) {
                alert('Error ' + request.statusText);
                loader.hideloader();
            }
        });
    </script>
<script type="text/javascript" src="js/detect-zoom.js"></script>
<script type="text/javascript">
    function refresh() {
        //var zoom = $('#zoom');
        var device = $('#devices');
        //zoom.text(window.detectZoom.zoom().toFixed(2));
        //device.text(window.detectZoom.device().toFixed(2));
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
    <input type="hidden" class="activeli_list" value="myaccount"/>
                <div class="right_content_box" style="position:relative;">
                    <div style="height:89%; overflow:auto;" class="height">
                        <div class="inner-right-right-section">
                            <div class="AccountProfile" style="width: 100%; position: relative; padding:10px;">
                                <p style="background: #f2f2f2;font-size: 15px;font-weight: bold;margin: 0 0px 18px 0px;padding: 6px 7px;">Automatic Bank Draft Authorization</p>
                                <div id="divEnrollNow">
                                    <p style="padding: 0px 7px 6px;">Bank Draft is the easiest and most economical way to pay your bill. The amount of your bill is automatically deducted from your checking account on your bill's due date. You still receive a bill so you can maintain records, but you'll never have to worry about paying your electric bill on time again.</p>                               
                                </div>
                                <div id="divAlreadyEnrolled" style="display: none;">
                                    <div class="MyAddressContainerTitle">
                                        <div class="BankName" style="width: 141px;">
                                            &nbsp;Description
                                        </div>
                                        <div class="AccCard" style="width: 180px;">
                                            Account Holder
                                        </div>
                                        <div class="AccCard" style="width: 180px;">
                                            Account # 
                                        </div>
                                        <div class="MyHouseEditBtn" style="width: 133px;">
                                            Routing #
                                        </div>
                                        <div class="clear">&nbsp;</div>
                                </div>
                                <div id="tblBankDraftInfo" style="width: 100%; height: 35px; overflow: auto;"></div>
                            </div>
                                <div id="divchangetext" style="display: none;">
                                <p id="spanchangetext" style="padding: 0px 7px 6px; text-align: center;">You have enrolled in Automatic Bank Draft</p>
                            </div>
                                <div id="divchangebuttons" style="display: none; padding-top: 7px; width: 45%;">
                                <input type="button" id="btnChangeBank" value="CHANGE" class="DefaultbtnsSmall" />
                                <input type="button" id="btnWithdrawBank" value="WITHDRAW" class="DefaultbtnsSmall" />
                            </div>
                                <div id="divEdittitle" style="display: none;">
                                <div class="MyAddressContainerTitle">
                                    Description of Bank Details
                                    <div class="clear">
                                        &nbsp;
                                    </div>
                                </div>
                            </div>
                                <div id="divEditEnrollNow" style="display: none; background: #fff;">
                                <p style="padding: 0px 7px 6px;">Until further notice, I hereby instruct you to deduct the amounts that become due from my account. I confirm that the bank or other financial institution managing my account is not under obligation to collect such amounts if there are insufficient funds in my account to cover this. </p>
                                <p style="padding: 0px 0px 6px 7px;">
                                    <asp:CheckBox ID="chkBankDraft" runat="server" ClientIDMode="Static" Text=" I authorize SCM to withdraw my bill amount from my checking account on the due date posted on my bill" />
                                </p>
                                <div id="divcreditbankinfo">
                                    <div class="AccountProfile" id="divCardDetail" runat="server" clientidmode="Static">
                                <h3 class="profileHeading" style="float: left; width: 190px;">Credit/Debit Card/Bank Info</h3>
                                <div class="clear">
                                    &nbsp;
                                </div>
                                <div class="MyAddressContainerTitle">
                                    <div class="BankName">
                                        &nbsp;Description
                                    </div>
                                    <div class="AccCard">
                                        &nbsp;Type & Number
                                    </div>
                                    <div class="ExpiryDate">
                                        Exp. Date
                                    </div>
                                    <div class="MyHouseRadioBtn">
                                        Default
                                    </div>
                                    <div class="MyHouseEditBtn">
                                        Edit
                                    </div>
                                    <div class="MyHouseDeleteBtn">
                                        Delete
                                    </div>
                                    <div class="clear">
                                        &nbsp;
                                    </div>

                                </div>
                                <div id="tblPayment" style="width: 100%; height: 80px; margin-bottom: 7px; overflow: auto;">
                                </div>
                                <div style="float: right; margin-right: 10px; margin-top: 0px;" id="divAddImage" runat="server" clientidmode="Static">
                                    <input type="submit" id="imgAdd" class="DefaultbtnsSmall" value="ADD NEW" />
                                </div>
                                <div class="clear">
                                    &nbsp;
                                </div>
                            </div>
                                </div>
                            </div>                            
                          </div>  
                            <div id="wugrid" style="height:280px !important;overflow:auto; width:100% !important;z-index:99;"></div>
                        </div><!-- End Right Box -->
                    </div>
                    <div class="setting_save_box">
                         <div class="buttons_area">                                 
                             <uc1:AddUpdatePayment runat="server" id="AddUpdatePayment" />
                             <div id="divEnroll" runat="server" clientidmode="Static">
                                 <div id="btnEnrollNow" class="submit-button" style="cursor:pointer;">
                                     <span style="float: left;padding-top: 2px;" id="enrollspan" runat="server">ENROLL NOW</span>
                                 </div>
                                 <div id="divconfirmbackbuttons" style="display:none;">
                                     <input type="button" id="btnConfirmBank" value="CONFIRM" class="submit-button" />
                                     <input type="button" id="btnBackBank" value="BACK" class="submit-button" />
                                 </div>
                             </div>                         		    
                          </div>   
                     </div>                     
                </div>
            

    <div class="modal fade" id="divValidateLogin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-backdrop fade"></div>
        <div class="modal-dialog popup_area" style="width: 35%;">
            <div class="modal-content">
                <div class="modal-header" style="padding: 7px 15px;">
                    <button type="button" id="btnclosepopup1" class="close " data-dismiss="modal">
                        <img src="images/cross-icon.png" /></button>
                    <h4 class="modal-title" id="myModalLabelheadertext1" globalize="">Enter Password</h4>
                </div>
                <div class="modal-body">
                    <div class="popup_area_home">
                        <div style="clear: both;">&nbsp;</div>
                        <div id="div1" runat="server" clientidmode="Static">
                            <div class="popup_left_content_area_home">Password</div>
                            <div class="popup_right_content_area_home">
                                <asp:TextBox ID="txtValidatePassword" runat="server" mandatory="1" TextMode="Password"
                                    MaxLength="30" ClientIDMode="Static" title="Password" CssClass="form-control"></asp:TextBox>
                            </div>
                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home">Confirm Password</div>
                            <div class="popup_right_content_area_home">
                                <asp:TextBox ID="txtConfirmPassword" runat="server" mandatory="1" TextMode="Password"
                                    MaxLength="30" ClientIDMode="Static" title="Confirm Password" CssClass="form-control"></asp:TextBox>
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                    <div class="bottom_area_home">
                        <asp:Button ID="btnValidateLogin" runat="server" Text="Submit" class="submit-button" data-toggle="modal" data-target="#divPopup1" OnClientClick="return false;" ClientIDMode="Static" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <span globalize="ML_ACCOUNT_h4_PaymentMode" id="addtext" style="display: none"></span>
    <span globalize="ML_ACCOUNT_h4_PaymentModeEdit" id="edittext" style="display: none"></span>
    <span globalize="ML_Title_My_Account" id="titletext" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Success_Card_Delete" id="SuccessMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Success_BankAccount_Delete" id="SuccessDelMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Transaction_Failed" id="TxnFailedMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_BankInfo_Added" id="BankInfoAddedMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_CreditInfo_Added" id="CrInfoAddedMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Failed_Auth" id="FailedAuthMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_BankAccount_Updated_Success" id="BankUpdatedSucMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Failed_Auth_Card" id="FailedAuthCardMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Success_CreditUpdate" id="CardUpdateSucMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_FailedTxn" id="FailedTxnMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Select_PaymentInfo" id="PaymentInfMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Delete_Confirmation" id="DeleteConfMsg" style="display: none"></span>
</asp:Content>
