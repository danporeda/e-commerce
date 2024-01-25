module.exports = {
  getError(errors, prop) {
    try {
      return errors.mapped()[prop].msg;
    } catch (err) {
      return '';
    }
  },
  loggedOut(req) {
    if (!req.session.userId) {
      return 'You are logged out';
    } else {
      return `You are logged in, User ID: ${req.session.userId}`;
    }
  }
};