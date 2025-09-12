import fs from 'fs';
import { packBags } from './src/packBags.js';

// Read the sample input
const inputData = JSON.parse(fs.readFileSync('./sample-input.json', 'utf8'));

try {
  console.log('Input:');
  console.log(JSON.stringify(inputData, null, 2));
  
  console.log('\nRunning packBags...');
  const result = packBags(inputData);
  
  console.log('\nResult:');
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error('Error:', error.message);
}