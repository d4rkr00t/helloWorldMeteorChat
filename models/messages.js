Messages = new Meteor.Collection('Messages');

Messages.allow({
  insert: function (userId, message) {
    return userId && message.owner === userId;
  },
  remove: function (userId, message) {
    console.log(userId, message.owner);
    if (message.owner !== userId) {
      return false;
    }
    return true;
  }
});
