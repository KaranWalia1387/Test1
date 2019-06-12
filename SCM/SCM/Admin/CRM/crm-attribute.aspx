<%@ Page Title="CRM Attribute" Language="C#" MasterPageFile="~/CRM/CRM.master" AutoEventWireup="true" CodeBehind="crm-attribute.aspx.cs" Inherits="AdminPanel.CRM.crm_attribute" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script>
        $(document).ready(function () {
            $("ul.tabs li.attributes").addClass("active");
            $('#filter_btn_explorer').click(function () {
                $(this).toggleClass('active');
                $('#divFilter').slideToggle();
            });
        });
    </script>
    <style>
        .right_header_area ul li:first-child .icon_color {
                top: 1px;
        }
        .exprt-filtr {
            float: right;
            width: 270px;
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

        span.status {
            display: block;
            padding-top: 4px;
            color: gray;
            cursor: pointer;
        }



        .filter_button.active span {
            display: block;
            font-weight: bold;
            margin-top: -9px;
            color: #666;
        }
          .right-content-area .active_new {
            display:block;
             margin: 4px auto 0;
        }
          .selection_area, .export_button_area, .fliter_button_area {
                  float: right;
    padding-right: 0px;
          }
    </style>
    <uc1:jqxGrid runat="server" />
    <script src="../js/CRM-Attribute.js"></script>
    
    </asp:ScriptManager>
    <div class="top-header-area">
        <h2>Attribute</h2>
           <div class="right_header_area">
                <ul>                
                      <li><a href="#" id="filter_btn_explorer"><span class="fa fa-filter icon_color"></span>   Filter Results</a></li>
                </ul>

    </div>
      <%--  <div class="exprt-filtr" style="width: 130px;">
            <div class="fliter_button_area">
                <div class="filter_button" id="filter_btn_explorer"><span>Filter Results</span></div>
            </div>          
        </div>--%>
    </div>

    <div class="filter-section" id="divFilter" style="display: none;">
        <div class="expand-one">
            <p class="filter_section_link" style="display: none;">
                <img class="imgtoggle" src="../images/a.png">Filter
            </p>
            <div class="content">
                <div class="input-section">
                    <%-- <input readonly="readonly" id="txtDateFrom" title="From date " placeholder="From Date" style="width: 90%;" type="text">
                    <input id="ContentPlaceHolder1_rightpanel_btnDateFrom" title="From date" class="icon-cal" src="../images/Icon-calendar.png" type="image">--%>
                    <asp:TextBox ID="txtDateFrom" runat="server" placeholder="From Date" ClientIDMode="Static" Style="width: 88%;" ReadOnly="true" ToolTip="From date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateFrom" runat="server" ImageUrl="~/images/Icon-calendar.png" ToolTip="From date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight" OnClientDateSelectionChanged="checkDate"
                        PopupButtonID="btnDateFrom" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender3" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight" />
                </div>
                <div class="input-section">
                    <%--  <input readonly="readonly" id="txtDateTo" title="To date" placeholder="To Date" style="width: 90%;" type="text">
                    <input id="ContentPlaceHolder1_rightpanel_btnDateTo" title="To date" class="icon-cal" src="../images/Icon-calendar.png" type="image">--%>
                    <asp:TextBox ID="txtDateTo" runat="server" placeholder="To Date" ClientIDMode="Static" Style="width: 88%;" ReadOnly="true" ToolTip="To date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateTo" runat="server" ImageUrl="~/images/Icon-calendar.png" ToolTip="To date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight" OnClientDateSelectionChanged="checkDate"
                        PopupButtonID="btnDateTo" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender4" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight" />
                </div>
                <div class="input-section">
                    <asp:DropDownList ID="ddlSegmentType" runat="server" ClientIDMode="Static" style="width: 89.6%;">
                    </asp:DropDownList>
                    <%--<select name="ctl00$ctl00$ContentPlaceHolder1$rightpanel$ddlCity" id="ddlCity" title="Location">
                        <option selected="selected" value="">--Location--</option>
                        <option value="1" style="background-color: #E6E6E6; padding-left: 0px; font-weight: bold;" key="CityName">Chino Hills</option>
                        <option value="91709" style="background-color: white; padding-left: 20px !important" key="Zipcode" cityid="1" cityname="Chino Hills">91709</option>
                        <option value="6576" style="background-color: #E6E6E6; padding-left: 0px; font-weight: bold;" key="CityName">Davidson</option>
                        <option value="37214" style="background-color: white; padding-left: 20px !important" key="Zipcode" cityid="6576" cityname="Davidson">37214</option>
                        <option value="37216" style="background-color: white; padding-left: 20px !important" key="Zipcode" cityid="6576" cityname="Davidson">37216</option>
                    </select>--%>
                </div>
                <div class="input-section">
                    <asp:DropDownList ID="ddlServiceType" runat="server" ClientIDMode="Static">
                    </asp:DropDownList>
                    <%--<select id="ddlAccountType" title="Account Type">
                        <option selected="selected" value="">Account Type</option>
                        <option value="1">Residential</option>
                        <option value="2">C&amp;I</option>
                    </select>--%>
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
                            <div class="average_usage_header">
                                <asp:Label ID="lblActive" ClientIDMode="Static" Text="0" runat="server"></asp:Label>
                            </div>
                            <i>Active</i>
                        </li>

                        <li>
                            <div class="average_usage_header">
                                <asp:Label ID="lblInactive" ClientIDMode="Static" Text="0" runat="server"></asp:Label>
                            </div>
                            <i>InActive</i>
                        </li>
                        <li>
                            <div class="average_usage_header">
                                <asp:Label ID="lblTotal" ClientIDMode="Static" Text="0" runat="server"></asp:Label>
                            </div>
                            <i>TOTAL</i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="add_seg_details">
        <div id="nodata_div" style="width: 100%; text-align: center; color: Red; display: none;">No Attribute Data available</div>
        <div id="graphDiv" class="Graph-area" style="width: 100% !important; margin:0px auto !important; float: none; display: block;">
            <div style="text-align: center; float: left; width: 100%;">
                <div id="jqxgrid" class="jqgrid"></div>
            </div>
        </div>
    </div>
</asp:Content>
