export const validateUserId = async (req, res, next) => {
  const { id } = req.params;

  const authenticatedUserId = req.user.id;

  if (id !== authenticatedUserId) {
    return res.status(403).json({ messaage: "Not allowed" });
  }
  next();
};
