import express from 'express';

const app = express()
const port = 8080

//midleware
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send("Ola mundo")
})
app.listen(port, () => 
    console.log(`Example app listening on port ${port}!\n`)
)