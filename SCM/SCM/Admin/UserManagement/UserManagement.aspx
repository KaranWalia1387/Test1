<%@ Page Title="User Management Add/Edit User" Language="C#" MasterPageFile="~/UserManagement/UserManagement.master" AutoEventWireup="true" CodeBehind="UserManagement.aspx.cs" Inherits="AdminPanel.UserManagement1" %>

<%@ Import Namespace="Newtonsoft.Json" %>

<%@ Import Namespace="AdminPanel" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>

<asp:Content ID="MainContent" ContentPlaceHolderID="rightpanel" runat="server">
    <input type="hidden" class="activeli_list" value="sidebar_userreport" />
<%--    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>--%>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
   <%-- <script src="../js/jquery-1.8.3.min.js"></script>--%>
  <%--  <script src="../js/jquery.mask.min.js"></script>--%>
    <link href="../js/css/error.css" rel="stylesheet" />

    
    </asp:ScriptManager>
    <script type="text/javascript">

        var userRights = '<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>';
        var UserReportRights = userRights.indexOf('<%=UserRights.UserManagementReport%>') >= 0;
        var url = "Customer.aspx";
        if (!UserReportRights)
            url = "../Home.aspx";

        $(document).ready(function () {
            $('#txtMobile').mask('(000) 000-0000');
            $('#txtContactNo').mask('(000) 000-0000');
            $('#ddlquestions').val($('#hdnQuestion').val());
            $('#ddlquestions2').val($('#hdnQuestion2').val());
            
            
            $("select").each(function () {
                var s = this;

                if (s.selectedIndex > -1)
                    s.onmousemove = function () {

                    };
            });
        });


    </script>
    <style type="text/css">
        .ajax__calendar_container table tr td:first-child {
            border-right: 0px solid #ededed !important;
        }

        .ajax__calendar_container table tr td {
            width: auto !important;
        }

        .ssn_box {
            border-bottom: 0px solid #ccc;
            display: table;
            width: 100%;
            padding-bottom: 5px;
            margin-bottom: 2px;
            margin-top: -4px;
        }

        .table-paylocation tr td {
            padding-right: 0px;
            padding-left: 0px;
            width: 100%;
        }

            .table-paylocation tr td:first-child {
                border-right: 0px solid #ededed;
            }

        .Text-box-area input[type="text"], .Text-box-area input[type="number"], .Text-box-area input[type="password"] {
            width: 78%;
        }

        .Text-box-area select {
            width: 78% !important;
            padding: 0px 0px 0px !important;
        }

        .ssn_box {
            margin-top: 0px;
            margin-bottom: 0px;
        }

        .user-written-area {
            width: 40%;
            padding-left: 1.5%;
            border-right: 2px solid #ededed;
        }

        .Text-box-area {
            width: 60%;
            padding-left: 6%;
        }

        .inner-right-section .grid-section {
            margin: -5px 0 0;
            padding: 0;
        }

        #errorMsg {
            float: right;
            position: absolute;
            top: 22px;
            right: 136px;
            background: rgba(60,60,60,.82);
            color: white;
            padding: 3px 8px;
            box-shadow: 0px 1px 3px #ccc;
            display: none;
        }

        .right-content-area {
            height: 100%;
        }

        .top_conte_box_mob {
            height: 82%;
            overflow: auto;
            float: left;
            width: 100%;
        }

        .setting_save_box {
            width: 100%;
            border-top: 1px solid #ccc;
            background: #fff;
            padding-top: px;
        }

            .setting_save_box .buttons_area {
                padding: 0% 0 0%;
                border-bottom: 0px;
            }

                .setting_save_box .buttons_area .submit-button {
                    margin-top: 0px !important;
                    margin-bottom: 0px !important;
                }

        @media (min-width:1500px) and (max-width:3500px) {
            .top_conte_box_mob {
                height: 88%;
            }

            .setting_save_box {
                width: 100%;
                border-top: 1px solid #ccc;
                background: #fff;
                padding-top: 14px;
            }
        }

        .gray-box {
            background: none !important;
        }

        .custo_main_box {
            width: 100%;
            float: left;
        }

            .custo_main_box.even {
                background: #f4f4f4 !important;
            }
    </style>

    <script src="../js/usermgmt.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $(".table-paylocation").bind("rowchange", function () {
                $(this).find(".custo_main_box:visible").removeClass("even").filter(":even").addClass("even");
            }).trigger("rowchange");
        });
    </script>
    <asp:HiddenField ID="hdnAccountNumber" runat="server" Value="" />
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnCustomeID" runat="server" ClientIDMode="Static" />
    <div class="top-header-area">
        <h2>
            <asp:Label ID="lblHeaderText" runat="server"></asp:Label><em>
                <asp:Label ID="lblUserName" runat="server"></asp:Label></em>
        </h2>
        <span id="errorMsg"></span>
    </div>
    <div class="top_conte_box_mob">
        <div class="grid-section">
            <div class="edit-user-area" id="tbl">
                <div class="table-paylocation">
                    <table>
                        <tr>
                            <td>
                                <div class="ssn_box custo_main_box">
                                    <div class="user-written-area gray-box">
                                        <label>Account Number </label>
                                    </div>
                                    <div class="Text-box-area gray-box">
                                        <asp:TextBox runat="server" ID="txtAccountNo" ReadOnly="true" mandatory="1" ClientIDMode="Static" title="Account Number" placeholder="Account Number" MaxLength="16" TabIndex="2" ValidateMessage="Please enter a valid Account Number"
                                           ></asp:TextBox>
                                    </div>
                                </div>
                                <div id="divSSN" class="custo_main_box" runat="server" style="display: none">
                                    <div class="ssn_box">
                                        <div class="user-written-area ">
                                            <label>Last 4 digit of SSN  </label>
                                        </div>
                                        <div class="Text-box-area ">
                                            <asp:TextBox runat="server" ID="txtSSN" title="Last 4 digit SSN" placeholder="Last 4 digit SSN" MaxLength="4" TabIndex="1" ClientIDMode="Static"
                                                onkeypress="return isNumberKey(event)"></asp:TextBox>
                                        </div>
                                    </div>
                                </div>
                                <div class="custo_main_box" style="display:none">
                                    <div class="user-written-area gray-box" style="display:none">
                                        <label>First Name</label>
                                    </div>
                                    <div class="Text-box-area gray-box" style="display:none">
                                        <asp:TextBox ID="txtFirstName" runat="server" title="First Name" placeholder="First Name"
                                            MaxLength="30" TabIndex="3" mandatory="0" onkeypress="return onlyAlphabets(event,this);" ClientIDMode="Static" ValidateMessage="Please enter First Name"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="custo_main_box" style="display:none">

                                    <div class="user-written-area" style="display:none">
                                        <label>Middle Name</label>
                                    </div>
                                    <div class="Text-box-area" style="display:none">
                                        <asp:TextBox ID="txtMiddleName" runat="server" TextMode="SingleLine" MaxLength="30" placeholder="Middle Name"
                                            title="Middle Name" value="" mandatory="0" TabIndex="4" onkeypress="return onlyAlphabets(event,this);" ClientIDMode="Static"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="custo_main_box">
                                    <div class="user-written-area gray-box">
                                        <label>Name</label>
                                    </div>
                                    <div class="Text-box-area gray-box">
                                        <asp:TextBox ID="txtLastName" runat="server" TextMode="SingleLine" MaxLength="30" placeholder="Name"
                                            title="Name" value="" mandatory="1" TabIndex="5" onkeypress="return onlyAlphabets(event,this);" ClientIDMode="Static" ValidateMessage="Please enter Name"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="custo_main_box">
                                    <div class="user-written-area">
                                        <label>Email</label>
                                    </div>
                                    <div class="Text-box-area">
                                        <asp:TextBox ID="txtEmailID" runat="server" class="box" placeholder="Email"
                                            title="Email" value="" MaxLength="50" TabIndex="6" mandatory="1" ClientIDMode="Static" ValidateMessage="Please enter a valid Email"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="custo_main_box">
                                    <div class="user-written-area gray-box">
                                        <label>Alternate Email</label>
                                    </div>
                                    <div class="Text-box-area gray-box">
                                        <asp:TextBox ID="txtAltEmailId" runat="server" class="box" placeholder="Alternate Email"
                                            title="Alternate Email" value="" MaxLength="50" TabIndex="6" ClientIDMode="Static"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="custo_main_box">
                                    <div class="user-written-area">
                                        <label>Mobile Number</label>
                                    </div>
                                    <div class="Text-box-area">
                                        <%-- <asp:TextBox ID="txtMobile" CssClass="Phone" runat="server" title="Mobile Number" value="" MaxLength="12" ClientIDMode="Static" placeholder="Mobile Number"
                                    TabIndex="7" mandatory="1"  onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}"></asp:TextBox>--%>
                                        <asp:TextBox ID="txtMobile" CssClass="Phone" runat="server" title="Mobile Number" value="" MaxLength="14" ClientIDMode="Static" placeholder="Mobile Number"
                                            TabIndex="7" mandatory="1" ValidateMessage="Please enter a valid 10 digit Mobile Number"></asp:TextBox>
                                    </div>
                                </div>

                                <div id="divContactNo" class="custo_main_box" runat="server">
                                    <div class="user-written-area gray-box">
                                        <label>Alternate Number </label>
                                    </div>
                                    <div class="Text-box-area gray-box">
                                        <%--  <asp:TextBox ID="txtContactNo" CssClass="Phone" runat="server" title="Alternate Number" value="" MaxLength="12" ClientIDMode="Static" placeholder="Alternate Number"
                                    TabIndex="8" mandatory="0" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}"></asp:TextBox>--%>
                                        <asp:TextBox ID="txtContactNo" CssClass="" runat="server" title="Alternate Number" value="" MaxLength="14" ClientIDMode="Static" placeholder="Alternate Number"
                                            TabIndex="8" mandatory="0"></asp:TextBox>
                                    </div>
                                </div>

                                <div id="divStreet" class="custo_main_box" runat="server">
                                    <div class="user-written-area">
                                        <label>Address 1</label>
                                    </div>
                                    <div class="Text-box-area">
                                        <asp:TextBox ID="txtAddress1" runat="server" placeholder="Address 1" title="Address 1" value="" MaxLength="50" ClientIDMode="Static" Mandatory="1"
                                            TabIndex="9" ValidateMessage="Please enter Address"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="custo_main_box">
                                    <div id="divAddress2" runat="server">
                                        <label>Address 2</label>
                                    </div>
                                    <div id="divtxtAddress2" runat="server">
                                        <asp:TextBox ID="txtAddress2" runat="server" placeholder="Address 2" title="Address 2" value="" mandatory="0" ClientIDMode="Static"
                                            TabIndex="10" MaxLength="50"></asp:TextBox>
                                    </div>
                                </div>

                                <div id="divZip" class="custo_main_box" runat="server">
                                    <div id="divlabelzip" runat="server">
                                        <label>Zip Code</label>
                                    </div>
                                    <div id="divtxtCity" runat="server">
                                        <asp:DropDownList ID="ddlCity" runat="server" title="Zip Code" ClientIDMode="Static" TabIndex="11" placeholder="Zip Code" Mandatory="1" ValidateMessage="Please select Zip Code">
                                        </asp:DropDownList>
                                    </div>

                                </div>
                                <div class="custo_main_box">
                                    <div class="user-written-area" style="display: none">
                                        <label>Date of Birth</label>
                                    </div>
                                    <div class="Text-box-area" style="position: relative; display: none">
                                        <asp:TextBox ID="txtDob" runat="server" TabIndex="12" title="Date Of Birth" value="" MaxLength="2048" placeholder="MM/DD/YYYY"
                                            mandatory="0" onblur="return ValidateDateofBirth(event,this)" Style="cursor: pointer;"></asp:TextBox>
                                        <asp:ImageButton Visible="false" CssClass="DateIcon" ID="btnDOB" runat="server" ImageUrl="../images/icon-cal.png" />
                                        <ajaxToolkit:CalendarExtender ID="Cal_Date" runat="server" TargetControlID="txtDob" Format="MM/dd/yyyy"
                                            PopupButtonID="btnDOB" OnClientDateSelectionChanged="checkDate" />

                                    </div>
                                </div>
                                <div class="custo_main_box">

                                    <div class="user-written-area" style="display: none;">
                                        <label>Latitude</label>
                                    </div>
                                    <div class="Text-box-area " style="display: none;">
                                        <asp:TextBox ID="txtLatitude" runat="server" mandatory="0" title="Latitude" ClientIDMode="Static" placeholder="Latitude" />
                                    </div>

                                </div>
                                <div class="custo_main_box">
                                    <div class="user-written-area" style="border-top: 2px solid #ededed;">
                                        <label>Username </label>
                                    </div>
                                    <div class="Text-box-area" style="border-top: 2px solid #ededed;">
                                        <asp:TextBox ID="txtUserID" runat="server" TextMode="SingleLine" title="Username" ClientIDMode="Static" placeholder="Username"
                                            value="" MaxLength="30" TabIndex="13"></asp:TextBox>
                                        <ajaxToolkit:FilteredTextBoxExtender ID="FtbtxtUserID" runat="server" TargetControlID="txtUserID" InvalidChars=" " FilterMode="InvalidChars" FilterType="UppercaseLetters, LowercaseLetters, Numbers, Custom"></ajaxToolkit:FilteredTextBoxExtender>
                                    </div>

                                </div>
                                <div class="custo_main_box" style="display: none;">
                                    <div class="user-written-area">
                                        <label>Longitude</label>
                                    </div>
                                    <div class="Text-box-area">
                                        <asp:TextBox ID="txtLongitude" runat="server" mandatory="0" title="Longitude" ClientIDMode="Static" placeholder="Longitude" />
                                    </div>
                                </div>
                                <div class="custo_main_box">
                                    <div class="user-written-area gray-box">
                                        <label>Security Question 1 </label>
                                    </div>
                                    <div class="Text-box-area gray-box">
                                        <asp:DropDownList ID="ddlquestions" placeholder="Security Question 1" TabIndex="16" runat="server" mandatory="1" title="Security Question 1" ClientIDMode="Static" ValidateMessage="Please select Security Question"></asp:DropDownList>
                                    </div>
                                </div>
                                <div class="custo_main_box">
                                    <div class="user-written-area">
                                        <label>Security Answer 1</label>
                                    </div>
                                    <div class="Text-box-area">
                                        <asp:TextBox ID="txtSequertyA" runat="server" MaxLength="25" TextMode="Password" title="Security Answer" placeholder="Security Answer 1"
                                            value="" mandatory="1" TabIndex="17"  ClientIDMode="Static" ValidateMessage="Please enter Security Answer"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="custo_main_box">

                                    <div class="user-written-area gray-box">
                                        <label>Security Question 2</label>
                                    </div>
                                    <div class="Text-box-area gray-box">

                                        <asp:DropDownList ID="ddlquestions2" placeholder="Security Question 2" runat="server" mandatory="1" title="Security Question 2" TabIndex="17" ClientIDMode="Static" ValidateMessage="Please select Security Question"></asp:DropDownList>

                                    </div>
                                </div>
                                <div class="custo_main_box">
                                    <div class="user-written-area">
                                        <label>Security Answer 2 </label>
                                    </div>
                                    <div class="Text-box-area">
                                        <asp:TextBox ID="txtSequertyA2" runat="server" MaxLength="25" TextMode="Password" title="Security Answer 2" placeholder="Security Answer 2"
                                            value="" mandatory="1" TabIndex="17" ClientIDMode="Static" ValidateMessage="Please enter Security Answer"></asp:TextBox>

                                    </div>
                                </div>

                                <div id="divMeter" class="custo_main_box" runat="server" style="display: none;">
                                    <div class="user-written-area">
                                        <label>Meter Number </label>
                                    </div>
                                    <div class="Text-box-area">
                                        <asp:TextBox ID="txtMeter" runat="server" MaxLength="25" TextMode="SingleLine" title="Meter ID" placeholder="Meter ID" ValidateMessage="Please enter a valid Meter Number"
                                            value="" TabIndex="18" ClientIDMode="Static"></asp:TextBox>

                                    </div>
                                </div>
                                <div id="divDL" class="custo_main_box" runat="server" style="display: none">
                                    <div class="user-written-area">
                                        <label>Driving License </label>
                                    </div>
                                    <div class="Text-box-area">
                                        <asp:TextBox ID="txtDL" runat="server" MaxLength="25" TextMode="SingleLine" title="Driving License" placeholder="Driving License" ValidateMessage="Please enter Driving License Number"
                                            value="" TabIndex="19" ClientIDMode="Static"></asp:TextBox>

                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

        </div>
        <!-- END .grid-section -->
    </div>
    <div class="setting_save_box" style="float: right; text-align: right;">

        <asp:Button CssClass="submitBtn" ID="cancelButton" runat="server" Text="Cancel" ClientIDMode="Static" OnClientClick="return false;"
            CausesValidation="false" />
        <input type="button" class="submitBtn" id="btnClear" value="Clear" title="Clear" onclick="Reset();" />
        <asp:Button CssClass="submitBtn" ID="AddUserSaveBtn" runat="server" Text="Save" ClientIDMode="Static"
            OnClientClick="javascript:return ValidateAll();" OnClick="AddUserSaveBtn_Click" CausesValidation="false" />


    </div>

    <asp:HiddenField ID="hdnzipcode" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnCityId" runat="server" ClientIDMode="Static" />


    <style>
        .ddlCityItem {
            background-color: silver;
        }

        .ddlZipItem {
            background-color: silver;
            padding-left: 10px;
        }

        .red-border {
            border: 1px solid red !important;
        }
    </style>
    <script>

        function testAttribute(element, attribute) {
            var test = document.createElement(element);
            if (attribute in test)
                return true;
            else
                return false;
        }

        if (!testAttribute("input", "placeholder")) {
            window.onload = function () {
                var demo = document.getElementById('<%= txtDob.ClientID%>');
                var text_content = "MM/DD/YYYY";

                demo.style.color = "gray";
                demo.value = text_content;

                demo.onfocus = function () {
                    if (this.value == "MM/DD/YYYY")
                    { this.value = ""; this.style.color = "black" }
                }

                demo.onblur = function () {
                    if (this.value == "")
                    { this.style.color = "gray"; this.value = text_content; }
                    else if (this.value == "MM/DD/YYYY")
                    { return true; }
                    else if (this.value == '' || this.value == 'undefiened') { }
                    else
                    {
                        var v = ValidateDateofBirth(this, document.getElementById('<%=txtDob.ClientID%>'));
                        if (v.toString() == 'false') {
                            demo.style.color = "gray";
                            demo.value = text_content;
                        }
                    }
                }
            }
}
    </script>
    <asp:HiddenField ID="hdnAccNumNumeric" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnAccountMaxLength" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnAccountMinLength" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnQuestion" runat="server" ClientIDMode="Static" />
     <asp:HiddenField ID="hdnQuestion2" runat="server" ClientIDMode="Static" />
</asp:Content>
