<%@ Page Title="Usage" Language="C#" MasterPageFile="~/Master.Master" EnableEventValidation="false" AutoEventWireup="true" CodeBehind="Usages.aspx.cs" Inherits="CustomerPortal.Usages" %>
<%@ Register Src="~/UserControls/Usage/UsageMasterControl.ascx" TagName="UsageMasterControl" TagPrefix="uc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>

        .fancybox-skin {
            padding:0 !important;
        }

        .fancybox-inner {
             width: 620px !important;
        }
        .fancybox-inner.fancybox-inner-usage {
             width: 1195px !important;
                padding: 10px;
        }
        .fancybox-wrap-usage .fancybox-close.fancybox-close {
                    position: absolute;
                       top: -18px !important;
    right: -18px !important;
                    width: 36px;
                    height: 36px;
                    cursor: pointer;
                    z-index: 8040;
                }
        .fancybox-inner h1 {
            font-size: 18px !important;
            margin: 0;
            padding: 13px 20px !important;
        }
        .glyphicon-info-sign:before{font-family: 'Glyphicons Halflings';}
    </style>
    <script type="text/javascript">
        //noconflict();
        $(document).ready(function () {
            //Changes done on 23/05/2016
            //this is used to hide mode div when only one mode is availble
            usageType = "<%=HttpContext.Current.Session["UsageType"].ToString()%>";
            if (usageType == "PU") {
                $('#usageMapMode').css("display", "<%=master_master.PowerModeHideShow()%>");
            }
            else if (usageType == "WU") {
                $('#usageMapMode').css("display", "<%=master_master.WaterModeHideShow()%>");
            }
            else if (usageType == "GU") {
                $('#usageMapMode').css("display", "<%=master_master.GasModeHideShow()%>");
            }
            else {
                $('#usageMapMode').css('display', 'block');
            }
            $("#faqlink").click(function () {
                $(".fancybox-inner").addClass("fancybox-inner-usage");
                $(".fancybox-wrap").addClass("fancybox-wrap-usage");
            });
            $(".fancybox-close").click(function () {
                $(".fancybox-inner").removeClass("fancybox-inner-usage");
                $(".fancybox-wrap").removeClass("fancybox-wrap-usage");
            });
            $(".fancybox-overlay").click(function () {
                $(".fancybox-inner").removeClass("fancybox-inner-usage");
                $(".fancybox-wrap").removeClass("fancybox-wrap-usage");
            });
            
        });
    </script>

    <%: System.Web.Optimization.Styles.Render("~/Content/cssUsages") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsUsages") %>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <input type="hidden" class="activeli_list" value="usage" />

    <asp:ScriptManager runat="server" EnableScriptGlobalization="true"></asp:ScriptManager>

    <uc1:UsageMasterControl runat="server" ID="UsageMasterControl" />

    <div id="usagechartdiv" runat="server" style="width: auto; display: none;" clientidmode="Static">
        <h1 style="font-size: 24px; margin: 0; padding: 0 20px 13px;">Rates</h1>
    </div>
    <span globalize="ML_USAGE" id="titletext" style="display: none"></span>
    <span id="alltxt" style="display:none"><%= CustomerPortal.Translator.T("ML_Notification_Services_All") %></span>

</asp:Content>
