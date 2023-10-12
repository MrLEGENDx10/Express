const jwt = require('jsonwebtoken');

const jwtAuth =(req,res,next)=>{
    // verify token 
    // inject user info in req 

    const token = (req.cookies && req.cookies.token) || null;
    console.log(token);
    if(!token){
        return res.status(400).json({
            success:false,
            message : "NOT authorized"
        })
    }
    try {
        const payload = jwt.verify(token,process.env.SECRET);
        
        req.user = {
            id:payload.id,
            email:payload.email
        };

    } catch (error) {
        return res.status(400).json({
            success:false,
            message: error.message
        })
    }

    next();
}

module.exports = jwtAuth;