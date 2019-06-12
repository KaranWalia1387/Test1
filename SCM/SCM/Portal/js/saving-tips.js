var totaltipsadded = 0;
var data;
var count = 1;
var issearch = false;
arrfound = [];
arrnotfound = [];
var str = '';

$(document).ready(function () {
    //data = saving_tips.LoadSavingTips().value;
    //loadTips();
    // $('#hdnLike').val($('.bottom_efficiency .like_area').is(':hidden')); used earlier for searching the tips
    // $('#hdnRegister').val($('.bottom_efficiency .eff_register').is(':hidden')); not used in program
    //if (obj.length == 0) {
        //        $("#addTips").css('display', 'none');

    //    }

    var metas = document.getElementsByTagName('meta');
    var i;
    if (navigator.userAgent.match(/iPhone/i)) {
        for (i = 0; i < metas.length; i++) {
            if (metas[i].name == "viewport") {
                metas[i].content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
            }
        }
        document.addEventListener("gesturestart", gestureStart, false);
    }

    $('.active').removeClass('active');
    $('.icon_saving_tips').addClass('active');
    $('.efficency').addClass('active');

    $('#btnSearch').click(function () {
       // LoadSearchData();
    });


    refresh();
    $(window).on('resize', refresh);
   
    //Add Saving tips Asynchronously
    $('#addTips').click(function () {
        //loader.showloader();
        var totaltipsadded = 0;
        try {
            var chkbox = $("input[type='checkbox']:checked").filter(':visible');//$('#ST_Content [type=checkbox]:checked');
            if (chkbox.length < 1) {
                toastr.warning($('#IDSelectTip').text());
                //w2alert('Please select saving tip(s) to add.');
                return false;
            }
            totaltipsadded = totaltipsadded + chkbox.length;
            if (totaltipsadded > 5) {
                toastr.warning($('#IDMaxlimit').text());
                //w2alert('You can only add a maximum of 5 saving tips to your Annual Goal. Please review your goal and update accordingly.');
                totaltipsadded = totaltipsadded - chkbox.length;
                $(chkbox).removeAttr('checked');
                return false;
            }
            else {
                var promotionid = '';
                $(chkbox).each(function () {
                    promotionid = promotionid + this.id + ',';
                });
                promotionid = promotionid.substr(0, promotionid.length - 1);
                var param = {
                    promotionid: promotionid,
                    isdelete: '0'
                }

                function OnSuccess(data, status) {
                    var status = JSON.parse(data.d);
                    if (status[0].Status == "1") {
                        toastr.success(status[0].Message);
                        $(chkbox).each(function () {
                            $(chkbox).attr('checked', false);
                            $(chkbox).hide();
                            $(chkbox).parent('div').hide();                           
                            $("#" + promotionid).parents('li').find('.added_vote_area span[class*=popup]')[0].textContent = parseInt($("#" + promotionid).parents('li').find('.added_vote_area span[class*=popup]')[0].textContent) + 1;
                        });
                    }
                    else {
                      //  w2utils.lock('div', '', true);
                        toastr.error(status[0].Message);
                        
                       // $('.w2ui-popup-message').css('display','none');
                    }
                    loader.hideloader();
                }
                function OnError(request, status, error) {
                    loader.hideloader();
                    toastr.error(request.statusText);
                }

                $.ajax({
                    type: "POST",
                    url: "saving-tips.aspx/AddDeleteSavingTips",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });
                
            }
            
        } catch (e) {
            loader.hideloader();
            toastr.error(e);
        }

    });
});

$(window).load(function () {
    changeactivelinkcolor();
});

function gestureStart() {
    for (i = 0; i < metas.length; i++) {
        if (metas[i].name == "viewport") {
            metas[i].content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
        }
    }
}
function refresh() {
    //var zoom = $('#zoom');
    var device = $('#devices');
    //zoom.text(window.detectZoom.zoom().toFixed(2));
    //device.text(window.detectZoom.device().toFixed(2));
    if ((window.detectZoom.device().toFixed(1) >= 1.09) && (window.detectZoom.device().toFixed(1) < 1.20)) {
        $("#devices").addClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni3');
        $("#devices").removeClass('inner_uni4');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.20) && (window.detectZoom.device().toFixed(1) < 1.30)) {
        $("#devices").addClass('inner_uni2');
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni3');
        $("#devices").removeClass('inner_uni4');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.30) && (window.detectZoom.device().toFixed(1) < 1.50)) {
        $("#devices").addClass('inner_uni3');
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni4');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.50) && (window.detectZoom.device().toFixed(1) < 1.70)) {
        $("#devices").addClass('inner_uni4');
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni3');
    }
    else {
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni3');
        $("#devices").removeClass('inner_uni4');
    }

}
function LoadSearchData() {
    try {

        var searchtexttemp = $('#txtSearch').val().toLowerCase();
        searchtext = $.trim(searchtexttemp);
        //start bug 8985
        //if (searchtext == '') {
        //    //alert('Please enter a keyword to search.');
        //    error.showerror("#txtSearch", 'Please enter a keyword to search.');
        //    $('#txtSearch').focus();
        //    return false;
        //}
        //data = saving_tips.LoadSavingTips(searchtext).value;
       
        // data = saving_tips.LoadSavingTips().value;
        //End bug 8985
        //Added by Abhilash Jha
        if (searchtext == '') {
            alert($('#SearchNullErr').text());
            return false;
        }
        else {
            data = saving_tips.LoadSavingTips(searchtext).value; //End Comment
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
                    alert($('#SearchErrMsg').text())
                    $('#txtSearch').focus();
                    return false;
                }
            }
            else {

                alert($('#SearchErrMsg').text())
                $('#txtSearch').focus();
                return false;
            }
        }
    }
    catch (e) { }
}

//This method is used to show the description of a saving tip and will increase the view count.
function ShowContent(id) {
    try {
        var ContentDisplay = $("#" + id + "_Content").css('display');
        if (ContentDisplay == "none") {
            $('#hdnPid').val(id);
            //$("#" + id).html("Click to Hide Details");
            //$("#" + id + "_Content").slideToggle("fast");
            $('.discription_pro').html($("#" + id + "_Content").html());
            $('.img img').attr('src', ($('#' + id).parents('li').find('.profile_img')[0].childNodes[3].src));
            $('.addtxt').html($("#" + id).parents('li').find('.view_details span[class*=popup]')[0].textContent);
            $('.viwtxt').html($("#" + id).parents('li').find('.view_details span[class*=popup]')[1].textContent);
            $('.typtxt').html($("#" + id).parents('li').find('.view_details span[class*=popup]')[2].textContent);
            $('#modaltitle').html($("#" + id).parents('li').find('.view_details span[class*=popup]')[3].textContent);
            //var promotionid = id.split('_')[1];
            //var result = comEnergyEfficiency.ViewSavingTip(promotionid).value;
            //if (result != null) {
            //    $('#VC_' + promotionid).html(result.Rows[0].UpdatedCount);
            //}
        }
        else {
            //$("#" + id).html("Show Details");
            //$("#" + id + "_Content").slideToggle("fast");
            $('.discription_pro').html($("#" + id + "_Content").html());
        }
    }
    catch (e) { }
}



function GetPopUpData(id) {
    try {
        var data = saving_tips.GetPopUpData(id).value;
        $('#img_popimage').attr('src', data.Rows[0]["ImageUrl"] == "" ? "images/no_img.png" : data.Rows[0]["ImageUrl"]);
        $('#img_popimage').error(function () {// imgError(this)
            this.onerror = "";
            this.src = "images/no_img.png";
            return true;
        });
        $('#lbl_added').text(data.Rows[0]["AddedCount"]);
        if (data.Rows[0]["RebateProgramDesc"] != null && data.Rows[0]["RebateProgramDesc"] != undefined)
        {
            if (data.Rows[0]["RebateProgramDesc"] != "") {
                $('#Etype').removeAttr('style');
                $('#lbl_type').text(data.Rows[0]["RebateProgramDesc"]);
            }
            else {
                $('#Etype').attr('style', 'display:none');
                $('#lbl_type').text(data.Rows[0]["RebateProgramDesc"]);

            }
        }
        
       
        $('#lbl_saveupto').text('$'+data.Rows[0]["SavingValue"]);
        $('#div_description').html(data.Rows[0]["Description"]);

        if ($("#" + id).parents('li').find('.added_vote_area span[class*=popup]')[1])
        {
            $("#" + id).parents('li').find('.added_vote_area span[class*=popup]')[1].textContent = parseInt($("#" + id).parents('li').find('.added_vote_area span[class*=popup]')[1].textContent) + 1;
        }
        
        $('#modaltitle').text(data.Rows[0]["Title"]); // Added by RS for Display Title in the place of Details Text
        var result = comEnergyEfficiency.ViewSavingTip(id, "SavingTips", false, 0).value;
        if (result != null) {
            $('#VC_' + id).html(result.Rows[0].UpdatedCount);
            $('#lbl_viewed').text(result.Rows[0].UpdatedCount);
        }
        
    }
    catch (e) {

    }
}


function imgError(image) {
    image.onerror = "";
    image.src = "images/no_img.png";
    return true;
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

   
    $scope.LoadRebatesTips1 = function () {
        try {
            var count = 0;
            $http({
                method: 'POST',
                url: "saving-tips.aspx/LoadSavingTipsData",
                data: {}

            }).then(function (response) {
                if (response != null && JSON.parse(response.data.d).length > 0) {
                    $scope.SavingData = JSON.parse(response.data.d);
                    angular.forEach($scope.SavingData, function (saving) {
                        count += saving.program_status == 0 ? 0 : 1;
                    });
                    if (count < 0) {
                        $("#addTips").css('display', 'none');
                    }
                  //  $scope.NoSearch = $('#SearchErrMsg').text(); //"No Tip found";

                }
                else {
                    $scope.NoDataDiv = $('#NoData').text(); //'No Saving Tips available';
                }
                    
               
                
                
            }, function errorCallback(response) {
                $scope.NoDataDiv = $('#NoData').text(); //'No Saving Tips available';
            })

        } catch (e) {
            $log.error(e);
        }
    }

    $scope.LoadRebatesTips = function () {
        try {
            var count = 0;
           
            $.ajax({
                method: 'POST',
                url: "saving-tips.aspx/LoadSavingTipsData",
                data: {},
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (response) {
                    if (response != null && JSON.parse(response.d).length > 0) {
                        $scope.SavingData = JSON.parse(response.d);
                        angular.forEach($scope.SavingData, function (saving) {
                            count += saving.program_status == 0 ? 0 : 1;
                        });
                        if (count < 0) {
                            $("#addTips").css('display', 'none');
                        }
                        //  $scope.NoSearch = $('#SearchErrMsg').text(); //"No Tip found";

                    }
                    else {
                        $scope.NoDataDiv = $('#NoData').text(); //'No Saving Tips available';
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

    $scope.IncreaseDecLikes = function (ID, e, index) {
        try {
            var islike;
            var updatedCount = '';
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
                if (result.Tables[0].Rows[0].Status == '1')
                    updatedCount = result.Tables[1].Rows[0].UpdatedCount;
                $('#LC_' + ID).html(result.Tables[1].Rows[0].UpdatedCount);

            }
            if (updatedCount != null && updatedCount != '')
                $scope.SavingData[index].LikeCount = updatedCount;
            $scope.SavingData[index].PromotionLike = (islike == 1) ? "1" : null;

        } catch (e) {
            $log.error(e);
        }

    }

    $scope.increaseViews = function (index, id) {
        try {
           // $scope.SavingData[index].VIEWS = $('#VC_' + id).html();
            $scope.SavingData.filter(function (p) { return p.PromotionId == id; })[0].Views = $('#VC_' + id).html();
        }
        catch (e) {
            $log.error(e)
        }

    }

    //$scope.modelLikeCount={}
    $scope.attachmentpath = $('#hdnAttachmentPath').val()
    $scope.LoadRebatesTips();

   

})

