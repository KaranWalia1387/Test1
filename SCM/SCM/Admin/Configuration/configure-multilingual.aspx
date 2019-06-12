<%@ Page Title="Application Labels" Language="C#" MasterPageFile="~/Administration.Master" AutoEventWireup="true" CodeBehind="configure-multilingual.aspx.cs" Inherits="AdminPanel.configure_multilingual" %>

<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Import Namespace="AdminPanel" %>
<%@ Import Namespace="Newtonsoft.Json" %>


<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">

    <script src="../Scripts/jquery.bootstrap-duallistbox.min.js"></script>
    <script src="../Scripts/jquery.bootstrap-duallistbox.min.js"></script>

    <script src="../js/popup.js"></script>
    <link href="../css/font-awesome.css" rel="stylesheet" />
 
  
    <script type="text/javascript">
        var userRights =<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>;
        var userEditRights =userRights.indexOf( '<%=UserRights.LanguageAccess%>')>=0;
        var demo1 = $('[name="duallistbox_demo1[]"]').bootstrapDualListbox();
    </script>
    <script src="../js/angular/angular.js"></script>
  
    <script src="../js/angular/ui-bootstrap-tpls-0.14.3.min.js"></script>
    <script src="../js/configure_multilingual.js"></script>
    <script type="text/javascript">
        $("document").ready(function () {
         
            $("#chartDiv").addClass("HEight");
            $('#collapseOne').addClass('in');
            $('.sidebar_MultiManguage').addClass('active');
            $("#ddlType").prop("enabled", true);
            $('#txtNewSpanishText').addClass("concatKey");
            $('#txtNewEnglishText').addClass("concatKey");
        });

     
        $("document").ready(function () {
            $('a[href = "#Add"]').click(function(){
                var ScreenID = $('#ddlScreen').val();
                if (ScreenID=='-1')
                {
                    alert('Please Select the Screen First.'); 
                    return false;
                }
                else{
                    return true;
                }
             
            }); 

    
        });
    </script>
    <input type="hidden" class="activeli_list" value="sidebar_MultiManguage_app" />
    
    <script type="text/javascript">
        $(window).resize(function(){
            $('#jqxgrid').jqGrid('setGridHeight',$(window).innerHeight());
        });
    </script>
    <link href="../css/bootstrap-duallistbox.min.css" rel="stylesheet" />


    <uc1:jqxGrid ID="JqxGrid1" runat="server" />
    <input type="hidden" class="activeli_list" value="sidebar_Language" />
    
    
<div  id="divid" ng-app="MultilingualApp" ng-controller="MultilingualController" ng-cloak>
    <div class="top-header-area">
        <%--<div style="float: left;">
             <button id="btnUpdateXml" type="button" class="submitBtn" value="" ng-click="update()">Update File</button>
        </div>--%>
        <div style="float: left; width: 40%;">
            <h2 style="padding-left: 20px;">Application Labels</h2>
        </div>
        <div id="searchpanel" class="Rightheader-Pannel" style="    padding-bottom: 2px;">
            <button id="btnUpdateXml" type="button" class="submitBtn" style="    margin-top: -5px!important;margin-bottom:-1px!important;width: 200px!important;" value="" ng-click="update()">Update Resource File</button>

            <asp:Label ID="lblScreenName" runat="server" Text="Screen Name"></asp:Label>

            <asp:DropDownList ID="ddlScreen" runat="server" ClientIDMode="Static"></asp:DropDownList>


        </div>
    </div>

    <div class="grid-section">
        <div id="jqxgrid" class="jqgrid"></div>
    </div>


      

    </div>
    <!-- Popup ends -->
    <style>
        .grid_main_box {
            margin-left: 11px;
            margin-top: 4px;
            text-align: center;
        }

        #ddlScreen {
                width: auto !important;
               padding: 0px !important;
               margin-bottom:0px;
        }

           </style>
</asp:Content>
