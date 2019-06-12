/*!
 * strength.js
 * Original author: @aaronlumsden
 * Further changes, comments: @aaronlumsden
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {

    var pluginName = "strength",
        defaults = {
            strengthClass: 'strength',
            strengthMeterClass: 'strength_meter',
            strengthButtonClass: 'button_strength',
            strengthButtonText: $('#ML_passwordmeter_lbl_show').text(), //'Show Password',
            strengthButtonTextToggle: $('#ML_passwordmeter_lbl_hide').text() //'Hide Password'
        };

       // $('<style>body { background-color: red; color: white; }</style>').appendTo('head');

    function Plugin( element, options ) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {


            var characters = 0;
            var capitalletters = 0;
            var loweletters = 0;
            var number = 0;
            var special = 0;

            var upperCase= new RegExp('[A-Z]');
            var lowerCase= new RegExp('[a-z]');
            var numbers = new RegExp('[0-9]');
          //  var specialchars = new RegExp('([!,%,&,@,#,$,^,*,?,_,~])');
            var specialchars = new RegExp('([@,#,$,&,%,*,!,_,.,-])');

            // added for spanish text translation 
            this.options.strengthButtonText = $('#ML_passwordmeter_lbl_show').text();
            this.options.strengthButtonTextToggle = $('#ML_passwordmeter_lbl_hide').text();
            function GetPercentage(a, b) {
                    return ((b / a) * 100);
                }

                function check_strength(thisval,thisid){
                    if (thisval.length >= 8) { characters = 1; } else { characters = -1; };
                    if (thisval.match(upperCase)) { capitalletters = 1} else { capitalletters = 0; };
                    if (thisval.match(lowerCase)) { loweletters = 1}  else { loweletters = 0; };
                    if (thisval.match(numbers)) { number = 1 } else { number = 0; };
                    if (thisval.match(specialchars)) { special = 1 } else { special = 0; };
                    var total = characters + capitalletters + loweletters + number + special;
                    var totalpercent = GetPercentage(7, total).toFixed(0);

                    if (!thisval.length) {total = -1;}

                    get_total(total,thisid,thisval.length);
                }

            function get_total(total,thisid,len){

                var thismeter = $('div[data-meter="' + thisid + '"]');
                var thisprogressmeter = $('div[data-meter-progress="' + thisid + '"]');
                
                var widthofmeter = 200;                 //$(thismeter).width();
                 
                if (total < 4 || len<8) {
                  
                    thismeter.removeClass().attr('class', '');
                    thismeter.addClass('weak').html($('#ML_MyAccount_PayemntInfo_InvalidPassword').text());
                    $(thisprogressmeter).removeClass().attr('class', '').addClass('weak-progressbar');
                }
              
                else if (total>4) {
                    if (len >= 11 && len<14) {
                        thismeter.removeClass().attr('class', '');
                        thismeter.addClass('strong').html($('#ML_Msg_PasswordCheck_Strong').text());
                        //$(thisprogressmeter).animate({ width: (widthofmeter * 0.75) + 'px' });
                        $(thisprogressmeter).removeClass().attr('class', '').addClass('strong-progressbar')
                    }
                    else if (len >=14  && len <=16) {
                        thismeter.removeClass().attr('class', '');
                        thismeter.addClass('Very_strong').html($('#ML_Msg_PasswordCheck_VeryStrong').text());
                        //$(thisprogressmeter).animate({ width: widthofmeter + 'px' });
                        $(thisprogressmeter).removeClass().attr('class', '').addClass('Very_strong-progressbar');
                    }
                    else if (len >=8 && len <11) {
                        thismeter.removeClass().attr('class', '');
                        thismeter.addClass('reasonable').html($('#ML_Msg_PasswordCheck_Reasonable').text());
                        //$(thisprogressmeter).animate({ width: (widthofmeter* 0.50) + 'px' });
                        $(thisprogressmeter).removeClass().attr('class', '').addClass('reasonable-progressbar')
                    }

                    else {
                        thismeter.removeClass().attr('class', '');
                        thismeter.addClass('weak').html($('#ML_MyAccount_PayemntInfo_InvalidPassword').text());
                        $(thisprogressmeter).removeClass().attr('class', '').addClass('weak-progressbar');
                    }
                }
                
                if (total == -1) {
                    thismeter.removeClass().html('').attr('class', '');
                    $(thisprogressmeter).removeClass().attr('class', '');
                }
            }





            var isShown = false;
            var strengthButtonText = this.options.strengthButtonText;
            var strengthButtonTextToggle = this.options.strengthButtonTextToggle;


            thisid = this.$elem.attr('id');

            this.$elem.addClass(this.options.strengthClass).attr('data-password', thisid).after('<input style="display:none" class="' + this.options.strengthClass + '" data-password="' + thisid + '" id="txtpasswordmeter" title="New Password" globalize="ML_CHANGEPWDPOPUP_NEWPWD" type="text" name=""  mandatory="1" maxlength="16" value=""><div class=strengthdiv><a data-password-button="' + thisid + '" href="" class="' + this.options.strengthButtonClass + '">' + this.options.strengthButtonText + '</a><div class="' + this.options.strengthMeterClass + '"><div data-meter="' + thisid + '"></div></div><div class="pro_wrapper"><div style="height:9px;float:left;border-radius:14px;" data-meter-progress="' + thisid + '"></div></div></div>');
             
            this.$elem.bind('keyup keydown', function(event) {
                thisval = $('#'+thisid).val();
                $('input[type="text"][data-password="'+thisid+'"]').val(thisval);
                check_strength(thisval,thisid);
                
            });

             $('input[type="text"][data-password="'+thisid+'"]').bind('keyup keydown', function(event) {
                thisval = $('input[type="text"][data-password="'+thisid+'"]').val();
                console.log(thisval);
                $('input[type="password"][data-password="'+thisid+'"]').val(thisval);
                check_strength(thisval,thisid);
                
            });



            $(document.body).on('click', '.'+this.options.strengthButtonClass, function(e) {
                e.preventDefault();

               thisclass = 'hide_'+$(this).attr('class');



               $('#w2ui-tag-' + $('input[type="password"][data-password="' + thisid + '"]')[0].id + '').remove();
               $('#w2ui-tag-' + $('input[type="text"][data-password="' + thisid + '"]')[0].id + '').remove();
                if (isShown) {
                    $('input[type="text"][data-password="'+thisid+'"]').hide().css("display","none !important");
                    $('input[type="password"][data-password="' + thisid + '"]').show().focus().css("display", "block !important");
                    $('a[data-password-button="'+thisid+'"]').removeClass(thisclass).html(strengthButtonText);
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

        yourOtherFunction: function(el, options) {
            // some logic
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );


