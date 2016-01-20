Meteor.methods({

  toggleTopic: (topic) => {

    const currentTopics = Meteor.users.findOne(Meteor.userId()).topics;

    if (currentTopics && currentTopics.indexOf(topic) > -1) {
      Meteor.users.update(Meteor.userId(), {
        $pull: {
          "topics": topic
        }
      });
    }
    else {
      Meteor.users.update(Meteor.userId(), {
        $push: {
          "topics": topic
        }
      });
    }

  }

});
