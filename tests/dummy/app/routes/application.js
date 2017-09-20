import Ember from 'ember';
import PostRobot from 'post-robot';

const { Logger, isPresent, isBlank } = Ember;

export default Ember.Route.extend({
  postRobotListener: null,

  postRobotEventHandler(event) {
    Logger.info('org.example.event', event);
  },

  activate() {
    if (isPresent(this.get('postRobotListener'))) return;

    let handler = this.get('postRobotEventHandler');

    this.set('postRobotListener', PostRobot.on('org.example.event', handler));
    Logger.info('Listening org.example.event ...');
  },

  deactivate() {
    let listener = this.get('postRobotListener');
    if (isBlank(listener)) return;

    listener.cancel();
    this.set('postRobotListener', null);
    Logger.info('...stopped listening org.example.event .');
  }
});
