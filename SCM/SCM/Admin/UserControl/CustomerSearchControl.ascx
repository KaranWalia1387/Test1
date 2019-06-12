<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CustomerSearchControl.ascx.cs" Inherits="AdminPanel.UserControl.CustomerSearchControl" %>



<%@ Register Src="~/Configuration/UserControl/usernameautocompleteName.ascx"
    TagPrefix="uc2" TagName="usernameautocompleteName" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1"
    TagName="jqxGrid" %>
<%@ Import Namespace="AdminPanel" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Register Src="~/UserControl/CustomerDetailsPopUp.ascx"
    TagPrefix="uc1" TagName="CustomerDetailsPopUp" %>

  <script src="<%#string.Format("{0}/js/jquery.mask.min.js",AdminPanel.Common.url)%>"></script>
 <script src="<%#string.Format("{0}/js/popup.js",AdminPanel.Common.url)%>"></script>
<script src="<%#string.Format("{0}/js/UserPopup.js",AdminPanel.Common.url)%>"></script>

<script>
    
    var userRights1 = '<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>';
    var userEditRights1 = userRights1.indexOf('<%=UserRights.UserManagementEdit%>', '<%=StringComparer.InvariantCultureIgnoreCase%>') >= 0;
    var UserResetPasswordRights1 = userRights1.indexOf('<%=UserRights.UserManagementResetPassword%>') >= 0;
    var UserStatusRights1 = userRights1.indexOf('<%=UserRights.UserManagementChangeStatus%>') >= 0;
    var UserReportRights1 = userRights1.indexOf('<%=UserRights.UserManagementReport%>') >= 0;
  
    </script>
<style type="text/css">
    .calender_ico_css {
              position: absolute !important;
            right: 10px !important;
            top: 32px !important;
            left: auto !important;
            width: auto !important;
    }
.search_left_box {
      width: 350px;
    float: left;
}
    .add_grid_right_box {
            width: 800px;
    float: left;
    text-align: center;
    border-left: 1px solid #e7e7e7;
    height: 413px;
    margin-top: -10px;
    display:none;
    }

    registered_grid1{
            background: #59ace2;
    display: block;
    margin: 10px 0 0 !important;
    color: #fff !important;
    margin-top: 2px;
    /* background: #a9d86e; */
    padding: 0px 0px !important;
    border-radius: 2px;
    width: 74px;
    height: 22px;
    line-height: 22px;
    }
     #jqxchildgrid1 .active_new {
            display: block;
        font-size: 10px;
        position: relative;
           top: 13px;
            background: #a9d86e;
        width: 12px;
        height: 12px;
        border-radius: 50px;
        text-indent: -99999px;
        line-height:22px;

    }
        #jqxchildgrid1 .active_new.registered_grid {
        background: #337ab7;
    }

    #jqxchildgrid1 .active_new.inactive_grid {
        background: #fd6f63;
    }

    #status_legends .active_new.registered_grid{
        background: #337ab7;
        
    }
    #status_legends .active_new.inactive_grid{
        background: #fd6f63;
    }
     #status_legends .active_new.notregistered_grid{
        background: #acacac !important;
    }
    #status_legends .active_new{
           display: inline-block;
    font-size: 10px;
    position: relative;
    top: 2px;
    background: #a9d86e;
    width: 12px;
    height: 12px;
    border-radius: 50px;
    text-indent: -99999px;
    line-height: 22px;
    left: 7px;
    }
  
    #status_legends div {
          float: left;
    padding-left: 27px;
    padding-top: 3px;
    }

   #btnClearPopup {
    display: block;
    float: left;
    width: 130px;
    padding: 6px 0;
    color: #fff;
    text-decoration: none;
    font-size: 12px;
    background: #22aec9;
    border-radius: 2px;
    text-align: center;
   /* height: 32px;*/
    }

   #graphDivCustomer .jqx-disableselect, #graphDivCustomer .jqx-dropdownlist-content {
       min-width:22px !important;
   }

   .right-content-area .active_new.notregistered_grid {
                background: #acacac !important;
                /*margin-top: 10PX;*/
            }

</style>
<uc1:jqxGrid runat="server" />

    <div class="uni-search">
            <div class="uni-srch-ico uni_top_space"><i class="fa fa-search" aria-hidden="true"></i></div>
            <div class="uni_search_wrapper uni_top_space fade in">
                <div class="uni_src_left_box">
                    <h3>Universal Search
                            <div class="close_uni_popup close"><i class="fa fa-close" aria-hidden="true"></i></div>
                    </h3>
                    <div class="search_left_box" >
                    <div class="search_inpt_top search_inpt_brdr">
                         <div class="form-group">
                                <div class="icon-addon addon-md">
                            <uc2:usernameautocompleteName runat="server" ID="usernameautocompleteName" />
                            <span class="texttype hide" id="contactnumber" style="display: none"></span>
                                      </div>
                               </div>
                    </div>
                    <div class="search_inpt_top">
                        <div class="form-group">
                            <div class="icon-addon addon-md">
                                <asp:DropDownList ID="ddlCityPopup" runat="server" ClientIDMode="Static"
                                    ToolTip="Location" CssClass="form-control">
                                </asp:DropDownList>
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="icon-addon addon-md">
                                <asp:TextBox ID="txtAccountIDPopup" runat="server" ClientIDMode="Static"
                                    placeholder="Account Number" ToolTip="Account Number" MaxLength="12" CssClass="form-control" onkeypress="return IsNumeric(event);"></asp:TextBox>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="icon-addon addon-md">
                                <label>Email</label>
                                    <asp:TextBox ID="txtEmailPopup" runat="server" ToolTip="Email"
                                        ClientIDMode="Static" placeholder="Email" CssClass="form-control"></asp:TextBox>
                                 
                                

                            </div>
                        </div>

                        <div class="form-group">
                            <div class="icon-addon addon-md">
                                <label>Mobile Number </label>
                                    <asp:TextBox ID="txtMobilePopup" runat="server" ToolTip="Mobile Number"
                                        ClientIDMode="Static" placeholder="Mobile Number" CssClass="form-control"></asp:TextBox>
                                 
                              

                            </div>
                        </div>

                        

                     
                       
                    
                     
                        <div class="button_uni">
                            <a href="#" data-toggle="modal"  class="gird_show_css">Submit</a>
                            <a href="#"  onclick="clearPopupFields();" id="btnClearPopup">Clear</a>
                        </div>
                    </div>
                   </div>
                    <div class="add_grid_right_box" >
                        <div id="graphDivCustomer" class="Graph-area">
                            <div style="text-align: center; float: left; width: 100%;">
                                <div id="jqxgridCustPopUP" class="jqgrid">
                                </div>
                                <div id="jqxchildgrid1" style="display: none; height: 0px; width: 100%;"
                                    class="jqgrid;">
                                </div>
                                <div id="status_legends">
                                    <div>Active <span class="active_new"></span></div>
                                    <div>Inactive<span class="active_new inactive_grid"></span></div>
                                    <div>Registered<span class="active_new registered_grid"></span></div>
                                    <div>Not Registered<span class="active_new notregistered_grid"></span></div>
                                </div>
                                <div id="nodata_div1" style="display: block;padding: 52px;font-size: 25px;">

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

         

        </div>

 <div class="modal fade userDetails" tabindex="-1" role="dialog"
        aria-labelledby="myModalLabel" aria-hidden="true">
        <uc1:CustomerDetailsPopUp runat="server" ID="CustomerDetailsPopUp" />
    </div>
  <input type="hidden" id="custId" />