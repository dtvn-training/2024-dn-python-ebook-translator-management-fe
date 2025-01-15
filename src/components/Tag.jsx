function Tag({ title, color }) {
    return <h2 className={`px-4 rounded-md ${color}`}>{title}</h2>;
}

export default Tag;
