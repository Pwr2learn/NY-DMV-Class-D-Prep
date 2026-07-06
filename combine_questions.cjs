const fs = require('fs');
const path = require('path');

const enOriginalPath = path.join(__dirname, 'src/content/en/questions.json');
const esOriginalPath = path.join(__dirname, 'src/content/es/questions.json');

const currentEn = JSON.parse(fs.readFileSync(enOriginalPath, 'utf8'));
const currentEs = JSON.parse(fs.readFileSync(esOriginalPath, 'utf8'));

// Filter out the fake questions
const authenticEn = currentEn.filter(q => !q.question.includes('Generated') && !q.question.includes('Pregunta Generada'));
const authenticEs = currentEs.filter(q => !q.question.includes('Generated') && !q.question.includes('Pregunta Generada'));

// Load batches
const b1en = JSON.parse(fs.readFileSync(path.join(__dirname, 'batch1_en.json'), 'utf8'));
const b1es = JSON.parse(fs.readFileSync(path.join(__dirname, 'batch1_es.json'), 'utf8'));
const b2en = JSON.parse(fs.readFileSync(path.join(__dirname, 'batch2_en.json'), 'utf8'));
const b2es = JSON.parse(fs.readFileSync(path.join(__dirname, 'batch2_es.json'), 'utf8'));

// Combine
const finalEn = [...authenticEn, ...b1en, ...b2en];
const finalEs = [...authenticEs, ...b1es, ...b2es];

// Remove duplicates based on ID (if any)
const mapEn = new Map();
finalEn.forEach(q => mapEn.set(q.id, q));
const mapEs = new Map();
finalEs.forEach(q => mapEs.set(q.id, q));

// Write back
fs.writeFileSync(enOriginalPath, JSON.stringify(Array.from(mapEn.values()), null, 2));
fs.writeFileSync(esOriginalPath, JSON.stringify(Array.from(mapEs.values()), null, 2));

console.log('Purged fake questions and added authentic chapters 1-12 questions.');
console.log('Total EN questions: ' + mapEn.size);
console.log('Total ES questions: ' + mapEs.size);
