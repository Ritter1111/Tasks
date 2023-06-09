export interface INewsSource {
    id: string;
    name: string;
}

export interface INews {
    urlToImage: string;
    author: string;
    publishedAt: string;
    title: string;
    url: string;
    description: string;
    source: { name: string };
}
