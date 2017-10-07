import Sessions from './models/session';
import * as moment from 'moment';
import * as Boom from 'boom';

export function registerEvents(events) {
  events.on('userLogin', data => {
    Sessions.query()
      .first()
      .where('userId', data.id)
      .then(result => {
        if(result) return Promise.resolve(result); 

        return Sessions.query()
          .insert({
            userId: data.id,
            expiry: moment().add(1, 'd').format('X')
          });
      })
      .then(result => {
        events.emit('sessionCreated');
        // console.log('session created', result);
      })
      .catch(err => {
        console.log('error creating session', err);
      })
  });

  events.on('userLogout', data => {
    Sessions.query()
      .delete()
      .where('userId', data.id)
      .then(result => {
        if(!result) throw Boom.notFound('User is not signed in');
        events.emit('sessionDeleted');
      })
      .catch(err => {
        console.log('error', err);
      })
  });
}