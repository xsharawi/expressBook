import express, {Response,Request} from 'express';
import bookRouter from './routers/book'
const server = express();
const PORT = 3000
server.use(express.json())


server.use('/book',bookRouter)

server.all('*', (req,res)=>{
    res.status(400).send('use the correct routes')
})

server.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`)
})