/// <reference path="angular/angular.js" />



var data;
var count = 1;
var issearch = false;
arrfound = [];
arrnotfound = [];
var str = '';

$(document).ready(function () {

    $('.active').removeClass('active');
    $('.icon_rebates').addClass('active');
    $('.efficency').addClass('active');

    $('#hdnLike').val($('.bottom_efficiency .like_area').is(':hidden'));
    $('#hdnRegister').val($('.bottom_efficiency .register').is(':hidden'));
    $('#hdnRegisterCount').val($('.bottom_efficiency .added_vote_area .eff_register').is(':hidden'));

   

  
});

// added for hide/show border
$(window).load(function () {
   
    if ($(".eff_register").css('display') == 'block') {
        $(".registered_box ul li:last-child").addClass('showborder');

    } else {
        $(".registered_box ul li:last-child").addClass('hideborder');
    }
});
function imgError(image) {
    image.onerror = "";
    image.src = "images/no_img.png";
    return true;
}


function GetPopUpData(id) {
    try {
        var data = rebates.GetPopUpData(id).value;
        $('#img_popimage').attr('src', data.Rows[0]["ImageUrl"] == "" ? "images/no_img.png" : data.Rows[0]["ImageUrl"]);
        $('#lbl_added').text(data.Rows[0]["AddedCount"]);
        $('#lbl_viewed').text(data.Rows[0]["VIEWS"]);
        if (data.Rows[0]["RebateProgramDesc"] == "") {
            $("#typ").hide();
            $('#lbl_type').text(data.Rows[0]["RebateProgramDesc"]);
        }
        else {
            $("#typ").show();
            $('#lbl_type').text(data.Rows[0]["RebateProgramDesc"]);
        }
        $('#lbl_saveupto').text(data.Rows[0]["SavingValue"]);
        $('#div_description').html(data.Rows[0]["Description"]);
        var result = comEnergyEfficiency.ViewSavingTip(id, "Rebates", false, 0).value; //Upgrade Added count while clicking on Read More
        if (result != null) {
            $('#VC_' + id).html(result.Rows[0].UpdatedCount);
            $('.viwtxt').html(result.Rows[0].UpdatedCount);
        }
        $('#modaltitle').text(data.Rows[0]["Title"]); // Added by RS for Display Title in the place of Details Text
    }
    catch (e) {

    }
}
//This method is used to show the description of a saving tip and will increase the view count.
function ShowContent(id) {
    try {
        
        $('.discription_pro').html($('#'+id+'_Desc').html());
        $('#modaltitle').html($("#" + id).parents('li').find('.content_energy_area')[0].children[0].textContent);
        $('.img img').attr('src', ($('#' + id).parents('li').find('.top_div_img img[class*=imgurl]')[0].src));
        $('.addtxt').html($("#" + id).parents('li').find('.added_vote_area  span[class*=popup]')[2].textContent);
        $('.savtxt').html($("#" + id).parents('li').find('.added_view_sec [class*=popup]')[1].textContent);
        $('#hdnPid').val(id);
        var result = comEnergyEfficiency.ViewSavingTip(id, "Rebates", false, 0).value;
        if (result != null) {
            $('#VC_' + id).html(result.Rows[0].UpdatedCount);
            $('.viwtxt').html(result.Rows[0].UpdatedCount);
        }
       
    }
    catch (e) { }
}
var app = angular.module("EfficiencyApp", ["ngSanitize"]).filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        var el = document.createElement("div");
        el.innerHTML = text;
        r = el.innerText = el.textContent;
        if (r.toString().length > 100) {
            return r.toString().substring(0, 100) + '...';
        }
        else {
            return r.toString();
        }
       
    };
}]);
app.filter('to_trusted1', ['$sce', function ($sce) {
    return function (text) {
        var el = document.createElement("div");
        el.innerHTML = text;
        r = el.innerText = el.textContent;
        return r;
    };
}]);
app.controller("EfficiencyController", function ($scope, $http, $log, $sce) {
    $scope.$sce = $sce;
    $scope.NoDataDiv = '';

    $scope.showObj = {
        "display": "block"
    }
    $scope.hideObj = {
        "display": "none"
    }

    $scope.NoSearch = $('#SearchErrMsg').text(); //"No Tip found";
    $scope.LoadRebatesTips1 = function () {
        try {
            $http({
                method: 'POST',
                url: "rebates.aspx/LoadEfficiencyData",
                        data: {},
                        async:false

                    })
                    .then(function(response) {
                if (response != null && JSON.parse(response.data.d).length > 0) {
                    $scope.RebatesData = JSON.parse(response.data.d);
                            } else {
                    $scope.NoDataDiv = $('#NoData').text(); //'No Rebates Tips available';

                }
                        },
                        function errorCallback() {
                            $scope.NoDataDiv = $('#NoData').text(); // 'No Rebates Tips available';

            })
           

        } catch (e) {
            $log.error(e);
        }
    }


    $scope.LoadRebatesTips = function () {
        try {
            $.ajax({
                method: 'POST',
                url: "rebates.aspx/LoadEfficiencyData",
                data: {},
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (response) {
                    if (response != null && JSON.parse(response.d).length > 0) {
                        $scope.RebatesData = JSON.parse(response.d);
                    }
                    else {
                        $scope.NoDataDiv = $('#NoData').text(); //'No Rebates Tips available';

                    }
                },
                error: function errorCallback() {
                    $scope.NoDataDiv = $('#NoData').text();
                }
            });



        } catch (e) {
            $log.error(e);
        }
    }

    $scope.IncreaseDecLikes = function (ID,e,index) {
        try {
            var islike;
            var updatedCount = '';
         
            if ($(e.currentTarget).attr('class').indexOf('_ro') > 0) {
                islike = 1;
         
                $(e.currentTarget).addClass('like_lnk').removeClass('like_lnk_ro');
                
                } else {
                islike = 0;
         
                $(e.currentTarget).addClass('like_lnk_ro').removeClass('like_lnk');
                
            }
            var result = comEnergyEfficiency.LikeSavingTip(ID, islike).value;
            if (result != null) {
                if (result.Tables[0].Rows[0].Status == '1')
                    updatedCount = result.Tables[1].Rows[0].UpdatedCount;
                $('#LC_' + ID).html(result.Tables[1].Rows[0].UpdatedCount);

            }
                if (updatedCount != null && updatedCount != '')
                    $scope.RebatesData[index].LikeCount = updatedCount;
                     
                $scope.RebatesData[index].PromotionLike= (islike == 1) ? "1" : null;
                
               
        } catch (e) {
            $log.error(e);
        }

    }

        $scope.increaseViews = function(index, id) {
            try {
                //$scope.RebatesData[index].VIEWS = $('#VC_' + id).html();
                $scope.RebatesData.filter(function (p) { return p.PromotionId == id; })[0].Views = $('#VC_' + id).html();
            } catch (e) {
                $log.error(e);
            }

    }

   
        $scope.attachmentpath = $('#hdnAttachmentPath').val();
 $scope.LoadRebatesTips();
 
    });

