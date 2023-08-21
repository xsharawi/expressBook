import express, {Response,Request} from 'express';
import bookRouter from './routers/book'
import os from 'os'
const server = express();
const PORT = 3000
server.use(express.json())


server.get("/",  (req, res)=> {
	const result = {
		host: os.hostname(),
		headers: req.headers
	}

	res.format({
		"text/plain": () => {
			res.json(result)
		},
		"application/json": () => {
			res.json(result)
		},
		"text/html": ()=> {
			res.json(result)
		}
	})
})

server.get("/health", (req, res) => {
	res.status(200);
})
server.use('/book',bookRouter)

server.all('*', (req,res)=>{
    res.status(400).send('use the correct routes')
})

server.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`)
})
