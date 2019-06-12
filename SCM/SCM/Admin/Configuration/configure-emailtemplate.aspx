<%@ Page Title="Email Template" Language="C#" MasterPageFile="~/Administration.master" AutoEventWireup="true" MaintainScrollPositionOnPostback="true" CodeBehind="configure-emailtemplate.aspx.cs" Inherits="AdminPanel.configure_emailtemplate" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit.HTMLEditor" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">

    <style>
        @media (min-width:1500px) and (max-width:3200px) {
            .inner-right-section .grid-section {
                background: #fff none repeat scroll 0 0;
                clear: both;
                height: 62% !important;
                margin: -4px 0 0;
                padding: 0;
            }

            .inner-right-section .right-content-area {
                height: 100%;
                padding: 0;
            }
        }


        .outage_sbt_box {
            float: right;
        }

        .inner-right-section .grid-section {
            background: #fff none repeat scroll 0 0;
            clear: both;
            height: 65%;
            margin: -4px 0 0;
            padding: 0;
        }

        .inner-right-section .right-content-area {
            height: 92%;
            padding: 0;
        }

        .tblist table {
            width: 100%;
        }

        .tblist tr:nth-child(even) {
            background: #ececec;
        }


        .tblist tr td {
            padding: 5px 10px;
        }

        /*.emailTestDetails .tab-pane {
            background-image: linear-gradient(rgb(255, 255, 255) 20%, rgb(244, 242, 242) 100%);
        }*/

        /*.modal-body, .modal-content {
            background-image: linear-gradient(rgb(255, 255, 255) 20%, rgb(244, 242, 242) 100%);
        }*/

        .popup_left_content_area_home {
            float: left;
            font-weight: bold;
            padding-bottom: 2px;
            padding-right: 1%;
            width: 35%;
            margin-left:10px;
        }

        .popup_right_content_area_home input[type="text"] {
            padding: 0px 5px;
        }
        #emailTestDetails .modal-footer
        {
            padding:0 15px;
        }
        .note-editor .modal-header {
            background: #999999 none repeat scroll 0 0;
            border-radius: 5px 5px 0 0;
            padding: 9px 15px;
        }
       
        .note-editor.note-frame {
                width: 96%;
                float: left;
                margin-left: 2%;
        }
         .required {
            display:inline-block;
        }
        
    </style>


    <script src="../js/addupdateemailtemplates.js"></script>
    
    
    <input type="hidden" class="activeli_list" value="sidebar_Emailtemplate" />
    <div id="emaildiv">
        <div class="top-header-area">
            <h2>Email Template</h2>
            <div style="float: right; padding-right: 20px;" class="addbtn">
                <a id="testEmail" href="#" data-backdrop="true" data-keyboard="true" data-toggle="modal" data-target=".emailTestDetails" style="text-decoration: none;">
                    <i class="fa fa-plus-circle icon_color"></i>
                    Email Test</a>

            </div>
        </div>
        <div style="width: 100%; float: left; padding: 10px 19px;">
            <div style="width: 112px; display: inline-block;">Select Template:</div>
            <asp:DropDownList ID="ddlChooseTemplate" ValidateMessage="Please select Template" runat="server" ClientIDMode="Static" mandatory="1" title="Template" style="width:80%;">
            </asp:DropDownList>
        </div>
        <%--<br />--%>

        <br />
        <div style="width: 100%; float: left; padding: 10px 19px 20px;">
            <div style="width: 112px; display: inline-block;">Enter Subject:</div>
            <asp:TextBox ID="txtSubject" runat="server" ValidateMessage="Please enter Subject" ClientIDMode="Static" Width="80%" mandatory="1" title="Subject" style="border:1px solid #aaa; padding: 0 5px;"></asp:TextBox>
        </div>
        <div class="grid-section">
        <%--    <cc1:Editor ID="editordesc" runat="server" TabIndex="0" mandatory="1"/>--%>
            <div id="summernote" class="summernote" >
                <p></p>
            </div>
        </div>
    </div>
    <div class="outage_sbt_box">
        <button id="btnClear" type="button" class="submitBtn" value="" tabindex="2">Clear</button>
        <button id="btnSave" type="button" class="submitBtn" value="" tabindex="1">Save</button>

    </div>
    <div style="width: 100%; float: left; padding: 5px 0px;" class="tblist">
        <b style="border-bottom: 1px solid #ccc; display: block; padding-bottom: 3px; padding-left: 10px;">Use below template fields:</b>
        <table>
            <tr>
                <td>Email: {email}</td>
            </tr>
            <tr>
                <td>Name: {name}</td>
            </tr>
            <tr>
                <td>Username: {USERID}</td>
            </tr>
            <tr>
                <td>Change Password Link: {changepasswordlnk}</td>
            </tr>
            <tr>
                <td>Forgot Password Link: {forgotpasswordlnk}</td>
            </tr>
            <tr>
                <td>Comments: {COMMENTS}</td>
            </tr>
            <tr>
                <td>Access data online Link: {lnk}</td>
            </tr>
            <tr>
                <td>Newsletter for Month: {month}</td>
            </tr>
            <tr>
                <td>Newsletter for Year: {year}</td>
            </tr>
            <tr>
                <td>Updated Mobile Number: {xxxxxxxxxx}</td>
            </tr>
            <tr>
                <td><i>Ex: To send Name inside message use {name} template field , which will be replaced by User's Name while sending Email.</i></td>
            </tr>
        </table>

    </div>
    <%----------------Pop up Start------------------------------%>
    <div id="emailTestDetails" class="modal fade emailTestDetails" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="position: fixed; overflow: hidden; display: none;">
        <div class="modal-dialog popup_area">
            <div class="modal-content" style="width: 80%; margin: auto; height: auto;">
                <div class="modal-header">
                    <button type="button" id="btnClose" data-dismiss="modal">
                        <img src="../images/popup_close.png" title="Close" /></button>
                    <h4 class="modal-title" id="H2">Email Template</h4>
                </div>
                <div class="modal-body">
                    <div class="divDialogElements">
                        <div id="my-tab-content" class="tab-content">
                            <div class="active tab-pane" id="home">
                                <div class="popup_left_content_area_home" style="padding-top: 2%">
                                    <label id="for-input-username" class="legend">Name:</label>
                                </div>
                                <div class="popup_right_content_area_home" style="padding-left: 40%">
                                    <asp:TextBox runat="server" name="userName" maxlength="30" style="width: 94%" Text="John Doe" value="John Doe" ClientIDMode="Static" title="Name" tabindex="1" id="txtusername" class="text" onkeypress="return IsAlpha(event);" ></asp:TextBox>
                                    <span style="color: red">*</span>
                                </div>
                                <div style="clear: both;"></div>
                                <div class="popup_left_content_area_home" style="padding-top: 2%">
                                    <label id="Label3" class="legend">Email:</label>
                                </div>
                                <div class="popup_right_content_area_home" style="padding-top: 2%; padding-left: 40%">
                                    <asp:TextBox type="text" runat="server" title="Email"  name="userName" maxlength="50" style="width: 94%;" ClientIDMode="Static"  tabindex="2" id="txtemail" class="text" />
                                    <span style="color: red">*</span>
                                </div>
                                <div style="clear: both;"></div>
                                <div id="divForgotPassword" style="display: none;">
                                    <div class="popup_left_content_area_home" style="padding-top: 2%">
                                        <label id="Label4" class="legend">Forgot Password link:</label>

                                    </div>
                                    <div class="popup_right_content_area_home" style="padding-top: 2%; padding-left: 40%">
                                        <asp:TextBox runat="server" type="text" ClientIDMode="Static" title="a valid URL"  name="userName" maxlength="256" style="width: 94%;" text="http://d.smartusys.net/scp6.6.2/LoginSupport.aspx" value="http://d.smartusys.net/scp6.6.2/LoginSupport.aspx" tabindex="3" id="txtforgotpassworldlink" class="text" />
                                        <span style="color: red">*</span>
                                    </div>
                                </div>
                                <div style="clear: both;"></div>
                                <div id="divUserId" style="display: none;">
                                    <div class="popup_left_content_area_home" style="padding-top: 2%">
                                        <label id="Label5" class="legend">Username:</label>

                                    </div>
                                    <div class="popup_right_content_area_home" style="padding-top: 2%; padding-left: 40%">
                                        <asp:TextBox runat="server" type="text" ClientIDMode="Static" title="Username" name="userName" maxlength="50" style="width: 94%;" value="Demo" Text="Demo" tabindex="4" id="txtUserId" onkeyup="javascript:this.value=this.value.replace(/[<,>]/g,'');" class="text" />
                                        <span style="color: red">*</span>
                                    </div>
                                </div>
                                <div style="clear: both;"></div>
                                <div id="divComments" style="display: none;">
                                    <div class="popup_left_content_area_home" style="padding-top: 2%">
                                        <label id="Label6" class="legend">Comments:</label>

                                    </div>
                                    <div class="popup_right_content_area_home" style="padding-top: 2%; padding-left: 40%">
                                        <asp:TextBox ID="txtComments" runat="server" style="width: 94%;" class="text" title="Comments" value="" MaxLength="500" onKeyUp="javascript:this.value=this.value.replace(/[<,>]/g,'');" TextMode="MultiLine" ClientIDMode="Static">

                                        </asp:TextBox>
                                        <%-- <input type="text" name="userName" maxlength="100" style="width: 85%;" value="" tabindex="5" id="txtComments"  class="text" />--%>
                                        <span style="color: red">*</span>
                                    </div>
                                </div>
                                <div style="clear: both;"></div>
                                <div id="divUpdateEmail" style="display: none;">
                                    <div class="popup_left_content_area_home" style="padding-top: 2%">
                                        <label id="Label7" class="legend">Updated Email:</label>

                                    </div>
                                    <div class="popup_right_content_area_home" style="padding-top: 2%; padding-left: 40%">
                                        <input type="text" name="userName" title="valid Email" maxlength="50" style="width: 94%;" value="" tabindex="6" id="txtUpdateEmail" class="text" />
                                        <span style="color: red">*</span>
                                    </div>
                                </div>
                                <div style="clear: both;"></div>
                                <div id="divRegisterLink" style="display: none;">
                                    <div class="popup_left_content_area_home" style="padding-top: 2%">
                                        <label id="Label8" class="legend">Registration Link:</label>

                                    </div>
                                    <div class="popup_right_content_area_home" style="padding-top: 2%; padding-left: 40%">
                                        <asp:TextBox runat="server" type="text" title="valid URL" name="userName" maxlength="50" style="width: 94%;" tabindex="7" id="txtRegistrationLink" class="text" text="http://d.smartusys.net/scp6.6.2/CustomerRegistration.aspx" ClientIDMode="Static" value="http://d.smartusys.net/scp6.6.2/CustomerRegistration.aspx"/>
                                        <span style="color: red">*</span>
                                    </div>
                                </div>
                                <div style="clear: both;"></div>

                                <div id="divMonth" style="display: none;">
                                    <div class="popup_left_content_area_home" style="padding-top: 2%">
                                        <label id="Label10" class="legend">Preference Month:</label>

                                    </div>
                                    <div class="popup_right_content_area_home" style="padding-top: 2%; padding-left: 40%">
                                        <input type="text" name="userName" maxlength="10" style="width: 94%;" value="" tabindex="8" id="txtMonth" title="month name" onkeypress="return IsAlpha(event);" class="text" />
                                        <span style="color: red">*</span>
                                    </div>
                                </div>
                                <div style="clear: both;"></div>
                                <div id="divYear" style="display: none;">
                                    <div class="popup_left_content_area_home" style="padding-top: 2%">
                                        <label id="Label11" class="legend">Preference Year:</label>

                                    </div>
                                    <div class="popup_right_content_area_home" style="padding-top: 2%; padding-left: 40%">
                                        <input type="text" name="userName" maxlength="4" style="width: 94%;" value="" tabindex="9" id="txtYear" title="year" onkeypress="return IsNumeric(event)" class="text" />
                                        <span style="color: red">*</span>
                                    </div>
                                </div>
                                <div style="clear: both;"></div>
                                <div id="divPrimaryPhone" style="display: none;">
                                    <div class="popup_left_content_area_home" style="padding-top: 2%">
                                        <label id="Label12" class="legend">Primary Phone Number:</label>

                                    </div>
                                    <div class="popup_right_content_area_home" style="padding-top: 2%; padding-left: 40%">
                                        <input type="text" name="userName" maxlength="14" style="width: 94%;" value="" title="primary phone number" tabindex="10" id="txtPrimaryPhone" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" class="text" />
                                        <span style="color: red">*</span>
                                    </div>
                                </div>
                                <div style="clear: both;"></div>



                            </div>
                        </div>
                    </div>
                </div>
                      <div class="modal-footer">
                                    <%-- <span style="color:red">*</span>
                                    <label id="Label4" class="legend">Pick Role</label>
                                    <br/>
                                    <br/>
                                 
                                   <select  id="sRole" multiple="multiple" size="8" style="width:70%">
                                        
                                    </select>--%>
                                    <button id="btnpopupClear" type="button" class="submitBtn" value="" tabindex="12" onclick="clearFields();">Clear</button>
                                    <a class="submitBtn" href="#" id="submit" onclick="return sendEmail();" tabindex="11" style="display: block; line-height: 19px; text-decoration: none;float: right;">Submit</a>


                                </div>
            </div>
        </div>
    </div>
    <%----------------Pop up End------------------------------%>
</asp:Content>
