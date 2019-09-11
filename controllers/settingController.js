const Setting = require('../models/setting')
exports.index = async (req,res,next) => {
    
    const setting = await Setting.find();
    res.status(200).json({
        data: setting
    })
}