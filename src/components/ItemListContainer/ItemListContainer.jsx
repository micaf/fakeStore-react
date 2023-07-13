import ItemListCard from "../ItemListCard/ItemListCard";
import './ItemListContainer.css';

function ItemListContainer({ products }) {
  return (
    <>
      <div className="products-grid">
        {products.map(product => {
          return (
           <ItemListCard  key={product.id} product={product} />
          );
        })}
      </div>
    </>
  )
}

export default ItemListContainer