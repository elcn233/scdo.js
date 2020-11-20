/* jshint ignore:start */


// Browser environment
if(typeof window !== 'undefined') {
    ScdoWebProvider = (typeof window.ScdoWebProvider !== 'undefined') ? window.ScdoWebProvider : require('scdo.js');
}


// Node environment
if(typeof global !== 'undefined') {
    ScdoWebProvider = (typeof global.ScdoWebProvider !== 'undefined') ? global.ScdoWebProvider : require('scdo.js');
}

/* jshint ignore:end */
