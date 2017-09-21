# ember-post-robot

[![Ember Observer Score](http://emberobserver.com/badges/ember-post-robot.svg)](http://emberobserver.com/addons/ember-post-robot)
[![npm version](https://badge.fury.io/js/ember-post-robot.svg)](http://badge.fury.io/js/ember-post-robot)

This ember addon allows consumption of the [post-robot](https://github.com/krakenjs/post-robot)
library - A cross domain post-messaging on the client side using a simple listener/client pattern -
in ember-cli apps.

## Using ember-post-robot

### Adding it to your app

You can install this addon to your ember > 2.3.0 app using EmberCLI:

```
ember install ember-post-robot
```

### Importing post-robot

You can include post-robot into your controllers, routes, components or any class that requires it
with an ES6 import:

```javascript
import PostRobot from 'post-robot';
```

The `PostRobot` export contains all the methods of the [krakenjs/post-robot](https://github.com/krakenjs/post-robot#simple-listener-and-sender)
library.

### Sending Messages

In this example, we'll send a message to an iframe from a controller action:

```javascript
import Ember from 'ember';
import PostRobot from 'post-robot';

export default Ember.Controller.extend({
  actions: {
    notifyIframe(iframeId) {
      let someIframe = window.document.getElementById(iframeId);
      if (isBlank(someIframe)) return;
      PostRobot.send(someIframe, 'org.example.message', { body: 'This is an example' });
              //  .then(notifySuccess)
              //  .catch(notifyFailure);
    },
  }
});
```

See more examples on the [krakenjs/post-robot](https://github.com/krakenjs/post-robot) README.

### Receiving Messages

In this example, we'll receive a message from another iframe in a route:

```javascript
import Ember from 'ember';
import PostRobot from 'post-robot';

export default Ember.Route.extend({
  messageListener: null,

  activate() {
    // Return if the listener is already activated!
    if (Ember.isPresent(this.get('messageListener'))) return;

    this.set(
      'messageListener',
      PostRobot.on('org.example.messagee', (message) => { Ember.Logger.info(message.body); })
    );
  },

  deactivate() {
    // Let's make sure the listener will no longer be active:
    let listener = this.get('messageListener');
    if (Ember.isBlank(listener)) return;

    listener.cancel();
    this.set('messageListener', null);
  }
});
```

## Testing

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## Some useful links

* [Using npm libraries in Ember CLI](https://simplabs.com/blog/2017/02/13/npm-libs-in-ember-cli.html) - let's stop using Bower. End the madness!
