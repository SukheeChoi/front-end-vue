import { DataMap } from '@grapecity/wijmo.grid';

export default class OwMap extends DataMap {
    constructor(itemsSource, filterKey = null, selectedValuePath = "value", displayMemberPath = "name") {
        super(itemsSource, selectedValuePath, displayMemberPath);

        if (filterKey != null) {
            this.getDisplayValues = (gridItem) => {
                let validCd = itemsSource.filter(comboItem => gridItem[filterKey] == comboItem.linkValue);
                return validCd.map(comboItem => comboItem.name);
            };
        }
    }
}