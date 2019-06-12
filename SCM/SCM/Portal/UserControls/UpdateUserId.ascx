<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="UpdateUserId.ascx.cs" Inherits="CustomerPortal.UserControls.UpdateUserId" %>
<style>
     #change-userid-divPopup .popup_area {
            height: auto !important;
        }
</style>
<script>
    $(document).ready(function () {
        $('#btnChangeUserId').click(function () {
            try{
                var txtOldUserID = $('#txtUserid').val().trim();
                var txtNewUserID = $('#txtNewUserId').val().trim();

                if (ValidateAllPageFieldsSingleMessage('changeUserId')) {
                    if (txtOldUserID == txtNewUserID) {
                        error.showerror($('#txtUserid'), $('#ML_Master_Error_SameUserID').text());
                        return true;
                    }

                    else if (validateUserid(txtNewUserID)) {


                        var result = Master.UpdateUserID(txtOldUserID, txtNewUserID).value;
                        if (result != null && result.Rows.length > 0) {

                            if (result.Rows[0]["STATUS"] == '1') {
                                //toastr.success(result.Rows[0]["Message"]);
                                toastr.success($('#ML_Master_lbl_UserID').text());
                                $('#btnclosepopup').click();
                                window.location.href = $('#hdnCommonUrl').val() + "/signout.aspx";
                            }
                            else {
                                w2alert(result.Rows[0]["Message"], 'Notification', function () {
                                    if (result.Rows[0]["AttemptLeft"] == "0") {
                                        //window.location = "signout.aspx";
                                        $.fn.idleTimeout().logout();
                                    }
                                });
                           
                            }
                        }
                        else {
                            toastr.error($('#ML_Master_ErrMsg_UserID').text());
                            return false;
                        }
                    }
                    else
                        return false;
                }
            }
            catch (e) {
                console.log(e);
            }

        })


        $('#btnclosepopup2').click(function () {
            $('#changeUserId input[type="text"]').val('');
           
            //if (location.href.indexOf('BillDashboard.aspx') > 0) {

            //    $('#txtWater').val($('#waterPay').val());
            //    $('#txtElectric').val($('#electricPay').val());
            //    $('#txtSolid').val($('#solidPay').val());
            //    $('#txtGas').val($('#gasPay').val());
            //    if ($('#txtWater').hasClass('errorbox'))
            //        $('#txtWater').removeClass('errorbox');
            //    if ($('#txtElectric').hasClass('errorbox'))
            //        $('#txtElectric').removeClass('errorbox');
            //    if ($('#txtSolid').hasClass('errorbox'))
            //        $('#txtSolid').removeClass('errorbox');
            //    if ($('#txtGas').hasClass('errorbox'))
            //        $('#txtGas').removeClass('errorbox');
            //}

        });

        $('#btnCancelUserId').click(function(){
            $('#changeUserId input[type="text"]').val('').removeClass('errorbox');
         })
    });
   
</script>

<div class="modal fade" id="change-userid-divPopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog popup_area">
        <div class="modal-content" id="changeUserId">
            <div class="modal-header">
                <button type="button" id="btnclosepopup2" class="close " data-dismiss="modal">
                    <img src="images/cross-icon.png" /></button>
                <h4 class="modal-title-changepwd" id="myModalLabel"><%= CustomerPortal.Translator.T("ML_Master_lbl_ChangeUsrID") %></h4>
                <span id=""></span>
            </div>
            <div class="modal-body" id="changeUIbody">
                <div class="popup_area_home">
                    <div class="popup_left_content_area_home"> <%= CustomerPortal.Translator.T("ML_CHANGEUSRIDPOPUP_OLDID") %>:</div>
                    <div class="popup_right_content_area_home">
                        <input type="text" id="txtUserid" maxlength="30" mandatory="1" title="Existing UserId" globalize="ML_CHANGEUSRIDPOPUP_OLDID" autocomplete="off" />
                    </div>
                    <div style="clear: both;"></div>
                    <div class="popup_left_content_area_home"> <%= CustomerPortal.Translator.T("ML_CHANGEUSRIDPOPUP_NEWID") %>: </div>
                    <div class="popup_right_content_area_home">
                        <input id="txtNewUserId" type="text" maxlength="30" mandatory="1" title="New UserId" globalize="ML_CHANGEUSRIDPOPUP_NEWID" autocomplete="off" />
                    </div>

                    <div style="clear: both;"></div>
                </div>
                <div class="bottom_area_home">
                    <input id="btnChangeUserId" type="button" class="submit-button" style="margin-bottom:0 !important" value='<%# CustomerPortal.Translator.T("ML_Master_btn_Submit") %>' />
                    <input id="btnCancelUserId" type="reset" class="cancel-button" style="margin-bottom:0 !important" value='<%# CustomerPortal.Translator.T("ML_Master_btn_Clear") %>' />

                </div>
            </div>
        </div>
    </div>
</div>
<span globalize="ML_Master_Error_SameUserID" id="ML_Master_Error_SameUserID" style="display: none"><%= CustomerPortal.Translator.T("ML_Master_Error_SameUserID") %></span>
<span globalize="ML_Master_lbl_UserID" id="ML_Master_lbl_UserID" style="display: none"><%= CustomerPortal.Translator.T("ML_Master_lbl_UserID") %></span>
<span globalize="ML_Master_ErrMsg_UserID" id="ML_Master_ErrMsg_UserID" style="display: none"><%= CustomerPortal.Translator.T("ML_Master_ErrMsg_UserID") %></span>
