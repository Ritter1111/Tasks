import { CallbackType, IOpitons, endPoint, StatusResponce } from '../../types';

class Loader {
    private baseLink: string;
    private options: IOpitons;

    constructor(baseLink: string, options: IOpitons) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>({ endpoint, options = {} }: endPoint, callback: CallbackType<T>): void {
        if (!callback) {
            console.error('No callback> for GET response');
        }
        this.load<T>('GET', endpoint, callback, options);
    }

    errorHandler = (res: Response): Response => {
        if (!res.ok) {
            if (res.status === StatusResponce.unautorized || res.status === StatusResponce.notFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    };

    makeUrl(options: IOpitons, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: string, endpoint: string, callback: CallbackType<T>, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
