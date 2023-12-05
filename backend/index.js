const express = require('express')
const app = express();


app.get('/', (req, res) => {
    res.send("ecommerce");
})
app.listen(4000)