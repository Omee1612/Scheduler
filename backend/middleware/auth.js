const jwt = require('jsonwebtoken');

const verifyTok = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).send('Access Denied');
    const token = authHeader.split(" ")[1];
    if(!token) return res.status(401).send("Access denied");
    try
    {
        const verified = jwt.verify(token,'yoursecretkey');
        req.user = verified;
        next();
    } catch(error) {
        console.error(error);
        res.status(401).send('Invalid Token');
    }
}
const verifyTokAdmin = (req,res,next) => {
   if(!req.user.isAdmin) return res.status(403).send("Not admin");
   next();
}
module.exports = {verifyTok , verifyTokAdmin};