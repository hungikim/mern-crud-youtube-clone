import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    // Check if token exists in the request header
        // and verify if it matches our secret key
    try {
        let token = req.header('Authorization');
        if (!token){
            return res.status(403).send("Access denied");
        }

        if (token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.user = verified;
        next();
        
    } catch (err) { res.status(500).json({ error: err.mesage }) }
}
