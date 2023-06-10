import './sources.css';
import { INewsSource } from '../../../types/index';

class Sources {
    draw(data: INewsSource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            const itemName = sourceClone.querySelector('.source__item-name') as HTMLElement;
            itemName.textContent = item.name;

            const itemSource = sourceClone.querySelector('.source__item') as HTMLElement;
            itemSource.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources') as HTMLElement;
        sourcesContainer.append(fragment);
    }
}

export default Sources;
