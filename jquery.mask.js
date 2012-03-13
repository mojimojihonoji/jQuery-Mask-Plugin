/*!
 * jQuery Mask Plugin
 *
 * http://blog.igorescobar.com/
 *
 * Copyright 2012, Igor Escobar
 *
 * Date: Sat Mar 10 03:50:23 2012
 */

/*jslint undef: false, browser: false, es5: true, maxerr: 50, indent: 2 */

(function ($){
  "use strict";

  var byPassKeys = [8,9,17,37,38,39,40,91],
    specialChars = {':': 191, '-': 189, '.': 190, '(': 57, ')': 48, '/': 191, ',': 188, '_': 189, ' ': 32, '+': 187},
    e, m, fieldObject, oValue, oNewValue, oCleanedValue, keyCode, keyPressedString;

  $.fn.mask = function (Mascara) {
    if (!$(this).attr('maxlength'))
      $(this).attr('maxlength', Mascara.length);

    $(this).live('keyup', function(e){

      e = e || window.event;
      keyCode = e.keyCode || e.which;

      if ($.inArray(keyCode, byPassKeys) >= 0)
        return true;

      applyMask(e, $(this), Mascara);

    });
  };

  var applyMask = function (e, fieldObject, Mascara) {
    oValue = fieldObject.val();

    oNewValue = '';
    oCleanedValue = oValue.replace(/\W/g, '');
    m = 0;

    for (var i = 0; i < oCleanedValue.length; i++){
      keyPressedString = oCleanedValue.charAt(i);

      var bufferedMasks  = '';
      while (typeof specialChars[Mascara.charAt(m)] === "number"){
        bufferedMasks += Mascara.charAt(m);
        m++;
      }
      m++;

      oNewValue += (bufferedMasks !== '') ? (bufferedMasks + keyPressedString) : keyPressedString;

      var nowMask = Mascara.charAt(oNewValue.length-1);
      keyPressedString = oNewValue.charAt(oNewValue.length-1);

      if (isNaN(parseInt(nowMask, 10)) === false && /\d/.test(keyPressedString) === false) {
        oNewValue = oNewValue.substring(0, oNewValue.length-1);
      } else if(nowMask === 'A' && /[a-zA-Z0-9]/.test(keyPressedString) === false) {
        oNewValue = oNewValue.substring(0, oNewValue.length-1);
      } else if(nowMask === 'S' && /[a-zA-Z]/.test(keyPressedString) === false) {
        oNewValue = oNewValue.substring(0, oNewValue.length-1);
      }
    }

    if(oNewValue !== fieldObject.val()) fieldObject.val(oNewValue);
  };
})(jQuery);