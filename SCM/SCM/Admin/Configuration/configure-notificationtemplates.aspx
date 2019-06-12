<%@ Page Title="Notification Template" Language="C#" MasterPageFile="~/Administration.Master" AutoEventWireup="true" CodeBehind="configure-notificationtemplates.aspx.cs" Inherits="AdminPanel.configure_notificationtemplates" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit.HTMLEditor" TagPrefix="cc1" %>
<asp:Content ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../js/blockScreen.js"></script>
    <script src="../js/bootstrap-tabs.js"></script>
    <link href="../css/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="../js/w2ui-1.4.2.min.js" type="text/javascript"></script>
    <script src="../js/notificationtemplates.js"></script>
    <script src="../js/AjaxFileUpload/ajaxfileupload.js"></script>


    <style>
        .seg_gorm_box {
            font-family: MyriadPro-LightSemiExt;
            font-size: 13px;
        }

            .seg_gorm_box > input {
                margin-left: 2px;
                ;
                margin-right: 30px;
                margin-top: 1px;
                vertical-align: top;
            }

        input[type="checkbox"], input[type="radio"] {
            line-height: normal;
            margin: 2px 12px 0 2px !important;
            vertical-align: top;
        }

        .submitBtn {
            float: right;
            margin: 3px 4px 5px 8px;
        }
        .seg_inpt select, .sgmntn_right_main nobr span {
     float: left!important;
}
    </style>
    <script type="text/javascript">

        $(document).ready(function () {
            $(".inner-right-section").addClass("seg_bottom_space");
            $("ul.tabs li.templates").addClass("active");
        });

        function Count(text, long) {
            var maxlength = new Number(long); // Change number to your max length.
            if (text.value.length > maxlength) {
                text.value = text.value.substring(0, maxlength);
                alert(" More than " + long + " characters are not allowed");
            }


        }
        //RESET 
        function ResetNotificationTemplate() {
            $("form input:text").val(''); //For All TextBoxes on the page.
            //$("form input:checkbox").attr('Checked', false); //For All Checkboxes on the page.//BugId 22804
            // $("form select").each(function () { $(this)[0].selectedIndex = 0; }); //For All Dropdownlists and Listboxes on the page makes 0 as selected index. //Bug Id #39833
            $("form textarea").val(''); //For All Textareas on the page.            
            $('#summernote').summernote('code', '');
            return false;
        }
    </script>
    
    <input type="hidden" class="activeli_list" value="sidebar_NotificationTemplate" />
    <asp:HiddenField ID="hdfTempId" runat="server" ClientIDMode="Static" />
    <div class="top-header-area">
        <h2 id="topheader">Notification Template</h2>
        <div class="exprt-filtr">
            <div class="add_btn">
            </div>
        </div>
    </div>

    <div class="grid-section sgmntn_wrapper">
        <div class="" id="altrnte">
            <div class="sgmntn_right_main">
                <div class="form_add_segment" style="border-bottom: 0;">
                    <div class="seg_gorm_box">
                        <div class="col-lg-2">
                            Notification:
                        </div>
                        <div class="col-lg-4 seg_inpt">
                            <asp:DropDownList ID="ddlChooseTemplate" runat="server" Width="70%" ClientIDMode="Static" mandatory="1" title="Template">
                            </asp:DropDownList>
                            <asp:TextBox ID="txtTemplateName" runat="server" title="Templates Name" MaxLength="35" TabIndex="1" mandatory="1" ClientIDMode="Static" onKeyUp="javascript:this.value=this.value.replace(/[<,>]/g,'');" Visible="false"></asp:TextBox>
                        </div>
                    </div>
                    <div class="seg_gorm_box" style="border-top: 1px solid #ccc; padding-bottom: 4px; padding-top: 17px;">
                        <div class="col-lg-2">
                            Mode of Message 
                        </div>
                        <div class="col-lg-6">
                         <%--   <span>Text</span>
                            <input type="checkbox" name="mode" id="Chktext" value="Text" />--%>
                            <span style="margin-left: 10px;">Email</span>
                            <input type="checkbox" name="mode" id="ChkEmail" value="Email" />
                            <span style="margin-left: 10px;">Push</span>
                            <input type="checkbox" name="mode" id="ChkPush" value="Push" />
                            <%--<span style="margin-left: 10px;">IVR</span>
                            <input type="checkbox" name="mode" id="ChkIVR" value="IVR" />--%>
                        </div>
                    </div>
                    <div class="seg_gorm_box"  id="divtext" style="display: none; border-top: 1px solid #ccc; margin-top: 10px; padding-bottom: 8px;">
                        <div class="col-lg-2"  style="display: none;">
                            Text
                        </div>
                        <div class="col-lg-10 seg_inpt"  style="display: none;">
                            <asp:TextBox ID="txttext" Style="width: 98%;" runat="server" TextMode="MultiLine" TabIndex="4" ClientIDMode="Static" ToolTip="Description" onKeyUp="Count(this,140)" onChange="Count(this,140)" mandatory="1"></asp:TextBox>
                            <span style="color: red">(Allow only 140 characters)</span>
                        </div>
                    </div>
                    <div class="seg_gorm_box" id="divemail" style="display: none; border-top: 1px solid #ccc; padding-bottom: 8px;">
                        <div class="col-lg-2">
                            Email
                        </div>
                        <div class="col-lg-10 seg_inpt">
                            <div style="padding-bottom: 6px;">Subject: </div>
                            <asp:TextBox ID="txtSubject" Style="width: 98%;" runat="server" MaxLength="100" ClientIDMode="Static" mandatory="1"></asp:TextBox><br />
                            <div>&nbsp;</div>
                            <div id="summernote">
                                <p></p>
                            </div>

                            <div class="clear_both"></div>
                            <span style="color: red" class="texttype hide" id="spanTxt"></span>
                            <div class="ReplyBtnContainer email" style="margin: 8px 0; display: none;">
                                <asp:FileUpload ID="fileupd" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" Style="float: left;" />
                                <span id="imageurl"></span>
                                <img id="btnRemoveFile" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFile();" />
                            </div>
                        </div>

                    </div>
                    <div class="seg_gorm_box" id="divpush" style="display: none; border-top: 1px solid #ccc; padding-bottom: 8px;">
                        <div class="col-lg-2">
                            Push
                        </div>
                        <div class="col-lg-10 seg_inpt">
                            <asp:TextBox ID="txtPush" Style="width: 98%;" runat="server" TextMode="MultiLine" TabIndex="4" ClientIDMode="Static" ToolTip="Description" onKeyUp="Count(this,200)" onChange="Count(this,200)" mandatory="1"></asp:TextBox>
                            <span style="color: red">(Allow only 200 characters)</span>
                        </div>
                    </div>
                    <div class="seg_gorm_box" id="divivr" style="display: none; border-top: 1px solid #ccc; padding-bottom: 8px;">
                        <div class="col-lg-2">
                            IVR
                        </div>
                        <div class="col-lg-10 seg_inpt">
                            <asp:TextBox ID="txtIvr" Style="width: 98%;" runat="server" TextMode="MultiLine" TabIndex="4" ClientIDMode="Static" ToolTip="Description" onKeyUp="Count(this,140)" onChange="Count(this,140)" mandatory="1"></asp:TextBox>
                            <span style="color: red">(Allow only 140 characters)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="seg_button_box">

        <button id="btnSave" type="button" class="submitBtn" value="" onclick="submitData();" tabindex="5">Save</button>
        <input type="button" class="submitBtn" id="btnClear" value="Clear" title="Clear" onclick="ResetNotificationTemplate();" />
        <input id="btnCancel" type="button" value="Cancel" title="Cancel" class="submitBtn" onclick="location.href = 'configure-notificationtemplates.aspx'" />
    </div>
</asp:Content>
