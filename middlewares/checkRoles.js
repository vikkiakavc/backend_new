module.exports.checkUserRole = (requiredRoles) => {
    return (req, res, next) => {
        try {
            if (!requiredRoles.includes(req.user?.role)) {
                return res.status(403).json({ error: 'Access denied' });
            }
            next();
        } catch (error) {
            console.log(error)
            return res.status(403).json({ "message": "Error occurred while checking user role." });
        }
    };
};