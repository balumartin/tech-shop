// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  res.status(err.statusCode || 500);

  if (process.env.NODE_ENV !== "production")
    return res.send({ error: err.message || "Something failed!" });
  return res.send({ error: err.message || "Something failed!" });
}
