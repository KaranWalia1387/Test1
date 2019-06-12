<%@ Page Title="Services" Language="C#" MasterPageFile="~/Administration.master" AutoEventWireup="true" CodeBehind="configure-service.aspx.cs" Inherits="AdminPanel.configure_service" %>

<%@ Import Namespace="AdminPanel" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <style>
        #jqxgrid td, th {
            padding: 0 8px;
        }

        .fancybox-skin .fancybox.GridImage {
            width: 420px !important;
        }

        .AddUserContentData {
            width: 266px;
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



        #btnRemoveFile {
            position: relative;
            top: 6px;
        }

        .AddUserContentLabel1 {
            float: left;
            line-height: 16px;
            margin-top: 18px;
            padding-left: 104px;
            text-align: left;
            width: 103px;
            font-weight: normal;
        }
    </style>
    
    <script type="text/javascript">
        $(".fancybox-effects").fancybox({
            helpers : {
                overlay : {
                    speedOut : 0
                 
                }
            }
        });
        $(document).ready(function () {
            $('#btnRemoveFile').hide();
        });

        $(function () {
            //File Preview Start
            $('#fileUpload').on('change',function () {
                $('#imgTopic').attr('style', 'display:block');
                $('#btnRemoveFile').show();
                readURL(this);
            });
            //Preview End
            $('input[type=text]').keypress(function (event) {
                return ChkOnlyHtmlTag(event);
            });
        });

        
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
            
                reader.onload = function (e) {
                    $('#imgTopic').attr('src', e.target.result);
                }
            
                reader.readAsDataURL(input.files[0]);
            }
        }
    </script>
     <script type="text/javascript">
         //var k = jQuery.noConflict();
    </script>
    <input type="hidden" class="activeli_list" value="sidebar_service" />
    <uc1:jqxGrid runat="server" />
    </asp:ScriptManager>
    <div class="top-header-area">
        <h2>Services</h2>
        <% if (SessionAccessor.UserRightList.Contains(UserRights.ServiceAccess))
           { %>
        <div style="float: right; margin-right: 16px;">
            <a href="#" id="lblAddTopic" style="text-decoration: none;"><i class="fa fa-plus-circle icon_color" style="vertical-align: top;"></i>
                Add Service Type</a>
        </div>
        <% } %>
    </div>
    <div class="grid-section">
        <div id="graphDiv" class="Graph-area">
            <div id="jqxgrid" style="width: 100%" class="jqgrid">
            </div>
            <div id="nodata_div" style="width: 100%; text-align: center" visible="false"></div>
        </div>
    </div>
    <div id="PopupAddTopic" style="display: none; background-color: White; width: 400px;">
        <div class="PopUpTitleBg configure-service-popup" style="margin-bottom: 0px;">

            <div class="PopUpTitle" id="popuptitle">
                Add Reason
            </div>
            <input type="button" id="ClosePopupAddTopic" value="" class="popCloseBtn" /><div
                class="clear">
                &nbsp;
            </div>
        </div>
        <div class="clear">
            &nbsp;
        </div>
        <label class="AddUserContentLabel1">
            Service Name:</label>


        <div class="AddUserContentData">
            <input id="txtReason" type="text" title="Service Name" mandatory="1" onkeypress="return IsHtmlTag(event);" />
        </div>
        <div class="clear"></div>
        <div class="AddUserContentLabel1">
            <img id="imgTopic" width="150px" height="60px" onerror="imgError(this)" />
        </div>
        <div class="clearfix"></div>
        <label class="AddUserContentLabel1">
            Add Image:</label>

        <div class="AddUserContentData">
            <span class="submit-button btn btn-primary btn-file" id="lblFileupload" style="float: left !important; line-height: 22px; font-size: 15px; padding: 3px 11px !important;">Choose File
                <asp:FileUpload ID="fileUpload" runat="server" ClientIDMode="Static" onchange="File_OnChange(this)" Style="width: 87%; float: left" />
            </span>
            <i id="nofile" globalize="ML_SrvcRqust_i_NoFile" style="text-overflow: ellipsis; width: 116px; overflow: hidden; display: block; ">No File Chosen</i>
            <img id="btnRemoveFile" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFile();">
        </div>
        <div class="clear">
            &nbsp;
        </div>
        <div style="text-align: right; margin-top: 12px; margin-bottom: 8px; border-top: 1px solid #ccc;">
            <asp:Button ID="addReason" Text="Add" CssClass="savePassword submitBtn" Style="padding: 5px 20px; float: none;" runat="server" ClientIDMode="Static" OnClientClick="return false;" />
        </div>
    </div>
    <script>
        var userRights =<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>;
        var userUsageRights =userRights.indexOf( '<%=UserRights.ServiceReadOnly%>')>=0 && userRights.indexOf( '<%=UserRights.ServiceAccess%>')<0;
        var test;
    </script>
    <script src="../js/AjaxFileUpload/ajaxfileupload.js"></script>
    <script src="../js/popup.js"></script>
    <script src="../js/configure-service.js"></script>

    <link href="../css/font-awesome.css" rel="stylesheet" />
    <link href="../js/fancybox/jquery.fancybox.css?v=2.1.5" rel="stylesheet" />
    <script src="../js/fancybox/jquery.fancybox.pack.js?v=2.1.5"></script>
</asp:Content>
