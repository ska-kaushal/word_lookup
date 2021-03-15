var fs = require("fs");
var es = require("event-stream");
var path = require('path');
var totalLines = 0;
var words = [];
var mostUsedWord = [];



module.exports = {
    readTextFile: () =>{
         return fs.createReadStream(__dirname + "/../Data/test.txt").pipe(es.split()).pipe(
           es.mapSync((line) => {
                totalLines++;
                let wordsArray = line.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').split(" ");
                words.push(...wordsArray);
            }).on('error', (err) => {
                console.log("Error", err);
            }).on('end', () => {
                console.log("File Read Completed ..");
                console.log("Total Lines", totalLines);
                const wordFequency = words.reduce((map, word) => Object.assign(map, {
                    [word]: (map[word])
                        ? map[word] + 1
                        : 1,
                }),
                    {}
                );
                mostUsedWord = Object.keys(wordFequency).sort((a, b) => {
                    return wordFequency[b] - wordFequency[a];
                });
                return mostUsedWord;
            })
        );
        
    }
}