import { DrawArticles, DrawSources } from '../../types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    public news: News;
    public sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: DrawArticles): void {
        const values = data?.articles ? data?.articles : [];
        console.log(values);
        this.news.draw(values);
    }

    drawSources(data: DrawSources): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }

    filterSourcesByLetter(letter: string): void {
        const sourceItems = document.querySelectorAll('.source__item');

        sourceItems.forEach((item) => {
            const itemName = item.querySelector('.source__item-name') as HTMLElement;
            const sourceName = itemName.textContent || '';

            if (sourceName.charAt(0).toUpperCase() === letter.toUpperCase()) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }
}

export default AppView;
