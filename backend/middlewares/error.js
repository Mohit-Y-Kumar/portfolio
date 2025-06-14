class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode =statusCode;
    }
}

export const errorMiddleware =(err,req,res,next) =>{
    err.message =err.message || " Internal server Error";
    err.statusCode =err.statusCode || 500;

    if(err.code ===11000){
        const message =`Duplicate ${Object.keys(err.keyValue)} Entered`;
        err =new ErrorHandler(message,400);
    }
  
    if(err.name ==="jsonWebTokenError"){
        const message ='json web Toke Is Invalid. Try Again';
        err =new ErrorHandler(message,400);
    }
    if(err.name ==="TokenExpiredError"){
        const message ='json web Toke Is Expired. Try Again';
        err =new ErrorHandler(message,400);
    }

    if(err.name ==="CasteError") {
        const message =`Invalid ${err.path} `;
        err =new ErrorHandler(message,400);

    }

    const errMessage =err.errors
     ? Object.values(err.errors)
    .map((error) =>error.message)
    .join("")
    :err.message;

    return res.status(err.statusCode).json({
        success :false,
        message:errMessage,
    });
    
};

export default ErrorHandler;