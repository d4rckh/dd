export class State extends Map {
    constructor(obj) {
        super(Object.entries(JSON.parse(obj)))
    }
} 