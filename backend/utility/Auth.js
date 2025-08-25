const jwt =  require('jsonwebtoken');

const authenticateJWT =(req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    //check if token is provided
    if (!token) return res.status(401).json({error:'Token Missing'});

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();

       } catch{
        res.status(403).json({error:'Invalid Token'});
       }
};

module.exports = authenticateJWT;