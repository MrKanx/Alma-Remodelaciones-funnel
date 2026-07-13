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
    let changed = false;

    // Remove background linear gradients
    // If it uses urgent, make it solid urgent
    const newContent = content
      .replace(/background:\s*linear-gradient\([^,]+,\s*colors\.\$QS-URGENT[^)]+\);/g, 'background: colors.$QS-URGENT;')
      .replace(/background:\s*linear-gradient\([^,]+,\s*colors\.\$ALU-URGENT[^)]+\);/g, 'background: colors.$ALU-URGENT;')
      // For any other gradient that just sets a background, make it black or dark if it's structural
      .replace(/background:\s*linear-gradient\([^,]+,\s*#[a-fA-F0-9]+[^)]+\);/g, 'background: #000000;')
      // And for the BAKANO ones:
      .replace(/background:\s*linear-gradient\([^)]+BAKANO[^)]+\);/g, 'background: colors.$QS-NAVY;');

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
