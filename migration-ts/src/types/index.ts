export type CallbackType<T> = (data: T) => void;

export type IOpitons = Record<string, string>;

export type endPoint = {
    endpoint: string;
    options?: IOpitons;
};

export enum StatusResponce {
    unautorized = 401,
    notFound = 404,
}

export interface IDrawSources {
    readonly sources?: INewsSource[];
}

export interface IDrawArticles {
    readonly articles?: INews[];
}

export interface INewsSource {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly category: string;
    readonly country: string;
}

export interface INews {
    readonly urlToImage: string;
    readonly author: string;
    readonly publishedAt: string;
    readonly title: string;
    readonly url: string;
    readonly description: string;
    readonly source: INewsSource;
}
