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
      // Very dark text -> Pure white
      .replace(/color:\s*#333;?/g, 'color: #FFFFFF;')
      .replace(/color:\s*#555;?/g, 'color: #FFFFFF;')
      .replace(/color:\s*#3A4F6A;?/gi, 'color: #FFFFFF;')
      .replace(/color:\s*#4A5F7A;?/gi, 'color: #FFFFFF;')
      .replace(/color:\s*#4A5568;?/gi, 'color: #FFFFFF;')
      // Medium dark text -> Light gray
      .replace(/color:\s*#6A7E95;?/gi, 'color: #DDDDDD;')
      .replace(/color:\s*#7A8EA5;?/gi, 'color: #CCCCCC;')
      .replace(/color:\s*#8A9BB5;?/gi, 'color: #CCCCCC;')
      // Light blue-grays -> Very light gray
      .replace(/color:\s*#A0B0C5;?/gi, 'color: #EEEEEE;')
      .replace(/color:\s*#B0C0D5;?/gi, 'color: #EEEEEE;')
      .replace(/color:\s*#B8CAE0;?/gi, 'color: #EEEEEE;')
      .replace(/color:\s*#C0D0E0;?/gi, 'color: #EEEEEE;')
      .replace(/color:\s*#C8D8ED;?/gi, 'color: #EEEEEE;')
      .replace(/color:\s*#D0DBE8;?/gi, 'color: #EEEEEE;')
      
      // Also some specific backgrounds that might have been missed
      .replace(/background-color:\s*#000;/gi, 'background-color: #000000;')
      .replace(/background-color:\s*#0b0815;/gi, 'background-color: #000000;');

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
