const { Router } = require('express')
const router = Router();

const itemArray = [
    {
        "item": "milk",
        "quantity": 1
    },
    {
        "item": "apple",
        "quantity": 2
    },
    {
        "item": "banana",
        "quantity": 3
    },
]

//path + handler
router.get('/', (req, res) => {
    res.cookie('visited', true, { maxAge: 10000 });
    res.status(200).send(itemArray);
});

router.post('/', (req, res) => {
    const { item, quantity } = req.body;

    if (item && quantity) {
        itemArray.push({ "item": item, "quantity": quantity });
        res.status(201).sendStatus(201);
    }
    else {
        req.status(418).send({ message: 'request incorrect!' })
    }

});

//route parameters GET https://localhost:3001/books/:ibsn
router.get('/:itemName', (req, res) => {
    console.log(req.cookies)//parser needed

    const { itemName } = req.params;
    const groceryItem = itemArray.find((g) => g.item === itemName);
    if (!groceryItem) { res.status(418).send({ message: 'item not found' }) };
    res.status(200).send(groceryItem);
})


router.post('/shopping/cart/item', (req, res) => {
    const { item, quantity } = req.body;
    const cartItem = { item, quantity };
    const { cart } = req.session;
    if (cart) {
        req.session.cart.items.push(cartItem);
    } else {
        req.session.cart = { items: [cartItem] }
    }

    res.send(201);
})

router.get('/shopping/cart', (req, res) => {
    const { cart } = req.session;
    if (cart) res.send(cart.items);
    else res.status(404).send({ message: 'Cart not found' });
})

module.exports = router;

