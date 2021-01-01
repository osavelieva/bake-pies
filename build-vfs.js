const fs = require('fs');

const params = process.argv.slice(2);
const helpParamIdx = params.findIndex((param) => param === '--help');

if (helpParamIdx > -1) {
  console.log(`
  Creates a vfs file containing base64 versions of the font files consumable by pdfmake.

  --help
  Shows a help message for this command in the console.

  -d
  The path to font files.

  -o
  The path to create the vfs file.
  `);

  return;
}

const inputDirParamIdx = params.findIndex((param) => param === '-d');
const inputDir = inputDirParamIdx > -1 ? params[inputDirParamIdx + 1] : null;

if (!inputDir) {
  console.error('No input dir provided.');

  return;
}

const outputDirParamIdx = params.findIndex((param) => param === '-o');
const outputDir = outputDirParamIdx > -1 ? params[outputDirParamIdx + 1] : null;

if (!outputDir) {
  console.error('No output dir provided.');

  return;
}

const files = fs.readdirSync(inputDir);

if (!files.length) {
  console.error(`No files found in ${inputDir}.`);

  return;
}

const VFS_FONTS_FILE_NAME = 'vfs-fonts.ts';
const vfsFilename = `${outputDir}/${VFS_FONTS_FILE_NAME}`;
const vfs = files.reduce((vfsValue, file) => {
  vfsValue[file] = fs.readFileSync(`${inputDir}/${file}`).toString('base64');
  console.log(file);

  return vfsValue;
}, {});

const vfsFileContent = `export const vfs = ${JSON.stringify(vfs, null, 2)};`;
fs.writeFileSync(vfsFilename, vfsFileContent);

console.log(`Built ${files.length} files to ${vfsFilename}.`);
