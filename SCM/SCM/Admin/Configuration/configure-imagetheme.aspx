<%@ Page Title="Configure Image And Theme" Language="C#" MasterPageFile="~/Configuration/Configuration.master" AutoEventWireup="true" CodeBehind="configure-imagetheme.aspx.cs" Inherits="AdminPanel.configure_imagetheme" %>
<%@ Import Namespace="AdminPanel" %>
<%@ Import Namespace="Newtonsoft.Json" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <asp:HiddenField ID="hdnTheme" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnImage" runat="server" ClientIDMode="Static" />
    <input type="hidden" class="activeli_list" value="sidebar_imagetheme"/>
    <script type="text/javascript" src="../js/jscolor/jscolor.js"></script>
     <script>
           $(document).ready(function () {
               var userRights =<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>;
            var userUsageRights =userRights.indexOf( '<%=UserRights.ThemeReadOnly%>')>=0 && userRights.indexOf( '<%=UserRights.ThemeAccess%>')<0;
            if (userUsageRights) {
                $('input[type=file]').attr('disabled','true');
                $('#'+'<%=btnSubmit.ClientID%>').hide();
             
            }
           });
       </script>
    <style type="text/css">
        .tbl td {
            text-align: left;
        }

        .tbl {
            width:70%;
            margin:0 auto;
        }

            .tbl td img {
                height: 25px;
            }

            .fileupload {
                width:310px; float:left;
            }
            .imgcros {
                width:50px; float:left; 
            }
            .alredyimg {
                width:111px; float:left;
            }

        .upload_img_tbl {
            width:100%;
            }
        
        
    </style>
    <script type="text/javascript">
    function AssignValue()
    {        
        document.getElementById('txtcolor').value = document.getElementById('inHtmlColor').value.toString();        
        return;
    }
    </script>

    <div class="top-header-area" id="header">
        <div class="Leftheader-Pannel" id="child">
            <h2>Image and Theme</h2>
        </div>
    </div>

    <div>
        <div style="width: 100%; border-bottom: 2px solid #ededed; padding:0px 0 6px 26px ; font-size: 14px; font-weight: bold;">
            Upload Images
        </div>
        <table style="margin-top: 0px; margin-bottom: 0px" class="tbl upload_img_tbl">
            <tr style="height: 25px;">
                <td align="center" style="width: 16%; ">
                    <label>Header</label> 
                </td>
                <td align="left" style="width: 50%;">
                    <div class="fileupload"><asp:FileUpload ID="flUploadHeader" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" /></div>
                    <div class="imgcros"><img id="btnRemoveHeader" title="Remove" src="../images/notification_icon/Payment_DeleteIcon.png"
                        onclick="return removeFileHeader();" /></div>
                   <div class="alredyimg"> <asp:Image ID="imgHeader" runat="server" /></div>
                </td>
            </tr>
            <tr style="height: 25px;">
                <td align="center" >
                    <label>Login</label>
                </td>
                <td align="left" >
                    <div class="fileupload"><asp:FileUpload ID="flUploadLogin" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" /></div>
                    <div class="imgcros"><img id="btnRemoveLogin" title="Remove" src="../images/notification_icon/Payment_DeleteIcon.png"
                        onclick="return removeFileLogin();" /></div>
                   <div class="alredyimg"> <asp:Image ID="imgLogin" runat="server" /></div>
                </td>
            </tr>
            <tr style="height: 25px;">
                <td align="center">
                    <label>Default Buttons</label>
                </td>
                <td align="left" >
                   <div class="fileupload"> <asp:FileUpload ID="flUploadDefault" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" /></div>
                   <div class="imgcros"> <img id="btnRemoveDefault" title="Remove" src="../images/notification_icon/Payment_DeleteIcon.png"
                        onclick="return removeFileDefault();" /></div>
                   <div class="alredyimg"> <asp:Image ID="imgDefaultButton" runat="server" Width="10px" /></div>
                </td>
            </tr>
            <tr style="height: 25px;">
                <td align="center" >
                    <label>Energy Efficiency</label>
                </td>
                <td align="left" >
                   <div class="fileupload"> <asp:FileUpload ID="flUploadEnergy" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" /></div>
                   <div class="imgcros">  <img id="btnRemoveEnergy" title="Remove" src="../images/notification_icon/Payment_DeleteIcon.png"
                        onclick="return removeFileEnergy();" /></div>
                    <div class="alredyimg"><asp:Image ID="imgEnergyEfficiency" runat="server" /></div>
                </td>
            </tr>
            <tr style="height: 25px;">
                <td align="center" >
                    <label>Sprite Sheet</label>
                </td>
                <td align="left" >
                   <div class="fileupload"> <asp:FileUpload ID="fluploadSprite" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" /></div>
                   <div class="imgcros"> <img id="btnRemoveSprite" title="Remove" src="../images/notification_icon/Payment_DeleteIcon.png"
                        onclick="return removeFileSprite();" /></div>
                   <div class="alredyimg"> <asp:Image ID="imgSprite" runat="server" /></div>
                </td>
            </tr>
            <tr style="height: 25px;">
                <td align="center" >
                    <label>Save Button</label>
                </td>
                <td align="left" >
                    <div class="fileupload"><asp:FileUpload ID="flUploadSave" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" /></div>
                   <div class="imgcros"> <img id="btnRemoveSave" title="Remove" src="../images/notification_icon/Payment_DeleteIcon.png"
                        onclick="return removeFileSave();" /></div>
                   <div class="alredyimg"> <asp:Image ID="imgSaveButton" runat="server" /></div>
                </td>
            </tr>
            <tr style="height: 25px;">
                <td align="center" >
                    <label>Charging Station</label>
                </td>
                <td align="left" >
                    <div class="fileupload"><asp:FileUpload ID="flUploadStation" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" /></div>
                   <div class="imgcros"> <img id="btnRemoveStation" title="Remove" src="../images/notification_icon/Payment_DeleteIcon.png"
                        onclick="return removeFileStation();" /></div>
                   <div class="alredyimg"> <asp:Image ID="imgChargingStation" runat="server" /></div>
                </td>
            </tr>
           
        </table>

        <div style="width: 100%; border-bottom: 2px solid #ededed;  border-top: 2px solid #ededed; padding:4px 0 5px 26px ; font-size: 14px; font-weight: bold;">
            Apply Theme
        </div>
        <table class="tbl upload_img_tbl">
            <tr style="height: 25px;">
                <td align="center" style="width: 25%; border-right:0px; ">
                    <label>Select Color</label>
                </td>
                <td align="left" style="width: 37.5%; border-right:0px;">
                    <input runat="server" id="txtcolor" type="hidden"  ClientIDMode="Static"  />
                    <asp:TextBox ID="txtcolor1" visible="false" runat="server" TextMode="Color" Width="80px" style="border: 1px solid #ccc; background:none; height:27px; padding:0px 2px; margin:0px;" ClientIDMode="Static" ToolTip="Select Color"></asp:TextBox>
                    <input id="inHtmlColor" class="color {pickerClosable:true}" onfocus="document.getElementById('inHtmlColor').color.showPicker();"/>
                </td>
                 <td align="right" style="padding: 10px">
                    <asp:Button ID="btnSubmit" runat="server" Text="Upload" CssClass="UploadBtn submitBtn" style="margin:0px;" OnClientClick="javascript:AssignValue();return ValidateFileUpload();" onmouseover="javascript:AssignValue();" OnClick="btnSubmit_Click" />
                    <asp:Label ID="lblupload" runat="server" ForeColor="#99CC00" />
                </td>
            </tr>
                   </table>
    </div>

    <script src="../js/configure-imagetheme.js"></script>
</asp:Content>

