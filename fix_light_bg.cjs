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
  if (filePath.endsWith('.vue') || filePath.endsWith('.scss')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const newContent = content
      .replace(/background(-color)?:\s*#F9FBFF;?/gi, 'background: #111111;')
      .replace(/background(-color)?:\s*#EEF4FF;?/gi, 'background: #111111;')
      .replace(/background(-color)?:\s*#F0F4FB;?/gi, 'background: #111111;')
      .replace(/border-top:\s*1px solid #F0F4FB;?/gi, 'border-top: 1px solid #222222;')
      .replace(/\$input-bg:\s*#f9fbff;?/gi, '$input-bg: #111111;');

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
