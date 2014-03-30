Template.page.isLoggedIn = function () {
  return !!Meteor.user();
};

Template.chat.messages = function () {
  return Messages.find({},{
    sort: {
      timestamp: -1
    },
    limit: 50
  });
};

var addMessage = function() {
  var message = $('.message-text-field');

  if (!message.val()) {
    alert('Заполните поле сообщение!');
  } else {

    Messages.insert({
      message: message.val(),
      username: Meteor.user().emails[0].address,
      timestamp: Date.now(),
      owner: Meteor.userId()
    });

    message.val('');
  }
};

Template.chat.events({
  'click .send-message': function () {
    addMessage();
  },
  'keydown .message-text-field': function (evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      evt.stopPropagation();

      addMessage();
    }
  }
});

Template.message.isOwner = function (data) {
  return Meteor.userId() === data;
};

Template.message.events({
  'click .delete-message': function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    Messages.remove({_id: $(evt.target).data('id')});
  }
});
