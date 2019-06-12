<%@ Page Title="Application Labels" Language="C#" MasterPageFile="~/Administration.master" AutoEventWireup="true" CodeBehind="MultiLanguage.aspx.cs" Inherits="AdminPanel.MultiLanguage" %>

<%@ Import Namespace="AdminPanel" %>
<%@ Import Namespace="Newtonsoft.Json" %>

<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../Scripts/jquery.bootstrap-duallistbox.min.js"></script>
    <script src="../js/Configure-Multilanguage.js"></script>
    <script src="../js/popup.js"></script>
    <link href="../css/font-awesome.css" rel="stylesheet" />
    <script type="text/javascript">
        var userRights =<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>;
        var userEditRights =userRights.indexOf( '<%=UserRights.LanguageAccess%>')>=0;
        var demo1 = $('[name="duallistbox_demo1[]"]').bootstrapDualListbox();
    </script>

    <script type="text/javascript">
        $("document").ready(function () {
         
            $("#chartDiv").addClass("HEight");
            $('#collapseOne').addClass('in');
            $('.sidebar_MultiManguage').addClass('active');
            $("#ddlType").prop("enabled", true);
            $('#txtNewSpanishText').addClass("concatKey");
            $('#txtNewEnglishText').addClass("concatKey");
        });

     
        $("document").ready(function () {
               $('a[href = "#Add"]').click(function(){
                var ScreenID = $('#ddlScreen').val();
                if (ScreenID=='-1')
                {
                    alert('Please Select the Screen First.'); 
                    return false;
                }
                else{
                    return true;
                }
             
            }); 

    
        });
    </script>
    <input type="hidden" class="activeli_list" value="sidebar_MultiManguage_app" />
    <style>
        .deleteLanguage {
            cursor: pointer;
        }

        .popup_left_content_area_home {
            float: left;
            font-weight: bold;
            padding-bottom: 2%;
            padding-right: 1%;
            width: 52%;
        }

        #btnDiv input {
            width: 40%;
        }

        .LanguageDetails .tab-pane {
            background-image: linear-gradient(rgb(255, 255, 255) 20%, rgb(244, 242, 242) 100%);
        }

      

        #status, input[type="text"], input[type="password"], input[type="number"], input[type="email"],
        input[type="tel"] {
            display: block;
            width: 97%;
            margin: 0 0 0px 0;
            border: 1px solid #ccc;
            font-size: 1em;
            padding: 2px 5px;
            -moz-border-radius: 3px;
            -webkit-border-radius: 3px;
            border-radius: 3px;
            behavior: url(/entreg/assets/scripts/external/PIE.htc);
            position: relative;
            background: #fff;
        }

        .form-control {
            padding-left: 2% !important;
            font-size: 12px !important;
            padding-top: 1% !important;
        }

        .PopupcontentNew {
            left: 15% !important;
            top: 20% !important;
        }

        .modal-header {
            background: #999999;
            padding: 8px 10px;
            color: #fff;
            margin-bottom: 5px;
        }

        #AddEditModel1 .modal-body, #AddEditModel .modal-body {
            padding: 10px 0;
        }

        .controlContainer table {
            width: 100%;
        }

            .controlContainer table td {
                padding: 4px 0px 4px 17px !important;
                border: 0 !important;
            }

            .controlContainer table tr:nth-child(even) {
                background: #f4f4f4;
            }

        .modal-content {
            float:left;width:100%;
        }
    </style>
    <script type="text/javascript">
        $(window).resize(function(){
            $('#jqxgrid').jqGrid('setGridHeight',$(window).innerHeight());
        });
    </script>
    <link href="../css/bootstrap-duallistbox.min.css" rel="stylesheet" />
    <uc1:jqxGrid ID="JqxGrid1" runat="server" />
    <input type="hidden" class="activeli_list" value="sidebar_Language" />
    
    </asp:ScriptManager>

    <div class="top-header-area">
        <div style="float: left; width: 40%;">
            <h2 style="padding-left: 20px;">Application Labels</h2>
        </div>
        <div id="searchpanel" class="Rightheader-Pannel">
            <asp:Label ID="lblScreenName" runat="server" Text="Screen Name"></asp:Label>

            <asp:DropDownList ID="ddlScreen" runat="server" ClientIDMode="Static"></asp:DropDownList>

         <%--   <a href="#Add" data-toggle="modal" data-target="#AddEditModel" onclick="SetPopupHeader('Add Application Labels','Add')">Add</a>--%>
           <%-- Removed Add button for Multilingual Label due to security reason--%>
            <asp:Button ID="btnExport" runat="server" Text="Export XML" OnClick="btnExport_Click" />
        </div>
    </div>

    <div class="grid-section">
        <div id="jqxgrid" class="jqgrid"></div>
    </div>

    <!-- Popup starts -->

    <div class="modal fade" id="AddEditModel" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <a href="#" class="close" data-dismiss="modal" id="closeApplicationLabel" style="opacity: 9; margin-top: 0px;">
                        <img src="../images/popup_close.png" title="Close" /></a>
                    <h4 id="hModelHeader" class="modal-title">Modal Header</h4>
                </div>
                <div class="modal-body">
                    <div class="controlContainer" style="padding: 0px;">

                        <table class="table" style="margin-bottom: 0;">
                            <tr>
                                <td>Module Name</td>
                                <td>
                                    <label id="lblModuleName"></label>
                                </td>
                                <td></td>
                            </tr>


                            <tr>
                                <td>Type</td>
                                <td>
                                    <asp:DropDownList ID="ddlType" runat="server" ClientIDMode="Static" CssClass="concatKey">
                                        <asp:ListItem Value="0">Select</asp:ListItem>
                                        <asp:ListItem Value="Err">Error</asp:ListItem>
                                        <asp:ListItem Value="Nav">Navigation</asp:ListItem>
                                        <asp:ListItem Value="Lbl">Label</asp:ListItem>
                                        <asp:ListItem Value="Anchor">Anchor</asp:ListItem>
                                        <asp:ListItem Value="Btn">Button</asp:ListItem>
                                        <asp:ListItem Value="Literal">Literal</asp:ListItem>
                                        <asp:ListItem Value="Span">Span</asp:ListItem>
                                        <asp:ListItem Value="Div">Div</asp:ListItem>
                                        <asp:ListItem Value="txtBox">TextBox</asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                                <td><span class="required" style="color: #950202; padding-left: 3px; font-size: 19px;">*</span></td>
                            </tr>
                            <tr>
                                <td>English Text
                                </td>
                                <td>
                                    <asp:TextBox ID="txtNewEnglishText" runat="server" ClientIDMode="Static" MaxLength="500" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td><span class="required" style="color: #950202; padding-left: 3px; font-size: 19px;">*</span></td>
                            </tr>
                            <tr>
                                <td>Spanish Text</td>
                                <td>
                                    <asp:TextBox ID="txtNewSpanishText" runat="server" ClientIDMode="Static" MaxLength="500" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td><span class="required" style="color: #950202; padding-left: 3px; font-size: 19px;">*</span></td>
                            </tr>
                            <tr id="trEnglishControlPalceHolder">
                                <td>English Place Holder</td>
                                <td>

                                    <asp:TextBox ID="txtEnglishControlPlaceHolder" runat="server" ClientIDMode="Static" MaxLength="400" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                            <tr id="trSpanishControlPalceHolder">
                                <td>Spanish Place Holder</td>
                                <td>

                                    <asp:TextBox ID="txtSpanishControlPlaceHolder" runat="server" ClientIDMode="Static" MaxLength="400" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                            <tr id="trEnglishControlTitle">
                                <td>English Title</td>
                                <td>

                                    <asp:TextBox ID="txtEnglishControlTitle" runat="server" ClientIDMode="Static" MaxLength="200" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                            <tr id="trSpanishControlTitle">
                                <td>Spanish Title</td>
                                <td>

                                    <asp:TextBox ID="txtSpanishControlTitle" runat="server" ClientIDMode="Static" MaxLength="200" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                            <tr id="trAltTitleEnglish">
                                <td>English Alt Text</td>
                                <td>
                                    <asp:TextBox ID="txtAltTitleEnglish" runat="server" ClientIDMode="Static" MaxLength="500" Style="margin-bottom: 0;" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                            <tr id="trAltTitleSpanish">
                                <td>Spanish Alt Text</td>
                                <td>
                                    <asp:TextBox ID="txtAltTitleSpanish" runat="server" ClientIDMode="Static" MaxLength="500" Style="margin-bottom: 0;" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                             <tr id="trErrmsgEnglish">
                                <td>English Error Message</td>
                                <td>
                                    <asp:TextBox ID="txtErrmsgEnglish" runat="server" ClientIDMode="Static" MaxLength="500" Style="margin-bottom: 0;" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                            <tr id="trErrmsgSpanish">
                                <td>Spanish Error Message</td>
                                <td>
                                    <asp:TextBox ID="txtErrmsgSpanish" runat="server" ClientIDMode="Static" MaxLength="500" Style="margin-bottom: 0;" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Key</td>
                                <td>
                                    <asp:TextBox ID="txtKey" runat="server" ClientIDMode="Static" MaxLength="200" Style="margin-bottom: 0;" onkeypress="return IsHtmlTag(event);"></asp:TextBox>

                                </td>
                                <td></td>
                            </tr>

                        </table>

                    </div>
                    <div style="text-align: center; margin-top: 10px; border-top: 1px solid #ccc;" align="center">
                      
                        <button id="btnAddUpdate" type="button" class="submitBtn" value="" onclick="return SaveData();">Add</button>
                        <asp:HiddenField ID="hdModuleName" ClientIDMode="static" runat="server" />
                    </div>
                </div>
            </div>

        </div>
    </div>
    <%--   UPDATE POPUP--%>
    <div class="modal fade" id="AddEditModel1" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">

                    <a href="#" class="close" data-dismiss="modal" id="closeApplicationLabel1" style="opacity: 9; ">
                        <img src="../images/popup_close.png" title="Close" /></a>
                    <h4 id="hModelHeader1" class="modal-title">Modal Header</h4>
                </div>
                <div class="modal-body">
                    <div class="controlContainer" style="padding: 2px;">

                        <table class="table" style="margin-bottom: 0;">
                            <tr>
                                <td>Module Name</td>
                                <td>
                                    <label id="lblModuleName1"></label>
                                </td>
                                <td></td>
                            </tr>
                         
                            <tr>
                                <td>English Text</td>
                                <td>
                                    <asp:TextBox ID="txtNewEnglishText1" runat="server" ClientIDMode="Static" MaxLength="500" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td><span class="required" style="color: #950202; padding-left: 3px; font-size: 19px;">*</span></td>
                            </tr>
                            <tr>
                                <td>Spanish Text</td>
                                <td>
                                    <asp:TextBox ID="txtNewSpanishText1" runat="server" ClientIDMode="Static" MaxLength="500" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td><span class="required" style="color: #950202; padding-left: 3px; font-size: 19px;">*</span></td>
                            </tr>

                            <tr>
                                <td>English Title</td>
                                <td>
                                    <asp:TextBox ID="txtNewEnglishControlTitle" runat="server" ClientIDMode="Static" MaxLength="400" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Spanish Title</td>
                                <td>
                                    <asp:TextBox ID="txtNewSpanishControlTitle" runat="server" ClientIDMode="Static" MaxLength="400" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>English Place Holder</td>
                                <td>
                                    <asp:TextBox ID="txtNewEnglishControlPlaceholder" runat="server" ClientIDMode="Static" MaxLength="400" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Spanish Place Holder</td>
                                <td>
                                    <asp:TextBox ID="txtNewSpanishControlPlaceholder" runat="server" ClientIDMode="Static" MaxLength="400" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>English Alt Text</td>
                                <td>
                                    <asp:TextBox ID="txtNewEnglishAltTitle" runat="server" ClientIDMode="Static" MaxLength="500" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Spanish Alt Text</td>
                                <td>
                                    <asp:TextBox ID="txtNewSpanishAltTitle" runat="server" ClientIDMode="Static" MaxLength="500" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                                <tr id="trErrmsgEnglish1">
                                <td>English Error Message</td>
                                <td>
                                    <asp:TextBox ID="txtNewerrmsgEnglish" runat="server" ClientIDMode="Static" MaxLength="500" Style="margin-bottom: 0;" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                            <tr id="trErrmsgSpanish1">
                                <td>Spanish Error Message</td>
                                <td>
                                    <asp:TextBox ID="txtNewerrmsgSpanish" runat="server" ClientIDMode="Static" MaxLength="500" Style="margin-bottom: 0;" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Key</td>
                                <td>
                                    <asp:TextBox ID="txtKey1" runat="server" ClientIDMode="Static" MaxLength="200" Style="margin-bottom: 0;" Enabled="false" onkeypress="return IsHtmlTag(event);"></asp:TextBox>

                                </td>
                                <td></td>
                            </tr>

                        </table>

                    </div>
                    <div style="text-align: center; margin-top: 10px; border-top: 1px solid #ccc;" align="center">

                        <button id="btnAddUpdate1" type="button" class="submitBtn" data-dismiss="modal" value="" onclick="UpdateData();">Add</button>
                        <asp:HiddenField ID="HiddenField1" ClientIDMode="static" runat="server" />
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- Popup ends -->
     <style>
        .grid_main_box {
    margin-left: 11px;
    margin-top:4px;
    text-align: center;
}
    </style>
</asp:Content>
