<%@ Page Title="Add Segment" Language="C#" MasterPageFile="~/CRM/CRM.master" AutoEventWireup="true" CodeBehind="crm-add-segmentations.aspx.cs" Inherits="AdminPanel.CRM.crm_add_segmentations" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%--<%@ Register Src="~/CRM/UserControl/Attributeautocomplete.ascx" TagPrefix="uc1" TagName="usernameautocomplete" %>--%>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../js/blockScreen.js"></script>
    <script src="../js/bootstrap-tabs.js"></script>
    <link href="../css/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="../js/w2ui-1.4.2.min.js" type="text/javascript"></script>
    <%-- <script src="../js/jqxGrid/jqxscrollbar.js"></script>--%>
    <script src="../js/crm-add-segment.js"></script>

    <script>
        $(document).ready(function () {
            $(".inner-right-section").addClass("seg_bottom_space");
            $("ul.tabs li.sidebar_sgmntns").addClass("active");

            $("#addAttributeButton").click(function () {
                $(".seg_bottom_space.inner-right-section .right-content-area").css("overflow", "hidden");

            });
            $("#add_attri_popup .close").click(function () {
                $(".seg_bottom_space.inner-right-section .right-content-area").css("overflow", "auto");

            });
            $(".cancel_btn1").click(function () {
                $(".seg_bottom_space.inner-right-section .right-content-area").css("overflow", "auto");

            });

        });
    </script>
    <style type="text/css">
        .modal-body.modal-content1 input[type="text"], .modal-body.modal-content1 select {
            width: 97%;
        }

        .submitBtn {
            float: right;
            margin: 3px 4px 5px 8px;
        }

        .seg_gorm_box {
            font-family: MyriadPro-LightSemiExt;
            font-size: 13px;
        }
    </style>
    <script>
        function isNumberKey(evt) {
            var charCode = (evt.which) ? evt.which : event.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;

            return true;
        }
        //-->
    </script>
    <script type="text/javascript">
        function Count(text, long) {
            var maxlength = new Number(long); // Change number to your max length.
            if (text.value.length > maxlength) {
                text.value = text.value.substring(0, maxlength);
                alert(" More than " + long + " characters not allowed");

            }
        }
    </script>
    <!-- END header -->
    <uc1:jqxGrid runat="server" />

    
    </asp:ScriptManager>
    <div class="top-header-area">
        <h2 id="topheader">Add a Segment</h2>
        <div class="exprt-filtr">
            <div>
                <%--      <a href="crm-segmentations.aspx" class="back_btn_crm">Back</a>--%>
            </div>

        </div>
    </div>

    <div class="grid-section sgmntn_wrapper">
        <div class="" id="altrnte">
            <div class="sgmntn_right_main">
                <div id="divaddsegment" class="form_add_segment">

                    <div class="seg_gorm_box">
                        <div class="col-lg-2">
                            Segment Name
                        </div>
                        <div class="col-lg-4 seg_inpt">
                            <asp:TextBox ID="txtSegmentName" runat="server" title=" Segment Name" ClientIDMode="Static" mandatory="1" MaxLength="100" onKeyUp="javascript:this.value=this.value.replace(/[<,>]/g,'');"></asp:TextBox>

                        </div>

                        <div class="col-lg-2">
                            Segment Type
                        </div>

                        <div class="col-lg-4 seg_inpt">

                            <asp:DropDownList ID="ddlType" runat="server" title="Segment Type" ClientIDMode="Static" mandatory="1">
                                <%--<asp:ListItem Value="">Select</asp:ListItem>
                                <asp:ListItem Value="EF">Efficiency</asp:ListItem>
                                <asp:ListItem Value="DR">DR</asp:ListItem>--%>
                            </asp:DropDownList>
                        </div>
                    </div>
                    <div class="seg_gorm_box">
                        <div class="col-lg-2">
                            Segment Code
                        </div>
                        <div class="col-lg-4 seg_inpt">
                            <asp:TextBox ID="txtSegmentCode" runat="server" ClientIDMode="Static" mandatory="1" MaxLength="10" title="Segment Code" onKeyUp="javascript:this.value=this.value.replace(/[<,>]/g,'');"></asp:TextBox>
                        </div>

                        <div class="col-lg-2">
                            Service Type
                        </div>

                        <div class="col-lg-4 seg_inpt">

                            <asp:DropDownList ID="ddlServiceType" runat="server" ClientIDMode="Static" mandatory="1" title=" Service Type">
                                <%--  <asp:ListItem Value="">Select</asp:ListItem>
                                <asp:ListItem Value="0">All</asp:ListItem>
                                <asp:ListItem Value="1">Power</asp:ListItem>
                                <asp:ListItem Value="2">Water</asp:ListItem>
                                <asp:ListItem Value="3">Gas</asp:ListItem>
                                <asp:ListItem Value="4">Power & Water</asp:ListItem>
                                <asp:ListItem Value="5">Power & Gas</asp:ListItem>
                                <asp:ListItem Value="6">Water & Gas</asp:ListItem>--%>
                            </asp:DropDownList>
                        </div>
                    </div>
                    <div class="seg_gorm_box">
                        <div class="col-lg-2">
                            Description
                        </div>
                        <div class="col-lg-10 seg_inpt">
                            <asp:TextBox ID="txtDescription" runat="server" ClientIDMode="Static" TextMode="MultiLine" onKeyUp="Count(this,500)" onChange="Count(this,500)"></asp:TextBox>
                            <span style="color: red">(Allow only 500 characters)</span>
                        </div>
                    </div>
                </div>
                <div class="top-header-area">
                    <h2>Add Attributes</h2>
                    <div class="exprt-filtr">
                        <div class="fliter_button_area" style="display: none">
                            <div class="filter_button"></div>
                        </div>
                        <div class="add_btn" style="float: right;">
                            <a href="#" data-toggle="modal" id="addbtnsegment">
                                <i class="fa fa-plus-circle plush_circle12"  
 id="addAttributeButton"></i>
                            </a>
                            <%-- <img  src="../images/add_seg_icon.png" /></a>--%>
                        </div>

                    </div>
                </div>
                <div class="add_seg_details">
                    <div id="nodata_div1" style="width: 100%; text-align: center" visible="false"></div>
                    <div id="graphDiv" class="Graph-area" style="width: 99.2% !important; margin: 5px auto !important; float: none; display: block;">
                        <div style="text-align: center; float: left; width: 100%;">
                            <div id="jqxgrid" class="jqgrid" style="width: 100% !important;">
                            </div>
                            <%--<div style="text-align: center; color: red;" visible="false" class="nodata">No Data</div>--%>
                        </div>
                    </div>
                    <%--<div class="add_seg_details" id="showdiv">
				<table class="table table-striped table-bordered dataTable no-footer" id="tblAttribute">
					<tr>
                        <th><input type="checkbox"/></th>
						<th>Action</th>
						<th>Segment Name</th>
						<th>Condition</th>
						<th>Value</th>                        
					</tr>
                    <tbody id="tbdyAttribute">
                   

                    </tbody>
					
				</table>
				
			</div>--%>
                </div>

            </div>

        </div>
    </div>

    <div class="seg_button_box">
        <%--<a href="#" class="cancel_btn1">Cancel</a>--%>

        <%--   <a href="segmentations.html?show" class="save_btn1 clc">Save</a>--%>
        <button id="btnAddUpdate" type="button" class="submitBtn" value="" onclick="SaveUpdateData();"></button>

        <input type="button" class="submitBtn" id="btnClear" value="Clear" title="Clear" onclick="ResetSegment();" />
        <input id="btnCancel" type="button" value="Cancel" title="Cancel" class="submitBtn" onclick="location.href = 'crm-segmentations.aspx'" />
    </div>

    <!-- Modal -->
    <div id="add_attri_popup" class="modal fade" role="dialog" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header heading_poup">
                    <button type="button" title="close" class="close closepopupsegmentation" style="cursor: pointer;" data-dismiss="modal">
                        <img src="../images/popup_close.png" class="close_crm_btn" title="Close" />
                    </button>
                    <h4 class="modal-title">Attributes</h4>
                </div>
                <div class="modal-body modal-content1">
                    <div class="modal-body modal-content1">
                        <div class="new_attri_box">
                            <div class="col-lg-3">Attribute Name</div>
                            <div class="col-lg-9">
                                <%--<asp:DropDownList ID="ddlAttribute" runat="server" ClientIDMode="Static" mandatory="1" >
                                       </asp:DropDownList>--%>
                                <asp:HiddenField ID="AttributeId" runat="server" ClientIDMode="Static" />
                                <asp:TextBox ID="txtAttributeName" runat="server" title="Attribute Name" ClientIDMode="Static" placeholder="Attribute Name" readonly="true" data-toggle="modal" data-target="#add_attri_popup2" onclick="BindAttributeGrid();" mandatory="1" Style="width: 97%;"></asp:TextBox>

                                <%--<uc1:usernameautocomplete runat="server" ID="usernameautocomplete" />--%>
                               <%-- <a href="#" data-toggle="modal" data-target="#add_attri_popup2" onclick="BindAttributeGrid();">
                                    <img src="../images/atribute-icon.png" /></a>--%>
                            </div>
                        </div>
                        <div class="new_attri_box">
                            <div class="col-lg-3">Condition</div>
                            <div class="col-lg-9">
                                <asp:DropDownList ID="ddlCondition" runat="server" ClientIDMode="Static" mandatory="1" title="Condition">
                                    <asp:ListItem Text="Greater Than" Value="GreaterThan"></asp:ListItem>
                                    <asp:ListItem Text="Less Than" Value="LessThan"></asp:ListItem>
                                    <asp:ListItem Text="Less Than Or Equal To" Value="LessThanOrEqualTo"></asp:ListItem>
                                    <asp:ListItem Text="Greater Than Or Equal To" Value="GreaterThanOrEqualTo"></asp:ListItem>
                                    <asp:ListItem Text="Equal To" Value="EqualTo"></asp:ListItem>
                                    <asp:ListItem Text="Not Equal To" Value="NotEqualTo"></asp:ListItem>
                                </asp:DropDownList>
                            </div>
                        </div>
                        <div class="new_attri_box">
                            <div class="col-lg-3">Value</div>
                            <div class="col-lg-9">
                                <asp:TextBox ID="txtValue" runat="server" ClientIDMode="Static" mandatory="1" title="Value" onkeypress="return isNumberKey(event)" MaxLength="50"></asp:TextBox>
                            </div>
                        </div>
                        <div class="seg_button_box seg_button_box_popup">
                            <a href="#" class="cancel_btn1" onclick="resetAttribute();">Cancel</a>
                            <%--    <button id="btnAddAttribute"  type="button" class="save_btn1" value="">Save</button>--%>
                            <a href="#" class="save_btn1" id="SaveUpdate" onclick="  return addattribute();">Save</a>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>

    <!-- Modal -->
    <div id="add_attri_popup2" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header heading_poup">
                    <button type="button" class="close" title="Close" style="cursor: pointer;" data-dismiss="modal">
                        <img src="../images/popup_close.png" class="close_crm_btn" title="Close" />
                    </button>
                    <h4 class="modal-title">Attributes</h4>
                </div>
                <div class="modal-body modal-content1" style="height: 300px; overflow: auto;">
                    <%--  <table class="table table-striped table-bordered dataTable no-footer">
            <tr>
                <td>Campaign</td>
            </tr>
            <tr>
                <td>Water</td>
            </tr>
            <tr>
                <td>Electric</td>
            </tr>
            <tr>
                <td>Water</td>
            </tr>
            <tr>
                <td>Electric</td>
            </tr>
            
        </table>--%>
                    <div class="add_seg_details" style="float: left;">
                        <div id="nodata_div" style="width: 100%; text-align: center; display: none">
                            <font color="red">No Attributes  data available</font>
                        </div>
                        <div id="graphDiv1" class="Graph-area" style="width: 99.2% !important; margin: 5px auto !important; float: none; display: block;">
                            <div style="text-align: center; float: left; width: 100%;">
                                <div id="jqxgrid1" class="jqgrid" style="width: 100% !important; height: 220px !important;">
                                </div>
                                <%--<div style="text-align: center; color: red;" visible="false" class="nodata">No Data</div>--%>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</asp:Content>
