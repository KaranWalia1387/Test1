<%@ Page Title="CRM Campaign" Language="C#" MasterPageFile="~/CRM/CRM.master" AutoEventWireup="true" CodeBehind="crm-campaign-configuration.aspx.cs" Inherits="AdminPanel.CRM.crm_campaign_configuration" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    
    
    <script>
        $(document).ready(function () {
            $("ul.tabs li.campaign_configurations").addClass("active");
            $('#filter_btn_explorer').click(function () {
                $(this).toggleClass('active');
                $('#divFilter').slideToggle();
            });
        });
    </script>
    <style type="text/css">
        .expand-one .content .input-section {
            float: left;
            margin: 0;
            width: 20%;
        }

        span.status {
            display: block;
            padding-top: 7px;
            color: gray;
            cursor: pointer;
        }

        .filter-section .input-section select {
            width: 88%;
        }


        .exprt-filtr {
            float: right;
            width: 255px;
        }

        .filter_button {
            padding-left: 23px;
            width: 107px;
        }

        .add_btn img {
            float: left;
            margin-left: 20px;
            padding-right: 0px;
        }

        .filter_button, .filter_button.active {
            margin-top: 0px !important;
            width: 107px;
        }



            .filter_button.active span {
                display: block;
                font-weight: bold;
                margin-top: -9px;
                color: #758386;
            }

        .add_btn a {
            color: #758386 !important;
        }

        a {
            color: #337ab7;
            text-decoration: none;
        }

        .right-content-area .active_new {
            display: block;
            margin: 2px auto 0!important;
        }
    </style>
    <uc1:jqxGrid runat="server" />
    <script src="../js/CRM-Campaign.js"></script>
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <div class="top-header-area">
        <h2>Campaign</h2>

        <div class="right_header_area">
                <ul>                     
                   
                      <li><a href="#" id="filter_btn_explorer"><span class="fa fa-filter icon_color"></span>   Filter Results</a></li>
                      <li><a href="crm-create-campaign.aspx"><span class="fa fa-plus-circle icon_color"></span>  Add Campaign</a></li>

                </ul>
    </div>
       <!-- <div class="exprt-filtr">
            <div class="fliter_button_area">
                <div class="filter_button" id="filter_btn_explorer"><span>Filter Results</span></div>
            </div>
            <div class="add_btn">
                <a href="crm-create-campaign.aspx">
                    <i class="fa fa-plus-circle plush_circle12"></i>
                    Add Campaign
                </a>
            </div>

        </div>-->
    </div>

    <div class="filter-section" id="divFilter" style="display: none;">
        <div class="expand-one">
            <p class="filter_section_link" style="display: none;">
                <img class="imgtoggle" src="../images/a.png">Filter
            </p>
            <div class="content">
                <div class="input-section">
                    <asp:TextBox ID="txtDateFrom" runat="server" placeholder="From Date" ClientIDMode="Static" Style="width: 88%;" ReadOnly="true" ToolTip="From date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateFrom" runat="server" ImageUrl="~/images/Icon-calendar.png" ToolTip="From date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight" OnClientDateSelectionChanged="checkDate"
                        PopupButtonID="btnDateFrom" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender3" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight" />
                </div>
                <div class="input-section">
                    <asp:TextBox ID="txtDateTo" runat="server" placeholder="To Date" ClientIDMode="Static" Style="width: 88%;" ReadOnly="true" ToolTip="To date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateTo" runat="server" ImageUrl="~/images/Icon-calendar.png" ToolTip="To date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight" OnClientDateSelectionChanged="checkDate"
                        PopupButtonID="btnDateTo" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender4" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight" />
                </div>
                <div class="input-section">
                    <asp:DropDownList ID="ddlType" runat="server" ClientIDMode="Static" style="width: 89.6%;">
                    </asp:DropDownList>
                </div>
                <div class="input-section">
                    <asp:DropDownList ID="ddlServiceType" runat="server" ClientIDMode="Static">
                    </asp:DropDownList>
                </div>
                <div class="input-section">
                    <asp:DropDownList ID="ddlFrequency" runat="server" ClientIDMode="Static">
                    </asp:DropDownList>
                </div>
                <div class="input-section" style="width: auto  !important; float: right; margin: 5px 20px;">

                    <input name="ctl00$ctl00$ContentPlaceHolder1$rightpanel$btnFilter" value="Filter Results" onclick="return false;" id="btnFilter" title="Search" class="filterBtn" style="margin: 0px;" type="submit">
                </div>
            </div>
        </div>
    </div>

    <div class="grid-section sgmntn_wrapper">
        <div class="" id="altrnte">
            <div class="sgmntn_right_main">
                <div style="display: block;" class="current_area" id="GenDiv">
                    <ul>
                        <li>
                            <div class="average_usage_header"><span id="CampaignActiveCount"></span></div>
                            <i>Active</i>
                        </li>
                        <li>
                            <div class="average_usage_header"><span id="CampaignInactiveCount"></span></div>
                            <i>InActive</i>
                        </li>
                        <li>
                            <div class="average_usage_header">
                                <span id="CampaignTotalCount"></span>
                            </div>
                            <i id="demandusagetext">Total</i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="add_seg_details">
        <div class="add_seg_details" style="float: left;">
            <div id="nodata_div1" style="width: 100%; text-align: center; color: Red; display: none;">No Campaign Data available</div>
            <div id="graphDiv" class="Graph-area" style="width: 100% !important; margin: 0px auto !important; float: none; display: block;">
                <div style="text-align: center; float: left; width: 100%;">
                    <div id="jqxgrid" class="jqgrid">
                    </div>
                    <div id="jqxchildgrid" style="display: none; height: 0px;" class="jqgrid;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
