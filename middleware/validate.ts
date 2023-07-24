import express,{Response,Request} from "express";
import data from '../data/Sample_data'
import Book from "../types/book";

let validate = ( req: Book.Request, res: Response, next: express.NextFunction ) => {
    let title = req.body.title;
    let author = req.body.author;
    let pubYear = req.body.pubYear;
    if( title === "" || title === undefined || title.length < 3 ){
        res.send("make a correct title and title length should be more than 2 character")
        return;
    }
    if( author === "" || author === undefined || author.length < 3 ){
        res.send("make a correct author and author length should be more than 2 character")
        return;
    }
    if( pubYear === "" || pubYear === undefined ){
        res.send("make a correct pubYear ")
        return;
    }
    next();
}



export{
    validate
}