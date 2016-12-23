Meteor.methods({

  toggleTopic(topic) {
    const currentTopics = Meteor.users.findOne(this.userId).topics;

    if (currentTopics && currentTopics.indexOf(topic) > -1) {
      return Meteor.users.update(this.userId, {
        $pull: { "topics": topic }
      });
    }
    
    return Meteor.users.update(this.userId, {
      $push: { "topics": topic }
    });
  }
});
