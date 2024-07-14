import Reac, { useState, useEffect } from 'react'
import { API_URL } from '../../data/apiPath';

export const AllProducts = ({showAllProductsHandler}) => {
  const [products, setProducts] = useState([]);
  const productsHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const response = await fetch(`${API_URL}/product/firm/${firmId}`);
      const newProductsData = await response.json()
      setProducts(newProductsData.products);
     console.log(newProductsData);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    productsHandler()
   // console.log("Iam form useEffect ")
  }, [])

  const   deleteProductById = async(productId)=>{
    
    try {
      const response = await fetch(`${API_URL}/product/delete/${productId}`,{
        method:"DELETE",
      });
      if(response.ok){
        setProducts(products.filter(product =>product._id !==productId));
        alert("Product Deleted Succesfully")
      }
    } catch (error) {
      console.log(error)
    }
    

  }
  return (
    <div className='ml-5 my-5'>
      <h3>Products</h3>
      {!products? (
        <p>No Products Added!</p>
      ) : (
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((item)=>{
               return (<>
                  <tr key={item._id}>
                    <td>{item.productName}</td>
                    <td>{item.price}</td>
                    <td>
                    {
                        item.image && (
                        <img src={`${API_URL}/uploads/${item.image}`}
                        alt={item.productName}/>
                      )}
                    </td>
                    <td><button className='btn btn-danger btn-sm' onClick={()=>deleteProductById(item._id)}>Delete</button></td>
                  </tr>
                </>)            
              })
            }
             
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AllProducts;