<%@ Page Title="Outage Report" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="Outage.aspx.cs" Inherits="AdminPanel.AdminReports.Outage" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>


<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
   
    <link rel="stylesheet" href="//js.arcgis.com/3.11/esri/css/esri.css">
          <script src="//js.arcgis.com/3.11/"></script>    
 
        <script src="../js/outage-report.js"></script>
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
            .map1 {
    background: rgba(0, 0, 0, 0) url("../images/map-oc.png") no-repeat scroll 0 0;
}


.activeMap {
    background: rgba(0, 0, 0, 0) url("../images/map-oc-active.png") no-repeat scroll 0 0;
}


            .grid_main_box {
    margin-left: 0px;
    margin-top: 0px;
    text-align: center;
}

            .filterdrop {
          padding-left: 5px;
          cursor: pointer;
          display: block;
      }
             
              .filterdropzip {
          padding-left: 5px;
          cursor: pointer;
          display: block;
      }
           .esriPopup .titlePane
           {
               background-color: #444444;
               border-radius: 5px 5px 0 0;
               color: #ffffff;
               cursor: default;
               height: 24px;
               line-height: 20px;
               padding-left: 6px;
           }

          .titlePane .title
          {
              width: auto;
          }

          .sizer.content
          {
              background: #f7f7f7;
              padding: 0 !important;
          }

          .close {
              opacity: 1 !important;
          }
             .expand-one {
    /*cursor: pointer;*/
          background-color: rgb(236, 236, 236);
}
     .imgtoggle {
         padding-left: 10px;
         padding-right: 5px;
     }

    .input_section_box {
    width: 100%;
}

 .input-section {
            float: left;
            margin: 0 5px 0 0;
            width: 120px;
        }

    @media screen and (min-width: 768px) and (max-width:1024px) {


            .time_date_input {
                width: 78% !important;
            }
        }


.outage_graph_img {
    left:111px !important;

}

.top-header-area, .top-header-area h2 {
    padding-bottom:2px !important;
    border-bottom:0px !important;
}

.left-active-sprite a #mapimg, .left-active-sprite a #mapView {
    margin-top: -1px;
    height: 24px
}

.inner-right-section .right-content-area {
    overflow:hidden;
}

.outage_right_chart_box {
      margin-top: -1.4%;
}

#outage_map_canvas, #outage_map_canvas svg {
    
}
             #page_loader {
            background-image: url('../images/ajax-loader.gif');
            background-repeat: no-repeat;
            background-position: center;
            width: 100%;
            height: 100%;
            background-color: white;
            opacity: .7;
            display: none;
            position: absolute;
            top: 0px;
            z-index: 99999999;
        }
/* 19-10-2015 */


      </style>
    <script src="../js/outagemap.js" type="text/javascript"></script>
    <input type="hidden" class="activeli_list" value="sidebar_outage" />
    <uc1:jqxGrid runat="server" />
    
    </asp:ScriptManager>
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <div class="top-header-area">
        <div style="float: left; width: 35%;">
            <h2>Outages</h2>
        </div>
        <div class="filter_area_ui">
           
             <div class="right_header_area">
                <ul>
                    <li><a href="#" data-toggle="modal" data-target="#export_docs_pop" title="Export"><span class="fa fa-external-link icon_color"></span> Export</a></li>                                     
                    <li><a href="#"  id="filter_btn_explorer" title="Filter Results"><span class="fa fa-filter icon_color"></span>   Filter Results</a></li>
                </ul>
            </div>
           
        </div>
    </div>
    <div class="filter-section" id="divFilter" style="display: none; width: 100%; padding-bottom: 0%; margin-left: 0%; margin-bottom: 0px;">
        <div class="expand-one">
            <p class="filter_section_link" style="display: none;">
                <img class="imgtoggle" src="..\images\ArrowsMinus.png" />Filter
            </p>
            <div class="content">
                <div class="input-section">
                    <asp:TextBox ID="txtDateFrom" runat="server" placeholder="From Date" ClientIDMode="Static" Style="width: 90%;" ReadOnly="true" ToolTip="From date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateFrom" runat="server" ImageUrl="~/images/Icon-calendar.png" ToolTip="From date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                        PopupButtonID="btnDateFrom" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender3" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight" />
                </div>
                <div class="input-section">
                    <asp:TextBox ID="txtDateTo" runat="server" placeholder="To Date" ClientIDMode="Static" Style="width: 90%;" ReadOnly="true" ToolTip="To date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateTo" runat="server" ImageUrl="~/images/Icon-calendar.png" ToolTip="To date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                        PopupButtonID="btnDateTo" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender4" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight" />
                </div>
                <div class="input-section">
                    <asp:DropDownList ID="ddlCity" runat="server" ClientIDMode="Static" ToolTip="Location"></asp:DropDownList>
                </div>
              
                <div class="input-section">
                    <select id="ddlOutageType" title="Outage Type">
                        <option value="">--Outage Type--</option>
                        <option value="0">Current</option>
                        <option value="1">Planned</option>
                    </select>
                </div>
                <div class="input-section" style="width: auto  !important;float:right; margin:5px 20px;">
                    <asp:Button ID="btnFilter" ToolTip="Search" CssClass="filterBtn" runat="server" text="Filter Result" ClientIDMode="Static" OnClientClick="return false;" Style="margin: 0px;" />
                </div>
            </div>
        </div>
    </div>

    <div style="display: block;" class="current_area" id="GenDiv">
        <ul>
            <li>
                <div class="average_usage_header">                   
                    <asp:Label ID="lblplanned" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>
             
                </div>
                <i id="demandusagetext">PLANNED OUTAGES</i>
            </li>
            <li>
                <div class="average_usage_header">
                     <asp:Label ID="lblunplanned" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>
              
                        </div>
                <i id="unplannedtext">CURRENT OUTAGES</i>
            </li>

            <li>
                <div class="average_usage_header">
                     <asp:Label ID="lbltotal" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>
                  </div>
                <i id="totaltext">TOTAL OUTAGES</i>
            </li>
        </ul>
    </div>

    

    <div class="calender_seciton_1">
        <div class="power_graph_heading power_graph_spanish">
            <div class="usage_date_time">
                <b><asp:Label ID="lblBefore" runat="server" Visible="true" ClientIDMode="Static"></asp:Label> - 
                    <asp:Label ID="lblCurrent" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>
               </b>
              
            </div>
            <div class="right_unit_box"  id="lgndrght" style="padding-top: 13px;right: 0px;">
                <div class="low_usage_box outage_map_info">
                    <p>
                       <img src="../images/planned_outage_active.png" class="hide_flat_ico" style="float:left;    margin: -1px 5px 0 12px;" /> <%-- <span class="mapLegend_1"></span>--%>
                        <span class="flat_ico_css icon-admin-planned_outage"> </span>
                        <span class="GraphLegend_data_low" style="margin-right:0;    margin-left: 0px;" >Planned Outages</span>
                         <img src="../images/current_outage_active.png" style="float:left;    margin: -1px 5px 0 12px;" class="hide_flat_ico" /> <%-- <span class="mapLegend_2"></span>--%>
                        <span class="flat_ico_css icon-admin-unplanned_outage"> </span>
                        <span class="GraphLegend_data_low"  style="float:left;margin-right:0;    margin-left: 0px;" >Current Outages</span>
                    </p>
                </div>
            </div>
            <div class="lgnd_box_right">
            <div class="left-active-sprite ">
            <a href="#">
                <i id="gridView" class="activeGrid" onclick="javaScript:chartgraphsection(1)" <%--alt="Chart View"--%>></i></a>          
            <a href="#">
                <i onclick="javaScript:chartgraphsection(3)" id="mapView" class="map1" <%--alt="Map View"--%>></i></a>
                </div>
        </div>
        </div>
    </div>
    <div class="grid-section" style="padding:0px; width: 100%; overflow-x:hidden;">
        <div id="nodata_div" style="width: 100%; text-align: center; color: red; display: none">No data</div>
        <div style="display: block;" id="mapDiv">    
                <div id="outage_map_canvas" class="radius map_canvas" style="height: 99.8% !important; width: 100%""></div>
          </div>
        <div style="display: none;" id="graphDiv" class="Graph-area">            
            <div class="grid_main_box">
                    <div id="jqxgrid" class="jqgrid">
                    </div>
                    <div id="jqxchildgrid" style="display: none;" class="jqgrid">
                    </div>

                </div>
        </div>
    </div>


      <div id="page_loader2" style="display: none">
        Loading....
    </div>

    <div id="page_loader">
    </div>
   

    <div class="modal fade popheading" id="export_docs_pop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Export Options</h4>
                </div>
                <div class="modal-body">
                    <div class="pdf_box_wrapper">
                        <b>Please select file type(s) to export</b>
                        <ul>
                            <li><a href="#" id="pdfGen" class="pdf_icon"  runat="server" onserverclick="pdfGen_ServerClick">Pdf(.pdf)</a></li>
                            <li><a href="#" id="btnExcelExport" class="excel_icon" runat="server"  onserverclick="btnExcelExport_ServerClick">Excel(.xls)</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>

</asp:Content>


