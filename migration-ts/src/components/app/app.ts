// import { INews, INewsSource } from '../../types';
import AppController from '../controller/controller';
import { AppView, IDrawArticles, IDrawSources } from '../view/appView';

// export type newsResponse = {
//     readonly sources?: INewsSource[];
//     readonly articles?: INews[];
// };

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        const sourcesElement = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: Event) => {
                this.controller.getNews(e, (data: IDrawArticles | undefined) => this.view.drawNews(data || {}));
            });
            this.controller.getSources((data: IDrawSources | undefined) => this.view.drawSources(data || {}));
        }
    }
}

export default App;
