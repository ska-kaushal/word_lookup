const http = require('http');
const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const WordLookupRoute = require('./Routes/WordLookup.route');
app.use("/", WordLookupRoute);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
