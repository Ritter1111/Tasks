import { INews, INewsSource } from '../../types';
import News from './news/news';
import Sources from './sources/sources';

export interface IDrawSources {
    readonly sources?: INewsSource[];
}

export interface IDrawArticles {
    readonly articles?: INews[];
}

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IDrawArticles) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: IDrawSources) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
