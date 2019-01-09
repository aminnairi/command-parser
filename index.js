!function(r,e){for(var o in e)r[o]=e[o]}(exports,function(r){var e={};function o(n){if(e[n])return e[n].exports;var t=e[n]={i:n,l:!1,exports:{}};return r[n].call(t.exports,t,t.exports,o),t.l=!0,t.exports}return o.m=r,o.c=e,o.d=function(r,e,n){o.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:n})},o.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},o.t=function(r,e){if(1&e&&(r=o(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var t in r)o.d(n,t,function(e){return r[e]}.bind(null,t));return n},o.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return o.d(e,"a",e),e},o.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},o.p="",o(o.s=0)}([function(r,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function r(r,e,o){if(void 0===r)throw new ReferenceError("[CommandParser][constructor] first argument is mandatory");if("string"!=typeof r)throw new TypeError("[CommandParser][constructor] first argument should be of type string");if(void 0===e)throw new ReferenceError("[CommandParser][constructor] second argument is mandatory");if("string"!=typeof e)throw new TypeError("[CommandParser][constructor] second argument should be of type string");if(void 0===o)throw new TypeError("[CommandParser][constructor] third argument is mandatory");if("string"!=typeof o)throw new TypeError("[CommandParser][constructor] third argument should be of type string");this.options=[{description:"Display this message",long:"--help",name:"help",noValueExpected:!0,short:"-h"},{description:"Display the name and version of this command",long:"--version",name:"version",noValueExpected:!0,short:"-v"}],this.name=r,this.versionIdentifier=e,this.synopsis=o}return r.prototype.option=function(r,e,o){if(void 0===o&&(o=!1),"string"!=typeof r)throw new TypeError("[CommandParser][option] first argument should be of type string");if("string"!=typeof e)throw new TypeError("[CommandParser][option] second argument should be of type string");if("boolean"!=typeof o)throw new TypeError("[CommandParser][option] third argument should be of type boolean");if("version"===r)throw new Error('[CommandParser][option] "version" is not a valid option name');if("help"===r)throw new Error('[CommandParser][option] "help" is not a valid option name');for(var n,t=!0,i=!0,s="-"+r[0].toLowerCase(),a="-"+r[0].toUpperCase(),f=0,p=this.options;f<p.length;f++){if(p[f].short===s){t=!1;break}}if(!t)for(var u=0,l=this.options;u<l.length;u++){if(l[u].short===a){i=!1;break}}return t?n=s:i&&(n=a),this.options.push({description:e,long:"--"+r,name:r,noValueExpected:o,short:n}),this},r.prototype.parse=function(r){if(void 0===r&&(r=process.argv.slice(2)),!Array.isArray(r))throw new TypeError("[CommandParser][parse] first argument must be of type array");for(var o=0,n=r;o<n.length;o++){if("string"!=typeof(s=n[o]))throw new TypeError("[CommandParser][parse] all elements of the first argument must be of type string")}for(var t={},i=0;i<r.length;i++){var s;if("--help"===(s=r[i])||"-h"===s){console.log(this.help());break}if("-v"===s||"--version"===s){console.log(this.version());break}if(s.startsWith("-")&&"-"!==s[1]&&s.length>2){var a=s.slice(1).split(""),f=a.length;r.splice(i,1);for(var p=f-1;p>=0;p--)r.splice(i,0,"-"+a[p]);i--}else{for(var u=!1,l=0,h=this.options;l<h.length;l++){var c=h[l];if(s===c.long||s===c.short){if(c.noValueExpected===e.NO_VALUE_EXPECTED){t[c.name]="yes",u=!0;break}var d=r[i+1];if(d){t[c.name]=d,i+=1,u=!0;break}}if(s.startsWith(c.long)&&s.includes("=")){var m=s.split("=")[1];t[c.name]=m,u=!0;break}}if(!u){"argument"in t?t.argument+=" "+s:t.argument=s}}}return t},r.prototype.help=function(){var r="NAME";r+="\n    "+this.name,r+="\n\nSYNOPSIS",r+="\n    "+this.synopsis,r+="\n\nOPTIONS";for(var e=!0,o=0,n=this.options;o<n.length;o++){var t=n[o];e?e=!1:r+="\n",r+="\n    ",t.short?r+=t.short+", "+t.long:r+=""+t.long,t.noValueExpected||(r+=" ["+t.name.toUpperCase()+"]"),r+="\n        "+t.description}return r},r.prototype.version=function(){return this.name+" version "+this.versionIdentifier},r}();e.CommandParser=n,e.NO_VALUE_EXPECTED=!0}]));