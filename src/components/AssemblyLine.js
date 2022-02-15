import {useState} from 'react';
import Items from './Items';

export default function AssemblyLine({ stages }) {
    // create initial state
    const itemsMap = {};
    stages.forEach((category) => {
        itemsMap[category] = [];
    });

    // state
    // {'idea': [{id: xxx, item: 'item1', category: 'idea'}, ...], 'Development':...}
    const [itemsData, setItemsData] = useState(itemsMap);

    let content = itemsData &&
        // create item lists. get corresponding items from itemsData
        // notice that index wouldn't be changed, so we can use it as key here
        stages.map((category, index) => (
        <Items
            key={index}
            category={category}
            items={itemsData[category]}
        />
        ));
        
    return (
        <div className="container">
            <form className="search-box">
                <label htmlFor="add-item">Add an item: </label>
                <input
                type="text"
                id="add-item"
                />
            </form>
            <div className="ul-container">{content}</div>
        </div>
    )
}