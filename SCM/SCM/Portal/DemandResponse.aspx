<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="DemandResponse.aspx.cs" Inherits="CustomerPortal.DemandResponse" %>
<%@ Register Assembly="System.Web.DataVisualization, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"
    Namespace="System.Web.UI.DataVisualization.Charting" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/DemandResponse.js" type="text/javascript"></script>
    <style type="text/css">
        .GraphLegend_data_low
        {
            width: 51px;
            line-height: 15px;
            margin-bottom: 10px;
        }
        .GraphLegend_low
        {
            line-height: 15px;
            margin-bottom: 10px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="TableCellContainer">
        <div class="TableCellContainerHeader" style="padding: 0px 0px 8px;">
            <a href="#">
                <div class="ActiveTabLeft">
                    <div class="NewProgramIcon">
                        &nbsp;</div>
                    <div class="TableCellHeaderTitle">
                        DR Programs
                    </div>
                </div>
            </a>
            <a href="DREvent.aspx">
                <div class="ActiveTab">
                    <div class="NewRabetesIcon">
                        &nbsp;</div>
                    <div class="TableCellHeaderTitle">
                        DR Event
                    </div>
                </div>

            </a>

             <a href="programs.aspx" style="float:right;">
                <div class="ActiveTab">
                    <div class="NewRabetesIcon">
                        &nbsp;</div>
                    <div class="TableCellHeaderTitle">
                        Unregister
                    </div>
                </div>

            </a>


            <%--<div style="float: right; padding: 8px 10px 0px">
                <span class="SearchIcon" id="btnSearch">&nbsp;</span>
                <div class="TableCellHeaderSearch">
                    <input id="txtSearch" type="text" placeholder="Search Keyword" onkeypress="return chksearchkey(event);" /></div>
            </div>--%>
        </div>
        <div class="TableCellContainerContent ContentheightDR">
<%--            <div class="EFGraphPanel">
                <div style="margin: 10px auto; width: 350px;">
                    <asp:Chart ID="chtsavingtips" runat="server" Width="350px" Height="320px" ImageStorageMode="UseImageLocation"
                        ImageLocation="ChartImages/ChartPic_#SEQ(300,3)">
                        <Titles>
                            <asp:Title Font="Times New Roman, 10pt, style=Bold" Name="Title1" Text="Number of people who added the programs">
                            </asp:Title>
                        </Titles>
                        <Series>
                            <asp:Series Name="saving" BorderWidth="2" ChartArea="ChartArea1" ChartType="Pie"
                                IsValueShownAsLabel="true" Color="#6baee3">
                            </asp:Series>
                        </Series>
                        <ChartAreas>
                            <asp:ChartArea Name="ChartArea1">
                                <AxisX LabelAutoFitStyle="None">
                                    <MajorGrid LineColor="Transparent" LineDashStyle="NotSet" />
                                    <MajorTickMark LineColor="Transparent" />
                                    <LabelStyle Angle="0" Interval="1" />
                                </AxisX>
                                <AxisY LineColor="Transparent" Title="">
                                    <MajorGrid LineColor="#dadada" />
                                    <MajorTickMark LineColor="Transparent" />
                                </AxisY>
                                <Area3DStyle Enable3D="true" Inclination="40" Rotation="45" LightStyle="Realistic" />
                            </asp:ChartArea>
                        </ChartAreas>
                    </asp:Chart>
                </div>
                <div style="margin: 20px auto; width: 305px">
                    <div id="divLegends" runat="server">
                    </div>
                    <div class="clear">
                        &nbsp;</div>
                </div>
            </div>--%>
            <div class="EFSAviingTipsPanelfullwid">
                 <div class="ST_Title">
                    <div class="ST_Title_Program">
                        Programs
                    </div>
                    <div class="ST_Title_Type">
                        Type(Mandatory or Voluntary)
                    </div>
                    <div class="ST_Title_Newdate">
                        Date Enrolled
                    </div>
                    <div class="ST_Title_Durarionnew">
                        Duration
                    </div>
                    <div class="clear">
                        &nbsp;</div>
                </div>
                <div id="ST_Content" class="ST_Content">
                    <div class="rowBorder">
                        <div class="ST_serial"></div>
                        <div class="ST_image"></div>
                        <div class="ST_program"></div>
                        <div class="ST_type"></div>
                        <div class="ST_date"></div>
                        <div class="ST_duration"></div>
                        <div class="clear"></div>
                        <div class="ST_colapseContent"></div>
                    </div>

                   <%-- <div class="rowBorder">
                        <div class="ST_serial"></div>
                        <div class="ST_image"></div>
                        <div class="ST_program"></div>
                        <div class="ST_type"></div>
                        <div class="ST_date"></div>
                        <div class="ST_duration"></div>
                        <div class="clear"></div>
                        <div class="ST_colapseContent"></div>
                    </div>--%>
                </div>
            </div>
           <%-- <div class="EFSAviingTipsPanel">
                            <div class="ST_Title">
                    <div class="ST_Title_Name">
                        Upcoming DR Event</div>
                    <div class="ST_Title_Add">
                       <a href="notify-me.aspx?pid=p" class="ST_Title_Add">NotifyMe</a></div>
                    <div class="clear">
                        &nbsp;</div>
                </div>
                <div id="Div1" class="ST_Content">
                </div>
            </div>--%>
        </div>
        <div class="TableCellContainerFooter">
            &nbsp;
        </div>
    </div>
</asp:Content>
