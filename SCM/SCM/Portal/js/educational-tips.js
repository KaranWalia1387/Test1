var totaltipsadded = 0;
var data;
var count = 1;
var issearch = false;
arrfound = [];
arrnotfound = [];
var str = '';

$(document).ready(function () {
    //data = educational_tips.LoadSavingTips().value;
    //loadTips();

    //$('[id^="LK_"]').click(function () {
    //    var promotionid = this.id.split('_')[1];
    //    var islike;
    //    if (this.className.indexOf("_ro") > 0) {
    //        islike = 1;
    //        $(this).addClass('like_lnk').removeClass('like_lnk_ro');
    //    }
    //    else {
    //        islike = 0;
    //        $(this).addClass('like_lnk_ro').removeClass('like_lnk');
    //    }
    //    var result = educational_tips.LikeSavingTip(promotionid, islike).value;
    //    if (result != null) {
    //        if (result.Tables[0].Rows[0].Status == '1')
    //            $('#LC_' + promotionid).html(result.Tables[1].Rows[0].UpdatedCount);
    //    }
    //});

    $('.active').removeClass('active');
    $('.educational_tips').addClass('active');
    $('.efficency').addClass('active');

    $('#btnSearch').click(function () {
      //  LoadSearchData();
    });
    $("#img_popimage").error(function () {
        $(this).attr("src", "images/no_img.png");
    })
});

function changetext(desc) {
    return $(desc).text();
}



function ShowContent(id) {
    try {
        var ContentDisplay = $("#" + id + "_Content").css('display');
        if (ContentDisplay == "none") {
            //$("#" + id).html("Click to Hide Details");
            //$("#" + id + "_Content").slideToggle("fast");
            $('.discription_pro').html($("#" + id + "_Content").html());
            $('.img img').attr('src', ($('#' + id).parents('li').find('.profile_img')[0].childNodes[3].src));
            $('.addtxt').html($("#" + id).parents('li').find('.view_details span[class*=popup]')[0].textContent);
            $('.viwtxt').html($("#" + id).parents('li').find('.view_details span[class*=popup]')[1].textContent);
            $('#modaltitle').html($("#" + id).parents('li').find('.view_details span[class*=popup]')[2].textContent);
            //  $('.titletxt').html($("#" + id).parents('li').find('.view_details span[class*=popup]')[2].innerText);
            //var promotionid = id.split('_')[1];
            //var result = educational_tips.ViewSavingTip(promotionid).value;
            //if (result != null) {
            //    $('#VC_' + promotionid).html(result.Rows[0].UpdatedCount);
            //}
        }
        else {
            //$("#" + id).html("Show Details");
            //$("#" + id + "_Content").slideToggle("fast");
            $('.discription_pro').html($("#" + id + "_Content").html());
            //location.reload();
        }
    }
    catch (e) { }
}


function imgError(image) {
    image.onerror = "";
    image.src = "images/no_img.png";
    return true;
}



function GetPopUpData(id) {
    try {
        var data = educational_tips.GetPopUpData(id).value;
        $('#img_popimage').attr('src', data.Rows[0]["ImageUrl"] == "" ? "images/no_img.png" : data.Rows[0]["ImageUrl"]);
        // $('.addtxt').text(data.Rows[0]["AddedCount"]);        
        $('#lbl_type').text(data.Rows[0][""]);
        $('.discription_pro').html(data.Rows[0]["Description"]);
       // $('.viwtxt').text(data.Rows[0]["VIEWS"]);

        $('#modaltitle').text(data.Rows[0]["Title"]);

        var result = comEnergyEfficiency.ViewSavingTip(id, "EducationalTips", false, 0).value;
        if (result != null) {
            $('#VC_' + id).html(result.Rows[0].UpdatedCount);
            $('.viwtxt').html(result.Rows[0].UpdatedCount);
        }

    }
    catch (e) {

    }
}



var app = angular.module("EfficiencyApp", ["ngSanitize"]).filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        // var r = $sce.trustAsHtml(text);
        var el = document.createElement("div");
        el.innerHTML = text;
        r = el.innerText = el.textContent;
        //el.innerText = el.textContent = s;
        //s = el.innerHTML;
        //return s;
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

    $scope.NoSearch = $('#SearchErrMsg').text();                    //"No Tip found";
    $scope.EducationalTips1 = function () {
        try {
            $http({
                method: 'POST',
                url: "educational-tips.aspx/LoadEfficiencydata",
                data: {}

            }).then(function (response) {
                if (response != null && JSON.parse(response.data.d).length > 0) {
                    $scope.Educationaldata = JSON.parse(response.data.d);
                }
                else {
                    $scope.NoDataDiv = $('#NoData').text();// 'No Educational Tips available';
                }
            }, function errorCallback(response) {
                $scope.NoDataDiv = $('#NoData').text();// 'No Educational Tips available';

            })


        } catch (e) {
            $log.error(e);
        }
    }

    $scope.EducationalTips = function () {
        try {
            
            $.ajax({
                method: 'POST',
                url: "educational-tips.aspx/LoadEfficiencydata",
                data: {},
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (response) {
                    if (response != null && JSON.parse(response.d).length > 0) {
                        $scope.Educationaldata = JSON.parse(response.d);
                    }
                    else {
                        $scope.NoDataDiv = $('#NoData').text(); //'No Rebates Tips available';

                    }
                },
                error: function errorCallback() {
                    $scope.NoDataDiv = $('#NoData').text();
                }// 'No Rebates Tips available';
            });

        } catch (e) {
            $log.error(e);
        }
    }
    

    $scope.increaseViews = function (index, id) {
        try {
            if ($('#VC_' + id).html() != null && $('#VC_' + id).html() != "")
               // $scope.Educationaldata[index].VIEWS = $('#VC_' + id).html();
               $scope.Educationaldata.filter(function (p) { return p.PromotionId == id; })[0].Views = $('#VC_' + id).html()
        }
        catch (e) {
            $log.error(e)
        }

    }

    $scope.IncreaseDecLikes = function (ID, e, index) {
        try {
            var islike; var updatedCount = '';
            // var updatedCount='';
            if ($(e.currentTarget).attr('class').indexOf('_ro') > 0) {
                islike = 1;
                // $(this).addClass('like_lnk').removeClass('like_lnk_ro');
                $(e.currentTarget).addClass('like_lnk').removeClass('like_lnk_ro');
            }
            else {
                islike = 0;
                //$(this).addClass('like_lnk_ro').removeClass('like_lnk');
                $(e.currentTarget).addClass('like_lnk_ro').removeClass('like_lnk');
            }
            var result = comEnergyEfficiency.LikeSavingTip(ID, islike).value;
            if (result != null) {
                if (result.Tables[0].Rows[0].Status == '1') {
                    updatedCount = result.Tables[1].Rows[0].UpdatedCount;
                    $('#LC_' + ID).html(result.Tables[1].Rows[0].UpdatedCount);
                }

            }
            if (updatedCount != null && updatedCount != '') {
                $scope.Educationaldata[index].LikeCount = updatedCount;
                $scope.Educationaldata[index].PromotionLike = (islike == 1) ? "1" : null;
            }
        } catch (e) {
            $log.error(e);
        }

    }
    $scope.attachmentpath = $('#hdnAttachmentPath').val()
    $scope.EducationalTips();


})
