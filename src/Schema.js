const validTypes = [
    'int', 'string', 'boolean'           
]

export class Schema {
    constructor() {
        this.props = {}
        this.default = {}
        this.validProps = []
    }

    setProp(prop, type, settings={}) {
        if (!prop || !type) throw new Error()
        if (!validTypes.includes(type)) throw new Error('Type must be: ' + validTypes.join(', '))

        if (!settings.default) settings.default = null;

        this.props[prop] = {
            type,
            default: settings.default
        }
        this.default[prop] = settings.default
        this.validProps.push(prop)
    }
}