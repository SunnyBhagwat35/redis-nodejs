const express = require('express');
const axios = require('axios');
const client = require('./client');

const app = express();

app.get('/', async (req, res)=>{

    // return if it already present in cache 
    const cacheVal = await client.get('todos');
    if (cacheVal) return res.json(JSON.parse(cacheVal));

    // else get the result and set it in cache for 10 seconds (will removed from cache after 10 seconds)
    const {data} = await axios.get("https://jsonplaceholder.typicode.com/todos");
    await client.set('todos', JSON.stringify(data));
    await client.expire('todos', 10);
    return res.json(data);

})

app.listen(9000);