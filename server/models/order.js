let mongoose = require('mongoose');

// create order model class
let Order = mongoose.Schema({
    name: String,
    email: String,
    shipped: Boolean,
    cart:
    {
        lines:
        [{event:
            {
                name: String,
                date: String,
                description: String,
                price: Number
            },
            quantity: Number
        }],
        itemCount: Number,
        cartPrice: Number
    }
},
{
    collection: 'orders'
});

module.exports = mongoose.model('Order', Order);