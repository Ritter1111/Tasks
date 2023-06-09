export type CallbackType<T> = (data: T) => void;

export interface INewsSource {
    id: string;
    name: string;
    description: string;
    category: string;
    country: string;
}

export interface INews {
    urlToImage: string;
    author: string;
    publishedAt: string;
    title: string;
    url: string;
    description: string;
    source: INewsSource;
}
