const fs = require("fs");
const http = require("http");

const {createLogger, transports, format} = require("winston");
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
    format: combine(
    label({ label: 'Grocery List!' }),
    timestamp(),
    prettyPrint()
    ),
    transports: [
        new (transports.Console)(),
        new (transports.File)({filename: 'somefile.log'})
    ]
});

const PORT = 3000;

const server = http.createServer((req, res) =>{
    const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

    res.setHeader('Content-Type', 'application/json');
    let body = "";

    const contentType = {"Content-Type": "application/json"};

    req.on('data', chunk => {
        body += chunk;
    })
    req.on('end', () => {
        body = body.length > 0 ? JSON.parse(body) : {};

        switch(req.method){
            case "GET": // view grocery list
                res.statusCode = 200;
                res.end(JSON.stringify(data.grocery_list));
                logger.info("GET request handled");
                break;

            case "POST": // add grocery item
                if (body){
                    let {name, quantity, price, bought} = body;
                    if(!name || !quantity || !price || bought==undefined){
                        res.writeHead(400, contentType);
                        res.end(
                            JSON.stringify({
                                message: "Please provide a valid name, quantity, price, and purchased status."
                            })
                        )
                        logger.warn("Invalid POST request, missing fields.")
                    }else{
                        logger.info(body);
                        res.statusCode = 201; // created
                        data.grocery_list.push(body);
                        res.end(fs.writeFileSync('data.json', JSON.stringify(data), 'utf8', (err) => {
                                    if(err){
                                        logger.error(err);
                                        return;
                                    }
                                    logger.info("POST request handled, item added to grocery list.");
                        }))
                    }
                } else{
                    res.writeHead(400, contentType);
                    res.end(
                        JSON.stringify({
                            message: "Please provide a valid name, quantity, price, and purchased status."
                        })
                    )
                    logger.warn("Invalid POST request, empty body.")
                } 
                break;

            case("PUT"): // edit item 
                if (body){
                    let { name: putName, bought: putBought} = body;
                    if (!putName || putBought==undefined){
                        res.writeHead(400, contentType);
                        res.end(JSON.stringify({message: "Please provide a valid name and purchased status."}))
                        logger.warn("Invalid PUT request.")
                    } else{
                        logger.info(body);
                        res.statusCode = 200; // ok
                        const index = data.grocery_list.findIndex(grocery => grocery.name === putName);
                        if (index != -1){ // item found
                            data.grocery_list[index].bought = putBought;
                            res.statusCode = 200; // ok
                            res.end(fs.writeFileSync('data.json', JSON.stringify(data), 'utf8', (err) => {
                                if(err){
                                    logger.error(err);
                                    return;
                                }
                                logger.info("PUT request handled, item updated.");
                            }))
                        } else{ // not found 
                            res.writeHead(400, contentType);
                            res.end(JSON.stringify({message: "Item not found."}));
                            logger.warn("Invalid PUT request.No item found.");
                        }  
                    }
                } else{
                    res.writeHead(400, contentType);
                    res.end(
                        JSON.stringify({
                            message: "Please provide a valid name, quantity, price, and purchased status."
                        })
                    )
                    logger.warn("Invalid POST request, empty body.")
                }
                break;

            case("DELETE"): // delete item 
                if(body){
                    let {name:delName} = body;
                    if (!delName){
                        res.writeHead(400, contentType);
                        res.end(JSON.stringify({mesage: "Please provide a valid name."}))
                        logger.warn("Invalid DELETE request, invalid name.");
                    } else{
                        logger.info(body);
                        res.statusCode = 200; // ok
                        const index = data.grocery_list.findIndex(grocery => grocery.name === delName);
                        if (index != -1){ // item found
                            res.statusCode = 200; // ok
                            data.grocery_list.splice(index, index);
                            res.end(fs.writeFileSync('data.json', JSON.stringify(data), 'utf8', (err) => {
                                if(err){
                                    logger.error(err);
                                    return;
                                }
                                logger.info("DELETE request handled, item deleted.");
                            }))
                        } else{ // not found 
                            res.writeHead(400, contentType);
                            res.end(JSON.stringify({message: "Item not found."}));
                            logger.warn("Invalid DELETE request.");
                        }
                    }} else{
                         res.writeHead(400, contentType);
                    res.end(
                        JSON.stringify({
                            message: "Please provide a valid name, quantity, price, and purchased status."
                        })
                    )
                    logger.warn("Invalid POST request, empty body.")
                }
                break;

            default:
                res.statusCode = 405; // method not allowed
                res.end(JSON.stringify({message: "Method not supported"}))
                logger.warn("Method not supported.")
                break;
        }    
    })
});

server.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
});