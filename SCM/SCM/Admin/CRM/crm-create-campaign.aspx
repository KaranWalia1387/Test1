<%@ Page Title="Create Campaign" Language="C#" MasterPageFile="~/CRM/CRM.master" AutoEventWireup="true" CodeBehind="crm-create-campaign.aspx.cs" Inherits="AdminPanel.CRM.crm_create_campaign" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit.HTMLEditor" TagPrefix="cc1" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../js/Crm-AddCampaign.js"></script>
    <script src="../js/blockScreen.js"></script>
    <script src="../js/bootstrap-tabs.js"></script>
    <link href="../css/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="../js/w2ui-1.4.2.min.js" type="text/javascript"></script>
    <%-- <script src="../js/crm-add-template.js"></script>--%>
    <script src="../js/AjaxFileUpload/ajaxfileupload.js"></script>
    <script>
        $(document).ready(function () {
            $(".inner-right-section").addClass("seg_bottom_space")
            $("ul.tabs li.campaign_configurations").addClass("active");

            $("#cancelButton").click(function () {
                location.href = "crm-compaign-configuration.aspx";
            });
        });

        function ResetCRMTemplate() {
            $("form input:text").val(''); //For All TextBoxes on the page.
            $("form input:checkbox").attr('Checked', false); //For All Checkboxes on the page.//BugId 22804
            checkboxclick();
            $("form select").each(function () { $(this)[0].selectedIndex = 0; });
      
            $("form textarea").val(''); //For All Textareas on the page.
            $('#summernote').summernote('code', '');
            return false;
        }
    </script>

    <style type="text/css">

        .seg_inpt select, .sgmntn_right_main nobr span {
            float:left;
        }
        .ui-datepicker {
            width: 1em;
        }

        input[type="radio"] {
            line-height: normal;
            margin: 2px 5px 0 0px;
            vertical-align: top;
        }


        input[type="checkbox"] {
            line-height: normal;
            margin: 5px 5px 0 0px;
            vertical-align: top;
        }


        .seg_gorm_box_new input[type="checkbox"] {
            line-height: normal;
            margin: 3px 18px 0 3px;
        }

        .ReplyBtnContainer > span.btn-file {
            background-color: #fcfcfc !important;
            color: #53565a !important;
            padding: 7px 12px 7px 5px;
            border: solid 1px #e7e7e7;
            cursor: pointer;
            position: relative;
        }

        .drpdwn {
            float: right;
            margin-right: 0px;
            padding: 0 0 5px;
            width: 55%;
        }

        .ajax__htmleditor_editor_base {
            width: 97% !important;
        }

        .comp_gorm_box input, .comp_gorm_box select, .comp_gorm_box textarea {
            width: 94%;
            float: left;
            border-radius: 2px;
            border: 1px solid #ccc;
            height: 25px;
            outline: none;
            font-size: 13px;
            padding: 0px 0 0 5px;
            box-shadow: none !important;
        }

        .seg_gorm_box > input {
            margin-left: 2px;
            margin-right: 30px;
            margin-top: 1px;
            vertical-align: top;
        }

        .comp_gorm_box textarea {
            height: 75px;
            resize: none;
        }

        .calender-space {
            margin-top: 7px;
            width: 100%;
        }

            .calender-space input[type="text"] {
                width: 65%;
                border: 1px solid #CCC;
                height: 25px;
            }

        .img-space {
            display: block;
        }

        .comp_gorm_box .form-group {
            padding-left: 5px;
        }

        .comp_gorm_box {
            padding-top: 0;
        }

        .seg_button_box .cancel_btn1, .seg_button_box .save_btn1 {
            line-height: normal;
        }

        .submitBtn {
            float: right;
            margin: 3px 4px 5px 8px;
        }

        #fileupd {
            display: inline;
            width: 165px;
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
                height: 20px;
            }

        #imageurl {
            position: relative;
            top: 6px;
        }

        @media (max-width:478px) {
            #imageurl {
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
        }
        #datetimepicker4 {
                padding-top: 1px !important;
                padding-bottom: 0px !important;
        }
        #ddlSegmentID {
            float:left;
        }
         .icon-cal {
            float: left;
            margin: 5px 0px 0px -23px;
        }
    </style>
    </asp:ScriptManager>

    <script src="../js/Validate.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.9.3/css/bootstrap-select.min.css">
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.9.3/js/bootstrap-select.min.js"></script>
    <script src="../Scripts/moment.js"></script>
    <script src="../Scripts/moment.min.js"></script>
    <script src="../Scripts/bootstrap-datetimepicker.js"></script>
    <script src="../Scripts/bootstrap-datetimepicker.min.js"></script>
    <link rel="stylesheet" href="../css/bootstrap-datetimepicker.css" />

    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.37/js/bootstrap-datetimepicker.min.js"></script>--%>
    <div class="top-header-area">
        <h2>
            <asp:Label ID="lblHeaderText" runat="server"></asp:Label></h2>
        <div class="exprt-filtr">
            <div>
                <%--    <a href="crm-campaign-configuration.aspx" class="back_btn_crm">Back</a>--%>
            </div>

        </div>
    </div>
    <asp:HiddenField ID="hdnWeekly" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMonthly" runat="server" ClientIDMode="Static" />
    <div class="grid-section sgmntn_wrapper">
        <div class="">
            <div class="sgmntn_right_main">
                <div class="form_add_segment" id="altrnte">

                    <div class="seg_gorm_box">
                        <div class="col-lg-2">
                            <label>Campaign Name</label>
                        </div>
                        <div class="col-lg-4 seg_inpt">
                            <asp:TextBox runat="server" ID="txtCampaignName" onKeyUp="javascript:this.value=this.value.replace(/[<,>]/g,'');" title="Campaign Name" mandatory="1" MaxLength="30" TabIndex="1" ClientIDMode="Static"></asp:TextBox>
                        </div>
                        <div class="col-lg-2">
                            <label>Campaign Type</label>
                        </div>
                        <div class="col-lg-4 seg_inpt">
                            <asp:DropDownList ID="ddlType" runat="server" mandatory="1" ClientIDMode="Static" TabIndex="2" title="Campaign Type"></asp:DropDownList>
                        </div>
                    </div>
                    <div class="seg_gorm_box">
                        <div class="col-lg-2">
                            <label>Segment</label>
                        </div>
                        <div class="col-lg-4 seg_inpt">
                            <asp:DropDownList ID="ddlSegmentID" runat="server" mandatory="1" ClientIDMode="Static" TabIndex="3" title="Segment Type"></asp:DropDownList>
                        </div>
                        <div class="col-lg-2">
                        </div>

                        <div class="col-lg-4 seg_inpt">
                        </div>

                    </div>
                    <div class="seg_gorm_box">
                        <div class="col-lg-2">
                            <label>Recurrence</label>
                        </div>
                        <div id="checkbox_div" class="col-lg-4 seg_inpt">
                            <input type="radio" value="One Time" name="myRadio" checked="checked" />One Time
                            <input type="radio" value="Recurring" name="myRadio" style="margin-left: 25px !important;" />Recurring
                        </div>
                    </div>

                    <div class="seg_gorm_box" id="date" style="padding-top: 0;">
                        <div class="col-lg-2">
                            Start
                        </div>
                        <%-- <div class="col-lg-4 seg_inpt" style="position: static;">
                            <asp:TextBox runat="server" ID="datetimepicker4" title="Date/Time" placeholder="--Select Date--" ClientIDMode="Static" class="form-control"
                                mandatory="1"></asp:TextBox>
                        </div>--%>

                        <div class="col-md-4 seg_inpt" style="position: static;">
                            <div class="form-group">
                                <div class='date' id='datetimepicker341'>
                                    <asp:TextBox runat="server" ID="datetimepicker4" title="Date/Time" placeholder="--Select Date--" ClientIDMode="Static" class="form-control"
                                        mandatory="1"></asp:TextBox>
                                     <asp:ImageButton CssClass="icon-cal" ID="btnDate" runat="server" ImageUrl="~/images/Icon-calendar.png" />
                        <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="datetimepicker4" PopupButtonID="btnDate" CssClass="" Format="MM/dd/yyyy" />
                                </div>
                            </div>
                            <script type="text/javascript">
                                $(function () {
                                    var date = new Date();
                                    var currentMonth = date.getMonth();
                                    var currentDate = date.getDate();
                                    var currentYear = date.getFullYear();

                                    $('#datetimepicker4').datetimepicker({
                                        minDate: new Date(currentYear, currentMonth, currentDate),
                                    });
                                });
                            </script>
                        </div>

                    </div>


                    <div class="seg_gorm_box" id="recurring" style="display: none; padding-top: 0;">
                        <div class="col-lg-2">
                            <label>Frequency</label>
                        </div>
                        <div class="col-lg-4 seg_inpt">
                            <asp:DropDownList ID="ddlFrequency" runat="server" mandatory="1" ClientIDMode="Static" TabIndex="4" title="Frequency"></asp:DropDownList>
                        </div>
                        <div id="MonthDate" style="display: none">
                            <div class="col-lg-2">
                                <label>Date</label>
                            </div>
                            <div class="col-lg-4 seg_inpt">
                                <select class="1-28" id="ddlDate"></select>
                            </div>
                        </div>
                        <div class="form_add_segment" style="border: 0; padding: 0;">
                            <div class="seg_gorm_box" id="weekly" style="display: none; padding-top: 15px; padding-bottom: 0px;">
                                <div class="col-lg-2">
                                    Select Day
                                </div>
                                <div class="col-lg-10 seg_inpt">
                                    <ul class="weekly_check_box">
                                        <li>
                                            <input type="checkbox" name="week" id="ChkSun" value="SUN" />
                                            <span>Sunday</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="week" id="ChkMon" value="MON" />
                                            <span>Monday</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="week" id="ChkTue" value="TUE" />
                                            <span>Tuesday</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="week" id="ChkWed" value="WED" />
                                            <span>Wednesday</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="week" id="ChkThu" value="THU" />
                                            <span>Thursday</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="week" id="ChkFri" value="FRI" />
                                            <span>Friday</span>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="week" id="ChkSat" value="SAT" />
                                            <span>Saturday</span>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        <div class="seg_gorm_box" id="monthly" style="display: none; padding-top: 15px; padding-bottom: 0px;">
                            <div class="col-lg-2">
                                Select Months
                            </div>
                            <div class="col-lg-10 seg_inpt">
                                <ul class="weekly_check_box">
                                    <li>
                                        <input type="checkbox" name="month" id="ChkJan" value="JAN" />
                                        <span>January</span>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="month" id="ChkFeb" value="FEB" />
                                        <span>February</span>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="month" id="ChkMar" value="MAR" />
                                        <span>March</span>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="month" id="ChkApr" value="APR" />
                                        <span>April</span>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="month" id="ChkMay" value="MAY" />
                                        <span>May</span>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="month" id="ChkJune" value="JUN" />
                                        <span>June</span>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="month" id="ChkJuly" value="JUL" />
                                        <span>July</span>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="month" id="ChkAug" value="AUG" />
                                        <span>August</span>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="month" id="ChkSept" value="SEP" />
                                        <span>September</span>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="month" id="ChkOct" value="OCT" />
                                        <span>October</span>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="month" id="ChkNov" value="NOV" />
                                        <span>November</span>

                                    </li>
                                    <li>
                                        <input type="checkbox" name="month" id="ChkDec" value="DEC" />
                                        <span>December</span>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="seg_gorm_box">
                        <div class="col-lg-2">
                            <label style="padding-left: 0px !important;">Description</label>
                        </div>
                        <div class="col-lg-10 seg_inpt">
                            <asp:TextBox ID="txtDescription" Style="width: 98%;" runat="server" TextMode="MultiLine" TabIndex="4" ClientIDMode="Static" ToolTip="Description" onKeyUp="Count(this,200)" onChange="Count(this,200)"></asp:TextBox>
                            <span style="color: red">(Allow only 200 characters)</span>
                        </div>

                    </div>
                </div>
                <div class="top-header-area" style="border-bottom: 1px solid #ededed;">
                    <div class="col-md-5">
                        <h2 style="padding-left: 5px;">Communication</h2>
                    </div>
                    <div class="col-md-7 text-right">
                        <div class="drpdwn">
                            <%--<asp:DropDownList CssClass="selectpicker" ID="ddlLoadTemplate" runat="server" ClientIDMode="Static"></asp:DropDownList>
                            <%--<asp:DropDownList  ID="ddlLoadTemplate" runat="server" ClientIDMode="Static" ></asp:DropDownList>--%>
                            <asp:DropDownList ID="ddlLoadTemplate" runat="server" ClientIDMode="Static" title="Template"></asp:DropDownList>
                        </div>
                    </div>
                    <!-- section2 starts here -->

                    <!-- section2 ends here -->
                </div>

                <div class="form_add_segment" style="border: 0;">

                    <div class="seg_gorm_box seg_gorm_box_new" style="padding-bottom: 14px; padding-top: 0;">
                        <div class="col-lg-2" style="width: 19%;">
                            Mode of Message
                        </div>
                        <span>Text</span>
                        <input type="checkbox" name="mode" id="Chktext" value="Text" />
                        <span>Email</span>
                        <input type="checkbox" name="mode" id="ChkEmail" value="Email" />
                        <span>Push</span>
                        <input type="checkbox" name="mode" id="ChkPush" value="Push" />
                        <span>IVR</span>
                        <input type="checkbox" name="mode" id="ChkIVR" value="IVR" />
                    </div>
                    <div class="seg_gorm_box" id="divtext" style="display: none; border-top: 1px solid #ccc;">
                        <div class="col-lg-2">
                            Text
                        </div>
                        <div class="col-lg-10 seg_inpt">
                            <asp:TextBox ID="txtText" runat="server" TextMode="MultiLine" TabIndex="4" ClientIDMode="Static" ToolTip="Description" onKeyUp="Count(this,140)" onChange="Count(this,140)" mandatory="1"></asp:TextBox>
                            <span style="color: red">(Allow only 140 characters)</span>
                        </div>
                    </div>
                    <div class="seg_gorm_box" id="divemail" style="display: none; border-top: 1px solid #ccc;">
                        <div class="col-lg-2">
                            Email
                        </div>
                        <div class="col-lg-10 seg_inpt">
                            <div>Subject </div>
                            <asp:TextBox ID="txtSubject" runat="server" MaxLength="100" ClientIDMode="Static" Style="width: 97%;" mandatory="1"></asp:TextBox><br />
                            <div>&nbsp;</div>
                            <%--<cc1:Editor ID="txtEditor" runat="server" />--%>
                            <div id="summernote">
                                <p></p>
                            </div>
                            <div class="clear_both"></div>
                            <span style="color: red" class="texttype hide" id="spanTxt"></span>
                            <div class="ReplyBtnContainer email" style="float: left; margin-top: 10px;">

                                <span class="file-input btn btn-primary btn-file" id="lblFileupload" style="float: left !important; line-height: 22px; font-size: 15px; padding: 3px 11px !important;"><i class="fa fa-paperclip"></i>Choose File                
                            <asp:FileUpload ID="fileupd" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" />
                                </span>
                                <span id="imageurl">&nbsp; <i>No File Chosen</i></span>
                                <img id="btnRemoveFile" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFile();" />
                                <asp:Label ID="lblMessage" runat="server" Enabled="false"></asp:Label>
                            </div>

                            <%--<div class="ReplyBtnContainer email">
                                <asp:FileUpload ID="fileupd" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" />
                                <span id="imageurl"></span>
                                <img id="btnRemoveFile" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFile();" />
                            </div>--%>
                        </div>
                    </div>
                    <div class="seg_gorm_box" id="divpush" style="display: none; border-top: 1px solid #ccc;">
                        <div class="col-lg-2">
                            Push
                        </div>
                        <div class="col-lg-10 seg_inpt">
                            <asp:TextBox ID="txtPush" runat="server" TextMode="MultiLine" TabIndex="4" ClientIDMode="Static" ToolTip="Description" onKeyUp="Count(this,200)" onChange="Count(this,200)" mandatory="1"></asp:TextBox>
                            <span style="color: red">(Allow only 200 characters)</span>
                        </div>
                    </div>
                    <div class="seg_gorm_box" id="divivr" style="display: none; border-top: 1px solid #ccc;">
                        <div class="col-lg-2">
                            IVR
                        </div>
                        <div class="col-lg-10 seg_inpt">
                            <asp:TextBox ID="txtIvr" runat="server" TextMode="MultiLine" TabIndex="4" ClientIDMode="Static" ToolTip="Description" onKeyUp="Count(this,140)" onChange="Count(this,140)"></asp:TextBox>
                            <span style="color: red">(Allow only 140 characters)</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- grid-section -->

        <div class="seg_button_box btnsarea">

            <button id="btnSaveCreateCampaign" type="button" class="submitBtn" value="" onclick="" tabindex="20">Save</button>

            <input type="button" class="submitBtn" id="btnClear" value="Clear" title="Clear" onclick="ResetCRMTemplate();" />
            <input id="btnCancel" type="button" value="Cancel" title="Cancel" class="submitBtn" onclick="location.href = 'crm-campaign-configuration.aspx'" />
        </div>
    </div>
    <script>
        ////$(function () {
        ////    $('#datetimepicker4').datetimepicker({ sideBySide: true });
        ////});

        $('.selectpicker').selectpicker({
            size: 4
        });

        $(".button_nav_toggle-1").click(function () {
            $(".nav_download-1").toggle();
        });

        $(".button_nav_toggle-2").click(function () {
            $(".nav_download-2").toggle();
        });

    </script>
    <asp:HiddenField ID="templatevalue" runat="server" ClientIDMode="Static" />
    <%--<asp:HiddenField ID="Emailcheck" runat="server" />
     <asp:HiddenField ID="Pushcheck" runat="server" />
     <asp:HiddenField ID="IVRCheck" runat="server" />
     <asp:HiddenField ID="HiddenFielheckd4" runat="server" />--%>
</asp:Content>
