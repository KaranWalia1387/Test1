

$(document).ready(function () {
    $('.rdowaterratetier').change(function () {
        $('.TierSetting').show();
        $('.fixedrate').hide();
    });

    $('.rdowaterratefixed').change(function () {
        $('.TierSetting').hide();
        $('.fixedrate').show();
    });

    $('#btnSaveFixedrate').click(function () {
        if ($.trim($('.txtFixedRate').val()) != '') {
            var result = configure_usage.SavefixedData($.trim($('.txtFixedRate').val())).value;
            if (result == '1')
                alert('Rates have been saved successfully and now please save settings.')
            else
                alert('Rates not saved.');
            return false;
        }
        else {
            alert('Please enter fixed rate.');
            $('.txtFixedRate').focus();
            return false;
        }
    });

    $('#btnSaveWaterRates').click(function () {
        var str = '<WaterPlan ID="' + $('.ddlPlanType option:selected').val() + '" >';

        $('.Tiercontainer').each(function () {
            str += '<Tier>';
            str += '<IndexTier>' + $(this).find('.TierName').html() + '</IndexTier>';
            if ($(this).find('.TierMin').val() != '')
                str += '<MinVolume>' + $(this).find('.TierMin').val() + '</MinVolume>';
            else {
                alert('Please enter rates.');
                return false;
            }
            if ($(this).find('.TierMax').val() != '')
                str += '<MaxVolume>' + $(this).find('.TierMax').val() + '</MaxVolume>';
            else {
                alert('Please enter rates.');
                return false;
            }
            if ($(this).find('.TierValue').val() != '')
                str += '<IndexRate>' + $(this).find('.TierValue').val() + '</IndexRate>';
            else {
                alert('Please enter rates.');
                return false;
            }
            str += '</Tier>';
        });
        str += '</WaterPlan>';

        var result = configure_usage.SavetiersData(str).value;
        if (result == '1')
            alert('Rates have been saved successfully and now please save settings.')
        else
            alert('Rates not saved.');
        return false;
    });

    //$('#li_powerunit input[type=checkbox]').on("click", countChecked("li_powerunit"));
    //$('#li_powermode input[type=checkbox]').on("click", countChecked("li_powermode"));
    //$('#li_waterunit input[type=checkbox]').on("click", countChecked("li_waterunit"));
    //$('#li_watermode input[type=checkbox]').on("click", countChecked("li_watermode"));
    //$('#li_gasunit input[type=checkbox]').on("click", countChecked("li_gasunit"));
    //$('#li_gasmode input[type=checkbox]').on("click", countChecked("li_gasmode"));
    $('input[type=checkbox]').click(function () {
      var liid=  $(this).parent().parent().attr('id');
     return countChecked(liid);
    });
    function countChecked(htmlid) {
        var count = 0;
        switch (htmlid) {
            case "li_powerunit":
                count = $('#li_powerunit input:checked').length;
                if (count == 0) {
                    alert("Atleast one option should be checked.");
                    return false;
                }
                break;
            case "li_powermode":
                count = $('#li_powermode input:checked').length;
                if (count == 0) {
                    alert("Atleast one option should be checked.");
                    return false;
                }
                break;
            case "li_waterunit":
                count = $('#li_waterunit input:checked').length;
                if (count == 0) {
                    alert("Atleast one option should be checked.");
                    return false;
                }
                break;
            case "li_watermode":
                count = $('#li_watermode input:checked').length;
                if (count == 0) {
                    alert("Atleast one option should be checked.");
                    return false;
                }
                break;
            case "li_gasunit":
                count = $('#li_gasunit input:checked').length;
                if (count == 0) {
                    alert("Atleast one option should be checked.");
                    return false;
                }
                break;
            case "li_gasmode":
                count = $('#li_gasmode input:checked').length;
                if (count == 0) {
                    alert("Atleast one option should be checked.");
                    return false;
                }
                break;
            default:
                break;

        }
    }

    //code added for making atleast one checkbox checked
    $(".usage-select").click(function () {
        var n = $(".usage-select input:checked").length;
        if (n == 0) {
            alert('Please select atleast one type of Usage');
            return false;
        }
    })

});