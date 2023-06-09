import './sources.css';
import { INewsSource } from '../../../types/index';

class Sources {
    draw(data: INewsSource[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true) as HTMLTemplateElement | null;
            if (sourceClone instanceof HTMLTemplateElement) {
                const itemName = sourceClone.querySelector('.source__item-name');
                if (itemName) {
                    itemName.textContent = item.name;
                }
                const sourceItem = sourceClone.querySelector('.source__item');
                if (sourceItem) {
                    sourceItem.setAttribute('data-source-id', item.id);
                }
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
