ANTLR_BIN_PATH=".tools/antlr-4.13.2-complete.jar"

mkdir -p .tools
if [ -f "$ANTLR_BIN_PATH" ]; then
  echo "ANTLR jar already exists, skipping download."
else
  echo "Downloading ANTLR jar..."
  curl -sL https://www.antlr.org/download/antlr-4.13.0-complete.jar -o $ANTLR_BIN_PATH
fi
cd src
rm -r -f ./antlr
java -jar "../$ANTLR_BIN_PATH" -o _antlr -Dlanguage=TypeScript -no-listener -visitor ./PSCLexer.g4 ./PSCParser.g4
node --eval "
let content = fs.readFileSync('_antlr/PSCLexer.ts', 'utf-8');
content = content.replace('./PSCLexerBase', '../PSCLexerBase')
content = '/\* eslint-disable no-unused-vars \*/ \\n' + content;
fs.writeFileSync('_antlr/PSCLexer.ts', content);
"

echo "ANTLR files generated successfully."