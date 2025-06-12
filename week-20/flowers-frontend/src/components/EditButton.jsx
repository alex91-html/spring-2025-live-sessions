
export const EditButton = ({ id }) => {

  const handleEdit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`http://localhost:8080/flowers/${id}`)
      const flower = await response.json()

      const newName = prompt("Edit the flower name:", flower.name)
      if (!newName) return

      const updateResponse = await fetch(`http://localhost:8080/flowers/${id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: newName })
      })

      if (!updateResponse.ok) {
        throw new Error("Failed to update flower")
      }

      alert("Flower updated!");
    } catch (err) {
      console.error("Error editing flower:", err)
    }
  }

  return (
    <button onClick={handleEdit}>✏️</button>
  )
}