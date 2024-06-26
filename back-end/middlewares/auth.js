import jwt from 'jsonwebtoken';


const authMiddleware = async (req, res, next) =>{
    // res.json({success : true});
    // next();
    const {token} = req.headers;
    // console.log(token);
    if(!token){
        return res.json({success:false, message:"Not authorized! Login again"});
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error, Token is not valid"});
    }
}

export default authMiddleware;