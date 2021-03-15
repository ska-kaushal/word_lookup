const https = require('https');
const createError = require('http-errors');
var fs = require("fs");
var es = require("event-stream");

const API_KEY = "dict.1.1.20210216T114936Z.e4989dccd61b9626.373cddfbfb8a3b2ff30a03392b4e0b076f14cff9";
const API_URL = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=" + API_KEY + "&lang=en-en&text=";

module.exports = {
    getMostOccurredWords: async (req, res, next) => {
        try {
            var totalLines = 0;
            var words = [];
            var mostOccurredWords = [];
            var resObj = res;
            fs.createReadStream(__dirname + "/../Data/big.txt").pipe(es.split()).pipe(
                es.mapSync((line) => {
                    totalLines++;
                    //senitize data and removed special chars
                    let wordsArray = line.toLowerCase().replace('  ', ' ').replace(/[^a-zA-Z0-9 ]/g, '').split(" ");
                    words.push(...wordsArray);
                }).on('error', (err) => {
                    console.log("Error", err);
                }).on('end', () => {
                    // console.log("File Read Completed ..");
                    // console.log("Total Lines", totalLines);
                    const wordFequency = words.reduce((map, word) => Object.assign(map, {
                        [word]: (map[word])
                            ? map[word] + 1
                            : 1,
                    }),
                        {}
                    );
                    mostOccurredWords = Object.keys(wordFequency).sort((a, b) => {
                        return wordFequency[b] - wordFequency[a];
                    });

                    var responses = [];
                    var completed_requests = 0;
                    //console.log("test...", mostOccurredWords);


                    //get top 10 mostOccurred words
                    let top10 = mostOccurredWords.slice(0, 10);
                    top10.map(async (eachWord, index) => {
                        if (eachWord) {
                            await https.get(API_URL + eachWord, function (res) {
                                var jsonVar = "";
                                res.on('data', function (chunk) {
                                    jsonVar += chunk;
                                });
                                res.on('end', function () {
                                    if (res.statusCode === 200) {
                                        try {
                                            var data = JSON.parse(jsonVar);
                                            // data is available here:
                                            responses.push({ name: eachWord, fequency: wordFequency[eachWord], details: data });
                                            if (responses.length == top10.length - 1) {
                                                resObj.send(responses);
                                            }
                                        } catch (e) {
                                            console.log('Error parsing JSON!');
                                        }
                                    } else {
                                        console.log('Status:', res.statusCode);
                                    }

                                });
                                res.on('error', (e) => {
                                    console.error(e);
                                });
                            });
                        }
                    })
                }));
        } catch (err) {
            console.log(error.message);
        }
    }
}