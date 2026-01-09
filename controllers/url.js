const Url = require("../models/url");
const {nanoid} = require("nanoid");
const AppError = require("../utils/AppError");
async function handleGenerateShortUrl(req,res,next){
    const body = req.body;
    if(!body.url) return next(new AppError("Url is required",400));

    const shortID = nanoid(15);
    await Url.create({
        shortId:shortID,
        redirectUrl:body.url,
        visitHistory:[]
    });
    return res.json({id:shortID});
}

async function handleRedirectUrl(req,res){
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push:{
                visitHistory:{timestamp:Date.now()},
            },
        },
        {new:true},

    );
    res.redirect(entry.redirectUrl);
}

async function handleGetUserAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await Url.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    });
    
}
module.exports={
    handleGenerateShortUrl,
    handleRedirectUrl,
    handleGetUserAnalytics,
}