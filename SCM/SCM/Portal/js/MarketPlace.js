$(document).ready(function () {
    $('#hdnParamCategoryId').val(1);
    LISTCategory();
    HighlightCategoryOnSelection();
    //LISTSubCategory();
    //List_ProductDetails();
   
});

function HighlightCategoryOnSelection() {
        $("#sizelist").on("click", "a", function (e) {
        e.preventDefault();
        var $this = $(this).parent();
        $this.addClass("active").siblings().removeClass("active");
        })

}

function LISTCategory()
{
  
    
    if ($('#hdnParammode').val() == '') {
        $('#hdnParammode').val('0');
        mode = 0;
    }
    else
    {
        mode = $('#hdnParammode').val();

    }
    if ($('#hdnParamCategoryId').val() == '') {
        $('#hdnParamCategoryId').val('0');
        CategoryId = 0;
    }
    else {
        CategoryId = $('#hdnParamCategoryId').val();

    }

    if ($('#hdnParamSubCategoryId').val() == '') {
        $('#hdnParamSubCategoryId').val('0');
        SubCategoryIds = 0;
    }
    else {
        SubCategoryIds = $('#hdnParamSubCategoryId').val();

    }

    if ($('#hdnParamItemId').val() == '') {
        $('#hdnParamItemId').val('0');
        ItemId = 0;
    }
    else {
        ItemId = $('#hdnParamItemId').val();

    }




    var param = {
        Mode: mode,
        CategoryId: CategoryId,
        SubCategoryIds: SubCategoryIds,
        ItemId: ItemId
           }
 
  
    $.ajax({
        type: "POST",
        url: "MarketPlace.aspx/SelectMainCategory",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function(data) {
            
            loader.showloader();
            data = data.d;
            $.each(JSON.parse(data), function (i, item) {
                var itemName_1 = item.CategoryId;
                var className = '';
                if (itemName_1 == "1") {
                    className = 'icon_kitchen'
                }
                else if (itemName_1 == "2") {
                    className = 'icon_laundry'
                }
                else if (itemName_1 == "3") {
                    className = 'icon_colling';
                }
                else if (itemName_1 == "4") {
                    className = 'icon_home_ofc';
                }

                else if (itemName_1 == "5") {
                    className = 'icon_electronics';
                }
                if (i == 0) {
                    $("#sizelist").append('<li class= "' + className + ' categ active" onclick="ClickCtegory(' + item.CategoryId + ');"  id=' + item.CategoryId + '><a href="#">' + item.Name + '</a></li>');
                }
                else {
                    $("#sizelist").append('<li class= "' + className + ' categ" onclick="ClickCtegory(' + item.CategoryId + ');" id=' + item.CategoryId + '><a href="#">' + item.Name + '</a></li>');
                }
            });
            LISTSubCategory();
        },
        error: OnError
    });


   
}


function LISTSubCategory() {
 

    var param = {
        Mode: 1,
        CategoryId: 1,
        SubCategoryIds: 0,
        ItemId: 0,
    }
    //$('#hdnParamValues').val(convertlocaltoutc(dtFrom) + '|' + convertlocaltoutc(dtTo) + '|' + mode + '|' + city  + '|' + ddlAccountType + '|' + unit);

    $.ajax({
        type: "POST",
        url: "MarketPlace.aspx/SelectMainCategory",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: OnSuccess_subCategory,
        error: OnError_subCategory
    });



}


function List_ProductDetails()
{
   // var ProductDeatils = [{ offer: '45$  Off', imageName: 'gas-stove-large.png', Name: 'Gas Stoves', Price: '$800', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'electric-stove-large.png', Name: ' Electric Stoves', Price: '$550', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'dishwasher-large.png', Name: 'Dish Washers', Price: '$700', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'garbage-disposal-large.png', Name: 'Garbage Disposal', Price: '$1000', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'referegirator_img.png', Name: 'Refrigerator', Price: '$900', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'freeze-ice-maker-large.png', Name: 'Freezers & Ice Makers', Price: '$600', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'microwave-large.png', Name: 'Microwaves', Price: '$500', Vendor: 'Amazon.com' }];
    debugger;
    var prdSubCategoryId = $('#hdnParamSubCategoryId').val();
            
    var param = {
        Mode: 2,
        CategoryId: 1,
        SubCategoryIds: prdSubCategoryId,
        ItemId: 0,
    }
    //$('#hdnParamValues').val(convertlocaltoutc(dtFrom) + '|' + convertlocaltoutc(dtTo) + '|' + mode + '|' + city  + '|' + ddlAccountType + '|' + unit);

    $.ajax({
        type: "POST",
        url: "MarketPlace.aspx/SelectMainCategory",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: OnSuccess_prod_details,
        error: OnError_prod_details
    });




    //$.each(ProductDeatils, function (i, item) {
    //    var ulProductDesc = '<ul> <li data-toggle="modal" data-target=#myModal-' + i + ' class="itemlist" id=li_' + i + '><div class="off_right_box"><span>' + item.offer + '</span></div> <div class="product_img_box"><img src=images/' + item.imageName + ' /></div><div class="pro_details"><div class="star_right_img"><a href="#"><img src="images/star_right.png" /></a></div> ' + item.Name + '<br /> <b class="rate_box">' + item.Price + '</b><br /> Sold on: ' + item.Vendor + '<br /> Click for Specs and Reviews </div>   <div class="rating_box"> <span class="star_rating_box2"><span> <img src="images/star-on.svg" /></span> <span>    <img src="images/star-on.svg" /></span>  <span> <img src="images/star-on.svg" /></span>     <span> <img src="images/star-on.svg" /></span> <span>   <img src="images/star-off.svg" /></span></span> </div>   </li>  </ul>';
        
    //    $(".shopping_main_box").append(ulProductDesc);
    //});


}



function List_ProductDetails_modelPoppUp(ItemId) {
    // var ProductDeatils = [{ offer: '45$  Off', imageName: 'gas-stove-large.png', Name: 'Gas Stoves', Price: '$800', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'electric-stove-large.png', Name: ' Electric Stoves', Price: '$550', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'dishwasher-large.png', Name: 'Dish Washers', Price: '$700', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'garbage-disposal-large.png', Name: 'Garbage Disposal', Price: '$1000', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'referegirator_img.png', Name: 'Refrigerator', Price: '$900', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'freeze-ice-maker-large.png', Name: 'Freezers & Ice Makers', Price: '$600', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'microwave-large.png', Name: 'Microwaves', Price: '$500', Vendor: 'Amazon.com' }];
    debugger;
   // var prdSubCategoryId = $('#hdnParamSubCategoryId').val();

    var param = {
        Mode: 3,
        CategoryId: 1,
        SubCategoryIds: 0,
        ItemId: ItemId,
    }
    //$('#hdnParamValues').val(convertlocaltoutc(dtFrom) + '|' + convertlocaltoutc(dtTo) + '|' + mode + '|' + city  + '|' + ddlAccountType + '|' + unit);

    $.ajax({
        type: "POST",
        url: "MarketPlace.aspx/SelectMainCategory",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: OnSuccess_prod_details_modelPopUp,
        error: OnError_prod_details_modelPopUp
    });




    //$.each(ProductDeatils, function (i, item) {
    //    var ulProductDesc = '<ul> <li data-toggle="modal" data-target=#myModal-' + i + ' class="itemlist" id=li_' + i + '><div class="off_right_box"><span>' + item.offer + '</span></div> <div class="product_img_box"><img src=images/' + item.imageName + ' /></div><div class="pro_details"><div class="star_right_img"><a href="#"><img src="images/star_right.png" /></a></div> ' + item.Name + '<br /> <b class="rate_box">' + item.Price + '</b><br /> Sold on: ' + item.Vendor + '<br /> Click for Specs and Reviews </div>   <div class="rating_box"> <span class="star_rating_box2"><span> <img src="images/star-on.svg" /></span> <span>    <img src="images/star-on.svg" /></span>  <span> <img src="images/star-on.svg" /></span>     <span> <img src="images/star-on.svg" /></span> <span>   <img src="images/star-off.svg" /></span></span> </div>   </li>  </ul>';

    //    $(".shopping_main_box").append(ulProductDesc);
    //});


}


function OnSuccess(data, status) {
    loader.showloader();
    data = data.d;
    $.each(JSON.parse(data), function (i, item) {
        var itemName_1 = item.CategoryId;
        var className = '';
        if (itemName_1 == "1")
        {
            className = 'icon_kitchen'
        }
        else if (itemName_1 == "2")
        {
            className = 'icon_laundry'
        }
        else if (itemName_1 == "3") {
            className = 'icon_colling';
        }
        else if (itemName_1 == "4") {
            className = 'icon_home_ofc';
        }
     
        else if (itemName_1 == "5") {
            className = 'icon_electronics';
        }
        if (i == 0) {
            $("#sizelist").append('<li class= "'+className+ ' categ active" onclick="ClickCtegory(' + item.CategoryId + ');"  id=' + item.CategoryId + '><a href="#">' + item.Name + '</a></li>');
        }
        else {
            $("#sizelist").append('<li class= "' + className + ' categ" onclick="ClickCtegory(' + item.CategoryId + ');" id=' + item.CategoryId + '><a href="#">' + item.Name + '</a></li>');
        }
    });
    LISTSubCategory();
  
}

function OnError(request, status, error) {
    loader.hideloader();
    console.log('Error!! ' + request.statusText);
}



function OnSuccess_subCategory(data, status) {
    $('#hdnParamSubCategoryId').val('');
    data = data.d;
    var k = '';
    $.each(JSON.parse(data), function (i, item) {
        var div_new_create = ' <div class="name_listing"><input type="checkbox" onclick="ClickSubCtegory(' + item.SubCategoryId + ');" id=' + item.SubCategoryId + ' class="item" checked><span>' + item.Name + '  </span></div>';
        $(".prod_list").append(div_new_create);
        k = k+',' + item.SubCategoryId
       
    });

    $('#hdnParamSubCategoryId').val(k);


  //  $(".prod_list").append('<div class="name_listing"><b>Price Range</b></div>');



    //var SubCategoriesPricerange = [{ subcat_price: 'Under $500 (1)' }, { subcat_price: '$500-$1,000 (2)' }, { subcat_price: '$1,000 - $2,000 (2)' }, { subcat_price: '$2,000 - $3,000 (2)' }];

    //$.each(SubCategoriesPricerange, function (i, item) {
    //    var div_new_create_price = '  <div class="name_listing"> <input type="checkbox"><span>' + item.subcat_price + '</span> </div>';
    //    $(".prod_list").append(div_new_create_price);
    //});
  
    List_ProductDetails();
}

function OnError_subCategory(request, status, error) {
    loader.hideloader();
    console.log('Error!! ' + request.statusText);
}




function OnSuccess_prod_details(data, status) {
    data = data.d;
    $.each(JSON.parse(data), function (i, item) {

        var display = "block";
        if (item.Offer == "")
            display = "none";

        
        //var ulProductDesc = '<ul> <li data-toggle="modal" data-target=#myModal-' + item.ItemId + ' class="itemlist" id=li_' + item.ItemId + '><div class="off_right_box"><span>' + item.Offer + '</span></div> <div class="product_img_box"><img src= images/' + item.ImagePath + ' /></div><div class="pro_details"><div class="star_right_img"><a href="#"><img src="images/star_right.png" /></a></div> ' + item.ItemName + '<br /> <b class="rate_box">' + item.Price + '</b><br /> Sold on: ' + item.Vendor + '<br /> Click for Specs and Reviews </div>   <div class="rating_box"> <span class="star_rating_box2"><span> <img src="images/star-on.svg" /></span> <span>    <img src="images/star-on.svg" /></span>  <span> <img src="images/star-on.svg" /></span>     <span> <img src="images/star-on.svg" /></span> <span>   <img src="images/star-off.svg" /></span></span> </div>   </li>  </ul>';
        var ulProductDesc = '<ul> <li data-toggle="modal" data-target=#myModal-' + item.ItemId + ' class="itemlist" id=li_' + item.ItemId + '><div class="off_right_box" style = "display:' + display + '"><span>' + item.Offer + '</span></div> <div class="product_img_box"><img src="Upload.ashx?imagename=' + item.ImagePath + '&Path=marketplace"/></div><div class="pro_details"><div class="star_right_img"><a href="#"><img src="images/star_right.png" /></a></div> ' + item.ItemName + '<br /> <b class="rate_box">$' + item.Price + '</b><br /> Sold on: ' + item.Vendor + '<br /> Click for Specs and Reviews </div>   <div class="rating_box"> <span class="star_rating_box2"><span> <img src="images/star-on.svg" /></span> <span>    <img src="images/star-on.svg" /></span>  <span> <img src="images/star-on.svg" /></span>     <span> <img src="images/star-on.svg" /></span> <span>   <img src="images/star-off.svg" /></span></span> </div>   </li>  </ul>';

        $(".shopping_main_box").append(ulProductDesc);

        List_ProductDetails_modelPoppUp(item.ItemId);

    });

   

}

function OnError_prod_details(request, status, error) {
    loader.hideloader();
    console.log('Error!! ' + request.statusText);
}



function OnSuccess_prod_details_modelPopUp(data, status) {
    data = data.d;
    $.each(JSON.parse(data), function (i, item) {
   
        //var ulProductDesc = '<div class="modal fade" id=myModal-' + item.ItemId + ' tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">  <div class="vertical-alignment-helper">   <div class="modal-dialog vertical-align-center">    <div class="modal-content">    <div class="header-modal">  <h2>' + item.ItemName + '</h2> <a type="button" class="cross" data-dismiss="modal"></a> </div> <div class="modal-body popup-body">  <div class="wrapper-mains"> <div class="wrapper-mains-left"> <img src= "Upload.ashx?imagename=' + item.ImagePath + '&Path=marketplace" alt="ref" class="img-responsive" /> </div>   <div class="wrapper-mains-right right-column-section-area">  <div class="wrapper-sector"> <div class="left-ar"> <h1>$' + item.PriceAfterDiscount + '</h1> <h3>$' + item.Price + ' MRP</h3>  </div>   <div class="right-ar"> <div class="exclusive">Exclusive Rebate Price</div>  </div>  </div> <div class="wrapper-sector"> <a class="btn btn-default btn-purchase" target="_blank" href="'+item.URL+'">Purchase Now!</a> <span class="text-formatter">You will be redirected to the sellers site if you wish to purchase this product. Thank you!</span> <p class="main-formatter"> ' + item.ItemDescription + '		<ul class="rating-star">  <li><img src="images/star-active.png" alt="stars" /></li>  <li> <img src="images/star-active.png" alt="stars" /></li> <li> <img src="images/star-active.png" alt="stars" /></li>  <li>  <img src="images/star-active.png" alt="stars" /></li> <li>   <img src="images/star.png" alt="stars" /></li>   </ul>  <span class="rating-text">Rate This Product</span>   </div>      <div class="wrapper-sector"> <div class="left-details">  <h5>Description</h5>   <p> Color: ' + item.Color + '</p>  <p> Style: ' + item.Style + '</p> <span></span> <a href="">for more details please visit the retailer site</a></div> </div> </div></div></div><div class="modal-footer" style="padding: 0;"></div> </div></div></div></div>'
        var ulProductDesc = '<div class="modal fade" id=myModal-' + item.ItemId + ' tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">  <div class="vertical-alignment-helper">   <div class="modal-dialog vertical-align-center">    <div class="modal-content">    <div class="header-modal">  <h2>' + item.ItemName + '</h2> <a type="button" class="cross" data-dismiss="modal"></a> </div> <div class="modal-body popup-body">  <div class="wrapper-mains"> <div class="wrapper-mains-left"> <img src= "Upload.ashx?imagename=' + item.ImagePath + '&Path=marketplace" alt="ref" class="img-responsive" /> </div>   <div class="wrapper-mains-right right-column-section-area">  <div class="wrapper-sector"> <div class="left-ar"> <h1>$' + item.PriceAfterDiscount + '</h1> <h3>$' + item.Price + ' MRP</h3>  </div>   <div class="right-ar"> <div class="exclusive">Exclusive Rebate Price</div>  </div>  </div> <div class="wrapper-sector"> <a class="btn btn-default btn-purchase" target="_blank" href="' + item.URL + '">Purchase Now!</a> <span class="text-formatter">You will be redirected to the sellers site if you wish to purchase this product. Thank you!</span> <p class="main-formatter"> ' + item.ItemDescription + '		<ul class="rating-star">  <li><img src="images/star-active.png" alt="stars" /></li>  <li> <img src="images/star-active.png" alt="stars" /></li> <li> <img src="images/star-active.png" alt="stars" /></li>  <li>  <img src="images/star-active.png" alt="stars" /></li> <li>   <img src="images/star.png" alt="stars" /></li>   </ul>  <span class="rating-text">Rate This Product</span>   </div>      <div class="wrapper-sector"> <div class="left-details">  <h5>Description</h5>   <p> Color: ' + item.Color + '</p>  <p> Style: ' + item.Style + '</p> <span></span> <a target="_blank" href="' + item.URL + '">for more details please visit the retailer site</a></div> </div> </div></div></div><div class="modal-footer" style="padding: 0;"></div> </div></div></div></div>'

        $("#ProductDetails").append(ulProductDesc);



    });

    loader.hideloader();

}

function OnError_prod_details_modelPopUp(request, status, error) {
    loader.hideloader();
    console.log('Error!! ' + request.statusText);
}



function ClickCtegory(CategoryId)
{
    loader.showloader();
    //console.log(CategoryId);
    $('#hdnParamCategoryId').val(CategoryId);
    $('.prod_list').html('');
    $('.shopping_main_box').html('');
    $('#ProductDetails').html('');
    LISTSubCategory_change(CategoryId)
    loader.hideloader();
}

function LISTSubCategory_change(CategoryId) {
    //var SubCategories = [{ subcat: 'Gas Stoves' }, { subcat: 'Electric Stoves' }, { subcat: 'Dish Washers' }, { subcat: 'Garbage Disposal' }, { subcat: 'Refrigerators' }, { subcat: 'Freezers & Ice Makers' }, { subcat: 'Microwaves' }];

    var param = {
        Mode: 1,
        CategoryId: CategoryId,
        SubCategoryIds: 0,
        ItemId: 0,
    }
    //$('#hdnParamValues').val(convertlocaltoutc(dtFrom) + '|' + convertlocaltoutc(dtTo) + '|' + mode + '|' + city  + '|' + ddlAccountType + '|' + unit);

    $.ajax({
        type: "POST",
        url: "MarketPlace.aspx/SelectMainCategory",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: OnSuccess_subCategory_change,
        error: OnError_subCategory_change
    });
}


function OnSuccess_subCategory_change(data, status) {
   
    try {
       
        $('#hdnParamSubCategoryId').val('');
        //$('.prod_list').html('');
        data = data.d;
        if (JSON.parse(data).length > 0) {
            loader.showloader();
            var k = '';
            var CategoryId = '';
            $.each(JSON.parse(data), function (i, item) {
                var div_new_create = ' <div class="name_listing"><input type="checkbox" onclick="ClickSubCtegory(' + item.SubCategoryId + ');" id=' + item.SubCategoryId + ' class="item" checked><span>' + item.Name + ' </span></div>';
                $(".prod_list").append(div_new_create);
                k = k + ',' + item.SubCategoryId
                CategoryId = item.CategoryId;
            });

            $('#hdnParamSubCategoryId').val(k);


            //$(".prod_list").append('<div class="name_listing"><b>Price Range</b></div>');



            //var SubCategoriesPricerange = [{ subcat_price: 'Under $500 (1)' }, { subcat_price: '$500-$1,000 (2)' }, { subcat_price: '$1,000 - $2,000 (2)' }, { subcat_price: '$2,000 - $3,000 (2)' }];

            //$.each(SubCategoriesPricerange, function (i, item) {
            //    var div_new_create_price = '  <div class="name_listing"> <input type="checkbox"><span>' + item.subcat_price + '</span> </div>';
            //    $(".prod_list").append(div_new_create_price);
            //});

            List_ProductDetails_change(CategoryId)
        }
    }
    catch( err)
    {
        loader.hideloader();
    }
}


function OnError_subCategory_change(request, status, error) {
    loader.hideloader();
  
}



function List_ProductDetails_change(CategoryId) {
    // var ProductDeatils = [{ offer: '45$  Off', imageName: 'gas-stove-large.png', Name: 'Gas Stoves', Price: '$800', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'electric-stove-large.png', Name: ' Electric Stoves', Price: '$550', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'dishwasher-large.png', Name: 'Dish Washers', Price: '$700', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'garbage-disposal-large.png', Name: 'Garbage Disposal', Price: '$1000', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'referegirator_img.png', Name: 'Refrigerator', Price: '$900', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'freeze-ice-maker-large.png', Name: 'Freezers & Ice Makers', Price: '$600', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'microwave-large.png', Name: 'Microwaves', Price: '$500', Vendor: 'Amazon.com' }];
    try {
        var prdSubCategoryId = $('#hdnParamSubCategoryId').val();

        var param = {
            Mode: 2,
            CategoryId: CategoryId,
            SubCategoryIds: prdSubCategoryId,
            ItemId: 0,
        }
        //$('#hdnParamValues').val(convertlocaltoutc(dtFrom) + '|' + convertlocaltoutc(dtTo) + '|' + mode + '|' + city  + '|' + ddlAccountType + '|' + unit);

        $.ajax({
            type: "POST",
            url: "MarketPlace.aspx/SelectMainCategory",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: OnSuccess_prod_details_change,
            error: OnError_prod_details_change
        });




        //$.each(ProductDeatils, function (i, item) {
        //    var ulProductDesc = '<ul> <li data-toggle="modal" data-target=#myModal-' + i + ' class="itemlist" id=li_' + i + '><div class="off_right_box"><span>' + item.offer + '</span></div> <div class="product_img_box"><img src=images/' + item.imageName + ' /></div><div class="pro_details"><div class="star_right_img"><a href="#"><img src="images/star_right.png" /></a></div> ' + item.Name + '<br /> <b class="rate_box">' + item.Price + '</b><br /> Sold on: ' + item.Vendor + '<br /> Click for Specs and Reviews </div>   <div class="rating_box"> <span class="star_rating_box2"><span> <img src="images/star-on.svg" /></span> <span>    <img src="images/star-on.svg" /></span>  <span> <img src="images/star-on.svg" /></span>     <span> <img src="images/star-on.svg" /></span> <span>   <img src="images/star-off.svg" /></span></span> </div>   </li>  </ul>';

        //    $(".shopping_main_box").append(ulProductDesc);
        //});
    }
    catch (err) {
        loader.hideloader();
    }

}


function OnSuccess_prod_details_change(data, status) {
    try
    {
        data = data.d;
        if (JSON.parse(data).length > 0) {
            $.each(JSON.parse(data), function (i, item) {
                var display = "block";
                if (item.Offer == "")
                    display = "none";

              
                //var ulProductDesc = '<ul> <li data-toggle="modal" data-target=#myModal-' + item.ItemId + ' class="itemlist" id=li_' + item.ItemId + '><div class="off_right_box"><span>' + item.Offer + '</span></div> <div class="product_img_box"><img src=images/' + item.ImagePath + ' /></div><div class="pro_details"><div class="star_right_img"><a href="#"><img src="images/star_right.png" /></a></div> ' + item.ItemName + '<br /> <b class="rate_box">' + item.Price + '</b><br /> Sold on: ' + item.Vendor + '<br /> Click for Specs and Reviews </div>   <div class="rating_box"> <span class="star_rating_box2"><span> <img src="images/star-on.svg" /></span> <span>    <img src="images/star-on.svg" /></span>  <span> <img src="images/star-on.svg" /></span>     <span> <img src="images/star-on.svg" /></span> <span>   <img src="images/star-off.svg" /></span></span> </div>   </li>  </ul>';
                var ulProductDesc = '<ul> <li data-toggle="modal" data-target=#myModal-' + item.ItemId + ' class="itemlist" id=li_' + item.ItemId + '><div class="off_right_box"   style = "display:' + display + '";><span>' + item.Offer + '</span></div> <div class="product_img_box"><img src="Upload.ashx?imagename=' + item.ImagePath + '&Path=marketplace" /></div><div class="pro_details"><div class="star_right_img"><a href="#"><img src="images/star_right.png" /></a></div> ' + item.ItemName + '<br /> <b class="rate_box">$' + item.Price + '</b><br /> Sold on: ' + item.Vendor + '<br /> Click for Specs and Reviews </div>   <div class="rating_box"> <span class="star_rating_box2"><span> <img src="images/star-on.svg" /></span> <span>    <img src="images/star-on.svg" /></span>  <span> <img src="images/star-on.svg" /></span>     <span> <img src="images/star-on.svg" /></span> <span>   <img src="images/star-off.svg" /></span></span> </div>   </li>  </ul>';

                $(".shopping_main_box").append(ulProductDesc);

                List_ProductDetails_modelPoppUp_change(item.ItemId, $('#hdnParamCategoryId').val());

            });
        }
        else {
            loader.hideloader();
        }
    }
    catch (err) {
        loader.hideloader();
    }


}

function OnError_prod_details_change(request, status, error) {
    loader.hideloader();
    console.log('Error!! ' + request.statusText);
}



function List_ProductDetails_modelPoppUp_change(ItemId, CategoryId) {
    try
    {
        // var ProductDeatils = [{ offer: '45$  Off', imageName: 'gas-stove-large.png', Name: 'Gas Stoves', Price: '$800', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'electric-stove-large.png', Name: ' Electric Stoves', Price: '$550', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'dishwasher-large.png', Name: 'Dish Washers', Price: '$700', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'garbage-disposal-large.png', Name: 'Garbage Disposal', Price: '$1000', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'referegirator_img.png', Name: 'Refrigerator', Price: '$900', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'freeze-ice-maker-large.png', Name: 'Freezers & Ice Makers', Price: '$600', Vendor: 'Amazon.com' }, { offer: '45$  Off', imageName: 'microwave-large.png', Name: 'Microwaves', Price: '$500', Vendor: 'Amazon.com' }];
        debugger;
        // var prdSubCategoryId = $('#hdnParamSubCategoryId').val();

        var param = {
            Mode: 3,
            CategoryId: CategoryId,
            SubCategoryIds: 0,
            ItemId: ItemId,
        }
        //$('#hdnParamValues').val(convertlocaltoutc(dtFrom) + '|' + convertlocaltoutc(dtTo) + '|' + mode + '|' + city  + '|' + ddlAccountType + '|' + unit);

        $.ajax({
            type: "POST",
            url: "MarketPlace.aspx/SelectMainCategory",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: OnSuccess_prod_details_modelPopUp_change,
            error: OnError_prod_details_modelPopUp_chnage
        });




        //$.each(ProductDeatils, function (i, item) {
        //    var ulProductDesc = '<ul> <li data-toggle="modal" data-target=#myModal-' + i + ' class="itemlist" id=li_' + i + '><div class="off_right_box"><span>' + item.offer + '</span></div> <div class="product_img_box"><img src=images/' + item.imageName + ' /></div><div class="pro_details"><div class="star_right_img"><a href="#"><img src="images/star_right.png" /></a></div> ' + item.Name + '<br /> <b class="rate_box">' + item.Price + '</b><br /> Sold on: ' + item.Vendor + '<br /> Click for Specs and Reviews </div>   <div class="rating_box"> <span class="star_rating_box2"><span> <img src="images/star-on.svg" /></span> <span>    <img src="images/star-on.svg" /></span>  <span> <img src="images/star-on.svg" /></span>     <span> <img src="images/star-on.svg" /></span> <span>   <img src="images/star-off.svg" /></span></span> </div>   </li>  </ul>';

        //    $(".shopping_main_box").append(ulProductDesc);
        //});

    }
    catch (err) {
        loader.hideloader();
    }
}


function OnSuccess_prod_details_modelPopUp_change(data, status) {
    try
    {
        data = data.d;
        $.each(JSON.parse(data), function (i, item) {
            //    var ulProductDesc = '<ul> <li data-toggle="modal" data-target=#myModal-' + item.ItemId + ' class="itemlist" id=li_' + item.ItemId + '><div class="off_right_box"><span>' + item.Offer + '</span></div> <div class="product_img_box"><img src=images/' + item.ImagePath + ' /></div><div class="pro_details"><div class="star_right_img"><a href="#"><img src="images/star_right.png" /></a></div> ' + item.ItemName + '<br /> <b class="rate_box">' + item.Price + '</b><br /> Sold on: ' + item.Vendor + '<br /> Click for Specs and Reviews </div>   <div class="rating_box"> <span class="star_rating_box2"><span> <img src="images/star-on.svg" /></span> <span>    <img src="images/star-on.svg" /></span>  <span> <img src="images/star-on.svg" /></span>     <span> <img src="images/star-on.svg" /></span> <span>   <img src="images/star-off.svg" /></span></span> </div>   </li>  </ul>';

            //var ulProductDesc = '<div class="modal fade" id=myModal-' + item.ItemId + ' tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">  <div class="vertical-alignment-helper">   <div class="modal-dialog vertical-align-center">    <div class="modal-content">    <div class="header-modal">  <h2>' + item.ItemName + '</h2> <a type="button" class="cross" data-dismiss="modal"></a> </div> <div class="modal-body popup-body">  <div class="wrapper-mains"> <div class="wrapper-mains-left"> <img src=images/' + item.ImagePath + ' alt="ref" class="img-responsive" /> </div>   <div class="wrapper-mains-right right-column-section-area">  <div class="wrapper-sector"> <div class="left-ar"> <h1>$' + item.PriceAfterDiscount + '</h1> <h3>$' + item.Price + ' MRP</h3>  </div>   <div class="right-ar"> <div class="exclusive">Exclusive Rebate Price</div>  </div>  </div> <div class="wrapper-sector"> <a class="btn btn-default btn-purchase">Purchase Now!</a> <span class="text-formatter">You will be redirected to the sellers site if you wish to purchase this product. Thank you!</span> <p class="main-formatter"> ' + item.ItemDescription + '		<ul class="rating-star">  <li><img src="images/star-active.png" alt="stars" /></li>  <li> <img src="images/star-active.png" alt="stars" /></li> <li> <img src="images/star-active.png" alt="stars" /></li>  <li>  <img src="images/star-active.png" alt="stars" /></li> <li>   <img src="images/star.png" alt="stars" /></li>   </ul>  <span class="rating-text">Rate This Product</span>   </div>      <div class="wrapper-sector"> <div class="left-details">  <h5>Description</h5>   <p> Color: ' + item.Color + '</p>  <p> Style: ' + item.Style + '</p> <span></span> <a href="">for more details please visit the retailer site</a></div> </div> </div></div></div><div class="modal-footer" style="padding: 0;"></div> </div></div></div></div>'
            var ulProductDesc = '<div class="modal fade" id=myModal-' + item.ItemId + ' tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">  <div class="vertical-alignment-helper">   <div class="modal-dialog vertical-align-center">    <div class="modal-content">    <div class="header-modal">  <h2>' + item.ItemName + '</h2> <a type="button" class="cross" data-dismiss="modal"></a> </div> <div class="modal-body popup-body">  <div class="wrapper-mains"> <div class="wrapper-mains-left"> <img src="Upload.ashx?imagename=' + item.ImagePath + '&Path=marketplace" alt="ref" class="img-responsive" /> </div>   <div class="wrapper-mains-right right-column-section-area">  <div class="wrapper-sector"> <div class="left-ar"> <h1>$' + item.PriceAfterDiscount + '</h1> <h3>$' + item.Price + ' MRP</h3>  </div>   <div class="right-ar"> <div class="exclusive">Exclusive Rebate Price</div>  </div>  </div> <div class="wrapper-sector"> <a class="btn btn-default btn-purchase" href="' + item.URL + '" target="_blank">Purchase Now!</a> <span class="text-formatter">You will be redirected to the sellers site if you wish to purchase this product. Thank you!</span> <p class="main-formatter"> ' + item.ItemDescription + '		<ul class="rating-star">  <li><img src="images/star-active.png" alt="stars" /></li>  <li> <img src="images/star-active.png" alt="stars" /></li> <li> <img src="images/star-active.png" alt="stars" /></li>  <li>  <img src="images/star-active.png" alt="stars" /></li> <li>   <img src="images/star.png" alt="stars" /></li>   </ul>  <span class="rating-text">Rate This Product</span>   </div>      <div class="wrapper-sector"> <div class="left-details">  <h5>Description</h5>   <p> Color: ' + item.Color + '</p>  <p> Style: ' + item.Style + '</p> <span></span> <a href="">for more details please visit the retailer site</a></div> </div> </div></div></div><div class="modal-footer" style="padding: 0;"></div> </div></div></div></div>'

            $("#ProductDetails").append(ulProductDesc);



        });

        loader.hideloader();
    }
    catch (err) {
        loader.hideloader();
    }
}

function OnError_prod_details_modelPopUp_chnage(request, status, error) {
    loader.hideloader();
    console.log('Error!! ' + request.statusText);
}






function ClickSubCtegory(SubCategoryId) {
    //loader.showloader();
    //console.log(CategoryId);
    //$('#hdnParamCategoryId').val(CategoryId);
    //$('.prod_list').html('');
    //$('.shopping_main_box').html('');
    //$('#ProductDetails').html('');
    //LISTSubCategory_change(CategoryId)
    //loader.hideloader();
    var checkedVals = $('.item:checkbox:checked').map(function () {
        return this.id;
    }).get();
    


    var param = {
        Mode: 2,
        CategoryId: $('#hdnParamCategoryId').val(),
        SubCategoryIds: checkedVals.join(","),
        ItemId: 0,
    }

    $.ajax({
        type: "POST",
        url: "MarketPlace.aspx/SelectMainCategory",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: OnSuccess_Product_details_filter,
        error: OnError_Product_details_filter
    });
}


function OnSuccess_Product_details_filter(data, status) {
    data = data.d;
    $(".shopping_main_box").html('');
    $.each(JSON.parse(data), function (i, item) {
        var display = "block";
        if (item.Offer == "")
            display = "none";
           
        var ulProductDesc = '<ul> <li data-toggle="modal" data-target=#myModal-' + item.ItemId + ' class="itemlist" id=li_' + item.ItemId + '><div class="off_right_box"  style="display:'+display+'"><span>' + item.Offer + '</span></div> <div class="product_img_box"><img src= "Upload.ashx?imagename=' + item.ImagePath + '&Path=marketplace"/></div><div class="pro_details"><div class="star_right_img"><a href="#"><img src="images/star_right.png" /></a></div> ' + item.ItemName + '<br /> <b class="rate_box">' + item.Price + '</b><br /> Sold on: ' + item.Vendor + '<br /> Click for Specs and Reviews </div>   <div class="rating_box"> <span class="star_rating_box2"><span> <img src="images/star-on.svg" /></span> <span>    <img src="images/star-on.svg" /></span>  <span> <img src="images/star-on.svg" /></span>     <span> <img src="images/star-on.svg" /></span> <span>   <img src="images/star-off.svg" /></span></span> </div>   </li>  </ul>';
        $(".shopping_main_box").append(ulProductDesc);


    });



}


function OnError_Product_details_filter(request, status, error) {
    loader.hideloader();
    console.log('Error!! ' + request.statusText);
}
