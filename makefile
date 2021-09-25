all:
	esbuild themes/${THEME}/${THEME}.js --bundle --minify --outfile=prod.js

test:
	esbuild test.js --bundle --outfile=run_test.js
