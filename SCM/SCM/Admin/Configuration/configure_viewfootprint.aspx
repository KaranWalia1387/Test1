<%@ Page Title="Footprint" Language="C#" AutoEventWireup="true" MasterPageFile="~/Administration.master" CodeBehind="configure_viewfootprint.aspx.cs" Inherits="AdminPanel.configure_viewfootprint" %>

<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../js/configure_viewfootprint.js"></script>
    <script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false"></script>
    <link rel="stylesheet" type="text/css" href="//js.arcgis.com/3.10/js/esri/css/esri.css" />
    <script type="text/javascript" src="//js.arcgis.com/3.10/"></script>
    <link href="../css/font-awesome.css" rel="stylesheet" />
    <link rel="stylesheet" href="../include/jquery-ui-1.8.14.custom.css" type="text/css" />
    <style type="text/css">
        .esriPopup .titlePane {
            background-color: #444444;
            border-radius: 5px 5px 0 0;
            color: #ffffff;
            cursor: default;
            height: 24px;
            line-height: 20px;
            padding-left: 6px;
        }

        #jqxgrid td, th {
            padding: 0 8px;
        }


        .footer a {
            color: #fff !important;
        }

        .titlePane .title {
            width: auto;
        }

        .sizer.content {
            background: #f7f7f7;
            padding: 0 !important;
        }

        .close {
            opacity: 1 !important;
        }

        .popup_left_content_area_home {
            float: left;
            padding-right: 1%;
            width: 35% !important;
            padding-bottom: 2%;
        }

        .left-active-sprite a #mapView {
            margin-top: -4px;
            height: 23px;
            float: left;
            margin-left: 14px;
        }



        #div-footprintlocationmap_gc, #div-footprintlocationmap_layer0, #div-footprintlocationmap_root, #div-footprintlocationmap {
            position: absolute;
            width: 98% !important;
            display: block !important;
        }

        .left-active-sprite {
            padding-left: 2px;
        }

        .map1 {
            background: url("../images/map-icon.png") no-repeat left 1px;
            background-size: 16px;
        }

        .activeMap {
            background: url("../images/map-icon-active.png") no-repeat left 1px;
            background-size: 16px;
        }

        .pdf_box_wrapper input[type="image"] {
            position: relative;
            top: 8px;
            left: -6px;
            float: left;
        }

        .active-sprite {
            background: #fafafa;
            margin: -5px 0px 0px 0px;
            padding: 11px 10px 6px !important;
            float: left;
            width: 100%;
            border-bottom: 1px solid #cbcbcb;
        }

        .details {
            line-height: 25px;
        }

        .innerDiv .popup_left_content_area_home, .popup_right_content_area_home {
            height: 30px;
            line-height: 30px;
            padding: 0 18px;
        }

        .grey_box11 {
            background: #f7f7f7;
        }

        .bottom_area_home {
            border-top: 1px solid #E4E4E4;
            margin-top: 5px;
            margin-bottom: 5px;
        }
         .map1 {
                background: url("../images/map-oc.png") no-repeat left 2px;
               background-size: 14px;
        }
        .activeMap {
                background: url("../images/map-oc-active.png") no-repeat left 2px;
                  background-size: 14px;
        }
       .userDetails .userdetails_box {
           width:100%;
           float:left;
       }
        .userDetails .userdetails_box:nth-child(even) {
            background: #f7f7f7;
        }
        .userDetails  .popup_left_content_area_home {
                width: 30% !important;
                    padding-top: 1px;
        }
        .userDetails .popup_right_content_area_home {
                width: 65%;
                float: left;
                height: auto;
                line-height: normal;
                min-height: 30px;
                padding-top: 6px;
            }

        .userDetails .modal-content {   
    height: 90%;
   
}
    </style>


    <input type="hidden" class="activeli_list" value="sidebar_Footprint" />
    
   
    <uc1:jqxGrid ID="jqxGrid" runat="server" />
    <div class="top-header-area" style="margin-bottom: 0px;">
        <h2>Footprints</h2>
        <div class="filter-section" id="divFilter" style="margin: -5px 0 0 12px;">
            <div class="input-section" style="width:auto;">
                <asp:DropDownList ID="ddlCity" runat="server" ClientIDMode="Static" ToolTip="City" Style="width: 150px; margin-left: 10px;"></asp:DropDownList>
            </div>
            <div class="input-section">
                <asp:DropDownList ID="ddlLocationType" runat="server" ClientIDMode="Static" ToolTip="LocationType" Style="width: 150px; margin-left: 10px;"></asp:DropDownList>
            </div>

        </div>
        <%--    <% if (SessionAccessor.UserRightList.Contains(UserRights.PaymentLocationAccess))
           { %>--%>
        <div class="right_header_area">
            <ul>
                <li><a href="#" data-toggle="modal" data-target="#export_docs_pop"><span class="fa fa-external-link icon_color"></span>Export</a></li>
                <li><a href="configure-greenfootprint.aspx" title="Add Footprint" style="text-decoration: none;"><i class="fa fa-plus-circle icon_color" style="padding-right: 4px; padding-top: 0; text-rendering: auto; vertical-align: top;"></i>Add Footprint</a></li>
            </ul>
        </div>

        <%--  <% } %>--%>
    </div>
    <div class="active-sprite">
        <div class="left-active-sprite">
            <a href="#" style="float: left;">
                <img src="../images/usage-graph-active.svg" onclick="javaScript:chartgraphsection(1)" id="chartimg" style="margin-top: -7px;" /></a>
            <a href="#">
                <i class="map1" onclick="javaScript:chartgraphsection(3)" id="mapView"></i></a>


        </div>
        <%--  <div class="right-active-sprite" style="padding-right: 3%">
            <a href="#">
              
            </a>
        </div>--%>
    </div>
    <div class="grid-section">
        <div id="nodata_div" style="width: 100%; text-align: center; display: none; color: red;">No FootPrint Data Available</div>
        <div id="graphDiv" class="Graph-area">
            <div class="grid_main_box">
                <div id="jqxgrid" style="height: 370px; width: 100%" class="jqgrid">
                </div>
                <div id="jqxchildgrid" style="display: none; height: 370px" class="jqgrid">
                </div>

            </div>
        </div>
        <div id="mapDiv" class="Map-div" style="display: none; width: 100%; margin-left: 3px;">
            <div style="margin-top: 0px;">
                <div id="div-footprintlocationmap" visible="true" style="width: 100% !important; height: 100%"></div>
                <div id="nodata_div2" style="text-align: center;" visible="false"></div>
            </div>
        </div>
        <div id="chartDiv" style="display: none"></div>
    </div>
    <div class="modal fade userDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" id="FootPrintPopup">
        <div class="modal-dialog popup_area">
            <div class="modal-content" style="width: 100%">
                <div class="modal-header">
                    <button type="button" id="btnClose" data-dismiss="modal">
                        <img src="../images/popup_close.png" title="Close" /></button>
                    <h4 class="modal-title" id="H1">Footprint Details</h4>
                </div>
                <div class="modal-body" style="padding: 0;">
                    <div class="popup_area_home">
                        <div id="Div1" class="innerDiv">
                            <div class="userdetails_box">
                                <div class="popup_left_content_area_home">
                                    Name:
                                </div>
                                <div class="popup_right_content_area_home">
                                    <label id="locationName"></label>
                                </div>
                            </div>
                            <div class="userdetails_box">
                            <div class="popup_left_content_area_home">
                                Address1:
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblAddress1"></label>
                            </div> 

                            </div>
                            <div class="userdetails_box">
                            <div class="popup_left_content_area_home">
                                Address2:
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblAddress2"></label>
                            </div>
                            </div>
                            <div class="userdetails_box">
                            <div class="popup_left_content_area_home">
                                City:
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblCity_view"></label>
                            </div>
                            </div>
                            <div class="userdetails_box">
                            <div class="popup_left_content_area_home">
                                Zip Code:
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblZip"></label>
                            </div>
                           </div>
                            <div class="userdetails_box">
                            <div class="popup_left_content_area_home">
                                Contact Number:
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblcontact"></label>
                            </div>

                            </div>
                            <div class="userdetails_box">
                            <div class="popup_left_content_area_home">
                                Latitude:
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblLatitude"></label>
                            </div>
                            </div>
                            <div class="userdetails_box">
                            <div class="popup_left_content_area_home">
                                Longitude:
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblLongitude"></label>
                            </div>

                            </div>
                            <div class="userdetails_box">
                            <div class="popup_left_content_area_home">
                                Website:
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblWebsite"></label>
                            </div>

                            </div>

                        </div>
                    </div>
                    
                        <div style="clear: both;"></div>
                    <div class="bottom_area_home">
                        <input id="clear" type="button" class="cancel submitBtn" value="Close" data-dismiss="modal" />

                    </div>
                    <div style="clear: both;"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -3  -->
    <div class="modal fade popheading" id="export_docs_pop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Export Options</h4>
                </div>
                <div class="modal-body">
                    <div class="pdf_box_wrapper">
                        <b>Please select file type(s) to export</b>
                        <ul>

                            <li><a href="#">
                                <asp:ImageButton runat="server" ID="btnExportPdf" ImageUrl="~/images/PDF_Icon.png"
                                    ToolTip="Export to Pdf" AlternateText="Export to Pdf" OnClick="imgExportPDF_Click" />
                                Pdf(.pdf)</a></li>

                            <li><a href="#" runat="server">
                                <asp:ImageButton runat="server" ID="btnExportExl" ImageUrl="~/images/xls_icon.png" Style="margin-bottom: -0px;"
                                    ToolTip="Export to Excel" OnClick="btnExportExl_Click" />

                                Excel(.xls)</a></li>

                        </ul>

                       
                    </div>

                </div>
            </div>
        </div>
    </div>
    <input type="text"  id="tempmasked"  style="display:none" /> <%--Input Text to mask text temporarily--%>
    <!-- End Popup -->

    <asp:HiddenField ID="hdn_city" runat="server" ClientIDMode="Static" />
     <asp:HiddenField ID="hdn_location" runat="server" ClientIDMode="Static"  />
</asp:Content>
