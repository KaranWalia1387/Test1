<%@ Page Title="Settings" Language="C#" MasterPageFile="~/Administration.Master" AutoEventWireup="true" CodeBehind="configure-authentication.aspx.cs" Inherits="AdminPanel.configure_authentication" %>

<%@ Import Namespace="AdminPanel" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <link href="../css/spectrum.css" rel="stylesheet" />
    <script src="../js/spectrum.js"></script>
    <script src="../js/configure-authentication.js"></script>
    <script src="../js/AjaxFileUpload/ajaxfileupload.js"></script>
    <script>
        $(document).ready(function () {
            var userRights =<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>;
            var userUsageRights =userRights.indexOf( '<%=UserRights.ServiceReadOnly%>')>=0 && userRights.indexOf( '<%=UserRights.SettingAccess%>')<0;
            if (userUsageRights) {
                $('input[type=checkbox]').attr('disabled','true');
                $('input[type=radio]').attr('disabled','true');
                $('#'+'<%=btnAuthentication.ClientID%>').hide();
            }
        });
    </script>
    <script type="text/javascript">
        $("document").ready(function () {
            $("#chartDiv").addClass("HEight");
            $('#collapseOne').addClass('in');
            $('.sidebar_Settings').addClass('active');
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

    <input type="hidden" class="activeli_list" value="sidebar_configureauthentication" />
    <style>
        .grid-section {
            height: auto !important;
        }

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
            width: 174px !important;
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

        .user-written-area-half {
            width: 25%;
            float: left;
            margin: 0px;
            padding: 2px 10px 4px;
            height: 39px;
        }


        .Text-box-area-half {
            width: 25%;
            float: left;
            margin: 0px;
            padding: 3px 0 0 0;
            height: 39px;
        }


        .inner-right-section .top-header-area h4 {
            color: #857586 !important;
            display: inline-block;
            float: right;
            font: bold 14px "MyriadPro-Regular", arial, sans-serif;
            margin: 0;
            padding: 0px 28px 9px 17px;
        }
   
        .FLeft_Area {
            float: left;
            padding-right: 10px;
            margin: 0px 0px 0px 0px;
        }

        .usage-area-section ul {
            float: left;
            margin: 0px;
        }

        input[type="radio"], input[type="checkbox"] {
            line-height: normal;
            margin: 4px 5px 0 0;
        }
        .res_cni{
                float: left;
    padding: 8px;
    color: #666;
    font-family: MyriadPro-LightSemiExt;
        }

        .choose_name_img {
                width: 103px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
    line-height: 29px;
        }
    </style>
    <div class="top-header-area">
        <h2>Settings<%--Configure Authentication--%> </h2>
    </div>
    <div class="grid-section">
        <div class="usage-area-section" style="padding: 14px 0px 0px 14px; display: table; width: 100%; border-bottom: 2px solid #ebebeb;">
            <span class="FLeft_Area" style="padding-left: 13px;">Mode of Authentication : </span>
            <ul>
                <li>
                    <asp:RadioButton ID="rdDatabase" runat="server" Checked="true" Text=" Database" GroupName="Authentication" ClientIDMode="Static" />
                </li>
                <li>
                    <asp:RadioButton ID="rdLdap" runat="server" Text=" LDAP" GroupName="Authentication" ClientIDMode="Static" />
                </li>
            </ul>
        </div>
    </div>
    <div class="clear">
        &nbsp;
    </div>
    <div class="top-header-area">
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
            <ul id="powerRate" style="width: 100%">
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
            <ul id="waterRate" style="width: 100%">
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
            <ul id="gasRate" style="width: 100%">
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
                                
                                <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 30%; float: left;">
                                    
                                    <asp:TextBox ID="txtMonthlyBudget" Text="0" runat="server" onkeypress="return IsNumeric(event)" MaxLength="4" ClientIDMode="Static"></asp:TextBox>
                                    
                                </div>
                                <label class="res_cni">Residential </label>
                                <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 30%; float: left;">
                                    
                                    <asp:TextBox ID="txtCI" Text="0" runat="server" onkeypress="return IsNumeric(event)" MaxLength="6" ClientIDMode="Static"></asp:TextBox>
                                
                                </div>
                                <label class="res_cni">C&I </label>
                            </div>

                            <%---------------------Send Mail Configuration-------------------------%>
                            <div class="user-written-area  gray-box">
                                <label>Send Mail Through: </label>
                            </div>
                            <div class="Text-box-area gray-box">
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

                            <div class="user-written-area">
                                <label>Net Usage Selection Style: </label>
                            </div>
                            <div class="Text-box-area ">
                                <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                    <asp:CheckBox ID="chkInverted" runat="server" ClientIDMode="Static" Text="Value of solar in positive axis" />
                                </div>
                            </div>

                            <%---------------------Usage -- Valus Selection-------------------------%>
                             <div class="user-written-area gray-box">
                                <label>Show Decimal: </label>
                            </div>
                            <div class="Text-box-area  gray-box">
                                <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                    <asp:CheckBox ID="chkDecimalValues" runat="server" ClientIDMode="Static" />
                                </div>
                            </div>

                          <%--  ************************Outage Images***************************--%>
                              <div class="top-header-area">
                                <h2>Current Outage Images:</h2>
                               </div>

                              <div class="user-written-area gray-box" style="float:left;width:50%;    padding: 9px 18px !important;    height: 50px;">
                                <span class="submit-button btn btn-primary btn-file" id="lblOutageFileupload_crnt_trdtion" style="float: left !important; line-height: 22px; font-size: 15px; padding: 3px 11px !important;">Choose Traditional File
                                    <asp:FileUpload ID="FileUplod_outage_Image_crnt_trdtion" runat="server" class="blah" onchange="readURL_outage_crnt_trdtion(this);" ClientIDMode="Static" Style="padding: 5px 0px 0px 0px;" />
                                </span>
                                <i id="nofile_outageImage_crnt_trdtion" class="choose_name_img">No File Chosen</i>
                                <img id="btnRemoveFile_outage_crnt_trdtion" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFileOutageImage_crnt_trdtion();" style="display: none;    margin-top: -10px;">
                                   <div id="divImg_outage_crnt_trdtion" style="margin: 1px 0px;display: inline-block;height: 29px;padding-left: 19px;">
                                        <img id="blahimg_imageOutage_crnt_trdtion" src="<%#ConfigurationManager.AppSettings["portalfilehandler"]%>imagename=energy_icon_red.png&Path=outages" style="width: 25px;height: 30px;"  class="blahimg_imageOutage_crnt_trdtion" onerror="imgError(this)" />
                                    </div>
                                   </div>
                              

                            <div class="Text-box-area gray-box" style="float:left;width:50%;padding: 9px 18px !important;    height: 50px;" >
                                <span class="submit-button btn btn-primary btn-file" id="lblOutageFileupload_crnt_modrn" style="float: left !important; line-height: 22px; font-size: 15px; padding: 3px 11px !important;">Choose Modern File
                                    <asp:FileUpload ID="FileUplod_outage_Image_crnt_modrn" runat="server" class="blah" onchange="readURL_outage_crnt_modrn(this);" ClientIDMode="Static" Style="padding: 5px 0px 0px 0px;" />
                                </span>
                                <i id="nofile_outageImage_crnt_modrn" class="choose_name_img">No File Chosen</i>
                                <img id="btnRemoveFile_outage_crnt_modrn" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFileOutageImage_crnt_modrn();" style="display: none;    margin-top: -10px;">
                                <div id="divImg_outage_crnt_modrn"  style="margin: 1px 0px;display: inline-block;height: 29px;padding-left: 19px;">
                                    <img id="blahimg_imageOutage_crnt_modrn" src="<%#ConfigurationManager.AppSettings["portalfilehandler"]%>imagename=energy_icon_red_M.png&Path=outages" style="width: 25px;height: 30px;"  class="blahimg_imageOutage_crnt_modrn" onerror="imgError(this)" />
                                </div>
                                 </div>
                           
                           

                             <div class="top-header-area">
                                <h2>Planed Outage Images:</h2>
                               </div>

                              <div class="user-written-area gray-box" style="float:left;width:50%;padding: 9px 18px !important;    height: 50px;">
                                <span class="submit-button btn btn-primary btn-file" id="lblOutageFileupload_plan_trdtion" style="float: left !important; line-height: 22px; font-size: 15px; padding: 3px 11px !important;">Choose Traditional File
                                    <asp:FileUpload ID="FileUplod_outage_Image_plan_trdtion" runat="server" class="blah" onchange="readURL_outage_plan_trdtion(this);" ClientIDMode="Static" Style="padding: 5px 0px 0px 0px;" />
                                </span>
                                <i id="nofile_outageImage_plan_trdtion" class="choose_name_img">No File Chosen</i>
                                <img id="btnRemoveFile_outage_plan_trdtion" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFileOutageImage_plan_trdtion();" style="display: none;    margin-top: -10px;">
                              
                                   <div id="divImg_outage_plan_trdtion"  style="margin: 1px 0px;display: inline-block;height: 29px;padding-left: 19px;">
                                <img id="blahimg_imageOutage_plan_trdtion" src="<%#ConfigurationManager.AppSettings["portalfilehandler"]%>imagename=energy_icon_blue.png&Path=outages"  style="width: 25px;height: 30px;"  class="blahimg_imageOutage_plan_trdtion" onerror="imgError(this)" />
                            </div>
                               
                              </div>
                          


                            <div class="Text-box-area gray-box"  style="float:left;width:50%;padding: 9px 18px !important;    height: 50px;">
                                <span class="submit-button btn btn-primary btn-file" id="lblOutageFileupload_plan_modrn" style="float: left !important; line-height: 22px; font-size: 15px; padding: 3px 11px !important;">Choose Modern File
                                    <asp:FileUpload ID="FileUplod_outage_Image_plan_modrn" runat="server" class="blah" onchange="readURL_outage_plan_modrn(this);" ClientIDMode="Static" Style="padding: 5px 0px 0px 0px;" />
                                </span>
                                <i id="nofile_outageImage_plan_modrn" class="choose_name_img">No File Chosen</i>
                                <img id="btnRemoveFile_outage_plan_modrn" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFileOutageImage_plan_modrn();" style="display: none;    margin-top: -10px;">
                           
                                  <div id="divImg_outage_plan_modrn" style="margin: 1px 0px;display: inline-block;height: 29px;padding-left: 19px;">
                                <img id="blahimg_imageOutage_plan_modrn" src="<%#ConfigurationManager.AppSettings["portalfilehandler"]%>imagename=energy_icon_blue_M.png&Path=outages"  style="width: 25px;height: 30px;"  class="blahimg_imageOutage_plan_modrn" onerror="imgError(this)" />
                            </div>
                                 </div>
                            

                          
                         <%--   ************************End Outage Images****************************--%>

                            <%---------------------Usage -- Bar Color-------------------------%>
                            <div class="top-header-area">
                                <h2>Usage Color Selection</h2>
                                <h4>Use Default Colors:  
                                    <asp:CheckBox ID="chkDefault" runat="server" ClientIDMode="Static" />
                                </h4>
                            </div>

                            <div class="grid-section">
                                <div class="user-written-area-half">
                                    <label>High:</label>
                                </div>
                                <div class="Text-box-area-half">
                                    <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                        <asp:TextBox ID="txtHigh" type='color' CssClass="Custom" runat="server" ClientIDMode="Static" onkeypress="return restrict(event)"></asp:TextBox>
                                    </div>
                                </div>

                                <div class="user-written-area-half">
                                    <label>Average:</label> <%--bug id #39803--%>
                                </div>
                                <div class="Text-box-area-half">
                                    <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                        <asp:TextBox ID="txtMedium" CssClass="Custom" runat="server" onkeypress="return restrict(event)" ClientIDMode="Static"></asp:TextBox>
                                    </div>
                                </div>
                            </div>

                            <div class="grid-section">
                                <div class="user-written-area-half gray-box">
                                    <label>Low:</label>
                                </div>
                                <div class="Text-box-area-half gray-box">
                                    <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                        <asp:TextBox ID="txtLow" CssClass="Custom" runat="server" onkeypress="return restrict(event)" ClientIDMode="Static"></asp:TextBox>
                                    </div>
                                </div>

                                <div class="user-written-area-half gray-box">
                                    <label>Solar:</label>
                                </div>
                                <div class="Text-box-area-half gray-box">
                                    <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                        <asp:TextBox ID="txtSolar" CssClass="Custom" runat="server" onkeypress="return restrict(event)" ClientIDMode="Static"></asp:TextBox>
                                    </div>
                                </div>
                            </div>

                            <div class="grid-section">
                                <div class="user-written-area-half">
                                    <label>Water Allocation:</label>
                                </div>
                                <div class="Text-box-area-half">
                                    <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                        <asp:TextBox ID="txtwater" CssClass="Custom" runat="server" onkeypress="return restrict(event)" ClientIDMode="Static"></asp:TextBox>
                                    </div>
                                </div>
                            </div>


                            <%---------------------Compare Spending -- Bar Color-------------------------%>
                            <div class="top-header-area">
                                <h2>Compare Spending Color Selection</h2>
                            </div>

                            <div class="grid-section">
                                <div class="user-written-area-half">
                                    <label>Compare Current:</label>
                                </div>
                                <div class="Text-box-area-half">
                                    <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                        <asp:TextBox ID="txtCompareCurrent" CssClass="Custom" runat="server" onkeypress="return restrict(event)" ClientIDMode="Static"></asp:TextBox>
                                    </div>
                                </div>

                                <div class="user-written-area-half">
                                    <label>Compare Previous:</label>
                                </div>
                                <div class="Text-box-area-half">
                                    <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                        <asp:TextBox ID="txtComparePrev" CssClass="Custom" runat="server" onkeypress="return restrict(event)" ClientIDMode="Static"></asp:TextBox>
                                    </div>
                                </div>
                            </div>

                            <div class="grid-section">
                                <div class="user-written-area-half gray-box">
                                    <label>Compare Utility:</label>
                                </div>
                                <div class="Text-box-area-half gray-box">
                                    <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                        <asp:TextBox ID="txtCompareUtility" CssClass="Custom" runat="server" onkeypress="return isNumberKey(event)" ClientIDMode="Static"></asp:TextBox>
                                    </div>
                                </div>

                                <div class="user-written-area-half gray-box">
                                    <label>Compare Zip:</label>
                                </div>
                                <div class="Text-box-area-half gray-box">
                                    <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                        <asp:TextBox ID="txtCompareZip" CssClass="Custom" runat="server" onkeypress="return restrict(event)" ClientIDMode="Static"></asp:TextBox>
                                    </div>
                                </div>
                            </div>

                            <%---------------------Budget My Bill -- Bar Color-------------------------%>
                            <div class="top-header-area">
                                <h2>Budget My Bill Color Selection</h2>
                            </div>

                            <div class="grid-section">
                                <div class="user-written-area-half">
                                    <label>My Usage:</label>
                                </div>
                                <div class="Text-box-area-half">
                                    <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                        <asp:TextBox ID="txtBillUsage" CssClass="Custom" runat="server" onkeypress="return restrict(event)" ClientIDMode="Static"></asp:TextBox>
                                    </div>
                                </div>

                                <div class="user-written-area-half">
                                    <label>Zip Average:</label>
                                </div>
                                <div class="Text-box-area-half">
                                    <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                        <asp:TextBox ID="txtBillZip" CssClass="Custom" runat="server" onkeypress="return restrict(event)" ClientIDMode="Static"></asp:TextBox>
                                    </div>
                                </div>
                            </div>

                            <div class="grid-section">
                                <div class="user-written-area-half gray-box">
                                    <label>My Budget:</label>
                                </div>
                                <div class="Text-box-area-half gray-box">
                                    <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                        <asp:TextBox ID="txtBillBudget" CssClass="Custom" runat="server" onkeypress="return isNumberKey(event)" ClientIDMode="Static"></asp:TextBox>
                                    </div>
                                </div>

                                <div class="user-written-area-half gray-box">
                                </div>
                                <div class="Text-box-area-half gray-box">
                                    <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                    </div>
                                </div>
                            </div>

                            <%---------------------Rate Analysis -- Bar Color-------------------------%>
                            <div class="top-header-area">
                                <h2>Rate Analysis Color Selection</h2>
                            </div>

                            <div class="grid-section">
                                <div class="user-written-area-half">
                                    <label>Current Plan:</label>
                                </div>
                                <div class="Text-box-area-half">
                                    <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                        <asp:TextBox ID="txtCurrPlan" CssClass="Custom" runat="server" onkeypress="return restrict(event)" ClientIDMode="Static"></asp:TextBox>
                                    </div>
                                </div>
                            </div>

                            <div class="grid-section">
                                <div class="user-written-area-half gray-box">
                                    <label>New Plan:</label>
                                </div>
                                <div class="Text-box-area-half gray-box">
                                    <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                        <asp:TextBox ID="txtNewPlan" CssClass="Custom" runat="server" onkeypress="return restrict(event)" ClientIDMode="Static"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="user-written-area-half gray-box">
                                </div>
                                <div class="Text-box-area-half gray-box">
                                    <div class="usage-area-section" style="padding: 3px 0px 0px 14px; display: block; width: 100%; float: left;">
                                    </div>
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
    </div>
    <div class="outage_sbt_box">
        <asp:Button ID="btnAuthentication" runat="server" Text="Save" OnClientClick="return false;" CssClass="submitBtn" ToolTip="Save Setting" ClientIDMode="Static" />
    </div>
    <asp:HiddenField ID="hdnImageSource1" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="filehandlerpath" runat="server" ClientIDMode="Static" Value='<%#ConfigurationManager.AppSettings["portalfilehandler"]%>' />
</asp:Content>
