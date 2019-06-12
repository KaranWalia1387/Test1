<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Master.master" Title="Market Place"
    CodeBehind="MarketPlace.aspx.cs" Inherits="CustomerPortal.MarketPlace" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script src="js/MarketPlace.js"></script>

    <style type="text/css">
        .energy_mid_box .right_content_box {
            height: 96.8% !important;
        }

        .modal-dialog {
            margin: 30px auto;
            width: 711px;
        }

        .search-icon-area {
            width: 25px;
        }

        .search-area input[type="text"] {
            font-size: 12px !important;
            padding:5px 10px 4px !important;
        }

        .responsive_width_1 {
            width: 81%;
            float: right;
            margin-top: -8px;
        }

        .search-icon-area a:hover {
            text-decoration:none !important;
        }

        .search-area {
            width: 96%;
        }

        .modal:before {
            display: inline !important;
        }
        .header-modal {
            border-bottom: 1px solid #ececec;
            float: left;
            margin-bottom: 16px;
            text-align: right;
            width: 100%;
            background: #f7f7f7;
             border-radius: 5px 5px 0 0;
        }

       .header-modal h2 {
            float: left;
            font-size: 19px;
            margin: 13px 10px 0;
        }
       .cross {
            background: rgba(0, 0, 0, 0) url("images/cross-icon.png") no-repeat scroll right top / 60% auto;
            cursor: pointer;
            display: inline-block;
            height: 31px;
            text-align: right;
            width: 44px;
            margin: 10px 10px 0;
}

       .modal-footer {
           border:0 !important;
       }

       .wrapper-sector h1 {
            padding: 3px 0 8px;
        }

       .right-ar .exclusive {
    color: #888;
    display: block;
    float: left;
    font-size: 17px;
    margin-top: 11px;
    position: relative;
    width: 83%;
}
       .right-ar {
    float: left;
    width: 57%;
}

    </style>
    <script type="text/javascript">

        $(document).ready(function () {
          //  $("#rating4").checked(true);
           // $(".item").click(function() {
            k(".item").live('click', function () {
                    $(".item")
                        .each(function(index,obj) {
                            if (($(this).attr('checked')) == 'checked') {
                                $('#li_' + $(obj).attr("id")).show();
                            }
                            else {
                                $('#li_' + $(obj).attr("id")).hide();
                            }
                        });
              

                });
        });

    </script>


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<input type="hidden" class="activeli_list" value="efficency" />
    <section id="devices" class="inner_mid_section market_place1">
    <div class="container inner-mid-container">
          <asp:HiddenField ID="hdnParammode" runat="server" ClientIDMode="Static" />
          <asp:HiddenField ID="hdnParamCategoryId" runat="server" ClientIDMode="Static" />
          <asp:HiddenField ID="hdnParamSubCategoryId" runat="server" ClientIDMode="Static" />
          <asp:HiddenField ID="hdnParamItemId" runat="server" ClientIDMode="Static" />
        <div class="energy_mid_box">
            <h1>
                <img src="images/nav_img_large/icon_marketplace_sidebar.png" style="padding-right: 5px; margin-top: -6px; float: left; width: 28px">
                <span id="spnEfficiency">Marketplace
                   
                </span>
                <div style="float:right;    margin-top: -8px;    padding-right: 12px;">
                    <a href="rebates.aspx" globalize="ML_Common_Navigation_back"><img src="images/notification_icon/icon-back-to-inbox.png" /></a></div>
               <%-- <div class="responsive_width_1 ">
                    <div class="search-area">
                        <input id="GIStxtGoogleSearch" type="text" placeholder="Search All Appliances" title="Search All Appliances" />
                    </div>
                    <div class="search-icon-area">
                        <a href="#" id="GISsearchGoogleMap">
                            <span class="SearchIcon">&nbsp;</span></a>
                    </div>

                </div>--%>

            </h1>
            <div class="nav_left">
                <ul>
                    <ul id="sizelist">
                  <%--  <li class="icon_kitchen active a" id="cat_1"><a href="#">Kitchen & Dining</a></li>
                    <li class="icon_cleaning a" id="cat_2"><a href="#">Cleaning</a></li>
                    <li class="icon_electronics a"  id="cat_3"><a href="#">Electronics</a></li>
                    <li class="icon_health_per_care a" id="cat_4"><a href="#">Health & Personal Care</a></li>--%>
                    </ul>
                    <div class="prod_list">

                   <%--     <div class="name_listing">
                            <input type="checkbox" id="1" class="item" checked>
                            <span>Gas Stoves </span>
                        </div>
                        <div class="name_listing">
                            <input type="checkbox" id="2" class="item" checked>
                            <span>Electric Stoves </span>
                        </div>
                        <div class="name_listing">
                            <input type="checkbox" id="3" class="item" checked>
                            <span>Dish Washers </span>
                        </div>
                        <div class="name_listing">
                            <input type="checkbox" id="4" class="item" checked>
                            <span>Garbage Disposal</span>
                        </div>
                        <div class="name_listing">
                            <input type="checkbox" id="5" class="item" checked>
                            <span>Refrigerators</span>
                        </div>
                        <div class="name_listing">
                            <input type="checkbox" id="6" class="item" checked>
                            <span>Freezers & Ice Makers</span>
                        </div>
                        <div class="name_listing">
                            <input type="checkbox" id="7" class="item" checked>
                            <span>Microwaves</span>
                        </div>--%>

                      <%--  <div class="name_listing">
                            <b>Price Range</b>
                        </div>

                        <div class="name_listing">
                            <input type="checkbox">
                            <span>Under $500 (1)</span>
                        </div>
                        <div class="name_listing">
                            <input type="checkbox">
                            <span>$500-$1,000 (2)</span>
                        </div>
                        <div class="name_listing">
                            <input type="checkbox">
                            <span>$1,000 - $2,000 (2) </span>
                        </div>
                        <div class="name_listing">
                            <input type="checkbox">
                            <span>$2,000 - $3,000 (2)</span>
                        </div>--%>

                    </div>
                </ul>

            </div>
            <div class="right_content_box kitchen_right_box">
                <div class="shopping_main_box">

                   <%-- <ul>
                        <li data-toggle="modal" data-target="#myModal" class="itemlist" id="li_1">
                            <div class="off_right_box">
                                <span>45$  &nbsp;Off</span>
                            </div>
                            <div class="product_img_box">
                                <img src="images/gas-stove-large.png" />
                            </div>
                            <div class="pro_details">
                                <div class="star_right_img"><a href="#">
                                    <img src="images/star_right.png" />
                                </a></div>
                                 Gas Stoves<br />
                                <b class="rate_box">$800</b><br />
                                Sold on: Amazon.com<br />
                                Click for Specs and Reviews
                            </div>
                            <div class="rating_box">
                                <span class="star_rating_box2">
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-off.svg" /></span>
                                </span>
                            </div>
                        </li>

                    </ul>--%>

                      <%-- <ul>
                        <li data-toggle="modal" data-target="#myModal-1" class="itemlist" id="li_2">
                            <div class="off_right_box">
                                <span>45$  &nbsp;Off</span>
                            </div>
                            <div class="product_img_box">
                                <img src="images/electric-stove-large.png" />
                            </div>
                            <div class="pro_details">
                                <div class="star_right_img"><a href="#">
                                    <img src="images/star_right.png" />
                                </a></div>
                                Electric Stoves<br />
                                <b class="rate_box">$550</b><br />
                                Sold on: Amazon.com<br />
                                Click for Specs and Reviews
                            </div>
                            <div class="rating_box">
                                <span class="star_rating_box2">
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-off.svg" /></span>
                                </span>
                            </div>
                        </li>

                    </ul>



                    <ul>
                        <li data-toggle="modal" data-target="#myModal-2" class="itemlist" id="li_3">
                            <div class="off_right_box">
                                <span>45$  &nbsp;Off</span>
                            </div>
                            <div class="product_img_box">
                                <img src="images/dishwasher-large.png" />
                            </div>
                            <div class="pro_details">
                                <div class="star_right_img"><a href="#">
                                    <img src="images/star_right.png" />
                                </a></div>
                                 Dish Washers<br />
                                <b class="rate_box">$700</b><br />
                                Sold on: Amazon.com<br />
                                Click for Specs and Reviews
                            </div>
                            <div class="rating_box">
                                <span class="star_rating_box2">
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-off.svg" /></span>
                                </span>
                            </div>
                        </li>

                    </ul>


                    <ul>
                        <li data-toggle="modal" data-target="#myModal-3" class="itemlist" id="li_4">
                            <div class="off_right_box">
                                <span>45$  &nbsp;Off</span>
                            </div>
                            <div class="product_img_box">
                                <img src="images/garbage-disposal-large.png" />
                            </div>
                            <div class="pro_details">
                                <div class="star_right_img"><a href="#">
                                    <img src="images/star_right.png" />
                                </a></div>
                                 Garbage Disposal <br />
                                <b class="rate_box">$1000</b><br />
                                Sold on: Amazon.com<br />
                                Click for Specs and Reviews
                            </div>
                            <div class="rating_box">
                                <span class="star_rating_box2">
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-off.svg" /></span>
                                </span>
                            </div>
                        </li>

                    </ul>


                    <ul>
                        <li data-toggle="modal" data-target="#myModal-4" class="itemlist" id="li_5">
                            <div class="off_right_box">
                                <span>45$  &nbsp;Off</span>
                            </div>
                            <div class="product_img_box">
                                <img src="images/referegirator_img.png" />
                            </div>
                            <div class="pro_details">
                                <div class="star_right_img"><a href="#">
                                    <img src="images/star_right.png" />
                                </a></div>
                                Refrigerator<br />
                                <b class="rate_box">$900</b><br />
                                Sold on: Amazon.com<br />
                                Click for Specs and Reviews
                            </div>
                            <div class="rating_box">
                                <span class="star_rating_box2">
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-off.svg" /></span>
                                </span>
                            </div>
                        </li>

                    </ul>


                    <ul>
                        <li data-toggle="modal" data-target="#myModal-5" class="itemlist" id="li_6">
                            <div class="off_right_box">
                                <span>45$  &nbsp;Off</span>
                            </div>
                            <div class="product_img_box">
                                <img src="images/freeze-ice-maker-large.png" />
                            </div>
                            <div class="pro_details">
                                <div class="star_right_img"><a href="#">
                                    <img src="images/star_right.png" />
                                </a></div>
                                 Freezers & Ice Makers <br />
                                <b class="rate_box">$600</b><br />
                                Sold on: Amazon.com<br />
                                Click for Specs and Reviews
                            </div>
                            <div class="rating_box">
                                <span class="star_rating_box2">
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-off.svg" /></span>
                                </span>
                            </div>
                        </li>

                    </ul>


                    <ul>
                        <li data-toggle="modal" data-target="#myModal-6" class="itemlist" id="li_7">
                            <div class="off_right_box">
                                <span>45$  &nbsp;Off</span>
                            </div>
                            <div class="product_img_box">
                                <img src="images/microwave-large.png" />
                            </div>
                            <div class="pro_details">
                                <div class="star_right_img"><a href="#">
                                    <img src="images/star_right.png" />
                                </a></div>
                                 Microwaves<br />
                                <b class="rate_box">$500</b><br />
                                Sold on: Amazon.com<br />
                                Click for Specs and Reviews
                            </div>
                            <div class="rating_box">
                                <span class="star_rating_box2">
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-on.svg" /></span>
                                    <span>
                                        <img src="images/star-off.svg" /></span>
                                </span>
                            </div>
                        </li>

                    </ul>--%>
                </div>


            </div>
            <!-- End .right_content_box -->
            <div id="ProductDetails">

<%--            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="vertical-alignment-helper">
                    <div class="modal-dialog vertical-align-center">
                        <div class="modal-content">
                            <div class="header-modal">
                                <h2>Gas Stoves</h2>
                                <a type="button" class="cross" data-dismiss="modal"></a>
                            </div>
                            <div class="modal-body popup-body">
                                <div class="wrapper-mains">
                                    <div class="wrapper-mains-left">
                                        <img src="images/gas-stove-large.png" alt="ref" class="img-responsive" />
                                    </div>
                                    <div class="wrapper-mains-right right-column-section-area">
                                        <div class="wrapper-sector">
                                            <div class="left-ar">
                                                <h1>$1.425</h1>
                                                <h3>$1,500 MRP</h3>
                                            </div>
                                            <div class="right-ar">
                                                
                                                <div class="exclusive">Exclusive Rebate Price</div>
                                            </div>
                                        </div>
                                        <div class="wrapper-sector">
                                            <a class="btn btn-default btn-purchase">Purchase Now!</a>
                                            <span class="text-formatter">You will be redirected to the sellers site if you wish to purchase this product. Thank you!</span>
                                            <p class="main-formatter">
                                                Many stoves use natural gas to provide heat. In cooking, a gas stove is a cooker/stove which uses natural gas, propane, butane, liquefied petroleum gas or other flammable gas as a fuel source. Prior to the advent of gas, cooking stoves relied on solid fuel such as coal or wood.
						<ul class="rating-star">
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star.png" alt="stars" /></li>
                        </ul>
                                                <span class="rating-text">Rate This Product</span>
                                        </div>
                                        <div class="wrapper-sector">
                                            <div class="left-details">
                                                <h5>Description</h5>
                                                <p> Color: Stainless Steel</p>
                                                <p> Style: Automatic</p>
                                                <span>></span> <a href="">for more details please visit the retailer site</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" style="padding: 0;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
--%>


           <%--  <div class="modal fade" id="myModal-1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="vertical-alignment-helper">
                    <div class="modal-dialog vertical-align-center">
                        <div class="modal-content">
                            <div class="header-modal">
                                <h2> Electric Stoves </h2>
                                <a type="button" class="cross" data-dismiss="modal"></a>
                            </div>
                            <div class="modal-body popup-body">
                                <div class="wrapper-mains">
                                    <div class="wrapper-mains-left">
                                        <img src="images/electric-stove-large.png" alt="ref" class="img-responsive" />
                                    </div>
                                    <div class="wrapper-mains-right right-column-section-area">
                                        <div class="wrapper-sector">
                                            <div class="left-ar">
                                                <h1>$1.425</h1>
                                                <h3>$1,500 MRP</h3>
                                            </div>
                                            <div class="right-ar">
                                                
                                                <div class="exclusive">Exclusive Rebate Price</div>
                                            </div>
                                        </div>
                                        <div class="wrapper-sector">
                                            <a class="btn btn-default btn-purchase">Purchase Now!</a>
                                            <span class="text-formatter">You will be redirected to the sellers site if you wish to purchase this product. Thank you!</span>
                                            <p class="main-formatter">
                                                An electric stove or electric range is a stove that converts electrical energy into heat to cook and ... This section needs additional citations for verification
						<ul class="rating-star">
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star.png" alt="stars" /></li>
                        </ul>
                                                <span class="rating-text">Rate This Product</span>
                                        </div>
                                        <div class="wrapper-sector">
                                            <div class="left-details">
                                                <h5>Description</h5>
                                                <p> Color: Stainless Steel</p>
                                                <p> Style: Automatic</p>
                                                <span>></span> <a href="">for more details please visit the retailer site</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" style="padding: 0;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>




             <div class="modal fade" id="myModal-2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="vertical-alignment-helper">
                    <div class="modal-dialog vertical-align-center">
                        <div class="modal-content">
                            <div class="header-modal">
                                <h2> Dish Washers </h2>
                                <a type="button" class="cross" data-dismiss="modal"></a>
                            </div>
                            <div class="modal-body popup-body">
                                <div class="wrapper-mains">
                                    <div class="wrapper-mains-left">
                                        <img src="images/dishwasher-large.png" alt="ref" class="img-responsive" />
                                    </div>
                                    <div class="wrapper-mains-right right-column-section-area">
                                        <div class="wrapper-sector">
                                            <div class="left-ar">
                                                <h1>$1.425</h1>
                                                <h3>$1,500 MRP</h3>
                                            </div>
                                            <div class="right-ar">
                                                
                                                <div class="exclusive">Exclusive Rebate Price</div>
                                            </div>
                                        </div>
                                        <div class="wrapper-sector">
                                            <a class="btn btn-default btn-purchase">Purchase Now!</a>
                                            <span class="text-formatter">You will be redirected to the sellers site if you wish to purchase this product. Thank you!</span>
                                            <p class="main-formatter">
                                                A dishwasher is a mechanical device for cleaning dishes and eating-utensils. Dishwashers can be found in restaurants and private homes
						<ul class="rating-star">
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star.png" alt="stars" /></li>
                        </ul>
                                                <span class="rating-text">Rate This Product</span>
                                        </div>
                                        <div class="wrapper-sector">
                                            <div class="left-details">
                                                <h5>Description</h5>
                                                <p>Door Style: French Door</p>
                                                <p>Door Color: White</p>
                                                <p>Door Style: Automatic</p>
                                                <span>></span> <a href="">for more details please visit the retailer site</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" style="padding: 0;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>





             <div class="modal fade" id="myModal-3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="vertical-alignment-helper">
                    <div class="modal-dialog vertical-align-center">
                        <div class="modal-content">
                            <div class="header-modal">
                                <h2> Garbage Disposal </h2>
                                <a type="button" class="cross" data-dismiss="modal"></a>
                            </div>
                            <div class="modal-body popup-body">
                                <div class="wrapper-mains">
                                    <div class="wrapper-mains-left">
                                        <img src="images/garbage-disposal-large.png" alt="ref" class="img-responsive" />
                                    </div>
                                    <div class="wrapper-mains-right right-column-section-area">
                                        <div class="wrapper-sector">
                                            <div class="left-ar">
                                                <h1>$1.425</h1>
                                                <h3>$1,500 MRP</h3>
                                            </div>
                                            <div class="right-ar">
                                                
                                                <div class="exclusive">Exclusive Rebate Price</div>
                                            </div>
                                        </div>
                                        <div class="wrapper-sector">
                                            <a class="btn btn-default btn-purchase">Purchase Now!</a>
                                            <span class="text-formatter">You will be redirected to the sellers site if you wish to purchase this product. Thank you!</span>
                                            <p class="main-formatter">
                                                Waste management is all the activities and actions required to manage waste from its inception to its final disposal
						<ul class="rating-star">
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star.png" alt="stars" /></li>
                        </ul>
                                                <span class="rating-text">Rate This Product</span>
                                        </div>
                                        <div class="wrapper-sector">
                                            <div class="left-details">
                                                <h5>Description</h5>
                                                <p>Door Color: Stainless Steel</p>
                                                <p>Door Style: Automatic</p>
                                                <span>></span> <a href="">for more details please visit the retailer site</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" style="padding: 0;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>



             <div class="modal fade" id="myModal-4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="vertical-alignment-helper">
                    <div class="modal-dialog vertical-align-center">
                        <div class="modal-content">
                            <div class="header-modal">
                                <h2> Refrigerators</h2>
                                <a type="button" class="cross" data-dismiss="modal"></a>
                            </div>
                            <div class="modal-body popup-body">
                                <div class="wrapper-mains">
                                    <div class="wrapper-mains-left">
                                        <img src="images/ref-icon.png" alt="ref" class="img-responsive" />
                                    </div>
                                    <div class="wrapper-mains-right right-column-section-area">
                                        <div class="wrapper-sector">
                                            <div class="left-ar">
                                                <h1>$1.425</h1>
                                                <h3>$1,500 MRP</h3>
                                            </div>
                                            <div class="right-ar">
                                               
                                                <div class="exclusive">Exclusive Rebate Price</div>
                                            </div>
                                        </div>
                                        <div class="wrapper-sector">
                                            <a class="btn btn-default btn-purchase">Purchase Now!</a>
                                            <span class="text-formatter">You will be redirected to the sellers site if you wish to purchase this product. Thank you!</span>
                                            <p class="main-formatter">
                                                GE Profile PFE28RSHSS 36" French Door Refrigerator with 27.7 cu. ft. Capacity 5 Shelves Dual Icemaker TwinChill Evaporators Showcase LED Lighting Hands-Free AutoFill and Color LCD Screen in Stainless by General Electric
						<ul class="rating-star">
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star.png" alt="stars" /></li>
                        </ul>
                                                <span class="rating-text">Rate This Product</span>
                                        </div>
                                        <div class="wrapper-sector">
                                            <div class="left-details">
                                                <h5>Description</h5>
                                                <p>Door Style: French Door</p>
                                                <p>Door Color: Stainless Steel</p>
                                                <p>Ice Dispenser: Yes</p>
                                                <p>Child Lock: Yes</p>
                                                <p>Door Style: Automatic</p>
                                                <span>></span> <a href="">for more details please visit the retailer site</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" style="padding: 0;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>


             <div class="modal fade" id="myModal-5" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="vertical-alignment-helper">
                    <div class="modal-dialog vertical-align-center">
                        <div class="modal-content">
                            <div class="header-modal">
                                <h2> Freezers & Ice Makers </h2>
                                <a type="button" class="cross" data-dismiss="modal"></a>
                            </div>
                            <div class="modal-body popup-body">
                                <div class="wrapper-mains">
                                    <div class="wrapper-mains-left">
                                        <img src="images/freeze-ice-maker-large.png" alt="ref" class="img-responsive" />
                                    </div>
                                    <div class="wrapper-mains-right right-column-section-area">
                                        <div class="wrapper-sector">
                                            <div class="left-ar">
                                                <h1>$1.425</h1>
                                                <h3>$1,500 MRP</h3>
                                            </div>
                                            <div class="right-ar">
                                               
                                                <div class="exclusive">Exclusive Rebate Price</div>
                                            </div>
                                        </div>
                                        <div class="wrapper-sector">
                                            <a class="btn btn-default btn-purchase">Purchase Now!</a>
                                            <span class="text-formatter">You will be redirected to the sellers site if you wish to purchase this product. Thank you!</span>
                                            <p class="main-formatter">
                                               It is also removable, and helps to prevent ice-maker clogging. A cooling zone in the refrigerator door shelves. Air from the freezer section is diverted to the refrigerator door, to cool milk or juice stored in the door shelf.
						<ul class="rating-star">
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star.png" alt="stars" /></li>
                        </ul>
                                                <span class="rating-text">Rate This Product</span>
                                        </div>
                                        <div class="wrapper-sector">
                                            <div class="left-details">
                                                <h5>Description</h5>
                                                <p>Door Style: French Door</p>
                                                <p>Door Color: Stainless Steel</p>
                                                <p>Ice Dispenser: Yes</p>
                                                <p>Child Lock: Yes</p>
                                                <p>Door Style: Automatic</p>
                                                <span>></span> <a href="">for more details please visit the retailer site</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" style="padding: 0;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>


             <div class="modal fade" id="myModal-6" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="vertical-alignment-helper">
                    <div class="modal-dialog vertical-align-center">
                        <div class="modal-content">
                            <div class="header-modal">
                                <h2>Microwaves</h2>
                                <a type="button" class="cross" data-dismiss="modal"></a>
                            </div>
                            <div class="modal-body popup-body">
                                <div class="wrapper-mains">
                                    <div class="wrapper-mains-left">
                                        <img src="images/microwave-large.png" alt="ref" class="img-responsive" />
                                    </div>
                                    <div class="wrapper-mains-right right-column-section-area">
                                        <div class="wrapper-sector">
                                            <div class="left-ar">
                                                <h1>$1.425</h1>
                                                <h3>$1,500 MRP</h3>
                                            </div>
                                            <div class="right-ar">
                                                
                                                <div class="exclusive">Exclusive Rebate Price</div>
                                            </div>
                                        </div>
                                        <div class="wrapper-sector">
                                            <a class="btn btn-default btn-purchase">Purchase Now!</a>
                                            <span class="text-formatter">You will be redirected to the sellers site if you wish to purchase this product. Thank you!</span>
                                            <p class="main-formatter">
                                                A microwave oven (commonly called a microwave) is a machine that cooks food using microwaves, a type of radio wave
						<ul class="rating-star">
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star-active.png" alt="stars" /></li>
                            <li>
                                <img src="images/star.png" alt="stars" /></li>
                        </ul>
                                                <span class="rating-text">Rate This Product</span>
                                        </div>
                                        <div class="wrapper-sector">
                                            <div class="left-details">
                                                <h5>Description</h5>
                                                <p>Door Style: French Door</p>
                                                <p>Door Color: Stainless Steel</p>
                                                <p>Door Style: Automatic</p>
                                                <span>></span> <a href="">for more details please visit the retailer site</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" style="padding: 0;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>--%>

            </div>

        </div>
    </div>


         <div id="page_loader">
        </div>
</section>

</asp:Content>
