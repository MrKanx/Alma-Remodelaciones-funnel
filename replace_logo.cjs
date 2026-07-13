const fs = require('fs');
const path = require('path');

const files = [
  'src/views/BookedView.vue',
  'src/views/NoSpaceView.vue',
  'src/views/FunnelView.vue',
  'src/views/BookingView.vue',
  'src/components/booked/BookedHeader.vue',
  'src/views/VideoView.vue'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // replace html
  content = content.replace(/<h2 class="([^"]*)logo-text">.*?<\/h2>/g, '<img src="@/assets/logos/logo.png" class="$1logo-img" alt="NOVAERA Logo" />');
  
  // replace CSS class name
  content = content.replace(/logo-text/g, 'logo-img');
  
  // We can try to replace font styles in the new logo-img class blocks, but for simplicity, we can just let it be and add height.
  // Actually, let's just do a blanket addition if we find `&__logo-img {` or `.something__logo-img {`
  content = content.replace(/(\.[\w-]+__logo-img|&__logo-img)\s*\{/g, '$1 {\n  height: 35px;\n  width: auto;\n  object-fit: contain;');
  
  fs.writeFileSync(f, content, 'utf8');
  console.log('Updated', f);
});
