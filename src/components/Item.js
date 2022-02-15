export default function Item({ item, onLeftClick, onRightClick }) {
    const handleClick = (e) => {
        if (e.type === "click") {
            onLeftClick(item.item);
        } else if (e.type === "contextmenu") {
            onRightClick(item.item);
        }
    };

    return (
        <li className="item" onClick={handleClick} onContextMenu={handleClick}>
            {item.item}
        </li>
    )
}