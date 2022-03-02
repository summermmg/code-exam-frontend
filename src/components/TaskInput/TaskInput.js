import React from 'react'
import './TaskInput.css'
import {useState} from 'react';
import uuid from "react-uuid";

const TaskInput = ({ stages, setItemsData }) => {

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

    return (
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
  )
}

export default TaskInput