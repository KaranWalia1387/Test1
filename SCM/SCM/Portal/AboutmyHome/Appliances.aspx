<%@ Page Title="About My Home : Appliances" Language="C#" AutoEventWireup="true" CodeBehind="Appliances.aspx.cs" MasterPageFile="~/Efficiency.master" Inherits="CustomerPortal.Appliances" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderhead" runat="server">
    <!-- Bootstrap -->

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

      <%: System.Web.Optimization.Styles.Render("~/Content/cssAppliances") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsAppliances")%>
    

   
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <div class="right_content_box">
        <div class="Left_inner_area">
            <h2>progress</h2>
            <div class="left_listing">
                <ul>
                    <li><a href="Sweep_1.aspx">1: Structure</a></li>
                    <li><a href="Heating-and-cooling.aspx">2: Heating &amp; Cooling</a></li>
                    <li><a href="Appliances.aspx" class="actives">3: Appliances</a></li>
                    <li><a href="Cooling.aspx">4: Cooling</a></li>
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
                                    <%--<a href="#" class="right_comment">Click me</a>--%>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </ItemTemplate>
                    </asp:Repeater>
                </div>
            </div>
        </div>
        <div class="continue_button setting_save_box">
            <div class="bck_btn"><a href="Heating-and-cooling.aspx">Back</a></div>
          <div class="go_ahed_btn">
            <i>Only 1 more question to go!</i>
            <a id="btnSubmitData" href="#">Next: Cooling</a>
              </div>
        </div>
    </div>
    <div class="clearfix"></div>


</asp:Content>
