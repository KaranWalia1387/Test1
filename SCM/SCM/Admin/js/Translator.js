function TranslateMultiLingualControls() {
    try {
        var glbList = $('[globalize]');
        if (glbList.length > 0) {
            var controlIDList = "";
            var translatedJson = "";
            var translatedList = "";

            glbList.each(function (i) {

                controlIDList += glbList[i].attributes['globalize'].value + "|";
               
            });

                    
            var param = { controlIDList: controlIDList }
            $.ajax({
                type: "POST",
                url: $('#hdnCommonUrl').val() + "/Home.aspx/LoadTranslation",
                async:false,
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    translatedList = $.parseJSON(data.d).Headers;
                },
                error: function (request, status, error) { console.log('Error ' + error); }
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
                                glbList[i].value = locText;
                            }
                            else {
                                if (glbList[i].type != "textarea") {
                                    if (glbList[i].childElementCount <= 0) {
                                        glbList[i].textContent = locText;
                                    }
                                    else {

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
                        //if (locPlaceHolder != null && locPlaceHolder.trim().length > 0 && glbList[i].attributes['placeholder']) {
                        //    glbList[i].attributes['placeholder'].value = locPlaceHolder;
                        //}
                        if (locPlaceHolder != null && locPlaceHolder.trim().length > 0 && (glbList[i].type == 'textarea' || glbList[i].type == 'text')) {
                            var attpalceholder = document.createAttribute("placeholder");
                            attpalceholder.value = locPlaceHolder;
                                glbList[i].setAttributeNode(attpalceholder);
                           //   glbList[i].attributes['placeholder'].value = locPlaceHolder;
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
        //columns.records[i].text = LoadHeaderValue(columns.records[i].classname, arrHeaders);
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