export class Sodium {
    url: string;
    password: string;

    constructor(url: string, password: string) {
        this.password = password;
        this.url = url;
    }

    async request(body: any, endpoint: string) {
        const r = await fetch(`${this.url}${endpoint}`,  
        {
            method: 'POST', 
            headers: {
                Authorization: this.password, 
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(body)
        });
        if(r.status != 200) {
            return await r.text()
        } else {
            return await r.json()
        }
    }

    async create(body: any) {
        const r = await this.request(body, '/create');
        return r;
    }

    async remove(entry: string, doc?: string) {
        let data = {entry: entry};
        if(doc) {
            data['doc'] = doc;
        }
        const r = await this.request(data, '/delete')
        return r;
    }

    async read(entry: string, doc?: string) {
        let data = {entry: entry};
        if(doc) {
            data['doc'] = doc;
        }
        const r = await this.request(data, '/read');
        return r;
    }

    async test() {
        return await fetch(this.url);
    }
}