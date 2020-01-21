import { Schema } from './Schema.js'
import { State } from './State.js'
import { EventEmitter } from 'events'

export class Database extends EventEmitter {
    constructor({Storage: {method, settings}}) {
        super()
        this.storage = new method(this, settings);
        this.storage.open()
        this.schema = new Schema() 
        this.state = new State(this.storage.getDb())
    }

    get(key) {
        return {
            ...this.schema.default, ...this.state.get(key), 
            update: (prop, value) => {
                if (this.schema.validProps.includes(prop)) {
                    if (this.state.get(key)) {
                        const newValue = this.get(key)
                        newValue[prop] = value
                        this.state.set(key, newValue)
                    } else {
                        const newValue = {}
                        newValue[prop] = value
                        this.state.set(key, newValue)
                    }
                } else {
                    throw new Error('Prop is not in schema.')
                }
            }
        }
    }

    save() {
        let obj = Array.from(this.state).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
          
        this.storage.save(obj)
    }
}