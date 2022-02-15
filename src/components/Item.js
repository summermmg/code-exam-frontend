export default function Item({ item, onLeftClick, onRightClick }) {
    const handleClick = (e) => {
        if (e.type === "click") {
            onLeftClick(item.id, item.category, item.item);
        } else if (e.type === "contextmenu") {
            onRightClick(item.id, item.category, item.item);
        }
    };

    return (
        <li className="item" onClick={handleClick} onContextMenu={handleClick}>
            {item.item}
        </li>
    )
}