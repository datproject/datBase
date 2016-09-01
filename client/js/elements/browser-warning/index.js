var MIN_VERSION = 55
var browser = detectBrowser(navigator.userAgent);
if (browser.name === 'chrome' && Number(browser.version.split('.')[0]) >= MIN_VERSION) return

var el = document.querySelector('#browser-warning')
el.innerHTML = 'hello'

// <div class='danger-block pt3'>"
//   <h3 class="mb3">Sorry, we don't support your browser (yet).</h1>
//   <div class="pb3">We only support the latest version of Google Chrome. <a href="https://www.google.com/chrome/browser/desktop/" target="_blank">Download</a></div>
//   </div>

function detectBrowser (userAgentString) {
  // taken from https://github.com/DamonOehlman/detect-browser
  var browsers = [
     [ 'edge', /Edge\/([0-9\._]+)/ ],
     [ 'chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/ ],
     [ 'firefox', /Firefox\/([0-9\.]+)(?:\s|$)/ ],
     [ 'opera', /Opera\/([0-9\.]+)(?:\s|$)/ ],
     [ 'opera', /OPR\/([0-9\.]+)(:?\s|$)$/ ],
     [ 'ie', /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/ ],
     [ 'ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/ ],
     [ 'ie', /MSIE\s(7\.0)/ ],
     [ 'bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/ ],
     [ 'android', /Android\s([0-9\.]+)/ ],
     [ 'ios', /iPad.*Version\/([0-9\._]+)/ ],
     [ 'ios',  /iPhone.*Version\/([0-9\._]+)/ ],
     [ 'safari', /Version\/([0-9\._]+).*Safari/ ]
   ];

   var i = 0, mapped =[];
   for (i = 0; i < browsers.length; i++) {
     browsers[i] = createMatch(browsers[i]);
     if (isMatch(browsers[i])) {
       mapped.push(browsers[i]);
     }
   }

   var match = mapped[0];
   var parts = match && match[3].split(/[._]/).slice(0,3);

   while (parts && parts.length < 3) {
     parts.push('0');
   }

   function createMatch(pair) {
     return pair.concat(pair[1].exec(userAgentString));
   }

   function isMatch(pair) {
     return !!pair[2];
   }

   // return the name and version
   return {
     name: match && match[0],
     version: parts && parts.join('.'),
   };
}
