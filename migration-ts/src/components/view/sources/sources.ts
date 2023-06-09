import './sources.css';
import { INewsSource } from '../../../types/index';

class Sources {
    draw(data: INewsSource[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true) as HTMLTemplateElement | null;
            if (sourceClone instanceof HTMLTemplateElement) {
                sourceClone.querySelector('.source__item-name')!.textContent = item.name;
                sourceClone.querySelector('.source__item')!.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });

        const soursecContainer = document.querySelector<HTMLElement>('.sources');
        if (soursecContainer) {
            soursecContainer.append(fragment);
        }
    }
}

export default Sources;
