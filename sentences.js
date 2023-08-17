import fs from  "fs";

// Function to read sentences from the text file and split them into an array
function readSentencesFromFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return data.split('\n').filter(sentence => sentence.trim() !== '');
    } catch (err) {
        console.error('Error reading file:', err.message);
        return [];
    }
}

const sentences = readSentencesFromFile('sentences.txt');
const sentencesWithCommas = sentences.join(', ');

// Create the JavaScript array content with square brackets
const jsArrayContent = `[${sentencesWithCommas}]`;

// Write the JavaScript array content to a new text file
try {
    fs.writeFileSync('mySentences.js', jsArrayContent, 'utf8');
    console.log('JavaScript array content has been written to "mySentences.txt".');
    console.log(jsArrayContent.length)
} catch (err) {
    console.error('Error writing file:', err.message);
}
