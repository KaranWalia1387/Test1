var data;
var issearch = false;
arrfound = [];
arrnotfound = [];
var str = '';

$(document).ready(function () {

    data = DemandResponse.LoadSavingTips().value;
    loadTips();
    $('#btnSearch').click(function () {
        LoadSearchData();
    });
});

function LoadSearchData() {
    try {
        var searchtext = $('#txtSearch').val().toLowerCase();
        searchtext = $.trim(searchtext);
        if (searchtext == '') {
           // toastr.warning('Please enter a keyword to search.')
          w2alert('Please enter a keyword to search.');
            $('#txtSearch').focus();
            return false;
        }
        data = DemandResponse.LoadSavingTips().value;
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
               // toastr.error('Keyword could not be found, please try your search again.')
              w2alert('Keyword could not be found, please try your search again.')
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
            $("#" + id).html("Hide Details(-)");
            $("#" + id + "_Content").slideToggle("fast");
            var promotionid = id.split('_')[1];
            var result = comEnergyEfficiency.ViewSavingTip(promotionid).value;
            if (result != null) {
                $('#VC_' + promotionid).html(result.Rows[0].UpdatedCount);
            }
        }
        else {
            $("#" + id).html("Show Details(+)");
            $("#" + id + "_Content").slideToggle("fast");
        }
    }
    catch (e) { }
}

function DrawTips() {
    str = '';
    if (!issearch) {
        if (data != null) {
            for (i = 0; i < data.Rows.length; i++) {
                BindSavingTips(i);
            }
            $('#ST_Content').html(str);
        }
    }
    else {

        for (i = 0; i < arrfound.length; i++) {
            BindSavingTips(arrfound[i]);
        }
        for (i = 0; i < arrnotfound.length; i++) {
            BindSavingTips(arrnotfound[i]);
        }
        $('#ST_Content').html(str);
        issearch = false;
    }

}

function BindSavingTips(i) {
   
    var Like;
    var img;
    like = (data.Rows[i].PromotionLike == null) ? 'ST_LikeIcon' : 'ST_LikeIcon_ro';
    img = (data.Rows[i].ImageUrl == "") ? 'images/saving.png' : AttachmentUrl + data.Rows[i].ImageUrl;
    str += '<div class="SavingTipsContainer">';
    str += '<div class="SavingTips_No">' + (i + 1) + '.</div>';
    str += '<div class="SavingTips_Image"><img src="' + img + '" alt="Saving Tip" /></div>';

    str += '<div class="SavingTips_Summary">';
    str += '<div class="SavingTips_Title">' + data.Rows[i].Title + '<div class="SavingTips_ClicktoDetails" id="ST_' + data.Rows[i].PromotionId + '" onclick="ShowContent(id);">Hide Details(-)</div></div>';
    str += '<div class="SavingTips_PeopleAdded">Enrolled: ' + data.Rows[i].AddedCount + ', Viewed:'+" "+' <span id="VC_' + data.Rows[i].PromotionId + '">' + data.Rows[i].Views + '</span></div>';

    //    str += '<div class="SavingTips_ClicktoDetails"><a href="' + ((parseInt(data.Rows[i].UserPromotionStatus) == 0) ? 'Terms & Conditions(PDF)' : +data.Rows[i].PromotionPdfUrl + '" target="_blank">Terms & Conditions(PDF)</a></div></div>');
    //    str += '<div class="clear">&nbsp;</div></div>';

    if ((data.Rows[i].UserPromotionStatus) != 0) {
        str += '<div class="SavingTips_ClicktoDetails"><a href="' + data.Rows[i].PromotionPdfUrl + '" target="_blank">Terms & Conditions(PDF)</a></div></div>';

    }
    else {
        str += '<div class="SavingTips_ClicktoDetails">' + 'Terms & Conditions(PDF)</div></div>';
    }


    // str += '<div class="SavingTips_ClicktoDetails" id="ST_' + data.Rows[i].PromotionId + '" onclick="ShowContent(id);">Terms & Conditions(-)</div></div>';
    str += '<div class="SavingTips_Savings">' + data.Rows[i].RebateProgramDesc + '</div>';

    //str += '<div class="SavingTips_AddChckbox"><a href="connect-me.aspx?pid=p&q=' + data.Rows[i].Title + '&id=' + data.Rows[i].PromotionId + '" target="_blank">Register</a></div><div class="clear">&nbsp;</div>';
    str += '<div class="SavingTips_AddChckbox"><a href="connect-me.aspx?pid=p&q=' + data.Rows[i].Title + '&id=' + data.Rows[i].PromotionId + '" target="_blank"></a></div>';

    str += '<div class="ST_title_Responcedate">' + ((parseInt(data.Rows[i].UserPromotionStatus) == 0) ? 'Unregister on ' + data.Rows[i].UserUnregisterDate : data.Rows[i].PromotionEnrollDate) + '</div>';


    //str += '<div class="ST_title_Responcedate">' + data.Rows[i].PromotionEnrollDate + '</div>';
    str += '<div class="ST_title_Responceduration">' + data.Rows[i].PromotionStartDate + 'to' + data.Rows[i].PromotionEndDate + '</div></div>';
    str += '<div class="clear">&nbsp;</div>';
    str += '<div class="SavingTips_Details" id="ST_' + ((parseInt(data.Rows[i].UserPromotionStatus) == 0) ? +data.Rows[i].PromotionId + '_Content">' + data.Rows[i].UnregisterDescription : +data.Rows[i].PromotionId + '_Content">' + data.Rows[i].Description) + '</div>';
    //str += '<div class="SavingTips_Details" id="ST_' + data.Rows[i].PromotionId + '_Content">' + data.Rows[i].Description + '</div>';
    str += '<div class="clear">&nbsp;</div>';

}


function loadTips() {
    try {
        DrawTips();
        $('[id^="LK_"]').click(function () {
            var promotionid = this.id.split('_')[1];
            var islike;
            if (this.className.indexOf("_ro") > 0) {
                islike = 0;
                $(this).addClass('ST_LikeIcon').removeClass('ST_LikeIcon_ro');
            }
            else {
                islike = 1;
                $(this).addClass('ST_LikeIcon_ro').removeClass('ST_LikeIcon');
            }
            var result = comEnergyEfficiency.LikeSavingTip(promotionid, islike).value;
            if (result != null) {
                if (result.Tables[0].Rows[0].Status == '1')
                    $('#LC_' + promotionid).html(result.Tables[1].Rows[0].UpdatedCount);
            }
        });
    }
    catch (e) { }
}