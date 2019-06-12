
$(document).ready(function () {
    loadTips();
});


//This method is used to show the description of a saving tip and will increase the view count.
function ShowContent(id) {
    try {
        var ContentDisplay = $("#" + id + "_Content").css('display');
        if (ContentDisplay == "none") {
            //$("#" + id).html("Click to Hide Details");
            //$("#" + id + "_Content").slideToggle("fast");
            //$('.discription_pro').html($("#" + id + "_Content").html());
            $('.discription_pro').html($("#" + id + "_Content").html());
            $('.img img').attr('src', ($("#" + id).parents('li').find('.profile_img')[0].childNodes[1].firstElementChild.currentSrc));
            //  var ss = $("#" + "ST_102").parents('li').find('.view_details span[class*=Popup]')[0].innerText;
 
            var x = $("#" + id).parents('li').find('.view_details span[class*=Popup]')[0].textContent;
            var result = comEnergyEfficiency.ViewSavingTip(id.split('_')[1], "SavingTips", false, 0).value;//Upgrade Added count while clicking on Read More
            if (result != null) {
                $('#VC_' + id.split('_')[1]).html(result.Rows[0].UpdatedCount);
                $('.viwtxt').html(result.Rows[0].UpdatedCount);
            }
            $('.addtxt').html($("#" + id).parents('li').find('.view_details span[class*=Popup]')[1].textContent);
            //$('.viwtxt').html($("#" + id).parents('li').find('.view_details span[class*=Popup]')[1].textContent);
            $('.saveupto').html('$'+$("#" + id).parents('li').find('.view_details span[class*=Popup]')[3].textContent);
            $('.modal-title').html($("#" + id).parents('li').find('.view_details span[class*=Popup]')[0].textContent);

          
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
            $('.modal-title').html($("#" + id).parents('li').find('.view_details span[class*=popup]')[0].innerText);
        }
    }
    catch (e) { }
}



function deleteSavingTipAsync(id) {
    try {
        var res=w2confirm($('#ConfirmDel').text(),function(obj)
        {
            if (obj == 'Yes')
            {
                loader.showloader();
                function OnSuccess(data, status) {
                    var status = JSON.parse(data.d);
                    if (status[0].Status == "1") {
                        toastr.success(status[0].Message);
                       $("ul li[RowId=" + id + "]").remove();
                        $.ajax({
                            type: "POST",
                            url: "yearly-budget.aspx/DrawChartAsync",
                            data: {},
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                if (data.d.length > 0) {
                                    var count = 0;
                                    var saving = 0;
                                    var totalsubscribe = 0;
                                    var table0 =  $.parseJSON(data.d.split('|')[0]);
                                    var table1 = $.parseJSON(data.d.split('|')[1]);
                                    $.each(table1, function () {
                                        if (count == 0) {
                                            saving = this['Saving'];
                                            var PeriodFrom = this['PeriodFrom'];
                                            var mm = PeriodFrom.split(' ')[0].split('/')[0];
                                            var yyy = PeriodFrom.split(' ')[0].split('/')[2];
                                            var yyy1 = "";
                                            var mm1 = parseInt(mm) + 11;

                                            if (mm1 > 12) {
                                                mm1 = mm1 - 12;
                                            }

                                            if (mm == "1") {
                                                yyy1 = yyy;
                                            }
                                            else {
                                                yyy1 = parseInt(yyy) + 1;
                                            }
                                            mm = ConvertMonth(mm);
                                            mm1 = ConvertMonth(mm1.toString());
                                            var result = mm + " " + yyy + " " + "to" + " " + mm1 + " " + yyy1;
                                            $("[id$='lblAnnualPd']").html(result);
                                            count++;
                                        }
                                    });
                                    $.each(table0, function () {
                                        
                                        totalsubscribe = totalsubscribe + parseFloat(this['SavingValue']);
                                    });
                                    if (parseFloat(saving) < 0)
                                        saving = 0;
                                    var targetleft = parseFloat(totalsubscribe) - parseFloat(saving);
                                    if (targetleft < 0)
                                        targetleft = 0;
                                    if (totalsubscribe != 0) {
                                        var percentsaved = (Math.round(parseFloat(saving) / parseFloat(totalsubscribe)) * 100);
                                        var percentleft = (Math.round(parseFloat(targetleft) / parseFloat(totalsubscribe)) * 100);
                                        if (percentsaved > 0)
                                            $("[id$='lblachivedpercent']").html(percentsaved + "%");

                                        $("[id$='lblTargetleft']").html(" $ " + Math.round(targetleft).toString());
                                        $("[id$='lblCurrentMonthlySaving']").html("$"+parseFloat(saving).toString());
                                        //$("[id$='lblAnualSvngGoal']").html(" $ " + Math.Round(totalsubscribe).toString());
                                        //$("[id$='lblTotalSaving']").html("$"+totalsubscribe.toFixed(2)+ "/Year");//Added by khushbu kansal to update total annual saving after deleting tip
                                        $("[id$='lblTotalSaving']").html("$" + totalsubscribe.toFixed(2) );//Added by khushbu kansal to update total annual saving after deleting tip

                                    }
                                    else {
                                        $("[id$='lblachivedpercent']").html("0" + "%");

                                        $("[id$='lblTargetleft']").html("$" +"0.00");
                                        $("[id$='lblCurrentMonthlySaving']").html("$0.00");
                                      //  $("[id$='lblTotalSaving']").html("$0.00/Year");
                                        $("[id$='lblTotalSaving']").html("$0.00");
                                        $("[id$='lblSaving']").html("$" + "0.00");
                                        $("[id$='chtsaving']").html(" ");
                                        $("[id$='lblAnnualPd']").html(" ");
                                    }
                                    processed_json = [];
                                        
                                        processed_json.push({
                                            name: 'Saving',
                                            y: parseFloat(saving),
                                            //color: '#3366CC'
                                            color: colorarrHEX[0]
                                        });
                                        processed_json.push({
                                            name: 'Target',
                                            y: parseFloat(targetleft),
                                            //color: '#3366CC'
                                            color: colorarrHEX[1]
                                        });
                                        Bindbarheigh('bar', 'chtsaving')
                                }
                            },
                            error: function (result) {
                                toastr.error(result.toString());
                            }
                        });

                    }
                    else {
                        toastr.error(status[0].Message);
                    }
                    loader.hideloader();
                }
                function OnError(request, status, error) {
                    toastr.error(request.statusText);
                    loader.hideloader();
                }
                var param = "{promotionid:'" + id + "',isdelete:'1'}";
                $.ajax({
                    type: "POST",
                    url: "yearly-budget.aspx/AddDeleteSavingTips",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });
            }

    });
    } catch (e) {
        toastr.error(e);
    }
}

$('[id*="LK_"]').click(function () {
    try {
        var promotionid = this.id.split('_')[1];
        var islike;
        if (this.className.indexOf("_ro") > 0) {
            //    islike = 0;
            //    $(this).addClass('ST_LikeIcon').removeClass('ST_LikeIcon_ro');
            islike = 1;
            $(this).addClass('like_lnk').removeClass('like_lnk_ro');
        }
        else {
            //    islike = 1;
            //    $(this).addClass('ST_LikeIcon_ro').removeClass('ST_LikeIcon');
            islike = 0;
            $(this).addClass('like_lnk_ro').removeClass('like_lnk');
        }
        var result = comEnergyEfficiency.LikeSavingTip(promotionid, islike).value;
        if (result != null) {
            if (result.Tables[0].Rows[0].Status == '1')
                $('#LC_' + promotionid).html(result.Tables[1].Rows[0].UpdatedCount);
        }
    }
    catch (e) { }
});
var month;
function ConvertMonth(mm) {
    switch (mm) {
        case "1":
            return month = "Jan";
        case "2":
            return month = "Feb";
        case "3":
            return month = "March";
        case "4":
            return month = "April";
        case "5":
            return month = "May";
        case "6":
            return month = "June";
        case "7":
            return month = "July";
        case "8":
            return month = "Aug";
        case "9":
            return month = "Sep";
        case "10":
            return month = "Oct";
        case "11":
            return month = "Nov";
        case "12":
            return month = "Dec";
    }
}
function loadTips() {
    try {
        var totalsaving = 0;
        var data = yearly_budget.LoadAddedTips().value;
        var str = '';
        var like;
        var img;
        if (data != null) {
            $('#repeater').show();
            for (i = 0; i < data.Rows.length; i++) {
                totalsaving = totalsaving + parseFloat(data.Rows[i].SavingValue);
                like = (data.Rows[i].PromotionLike == null) ? 'ST_LikeIcon' : 'ST_LikeIcon_ro';
                img = (data.Rows[i].ImageUrl == "") ? 'images/saving.png' : AttachmentUrl + data.Rows[i].ImageUrl;
                str += '<div class="SavingTipsContainer">';
                str += '<div class="SavingTips_Image"><img src="' + img + '" alt="Saving Tip" /></div>';
                str += '<div class="SavingTips_Summary"><div class="SavingTips_Title">' + data.Rows[i].Title + '</div>';
                str += '<div class="SavingTips_PeopleAdded">';
                str += 'Added: ' + data.Rows[i].AddedCount + ', Viewed:' + " " + ' <span id="VC_' + data.Rows[i].PromotionId + '">' + data.Rows[i].Views + '</span></div>';
                str += '<div class="SavingTips_ClicktoDetails" id="ST_' + data.Rows[i].PromotionId + '" onclick="ShowContent(id);">Click to Show Details</div></div>';
                str += '<div class="SavingTips_Savings">Save Upto <span>$' + data.Rows[i].SavingValue + '</span> Annually.</div>';
                str += '<div class="SavingTips_Likes"><div id="LK_' + data.Rows[i].PromotionId + '" class="' + like + '" title="Like">&nbsp;</div><div>Likes: <span id="LC_' + data.Rows[i].PromotionId + '">' + data.Rows[i].LikeCount + '</span></div></div>';
                str += '<div class="SavingTips_AddChckbox"><img id="' + data.Rows[i].PromotionId + '" src="images/Payment_DeleteIcon.png" onclick="return deleteSavingTip(id);" /></div><div class="clear">&nbsp;</div>';
                str += '<div class="SavingTips_Details" id="ST_' + data.Rows[i].PromotionId + '_Content">' + data.Rows[i].Description + '</div>';
                str += '<div class="clear">&nbsp;</div></div>';
            }

            $('#YearlyBudget_Content').html(str);
            //$('#lblTotalSaving').html("$"+totalsaving.toFixed(2)+"/Year");
            $('#lblTotalSaving').html("$" + totalsaving.toFixed(2) );
            rootData = data.Rows.length;
            if (rootData == 0) {
                $('#chtsaving').html('<span style="color:red;    font-size: 15px;">' + $('#ML_AnnualGoal_ErrMsg').text() + '</span>');
                // toastr.error('Sorry. Your account data is not available at this time. Please try again later or contact customer support.');
               
                return;
            }
        }
        else
            $('#repeater').hide();

    }
    catch (e) { }
}

var app = angular.module("EfficiencyApp", ["ngSanitize"]).controller("EfficiencyController", function ($scope) {


})