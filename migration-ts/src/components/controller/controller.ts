import { CallbackType, DrawArticles, DrawSources } from '../../types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: CallbackType<DrawSources>): void {
        super.getResp<DrawSources>({ endpoint: 'sources' }, callback);
    }

    getNews(e: Event, callback: CallbackType<DrawArticles>): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (sourceId !== null && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<DrawArticles>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }

    filterSourcesByLetter(letter: string): void {
        const sourcesContainer = document.querySelector('.sources') as HTMLElement;
        sourcesContainer.classList.remove('hidden');

        const sourceItems = sourcesContainer.querySelectorAll('.source__item');

        sourceItems.forEach((item) => {
            const itemName = item.querySelector('.source__item-name') as HTMLElement;
            const sourceName = itemName.textContent || '';

            if (sourceName.charAt(0).toLowerCase() === letter.toLowerCase()) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }
}

export default AppController;
