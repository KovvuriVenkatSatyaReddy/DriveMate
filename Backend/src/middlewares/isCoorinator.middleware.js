import jwt from "jsonwebtoken";

const isCoordinator = (req, res, next) => {
  if (req.user && (req.user.role === 'coordinator' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Coordinators or admins only.' });
  }
};
export default isCoordinator;