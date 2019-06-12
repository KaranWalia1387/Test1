<%@ Page Title="Connect Me" Language="C#" MasterPageFile="~/Administration.master" AutoEventWireup="true" CodeBehind="configure-connectme.aspx.cs" Inherits="AdminPanel.configure_connectme" %>

<%@ Import Namespace="AdminPanel" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <uc1:jqxGrid ID="JqxGrid1" runat="server" />
    <script src="../js/jquery-1.7.min.js"></script>
    <link href="../css/font-awesome.css" rel="stylesheet" />
    <link href="../js/fancybox/jquery.fancybox.css?v=2.1.5" rel="stylesheet" />
    <script src="../js/fancybox/jquery.fancybox.pack.js?v=2.1.5"></script>
    <script type="text/javascript">
        var k = jQuery.noConflict();
    </script>

    <script type="text/javascript">
        $(".fancybox-effects").fancybox({
            helpers : {
                overlay : {
                    speedOut : 0
                 
                }
            }
        });
    </script>

    <script>      
        function ChkOnlyHtmlTag(event) {
            var keycode;           
            if (navigator.appCodeName=="Mozilla") {
                if (parseInt(event.charCode) == 0) {
                    keycode = parseInt(event.keyCode);
                }
                else if ((parseInt(event.charCode) != 37) && (parseInt(event.charCode) != 60) && (parseInt(event.charCode) != 62)) {
                    keycode = parseInt(event.charCode);
                }
                else {
                    keycode = 0;
                }
            }
            else {
                if ((parseInt(event.keyCode) != 37) && (parseInt(event.keyCode) != 60) && (parseInt(event.keyCode) != 62)) {
                    keycode = parseInt(event.keyCode);
                }
                else {
                    keycode = 0;
                }
            }
            if (keycode != 0) {
                return true;
            }
            else {
                return false;
            }
        }
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
            
                reader.onload = function (e) {
                    $('#imgTopic').attr('src', e.target.result);
                }
            
                reader.readAsDataURL(input.files[0]);
            }
        }
      
        $(function () {
            //File Preview Start
            k("#fileUpload").live('change',function () {
                $('#imgTopic').attr('style', 'display:block');
                $('#btnRemoveFile').show();
                readURL(this);
            });
            //Preview End
            $('input[type=text]').keypress(function (event) {
                return ChkOnlyHtmlTag(event);
            });
        });

       
    </script>
    <style type="text/css">
        .fancybox-skin .fancybox.GridImage {
            width: 420px !important;
        }

        #ClosePopupAddTopic {
            margin: -20px -20px 0 0;
            width: 34px;
            height: 35px;
        }

        .AddUserContentData {
            width: 260px;
        }

        .AddUserContentLabel1 {
            width: 136px;
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
                max-width: 209px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    width: 220px !important;
    float: left;
        }
        #lblFileupload {
            margin-bottom:0px !important;
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
            float:left;
        }
    </style>
    <input type="hidden" class="activeli_list" value="sidebar_connectme" />
    </asp:ScriptManager>
    <div class="top-header-area">
        <h2>Connect Me</h2>
        <% if (SessionAccessor.UserRightList.Contains(UserRights.ConnectMeAccess))
           {%>
        <div class="right_header_area">
            <ul>
                <li><a href="#" id="lblAddTopic" style="text-decoration: none;"><span class="fa fa-plus-circle icon_color"></span>Add Topic</a></li>
            </ul>
        </div>
        <% } %>
    </div>
    <div class="grid-section">
        <div id="graphDiv" class="Graph-area">
            <div class="grid_main_box ">
                <div id="jqxgrid" style="width: 100%" class="jqgrid">
                </div>
                <div id="nodata_div" style="width: 100%; text-align: center" visible="false"></div>
            </div>
        </div>
    </div>
    <div id="PopupAddTopic" style="display: none; background-color: White; width: 400px; border: 1px solid #008ddd;">
        <div class="PopUpTitleBg configure-service-popup" style="margin-bottom: 0px;">
            <div class="PopUpTitle" id="popuptitle">
                Add Topics
            </div>
            <input type="button" id="ClosePopupAddTopic" value="" class="popCloseBtn" />
            <div class="clear">
                &nbsp;
            </div>
        </div>
        <div class="clear">
            &nbsp;
        </div>
        <div style="display: table; width: 100%;">
            <label class="AddUserContentLabel1">
                Topic Name:</label>


            <div class="AddUserContentData">
                <input id="txtReason" onkeypress="return IsHtmlTag(event);" type="text" mandatory="1" title="Topic Name" maxlength="25" />
            </div>
            <div class="clearfix"></div>
            <label class="AddUserContentLabel1">
                &nbsp;</label>

            <div class="AddUserContentData">
                <img id="imgTopic" width="150px" height="60px" onerror="imgError(this)" />
            </div>
            <div class="clearfix"></div>
            <div class="AddUserContentLabel1">
                Add Image:
            </div>
            <div class="AddUserContentData" style="width: 243px;">
                <span class="submit-button btn btn-primary btn-file" id="lblFileupload" globlaize="ML_ConnectMe_ChooseFile" style="float: left !important; line-height: 22px; font-size: 15px; padding: 3px 11px !important;">Choose File
                <asp:FileUpload ID="fileUpload" runat="server" ClientIDMode="Static" onchange="File_OnChange(this)" Style="width: 83%; float: left;" />
                </span>
                <i id="nofile" globalize="ML_SrvcRqust_i_NoFile">No File Chosen</i>
                <img id="btnRemoveFile" src="../images/icon-delete.png"  class="blahimg" onclick="removeFile()" />
            </div>
            <div class="clear">
                &nbsp;
            </div>
            <div style="text-align: right; margin-top: 10px;" align="right">
                <asp:Button ID="addReason" Text="Add" CssClass="savePassword submitBtn" Style="padding: 5px 20px; float: none;" runat="server" ClientIDMode="Static" OnClientClick="return false;" />
            </div>
        </div>
    </div>
    <script>
      
        var userRights =<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>;
        var userUsageRights =userRights.indexOf( '<%=UserRights.ConnectMeReadOnly%>')>=0 && userRights.indexOf( '<%=UserRights.ConnectMeAccess%>')<0;
            
    </script>
    <script src="../js/AjaxFileUpload/ajaxfileupload.js"></script>
    <script src="../js/popup.js"></script>

    <script src="../js/connectme-configure.js"></script>

    <style>
        #jqxgrid td, th {
            padding: 0 8px;
        }
    </style>
</asp:Content>
