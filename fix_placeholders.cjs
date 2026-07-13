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
    
    // specifically target ::placeholder { color: #EEEEEE; }
    // and replace #EEEEEE with rgba(255, 255, 255, 0.35)
    const newContent = content.replace(/&::placeholder\s*{\s*color:\s*#EEEEEE;?\s*}/g, '&::placeholder { color: rgba(255, 255, 255, 0.35); }');

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated placeholders in', filePath);
    }
  }
});
