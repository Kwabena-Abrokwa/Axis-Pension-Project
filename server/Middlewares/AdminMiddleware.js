import JWT from "jsonwebtoken";

export default async (req, res, next) => {
    const token  = req.header('auth-admin-token');
    if(!token) return res.status(401).send("Access Denied");

    try {
        const verified = JWT.verify(token, process.env.SECRET_TOKEN_ADMIN)
        req.admin = verified;
        next();
    } catch (error) {
        return res.status(400).send("Invalid Token");
    }
}