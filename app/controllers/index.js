
$.index.open();

initLabel();

function initLabel(){
	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'data/demo.txt');
	
	//text property may be initialized in index.tss, but for dynamic content, we need to access to the view property
	//or implement a setter for it.	
	$.hlabel.getView().text = file.read().text;	
}

function search(e){
	$.hlabel.highlight(e.value);
}
