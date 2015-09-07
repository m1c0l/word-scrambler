var replaceWord = function(word) {
	// Word is unchanged if it is 3 characters or less
	if (word.length <= 3) {
		return word;
	}

	// Test if the middle letters are all the same, e.g., "keep"
	// If so, return the original word
	var sameLetters = true;
	var secondLetter = word[1];
	for (var i = 2; sameLetters && i < word.length - 1; i++) {
		if (word[i] != secondLetter) {
			sameLetters = false;
			break;
		}
	}
	if (sameLetters) {
		return word;
	}

	// Do the Fisher-Yates shuffle until the word has changed
	var newWord;
	do {
		var letters = word.split(''),
	        n = letters.length;

	    for (var i = n - 2; i > 1; i--) {
	        var j = Math.floor(Math.random() * i) + 1;
	        var tmp = letters[i];
	        letters[i] = letters[j];
	        letters[j] = tmp;
	    }
	    newWord = letters.join('');
	} while(newWord.localeCompare(word) === 0);

	return newWord;
};

var processText = function(text) {
	// If the text is empty, return
	if (!/[^\n\s]/.test(text)) {
		return text;
	}

	// Capture the non-alpha characters and split by them
	var nonAlpha = /[^a-zA-Z]+/g;
	var nonAlphaArray = text.match(nonAlpha);
	var wordArray = text.split(nonAlpha);
	// Edit the words and add the non-alpha characters in between
	var editedWords = '';
	for (var i = 0; i < wordArray.length - 1; i++) {
		editedWords += replaceWord(wordArray[i]);
		editedWords += nonAlphaArray[i];
	}
	editedWords += replaceWord(wordArray[wordArray.length - 1]);
	return editedWords;
};

var processBody = (function() {
	var textNode, nodeIter = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
	var ignoreTags = ['script', 'style'];
	while ((textNode = nodeIter.nextNode())) {
		// Skip this text node if it's inside a tag we don't want to edit
		var parentElem = textNode.parentElement;
		if (parentElem) {
			var parentTag = parentElem.tagName.toLowerCase();
			if (ignoreTags.indexOf(parentTag) !== -1) {
				continue;
			}
		}

		textNode.nodeValue = processText(textNode.nodeValue);
	}
})();

var processTitle = (function() {
	document.title = processText(document.title);
})();
