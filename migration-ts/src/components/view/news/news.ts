import './news.css';
import { INews } from '../../../types/index';

class News {
    draw(data: INews[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item, idx) => {
            if (newsItemTemp) {
                const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
                if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

                const newsMetaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
                newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

                const newsAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
                newsAuthor.textContent = item.author || item.source.name;

                const metaDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
                metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

                const descriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
                descriptionTitle.textContent = item.title;

                const descriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement;
                descriptionSource.textContent = item.source.name;

                const descriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement;
                descriptionContent.textContent = item.description;

                const readMore = newsClone.querySelector('.news__read-more a') as HTMLElement;
                readMore.setAttribute('href', item.url);

                fragment.append(newsClone);
            }
        });

        (document.querySelector('.news') as HTMLElement).innerHTML = '';
        (document.querySelector('.news') as HTMLElement).appendChild(fragment);
    }
}

export default News;
