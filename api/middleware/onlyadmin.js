import jwt from 'jsonwebtoken';
 

export const onlyadmin = async (req, res, next) => {
    
    try {
        
        const token = req.cookies.access_token;
    if (!token) {
        return next(403, 'unauthorized')
    } 

        const decodeToken = jwt.verify(token, process.env.jWT_SECRET);
        if(decodeToken.role === 'admin') {
            req.user = decodeToken ;
            next();
        }else{
            return next(403, 'unauthorized')
        }
    } catch (error) {
        return next(500, err.message);
    }
}