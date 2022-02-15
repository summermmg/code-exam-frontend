export default function Item({ item }) {
    const handleClick = (e) => {
        if (e.type === "click") {
          console.log('left clicked')
        } else if (e.type === "contextmenu") {
          console.log('right clicked')
        }
    };

    return (
        <li className="item" onClick={handleClick} onContextMenu={handleClick}>
            {item.item}
        </li>
    )
}