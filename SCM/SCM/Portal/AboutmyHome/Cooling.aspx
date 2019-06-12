<%@ Page Title="About My Home : Cooling" Language="C#" AutoEventWireup="true" CodeBehind="Cooling.aspx.cs" Inherits="CustomerPortal.Cooling" MasterPageFile="~/Efficiency.master"  %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderhead" runat="server">
   
    
      <%: System.Web.Optimization.Styles.Render("~/Content/cssCooling") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsCooling")%>

   <%-- <link href="css/sweepstakes.css" rel="stylesheet" />
    <link href="css/Cooling.css" rel="stylesheet" />
    <script src="js/Cooling.js"></script>--%>
    <style type="text/css">
      
    </style>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <div class="right_content_box">
          <div class="Left_inner_area">
                    <h2>progress</h2>
                    <div class="left_listing">
                        <ul>
                            <li><a href="Sweep_1.aspx">1: Structure</a></li>
                            <li><a href="Heating-and-cooling.aspx">2: Heating &amp; Cooling</a></li>
                            <li><a href="Appliances.aspx">3: Appliances</a></li>
                            <li><a href="Cooling.aspx" class="actives">4: Cooling</a></li>
                            <li><a href="Energy-Profile.aspx">5: Results - Final</a></li>
                        </ul>
                    </div>
                </div>
        <div class="bot_scroll">
            <div class="wrap_container_inner">              
                <div class="Right_inner_area">
                    <div class="top_ques_area">
                        <ul>
                            <li><span>Questions for a : </span></li>
                            <li><a href="#">
                                <asp:Label ID="lblHT" runat="server" Text=""></asp:Label></a></li>
                            <li><a href="#">
                                <asp:Label ID="lblAdd" runat="server" Text=""></asp:Label></a></li>
                            <li><a href="#">
                                <asp:Label ID="lblBN" runat="server" Text=""></asp:Label></a></li>
                        </ul>
                    </div>
                    <div class="clearfix"></div>

                    <asp:Repeater ID="QRepeater" runat="server" OnItemDataBound="QRepeater_ItemDataBound">
                        <ItemTemplate>
                            <h2 class="b_head"><%# DataBinder.Eval(Container.DataItem, "[\"EAQuestionName\"]")%></h2>

                            <div id="foundation" class="home_list_section_single mainDiv">
                                <ul>
                                    <asp:Repeater ID="OpRepeater" runat="server" OnItemDataBound="OpRepeater_ItemDataBound">
                                        <ItemTemplate>
                                            <li>
                                                <a href="#" class="basement">
                                                    <img src="<%# DataBinder.Eval(Container.DataItem, "[\"OptionImage\"]")%>" /><%# DataBinder.Eval(Container.DataItem, "[\"OptionName\"]")%>
                                                    <span style='display: none'><%# DataBinder.Eval(Container.DataItem, "[\"OptionId\"]")%></span>
                                                    <span style='display: none'><%# DataBinder.Eval(Container.DataItem, "[\"AddressId\"]")%></span>
                                                </a>
                                                <ul>
                                                    <asp:Repeater ID="OpChlidRepeater" runat="server">
                                                        <ItemTemplate>
                                                            <li>
                                                                <a href="#" class="basement">
                                                                    <img src="<%# DataBinder.Eval(Container.DataItem, "[\"OptionImage\"]")%>" /><%# DataBinder.Eval(Container.DataItem, "[\"OptionName\"]")%>
                                                                    <span style='display: none'><%# DataBinder.Eval(Container.DataItem, "[\"OptionId\"]")%></span>
                                                                    <span style='display: none'><%# DataBinder.Eval(Container.DataItem, "[\"AddressId\"]")%></span>
                                                                </a>
                                                            </li>
                                                        </ItemTemplate>
                                                    </asp:Repeater>
                                                </ul>
                                            </li>
                                        </ItemTemplate>
                                    </asp:Repeater>
                                </ul>
                                <div class="home_list_section_right">
                                    <a href="#" class="right_answ">Click me</a>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </ItemTemplate>
                    </asp:Repeater>
                </div>
            </div>
        </div>
        <div class="continue_button setting_save_box">
            <div class="bck_btn"><a href="Appliances.aspx">Back</a></div>
         <div class="go_ahed_btn">
            <i>All done, see you home energy profile!</i>
            <a id="btnSubmitData" href="#">Next: Your profile</a>
             </div>
        </div>
    </div>

    <div class="clearfix"></div>
  <%--  <script src="../js/jquery-1.12.3.min.js"></script>--%>
</asp:Content>
