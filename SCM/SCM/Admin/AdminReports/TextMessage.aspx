<%@ Page Title="Text Message Report" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="TextMessage.aspx.cs" Inherits="AdminPanel.AdminReports.TextMessage" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>
<%@ Register Src="~/Configuration/UserControl/usernameautocomplete.ascx" TagPrefix="uc1" TagName="usernameautocomplete" %>



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

        .imgtoggle {
            padding-left: 10px;
            padding-right: 5px;
        }

        .filter-section {
    float: left;
    margin: 0px 0 4px 12px;
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

@media screen and (min-width: 768px) and (max-width:1024px)  {
    .input-section {
              width: 106px !important;
          }
}

 .filterdrop {
            padding-left: 5px;
            cursor: pointer;
            display: block;
        }

   .outage_graph_img {
     top: -9.5% !important;
 }
    </style>
    <uc1:jqxGrid runat="server" ID="jqxGrid" />
     <input type="hidden" class="activeli_list" value="sidebar_textmessage"/>
    
    </asp:ScriptManager>
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <div class="top-header-area">
          <div style="float:left;width:35%;">
        <h2>Text Message</h2>
              </div>

            <div class="filter_area_ui">
                <div class="selection_area select-style">
                    <asp:DropDownList ID="usagetype" runat="server" ClientIDMode="Static">
                        <asp:ListItem Selected="True" Text="POWER" Value="power">POWER</asp:ListItem>
                        <asp:ListItem Text="WATER" Value="water">WATER</asp:ListItem>
                        <asp:ListItem Text="GAS" Value="gas">GAS</asp:ListItem>
                    </asp:DropDownList>
                    
                </div>
                <div class="exprt-filtr">
                    <div class="export_button_area">
                        <div class="export_button" data-toggle="modal" data-target="#export_docs_pop"></div>
                    </div>
                    <div class="fliter_button_area">
                        <div class="filter_button" id="filter_btn_explorer"></div>
                    </div>
                </div>
            </div>
        </div>
    <div class="filter-section" id="divFilter"  style="display:none;">
             <div class="expand-one">
               <p class="filter_section_link" style="display: none;">
                    <img class="imgtoggle" src="Usage%20Report_files/a.png">Filter
                </p>
                    <div class="content">
            <div class="input-section" >
                <asp:TextBox ID="txtDateFrom" runat="server" placeholder="Date From" ClientIDMode="Static" style="width: 90%;" ReadOnly="true" ToolTip="From date"></asp:TextBox>
              <asp:ImageButton CssClass="icon-cal" ID="ImageButton1" runat="server" ImageUrl="~/images/icon-calendar.png"  ToolTip="From date"/>
                <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                    PopupButtonID="ImageButton1" OnClientDateSelectionChanged="checkDate"/>
                  <ajaxToolkit:CalendarExtender ID="CalendarExtender3" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                     OnClientDateSelectionChanged="checkDate"/>
            </div>
             <div class="input-section" >
                <asp:TextBox ID="txtDateTo" runat="server" placeholder="Date To" ClientIDMode="Static" style="width: 90%;" ReadOnly="true" ToolTip="To date"></asp:TextBox>
              <asp:ImageButton CssClass="icon-cal" ID="ImageButton2" runat="server" ImageUrl="~/images/icon-calendar.png" ToolTip="To date"/>
                <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                    PopupButtonID="ImageButton2" OnClientDateSelectionChanged="checkDate" />
                   <ajaxToolkit:CalendarExtender ID="CalendarExtender4" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                    OnClientDateSelectionChanged="checkDate" />
            </div>
            <div class="input-section">
                <asp:DropDownList ID="ddlCity" runat="server" ClientIDMode="Static" ToolTip="Location"></asp:DropDownList>
            </div>
            <div class="input-section">
                        <select id="ddlAccountType" title="Account Type">
                            <option selected="selected" value="">Account Type</option>
                            <option value="1">Residential</option>
                            <option value="2">C&amp;I</option>
                        </select>
                    </div>
            <div class="input-section" style="width: auto  !important; float: right; margin: 5px 20px;">
                  <input name="ctl00$ctl00$ContentPlaceHolder1$rightpanel$btnFilter" value="Filter Results" onclick="return false;" id="btnFilter" title="Search" class="filterBtn" style="margin: 0px;" type="submit">
              </div>
        </div>
                 </div>
             </div>

   <!-- <div class="active-sprite" style="width:97%; margin-left:1.4%;margin-bottom:1%;margin-top: -0.6%;border-top:1px solid rgb(203, 203, 203) ;">
        <div class="left-active-sprite" style="width:20%;padding-left:0px;">
            <a href="#">
                <i id="gridView" class="activeGrid"  onclick="javaScript:chartgraphsection(1)" <%--title="Chart View"--%>> </i></a>
            <a href="#">
                <i id="pieGraph" class="pie"  onclick="javaScript:chartgraphsection(2)" <%--title="Graph View"--%>> </i></a>
        </div>
         <div class="right-active-sprite" style="width:70%;height:20px;">
             <asp:ImageButton runat="server" ID="btnExcelExport" ImageUrl="~/images/Excel-icon.png"  ToolTip="Export to Excel" ClientIDMode="Static"  OnClientClick="return false"/>
            <a href="#">
                <asp:ImageButton runat="server" ID="btnExportPdf" ImageUrl="~/images/pdf-icon.png"
                    ToolTip="Export to Pdf" OnClick="ibbExportPDF_Click" />
            </a>
        </div>
    </div>
    -->
    <div class="grid-section" style="padding-top: 0px;width: 100%">
        <div id="graphDiv" class="Graph-area">
            <div class="grid_main_box">
                <div id="jqxgrid" class="jqgrid">
                </div>
                <div id="jqxchildgrid" style="display: none;" class="jqgrid">
                </div>
            </div>
        </div>
         <div id="nodata_div" style="width: 100%; text-align: center; color: Red;display: none;" visible="false">No Data</div>
        <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 100%;">
            <div class="grid_main_box">
              
                <uc1:ChartControl runat="server" ID="ChartControl" />
                  <div id="usagetitle" style="font-weight:  bold;"></div>
                <div id="div-TextMessagechart" visible="true"  style="width:100%; height:300px;">
                </div>
            </div>
            <div id="nodata_div1" style="width: 100%; text-align: center; vertical-align:top;" visible="false">No Data</div>
        </div>
    </div>


    
    <script src="../js/textmessage-report.js"></script>
  
    <input type="hidden" class="city" value="" />
    <input type="hidden" class="zipcode" value="" />

</asp:Content>
