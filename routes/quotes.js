const express = require('express')
const quote = require('../models/quote')
const Quote = require('../models/quote')
const router = express.Router()


//getting all
router.get('/', async (req, res) => {
    try {
        const quotes = await Quote.find()
        res.json(quotes)
    } catch (error) {
        res.status(500).json({message: err.message})
    }
})

//getting one
router.get('/:id', getQuote,(req, res) =>{
    res.json(res.quote)
})
//Creating one
router.post('/', async (req,res) => {
    const quote = new Quote({
        cite: req.body.cite,
        author: req.body.author
    })
    try {
        const newQuote = await quote.save()
        res.status(201).json(newQuote)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
//updating one
router.patch('/',getQuote, async (req,res) =>{
    if(res.body.cite != null){
        res.quote.cite = req.body.cite
    }
    try {
        const updatedQuote = await res.quote.save()
        res.json(updatedQuote)
    } catch (error) {
        res.status(400).json({message: err.message})
    }
})
//Deleting one
router.delete('/:id',getQuote, async (req,res) =>{
    try {
        await res.quote.remove()
        res.json({message: 'Quote deleted'})
    } catch (err) {
        res.status(500).json({message: err.message })
    }
})

async function getQuote(req, res,next){
    let quote
    try {
        quote = await Quote.findById(req.params.id)
        if(quote == null){
            return res.status(404).json('Quote not found')
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.quote = quote
    next()
}


module.exports =router;

