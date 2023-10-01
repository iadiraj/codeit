const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = require('../misc/misc');
module.exports = function authenticateJWT(req, res, next){
    // console.log(authHeader);
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid authentication token' });
        }
        req.user = user;
        next();
    });
}