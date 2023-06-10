import { DrawArticles, DrawSources } from '../../types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesElement = document.querySelector('.sources') as HTMLElement;
        sourcesElement.addEventListener('click', (e: Event) => {
            this.controller.getNews(e, (data: DrawArticles) => this.view.drawNews(data));
        });
        this.controller.getSources((data: DrawSources) => this.view.drawSources(data));
    }
}

export default App;
