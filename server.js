const http = require('http');
const express = require('express');
const app = express();
// var fs = require("fs");
// var es = require("event-stream");

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const WordLookupRoute = require('./Routes/WordLookup.route');
app.use("/", WordLookupRoute);

// app.get('/', (req, res) => {
  // var totalLines = 0;
  // var words = [];
  // var mostUsedWord = [];
  // fs.createReadStream(__dirname + "/Data/test.txt").pipe(es.split()).pipe(
  //   es.mapSync((line) => {
  //     totalLines++;
  //     let wordsArray = line.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').split(" ");
  //     words.push(...wordsArray);
  //   }).on('error', (err) => {
  //     console.log("Error", err);
  //   }).on('end', () => {
  //     console.log("File Read Completed ..");
  //     console.log("Total Lines", totalLines);
  //     const wordFequency = words.reduce((map, word) => Object.assign(map, {
  //       [word]: (map[word])
  //         ? map[word] + 1
  //         : 1,
  //     }),
  //       {}
  //     );
  //     mostUsedWord = Object.keys(wordFequency).sort((a, b) => {
  //       return wordFequency[b] - wordFequency[a];
  //     });
  //     res.send(mostUsedWord);
  //   }));
// })

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
