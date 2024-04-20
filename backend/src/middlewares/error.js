const handleError = (err, req, res, next) => {
  console.error(err); // Log the error for debugging

  if (err.status) {
    // If the error has a status code (e.g., from an HTTP library)
    return res.status(err.status).json({ message: err.message });
  }

  // Handle other errors (e.g., database errors)
  return res.status(500).json({ message: "Internal server error" });
};

module.exports = handleError;
