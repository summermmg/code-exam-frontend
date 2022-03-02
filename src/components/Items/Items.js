import Item from "../Item/Item";
import "./Items.css";

export default function Items({ category, items, onLeftClick, onRightClick }) {
    // here we pass an unique id as key
    return (
        <ul className="ul-list">
            <h2>{category}</h2>
            {items.map((item) => (
                <Item
                key={item.id}
                item={item}
                onLeftClick={onLeftClick}
                onRightClick={onRightClick}
                />
            ))}
        </ul>
    )
}