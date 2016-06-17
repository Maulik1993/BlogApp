var Reflux = require('reflux');

var actionComponent = Reflux.createActions([
  "handleRegistrationForm",
  "handleLoginAuth",
  "logOut",
  "searchAndDisplayMovie",
  "searchAndAddToDb",
  "deleteSelectedMv",
  "fetchMovieCont"
]);

module.exports = actionComponent;
