(function ($, window, document, undefined) {

    var pluginName = "strength",
        defaults = {
            strengthClass: 'strength',
            strengthMeterClass: 'strength_meter',
            strengthButtonClass: 'button_strength',
            strengthButtonText: $('#ML_passwordmeter_lbl_show').text(), //'Show Password',
            strengthButtonTextToggle: $('#ML_passwordmeter_lbl_hide').text() //'Hide Password'
        };

    // $('<style>body { background-color: red; color: white; }</style>').appendTo('head');

    function Plugin(element, options) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function () {
           

            // added for spanish text translation 
            // button for show/hide
            this.options.strengthButtonText = $('#ML_passwordmeter_lbl_show').text();
            this.options.strengthButtonTextToggle = $('#ML_passwordmeter_lbl_hide').text();
            var isShown = false;
            var strengthButtonText = this.options.strengthButtonText;
            var strengthButtonTextToggle = this.options.strengthButtonTextToggle;


            thisid = this.$elem.attr('id');

            this.$elem.addClass(this.options.strengthClass).attr('data-password', thisid).after('<input style="display:none" class="' + this.options.strengthClass + '" data-password="' + thisid + '" id="txtpasswordmeter" title="New Password" globalize="ML_CHANGEPWDPOPUP_NEWPWD" type="text" name=""  mandatory="1" maxlength="16" value=""><div class=strengthdiv><a data-password-button="' + thisid + '" href="" class="' + this.options.strengthButtonClass + '">' + this.options.strengthButtonText + '</a></div>');

            function hidePwIndctrDiv() {
                $('#pswd_info').hide();
            }

            function showPwIndctrDiv() {
                $('#pswd_info').show();
            }
            function addValidInvalid(pswd) {
                try {
                    var specialchars = new RegExp('([@,#,$,&,%,*,!])');
                    if (pswd.length < 8) {
                        $('#length').removeClass('valid').addClass('invalid');
                    } else {
                        $('#length').removeClass('invalid').addClass('valid');
                    }

                    //validate letter
                    if (pswd.match(/[A-z]/)) {
                        $('#letter').removeClass('invalid').addClass('valid');
                    } else {
                        $('#letter').removeClass('valid').addClass('invalid');
                    }

                    //validate capital letter
                    if (pswd.match(/[A-Z]/)) {
                        $('#capital').removeClass('invalid').addClass('valid');
                    } else {
                        $('#capital').removeClass('valid').addClass('invalid');
                    }

                    //validate number
                    if (pswd.match(/\d/)) {
                        $('#number').removeClass('invalid').addClass('valid');
                    } else {
                        $('#number').removeClass('valid').addClass('invalid');
                    }

                    if (pswd.match(specialchars)) {
                        $('#specialChar').removeClass('invalid').addClass('valid');
                    } else {
                        $('#specialChar').removeClass('valid').addClass('invalid');
                    }

                }
                catch (e) {
                    console.log(e);
                }
            }

            this.$elem.bind('keyup keydown', function (event) {
                thisval = $('#' + thisid).val();
                $('input[type="text"][data-password="' + thisid + '"]').val(thisval);
                //check_strength(thisval, thisid);

                var pswd = $('#' + thisid).val();
                addValidInvalid(pswd);

            }).focus(function () {
                //$('#pswd_info').show();
                showPwIndctrDiv();
            }).blur(function () {
                hidePwIndctrDiv();
                //$('#pswd_info').hide();
            });;

            $('input[type="text"][data-password="' + thisid + '"]').bind('keyup keydown', function (event) {
                thisval = $('input[type="text"][data-password="' + thisid + '"]').val();
                $('input[type="password"][data-password="' + thisid + '"]').val(thisval);
                //check_strength(thisval, thisid);

                var pswd = thisval;
                addValidInvalid(pswd);

            }).focus(function () {
                showPwIndctrDiv();
                //$('#pswd_info').show();
            }).blur(function () {
                hidePwIndctrDiv();
                //$('#pswd_info').hide();
            });;



            $(document.body).on('click', '.' + this.options.strengthButtonClass, function (e) {
                e.preventDefault();

                thisclass = 'hide_' + $(this).attr('class');



                $('#w2ui-tag-' + $('input[type="password"][data-password="' + thisid + '"]')[0].id + '').remove();
                $('#w2ui-tag-' + $('input[type="text"][data-password="' + thisid + '"]')[0].id + '').remove();
                if (isShown) {
                    $('input[type="text"][data-password="' + thisid + '"]').hide().css("display", "none !important");
                    $('input[type="password"][data-password="' + thisid + '"]').show().focus().css("display", "block !important");
                    $('a[data-password-button="' + thisid + '"]').removeClass(thisclass).html(strengthButtonText);
                    isShown = false;

                } else {
                    $('input[type="text"][data-password="' + thisid + '"]')[0].focus();
                    $('input[type="text"][data-password="' + thisid + '"]').focus().css("display", "block !important").show();
                    $('input[type="password"][data-password="' + thisid + '"]').hide().css("display", "none !important").focus();
                    $('a[data-password-button="' + thisid + '"]').addClass(thisclass).html(strengthButtonTextToggle);
                    isShown = true;



                }



            });




        },

        yourOtherFunction: function (el, options) {
            // some logic
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);