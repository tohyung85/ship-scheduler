import * as moment from 'moment';

export default function TimestampMixin(Model) {
  return class extends Model {
    $beforeInsert(context) {
      const promise = super.$beforeInsert(context);

      return Promise.resolve(promise)
        .then(() => {
          this['created_at'] = moment().format('X');
          this['updated_at'] = moment().format('X');
        });
    }

    $beforeUpdate(context) {
      const promise = super.$beforeInsert(context);

      return Promise.resolve(promise)
        .then(() => {
          this['updated_at'] = moment().format('X');
        });
    }
  }
}