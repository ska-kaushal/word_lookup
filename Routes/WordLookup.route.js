const express = require('express');
const router = express.Router();

const WordLookupController = require('../Controller/WordLookup.Controller');

router.get('/getMostOccurredWords', WordLookupController.getMostOccurredWords);

module.exports = router;