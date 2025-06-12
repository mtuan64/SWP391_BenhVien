const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Không có token, truy cập bị từ chối' });
    }

    try {
        const decoded = jwt.verify(token, "7d9f6c8e3b2a1f5d4e9c8b7a6f3d2e1b0c9a8f7e6d5b4a3c2e1f0d9b8a7c6e5f");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

const adminMiddleware = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Không có quyền truy cập' });
    }
    next();
};

module.exports = {
    authMiddleware,
    adminMiddleware
};