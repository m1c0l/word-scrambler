# Word Scrambler
This Chrome extension scrambles the letters of words excluding the first and last letters. According to a supposed (but probably fake) Cambridge study, you would still be able to read properly if the words are scrambled so. Is this true? Try it for yourself with this extension.

## Installation and how to use

I currently don't have plans to submit this to the Chrome app store, so if you're ok with downloading this developer extension, installing it, and having Chrome remind you every time you load it about developer extensions, (at least on Windows) then clone/download this repo and follow the instructions [here](http://www.howtogeek.com/233355/how-to-install-extensions-from-outside-the-chrome-web-store-and-firefox-add-ons-gallery/) to install it.

After you install it, look for the extension with the icon that looks like [this](scrabler/fried-egg.png) and click it when you want to scramble the words on a web page. Click it multiple times for more scrambling! (Although it probably won't make the word spelling more random.)

For more wackiness, try using this extension combined with my [spelling-worsener extension.](https://github.com/m1c0l/spelling-worsener)

## What it does

This extension scrambles the middle letters of the words on your web page using the [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) until the word has changed from its original (words with the same letters in the middle like "keep" are skipped).

Since each word is changed every time you use the extension, you'll notice cycles in words such as "kept", which will oscillate between "kpet" and "kept".

