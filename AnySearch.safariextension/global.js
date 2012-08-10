const app = safari.application,
	  ext = safari.extension;
app.addEventListener('beforeSearch', handleBeforeSearch, false);

function handleBeforeSearch(e) {
	e.preventDefault();
	var url = ext.settings.engine;
	if (url == 'disable') {
		url = 'http://' + e.query + '.com'
	} else {
		if (url == 'custom') {
			var url = ext.settings.customEngine;
		}
		url = url.replace('@@@', encodeURIComponent(e.query).replace(/%20/g,'+'));
	}	
	e.target.url = url;
}
