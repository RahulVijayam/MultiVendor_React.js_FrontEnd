import React from 'react'

function SideBar({showFirmHandler,showProductHandler,showAllProducts,showAddFirmLink}) {
  return (
      <div className='sideBarSection'>
        <ul className="list-group" >
          {
            showAddFirmLink ? <><li className="list-group-item list-group-item-action" onClick={showFirmHandler}>Add Firm</li></> 
            : ""
          }
            
            <li  className="list-group-item  list-group-item-action" onClick={showProductHandler}>Add Product</li>
            <li  className="list-group-item list-group-item-action" onClick={showAllProducts}>All Products</li>
            
        </ul>
      </div>
  )
}

export default SideBar