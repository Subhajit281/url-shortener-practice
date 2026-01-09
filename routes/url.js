const express = require("express");
const{handleGenerateShortUrl,
    handleRedirectUrl,
handleGetUserAnalytics}=require("../controllers/url");
const router = express.Router();

router.post('/',handleGenerateShortUrl)
router.get('/:shortId',handleRedirectUrl);
router.get('/analytics/:shortId',handleGetUserAnalytics);


module.exports = router;