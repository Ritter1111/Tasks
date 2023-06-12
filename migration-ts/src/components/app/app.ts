import { DrawArticles, DrawSources } from '../../types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { alphabet } from './btnKey';
import './app.css';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }
    start(): void {
        const sourcesElement = document.querySelector('.sources') as HTMLElement;
        sourcesElement.addEventListener('click', (e: Event) => {
            this.controller.getNews(e, (data: DrawArticles) => this.view.drawNews(data));
        });

        const letterElem = document.querySelector('.letter') as HTMLElement;

        alphabet.forEach((btn: Record<string, string>) => {
            const btnEl = document.createElement('button');
            btnEl.className = 'letter_button';
            btnEl.innerHTML = btn.key;
            letterElem.appendChild(btnEl);
        });
        letterElem.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('letter_button')) {
                const letter = target.textContent || '';
                this.controller.filterSourcesByLetter(letter);
            }
        });

        this.controller.getSources((data: DrawSources) => this.view.drawSources(data));
    }
}

export default App;
