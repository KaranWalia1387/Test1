<%@ Page Title="Usage Report" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="Usage.aspx.cs" Inherits="AdminPanel.AdminReports.Usage" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit.HTMLEditor" TagPrefix="cc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
     <script type="text/javascript">

         function HideNotification(ModeID) {
             //if (mode == 2) {
                 if (ModeID == '1')
                     document.getElementById('btnSend').style.visibility = 'visible';
                 else if (ModeID == '2') {
                     document.getElementById('btnSend').style.visibility = 'hidden';
                 }
            // }
         }

         $("document").ready(function () {
             $("#chartDiv").addClass("HEight");
             
             <%--START NEW UI 10/1/2015--%>

             $("#ddlCity").change(function (i, obj) {
                 if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
                     var ddlCity = $('#ddlCity option:selected');
                     $('#hdnCity').val($(ddlCity).val());
                 }
             });
              <%--End NEW UI 10/1/2015--%>
         });
         $(document).ready(function () {
             /* remove the 'title' attribute of all <img /> tags */
             $("img").removeAttr("title");
         });

        
    </script>
      <style type="text/css">
        
     .jqx-grid-column-header div span
        {
            height: 40px;     
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

.emailCC{
    margin-left: 30% !important;
}
.emailCC1{
    margin-left: 2% !important;
}

.emailSend {
    background: #606060;
    border: none;
    color: #f0f0f0;
    cursor: pointer;
    font-size: 14px;
    height: 30px;
    margin: 3px 5px 5px 5px;
    padding: 5px 5px;
    text-align: center;
    border-radius: 5px;
}

.PopUpTitleBg {
    background: #999999;
    padding: 7px 10px 29px;
    color: #fff;
    line-height: 22px;
}

.Text-outbox-area select {
    width:93%;
    padding: 2px 0;
}

#PopupAddTopic {
    left:0px !important;
}


.user-outbox-area {
    width:40%;
}

.Text-outbox-area {
    width:59%;
}


</style>
    <uc1:jqxGrid runat="server" />
     <input type="hidden" class="activeli_list" value="sidebar_usage"/>
    
    </asp:ScriptManager>
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <div class="top-header-area">
        <div style="float:left;width:85%;">
        <h2>Usage</h2>
    </div>
        </div>
    <div class="filter-section" id="divFilter"  style="width:97%;padding-bottom:0%;margin-left:1.4%">
             <div class="expand-one">
                <p class="filter_section_link" ><img class="imgtoggle" src="..\images\ArrowsMinus.png"/>Filter</p>
                    <div class="content" style="height:45px;padding-top:7px; padding-left: 12px;">
            <div class="input-section">
                <asp:TextBox ID="txtDateFrom" runat="server" placeholder="From Date" ClientIDMode="Static" style="width: 90%;" ReadOnly="true" ToolTip="From date "></asp:TextBox>
                <asp:ImageButton CssClass="icon-cal" ID="btnDateFrom" runat="server" ImageUrl="~/images/icon-cal.png" ToolTip="From date" />
                <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                    PopupButtonID="btnDateFrom" OnClientDateSelectionChanged="checkDate" />
                 <ajaxToolkit:CalendarExtender ID="CalendarExtender3" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                  OnClientDateSelectionChanged="checkDate" />
            </div>
            <div class="input-section">
                <asp:TextBox ID="txtDateTo" runat="server" placeholder="To Date" ClientIDMode="Static" style="width: 90%;" ReadOnly="true" ToolTip="To date"></asp:TextBox>
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
            <div class="input-section" style="width: auto  !important;">
                <asp:Button ID="btnFilter" runat="server" ToolTip="Search" CssClass="filterBtn" style="margin:0px;" ClientIDMode="Static" OnClientClick="return false;"  />
            </div>
        </div>
                 </div>
        </div>
   <div class="active-sprite" style="width:97%; margin-left:1.4%;margin-bottom:1%;margin-top: -1.3%;border-top:1px solid rgb(203, 203, 203) ;">
        <div class="left-active-sprite" style="width:20%;padding-left:0px;">
           <a href="#">
                <i id="gridView" class="activeGrid"  onclick="HideNotification(1);javaScript:chartgraphsection(1)" <%--title="Chart View"--%>> </i></a>
            <a href="#">
                <i id="pieGraph" class="pie"  onclick="HideNotification(2);javaScript:chartgraphsection(2)" <%--title="Graph View"--%>> </i></a>
        </div>
         <div class="right-active-sprite" style="width:70%;height:20px;">
         <a href="#">
            <asp:ImageButton runat="server" ID="btnSend" ImageUrl="~/images/Send-email.png"  ToolTip="Send Notification" ClientIDMode="Static"  OnClientClick="return false" style="padding-right: 3px;"/>
                </a>
            <asp:ImageButton runat="server" ID="btnExcelExport" ImageUrl="~/images/Excel-icon.png"  ToolTip="Export to Excel" ClientIDMode="Static"  OnClientClick="return false"/>
            <a href="#">
                <asp:ImageButton runat="server" ID="btnExportPdf" ImageUrl="~/images/pdf-icon.png"
                    ToolTip="Export to Pdf" OnClick="ibbExportPDF_Click" />
            </a>
        </div>
    </div>
    <div class="grid-section" style="padding-top:0px;width:99.5%">
       <div id="nodata_div" style="width: 100%; text-align: center; color:red;display:none" >No Data</div>
        <div id="graphDiv" class="Graph-area">
            <div class="grid_main_box" >
                <div id="jqxgrid" class="jqgrid">
                </div>
                <div id="jqxchildgrid" style="display: none;" class="jqgrid">
                </div>
                
            </div>
        </div>
        <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width:98%; height: 350.39px;">
            <div class="grid_main_box" style=" float:left; width:100%; margin-top:0px;">
            
                <uc1:ChartControl runat="server" ID="ChartControl" />
                <div id="div-Usagechart" visible="true"  style="width: 100%;height:400px!important" >
               <div id="usagetitle" style=" width:50%;"></div>
                     <div id="div-mainChart"   class="outage_chart" style="width: 60%"></div>
                    <div class="outage_right_chart" style="width: 40%">
                    <div id="div-subChart" class="outage_right_chart_box">
                             <div class="outage_right_chart_top">
                              <div id="subChart1Title" style="text-align:center; background:#ededed; padding:5px; "><b>City Monthly</b></div>
                                     <div id="subChart1-nodata" style="width: 100%; text-align: center; color:red" visible="false">No Data</div>       
                            <div id="div-subChart1" style="width:98%; height:90%;"></div>
                              </div>
                                  <div class="outage_right_chart_bottom">
                                    <div id="subChart2Title" class="outage_chart_heading"><b>Monthly</b></div>
                                  <div id="subChart2-nodata" style="width: 100%; text-align: center; color:red" visible="false">No Data</div>
                                     <div id="div-subChart2" style="width:98%;  height:90%;"></div>
                                </div>
                    </div>
                </div>
                    </div>
                </div>
            </div>
        </div>

     <%--START NEW UI 10/1/2015--%>

    <div id="PopupAddTopic" style="display: none; background-color: White; width: 700px; padding-bottom: 8px; border: 1px solid #008ddd;">
        <asp:HiddenField ID="hdnAccountNos" runat="server" ClientIDMode="Static" />   
         <div class="PopUpTitleBg configure-service-popup" style="margin-bottom: 0px;">
                <div id="popuptitle" class="PopUpTitle">Send Notification</div>
                <img src="../images/popup_close.png" id="ClosePopupAddTopic" title="Close" style="float: right;" alt="Close" />
            </div>

            <div class="clear">
                    &nbsp;
                </div>
            
            <div class="table-responsive" id="outboxmsg">
                    <table>
                        <tr>
                            <td width="50%">
                                <div class="user-outbox-area">
                                    <label>Type of Message : </label>
                                </div>
                                <div class="Text-outbox-area">
                                    <asp:DropDownList ID="ddltypeofmessage" runat="server" mandatory="1" title="Message Type" AutoPostBack="false">
                                    </asp:DropDownList>
                                </div>
                            </td>
                            <td>
                                <div class="user-outbox-area">
                                    <label>Mode Of Message: </label>
                                </div>
                                <div class="Text-outbox-area">
                                    <asp:DropDownList ID="ddlMessageMode" runat="server" title="Mode Of Message" AutoPostBack="false" ClientIDMode="Static">
                                        <asp:ListItem Selected="True" Value="0">Mode Of Message</asp:ListItem>      
                                  <asp:ListItem  Value="1">Email</asp:ListItem>
                                        <asp:ListItem Value="2">Push</asp:ListItem>
                                       <%-- <asp:ListItem Value="3">IVR</asp:ListItem>--%>
                                    </asp:DropDownList>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="user-outbox-area email" style="width: 20%;">
                        <label>Subject : </label>
                    </div>
                    <div class="Text-outbox-area email" style="width:80%;">
                        <asp:TextBox ID="txtmsgsubject" runat="server" Style="width:97%;" CssClass="txtmsgsubject" title="Subject" ClientIDMode="Static"></asp:TextBox>
                    </div>
                    <div class="clear">
                        &nbsp;
                    </div>
                    <div class="message-section" id="MessageBody" style="margin-left:0px;">
                        <div class="LeftFilterPanelHeader" id="msgReply">
                            <div class="email" style="position:relative; width:98%;">
                                <cc1:Editor ID="txtEditor" runat="server" />
                            </div>
                            <div class="clear">
                                &nbsp;
                            </div>
                            <asp:TextBox onkeypress="return CheckLength(event);" onkeydown="return CheckLength(event);" title="Message" ID="txtMessage" Columns="20" Rows="5" Width="99%" runat="server" ClientIDMode="Static" CssClass="texttype hide" TextMode="MultiLine" MaxLength="200" style="width:96%; margin-left:9px;resize:none;"></asp:TextBox>
                            <div class="clear_both"></div>
                            <span style="color: red; margin-left:10px;" class="texttype hide" id="spanTxt"></span>
                            <div class="ReplyBtnContainer email" >
                                <asp:FileUpload ID="fileupd" runat="server" onchange="File_OnChange(this)"  ClientIDMode="Static" style="float:left;"/>
                                <img id="btnRemoveFile" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFile();" />
                                <asp:Label ID="lblMessage" runat="server" Enabled="false"></asp:Label>
                            </div>
                             <div class="clear">
                                &nbsp;
                            </div>
                            <div class="ReplyBtnContainer" style="text-align:center;">
                                <asp:Button ID="btnSubmitReply" runat="server" class="submitBtn" style="margin: 2px 15px 0px 10px;" Text="Send" OnClientClick="return validateconfiguration();" OnClick="btnSubmitReply_Click" />
                                <%--<input id="btnDiscard" type="button" value="Discard" class="closeBtn" />--%>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

    <%--END NEW UI 10/1/2015--%>
    <%--Start Popup To show user detiails--%>
    <div class="modal fade userDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog popup_area">
            <div class="modal-content" style="width:75%">
                <div class="modal-header">
                    <button type="button" id="btnClose" data-dismiss="modal">
                        <img src="../images/popup_close.png" title="Close" /></button>
                    <h4 class="modal-title" id="H1">User Details</h4>
                </div>
                <div class="modal-body">
                    <div class="popup_area_home">
                        <div style="clear: both;"></div>
                        <div id="Div1" class="innerDiv">
                            <div class="popup_left_content_area_home">
                                Customer Name :
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="custName"></label>
                                  </div>

                            <div style="clear: both;"></div>
                             <div class="popup_left_content_area_home">
                                Account Type :
                            </div>
                            <div class="popup_right_content_area_home">
                                 <label id="lblAccountType"></label>
                                </div>
                            <div style="clear: both;"></div>
                              <div class="popup_left_content_area_home">
                                City :
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblCityName"></label>
                                </div>
                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home">
                                ZipCode :
                            </div>
                            <div class="popup_right_content_area_home">
                                 <label id="lblZip"></label>
                                </div>
                            <div style="clear: both;"></div>
                              <div class="popup_left_content_area_home">
                               Usage Date :
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblBillingPeriod"></label>
                                  </div>

                            <div style="clear: both;"></div>
                              <div class="popup_left_content_area_home">
                                Electric Usage :
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblbilAmount"></label>
                                  </div>

                            <div style="clear: both;"></div>
                             <div class="popup_left_content_area_home">
                                Water Usage :
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblPaidAmount"></label>
                                  </div>

                            <div style="clear: both;"></div>
                             <div class="popup_left_content_area_home">
                                Gas Usage:
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblPaidDate"></label>
                                  </div>

                            <div style="clear: both;"></div>
                            
                        </div>
                    </div>
                    <div class="bottom_area_home">
                         <input id="clear" type="button" class="cancel submitBtn"  value="Close" data-dismiss="modal"/>

                    </div>
                       <div style="clear: both;"></div>
                </div>
            </div>
        </div>
    </div>
   
    <script src="../js/usage-report.js"></script>
    <script src="../js/popup.js"></script>
</asp:Content>
