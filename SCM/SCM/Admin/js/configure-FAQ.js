var mode;
var databindtogrid, FAQData; var FAQTable = {};
var GridHeight = $(window).height();
var GridWidth = '';
var limit = 1000;
var ENFAQ;
var ENAnswer;
var SPFAQ;
var editorControl, editorControlSP, editorControlFR;
var SPAnswer;
var FRFAQ;
var FRAnswer;
var xml = '';

function EditorTextSize() {
    var flag = true;
    //var editorControl = $get("ContentPlaceHolder1_rightpanel_editorFAQEN_ctl02_ctl00").control;
    var content = $('#summernoteFAQEN').summernote('code'); // editorControl.get_content();
    var conwithouthtml = removeHTML(content);
    if (conwithouthtml.length > limit) {
        alert("Maximum" + limit + "characters allowed");
        content = content.substring(0, 999);
        editorControl.set_content(content);
        flag = false;
    }
    return flag;
}

$(document).ready(function () {

    $('#summernoteFAQEN').summernote();
    $('#summernoteFAQSP').summernote();
    $('#summernoteFAQFR').summernote();
    $('.dropdown-toggle').dropdown();
    GetData();
    $('#lblAddFAQ').click(function () {
        $('#hdnFAQ').val('');
        Popup.showModal('PopupAddFAQ', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
        $('#popuptitle').html('Add FAQ');
        //var editorControl = $get("ContentPlaceHolder1_rightpanel_editorFAQEN_ctl02_ctl00").control;
        //editorControl.set_content('');
        //var editorControlSpanish = $get("ContentPlaceHolder1_rightpanel_editorFAQSP_ctl02_ctl00").control;
        //editorControlSpanish.set_content('');
        //var editorControlFrench = $get("ContentPlaceHolder1_rightpanel_editorFAQFR_ctl02_ctl00").control;
        //editorControlFrench.set_content('');
        $('#summernoteFAQEN').summernote('code', '');
        $('#summernoteFAQSP').summernote('code', '');
        $('#summernoteFAQFR').summernote('code', '');
        $('#txtQuestionEN').val('');
        $('#txtQuestionSP').val('');
        $('#txtQuestionFR').val('');
        $('#BtnAdd').val('ADD');
        $('#BtnAdd').attr('title', 'Add');
        $(document.body).css("overflow", "hidden");//bugid23721
    });
    $("#ClosePopupAddFAQ").click(function () {
        Popup.hide('PopupAddFAQ');
        $(document.body).removeAttr("style");
    });
    $("#ClosePopupAddTopic2").click(function () {
        Popup.hide('showdetails_effiEnglish');
        $(document.body).removeAttr('style');
    });
    $("#ClosePopupAddTopic3").click(function () {
        Popup.hide('showdetails_effiSpanish');
        $(document.body).removeAttr('style');
    });
    $("#ClosePopupAddTopic4").click(function () {
        Popup.hide('showdetails_effiFrench');
        $(document.body).removeAttr('style');
    });
    $('#BtnAdd').click(function () {
        if (EditorTextSize()) {
            SaveUpdateFAQ();
        }
    });
  
    function SaveUpdateFAQ() {
        try {
            var SrNo = $('#hdnFAQ').val();
            if ($('#hdnFAQ').val() != "") {


                Mode = "2";
            }
            else {
                Mode = "1";
            }
            var editorMessagetext = "answer";
            if (ValidatePage('divSaveupdatePopup')) {

                createXml();
                var params = { 'Mode': Mode, 'SrNo': SrNo, 'xml': xml };
                loader.showloader();
                $.ajax({
                    type: "POST",
                    url: "configure-FAQ.aspx/SaveUpdateData",
                    data: JSON.stringify(params),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {

                        loader.hideloader();
                        var result = JSON.parse(response.d);
                        //if (ValidatearrayInList(result)) {
                            if (result.Table[0].STATUS == 1) {
                                alert(result.Table[0].Message);
                                Popup.hide('PopupAddFAQ');
                                GetData();
                            }
                       // }
                    },
                    //async: false,

                    failure: function (response) {
                        return response.d;
                        loader.hideloader();
                    }
                });
            }
        }


        catch (e) { console.log(e); }
    }
});

function createXml() {
    ENFAQ = $('#txtQuestionEN').val()

    //editorControl = $get("ContentPlaceHolder1_rightpanel_editorFAQEN_ctl02_ctl00").control;
    ENAnswer = encode_utf8($('#summernoteFAQEN').summernote('code')); // editorControl.get_content();

    SPFAQ = $('#txtQuestionSP').val()

    //editorControlSP = $get("ContentPlaceHolder1_rightpanel_editorFAQSP_ctl02_ctl00").control;
    SPAnswer = encode_utf8($('#summernoteFAQSP').summernote('code')); //editorControlSP.get_content();

    FRFAQ = $('#txtQuestionFR').val()

    //editorControlFR = $get("ContentPlaceHolder1_rightpanel_editorFAQFR_ctl02_ctl00").control;
    FRAnswer = encode_utf8($('#summernoteFAQFR').summernote('code')); // editorControlFR.get_content();

    xml = "<Root>";
    xml += "<Node>";
    xml += "<ENFAQ>" + ENFAQ + "</ENFAQ>";
    xml += "<ENAnswer>" + ENAnswer + "</ENAnswer>";
    xml += "<SPFAQ>" + SPFAQ + "</SPFAQ>";
    xml += "<SPAnswer>" + SPAnswer + "</SPAnswer>";
    xml += "<FRFAQ>" + FRFAQ + "</FRFAQ>";
    xml += "<FRAnswer>" + FRAnswer + "</FRAnswer>";
    xml += "</Node>";
    xml += "</Root>";
    return xml;
}
function encode_utf8(s) {
    var encodedStr = s.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
    return encodedStr;
}
var readWriteAccess = $('#hdnReadWrite').val() == "0" ? true : false;

function LoadGrid() {

    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
        { name: 'SrNo' },
        { name: 'FAQEnglish' },
        { name: 'AnswerEnglish' },
        { name: 'FAQSpanish' },
        { name: 'AnswerSpanish' },
         { name: 'FAQFrench' },
        { name: 'AnswerFrench' },
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };



    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxgrid").jqxGrid({
        width: "99.8%",
        source: dataAdapter,
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        height: GridHeight * .89,
        columnsheight: 38,
        theme: 'darkblue',
        altrows: true,
        rowsheight: 40,

        pageable: true,
        pagesizeoptions: ['10', '20', '35', '50'],
        pagesize: 20,

        columnsresize: true,
        columnsreorder: true,
        columns:
        [
               { text: 'SrNo', dataField: 'SrNo', hidden: true, width: '0%' },
                   { text: 'Action', dataField: 'Action', width: '10%', align: 'center', cellsrenderer: imagerenderer, hidden: readWriteAccess },
            { text: 'English', dataField: 'FAQEnglish',width: '50%', cellsrenderer: imagerenderer },
            { text: 'Spanish', dataField: 'FAQSpanish',width: '50%', cellsrenderer: imagerenderer },
             { text: 'French', dataField: 'FAQFrench', width: '50%',cellsrenderer: imagerenderer },
        ]
    });

}

var imagerenderer = function (row, datafield, value) {
    var SrNo = $('#jqxgrid').jqxGrid('getrowdata', row).SrNo;

    switch (datafield) {
        case "Action":

            var editButton = '<a  style="text-align:center; margin-top:2px;display:block;color:#000;cursor:pointer;"><i class="fa fa-pencil-square-o Gridimage" style="margin-top:9px;" id="editImg" title="Update" onClick="edit(' + row + ')"></i></a>';
            var deleteButton = '<a href="#" style="text-align:center; margin-top:2px;display:block;color:#f20202;"><i class="fa fa-times Gridimage" style="margin-top:9px;" id="deletImg" title="Delete" onClick="deleteFAQ(' + row + ')" /></a>';
            return '<center><table><tr><td>' + editButton + '</td><td style="Padding-Left:8px;">' + deleteButton + '</td></tr></table></center>';
            break;
        case "FAQEnglish":
            var Title = $('#jqxgrid').jqxGrid('getrowdata', row)["FAQEnglish"];
            var displayButton = '<a href="#" style="padding-left:12px;display:block;padding-top:12px" id="displayDetails" title=' + Title + ' onClick=ShowContent(' + row + ')>' + Title + '</a>';
            return displayButton;
            break;
        case "FAQSpanish":
            var Title = $('#jqxgrid').jqxGrid('getrowdata', row)["FAQSpanish"];
            var displayButton = '<a href="#" style="padding-left:12px;display:block;padding-top:12px" id="displayDetailsSpanish" title=' + Title + ' onClick=ShowContentSpanish(' + row + ')>' + Title + '</a>';
            return displayButton;
            break;
        case "FAQFrench":
            var Title = $('#jqxgrid').jqxGrid('getrowdata', row)["FAQFrench"];
            var displayButton = '<a href="#" style="padding-left:12px;display:block;padding-top:12px" id="displayDetailsFrench" title=' + Title + ' onClick=ShowContentFrench(' + row + ')>' + (Title != null ? Title : "") + '</a>';
            return displayButton;
            break;

    }
}

function GetData() {
    try {

        mode = 0;
        var param = { 'Mode': mode };
        CallAjax(Error, param);

    } catch (e) {
        console.log(e.message);
    }
}

function CallAjax(fnError, param) {
    try {
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "configure-FAQ.aspx/GetFrequentlyAskedQuestions",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, status, type) {
                FAQData = $.parseJSON(response.d);
                    ConvertData();
                    var length = parseInt(FAQTable.Tables[0].Rows.length);
                    if (length > 0) {
                        $('#nodata_div').hide();
                        $('#jqxgrid').show();
                        databindtogrid = FAQTable.Tables[0].Rows;
                        var length = parseInt(FAQTable.Tables[0].Rows.length);
                        LoadGrid();


                    } else {

                        $('#nodata_div').show();
                        $('#jqxgrid').hide();
                    }
                    loader.hideloader();
            },
            error: fnError,
        })
    }
    catch (e) {
        loader.hideloader();
    }
}

function ConvertData() {
    try {
        Tables = new Array();
        $.map(FAQData, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        FAQTable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}

function edit(rowNum) {

    $(".ajax__htmleditor_htmlpanel_default").css("display", "none");
    //$('[name="ContentPlaceHolder1_rightpanel_editorFAQEN_ctl02_ctl00"]').css("display", "block")
    //$('[name="ContentPlaceHolder1_rightpanel_editorFAQSP_ctl02_ctl00"]').css("display", "block")
    //$('[name="ContentPlaceHolder1_rightpanel_editorFAQFR_ctl02_ctl00"]').css("display", "block")
    $('#summernoteFAQEN').show();
    $('#summernoteFAQSP').show();
    $('#summernoteFAQFR').show();
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', rowNum);

    var SrNo = ViewObj.SrNo;
    $('#hdnFAQ').val(SrNo);
    var FAQEnglish = ViewObj.FAQEnglish;
    var AnswerEnglish = ViewObj.AnswerEnglish;
    //var editorControlEnglish = $get("ContentPlaceHolder1_rightpanel_editorFAQEN_ctl02_ctl00").control;

    var FAQSpanish = ViewObj.FAQSpanish;
    var AnswerSpanish = ViewObj.AnswerSpanish;
    //var editorControlSpanish = $get("ContentPlaceHolder1_rightpanel_editorFAQSP_ctl02_ctl00").control;

    var FAQFrench= ViewObj.FAQFrench;
    var AnswerFrench = ViewObj.AnswerFrench;
    //var editorControlFrench = $get("ContentPlaceHolder1_rightpanel_editorFAQFR_ctl02_ctl00").control;

    $('#popuptitle').html('Update FAQ');
    $('#BtnAdd').val('Update');
    $('#BtnAdd').attr('title', 'Update');

    Popup.showModal('PopupAddFAQ', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
    //editorControlEnglish.set_content('');
    //editorControlSpanish.set_content('');
    //editorControlFrench.set_content('');
    $('#summernoteFAQEN').summernote('code', '');
    $('#summernoteFAQSP').summernote('code', '');
    $('#summernoteFAQFR').summernote('code', '');
    $('#txtQuestionEN').val(FAQEnglish);
    //editorControlEnglish.set_content(AnswerEnglish);
    $('#summernoteFAQEN').summernote('code', AnswerEnglish);
    $('#txtQuestionSP').val(FAQSpanish);
    //editorControlSpanish.set_content(AnswerSpanish);
    $('#summernoteFAQSP').summernote('code', AnswerSpanish);
    $('#txtQuestionFR').val(FAQFrench);
    //editorControlFrench.set_content(AnswerFrench);
    $('#summernoteFAQFR').summernote('code', AnswerFrench);
}

function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

function removeHTML(text) {
    var el = document.createElement("div");
    el.innerHTML = text;
    r = el.innerText = el.textContent;
    return r;
}

function deleteFAQ(Num) {
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', Num);
    var SrNo = ViewObj.SrNo;
    var Mode = "3";
    if (confirm('Are you sure you want to delete?')) {

        var params = { 'Mode': Mode, 'SrNo': SrNo };
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "configure-FAQ.aspx/DeleteData",
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                loader.hideloader();
                var result = JSON.parse(response.d);
               // if (ValidatearrayInList(result)) {
                    if (result.Table[0].STATUS == 1) {
                        alert(result.Table[0].Message);
                        Popup.hide('PopupAddFAQ');
                        GetData();
                    }
              //  }

            },
            //async: false,

            failure: function (response) {
                return response.d;
                loader.hideloader();
            }
        });


    }
}

function ShowContent(id) {
    try {
        var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', id);
        var SrNo = ViewObj.SrNo;
        var FAQ = ViewObj.FAQEnglish;
        var Answer = ViewObj.AnswerEnglish;
        $('#div_descriptionEnglish').html(Answer);
        Popup.showModal('showdetails_effiEnglish', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
    }
    catch (e) { }
}

function ShowContentSpanish(id) {
    try {
        var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', id);
        var SrNo = ViewObj.SrNo;
        var FAQ = ViewObj.FAQSpanish;
        var Answer = ViewObj.AnswerSpanish;
        $('#div_descriptionSpanish').html(Answer);
        Popup.showModal('showdetails_effiSpanish', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
    }
    catch (e) { }
}

function ShowContentFrench(id) {
    try {
        var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', id);
        var SrNo = ViewObj.SrNo;
        var FAQ = ViewObj.FAQFrench;
        var Answer = ViewObj.AnswerFrench;
        $('#div_descriptionFrench').html(Answer);
        Popup.showModal('showdetails_effiFrench', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
    }
    catch (e) { }
}
