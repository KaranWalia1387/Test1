<%@ Page Title="Push Notification Report" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="PushNotification.aspx.cs" Inherits="AdminPanel.AdminReports.PushNotification" %>

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
          .HEight {
              height:355px !important;
          }
        .content {
            background-color: rgb(203, 203, 203) !important;
        }

        .expand-one {
            cursor: pointer;
            background-color: rgb(236, 236, 236);
        }

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

.filter-section input[type="text"], input[type="number"], input[type="password"] {
    background: #fff;
    border: 1px solid #999999;
    color: #616161;
    font-size: 76.3%;
    margin-bottom: 10px;
    margin-top: 4px;
    padding: 0 4px;
    width: 99%;
    line-height:19px;
    padding: 2px 4px ;
	height:19px;
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
    padding-bottom:2px !important;
    border-bottom:0px !important;
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
     <input type="hidden" class="activeli_list" value="sidebar_PushNotification"/>
    
    </asp:ScriptManager>
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <div class="top-header-area">
          <div style="float:left;width:85%;">
        <h2>Push Notification Report</h2>
              </div>
        </div>

    <div class="filter-section" id="divFilter"  style="width:97%;padding-bottom:0%;">
             <div class="expand-one">
               <p class="filter_section_link" > <img class="imgtoggle" src="..\images\ArrowsMinus.png"/>Filter</p>
                    <div class="content" >
            <div class="input-section" style="width:20%;"" >
                <asp:TextBox ID="txtDateFrom" runat="server" placeholder="Date From" ClientIDMode="Static" style="width: 80%;" ReadOnly="true" ToolTip="From date"></asp:TextBox>
              <asp:ImageButton CssClass="icon-cal" ID="ImageButton1" runat="server" ImageUrl="~/images/icon-cal.png"  ToolTip="From date"/>
                <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                    PopupButtonID="ImageButton1" OnClientDateSelectionChanged="checkDate"/>
                  <ajaxToolkit:CalendarExtender ID="CalendarExtender3" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                     OnClientDateSelectionChanged="checkDate"/>
            </div>
             <div class="input-section" style="width:20%;" >
                <asp:TextBox ID="txtDateTo" runat="server" placeholder="Date To" ClientIDMode="Static" style="width: 80%;" ReadOnly="true" ToolTip="To date"></asp:TextBox>
              <asp:ImageButton CssClass="icon-cal" ID="ImageButton2" runat="server" ImageUrl="~/images/icon-cal.png" ToolTip="To date"/>
                <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                    PopupButtonID="ImageButton2" OnClientDateSelectionChanged="checkDate" />
                   <ajaxToolkit:CalendarExtender ID="CalendarExtender4" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                    OnClientDateSelectionChanged="checkDate" />
            </div>
            <div class="input-section" style="width:20%;">
                <asp:DropDownList ID="ddlCity" runat="server" ClientIDMode="Static" ToolTip="Location"></asp:DropDownList>
            </div>
            <div class="input-section" style="width:20%;">
                <asp:DropDownList ID="ddlMessageStatus" runat="server" ClientIDMode="Static" ToolTip="Status">
                    <asp:ListItem Text="--Status--" />
                    <asp:ListItem Value ="0" Text="Pending"/>
                    <asp:ListItem Value ="1" Text="Success"/>
                    <asp:ListItem Value ="2" Text="Failure"/>
                </asp:DropDownList>
            </div>
                        <div class="input-section" style="width: auto  !important;float:right;" >
           <asp:Button ID="btnFilter" ToolTip="Search" CssClass="filterBtn" runat="server" ClientIDMode="Static" Style="margin: 0px;" text="Filter Results" OnClientClick="return false;" />
         <%--<input name="ctl00$ctl00$ContentPlaceHolder1$rightpanel$btnFilter" value="Filter Results" onclick="return false;" id="btnFilter" title="Search" class="filterBtn" style="margin:0px;" type="submit">--%>
            </div>
        </div>
                 </div>
             </div>

    <div class="active-sprite" style="width:97%; margin-bottom:1%;margin-top: -0.6%;border-top:1px solid rgb(203, 203, 203) ;">
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

    <div class="grid-section" style="padding-top: 0px;width: 99.5%">
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


    
    <script src="../js/PushNotification-report.js"></script>
  
    <input type="hidden" class="city" value="" />
    <input type="hidden" class="zipcode" value="" />

</asp:Content>
