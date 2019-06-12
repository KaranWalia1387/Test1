<%@ Page Title="About My Home : Heating And Cooling" Language="C#" AutoEventWireup="true" CodeBehind="Heating-and-cooling.aspx.cs" MasterPageFile="~/Efficiency.master" Inherits="CustomerPortal.Heating_and_cooling" %>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderhead" runat="server">
    <!-- Bootstrap -->

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
     <%: System.Web.Optimization.Styles.Render("~/Content/cssHeating_and_cooling") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsHeating_and_cooling")%>
   <%-- <link href="css/sweepstakes.css" rel="stylesheet" type="text/css">
    <link href="css/Heating_and_cooling.css" rel="stylesheet" />
    <script type="text/jscript" src="js/Heating-and-cooling.js"></script>--%>



   

</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <div class="right_content_box">
        <div class="Left_inner_area">
            <h2>progress</h2>
            <div class="left_listing">
                <ul>
                    <li><a href="Sweep_1.aspx">1: Structure</a></li>
                    <li><a href="Heating-and-cooling.aspx" class="actives">2: Heating &amp; Cooling</a></li>
                    <li><a href="Appliances.aspx">3: Appliances</a></li>
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

                    <%--<h2 class="b_head">What fuel does your main heating system use?</h2>

                    <div class="home_list_section_single">
                        <ul>
                            <li><a href="#" class="higheffi"><img src="images/icon-elect.png" />Electricity</a></li>
                            <li><a href="#" class="higheffi"><img src="images/icon-gas.png" />Gas</a></li>
                            <li><a href="#" class="higheffi"><img src="images/icon-oil.png" />Oil</a></li>
                            <li><a href="#" class="higheffi"><img src="images/icon-propane.png" />Propane</a></li>
                            <li><a href="#" class="higheffi"><img src="images/icon-dual.png" />Dual - Fuel</a></li>
                        </ul>
                        <div class="home_list_section_right">
                            <a href="#" class="right_answ">Click me</a>
                            <a href="#" class="right_comment">Click me</a>
                        </div>
                    </div>

                    <div class="clearfix"></div>
                    <h2 class="b_head">Do you use a space heater or other secondry heating system?</h2>

                    <div class="home_list_section_single">
                        <ul>
                            <li><a href="#" class="higheffi">
                                <img src="images/icon-yes.png" />
                                Yes</a></li>
                            <li><a href="#" class="higheffi">
                                <img src="images/icon-no.png" />
                                No</a></li>
                        </ul>
                        <div class="home_list_section_right">
                            <a href="#" class="right_answ">Click me</a>
                            <a href="#" class="right_comment">Click me</a>
                        </div>
                    </div>



                    <div class="clearfix"></div>
                    <h2 class="b_head">What best describes your home's primary air conditioner?</h2>

                    <div class="home_list_section_single">
                        <ul>
                            <li><a href="#">
                                <img src="images/icon-central.png" />
                                Central</a></li>
                            <li><a href="#">
                                <img src="images/icona-wall.png" />
                                Through - Wall</a></li>
                            <li><a href="#">
                                <img src="images/icon-in-window.png" />
                                In - Window</a>
                                <ul>
                                    <li><a href="#" class="higheffi">
                                        <img src="images/icon-15-year.png" />
                                        15-Year-Old Or Older Window AC</a></li>
                                    <li><a href="#" class="higheffi">
                                        <img src="images/icon-5-15-year.png" />
                                        5 to 15-Year-Old Window AC</a></li>
                                    <li><a href="#" class="higheffi">
                                        <img src="images/icon-less-than-5.png" />
                                        Less Than 5-Year-Old Window AC</a></li>
                                    <li><a href="#" class="higheffi">
                                        <img src="images/icon-portable-ac.png" />
                                        Portable AC</a></li>
                                </ul>
                            </li>
                            <li><a href="#">
                                <img src="images/icon-no-ac.png" />
                                No A/C</a></li>
                        </ul>
                        <div class="home_list_section_right">
                            <a href="#" class="right_answ">Click me</a>
                            <a href="#" class="right_comment">Click me</a>
                        </div>
                    </div>

                    <div class="clearfix"></div>
                    <h2 class="b_head">What are your thermostate setting?</h2>

                    <div class="home_list_section_single">
                        <ul>
                        </ul>
                        <div class="home_list_section_right">
                            <a href="#" class="right_answ">Click me</a>
                            <a href="#" class="right_comment">Click me</a>
                        </div>
                    </div>

                    <div class="clearfix"></div>
                    <h2 class="b_head">What types of ducts are in your home?</h2>

                    <div class="home_list_section_single">
                        <ul>
                            <li><a href="#" class="higheffi">
                                <img src="images/icon-no-ducts.png" />
                                No Ducts</a></li>
                            <li><a href="#" class="higheffi">
                                <img src="images/icon-flexible-ducts.png" />
                                Flexible Ducts</a></li>
                            <li><a href="#" class="higheffi">
                                <img src="images/icon-hard-no-insulation.png" />
                                Hard/No Insulation</a></li>
                            <li><a href="#" class="higheffi">
                                <img src="images/icon-hard-insulated.png" />
                                Hard/Insulated</a></li>
                            <li><a href="#" class="higheffi">
                                <img src="images/not-sure.png" />
                                Not sure</a></li>
                        </ul>

                        <div class="home_list_section_right">
                            <a href="#" class="right_answ">Click me</a>
                            <a href="#" class="right_comment">Click me</a>
                        </div>
                    </div>--%>
                </div>
            </div>

        </div>

        <div class="continue_button setting_save_box">
            <div class="bck_btn"><a href="Sweep_1.aspx">Back</a></div>
            <div class="go_ahed_btn">
             <i>You're half way done!</i>
            <a id="btnSubmitData" href="#">Next: Appliances</a>
            </div>
        </div>
    </div>

    <div class="clearfix"></div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
   <%-- <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>--%>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
 <%--   <script src="js/bootstrap.min.js"></script>--%>

</asp:Content>
