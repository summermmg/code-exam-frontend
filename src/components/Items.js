import Item from "./Item";

export default function Items({ category, items }) {
    // here we pass an unique id as key
    return (
        <ul className="ul-list">
            <h2>{category}</h2>
            {items.map((item) => (
                <Item
                key={item.id}
                item={item}
                />
            ))}
        </ul>
    )
}