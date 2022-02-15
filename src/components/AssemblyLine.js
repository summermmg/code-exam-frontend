export default function AssemblyLine({ stages }) {
    let content
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