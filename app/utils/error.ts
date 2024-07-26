class UnauthorizedError extends Error {
  private status;
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
    this.status = 401;
  }
}
