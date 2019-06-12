<%@ Page Title="CRM Template" Language="C#" MasterPageFile="~/CRM/CRM.master" AutoEventWireup="true" CodeBehind="crm-template.aspx.cs" Inherits="AdminPanel.CRM.crm_template" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../js/blockScreen.js"></script>
    <script src="../js/bootstrap-tabs.js"></script>
    <link href="../css/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="../js/w2ui-1.4.2.min.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxscrollbar.js"></script>
    <script src="../js/crm-template.js"></script>
    
    <script>
        $(document).ready(function () {
            $("ul.tabs li.templates").addClass("active");
            $('#filter_btn_explorer').click(function () {
                $(this).toggleClass('active');
                $('#divFilter').slideToggle();
            });
        });
    </script>
    <style>
        span.Gridimage {
            display: block;
            padding-top: 7px;
            color: gray;
        }

        img.Gridimage.Gridimage2 {
            width: 21px;
            position: relative;
            top: -15px;
            padding-top: 28px;
            padding-left: 5px;
        }




        #jqxgrid span.active {
            color: #94d60a;
            background: none !important;
            text-align: left;
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
                color: #666;
            }

        .add_btn a {
            color: #758386 !important;
        }
         .right-content-area .active_new {
            display:block;
             margin: 2px auto 0;
        }
    </style>
    <uc1:jqxGrid runat="server" />
    
    
    <div class="top-header-area">
        <h2>Template</h2>
           <div class="right_header_area">
                <ul>                     
                    
                      <li><a href="#" id="filter_btn_explorer"><span class="fa fa-filter icon_color"></span>   Filter Results</a></li>
                 <li><a href="crm-add-template.aspx"><span class="fa fa-plus-circle icon_color"></span> Add Template</a></li>

                </ul>

    </div>
        <!--<div class="exprt-filtr">
            <div class="fliter_button_area">
                <div class="filter_button" id="filter_btn_explorer"><span>Filter Results</span> </div>
            </div>
            <div class="add_btn">
                <a href="crm-add-template.aspx">
                     <i class="fa fa-plus-circle plush_circle12"></i>
                   <%-- <img src="../images/add_seg_icon.png" />--%>
                 Add Template
                </a>
            </div>

        </div>-->
    </div>

    <div class="filter-section" id="divFilter" style="display: none;">
        <div class="expand-one">
            <p class="filter_section_link" style="display: none;">
                <img class="imgtoggle" src="Usage%20Report_files/a.png">Filter
            </p>
            <div class="content">
                <div class="input-section">
                    <asp:TextBox ID="txtDateFrom" runat="server" placeholder="From Date" ClientIDMode="Static" Style="width: 90%;" ReadOnly="true" ToolTip="From date "></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateFrom" runat="server" ImageUrl="~/images/Icon-calendar.png" ToolTip="From date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" OnClientDateSelectionChanged="checkDate" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                        PopupButtonID="btnDateFrom" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender3" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight" />
                </div>
                <div class="input-section">
                    <asp:TextBox ID="txtDateTo" runat="server" placeholder="To Date" ClientIDMode="Static" Style="width: 90%;" ReadOnly="true" ToolTip="To date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateTo" runat="server" ImageUrl="~/images/Icon-calendar.png" ToolTip="To date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server" OnClientDateSelectionChanged="checkDate" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                        PopupButtonID="btnDateTo" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender4" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight" />
                </div>
                <div class="input-section">
                    <select id="ddlStatus" title="Account Type" style="width: 89.6%;">
                        <option selected="selected" value="-1">Status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                </div>
                <div class="input-section">
                    <select id="ddlModeType" title="Account Type">
                        <option selected="selected" value="-1">Mode</option>
                        <option value="1">Email</option>
                        <option value="2">Text</option>
                        <option value="3">Push</option>
                        <option value="4">IVR</option>
                    </select>
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
                                <span id="active_count"></span>

                            </div>
                            <i id="demandusagetext">ACTIVE</i>
                        </li>
                        <li>
                            <div class="average_usage_header"><span id="inactive_count"></span></div>
                            <i>INACTIVE</i>
                        </li>

                        <li>
                            <div class="average_usage_header"><span id="total_count"></span></div>
                            <i>TOTAL</i>
                        </li>
                    </ul>
                </div>
            </div>


        </div>
        <div class="clearfix"></div>

        <div class="add_row_action" style="display: none;">

            <a href="#" class="action_btn" id="allactive" style="width: 75px; display: none">ACTIVATE ALL</a>
            <a href="#" class="action_btn delete_color" style="width: 75px; display: none" id="alldelete">DELETE ALL</a>

        </div>



    </div>
    <div class="add_seg_details" style="float: left;">
        <div id="nodata_div" style="width: 100%; text-align: center; color: red; display: none">No Data</div>

        <div id="graphDiv" class="Graph-area" style="width: 100% !important; margin:0px auto !important; float: none; display: block;">
            <div style="text-align: center; float: left; width: 100%;">
                <div id="jqxgrid" class="jqgrid">
                </div>
                <div id="jqxchildgrid" style="display: none; height: 0px;" class="jqgrid;">
                </div>

            </div>
        </div>

    </div>
    <%--  <div class="add_seg_details">
				<table class="table table-striped table-bordered dataTable no-footer">
					<tr>
						<th><input type="checkbox" /></th>
						<th>Status</th>
						<th>Action</th>
						<th>Name</th>
						<th>Campaign</th>
						<th>Mode</th>
                        <th>Last Updated</th>
					</tr>
					<tr>
					<td><input type="checkbox" /></td>
						<td>
                            <div class="add_row_action">
                                <a style="width:23px; border-radius:50%;" class="action_btn" href="#"></a>
                                </div>						
						</td>
						<td>
                            <div class="add_row_action">
									<a href="#"><img src="../images/icon-edit.png" title="Edit" /></a>
									<a href="#" style="padding-left:14px;"><img src="../images/icon-delete.png" title="Archieve" /></a>
                                
							</div>
						</td>
						<td>Turf Removal Program </td>
						<td>Water</td>
						<td>Text, email ,Push, IVR</td>
                        <td>1/1/2016</td>
					</tr>
                    <tr>
					<td><input type="checkbox" /></td>
						<td>
                            <div class="add_row_action">
                                <a style="width:23px; border-radius:50%;" class="action_btn" href="#"></a>
                                </div>						
						</td>
						<td>
                            <div class="add_row_action">
									<a href="#"><img src="../images/icon-edit.png" title="Edit" /></a>
									<a href="#" style="padding-left:14px;"><img src="../images/icon-delete.png" title="Archieve" /></a>
                                
							</div>
						</td>
						<td>Summer DR Program</td>
						<td>Electric</td>
						<td>DR</td>
                        <td>1/1/2016</td>
					</tr>
					<tr>
					<td><input type="checkbox" /></td>
						<td>
                            <div class="add_row_action">
                                <a style="width:23px; border-radius:50%;" class="action_btn" href="#"></a>
                                </div>						
						</td>
						<td>
                            <div class="add_row_action">
									<a href="#"><img src="../images/icon-edit.png" title="Edit" /></a>
									<a href="#" style="padding-left:14px;"><img src="../images/icon-delete.png" title="Archieve" /></a>
                                
							</div>
						</td>
						<td>Turf Removal Program </td>
						<td>Water</td>
						<td>Text, email ,Push, IVR</td>
                        <td>1/1/2016</td>
					</tr>
                    <tr>
					<td><input type="checkbox" /></td>
						<td>
                            <div class="add_row_action">
                                <a style="width:23px; border-radius:50%;" class="action_btn" href="#"></a>
                                </div>						
						</td>
						<td>
                            <div class="add_row_action">
									<a href="#"><img src="../images/icon-edit.png" title="Edit" /></a>
									<a href="#" style="padding-left:14px;"><img src="../images/icon-delete.png" title="Archieve" /></a>
                                
							</div>
						</td>
						<td>Summer DR Program</td>
						<td>Electric</td>
						<td>DR</td>
                        <td>1/1/2016</td>
					</tr>

                    <tr>
					<td><input type="checkbox" /></td>
						<td>
                            <div class="add_row_action">
                                <a style="width:23px; border-radius:50%;" class="action_btn" href="#"></a>
                                </div>						
						</td>
						<td>
                            <div class="add_row_action">
									<a href="#"><img src="../images/icon-edit.png" title="Edit" /></a>
									<a href="#" style="padding-left:14px;"><img src="../images/icon-delete.png" title="Archieve" /></a>
                                
							</div>
						</td>
						<td>Turf Removal Program </td>
						<td>Water</td>
						<td>Text, email ,Push, IVR</td>
                        <td>1/1/2016</td>
					</tr>
                    <tr>
					<td><input type="checkbox" /></td>
						<td>
                            <div class="add_row_action">
                                <a style="width:23px; border-radius:50%;" class="action_btn" href="#"></a>
                                </div>						
						</td>
						<td>
                            <div class="add_row_action">
									<a href="#"><img src="../images/icon-edit.png" title="Edit" /></a>
									<a href="#" style="padding-left:14px;"><img src="../images/icon-delete.png" title="Archieve" /></a>
                                
							</div>
						</td>
						<td>Summer DR Program</td>
						<td>Electric</td>
						<td>DR</td>
                        <td>1/1/2016</td>
					</tr>
					<tr>
					<td><input type="checkbox" /></td>
						<td>
                            <div class="add_row_action">
                                <a style="width:23px; border-radius:50%;" class="action_btn" href="#"></a>
                                </div>						
						</td>
						<td>
                            <div class="add_row_action">
									<a href="#"><img src="../images/icon-edit.png" title="Edit" /></a>
									<a href="#" style="padding-left:14px;"><img src="../images/icon-delete.png" title="Archieve" /></a>
                                
							</div>
						</td>
						<td>Turf Removal Program </td>
						<td>Water</td>
						<td>Text, email ,Push, IVR</td>
                        <td>1/1/2016</td>
					</tr>
                    <tr>
					<td><input type="checkbox" /></td>
						<td>
                            <div class="add_row_action">
                                <a style="width:23px; border-radius:50%;" class="action_btn" href="#"></a>
                                </div>						
						</td>
						<td>
                            <div class="add_row_action">
									<a href="#"><img src="../images/icon-edit.png" title="Edit" /></a>
									<a href="#" style="padding-left:14px;"><img src="../images/icon-delete.png" title="Archieve" /></a>
                                
							</div>
						</td>
						<td>Summer DR Program</td>
						<td>Electric</td>
						<td>DR</td>
                        <td>1/1/2016</td>
					</tr>
                    
				</table>
				
			</div> --%>
</asp:Content>
