import express from 'express';
import data from '../data/Sample_data'
import Book from '../types/book';
import { validate } from '../middleware/validate';

const router = express()


router.get('/',(req: Book.Request,res)=>{

    let name = req.query.name ;
    let pubYear = req.query.pubyear ;
    const page = Number(req.query.page || "1");
    const pageSize = Number(req.query.pageSize || "10");
    const mydata = data.map((item,index)=>{
        return {...item, index}
    })

    if( name === undefined && pubYear === undefined ){
        const filteredItems = mydata.slice( ( (page - 1) * pageSize) , (page * pageSize) ) 
        res.json({page,pageSize,filteredItems})
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
        res.status(202).send("book deleted")
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
    res.status(201).send("book added")
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
        res.status(200).send("book updated")
    }else{
        res.status(404).send("book not found")
    }
})

export default router;



