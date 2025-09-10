

const TabButton = ({ id, activeId, onClick, children }) => (
  <button
    onClick={() => onClick(id)}
    aria-pressed={activeId === id}
    style={{ padding: 8, marginRight: 8, cursor: "pointer" }}
  >
    {children}
  </button>
)

export default TabButton