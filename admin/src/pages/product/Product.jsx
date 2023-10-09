import { Link,useLocation } from "react-router-dom";
import "./product.css";
//import Chart from "../../components/chart/Chart"
//import {productData} from "../../dummyData"
//import { Publish } from "@material-ui/icons";
import storage from "../../firebase";

import { useState } from "react";
//import { getStorage, ref, uploadBytesResumable,getDownloadURL  } from "firebase/storage";
import { ProductContext } from "../../context/productContext/ProductContext";
import { useContext } from "react";
import {  updateProduct } from "../../context/productContext/apiCalls";

export default function Product() {

const [inputs , setInputs] = useState(null)
const [mainImg , setMainImg] = useState(null)
const [uploaded , setUploaded] = useState(0)

const {dispatch}= useContext(ProductContext)

    const handleChange = (e)=>{
        const value = e.target.value;
    setInputs({ ...inputs, [e.target.name]:value})
    }

    const handleUpload = (e) =>{
        e.preventDefault()
        upload([
        {file: mainImg, label: "mainImg"},
        ])}


        const handleSumbit =(e)=>{
            e.preventDefault()
            updateProduct(product,dispatch)
        }


        const upload = (items) => {
                items.forEach((item) => {
                const fileName = new Date().getTime() + item.label + item.file;
                const uploadTask = storage.ref(`/item/${fileName}`).put(item.file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    },
                    (error) => {
                    console.log(error);
                    },
                    () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                        setInputs((prev) => {
                        return { ...prev, [item.label]: url };
                        });
                        setUploaded((prev) => prev + 1);
                    });
                    }
                );
                });
            };
    const location = useLocation()
    const product = location.product
    return (
        <div className="product">
        <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to="/newproduct">
            <button className="productAddButton">Create</button>
            </Link>
        </div>
        <div className="productTop">
            <div className="productTopRight">
                <div className="productInfoTop">
                    <img src={product.mainImg} alt="" className="productInfoImg" />
                    <span className="productName">{product.title}</span>
                </div>
                <div className="productInfoBottom">
                    <div className="productInfoItem"> 
                        <span className="productInfoKey">id:</span>
                        <span className="productInfoValue">{product._id}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">Size:</span>
                        <span className="productInfoValue">{product.size}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">Price:</span>
                        <span className="productInfoValue">{product.price}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">Categories</span>
                        <span className="productInfoValue">{product.categories}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">On Sale:</span>
                        <span className="productInfoValue">{product.onSale}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="productBottom">
            <form className="productForm">
                <div className="productFormLeft">
                    <label>Product Name</label>
                    <input type="text" name="title" placeholder={product.title } onChange={handleChange}/>
                    <label>Price</label>
                    <input type="number" name="price" placeholder={product.price} onChange={handleChange}/>
                    {/* <label>Image</label>
                    <input type="text" name="" placeholder={product.mainImg} onChange={handleChange}/>   */}
                    <label>OnSale</label>
                    <select name="onSale" id="onSale" onChange={handleChange} >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className="productFormRight">
                    <div className="productUpload">
                        <img src={product.mainImg} alt="" className="productUploadImg" />
                        <input type="file" id="file" name="mainImg" onChange={e=>setMainImg(e.target.files[0])}/>
                    </div>
                    {uploaded === 1 ? (
                        <button className="addProductButton"  onClick={handleSumbit}>Create</button>
                        ) : (
                        <button className="addProductButton" onClick={handleUpload}>Upload</button>
                        )}
                </div>
            </form>
        </div>
        </div>
    );
}
