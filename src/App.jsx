import './App.css'
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Products from './products.json';

function App() {

  return (
    <>
      <NavBar></NavBar>
      <ItemListContainer products={Products}></ItemListContainer>
    </>
  )
}

export default App
