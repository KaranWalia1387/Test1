<%@ Page Title="Role" Language="C#" MasterPageFile="~/Administration.master" AutoEventWireup="true" CodeBehind="Role.aspx.cs" Inherits="AdminPanel.Role" %>

<%@ Import Namespace="AdminPanel" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../Scripts/jquery.bootstrap-duallistbox.min.js"></script>
    
    <link href="../css/font-awesome.css" rel="stylesheet" />
    <link href="../css/bootstrap-duallistbox.min.css" rel="stylesheet" />
    <uc1:jqxGrid ID="JqxGrid1" runat="server" />
    <input type="hidden" class="activeli_list" value="sidebar_Role" />
    
    
    <style type="text/css">
        .form-control {
            float: left;
        }registerimg
         .grid_main_box {
    margin-left: 11px;
    margin-top:0px;
    text-align: center;
}

          #jqxgrid td, th {
            padding: 0 8px;
        }
    </style>
    <div class="top-header-area">
        <div style="float: left; width: 85%;">
            <h2 style="padding-left: 20px;">Role</h2>
        </div>
          <div style="float: right;padding-right: 20px;">
             <a id="addRole" href="<%=string.Format("{0}/configuration/RolesPermission.aspx",AdminPanel.Common.url)%>"  style="text-decoration:none;"> <i class="fa fa-plus-circle icon_color"></i> Add Role</a>
              </div>
             </div>
     <div class="grid-section">
        <div id="jqxgrid" class="jqgrid"></div>
    </div>
  
    <script type="text/javascript">
        var userRights = '<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>';
        var userEditRights = userRights.indexOf('<%=UserRights.RoleAccess%>') >= 0;
     //   var demo1 = $('[name="duallistbox_demo1[]"]').bootstrapDualListbox();

    </script>
    <style>
        .deleteRole {
            cursor: pointer;
        }

        .popup_left_content_area_home {
            float: left;
            font-weight: bold;
            padding-bottom: 2%;
            padding-right: 1%;
            width: 52%;
        }

        #btnDiv input {
            width: 40%;
        }

        /*.roleDetails .tab-pane {
            background-image: linear-gradient(rgb(255, 255, 255) 20%, rgb(244, 242, 242) 100%);
        }*/

        /*.modal-body, .modal-content {
            background-image: linear-gradient(rgb(255, 255, 255) 20%, rgb(244, 242, 242) 100%);
                border-radius: 5px;
              border: 0px solid #fff;
        }*/

        #status, input[type="text"], input[type="password"], input[type="number"], input[type="email"],
        input[type="tel"] {
            display: block;
            width: 97%;
            margin: 0 0 20px 0;
            border: 1px solid #ccc;
            font-size: 1em;
            padding: 5px;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            border-radius: 5px;
            behavior: url(/entreg/assets/scripts/external/PIE.htc);
            position: relative;
            background: #fff;
        }

        .form-control {
            padding-left: 2% !important;
            font-size: 12px !important;
            padding-top: 1% !important;
        }
    </style>

    <script src="../js/Configure-Role.js"></script>
</asp:Content>
