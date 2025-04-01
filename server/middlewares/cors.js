export const corsMiddleware = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'no-cors');
    res.setHeader('Access-Control-Allow-Headers', '*')
    next();
};