import React, { useState } from 'react'
import { API_URL } from '../../../data/apiPath';
export const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState([]);
    const [file, setFile] = useState(null);
    const [bestSeller, setBestSeller] = useState(false);
    const [description, setDescription] = useState("");

    const handleCategoryChange = (event) => {

        const value = event.target.value;
        //window.alert(value) ; Here Value is Veg / Non-Veg
        if (category.includes(value))// category.includes(value) will return true / false means whether veg / non-veg is present already in the array or not 
        {

            setCategory(category.filter((item) => item !== value)) // Here We are Filtering the Array as per input and Setting it 

        }
        else {
            setCategory([...category, value])

        }

    }


    const handleBestSeller=(event)=>{
        const value=event.target.value ==='true'
        setBestSeller(value)
    }

    
    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];
        setFile(selectedImage);

    }

    const handleAddProduct = async (e) => {
        e.preventDefault();

        try { 
            const firmId = localStorage.getItem('firmId')
            const loginToken = localStorage.getItem('loginToken')

            if (!loginToken || !firmId) {
                console.error("User not Authenticated");
            }
            const formData = new FormData();
            formData.append('productName',productName);
            formData.append('price',price);
            category.forEach((val) => {
                formData.append('category', val);
            });
            formData.append('image',file);
            formData.append('description',description);

            const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json()
            if (response.ok) {
                console.log(data)
                window.alert(data.success)
               // setProductName("");
               // setPrice("");
                //setCategory([])
                //setBestSeller([])
                //setFile(null)
                //setDescription("")
                
            }
            else{
               console.log(data.error)
               window.alert(data.error)
            }




        } catch (error) {
            console.log(error)
        }



    }


    return (
        <div className='ProductSection'>
            <form className="tableForm" onSubmit={handleAddProduct}>
                <h4 align="center"> Add New Product </h4>

                <div className="form-group">

                    <input type="text" className="form-control" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" />

                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product Description" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price(INR)" />
                </div>
                


                <div className="form-group">
                <label>BestSeller </label>
                    <div className="form-check form-check-inline">
                    
                        <input className="form-check-input" type="radio"   value="true" checked={bestSeller===true}  onChange={handleBestSeller} />
                        <label className="form-check-label" >Yes</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio"   value="false" checked={bestSeller===false} onChange={handleBestSeller} />
                        <label className="form-check-label" >No</label>
                    </div>


                </div>

                <div className="form-group">
                    <label >Category : </label>
                    <div className="form-check-inline">
                        <input className="form-check-input" type="checkbox" checked={category.includes('veg')} onChange={handleCategoryChange} value="veg" />
                        <label className="form-check-label" >Veg</label>
                    </div>
                    <div className="form-check-inline">
                        <input className="form-check-input" type="checkbox" checked={category.includes('non-veg')} onChange={handleCategoryChange} value="non-veg" />
                        <label className="form-check-label">Non-Veg</label>
                    </div>
                </div>



                <div className="form-group">
                    <label>Product Image</label>
                    <input type="file" className="form-control" placeholder="Upload Image"  onChange={handleImageUpload}/>
                </div>
                <div className='form-group'>
                    <button type="submit" className="btn btn-outline-warning">Add Product</button>
                </div>
            </form>
        </div>
    )
}
