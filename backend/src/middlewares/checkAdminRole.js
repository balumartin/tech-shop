const checkAdminRole = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return next(new HttpError('Access denied. Admins only.', 403));
    }
    next();
  };

  export default checkAdminRole;