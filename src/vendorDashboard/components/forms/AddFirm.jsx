import React, { useState } from 'react'
import { API_URL } from '../../../data/apiPath';
export const AddFirm = () => {
    const [firmName, setFirmName] = useState("");
    const [area, setArea] = useState("");
    const [category, setCategory] = useState([]);
    const [region, setRegion] = useState([]);
    const [offer, setOffer] = useState("");
    const [file, setFile] = useState(null);

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

    const handleRegionChange = (event) => {

        const value = event.target.value;

        if (region.includes(value)) {

            setRegion(region.filter((item) => item !== value))

        }
        else {
            setRegion([...region, value])

        }

    }

    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];
        setFile(selectedImage);

    }


    const handleAddFirmForm = async (e) => {
        e.preventDefault()
        try {
            const loginToken = localStorage.getItem('loginToken')
            if (!loginToken) {
                console.error("User not Authenticated");
            }
            const formData = new FormData();
            formData.append('firmName', firmName);
            formData.append('area', area);
            formData.append('offer', offer);
            category.forEach((val) => {
                formData.append('category', val);
            });

            region.forEach((val) => {
                formData.append('region', val);
            })
            formData.append('image',file);

            const response = await fetch(`${API_URL}/firm/add-firm`, {
                method: 'POST',
                headers: {
                    'token': `${loginToken}`
                },
                body: formData
            });
            const data = await response.json()
            if (response.ok) {
                console.log(data)
                window.alert(data.success)
               // localStorage.setItem('firmId',data.firmId) // Doing this in Login Component
                setFirmName("");
                setArea("");
                setCategory([])
                setRegion([])
                setFile(null)
                setOffer("")
                
            }else if(data.message==="Vendor can have only one firm"){
                window.alert("Firm Already Exist! Only 1 firm you can able to add")
            }
            else{
               console.log(data.error)
               window.alert(data.error)
            }

        } catch (error) {
            console.error("failed to add Firm")
            console.log(data.error)
            

        }

    }
    return (
        <div className='firmSection'>
            <form className="tableForm" onSubmit={handleAddFirmForm}>
                <h4 align="center">Add New Firm / Restaurent </h4>

                <div className="form-group">

                    <input type="text" required className="form-control" name="firmName" value={firmName} onChange={(e) => setFirmName(e.target.value)} placeholder="Enter Restaurent Name" />

                </div>
                <div className="form-group">
                    <input type="text" required className="form-control" name="area" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Area/Location" />
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
                    <label >Region : </label>
                    <div className="form-check-inline">
                        <input className="form-check-input" type="checkbox" checked={region.includes('south-indian')} onChange={handleRegionChange} value="south-indian" />
                        <label className="form-check-label" >South Indian</label>
                    </div>
                    <div className="form-check-inline">
                        <input className="form-check-input" type="checkbox" checked={region.includes('north-indian')} onChange={handleRegionChange} value="north-indian" />
                        <label className="form-check-label">North Indian</label>
                    </div>
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" name="offer" value={offer} onChange={(e) => setOffer(e.target.value)} placeholder="Enter your Offer" />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="file" className="form-control" onChange={handleImageUpload} />
                </div>
                <div className='form-group' align="center">
                    <button type="submit" className="btn btn-success">Add Firm</button>
                </div>
            </form>
        </div>
    )
}
