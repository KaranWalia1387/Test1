function TranslateMultiLingualControls() {
    try {
        var glbList = $('[globalize]');
        var mandatoryLst = $('[mandatory]'); // list of all keys which are mandatory=1
        var placeHolderToBeReplacedControlIdLst = [];

        if (mandatoryLst.length > 0)
        {
            mandatoryLst.each(function (i) {
                if (mandatoryLst[i].attributes['mandatory'].value == '1' && (mandatoryLst[i].type == "text" || mandatoryLst[i].type == "textarea" || mandatoryLst[i].type == "password"))
                {
                    //contains the control ids whose controlplaceholder values are to be replaced by text 'Mandatory'.
                    if (mandatoryLst[i].attributes['globalize'] != undefined)
                        placeHolderToBeReplacedControlIdLst.push($('[mandatory]')[i].attributes['globalize'].value);
                }
            });
        }

        if (glbList.length > 0) {
            var controlIDList = "";
            var translatedList = "";
            var flag = 0;

            glbList.each(function (i) {

                controlIDList += glbList[i].attributes['globalize'].value + "|";
               
            });

            var param = { controlIDList: controlIDList }
            $.ajax({
                type: "POST",
                url: $('#hdnCommonUrl').val() + "/account.aspx/LoadTranslation",
                async:false,
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    translatedList = $.parseJSON(data.d).Headers;
                },
                error: function (request, status, error)
                {
                    console.log('Error ' + error);
                }
            });
            //End

            glbList.each(function (i) {

                var locText = "";
                var locTitle = "";
                var locPlaceHolder = "";
                var locErrorMessage = "";
                var ControlType = "";
                for (var j = 0; j < translatedList.length; j++) {

                    if (translatedList[j].ControlId == glbList[i].attributes['globalize'].value) {

                        locText = translatedList[j].ControlText == null ? translatedList[j].ControlTitle : translatedList[j].ControlText;
                        locTitle = translatedList[j].AltTitle == null ? locText : translatedList[j].AltTitle;
                        locPlaceHolder = translatedList[j].ControlPlaceHolder;
                        locErrorMessage = translatedList[j].ErrorMessage;
                        ControlType = translatedList[j].ControlType;
                                 
                        if (locText != null && locText.trim().length > 0) {
                            if ((glbList[i].type == "submit") || (glbList[i].type == "button")) {
                               // glbList[i].value = locText;
                            }
                            else {
                                if (glbList[i].type != "textarea") {
                                    if (glbList[i].childElementCount <= 0) {
                                    }
                                   
                                }
                            }
                        }

                        var intatt = document.createAttribute("InputType");
                        if (ControlType != null && ControlType.trim().length > 0) {
                            intatt.value = ControlType;
                        }
                        else { intatt.value = ""; }

                        glbList[i].setAttributeNode(intatt);
                        var att = document.createAttribute("ValidateMessage");
                        if (locErrorMessage != null && locErrorMessage.trim().length > 0) {
                            att.value = locErrorMessage;
                        }
                        else if (locPlaceHolder != null && locPlaceHolder.trim().length > 0)
                            att.value = locPlaceHolder;
                        else {
                            if (locText != null && locText.trim().length > 0)
                                att.value = locText;
                        }
                        glbList[i].setAttributeNode(att);
                        if (glbList[i].previousSibling != null) {
                            if (glbList[i].previousSibling.localName == "img" && locTitle != null && locTitle.trim().length > 0) {
                                glbList[i].previousSibling.title = locTitle;
                            }
                        }
                        if (locTitle != null && locTitle.trim().length > 0) {
                            glbList[i].title = locTitle;
                        }

                     
                        if (glbList[i].type == 'textarea' || glbList[i].type == 'text' || glbList[i].type == 'password') {
                            var attpalceholder = document.createAttribute("placeholder");
                            
                            //below code replaces the controlplaceholder text as 'Mandatory' for mandatory controls.
                            for (var k = 0; k < placeHolderToBeReplacedControlIdLst.length; k++)
                            {
                                //if (glbList[i].attributes['globalize'].value == placeHolderToBeReplacedControlIdLst[k]) //Commented by pawan gupta
                                if (glbList[i].attributes['globalize'].value == placeHolderToBeReplacedControlIdLst[k] && glbList[i].attributes['mandatory'] != undefined)
                                {
                                    if (glbList[i].attributes['mandatory'].value == 1) {
                                        if (glbList[i].type == 'text' || glbList[i].type == 'password') //password type fields too to have 'Mandatory' as their placeholder.
                                            (translatedList[0].LanguageCode.toLowerCase() == 'en') ? attpalceholder.value = 'Mandatory' : attpalceholder.value = 'Obligatorio';
                                        else if (glbList[i].type == 'textarea')
                                            (translatedList[0].LanguageCode.toLowerCase() == 'en') ? attpalceholder.value = 'Mandatory (' + locPlaceHolder + ')' : attpalceholder.value = 'Obligatorio (' + locPlaceHolder + ')';

                                        flag = 1;
                                    }
                                    else {
                                        flag = 0;
                                    }
                                    break;
                                }
                                else
                                    flag = 0;                                                                                                       
                            }
                            if (flag == 0) {
                                if (ControlType == "Search") {
                                    attpalceholder.value = locPlaceHolder;
                                }
                                else { attpalceholder.value = ""; }  //Non-mandatory text and textareas will now have blank placeholders.
                              
                            }
                            glbList[i].setAttributeNode(attpalceholder);//Placeholder will only appear in case of mandatory field
                        }
                        break;
                    }
                }
            });
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

function TranslateGridHeaders(gridId) {

    //Loading All Coumns
    var columns = $("#" + gridId).jqxGrid('columns');
    var controlIDList = "";
    for (var i = 0; i < columns.records.length; i++) {
        controlIDList += columns.records[i].classname + "|";
    }

    var gridHeaders = Translator.LoadTranslation(controlIDList);
    var arrHeaders = $.parseJSON(gridHeaders.value).Headers;
    //Traversing through columns to change the value
    for (var i = 0; i < columns.records.length; i++) {
        $("#" + gridId).jqxGrid('setcolumnproperty', columns.records[i].datafield, 'text', LoadHeaderValue(columns.records[i].classname, arrHeaders));

    }

}

function LoadHeaderValue(key, array) {
    var value = null;
    for (var i = 0; i < array.length; i++) {
        if (array[i].ControlId == key) {
            value = array[i].ControlText;
            break;
        }
    }
    return value;
}



//for translate header text in multilingual feature for w2ui grid header
function w2UiTranslateGridHeaders(grid) {

    //Loading All Columns

    var column = grid.columns;
    controlIDList = "";
    for (var i = 0; i < grid.columns.length; i++) {
        controlIDList += grid.columns[i].classname + "|";
    }

    var gridHeaders = LoadMultiLingual(controlIDList);
    var arrHeaders = $.parseJSON(gridHeaders.value).Headers;
    //Traversing through columns to change the value
    for (var i = 0; i < grid.columns.length; i++) {

        var text = LoadHeaderValue(grid.columns[i].classname, arrHeaders);
        grid.columns[i].caption = text;

    }
    for (var y = 0; y < grid.searches.length; y++) {
        var text = LoadHeaderValue(grid.searches[y].classname, arrHeaders);
        grid.searches[y].caption = text;
    }

}

//for translate header text in other languages
function LoadMultiLingual(controlids) {

    return Translator.LoadTranslation(controlids);
}



$(document).ready(function () {
    TranslateMultiLingualControls();
})