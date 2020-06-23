zip:
	zip pkg.zip \
		background.js \
		docs_content.js \
		LICENSE \
		manifest.json \
		popup.html \
		popup.js \
		thumbnail.png

clean:
	rm pkg.zip
