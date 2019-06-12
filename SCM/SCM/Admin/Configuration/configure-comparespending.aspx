<%@ Page Title="Configure Compare" Language="C#" MasterPageFile="~/Administration.master" AutoEventWireup="true" CodeBehind="configure-comparespending.aspx.cs" Inherits="AdminPanel.configure_comparespending" %>
<%@ Import Namespace="AdminPanel" %>
<%@ Import Namespace="Newtonsoft.Json" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../include/jquery-1.5.1.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var userRights =<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>;
                var userUsageRights =userRights.indexOf( '<%=UserRights.CompareReadOnly%>')>=0 && userRights.indexOf( '<%=UserRights.CompareAccess%>')<0;
                if (userUsageRights) {
                    $('input[type=checkbox]').attr('disabled','true');
                    $('input[type=radio]').attr('disabled','true');
                    $('#'+'<%=btnSaveSetting.ClientID%>').hide();
             
                    }
            });
        function validate() {
            if ($('#divunit input:checkbox:checked').length == 0) {
                alert('Please select a unit(kWh or $).')// change as per bug id:9121 $$$ is replaced by $
                return false;
            }
            else if ($('#divcomparison input:checkbox:checked').length == 0) {
                alert('Please select a option for comparison.')
                return false;
            }
            else
                return true;
        }
    </script>
    <input type="hidden" class="activeli_list" value="sidebar_compare" />
    <div class="top-header-area">
        <div class="Leftheader-Pannel">
            <h2>Compare</h2>
        </div>
    </div>
    <div class="grid-section">
        <div class="usage-section" style="padding-left:26px; border-bottom:0px;">
            <div id="divunit" class="usage-area-section" >
                <span style="float: left; margin-right: 25px; width: 20%; font-weight:normal;">Select Unit</span>

                <div class="billingtitle">
                    <label style="width: 220px;">
                        <asp:CheckBox ID="chkkWh" runat="server" ClientIDMode="Static" onclick="validate();"/>
                        <%--Corrected text to handle all units--%>
                        <span>Units(kWh,HCF,CCF,Gallon)</span>
                        <%--<span>kWh</span>--%>
                    </label>
                    &nbsp;
                <label>
                    <asp:CheckBox ID="chkdollor" runat="server" ClientIDMode="Static" onclick="validate();"/>
                    <span>$</span>
                </label>
                </div>
            </div>
        </div>
        <div class="usage-section gray-box" style="padding-left:26px; padding-top:8px;  ">
            <div id="divcomparison" class="usage-area-section">
                <span style="float: left; margin-right: 25px; width: 20%; font-weight:normal;">Select Comparison</span>

                <div class="billingtitle" >
                    <label>
                        <asp:CheckBox ID="chkMe" runat="server" ClientIDMode="Static" onclick="validate();"/>
                        <span>Compare Me</span>
                    </label>
                    &nbsp;
                <label>
                    <asp:CheckBox ID="chkZip" runat="server" ClientIDMode="Static" onclick="validate();"/>
                    <span>Compare Zip</span>
                </label>
                    &nbsp;
                <label>
                    <asp:CheckBox ID="chkUtility" runat="server" ClientIDMode="Static" onclick="validate();"/>
                    <span>Compare Utility</span>
                </label>
                    &nbsp;
                 <label>
                     <asp:CheckBox ID="chkAll" runat="server" ClientIDMode="Static" onclick="validate();"/>
                     <span>Compare All</span>
                 </label>
                </div>
            </div>

        </div>
        <div class="clear">
            &nbsp;
        </div>
        <center>
            <asp:Button ID="btnSaveSetting" runat="server" Text="Save" CssClass="DefaultBtn"
                ToolTip="Save Setting" OnClick="btnSaveSetting_Click" OnClientClick="return validate()" /></center>
    </div>
</asp:Content>
