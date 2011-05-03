(function( expose ) {
    
var lastTitleInput = '';
var noramlizedURL = '';

expose.fillNormaliseURL = function(e) {
    if (e.value != lastTitleInput) {
        lastTitleInput = e.value.toLowerCase();
        normalizedURL = this.normalizeURL(lastTitleInput);
        document.getElementById('url_lighter').innerHTML = normalizedURL;
    }
};

expose.normalizeURL = function(url) {
    var preserveNormalForm = /[,_`;\':-]+/gi
    url = url.replace(preserveNormalForm, ' ');

    // strip accents
    url = stripVowelAccent(url);

    //remove all special chars
    url = trim(url.replace(/[^a-z|^0-9|^-|\s]/gi, ''));

    //replace spaces with a -
    url = url.replace(/\s+/gi, '-');
    return url;
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}

function stripVowelAccent(str) {
    var rExps = [{ re: /[\xC0-\xC6]/g, ch: 'A' },
                 { re: /[\xE0-\xE6]/g, ch: 'a' },
                 { re: /[\xC8-\xCB]/g, ch: 'E' },
                 { re: /[\xE8-\xEB]/g, ch: 'e' },
                 { re: /[\xCC-\xCF]/g, ch: 'I' },
                 { re: /[\xEC-\xEF]/g, ch: 'i' },
                 { re: /[\xD2-\xD6]/g, ch: 'O' },
                 { re: /[\xF2-\xF6]/g, ch: 'o' },
                 { re: /[\xD9-\xDC]/g, ch: 'U' },
                 { re: /[\xF9-\xFC]/g, ch: 'u' },
                 { re: /[\xD1]/g, ch: 'N' },
                 { re: /[\xF1]/g, ch: 'n'}];

    for (var i = 0, len = rExps.length; i < len; i++)
        str = str.replace(rExps[i].re, rExps[i].ch);

    return str;
}

})( (function() {
  if ( typeof exports === "undefined" ) {
    window.weppontools = {};
    return window.weppontools;
  }
  else {
    return exports;
  }
} )() );