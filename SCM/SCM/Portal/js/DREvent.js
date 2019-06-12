var data, datasetEvents;
var saveAmount, url;
var index;
var issearch = false;
arrfound = [];
arrnotfound = [];
var str = '';
var promotionid = 0;
$(document).ready(function () {

    var oldPromotionId = $("[id$='hdnPromotionId']").val();
    promotionid = $('.lblpro1').attr('name');
    if (oldPromotionId != promotionid) {
        promotionid = oldPromotionId;
        $('#secondLabel').removeClass();
        $('#secondLabel').addClass('InActiveTab');
        $('#firstLabel').removeClass();
        $('#firstLabel').addClass('ActiveTab');
    }
    else {
        $('#secondLabel').removeClass();
        $('#secondLabel').addClass('ActiveTab');
        $('#firstLabel').removeClass();
        $('#firstLabel').addClass('InActiveTab');
    }

    


    data = DREvent.UpcomingEvents(promotionid).value;

    UpcomingDrEvents(promotionid);

    datasetEvents = DREvent.PastEvents(promotionid).value;
    data = datasetEvents.Tables[0];
    PastDrEvent(promotionid);
    saveAmount = datasetEvents.Tables[1].Rows[0]["Saving"];
    if (saveAmount != null) {
        $("[id$='lblTotalSaving']").html(saveAmount);
    }
    else
        $("[id$='lblTotalSaving']").html(0);

});

$('.lblpro1').live('click', function () {

    
       
    
    var promotionid = $('.lblpro1').attr('name');
    data = DREvent.UpcomingEvents(promotionid).value;
    UpcomingDrEvents(promotionid);
    datasetEvents = DREvent.PastEvents(promotionid).value;
    data = datasetEvents.Tables[0];
    var promotionEventId = data.Rows[0]["PromotionEventId"];
    PastDrEvent(promotionid);
    saveAmount = datasetEvents.Tables[1].Rows[0]["Saving"];
    if (saveAmount != null) {
        $("[id$='lblTotalSaving']").html(saveAmount);
    }
    else
        $("[id$='lblTotalSaving']").html(0);

    url = window.location.href;
    index = url.indexOf('?');
    if (index != -1)
        url = url.substring(0, index);

    url = url + '?PromotionEventId=' + promotionEventId + '&PromotionId=' + promotionid;
    window.location.href = url;
    
});

$('.lblpro2').live('click', function () {


    var promotionid = $('.lblpro2').attr('name');
    data = DREvent.UpcomingEvents(promotionid).value;
    UpcomingDrEvents(promotionid);
    datasetEvents = DREvent.PastEvents(promotionid).value;
    data = datasetEvents.Tables[0];
    var promotionEventId = data.Rows[0]["PromotionEventId"];
    PastDrEvent(promotionid);
    saveAmount = datasetEvents.Tables[1].Rows[0]["Saving"];
    if (saveAmount != null) {
        $("[id$='lblTotalSaving']").html(saveAmount);
    }
    else
        $("[id$='lblTotalSaving']").html(0);
   
    url = window.location.href;
    index = url.indexOf('?');
    if(index != -1)
        url = url.substring(0, index);

    url = url + '?PromotionEventId=' + promotionEventId + '&PromotionId=' + promotionid;
    window.location.href = url;
    
});


function UpcomingDrEvents(promotionid) {

    var str = "";
    var rad1 = false;
    var rad2 = false;
    for (var i = 0; i < data.Rows.length; i++) {
        if (data.Rows[i].EventOption == "Opt In") {
            rad1 = true;
            rad2 = false;
        }
        else if (data.Rows[i].EventOption == "Opt Out") {
            rad2 = true;
            rad1 = false;
        }
        else {
            rad2 = false;
            rad1 = false;
        }

        str += '<div class="eventrow"   id=' + data.Rows[i].PromotionEventId + ' ><div class="ST_Title_date upcomingevt">' + data.Rows[i].PromotionEventStartDate + '</div>';
        str += '<div class="ST_Title_Savingsmall">' + data.Rows[i].Duration + '</div><div class="radioLeft">Opt In <input onclick="setevent(' + data.Rows[i].PromotionEventId + ',1)" id="rdOpt" type="radio" name="radioOpt' + data.Rows[i].PromotionEventId + '" value="1" ' + (rad1 == true ? 'checked=checked' : "") + ' /></div><div class="radioLeft">Opt Out <input id="rdOpt" type="radio" onclick="setevent(' + data.Rows[i].PromotionEventId + ',2)" name="radioOpt' + data.Rows[i].PromotionEventId + '"  value="2"  ' + (rad2 == true ? 'checked=checked' : "") + '  /></div></div>';
        //str += +data.Rows[i].PromotionId;
        str += '<div class="clear">&nbsp;</div>';

    }

    $("#ST_UpcomingDREventContent").html(str);

}

function setevent(promotionid, radioValue) {
    DREvent.Save(promotionid, radioValue);
}





function PastDrEvent(promotionid) {

    str = "";
    if (data != null) {
        for (var i = 0; i < data.Rows.length; i++) {
            //str += '<div class="ST_Title_date">' + data.Rows[i].PromotionEventStartDate + '</div>';
            str += '<div class="ST_Title_date" class="ST_Title_Add"><a href="drevent.aspx?PromotionEventId=' + data.Rows[i].PromotionEventId + '&PromotionId=' + data.Rows[i].PromotionId + '">' + data.Rows[i].PromotionEventStartDate + '</a></div>';
            str += '<div class="ST_Title_Savingsmall">' + data.Rows[i].Duration + '</div><div class="ST_Title_Addoptin">' + data.Rows[i].EventOption + '</div><div class="ST_Title_savingsevents">' + data.Rows[i].Saving + '</div>';
            str += '<div class="clear">&nbsp;</div>';
        }
        $("#ST_PastDREventContent").html(str);
    }


}




