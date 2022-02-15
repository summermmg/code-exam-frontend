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
        if (!inputValue) {return}
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

    const handleLeftClick = (id, category, itemName) => {
        // update itemsData based on prev object data
        setItemsData((prevMap) => {
            let newMap = {};
            // edge case for last column
            let nextCategory = category !== stages[-1]
                ? stages[stages.indexOf(category) + 1]
                : null
            // [k, v] looks like this: ['Idea', [{..}, {..}]]
            Object.entries(prevMap).forEach(([k, v]) => {
              // remove clicked item from current category
              if (k === category) {
                newMap[k] = v.filter((item) => item.id !== id);
              } else if (nextCategory && k === nextCategory) {
                // prepend clicked item to next category
                // console.log(nextCategory)
                newMap[k] = [
                  {
                    item: itemName,
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
    }

    const handleRightClick = (id, category, itemName) => {
        // update itemsData based on prev object data
        setItemsData((prevMap) => {
            let newMap = {};
            // edge case for first column
            let prevCategory = category !== stages[0]
                ? stages[stages.indexOf(category) - 1]
                : null
            // [k, v] looks like this: ['Idea', [{..}, {..}]]
            Object.entries(prevMap).forEach(([k, v]) => {
              // remove clicked item from current category
              if (k === category) {
                newMap[k] = v.filter((item) => item.id !== id);
              } else if (prevCategory && k === prevCategory) {
                // append clicked item to prev category
                // console.log(prevCategory)
                newMap[k] = [
                  ...v,
                  {
                    item: itemName,
                    category: k,
                    id: uuid()
                  }
                ];
              } else {
                newMap[k] = v;
              }
            });
            return newMap;
        });
    }

    let content = itemsData &&
        // create item lists. get corresponding items from itemsData
        // notice that index wouldn't be changed, so we can use it as key here
        stages.map((category, index) => (
        <Items
            key={index}
            category={category}
            items={itemsData[category]}
            onLeftClick={handleLeftClick}
            onRightClick={handleRightClick}
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
                    <small> *Please use keyboard 'ENTER' to submit</small>
                </span>
            </form>
            <div className="ul-container">{content}</div>
        </div>
    )
}