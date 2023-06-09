import { CallbackType } from '../../types';
import { IDrawArticles, IDrawSources } from '../view/appView';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: CallbackType<IDrawSources>): void {
        super.getResp({ endpoint: 'sources' }, callback);
    }

    getNews(e: Event, callback: CallbackType<IDrawArticles | undefined>): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId !== null && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
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
}

export default AppController;
