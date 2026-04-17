const fs = require('fs');

let content = fs.readFileSync('js/data.js', 'utf8');

// Replace invalid HK codes with real A-share alternatives
const replacements = {
  "0020HK": "300496", // 商汤概念 -> 中科创达 (already exists, will dedupe)
  "01801": "300558",  // 信达生物 -> 贝达药业 (already exists)
  "09926": "300142"   // 荣昌生物 -> 沃森生物 (already exists)
};

for (const [oldCode, newCode] of Object.entries(replacements)) {
  content = content.replace(new RegExp(`c:'${oldCode}'`, 'g'), `c:'${newCode}'`);
}

// Add exchange prefix to 6-digit codes
content = content.replace(/c:'(\d{6})'/g, (match, code) => {
  if (code.startsWith('6') || code.startsWith('68') || code.startsWith('69')) {
    return `c:'sh${code}'`;
  }
  if (code.startsWith('0') || code.startsWith('3') || code.startsWith('2')) {
    return `c:'sz${code}'`;
  }
  if (code.startsWith('4') || code.startsWith('8') || code.startsWith('43') || code.startsWith('83')) {
    return `c:'bj${code}'`;
  }
  return match;
});

// Fix nameToCode mapping too
const nameToCodeOld = content.match(/const nameToCode = \{[\s\S]*?\};/)[0];
let nameToCodeNew = nameToCodeOld;
nameToCodeNew = nameToCodeNew.replace(/'\d{6}'/g, (match) => {
  const code = match.slice(1, -1);
  if (code.startsWith('6') || code.startsWith('68')) return `'sh${code}'`;
  if (code.startsWith('0') || code.startsWith('3') || code.startsWith('2')) return `'sz${code}'`;
  return match;
});
content = content.replace(nameToCodeOld, nameToCodeNew);

// Fix findStockCode regex to match prefixed codes
content = content.replace("if (/^\\d{6}$/.test(input)) return input;", "if (/^(sh|sz|bj)?\\d{6}$/i.test(input)) return input.toLowerCase().replace(/^(?!sh|sz|bj)/, (m, offset, str) => {\n    const c = str.slice(offset, offset+6);\n    if (c.startsWith('6') || c.startsWith('68')) return 'sh' + c;\n    if (c.startsWith('0') || c.startsWith('3') || c.startsWith('2')) return 'sz' + c;\n    return c;\n  });");

// Simpler fix for findStockCode
content = content.replace(
  `function findStockCode(input) {\n  input = input.trim();\n  if (/^\\d{6}$/.test(input)) return input;\n  if (nameToCode[input]) return nameToCode[input];`,
  `function findStockCode(input) {\n  input = input.trim().toLowerCase();\n  if (/^(sh|sz|bj)?\\d{6}$/i.test(input)) {\n    const code = input.replace(/^(sh|sz|bj)/, '');\n    if (code.startsWith('6') || code.startsWith('68')) return 'sh' + code;\n    if (code.startsWith('0') || code.startsWith('3') || code.startsWith('2')) return 'sz' + code;\n    return code;\n  }\n  if (nameToCode[input]) return nameToCode[input];`
);

fs.writeFileSync('js/data.js', content);
console.log('Fixed stock codes in js/data.js');
