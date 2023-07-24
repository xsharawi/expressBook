import express from 'express';
import data from '../data/Sample_data'
import Book from '../types/book';
import { validate } from '../middleware/validate';
import { BinaryOperatorToken } from 'typescript';
const router = express()


router.get('/',(req: Book.Request,res)=>{
    let name = req.query.name ;
    let pubYear = req.query.pubyear ;
    console.log(name,pubYear)
    if( name === undefined && pubYear === undefined ){
        res.json(data)
        return;
    }else if(pubYear === undefined){
        let filtered = data.filter(ele=> ele.title.toLowerCase().includes(name.toLowerCase()))
        res.json(filtered)
        return;
    }
    else if(name === undefined ){
        let filtered = data.filter(ele=> ele.pubYear === pubYear)
        res.json(filtered)
        return;
    }
    else if( name && pubYear){
        let filtered = data.filter(ele=> (ele.pubYear === pubYear) && (ele.title.toLowerCase().includes(name.toLowerCase())))
        res.json(filtered)
        return;
    }
    else{
        res.status(400).send("data not found")
        return;
    }
})

router.get('/:id',(req,res)=>{
    let id = Number(req.params.id);
    let found = data.find((ele)=> ele.id === id)
    if( found !== undefined ){
        res.json(found)
    }else{
        res.status(404).send("book not found")
    }
})

router.delete('/:id',(req,res)=>{
    let id = Number(req.params.id);
    let found = data.findIndex((ele)=> ele.id === id)
    if( found !== -1 ){
        data.splice(found,1)
        res.send("book deleted")
    }else{
        res.status(404).send("book not found")
    }
})

router.post('/',validate,(req: Book.Request,res)=>{
    let id = data[data.length-1].id + 1
    const newBook : Book.book = {
        id: id,
        title: req.body.title,
        author: req.body.author,
        pubYear: req.body.pubYear,
    }
    data.push(newBook)
    res.send("book added")
})

router.put('/:id',(req: Book.Request, res)=>{
    let id = Number(req.params.id);
    let found = data.findIndex((ele)=> ele.id === id)
    if( found !== -1 ){
        const updated : Book.book = {
            id: data[found].id,
            title: req.body.title || data[found].title,
            author: req.body.author || data[found].author,
            pubYear: req.body.pubYear || data[found].pubYear,
        }
        data[found] = updated
        res.send("book updated")
    }else{
        res.status(404).send("book not found")
    }
})

export default router;



