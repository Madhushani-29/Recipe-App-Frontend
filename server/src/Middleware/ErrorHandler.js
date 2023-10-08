import {constants} from "../Constants.js";

const errorHandler =(err, req, res, next)=>{
    const statusCode=res.statusCode ? res.statusCode:200;
    switch (statusCode){
        case constants.OK:
            res.json({title:"Ok", message:err.message, stackTrace:err.stack});
            break;
        case constants.CREATED:
            res.json({title:"Created", message:err.message, stackTrace:err.stack});
            break;
        case constants.NO_CONTENT:
            res.json({title:"No Content", message:err.message, stackTrace:err.stack});
            break;
        case constants.BAD_REQUEST:
            res.json({title:"Bad Request", message:err.message, stackTrace:err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.json({title:"Unauthorized", message:err.message, stackTrace:err.stack});
            break;
        case constants.FORBIDDEB:
            res.json({title:"Forbidded", message:err.message, stackTrace:err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title:"NOT_FOUND", message:err.message, stackTrace:err.stack});
            break;
        case constants.INTERNAL_SERVER_ERROR:
            res.json({title:"INTERNAL_SERVER_ERROR", message:err.message, stackTrace:err.stack});
            break;
        case constants.BAD_GATEWAY:
            res.json({title:"BAD_GATEWAY", message:err.message, stackTrace:err.stack});
            break;
        case constants.SERVICE_UNAVAILABLE:
            res.json({title:"SERVICE_UNAVAILABLE", message:err.message, stackTrace:err.stack});
            break;
        default:
            console.log("All are OK");
            break;
    }
}

export {errorHandler};

