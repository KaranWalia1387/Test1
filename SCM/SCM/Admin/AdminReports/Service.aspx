<%@ Page Title="Services Report" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="Service.aspx.cs" Inherits="AdminPanel.AdminReports.Service" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>


<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
     <script type="text/javascript">
         $("document").ready(function () {
             $("#chartDiv").addClass("HEight");
         });
         $(document).ready(function () {
             /* remove the 'title' attribute of all <img /> tags */
             $("img").removeAttr("title");
         });
    </script>
      <style type="text/css">
                  .ajax__calendar_container {
width:190px !important;
}
          .HEight {
            height: 355px !important;
          }
      
         .content {
            background-color: rgb(203, 203, 203) !important;
        }

        .expand-one {
            /*cursor: pointer;*/
            background-color: rgb(236, 236, 236);
        }

        .imgtoggle {
            padding-left: 10px;
            padding-right: 5px;
        }

         .filterdrop {
          padding-left: 5px;
          cursor: pointer;
          display: block;
      } 
        
 .filter-section {
    float: left;
    margin: 0px 0 11px 12px;
    padding: 0;
}

.input_section_box {
    width: 100%;
}

.input-section {
    float: left;
    margin: 0 5px 0 0;
    width: 114px;
}

        @media screen and (min-width: 768px) and (max-width:1024px) {
    .input-section {
              width: 106px !important;
          }
}

.filter-section input[type="text"], input[type="number"], input[type="password"] {
    background: #fff;
    border: 1px solid #999999;
    color: #616161;
    font-size: 76.3%;
    margin-bottom: 10px;
    margin-top: 4px;
    padding: 0 4px;
    width: 99%;
            line-height: 19px;
            padding: 2px 4px;
            height: 19px;
     line-height: 13px;
}

.filter-section select {
    background: #fff;
    border: 1px solid #999999;
    color: #616161;
    font-size: 76.3%;
    margin-bottom: 10px;
    margin-top: 4px;
    padding: 0 2px;
    line-height: 16px;
   width: 99%;
    height: 19px;
     line-height: 13px;
}

.filter-section .icon-cal {
    float: left;
    margin: 4px 0px 0px 1px;
}

.filter-section .icon-filter {
    float: left;
    margin: 4px 0px 0px 7px;
}

 .top-header-area, .top-header-area h2 {
            padding-bottom: 2px !important;
            border-bottom: 0px !important;
}

 .outage_graph_img {
    top: -9.5% !important;
 }

        .sizer.content {
            background: #f7f7f7;
            padding: 0 !important;
        }

        .close {
            opacity: 1 !important;
        }

        .popup_left_content_area_home {
            float: left;
            padding-right: 1%;
            width: 35% !important;
            padding-bottom: 2%;
        }
    </style>
    <uc1:jqxGrid runat="server" />
    
    </asp:ScriptManager>
    <input type="hidden" class="activeli_list" value="sidebar_service" />
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
     <div class="top-header-area">
        <div style="float: left; width: 85%;">
        <h2>Services</h2>
      </div>
    </div>

    <div class="filter-section" id="divFilter" style="width: 97%; padding-bottom: 0%; margin-left: 1.4%">
             <div class="expand-one">
            <p class="filter_section_link">
                <img class="imgtoggle" src="..\images\ArrowsMinus.png" />Filter</p>
            <div class="content" style="height: 45px; padding-top: 7px; padding-left: 12px;">
            <div class="input-section">
                    <asp:TextBox ID="txtDateFrom" runat="server" placeholder="From Date" ClientIDMode="Static" Style="width: 80%;" ReadOnly="true" ToolTip="From date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateFrom" runat="server" ImageUrl="~/images/icon-cal.png" ToolTip="From date" />
                <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                    PopupButtonID="btnDateFrom" OnClientDateSelectionChanged="checkDate" />
                  <ajaxToolkit:CalendarExtender ID="CalendarExtender3" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                     OnClientDateSelectionChanged="checkDate" />
            </div>
            <div class="input-section">
                    <asp:TextBox ID="txtDateTo" runat="server" placeholder="To Date" ClientIDMode="Static" Style="width: 80%;" ReadOnly="true" ToolTip="To date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateTo" runat="server" ImageUrl="~/images/icon-cal.png" ToolTip="To date" />
                <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                    PopupButtonID="btnDateTo" OnClientDateSelectionChanged="checkDate" />
                 <ajaxToolkit:CalendarExtender ID="CalendarExtender4" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                   OnClientDateSelectionChanged="checkDate" />
            </div>
            <div class="input-section">
                <asp:DropDownList ID="ddlCity" runat="server" ClientIDMode="Static" ToolTip="Location"></asp:DropDownList>
            </div>
         
            <div class="input-section">
                <select id="ddlAccountType" title="Account Type">
                    <option value="">Account Type</option>
                    <option value="1">Residential</option>
                    <option value="2">C&I</option>
                </select>
            </div>
            <div class="input-section">
                <asp:DropDownList ID="ddlReason" runat="server" ToolTip="Reason" ClientIDMode="Static">
                </asp:DropDownList>
            </div>
            <div class="input-section" style="width: auto  !important;">
                <%--<input id="btnFilter" type="button" value="Filter" class="submitBtn" style="margin:0px;"  />--%>
                 <asp:Button ID="btnFilter" ToolTip="Search" CssClass="filterBtn" style="margin:0px;" runat="server" ClientIDMode="Static" OnClientClick="return false;"/>
            </div>
        </div>
                 </div>
           </div>
    <div class="active-sprite" style="width: 97%; margin-left: 1.4%; margin-bottom: 1%; margin-top: -1.3%; border-top: 1px solid rgb(203, 203, 203);">
        <div class="left-active-sprite" style="width: 20%; padding-left: 0px;">
           <a href="#">
                <i id="gridView" class="activeGrid" onclick="javaScript:chartgraphsection(1)" <%--title="Chart View"--%>> </i></a>
            <a href="#">
                <i id="pieGraph" class="pie" onclick="javaScript:chartgraphsection(2)" <%--title="Graph View"--%>> </i></a>
        </div>
        <div class="right-active-sprite" style="width: 70%; height: 20px;">
            <asp:ImageButton runat="server" ID="btnExcelExport" ImageUrl="~/images/Excel-icon.png" ToolTip="Export to Excel" ClientIDMode="Static" OnClientClick="return false" />
            <a href="#">
                <asp:ImageButton runat="server" ID="btnExportPdf" ImageUrl="~/images/pdf-icon.png"
                    ToolTip="Export to Pdf" OnClick="imgExportPDF_Click" />
            </a>
        </div>
    </div>
    <div class="grid-section" style="padding-top: 0px; width: 99.5%">
        <div id="graphDiv" class="Graph-area">
            <div class="grid_main_box">
                <div id="jqxgrid" class="jqgrid">
                </div>
                <div id="jqxchildgrid" style="display: none;" class="jqgrid">
                </div>
            </div>
        </div>
        <div id="nodata_div" style="width: 100%; text-align: center" visible="false"></div>
        <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 100%;">
            <div class="grid_main_box">
                <div id="ServiceTitle"></div>
                <uc1:ChartControl runat="server" ID="ChartControl" />
                <div id="div-Servicechart" visible="true" style="width: 100%; height: 300px;">
                </div>

                <div id="nodata_div1" style="width: 100%; text-align: center" visible="false"></div>
            </div>
        </div>
    </div>

    <div class="modal fade userDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog popup_area">
            <div class="modal-content" style="width: 75%">
                <div class="modal-header">
                    <button type="button" id="btnClose" data-dismiss="modal">
                        <img src="../images/popup_close.png" title="Close" /></button>
                    <h4 class="modal-title" id="H1">Services Details</h4>
                </div>
                <div class="modal-body">
                    <div class="popup_area_home">
                        <div style="clear: both;"></div>
                        <div id="Div1" class="innerDiv">
                            <div class="popup_left_content_area_home">
                                Reason :
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblReason"></label>
                            </div>
                            <div style="clear: both;"></div>

                            <div class="popup_left_content_area_home">
                                Notification Date :
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblNotificationDate"></label>
                            </div>
                            <div style="clear: both;"></div>
                            
                            <div class="popup_left_content_area_home">
                                Notification Body:
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblNotificationBody"></label>
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                    <div class="bottom_area_home">
                        <input id="clear" type="button" class="cancel submitBtn" value="Close" data-dismiss="modal" style="margin-left: 40%;" />

                    </div>
                    <div style="clear: both;"></div>
                </div>
            </div>
        </div>
    </div>
    <script src="../js/service-report.js"></script>
    
</asp:Content>
