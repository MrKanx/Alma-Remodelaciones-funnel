const fs = require('fs');
const path = require('path');

const regModalPath = 'src/components/RegistrationModal.vue';
if (fs.existsSync(regModalPath)) {
  let content = fs.readFileSync(regModalPath, 'utf8');
  content = content.replace(/\$bg:\s*#ffffff;?/g, '$bg: #000000;');
  content = content.replace(/color:\s*colors\.\$ALU-URGENT-DARK;?/g, 'color: #FFFFFF;');
  fs.writeFileSync(regModalPath, content, 'utf8');
  console.log('Fixed RegistrationModal.vue');
}

const calModalPath = 'src/components/CalendarModal.vue';
if (fs.existsSync(calModalPath)) {
  let content = fs.readFileSync(calModalPath, 'utf8');
  content = content.replace(/background:\s*#FAFBFF;?/g, 'background: #111111;');
  content = content.replace(/background:\s*#F0F6FF;?/g, 'background: #222222;');
  content = content.replace(/background:\s*#F5F9FF;?/g, 'background: #222222;');
  content = content.replace(/background:\s*#E4EDF7;?/g, 'background: #222222;');
  fs.writeFileSync(calModalPath, content, 'utf8');
  console.log('Fixed CalendarModal.vue');
}
