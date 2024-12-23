const express= require('express');
const app=express();
const port = 3000;

let products =[];

function generateRandomProducts(){
    const names=["Apple","Banana","milk","cocao","bread","book","copybook","pen","pencil","notebook"];
    for(let i=0;i<10;i++){
        let product ={
            id:i+1,
            name:names[i]
        }
        products.push(product);
    }
}

generateRandomProducts();

app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit) || 5;  
    const offset = parseInt(req.query.offset) || 0;

    const paginatedProducts = products.slice(offset, offset + limit);

    res.json({
        data: paginatedProducts,
        total: products.length,
        limit: limit,
        offset: offset
    });
});
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});