const {compose} = require('objection');
import visibilityPlugin = require('objection-visibility');

const mixins = compose(
  visibilityPlugin
)

export default function RestMixin(Model) {
  return class extends mixins(Model) {

    static whiteList(query) {
      return query.then(result => {
        let whiteListed: any = null;

        if(Array.isArray(result)) {

          if(!(result instanceof this.constructor))
            return Promise.resolve(result);

          whiteListed = result.map(item => {
            return item.toJSON();
          });
        }

        if(!(result instanceof this.constructor))
          return Promise.resolve(result);

        whiteListed = result.toJSON();

        return Promise.resolve(whiteListed);
      });
    }
  }
}