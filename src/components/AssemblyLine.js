import {useState} from 'react';
import Items from './Items';
import uuid from "react-uuid";

export default function AssemblyLine({ stages }) {
    // create initial state
    const itemsMap = {};
    stages.forEach((category) => {
        itemsMap[category] = [];
    });

    // state
    // {'idea': [{id: xxx, item: 'item1', category: 'idea'}, ...], 'Development':...}
    const [itemsData, setItemsData] = useState(itemsMap);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    // by press 'ENTER', task will be added to first col
    const handleInputSubmit = (e) => {
        e.preventDefault();
        setItemsData((prevMap) => {
            let newMap = {};
            // [k, v] looks like this: ['Idea', [{..}, {..}]]
            Object.entries(prevMap).forEach(([k, v]) => {
              // console.log(k, v)
              // prepend new task to first column and give it an unique id
              if (k === stages[0]) {
                newMap[k] = [
                  {
                    item: inputValue,
                    category: k,
                    id: uuid()
                  },
                  ...v
                ];
              } else {
                newMap[k] = v;
              }
            });
            return newMap;
        });
        setInputValue("");
    };

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
            <form className="search-box" onSubmit={handleInputSubmit}>
                <label htmlFor="add-item">Add an item: </label>
                <input
                type="text"
                id="add-item"
                value={inputValue}
                onChange={handleInputChange}
                />
                <span>
                    <small> *Please use keybord 'enter' to submit</small>
                </span>
            </form>
            <div className="ul-container">{content}</div>
        </div>
    )
}