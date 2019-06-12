/// <reference path="angular/angular.js" />
var data;
var count = 1;
var issearch = false;
arrfound = [];
arrnotfound = [];
var str = '';
var type = '';
var idType = '';
var className = '';

$(document).ready(function () {
    //GetTabsData(1);

    refresh();
    $(window).on('resize', refresh);

    type = Number($('#hdnType').val());
  
    $('.nav_left ul').on('click', 'li', function () {
        $('.nav_left li.active').removeClass('active');
        className = $(this).attr("class");
        $(this).addClass('active');

        if (className == "icon_rebates") {
            $("#txtSearch").val('');//to remove text from textbox while moving from one tip to another tip
            $("#dvRebateContainer").show();
            $('#hdnType').val('1');
            $("#dvDrProgramsContainer").hide();
            $("#dvSavingTipsContainer").hide();
            $("#dvEducationalTipsContainer").hide();
            $('.SearchContainer').hide();
            $('.dis_programs').hide();
            $('.dis_rebates').show();
            $('.div_disclaimer').show();

        }
        else if (className == "icon_dr_programes") {
            $("#txtSearch").val('');
            $("#dvDrProgramsContainer").show();
            $('#hdnType').val('2');
            $("#dvRebateContainer").hide();
            $("#dvSavingTipsContainer").hide();
            $("#dvEducationalTipsContainer").hide();
            $('.SearchContainer').hide();
            $('.dis_rebates').hide();
            $('.dis_programs').show();
            $('.div_disclaimer').show();

        }
        else if (className == "icon_saving_tips") {
            $("#txtSearch").val('');
            $("#dvSavingTipsContainer").show();
            $('#hdnType').val('3');
            $("#dvRebateContainer").hide();
            $("#dvDrProgramsContainer").hide();
            $("#dvEducationalTipsContainer").hide();
            $('.SearchContainer').hide();
            $('.dis_programs').hide();
            $('.dis_rebates').hide();
            $('.div_disclaimer').hide();

        }
        else if (className == "educational_tips") {
            $("#txtSearch").val('');
            $("#dvEducationalTipsContainer").show();
            $('#hdnType').val('4');
            $("#dvRebateContainer").hide();
            $("#dvDrProgramsContainer").hide();
            $("#dvSavingTipsContainer").hide();
            $('.SearchContainer').hide();
            $('.dis_programs').hide();
            $('.dis_rebates').hide();
            $('.div_disclaimer').hide();

        }
    });

    $('#btnSearch').click(function () {
        //$('#hdnLike').val($('.bottom_efficiency .like_area').is(':hidden'));
        //$('#hdnRegister').val($('.bottom_efficiency .register').is(':hidden'));
        type = Number($('#hdnType').val());
        if (type == 1) {
            idType = 3;
        }
        else if (type == 2) {
            idType = 4;
        }
        else if (type == 3) {
            idType = 1;
        }
        else if (type == 4) {
            idType = 2;
        }
        LoadSearchData(type);
    });
    //GetTabsData(2);
    //GetTabsData(3);
    //GetTabsData(4);

    //$('#txtSearch').keypress(function (e) {
    //    if (e.which == 13) {
    //        type = Number($('#hdnType').val());
    //        if (type == 1) {
    //            idType = 3;
    //        }
    //        else if (type == 2) {
    //            idType = 4;
    //        }
    //        else if (type == 3) {
    //            idType = 1;
    //        }
    //        else if (type == 4) {
    //            idType = 2;
    //        }
    //        LoadSearchData(type);
    //        return false;
    //    }
    //});

    $('#txtSearch').keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == 13) {
            return false;
        }

    });
});

function refresh() {
    //var zoom = $('#zoom');
    var device = $('#devices');

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



function GetPopUpData(id,value) {
    try {
        var data = OuterSavingTips.GetPopUpData(id,value).value;
        $('#img_popimage').attr('src', data.Rows[0]["ImageUrl"] == "" ? "images/no_img.png" : data.Rows[0]["ImageUrl"]);
        $('#lbl_added').text(data.Rows[0]["AddedCount"]);
        $('#lbl_viewed').text(data.Rows[0]["Views"]);
        $('#lbl_type').text(data.Rows[0][""]);
        $('#div_description').html(data.Rows[0]["Description"]);
    }
    catch (e) {

    }
}





   


function ShowContent(btnID,CatId) {
    try {
        var lnkID = btnID;
         $('#hdnPidContact').val(lnkID);
        
        if (btnID != '') {
            $('.savtxt').html('');
            $('.typtxt').html('');
        }
       
        $('#FileUpload2').val(''); $('#btnRemoveFileContact').hide();
        $("#nofiles").html($('#nofile').attr('title'));//Bug with reference to marketing sheet slide 4

      

        $('.discription_pro').html($("#" + lnkID).parents('li').find('.content_energy_area span[class*=desc]')[0].textContent);
        $('#modaltitle').html($("#" + lnkID).parents('li').find('.content_energy_area')[0].children[0].textContent);
        $('.img img').attr('src', ($('#' + lnkID).parents('li').find('.top_div_img img[class*=imgurl]')[0].src));    
        if (CatId == "1") {
           
            $('.addhide').css("display", "block");
           
            $('.savtxt').html('$'+$("#" + lnkID).parents('li').find('.added_vote_area span[class*=popup]')[2].textContent);
            //$('.addtxt').html('<b>Added:</b>'+$("#" + lnkID).parents('li').find('.content_energy_area  span[class*=popup]')[1].textContent);
            $('.addtxt').html('<b>' + $('#ML_Added_id').text() + '</b>' + $("#" + lnkID).parents('li').find('.content_energy_area  span[class*=popup]')[1].textContent);
            $('.savhide').css("display", "block");
            var result = comEnergyEfficiency.ViewSavingTip(lnkID, "SavingTips", true, 3).value;
            if (result != null) {
                $('#VC_' + lnkID).html(result.Rows[0].UpdatedCount);
                $('.viwtxt').html(result.Rows[0].UpdatedCount);
                $('#SC_' + lnkID).html(result.Rows[0].UpdatedCount);
                
            }
            document.forms[0]["txt_Subjects"].value = $("#" + lnkID).parents('li').find('.content_energy_area')[0].children[0].textContent;
            $('#OuterConnect').hide();
            $('#BtnSubmitComment').hide();
            $('#divConnectMe').css("display", "none");
            $('.modal-body').css("width", "100%");
            $('.modal-content').css("width", "460px");
            $('.modal-dialog').css("width", "460px");
            
        }
        if (CatId == "2") {
            $('.savhide').css("display", "none"); $('.typhide').css("display", "none"); $('.addhide').css("display", "none");
            $('#OuterConnect').hide();
            $('#BtnSubmitComment').hide();
           
            var result = comEnergyEfficiency.ViewSavingTip(lnkID, "EducationalTips", true, 4).value;
            if (result != null) {
                $('#VC_' + lnkID).html(result.Rows[0].UpdatedCount);
                $('.viwtxt').html(result.Rows[0].UpdatedCount);
                $('#SC_' + lnkID).html(result.Rows[0].UpdatedCount);
              
            }
            $('#divConnectMe').css("display", "none"); $('#divConnectMe').css("display", "none");
            $('.modal-body').css("width", "100%");
            $('.modal-content').css("width", "460px");
            $('.modal-dialog').css("width", "460px");
            document.forms[0]["txt_Subjects"].value = $("#" + lnkID).parents('li').find('.content_energy_area')[0].children[0].textContent;
           
        }
        // For Rebates
        if (CatId == "3") {
            $('#OuterConnect').show(); $('.typhide').css("display", "block"); $('.savhide').css("display", "block"); $('.addhide').css("display", IsRegisterPrelogin);//to display registered label if its key is block
            //$("#addregister").html("Registered");
            $('#BtnSubmitComment').show();
            $('#divConnectMe').css("display", "block");         
         
            $('.modal-body').css("width", "100%");
            $('.modal-content').css("width", "460px");
            $('.modal-dialog').css("width", "460px");
            //$('.addtxt').html(' <b>Registered:</b>'+$("#" + lnkID).parents('li').find('.content_energy_area  span[class*=popup]')[1].textContent);
            $('.addtxt').html(' <b>' + $('#ML_Enroled_id').text() + ':</b>' + $("#" + lnkID).parents('li').find('.content_energy_area  span[class*=popup]')[1].textContent);
            $('.savhide').css("display", "none");
            $('.savtxt').html('$' + $("#" + lnkID).parents('li').find('.added_vote_area span[class*=popup]')[1].textContent);
            var result = comEnergyEfficiency.ViewSavingTip(lnkID, "Rebates", true, 1).value;
            if (result != null) {
                $('#VC_' + lnkID).text(result.Rows[0].UpdatedCount);
                $('.viwtxt').html(result.Rows[0].UpdatedCount);
                $('#SC_' + lnkID).html(result.Rows[0].UpdatedCount);
            
            }
          
            document.forms[0]["txt_Subjects"].value = $("#" + lnkID).parents('li').find('.content_energy_area')[0].children[0].textContent;
            document.forms[0]["ddl_topics"].value = 46;

        }
        // for programs
        if (CatId == "4") {
            $('.addhide').css("display", IsRegisterPrelogin);// to display registered label if its key is block
            $('.savhide').css("display", "none");
            //$('.addtxt').html('<b>Registered:</b>' + $("#" + lnkID).parents('li').find('.content_energy_area  span[class*=popup]')[1].textContent);
            $('.addtxt').html('<b>' + $('#ML_Enroled_id').text() + ':</b>' + $("#" + lnkID).parents('li').find('.content_energy_area  span[class*=popup]')[1].textContent);
            var result = comEnergyEfficiency.ViewSavingTip(lnkID, "Programs", true, 2).value;
            if (result != null) {
                $('#VC_' + lnkID).text(result.Rows[0].UpdatedCount);
                $('.viwtxt').html(result.Rows[0].UpdatedCount);
                $('#SC_' + lnkID).html(result.Rows[0].UpdatedCount);
              
            }
          
            document.forms[0]["txt_Subjects"].value = $("#" + lnkID).parents('li').find('.content_energy_area')[0].children[0].textContent;
            document.forms[0]["ddl_topics"].value = 47;
            $('#OuterConnect').show();
            $('#BtnSubmitComment').show();
            $('#divConnectMe').css("display", "block");
            
            $('.modal-body').css("width", "100%");
            $('.modal-content').css("width", "460px");
            $('.modal-dialog').css("width", "460px");
        }
    }
    catch (e) {
        console.log(e);}
}
function imgError(image) {
    image.onerror = "";
    image.src = "images/no_img.png";
    return true;
}



function LoadSearchData(type) {
    try {
        var searchtexttemp = $('#txtSearch').val().toLowerCase();
        searchtext = $.trim(searchtexttemp);

        if (searchtext == '') {
            w2alert('Please enter a keyword to search.');
            return false;
        }
        else {
         
            data=OuterSavingTips.SearchData( searchtext,type)
            var title, index;
            if (data.value != null) {
                arrfound = [];
                arrnotfound = [];
                for (i = 0; i < data.value.Rows.length; i++) {
                    title = data.value.Rows[i].Title.toLowerCase();
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
                    w2alert($('#SearchErrMsg').text());
                  
                    $('#txtSearch').focus();
                    return false;
                }
            }
            else {

                w2alert($('#SearchErrMsg').text());
               
                $('#txtSearch').focus();
                return false;
            }
        }
    }
    catch (e) { }
}

function loadTips() {
    try {
        DrawTips();

    }
    catch (e) { }
}

function DrawTips() {
    str = '';
    if (!issearch) {
        if (data != null) {
            for (i = 0; i < data.value.Rows.length; i++) {
                BindSavingTips(i,type);
            }
            $("#dvRebateContainer").hide();
            $("#dvDrProgramsContainer").hide();
            $("#dvSavingTipsContainer").hide();
            $("#dvEducationalTipsContainer").hide();
            $('.SearchContainer').html(str);
            $('.SearchContainer').show();
        }
    }
    else {

        for (i = 0; i < arrfound.length; i++) {
            BindSavingTips(arrfound[i],type);
        }
        for (i = 0; i < arrnotfound.length; i++) {
            BindSavingTips(arrnotfound[i],type);
        }
        $("#dvRebateContainer").hide();
        $("#dvDrProgramsContainer").hide();
        $("#dvSavingTipsContainer").hide();
        $("#dvEducationalTipsContainer").hide();
        $('.SearchContainer').html(str);
        $('.SearchContainer').show();
       // $('.right_content_box').html(str);
        issearch = false;
        count = 1;
    }

}

// bind data to page
function BindSavingTips(i, type) {
    var ImgURL = (data.value.Rows[i].ImageUrl == "") ? "images/no_img.png" : (AttachmentUrl + data.value.Rows[i].ImageUrl);
    str += '<div class="efficiency_area">'
    str += '<ul>'
    str += '<li><div class="top_div_img">'
    str += '<Label globalize="ML_ENERGY_EFFICIENCY_Lbl_Rebate" id="lblPromotionId" Text=' + data.value.Rows[i].PromotionId + ' runat="server" Visible="false" ClientIDMode="Static"></Label>'
    str += '<img src=' + ImgURL + ' globalize="MLshow_ENERGY_EFFICIENCY_Img_ImgURL" style="width: 100%!important; height: 105px; border-bottom: 1px solid #ccc;" onerror="imgError(this);"></div>'
    str += '<div class="content_energy_area">'
    str += '<h1><span globalize="ML_ENERGY_EFFICIENCY_Lbl_Title">' + data.value.Rows[i].Title + '</span></h1>'
    str += '<h2 style="display:' + ((type) == 3 ? "none" : "block") + '";">'
    if(data.value.Rows[i].RebateProgramDesc!=""){
        str+= '<span globalize="ML_Programs_li_Type" style="padding-right: 2px; font-weight: bold;">Type: </span><span class=".cnttype .popup">' + data.value.Rows[i].RebateProgramDesc + '</span>'
  
    }
    str += '</h2>'
    if (/<\/?[^>]*>/.test(data.value.Rows[i].Description)) {
        str += '<p>' + (data.value.Rows[i].Description.length > 100 ? $(data.value.Rows[i].Description).text().substring(0, 100) + "..." : $(data.value.Rows[i].Description).text()) + ' <a href="#" id="' + data.value.Rows[i].PromotionId + '" class="readmore" onclick="ShowContent(id,"2");" data-toggle="modal" data-target="#showdetails_effi">Read More</a> </p>'
    }
    else {
        str += '<p>' + (data.value.Rows[i].Description.length > 100 ? data.value.Rows[i].Description.substring(0, 99) + "..." : data.value.Rows[i].Description) + ' <a href="#" id="' + data.value.Rows[i].PromotionId + '"class="readmore" onclick="ShowContent(id,"2");" data-toggle="modal" data-target="#showdetails_effi">Read More</a> </p>'
    }
    str += '<div class="bottom_efficiency">'
    str += '<div class="like_area">'
    if ($('#hdnLike').val() == "True") {
        str += '<a href="#" class="' + ((data.value.Rows[i].PromotionLike) == "1" ? "like_lnk" : "like_lnk_ro") + '" id="LK_' + data.value.Rows[i].PromotionId + '"></a>'
        str += ' <span>Likes</span>'
        str += '<span style="padding: 6px 3px 0; width: 32px;" id="LC_' + data.value.Rows[i].PromotionId + '">' + data.value.Rows[i].LikeCount + '</span>'
    }
    str += '</div>'
    str += '<div class="added_vote_area">'
    str += '<ul>'
    if (type == 3) {
        str += '<li style="' + ($('#hdnRegister').val() == "False" ? "display:none;" : "display:block;") + '> <span style="padding-right: 2px; font-weight: bold;" globalize="ML_ENERGY_EFFICIENCY_Lbl_Added">Registered:</span>'
        str += '<span class=".cntadded .popup">' + data.value.Rows[i].AddedCount + '</span>'
        str += '</li>'
    }
   if (type != 3 && type != 4) {
       str += '<li style="' + ($('#hdnRegister').val() == "False" ? "display:none;" : "display:block;") + '> <span style="padding-right: 2px; font-weight: bold;" globalize="ML_Efficiency_Lbl_Register">Registered:</span>'
        str += '<span class=".cntadded .popup">' + data.value.Rows[i].AddedCount + '</span>'
        str += '</li>'
    }
 

    str += '<li><span style="padding-right: 1px; font-weight: bold;" globalize="ML_SvngTips_li_Viewed">Viewed:</span>'
    str += ' <span id="SC_' + data.value.Rows[i].PromotionId + '" class=".cntviews .popup"> ' + data.value.Rows[i].Views + ' </span>'
    str += '</li>'
    str += '</ul>'
    str += '</div>'
    if ($('#hdnRegister').val() == "True") {
        if (type == 1) {
            str += '<div class="register"><a href="contact-us-connect-me.aspx?pid=r&q=' + data.value.Rows[i].Title + '&id=' + data.value.Rows[i].PromotionId + '" id="' + data.value.Rows[i].PromotionId + '">Register</a></div>'
        }
        else if (type == 2) {
            str += '<div class="register"><a href="contact-us-connect-me.aspx?pid=p&q=' + data.value.Rows[i].Title + '&id=' + data.value.Rows[i].PromotionId + '" id="' + data.value.Rows[i].PromotionId + '">Register</a></div>'
        }
    }
   
    str += '</div>'
    str += '<div class="ShowDetailsDiv" id="ST_' + data.value.Rows[i].PromotionId + '_Content">' + data.value.Rows[i].Description + '</div>'
    str += '</li>'
    str += '</ul>'
    str += '</div>'
  


}

$(document).on('click', '.readmore', function (event) {
    var id = this.id;
    $(this).data("toggle", "modal");
    $(this).data("target", "#showdetails_effi")
    ShowContent(id, idType);

});
$(document).on('click', '.register', function (event) {
    var id = this.id;
    $(this).data("toggle", "modal");
    $(this).data("target", "#showdetails_effi")
    ShowContent(id, idType);

});

var app = angular.module("OuterSavingsApp", ["ngSanitize"]).filter('to_trusted', ['$sce', function ($sce) {
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
app.controller("OuterSavingController", function ($scope, $http, $log, $sce) {
    $scope.$sce = $sce;
    $scope.NoRebate = '';
    $scope.NoSaving = '';
    $scope.NoEducation = '';
    $scope.NoProgram = '';
    $scope.attachmentpath = $('#hdnAttachmentPath').val();
    $scope.showObj = {
        "display":"block"
    }
    $scope.hideObj = {
        "display": "none"
    }

    $scope.LoadData = function () {
        $http({method:'POST',
            url:"OuterSavingTips.aspx/getData1",
            data: {}
        }).then(function (response) {
            var result = JSON.parse(response.data.d);
            if (result != null) {
                $scope.NoSearch = $('#SearchErrMsg').text();                    //"No Tip found";
                // for saving tips
                if (result.SavingTips != null && result.SavingTips.length > 0) {
                    $scope.SavingTips = result.SavingTips;
                }
                else {
                    // #bug id 23732 resolved
                    $scope.NoSaving = $('#NoDataSaving').attr('ValidateMessage');// 'No Efficiency Data';
                }
                // for educational tips
                if (result.EducationTips != null && result.EducationTips.length > 0) {
                    $scope.EducationTips = result.EducationTips;
                }
                else {
                    $scope.NoEducation = $('#NoDataEducation').attr('ValidateMessage');// 'No Efficiency Data';
                }
                // for rebates tips 
                if (result.RebatesTips != null && result.RebatesTips.length > 0) {
                    $scope.RebatesTips = result.RebatesTips;
                } else {
                    $scope.NoRebate = $('#NoDataRebates').attr('ValidateMessage');//'No Efficiency Data';
                }

                // program tips
                if (result.ProgramTips != null && result.ProgramTips.length > 0) {
                    $scope.ProgramTips = result.ProgramTips;
                } else {
                    $scope.NoProgram = $('#NoDataPrograms').attr('ValidateMessage');//'No Efficiency Data';
                }
            }
            else {
                $scope.NoRebate = $('#NoDataRebates').attr('ValidateMessage');//'No Efficiency Data';
                $scope.NoSaving = $('#NoDataSaving').attr('ValidateMessage');//'No Efficiency Data';
                $scope.NoEducation = $('#NoDataEducation').attr('ValidateMessage')//$('#NoDataEducation').text();// 'No Efficiency Data';
                $scope.NoProgram = $('#NoDataPrograms').attr('ValidateMessage');//'No Efficiency Data';

            }
               
               
            },function errorCallback(response) {
                // called asynchronously if an error occurs
                $scope.NoRebate = $('#NoDataRebates').attr('ValidateMessage');//'No Efficiency Data';
                $scope.NoSaving = $('#NoDataSaving').attr('ValidateMessage');//'No Efficiency Data';
                $scope.NoEducation = $('#NoDataEducation').attr('ValidateMessage');// 'No Efficiency Data';
                $scope.NoProgram = $('#NoDataPrograms').attr('ValidateMessage');//'No Efficiency Data';
            })
    }
    //$scope.LoadData = function () {
    //    $.ajax({
    //        method: 'POST',
    //        url: "OuterSavingTips.aspx/getData1",
    //        data: {},
    //        dataType: "json",
    //        contentType: "application/json; charset=utf-8",
    //        async: false,
    //        success: function (response) {
    //            var result = JSON.parse(response.data.d);
    //            if (result != null) {
    //                $scope.NoSearch = $('#SearchErrMsg').text();                    //"No Tip found";
    //                // for saving tips
    //                if (result.SavingTips != null && result.SavingTips.length > 0) {
    //                    $scope.SavingTips = result.SavingTips;
    //                }
    //                else {
    //                    // #bug id 23732 resolved
    //                    $scope.NoSaving = $('#NoDataSaving').text();// 'No Efficiency Data';
    //                }
    //                // for educational tips
    //                if (result.EducationTips != null && result.EducationTips.length > 0) {
    //                    $scope.EducationTips = result.EducationTips;
    //                }
    //                else {
    //                    $scope.NoEducation = $('#NoDataEducation').text();// 'No Efficiency Data';
    //                }
    //                // for rebates tips 
    //                if (result.RebatesTips != null && result.RebatesTips.length > 0) {
    //                    $scope.RebatesTips = result.RebatesTips;
    //                } else {
    //                    $scope.NoRebate = $('#NoDataRebates').text();//'No Efficiency Data';
    //                }

    //                // program tips
    //                if (result.ProgramTips != null && result.ProgramTips.length > 0) {
    //                    $scope.ProgramTips = result.ProgramTips;
    //                } else {
    //                    $scope.NoProgram = $('#NoDataPrograms').text();//'No Efficiency Data';
    //                }
    //            }
    //            else {
    //                $scope.NoRebate = $('#NoDataRebates').text();//'No Efficiency Data';
    //                $scope.NoSaving = $('#NoDataSaving').text();//'No Efficiency Data';
    //                $scope.NoEducation = $('#NoDataEducation').text();// 'No Efficiency Data';
    //                $scope.NoProgram = $('#NoDataPrograms').text();//'No Efficiency Data';

    //            }

    //        },
    //        error: function errorCallback() {
    //            // called asynchronously if an error occurs
    //            $scope.NoRebate = $('#NoDataRebates').text();//'No Efficiency Data';
    //            $scope.NoSaving = $('#NoDataSaving').text();//'No Efficiency Data';
    //            $scope.NoEducation = $('#NoDataEducation').text();// 'No Efficiency Data';
    //            $scope.NoProgram = $('#NoDataPrograms').text();//'No Efficiency Data';
    //        }
    //    });
    //}
    $scope.LoadData();

    $scope.IncreaseViewCount = function (index,id,category) {
        try {
            if (category.toLowerCase() == 'saving tips')
            {
                if ($('#VC_' + id).html() != null && $('#VC_' + id).html() != "")
                    //$scope.SavingTips[index].Views = $('#VC_' + id).html();
                    $scope.SavingTips.filter(function (p) { return p.PromotionId == id; })[0].Views = $('#VC_' + id).html();
            }
            else if (category.toLowerCase() == 'educational tips') {
                if ($('#VC_' + id).html() != null && $('#VC_' + id).html() != "")
                    // $scope.EducationTips[index].Views = $('#VC_' + id).html();
                    $scope.EducationTips.filter(function (p) { return p.PromotionId == id; })[0].Views = $('#VC_' + id).html();
            }
            else if (category.toLowerCase() == 'rebates') {

                if ($('#VC_' + id).html() != null && $('#VC_' + id).html() != "")
                    // $scope.RebatesTips[index].Views = $('#VC_' + id).html();
                    $scope.RebatesTips.filter(function (p) { return p.PromotionId == id; })[0].Views = $('#VC_' + id).html();
            }
            else if (category.toLowerCase() == 'programs') {
                if ($('#VC_' + id).html() != null && $('#VC_' + id).html() != "")
                    //$scope.ProgramTips[index].Views = $('#VC_' + id).html();
                    $scope.ProgramTips.filter(function (p) { return p.PromotionId == id; })[0].Views = $('#VC_' + id).html();
            }
            
        }
        catch (e) {
            $log.error(e)
        }
    }
    

  $scope.clearSearch = function () {
        try{
            $scope.searchText = "";
        } catch (e) {
            $log.error(e)
        }
    }

})

    function printarea1() {
        $('.textDesc').hide();
        $('.descWithoutHtml').show();
        $('.desc').css('display', 'none');
        $('.ng-hide').hide();
            if ($('li.icon_rebates').hasClass('active')) {
                var contents = dvRebateContainer.innerHTML;
            }
            else if ($('li.icon_dr_programes').hasClass('active'))
            {
                var contents = dvDrProgramsContainer.innerHTML;
            }
            else if ($('li.icon_saving_tips').hasClass('active'))
            {
                var contents = dvSavingTipsContainer.innerHTML;
            }
            else if ($('li.educational_tips').hasClass('active'))
            {
                var contents = dvEducationalTipsContainer.innerHTML;
            }
            $('.textDesc').show();
            $('.descWithoutHtml').hide();
            $('.ng-hide').show();
            contents = contents.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
            var frame1 = document.createElement('iframe');
            frame1.name = "frame1";
            frame1.style.position = "absolute";
            frame1.style.top = "-1000000px";
            document.body.appendChild(frame1);
            var frameDoc = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document : frame1.contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head>');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                document.body.removeChild(frame1);
            }, 500);
            return false;
    }

    function printarea() {
        window.print();
    }