import { INews, INewsSource } from '../../types';
import News from './news/news';
import Sources from './sources/sources';

export interface IDrawSources {
    sources?: INewsSource[];
}

export interface IDrawArticles {
    articles?: INews[];
}

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IDrawArticles): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: IDrawSources): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
