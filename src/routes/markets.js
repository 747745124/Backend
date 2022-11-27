const { Router } = require('express')
const router = Router();

const supermarkets = [
    { "id": 1, "store": "whole food", "mile": 0.1 },
    { "id": 2, "store": "trader joe", "mile": 0.4 },
    { "id": 4, "store": "trader joe", "mile": 0.2 },
    { "id": 3, "store": "target", "mile": 0.7 }
];

router.get('/:storeid', (req, res) => {
    const { storeid } = req.params
    const store = supermarkets.find((e) => e.store === storeid);

    if (!store)
        res.status(418).send({ message: 'not found' });
    else
        res.status(200).send(store);
});

router.get('/', (req, res) => {
    const { miles } = req.query;
    const parsedMiles = parseFloat(miles);


    if (miles && !isNaN(parsedMiles)) {
        const result = supermarkets.filter((e) => e.mile <= parsedMiles);
        //filter
        res.status(200).send(result);
    }
    else
        res.status(200).send(supermarkets);
});



//filter markets that are atmost 0.5 miles away


module.exports = router;