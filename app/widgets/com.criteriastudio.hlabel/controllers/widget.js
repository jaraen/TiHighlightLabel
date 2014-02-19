var args = arguments[0]||{};

$.label.applyProperties(args);

//public methods
$.highlight = function(match){
	
	var match = (match || '').toUpperCase();
	var text = ($.label.text || '').toUpperCase();
	var positions = [], machLength = 0, attributes = [];
	
	if(text.indexOf(match) == -1 || !match){	//no results or empty string?
		cleanLabel();
		return;
	}
	
	positions = findMatches(match, text);
	matchLength = match.length;

	for(var i = 0, j = positions.length; i < j; i++){
		
		//background color
		attributes.push( {
            type: Titanium.UI.iOS.ATTRIBUTE_BACKGROUND_COLOR,
            value: $.label.highlight.backgroundColor || 'yellow',
            range: [positions[i], matchLength]
        });
        		
        //font
        attributes.push( {
            type: Titanium.UI.iOS.ATTRIBUTE_FONT,
            value: $.label.highlight.font || {fontWeight:'bold'},
            range: [positions[i], matchLength]
        });	

	}

	//initialize it everytime because text property might change
	var formater = Titanium.UI.iOS.createAttributedString({text:$.label.text, attributes:attributes});

	$.label.attributedString = formater;

};

function cleanLabel(){
	
	var text = $.label.text || '';
	var length = text.length;
	
	var attributes = [
    	// Cleans the previous highlights
        {
            type: Titanium.UI.iOS.ATTRIBUTE_BACKGROUND_COLOR,
            value: "transparent",
            range: [0, length]
        },
        {
            type: Titanium.UI.iOS.ATTRIBUTE_FOREGROUND_COLOR,
            value: $.label.color || '#000',
            range: [0, text.length]
        }
    ];
	
	var formater = Titanium.UI.iOS.createAttributedString({text:text, attributes:attributes});

	$.label.attributedString = formater;
}



//returns all positions of the needle in the text
function findMatches(needle, text){
	var needle = needle || '', text = text || '';
	var regexp = new RegExp(needle,"g");

	var match, matches = [];
	
	while ((match = regexp.exec(text)) != null) {
	  matches.push(match.index);
	}	
	
	return matches;
}
