function isalpha(c) {
	return /[a-zA-Z]/.test(c);
}

// Replace word[index] with character
function replaceChar(word, index, character) {
	return word.substr(0, index) + character + word.substr(index + character.length);
}

var replaceWord = function(word) {
	// Word is unchanged if it is 3 characters or less
	if (word.length <= 3)
		return word;

	// Always swap the middle characters in a 4-letter word
	if (word.length == 4) {
		return word[0] + word[2] + word[1] + word[3];
	}

	// Fix the position of the first, last, and non-alphabetic characters
	var fixed = [];
	var letters = [];
	fixed[0] = true;
	fixed[word.length - 1] = true;
	for (var i = 1; i < word.length - 1; i++) {
		if (isalpha(word[i]))
			letters.push(word[i]);
		else
			fixed[i] = true;
	}

	// Replace unfixed positions with a random letter
	for (i = 1; i < word.length - 1; i++) {
		if (!fixed[i]) {
			var rand = Math.floor(Math.random() * letters.length);
			word = replaceChar(word, i, letters[rand]);
			letters.splice(rand, 1);
		}
	}

	return word;
};

var processNodeText = function(textNode) {
	var ignoreTags = ['script', 'style'];
	var parentElem = textNode.parentElement;
	if (parentElem) {
		var parentTag = parentElem.tagName.toLowerCase();
		if (ignoreTags.indexOf(parentTag) !== -1) {
			return;
		}
	}
	var nodeValue = textNode.nodeValue;
	var wordArray = nodeValue.split(/\b/);
	var editedWords = '';
	for (var a in wordArray) {
		editedWords += replaceWord(wordArray[a]);
	}
	textNode.nodeValue = editedWords;
};

var processBody = (function() {
	var textNode, nodeIter = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
	while ((textNode = nodeIter.nextNode())) {
		processNodeText(textNode);
	}
})();
