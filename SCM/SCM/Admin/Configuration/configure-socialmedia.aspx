<%@ Page Title="Utility Information" MasterPageFile="~/Administration.master" Language="C#" AutoEventWireup="true" CodeBehind="configure-socialmedia.aspx.cs" Inherits="AdminPanel.configure_socialmedia" %>

<asp:Content ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../js/jquery.mask.min.js"></script>
    <script src="../js/configure-socialmedia.js"></script>
    <script src="../js/AjaxFileUpload/ajaxfileupload.js"></script>
    <script type="text/javascript">

        $("document").ready(function () {

            $('.sidebar_SocialMedia').addClass('active');
            $('#txtCustomerService').mask('(000) 000-0000');
            $('#txtBillingEnquiries').mask('(000) 000-0000');

            $("ul li input[type='radio']").change(function () {
                var value = $(this).closest('ul').attr('id');
                var icon = '';
                if (value == "powerRate") { icon = 'P'; }
                else if (value == "waterRate") { icon = 'W'; }
                else if (value == "gasRate") { icon = 'G'; }

                if ($("#" + value + " li input[type='radio']:checked").attr('value') == 1) {
                    $("#txt" + icon + "RateLink").show(500);
                }
                else {
                    $("#txt" + icon + "RateLink").hide(500);
                }
            });
        });

    </script>

    <script>
        function isNumberKey(evt) {
            var charCode = (evt.which) ? evt.which : event.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;

            return true;
        }
        //-->
    </script>
    <style>
        .outage_sbt_box {
            float: right;
            margin: 2px 0 15px;
        }

        #pageloader {
            background-image: url('../images/ajax-loader.gif');
            background-repeat: no-repeat;
            background-position: center;
            width: 100%;
            height: 60%;
            background-color: white;
            opacity: .7;
            display: none;
            position: absolute;
            top: 0px;
            z-index: 99999999;
        }

        .edit-user-area {
            border: 0;
        }

        .table-paylocation tr td:first-child {
            border: 0;
        }


        .mapsgoogle ul li {
            margin: 0px 25px 2px 0px;
        }

        .inner-right-section .right-content-area {
            padding: 0 0 30px 0;
        }

        .submit-button {
            border-radius: 0px !important;
            color: #f0f0f0 !important;
            float: right;
            font-size: 16px;
            height: 30px !important;
            margin-bottom: 15px;
            margin-right: 10px;
            padding: 3px 27px !important;
            text-align: center;
            width: 135px !important;
            font-weight: bold;
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
        .grid-section {
            height:auto;
        }
    </style>
    <div class="top-header-area" id="header">
        <div class="Leftheader-Pannel" id="child">
            <h2>
                <span>Social Media</span></h2>
        </div>
        <%--  <img src="<%=base64String %>" alt=""/>--%>
    </div>
    <asp:HiddenField ID="hdnImageSource1" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="filehandlerpath" runat="server" ClientIDMode="Static" Value='<%#ConfigurationManager.AppSettings["portalfilehandler"]%>' />
    <div class="grid-section">
        <div class="edit-user-area" id="tbl">
            <div class="table-paylocation" style="margin-bottom: 4px;">
                <div id="pageloader" style="display: none"></div>
                <table id="tblconfigurepay">
                    <tr>
                        <td style="padding-top: 5px; padding-bottom: 15px;">
                            <div class="user-written-area">
                                <label>Facebook URL: </label>
                            </div>
                            <div class="Text-box-area">
                                <asp:TextBox ID="txtFbUrl" runat="server" title="Facebook Url" ClientIDMode="Static"
                                    MaxLength="100" TabIndex="1"></asp:TextBox>
                            </div>
                            <div class="user-written-area gray-box">
                                <label>Twitter URL: </label>
                            </div>
                            <div class="Text-box-area gray-box">
                                <asp:TextBox ID="txtTwitterUrl" runat="server" title="Twitter Url"
                                    TabIndex="2" ClientIDMode="Static" MaxLength="100"></asp:TextBox>
                            </div>
                            <div class="user-written-area">
                                <label>Twitter Widget ID: </label>
                            </div>
                            <div class="Text-box-area">
                                <asp:TextBox ID="txtTwitterWidgetId" runat="server" title="Twitter Widget Id"
                                    TabIndex="3" ClientIDMode="Static" MaxLength="50" onkeypress="return IsNumeric(event);"></asp:TextBox>
                            </div>
                            <div class="user-written-area gray-box">
                                <label>YouTube URL: </label>
                            </div>
                            <div class="Text-box-area gray-box">
                                <asp:TextBox ID="txtYoutubeUrl" runat="server" title="YouTube Url" MaxLength="100" ClientIDMode="Static"
                                    TabIndex="4"></asp:TextBox>
                            </div>
                            <div class="user-written-area" style="display: block">
                                <label>LinkedIn  URL: </label>
                            </div>
                            <div class="Text-box-area" style="display: block">
                                <asp:TextBox ID="txtLinkedInUrl" runat="server" title="LinkedIn  Url" MaxLength="100" ClientIDMode="Static"
                                    TabIndex="5" Text="http://www.linkedin.com/company/smart-utility-systems"></asp:TextBox>
                            </div>

                        </td>

                    </tr>
                    <tr>
                        <td colspan="2">
                            <hr style="margin-left: -4%; margin-top: 0px; margin-bottom: 0px; border-bottom: 1px solid #ededed;" />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

    <div class="top-header-area" id="header1">
        <div class="Leftheader-Pannel" id="child1">
            <h2>
                <span>Contact Information</span></h2>
        </div>
    </div>
    <div class="grid-section">
        <div class="edit-user-area" id="tbl1">
            <div class="table-paylocation" style="margin-bottom: 4px;">
                <div id="pageloader1" style="display: none"></div>
                <table id="tblconfigurepay1">
                    <tr>
                        <td style="padding-top: 5px; padding-bottom: 15px;">
                            <div class="user-written-area">
                                <label>Customer Service Number: </label>
                            </div>
                            <div class="Text-box-area">
                                <%--<asp:TextBox ID="txtCustomerService" CssClass="Phone" runat="server" title="Customer Service" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" ClientIDMode="Static"
                                    MaxLength="12" TabIndex="5"></asp:TextBox>--%>
                                <asp:TextBox ID="txtCustomerService" CssClass="Phone1" runat="server" title="Customer Service" ClientIDMode="Static"
                                    MaxLength="14" TabIndex="5"></asp:TextBox>
                            </div>
                            <div class="user-written-area gray-box">
                                <label>Customer Service Email: </label>
                            </div>
                            <div class="Text-box-area gray-box">
                                <asp:TextBox ID="txtEmail" runat="server" title="Email"
                                    TabIndex="6" ClientIDMode="Static" MaxLength="50"></asp:TextBox>
                            </div>
                            <div class="user-written-area">
                                <label>Billing Enquiries Number: </label>
                            </div>
                            <div class="Text-box-area">
                                <%-- <asp:TextBox ID="txtBillingEnquiries" CssClass="Phone" runat="server" title="Billing Enquiries"
                                    TabIndex="7" ClientIDMode="Static" MaxLength="12" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}"></asp:TextBox>--%>
                                <asp:TextBox ID="txtBillingEnquiries" CssClass="Phone1" runat="server" title="Billing Enquiries"
                                    TabIndex="7" ClientIDMode="Static" MaxLength="14"></asp:TextBox>
                            </div>
                            <div class="user-written-area gray-box">
                                <label>Billing Enquiries Email: </label>
                            </div>
                            <div class="Text-box-area gray-box">
                                <asp:TextBox ID="txtBillingEmail" runat="server" title="Billing Email" MaxLength="50" ClientIDMode="Static"
                                    TabIndex="8"></asp:TextBox>
                            </div>
                            <div class="user-written-area">
                                <label>Utility Name: </label>
                            </div>
                            <div class="Text-box-area">
                                <asp:TextBox ID="txtUtilityName" CssClass="Phone1" runat="server" title="Utility Name"
                                    TabIndex="9" ClientIDMode="Static" MaxLength="20"></asp:TextBox>
                            </div>

                        </td>

                    </tr>
                    <tr>
                        <td colspan="2">
                            <hr style="margin-left: -4%; margin-top: 0px; margin-bottom: 0px; border-bottom: 1px solid #ededed;" />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

   <%-- <div class="top-header-area">
        <h2>Map Information </h2>
    </div>
    <div class="grid-section">
        <div class="usage-area-section mapsgoogle" style="padding: 3px 0px 0px 14px; display: block; width: 100%; border-bottom: 2px solid #ebebeb; float: left;">

            <ul>
                <li>
                    <asp:RadioButton ID="rdesri" name="rdesri" runat="server" Text=" ESRI" value="0" GroupName="Map" ClientIDMode="Static" />
                </li>
                <li>
                    <asp:RadioButton ID="rdGoogle" name="rdGoogle" runat="server" Text=" Google" value="1" GroupName="Map" ClientIDMode="Static" />
                </li>
                <li>
                    <asp:RadioButton ID="rdBing" name="rdBing" runat="server" Text=" Bing" value="2" GroupName="Map" ClientIDMode="Static" Visible="false" />
                </li>
            </ul>
        </div>
    </div>
    <div class="top-header-area">
        <h2>Usage Rate Link </h2>
    </div>
    <div class="grid-section">
        <div class="usage-area-section usage-rate" style="padding: 6px 0px 0px 17px; line-height: 35px; display: block; width: 100%; float: left;">
            <ul id="powerRate">
                <li style="margin-bottom: 1px; width: 50px;">Power 
                </li>
                <li style="margin-bottom: 1px;">
                    <asp:RadioButton ID="rbPRateInternal" name="rdPRateInternal" Checked="true" runat="server" Text=" Internal" value="0" GroupName="PRate" ClientIDMode="Static" />
                </li>
                <li style="width: 70%; margin-bottom: 1px;">
                    <asp:RadioButton ID="rbPRateExternal" name="rbPRateExternal" runat="server" Text=" External" value="1" GroupName="PRate" ClientIDMode="Static" />
                    <asp:TextBox ID="txtPRateLink" runat="server" ClientIDMode="Static" Style="width: 70%; line-height: 23px; display: none;"></asp:TextBox>
                </li>
            </ul>
        </div>
        <div class="usage-area-section usage-rate" style="padding: 6px 0px 0px 17px; line-height: 35px; display: block; width: 100%; float: left; background: #f7f7f7;">
            <ul id="waterRate">
                <li style="margin-bottom: 1px; width: 50px;">Water 
                </li>
                <li style="margin-bottom: 1px;">
                    <asp:RadioButton ID="rbWRateInternal" name="rbWRateInternal" Checked="true" runat="server" Text=" Internal" value="0" GroupName="WRate" ClientIDMode="Static" />
                </li>
                <li style="width: 70%; margin-bottom: 1px;">
                    <asp:RadioButton ID="rbWRateExternal" name="rbWRateExternal" runat="server" Text=" External" value="1" GroupName="WRate" ClientIDMode="Static" />
                    <asp:TextBox ID="txtWRateLink" runat="server" ClientIDMode="Static" Style="width: 70%; line-height: 23px; display: none;"></asp:TextBox>
                </li>
            </ul>
        </div>
        <div class="usage-area-section usage-rate" style="padding: 6px 0px 0px 17px; line-height: 35px; display: block; width: 100%; border-bottom: 2px solid #ededed; float: left;">
            <ul id="gasRate">
                <li style="margin-bottom: 1px; width: 50px;">Gas   
                </li>
                <li style="margin-bottom: 1px;">
                    <asp:RadioButton ID="rdGRateInternal" name="rdGRateInternal" Checked="true" runat="server" Text=" Internal" value="0" GroupName="GRate" ClientIDMode="Static" />
                </li>
                <li style="width: 70%; margin-bottom: 1px;">
                    <asp:RadioButton ID="rbGRateExternal" name="rbGRateExternal" runat="server" Text=" External" value="1" GroupName="GRate" ClientIDMode="Static" />
                    <asp:TextBox ID="txtGRateLink" runat="server" ClientIDMode="Static" Style="width: 70%; line-height: 23px; display: none;"></asp:TextBox>
                </li>
            </ul>
        </div>
    </div>
    <div class="grid-section">
        <div class="edit-user-area" id="tbl2">
            <div class="table-paylocation" style="margin-bottom: 4px;">
                <div id="pageloader2" style="display: none"></div>
                <table id="tblconfigurepay2">
                    <tr>
                        <td style="padding-top: 5px; padding-bottom: 15px;">
                            <div class="user-written-area" style="display: none">
                                <label>Copyright: </label>
                            </div>
                            <div class="Text-box-area" style="display: none">
                                <asp:TextBox ID="txtCopyRight" runat="server" title="Copyright" ClientIDMode="Static"
                                    TabIndex="7"></asp:TextBox>
                            </div>
                            <div class="user-written-area" style="display: none">
                                <label>Copyright Spanish: </label>
                            </div>
                            <div class="Text-box-area" style="display: none">
                                <asp:TextBox ID="txtCopyRightSpanish" runat="server" title="Copyright Spanish" ClientIDMode="Static"
                                    TabIndex="7"></asp:TextBox>
                            </div>
                            <div class="user-written-area gray-box">
                                <label>Customer Service Portal Logo: </label>
                            </div>
                            <div class="Text-box-area gray-box">
                                <span class="submit-button btn btn-primary btn-file" id="lblFileupload" style="float: left !important; line-height: 22px; font-size: 15px; padding: 3px 11px !important;">Choose File
                                    <asp:FileUpload ID="blah" runat="server" class="blah" onchange="readURL(this);" ClientIDMode="Static" Style="padding: 5px 0px 0px 0px;" />
                                </span>
                                <i id="nofile">No File Chosen</i>
                                <img id="btnRemoveFile" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFile();" style="display: none;">
                            </div>


                            <div class="user-written-area">&nbsp;</div>

                            <div class="Text-box-area" style="margin: 5px 0px; display: block;">
                                <img id="blahimg" src="../images/noimage.png" width="226" height="39"  class="blahimg" onerror="imgError()" />
                            </div>
                            <div class="user-written-area gray-box">
                                <label>Customer Portal Logo: </label>
                            </div>
                            <div class="Text-box-area gray-box">
                                <span class="submit-button btn btn-primary btn-file" id="lblFileupload1" style="float: left !important; line-height: 22px; font-size: 15px; padding: 3px 11px !important;">Choose File
                                     <asp:FileUpload ID="blah1" runat="server" onchange="readURLportal(this);" ClientIDMode="Static" Style="padding: 5px 0px 0px 0px;" />
                                </span>
                                <i id="nofile1" runat="server" clientidmode="static">No File Chosen</i>
                                <img id="btnRemoveFile1" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFileportal();">
                            </div>


                            <div class="user-written-area">&nbsp;</div>

                            <div id="divImg" class="Text-box-area" style="margin: 5px 0px; display: block; height: 70px">
                                <img id="blahimg1" src="<%=base64String %>" width="180" height="66"  class="blahimg1" onerror="imgError(this)" />
                            </div>
                            <div class="user-written-area gray-box">
                                <label>Default Page: </label>
                            </div>
                            <div class="Text-box-area gray-box">
                                <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">

                                    <ul>
                                        <li style="width: 110px;">
                                            <asp:RadioButton ID="rdhome" name="rdhome" runat="server" Text="Template 1" value="Home.aspx" GroupName="Loginpage" ClientIDMode="Static" />
                                        </li>
                                        <li>
                                            <asp:RadioButton ID="rddefault" name="rddefault" runat="server" Text="Template 2" value="Default.aspx" GroupName="Loginpage" ClientIDMode="Static" />
                                        </li>

                                    </ul>
                                </div>

                            </div>
                            <div class="user-written-area">
                                <label>Compare Spending Chart: </label>
                            </div>
                            <div class="Text-box-area">
                                <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">

                                    <ul>
                                        <li style="width: 110px;">
                                            <asp:RadioButton ID="rdcol" name="rdcol" runat="server" Text=" Column" value="column" GroupName="chart" ClientIDMode="Static" />
                                        </li>
                                        <li>
                                            <asp:RadioButton ID="rdline" name="rdline" runat="server" Text=" Line" value="line" GroupName="chart" ClientIDMode="Static" />
                                        </li>

                                    </ul>
                                </div>

                            </div>
                            <div class="user-written-area gray-box">
                                <label>Chart Orentation: </label>
                            </div>
                            <div class="Text-box-area gray-box">
                                <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">

                                    <ul>
                                        <li style="width: 110px;">
                                            <asp:RadioButton ID="rdhorizontal" name="rdhorizontal" runat="server" Text="Horizontal" value="0" GroupName="ChartOrientation" ClientIDMode="Static" />
                                        </li>
                                        <li>
                                            <asp:RadioButton ID="rdvertical" name="rdvertical" runat="server" Text="Vertical" value="-90" GroupName="ChartOrientation" ClientIDMode="Static" />
                                        </li>

                                    </ul>
                                </div>

                            </div>
                            <div class="user-written-area">
                                <label>Water Allocation Source: </label>
                            </div>
                            <div class="Text-box-area">
                                <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">

                                    <ul>
                                        <li style="width: 110px;">
                                            <asp:RadioButton ID="rdInternal" name="rdSIQ" runat="server" Text=" Internal" value="0" GroupName="WaterAllocationSource" ClientIDMode="Static" />
                                        </li>
                                        <li>
                                            <asp:RadioButton ID="rdExternal" name="rdSCM" runat="server" Text=" External" value="1" GroupName="WaterAllocationSource" ClientIDMode="Static" />
                                        </li>

                                    </ul>
                                </div>

                            </div>

                            <div class="user-written-area gray-box">
                                <label>Time Zone: </label>
                            </div>
                            <div class="Text-box-area gray-box">
                                <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                    <asp:DropDownList runat="server" ID="ddlTomeZone" ClientIDMode="Static" Width="50%">
                                    </asp:DropDownList>
                                </div>
                            </div>


                            <div class="user-written-area">
                                <label>Crashlytics </label>
                            </div>
                            <div class="Text-box-area">
                                <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">

                                    <ul>
                                        <li style="width: 110px;">
                                            <asp:RadioButton ID="rdCrashInternal" name="rdCrashInternal" runat="server" Checked="true" Text="Internal" value="0" GroupName="CrashAnalytics" ClientIDMode="Static" />
                                        </li>
                                        <li>
                                            <asp:RadioButton ID="rdCrashExternal" name="rdCrashExternal" runat="server" Text="External" value="1" GroupName="CrashAnalytics" ClientIDMode="Static" />
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div class="user-written-area gray-box">
                                <label>Modern Style: </label>
                            </div>
                            <div class="Text-box-area gray-box">
                                <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                    <asp:CheckBox ID="chkStyleSheet" runat="server" ClientIDMode="Static" />
                                </div>
                            </div>

                            <div class="user-written-area">
                                <label>Monthly Budget </label>
                            </div>
                            <div class="Text-box-area">
                                <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                    <asp:TextBox ID="txtMonthlyBudget" Text="0" runat="server" onkeypress="return isNumberKey(event)" ClientIDMode="Static"></asp:TextBox>
                                </div>
                            </div>

                            <%---------------------Send Mail Configuration-------------------------%>
                          <%--  <div class="user-written-area">
                                <label>Send Mail Through: </label>
                            </div>
                            <div class="Text-box-area">
                                <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">

                                    <ul>
                                        <li style="width: 110px;">
                                            <asp:RadioButton ID="rdSmtp" name="rdSmtp" runat="server" Checked="true" Text="SMTP" value="0" GroupName="Mailing" ClientIDMode="Static" />
                                        </li>
                                        <li>
                                            <asp:RadioButton ID="rdSendgrid" name="rdSendgrid" runat="server" Text="SendGrid" value="1" GroupName="Mailing" ClientIDMode="Static" />
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <hr style="margin-left: -4%; margin-top: 0px; margin-bottom: 0px; border-bottom: 1px solid #ededed;" />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>--%>

    <div>
        <div class="outage_sbt_box">

            <input id="btnCancel" type="button" value="Cancel" title="Cancel" class="submitBtn" onclick="location.href = 'configure-socialmedia.aspx'" />
            <input type="button" class="submitBtn" id="AddSocialMediaBtn" value="Save" title="Save" />
            <asp:HiddenField ID="hdconfigvalue" runat="server" ClientIDMode="Static" />
            <asp:HiddenField ID="hdnZoneId" runat="server" ClientIDMode="Static" />
            <asp:HiddenField ID="hdnZoneValue" runat="server" ClientIDMode="Static" />
        </div>
    </div>
</asp:Content>
