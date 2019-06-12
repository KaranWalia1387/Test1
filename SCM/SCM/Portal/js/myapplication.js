var data;
var count = 1;
var issearch = false;
arrfound = [];
arrnotfound = [];
var str = '';

$(document).ready(function () {
    //data = programs.LoadSavingTips().value;

    $('.active').removeClass('active');
    $('.my_applications').addClass('active');
    $('.efficency').addClass('active');

    $('#hdnLike').val($('.bottom_efficiency .like_area').is(':hidden'));
    $('#hdnRegister').val($('.bottom_efficiency .register').is(':hidden'));
    $('#hdnRegisterCount').val($('.bottom_efficiency .added_vote_area .eff_register').is(':hidden'));
    // loadTips();
    $('#btnSearch').click(function () {
       // LoadSearchData();
    });


});

function imgError(image) {
    image.onerror = "";
    image.src = "images/no_img.png";
    return true;
}


//This method is used to show the description of a saving tip and will increase the view count.
function ShowContent(id) {
    try {
        //var detailbaox = $(obj).parent('details_box');
        //   document.forms[0]["txt_Subject"].value = $("#" + id).parents('li').find('.content_energy_area')[0].children[0].textContent;

        $('.discription_pro').html($("#" + id).parents('li').find('.content_energy_area span[class*=desc]')[0].textContent);
        //  document.forms[0]["ddl_topic"].value = 47;
        var ContentDisplay = $("#" + id + "_Content").css('display');
        //if (ContentDisplay == "none") {
        //    //$("#" + id).html("Click to Hide Details");
        //    //$("#" + id + "_Content").slideToggle("fast"); $('.discription_pro').html($("#" + lnkID).parents('li').find('.content_energy_area span[class*=desc]')[0].innerText);
        $('.modal-title').html($("#" + id).parents('li').find('.content_energy_area')[0].children[0].textContent);
        $('.img img').attr('src', ($('#' + id).parents('li').find('.top_div_img img[class*=imgurl]')[0].src));
      

    }
    catch (e) { }
}

function ShowStatusContent(id) {
    try {
     
        var ContentDisplay = $("#" + id + "_Content").css('display');       
        $('.modal-title').html($("#" + id).parents('li').find('.content_energy_area')[0].children[0].textContent);
        $('.img img').attr('src', ($('#' + id).parents('li').find('.top_div_img img[class*=imgurl]')[0].src));


    }
    catch (e) { }
}

function LoadSearchData() {
    try {
        var searchtexttemp = $('#txtSearch').val().toLowerCase();
        searchtext = $.trim(searchtexttemp);
        //start bug 8985
        //if (searchtext == '')
        //{
        //    alert('Please enter a keyword to search.');
        //    $('#txtSearch').focus();
        //    return false;
        //}

        //data = programs.LoadSavingTips(searchtext).value;

        //data = programs.LoadSavingTips().value;
        //End bug 8985
        //Added by Abhilash Jha
        if (searchtext == '') {
            alert($('#SearchNullErr').text());
            return false;
        }
        else {
            data = MyApplications.LoadSavingTips(searchtext).value; //End Comment
            var title, index;
            if (data != null) {
                arrfound = [];
                arrnotfound = [];
                for (i = 0; i < data.Rows.length; i++) {
                    title = data.Rows[i].Title.toLowerCase();
                    index = title.search(searchtext);
                    if (index >= 0)
                        arrfound.push(i);
                    else
                        arrnotfound.push(i);
                }
                if (arrfound.length > 0) {
                    issearch = true;
                    loadTips();
                    return false;
                }
                else {
                    alert($('#SearchErrMsg').text());
                    $('#txtSearch').focus();
                    return false;
                }
            }
            else {

                alert($('#SearchErrMsg').text());
                $('#txtSearch').focus();
                return false;
            }
        }
    }
    catch (e) { }
}


function imgError(image) {
    image.onerror = "";
    image.src = "images/no_img.png";
    return true;
}








function GetPopUpData(id,calltype) {
    try {
        var data = MyApplications.GetPopUpData(id).value;
        if (calltype == '1') {
            $('#img_popimage').attr('src', data.Rows[0]["ImageUrl"] == "" ? "images/no_img.png" : data.Rows[0]["ImageUrl"]);
            $('#div_description').html(data.Rows[0]["Description"]);
            $('.modal-title').text(data.Rows[0]["Title"]); // Added by RS for Display Title in the place of Details Text
        }
        else
        {
            $('#img_pop').attr('src', data.Rows[0]["ImageUrl"] == "" ? "images/no_img.png" : data.Rows[0]["ImageUrl"]);
            $('.modal-title').text(data.Rows[0]["Title"]);
        }
    }
    catch (e) {

    }
}


$(document).on('click', '[id^="LK_"]', function (event) {

    var promotionid = this.id.split('_')[1];
    var islike;
    if (this.className.indexOf("_ro") > 0) {
        islike = 1;
        $(this).addClass('like_lnk').removeClass('like_lnk_ro');
    }
    else {
        islike = 0;
        $(this).addClass('like_lnk_ro').removeClass('like_lnk');
    }
    var result = comEnergyEfficiency.LikeSavingTip(promotionid, islike).value;
    if (result != null) {
        if (result.Tables[0].Rows[0].Status == '1')
            $('#LC_' + promotionid).html(result.Tables[1].Rows[0].UpdatedCount);

    }


});

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
}]);;
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
    $scope.EducationalTips = function () {
        try {
          
            $.ajax({
                method: 'POST',
                url: "myapplications.aspx/LoadApplicationData",
                data: {},
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (response) {
                    if (response != null && JSON.parse(response.d).length > 0) {
                        $scope.MyApplicationsData = JSON.parse(response.d);
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

    $scope.EducationalTips1 = function () {
        try {
            $http({
                method: 'POST',
                url: "myapplications.aspx/LoadApplicationData",
                data: {}

            }).then(function (response) {
                if (response != null && JSON.parse(response.data.d).length > 0) {
                    $scope.MyApplicationsData = JSON.parse(response.data.d);
                }
                else {
                    $scope.NoDataDiv = $('#NoData').text();// 'No Application Tips available';

                }
            }, function errorCallBack(response) {
                $scope.NoDataDiv = $('#NoData').text();// 'No Application Tips available';

            })


        } catch (e) {
            $log.error(e);
        }
    }
    $scope.increaseViews = function (index, id) {
        try {
            if ($('#VC_' + id).html() != null && $('#VC_' + id).html() != "")
                $scope.MyApplicationsData[index].VIEWS = $('#VC_' + id).html();
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
                $scope.MyApplicationsData[index].LikeCount = updatedCount;
            }
        } catch (e) {
            $log.error(e);
        }

    }
    $scope.attachmentpath = $('#hdnAttachmentPath').val()
    $scope.EducationalTips();


})
