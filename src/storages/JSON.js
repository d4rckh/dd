import { readFileSync, writeFileSync } from 'fs'

export class JSONStorage {
    
    constructor(db, settings) {
        this.file = settings.file
        this.db = db
    }

    getDb() {
        return readFileSync(this.file, {encoding: 'utf8'})
    }

    save(obj) {
        return writeFileSync(this.file, JSON.stringify(obj))
    }

    open() {
        this.db.emit('open')
    }

    close() {
        this.db.emit('close')
    }
    
}