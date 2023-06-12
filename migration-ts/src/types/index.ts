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

interface ISourcesArticles {
    readonly sources: INewsSource[];
    readonly articles: INews[];
}

type SourcesArticles = Partial<ISourcesArticles>;

export interface INewsSource {
    readonly id: string;
    readonly name: string;
    readonly language: string;
    readonly description: string;
    readonly category: string;
    readonly country: string;
}

export interface INews {
    readonly urlToImage: string;
    readonly author: string;
    readonly content: string;
    readonly publishedAt: string;
    readonly title: string;
    readonly url: string;
    readonly description: string;
    readonly source: sourseData;
}

export type DrawSources = Pick<SourcesArticles, 'sources'>;
export type DrawArticles = Pick<SourcesArticles, 'articles'>;
export type sourseData = Pick<INewsSource, 'id' | 'name'>;

export type typesData = INewsSource | INews;
