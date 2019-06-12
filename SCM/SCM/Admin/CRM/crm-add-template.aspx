<%@ Page Title="" Language="C#" MasterPageFile="~/CRM/CRM.master" AutoEventWireup="true" CodeBehind="crm-add-template.aspx.cs" Inherits="AdminPanel.CRM.crm_add_template" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit.HTMLEditor" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../js/blockScreen.js"></script>
    <script src="../js/bootstrap-tabs.js"></script>
    <link href="../css/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="../js/w2ui-1.4.2.min.js" type="text/javascript"></script>
    <script src="../js/crm-add-template.js"></script>
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
         .btn-file {
            position: relative;
            overflow: hidden;
        }

            .btn-file input[type=file] {
                position: absolute;
                top: 0;
                right: 0;
                min-width: 100%;
                min-height: 100%;
                font-size: 100px;
                text-align: right;
                filter: alpha(opacity=0);
                opacity: 0;
                background: red;
                cursor: inherit;
                display: block;
            }

        #nofile {
            position: relative;
            top: 6px;
        }

        @media (max-width:478px) {
            #nofile {
                white-space: nowrap;
                top: -5px;
            }
        }

        #btnRemoveFile {
            position: relative;
            top: 6px;
        }
          .submit-button {
            border-radius: 5px !important;
            color: #f0f0f0 !important;
            float: right;
            font-size: 14px !important;
            height: 30px !important;
            margin-bottom: 15px;
            margin-right: 10px;
            padding: 3px 27px !important;
            text-align: center;
            width: 135px !important;
            font-weight: normal;
            background-color: #6dbe6f !important;
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
                alert(" More than " + long + " characters not allowed");
            }
        }
    </script>
    
    <asp:HiddenField ID="hdfTempId" runat="server" ClientIDMode="Static" />
    <div class="top-header-area">
        <h2 id="topheader">
            <asp:Label ID="lblHeader" runat="server"></asp:Label></h2>
        <div class="exprt-filtr">
            <div class="add_btn">
                <%--    <a href="crm-template.aspx" class="back_btn_crm">Back</a>--%>
            </div>
        </div>
    </div>

    <div class="grid-section sgmntn_wrapper">
        <div class="" id="altrnte">
            <div class="sgmntn_right_main">
                <div class="form_add_segment" style="border-bottom: 0;">
                    <div class="seg_gorm_box">
                        <div class="col-lg-2">
                            Templates Name
                        </div>
                        <div class="col-lg-4 seg_inpt">
                            <asp:TextBox ID="txtTemplateName" runat="server" title="Templates Name" MaxLength="35" TabIndex="1" mandatory="1" ClientIDMode="Static" onKeyUp="javascript:this.value=this.value.replace(/[<,>]/g,'');"></asp:TextBox>
                        </div>
                    </div>
                    <div class="seg_gorm_box" style="border-top: 1px solid #ccc; padding-bottom: 4px; padding-top: 17px;">
                        <div class="col-lg-2">
                            Mode 
                        </div>
                        <div class="col-lg-6">
                            <span>Text</span>
                            <input type="checkbox" name="mode" id="Chktext" value="Text" />
                            <span style="margin-left: 10px;">Email</span>
                            <input type="checkbox" name="mode" id="ChkEmail" value="Email" />
                            <span style="margin-left: 10px;">Push</span>
                            <input type="checkbox" name="mode" id="ChkPush" value="Push" />
                            <span style="margin-left: 10px;">IVR</span>
                            <input type="checkbox" name="mode" id="ChkIVR" value="IVR" />
                        </div>
                    </div>
                    <div class="seg_gorm_box" id="divtext" style="display: none; border-top: 1px solid #ccc; margin-top: 10px; padding-bottom: 8px;">
                        <div class="col-lg-2">
                            Text
                        </div>
                        <div class="col-lg-10 seg_inpt">
                            <asp:TextBox ID="txttext" Style="width: 98%;" runat="server" TextMode="MultiLine" TabIndex="4" ClientIDMode="Static" ToolTip="Description" onKeyUp="Count(this,140)" onChange="Count(this,140)"></asp:TextBox>
                            <span style="color: red">(Allow only 140 characters)</span>
                        </div>
                    </div>
                    <div class="seg_gorm_box" id="divemail" style="display: none; border-top: 1px solid #ccc; padding-bottom: 8px;">
                        <div class="col-lg-2">
                            Email
                        </div>
                        <div class="col-lg-10 seg_inpt">
                            <div style="padding-bottom: 6px;">Subject </div>
                            <asp:TextBox ID="txtSubject" Style="width: 98%;" runat="server" MaxLength="100" ClientIDMode="Static" mandatory="1"></asp:TextBox><br />
                            <div>&nbsp;</div>
                            <%--<cc1:Editor ID="txtEditor" runat="server" Style="width: 98%;" />--%>
                            <div id="summernote">
                                <p></p>
                            </div>
                            <div class="clear_both"></div>
                            <span style="color: red" class="texttype hide" id="spanTxt"></span>

                             <div class="ReplyBtnContainer email" style="float: left; margin-top: 10px; ">
                                <span class="submit-button btn btn-primary btn-file" id="lblFileupload" style="float: left !important; line-height: 22px; font-size: 15px; padding: 3px 11px !important;">Choose File                
                                  <asp:FileUpload ID="fileupd" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" />
                                </span>
                                <i id="nofile">No File Chosen</i>
                                <img id="btnRemoveFile" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFile();" />
                                <asp:Label ID="lblMessage" runat="server" Enabled="false"></asp:Label>
                            </div>


<%--                            <div class="ReplyBtnContainer email" style="margin: 8px 0;">
                                <asp:FileUpload ID="fileupd" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" Style="float: left;" />
                                <span id="imageurl"></span>
                                <img id="btnRemoveFile" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFile();" />

                            </div>--%>
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
                        <div class="col-lg-10 seg_inpt" style="display: none">
                            <asp:TextBox ID="txtIvr" Style="width: 98%;" runat="server" TextMode="MultiLine" TabIndex="4" ClientIDMode="Static" ToolTip="Description" onKeyUp="Count(this,140)" onChange="Count(this,140)"></asp:TextBox>
                            <span style="color: red">(Allow only 140 characters)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="seg_button_box">

        <button id="btnSave" type="button" class="submitBtn" value="" onclick="savedata();" tabindex="5">Save</button>
        <input type="button" class="submitBtn" id="btnClear" value="Clear" title="Clear" onclick="Reset();" />
        <input id="btnCancel" type="button" value="Cancel" title="Cancel" class="submitBtn" onclick="location.href = 'crm-template.aspx'" />
    </div>

    <!-- Modal -->
    <div id="add_attri_popup" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header heading_poup">
                    <button type="button" class="close" data-dismiss="modal">
                        <img src="../images/popup_close.png" class="close_crm_btn" title="Close" />
                    </button>
                    <h4 class="modal-title">New Attribute</h4>
                </div>
                <div class="modal-body modal-content1">
                    <div class="modal-body modal-content1">
                        <div class="new_attri_box">
                            <div class="col-lg-3">Attribute Name</div>
                            <div class="col-lg-9">
                                <input type="text" />
                            </div>
                        </div>
                        <div class="new_attri_box">
                            <div class="col-lg-3">Condition</div>
                            <div class="col-lg-9">
                                <select>
                                    <option>type</option>
                                    <option>type</option>
                                </select>
                            </div>
                        </div>
                        <div class="new_attri_box">
                            <div class="col-lg-3">Value</div>
                            <div class="col-lg-9">
                                <input type="text" />
                            </div>
                        </div>
                        <div class="seg_button_box seg_button_box_popup">
                            <a href="#" class="cancel_btn1">Cancel</a>
                            <a href="#" data-toggle="modal" data-target="#add_attri_popup2" data-dismiss="modal" class="save_btn1" id="add_more_msg">Save</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div id="add_attri_popup2" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header heading_poup">
                    <button type="button" class="close" data-dismiss="modal">
                        <img src="../images/popup_close.png" class="close_crm_btn" title="Close" />
                    </button>
                    <h4 class="modal-title">Message</h4>
                </div>
                <div class="modal-body modal-content1">
                    <div class="seg_button_box seg_button_box_popup" style="border: 0; padding: 20px 0px 40px; width: 50%; margin: 0 auto; display: block; float: none;">
                        <a href="#" class="cancel_btn1">Add More?</a>
                        <a href="#" class="save_btn1 no" data-dismiss="modal" id="add_more_msg">No</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

