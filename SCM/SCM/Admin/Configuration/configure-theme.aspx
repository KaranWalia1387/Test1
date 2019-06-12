<%@ Page Title="" Language="C#" MasterPageFile="~/Configuration/Configuration.master" AutoEventWireup="true" CodeBehind="configure-theme.aspx.cs" Inherits="AdminPanel.configure_theme" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script type="text/javascript">
        function AssignValue() {
            document.getElementById('txtcolor').value = document.getElementById('inHtmlColor').value.toString();
            return;
        }
        
    </script>
    <script src="../js/AjaxFileUpload/ajaxfileupload.js"></script>
    <div class="top-header-area" id="header">
        <div class="Leftheader-Pannel" id="child">
            <h2>Theme</h2>
        </div>
    </div>

    <div>

        <div style="width: 100%; border-bottom: 2px solid #ededed; padding: 0px 0 6px 26px; font-size: 14px; font-weight: bold;">
            Select Theme
        </div>
        <table style="margin-top: 0px; margin-bottom: 0px" class="tbl upload_img_tbl">
            <tr style="height: 25px;">
                <td align="center" style="width: 16%;">
                    <label>Select File</label>
                </td>
                <td align="left" style="width: 50%;">
                    <div class="fileupload">
                        <asp:FileUpload ID="flUploadTheme" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" />
                    </div>
                    <div class="imgcros">
                        <img id="btnRemoveTheme" title="Remove" src="../images/notification_icon/Payment_DeleteIcon.png"
                            onclick="return removeFileTheme();" />
                    </div>
                    <div class="alredyimg" style="display:none">
                        <asp:Image ID="imgHeader" runat="server" />
                    </div>
                </td>
            </tr>
            <tr style="height: 25px;">
                <td align="center" style="width: 25%; border-right: 0px;">
                    <label>Select Color</label>
                </td>
                <td align="left" style="width: 37.5%; border-right: 0px;">
                    <input runat="server" id="txtcolor" type="hidden" clientidmode="Static" />
                    <asp:TextBox ID="txtcolor1" Visible="false" runat="server" TextMode="Color" Width="80px" Style="border: 1px solid #ccc; background: none; height: 27px; padding: 0px 2px; margin: 0px;" ClientIDMode="Static" ToolTip="Select Color"></asp:TextBox>
                    <input id="inHtmlColor" class="color {pickerClosable:true}" onfocus="document.getElementById('inHtmlColor').color.showPicker();" />
                </td>
            </tr>
        </table>
        <div style="text-align:center;">
            <asp:Button ID="btnSubmit" runat="server" Text="Upload" CssClass="UploadBtn submitBtn" Style="margin: 0px;" OnClientClick="javascript:AssignValue();return FileTypeValidate();" onmouseover="javascript:AssignValue();" OnClick="btnSubmit_Click" ClientIDMode="Static"/>
            <asp:Label ID="lblupload" runat="server" ForeColor="#99CC00" />
        </div>
    </div>
    <script src="../js/configure-imagetheme.js"></script>
</asp:Content>
