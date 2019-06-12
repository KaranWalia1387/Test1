<%@ Page Title="Configure Add Footprint" Language="C#" MasterPageFile="~/Administration.master" AutoEventWireup="true" CodeBehind="configure-greenfootprint.aspx.cs" Inherits="AdminPanel.configure_greenfootprint" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    
    
    <script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false"></script>
    <script src="../js/jquery.mask.min.js" type="text/javascript"></script>
    <style type="text/css">
        .Text-box-area select {
            background: #fff none repeat scroll 0 0;
            border: 1px solid #999999;
            color: #616161;
            font-size: 98.3%;
            margin-bottom: 10px;
            margin-top: 4px;
            padding: 3px 4px 4px 6px;
            width: 93.2%;
        }
    </style>
    <script type="text/javascript">

        $(document).ready(function () {
           
            $('#txtContactNo').mask('(000) 000-0000');
            $("#btnClear").click(function () {
                $("#txtWebsite").val('');//added for website textbox
                $("#txtLongitude").val('');
                $("#txtLatitude").val('');
                $("#txtAddress2").val('');
                $("#txtAddress1").val('');
            
                $("#txtContactNo").val('');
                $("#txtName").val('');
                $("#ddlCity").val('');
                $("#txtComments").val('');       
                $("#ddlLocationType").val('');
            });

        });

    </script>
    <input type="hidden" class="activeli_list" value="sidebar_Footprint" />
    <script src="../js/configure-greenfootprint.js"></script>
    <asp:HiddenField ID="hdnFootprintId" runat="server" Value="" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnzipcode" runat="server" ClientIDMode="Static" />
    <input type="hidden" class="activeli_list" value="sidebar_PaymentLocations" />
    <div class="top-header-area" id="header">
        <div class="Leftheader-Pannel" id="child">
            <h2>
                <asp:Label ID="lblHeader" runat="server"></asp:Label></h2>
        </div>
    </div>
    <div class="grid-section">
        <div class="edit-user-area" id="tbl">
            <div class="table-paylocation" style="margin-bottom: 4px;">
                <table id="tblconfigurepay">
                    <tr>
                        <td style="padding-top: 5px; padding-bottom: 15px;">
                            <div class="user-written-area">
                                <label>Name </label>
                            </div>
                            <div class="Text-box-area">
                                <asp:TextBox ID="txtName" runat="server" title="Name" ClientIDMode="Static" onKeyUp="javascript:this.value=this.value.replace(/[<,>]/g,'');"
                                    MaxLength="50" TabIndex="1" mandatory="1" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                            </div>
                            <div class="user-written-area gray-box">
                                <label>Address 1 </label>
                            </div>
                            <div class="Text-box-area gray-box">
                                <asp:TextBox ID="txtAddress1" runat="server" title="Address 1" value="" mandatory="1" onKeyUp="javascript:this.value=this.value.replace(/[<,>]/g,'');"
                                    MaxLength="50" TabIndex="3" ClientIDMode="Static" onchange='return GetLatLongfromAddress();' onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                            </div>
                            <div class="user-written-area">
                                <label>Contact Number </label>
                            </div>
                            <div class="Text-box-area">
                              <%--  <asp:TextBox ID="txtContactNo" CssClass="Phone" runat="server" title="Contact Number" value="" MaxLength="12" ClientIDMode="Static"
                                    TabIndex="5" mandatory="1" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}"></asp:TextBox>--%>
                                <asp:TextBox ID="txtContactNo" CssClass="Phone" runat="server" title="Contact Number" value="" MaxLength="14" ClientIDMode="Static"
                                    TabIndex="5" mandatory="1"></asp:TextBox>
                            </div>
                            <%--START NEW UI 12/19/2014--%>
                            <%--<div class="user-written-area gray-box">
                                <label>Zip Code : </label>
                            </div>
                            <div class="Text-box-area gray-box" style="display:none;"> 
                                <asp:DropDownList ID="ddluserzipcode" runat="server" mandatory="1" title="Zip Code"  ClientIDMode="Static" TabIndex="7">
                                </asp:DropDownList>
                            </div>--%>
                            <%--END NEW UI 12/19/2014--%>
                        </td>
                        <td style="padding-top: 5px; padding-bottom: 15px;">
                              <div class="user-written-area">
                                <label>Location Type </label>
                            </div>
                            <div class="Text-box-area">
                                <asp:DropDownList ID="ddlLocationType" runat="server" mandatory="1" title="Location Type" ClientIDMode="Static" TabIndex="7">
                                </asp:DropDownList>
                            </div>
                            <div class="user-written-area gray-box">
                                <label>Address 2 </label>
                            </div>
                            <div class="Text-box-area gray-box">
                                <asp:TextBox ID="txtAddress2" runat="server" title="Address 2" value=""  onKeyUp="javascript:this.value=this.value.replace(/[<,>]/g,'');"
                                    MaxLength="50" TabIndex="4" ClientIDMode="Static" onchange='return GetLatLongfromAddress();' onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                            </div>
                            <div class="user-written-area">
                                <label>Zip Code </label>
                            </div>
                            <div class="Text-box-area">
                                <asp:DropDownList ID="ddlCity" runat="server" mandatory="1" title="Zip Code" ClientIDMode="Static" TabIndex="6">
                                </asp:DropDownList>
                            </div>
                            <%-- START NEW UI 12/19/2014 --%>
                            <%--<div class="user-written-area gray-box" > </div>
                            <div class="Text-box-area gray-box" > </div>--%>
                            <%-- END NEW UI 12/19/2014 --%>

                             
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <hr style="margin-left: -4%; margin-top: 0px; margin-bottom: 0px; border-bottom: 1px solid #ededed;" />
                        </td>
                    </tr>
                    <tr>
                 
                        <td style="padding-top: 10px; padding-bottom: 5px;">
                            <div class="user-written-area">
                                <label>Latitude </label>
                            </div>
                            <div class="Text-box-area">
                                <asp:TextBox ID="txtLatitude" runat="server" class="box" title="Latitude" value="" MaxLength="20" TabIndex="8"  ClientIDMode="Static" ReadOnly="true"></asp:TextBox>
                            </div>

                            <div class="user-written-area">
                                <label>Longitude </label>
                            </div>
                            <div class="Text-box-area">
                                <asp:TextBox ID="txtLongitude" runat="server" class="box" title="Longitude" value="" MaxLength="20" TabIndex="9"  ClientIDMode="Static" ReadOnly="true"></asp:TextBox>
                            </div>
                            <div class="user-written-area">
                                <label>Website </label>
                            </div>
                            <%--//added for website textbox--%>
                            <div class="Text-box-area">
                                <asp:TextBox ID="txtWebsite" runat="server" class="box" title="Website" value="" MaxLength="50" TabIndex="10"
                                    onKeyUp="javascript:this.value=this.value.replace(/[<,>]/g,'');" ClientIDMode="Static"></asp:TextBox>
                            </div>
                            <%-- end --%>
                            <div class="user-written-area" style="height: 94px;"></div>
                            <div class="Text-box-area" style="height: 94px;"></div>
                        </td>
                        <td style="padding-top: 10px; padding-bottom: 5px;">
                            <div class="user-written-area">
                                <label>Description </label>
                            </div>
                            <div class="Text-box-area">
                                <asp:TextBox ID="txtComments" runat="server" class="box" title="Description" value="" MaxLength="250" TabIndex="11" TextMode="MultiLine" ClientIDMode="Static"></asp:TextBox>
                            </div>
                                <div class="user-written-area">
                            </div>
                            <div class="Text-box-area">
                            </div>
                            <div class="user-written-area">
                            </div>
                            <%--//added for website textbox--%>
                            <div class="Text-box-area">
                            </div>
                            <%-- end --%>
                            <div class="user-written-area" style="height: 94px;"></div>
                            <div class="Text-box-area" style="height: 94px;"></div>
</td>
       
                    </tr>
                </table>
            </div>
        </div>
       <div class="outage_sbt_box">
             <input id="btnCancel" type="button" value="Cancel" title="Cancel" class="submitBtn" onclick="location.href = 'configure_viewfootprint.aspx'"/>
             <input type="button" class="submitBtn" ID="btnClear" value="Clear" title="Clear"  />
          <input type ="button" id="btnAddUpdate" runat="server"  class="submitBtn" value="Save"   onclick="SaveUpdateData();" />

       </div>
    </div>
    <asp:HiddenField ID="hdnlatitude" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnlongitude" runat="server" ClientIDMode="Static" />
    <%--// Added to get Value from Hidded field as it's stored through javascript--%>
    <asp:HiddenField ID="hdnCityId" runat="server" ClientIDMode="Static" />
    <%--// Added to get Value from Hidded field as it's stored through javascript--%>
</asp:Content>
