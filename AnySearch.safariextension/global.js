const app = safari.application,
	  ext = safari.extension;
app.addEventListener('beforeSearch', handleBeforeSearch, false);

// Google Analytics
var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-125911-12']);	// TODO: Set up analytics account
	_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = 'https://ssl.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

(function() {
	var prevVersion = ext.settings.version;
	switch (true) {
	case (prevVersion == 100):	// No upgrade
		return;
	case (prevVersion == 0): // New installation
		_gaq.push(['_trackEvent', 'Install', 'New']);
		break;
	}
	// After all upgrades and new installations:
	ext.settings.version = 100;
})()

function handleBeforeSearch(e) {
	e.preventDefault();
	var url = ext.settings.engine;
	if (url !== 'disable') {
		if (url == 'custom') {
			var url = ext.settings.customEngine;
		}
		url = url.replace('@@@', encodeURIComponent(e.query).replace(/%20/g,'+'));
	}	
	e.target.url = url;
}
