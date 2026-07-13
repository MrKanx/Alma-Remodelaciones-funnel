const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src', (filePath) => {
  if (filePath.endsWith('.vue')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Replace background: #ffffff; with background: colors.$QS-LIGHT; (or #000000 if colors is not used, but all vue files have colors)
    // Actually, just replace '#ffffff' for background with '#000000'
    const newContent = content
      .replace(/background:\s*#ffffff;?/g, 'background: #000000;')
      .replace(/background:\s*#fff;?/g, 'background: #000000;')
      .replace(/background-color:\s*#ffffff;?/g, 'background-color: #000000;')
      // Also for linear gradients that have white
      .replace(/#ffffff 70%/g, '#000000 70%')
      // Card borders or other light borders
      .replace(/border:\s*1px solid #E4EDF7/g, 'border: 1px solid #222222')
      .replace(/border-bottom:\s*1px solid #E8EDF5/g, 'border-bottom: 1px solid #222222')
      .replace(/border-bottom:\s*1px solid #F0F4FB/g, 'border-bottom: 1px solid #222222')
      .replace(/border:\s*1px solid #E8EDF5/g, 'border: 1px solid #222222')
      .replace(/background:\s*#F5F8FF/g, 'background: #111111')
      .replace(/background:\s*#F0F4FB/g, 'background: #111111');

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
