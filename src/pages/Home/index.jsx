import "./styles.css"

export function Home() {
  return (
    <div className="container">
      <h1>Lista de Presença</h1>
      <input type="text" placeholder="digite um nome..." />
      <button>Adicionar</button>
    </div>
  )
}