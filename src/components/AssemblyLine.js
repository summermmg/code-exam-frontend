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
            // [categoryName, itemList] looks like this: ['Idea', [{..}, {..}]]
            Object.entries(prevMap).forEach(([categoryName, itemList]) => {
              // prepend new task to first column and give it an unique id
              if (categoryName === stages[0]) {
                newMap[categoryName] = [
                  {
                    item: inputValue,
                    category: categoryName,
                    id: uuid()
                  },
                  ...itemList
                ];
              } else {
                newMap[categoryName] = itemList;
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
            // [categoryName, itemList] looks like this: ['Idea', [{..}, {..}]]
            Object.entries(prevMap).forEach(([categoryName, itemList]) => {
              // remove clicked item from current category
              if (categoryName === category) {
                newMap[categoryName] = itemList.filter((item) => item.id !== id);
              } else if (nextCategory && categoryName === nextCategory) {
                // prepend clicked item to next category
                newMap[categoryName] = [
                  {
                    item: itemName,
                    category: categoryName,
                    id: uuid()
                  },
                  ...itemList
                ];
              } else {
                newMap[categoryName] = itemList;
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
            // [categoryName, itemList] looks like this: ['Idea', [{..}, {..}]]
            Object.entries(prevMap).forEach(([categoryName, itemList]) => {
              // remove clicked item from current category
              if (categoryName === category) {
                newMap[categoryName] = itemList.filter((item) => item.id !== id);
              } else if (prevCategory && categoryName === prevCategory) {
                // append clicked item to prev category
                newMap[categoryName] = [
                  ...itemList,
                  {
                    item: itemName,
                    category: categoryName,
                    id: uuid()
                  }
                ];
              } else {
                newMap[categoryName] = itemList;
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