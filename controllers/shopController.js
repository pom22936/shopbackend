const Shop = require('../models/shop')
const Menu = require('../models/menu')
const config = require('../config/index')
exports.index = async (req, res, next) => {
    // const shop = await Shop.find().select('photo location').sort({ _id: -1 });
    const shop = await Shop.find().select('+name')
    const shopWithPhotoDomain = await shop.map((shop, index) => {
        return {
            id: shop._id,
            name: shop.name,
            photo: config.DOMAIN + '/images/' + shop.photo,
            location: shop.location
        }
    })
    res.status(200).json({
        data: shopWithPhotoDomain
    })
}

exports.menu = async (req, res, next) => {
    // res.send('ok');
    // const menu = await Menu.find();
    // const menu = await Menu.find().select('-price');
    // const menu = await Menu.find().where('price').lte(59); //น้อยกว่า
    // const menu = await Menu.find().where('price').gte(59); //มากกว่า
    // const menu = await Menu.find({ price: { $gte: 60 } });
    const menu = await Menu.find().populate('shop','name location').sort({price: -1})
    res.status(200).json({
        data: menu
    });
}

exports.getShopWithMenu = async (req,res,next) => {
    //  res.send('ok');
   const ShopWithMenu = await Shop.findOne({_id:req.params.id}).populate('menus')
    res.status(200).json({
        data:ShopWithMenu
    });
}

exports.store = async (req,res,next) => {
    try {
        let shop = new Shop(req.body)

        await shop.save()
        res.status(201).json({
            message: "Save Successfully!!"
        });

    } catch (error) {
        next(error)
    }
}