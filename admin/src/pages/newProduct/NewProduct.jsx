import { useContext, useState } from "react";
import "./newProduct.css";
import storage from "../../firebase";
import { createProduct } from "../../context/productContext/apiCalls";
import {ProductContext} from "../../context/productContext/ProductContext"

export default function NewProduct() {

  const [product , setProduct] = useState(null)
  const [mainImg , setMainImg] = useState(null)
  const [img , setImg] = useState(null)
  const [relatedProduct , setRelatedProduct] = useState(null)
  const [discountPackage , setDiscountPackage] = useState(null)
  const [uploaded , setUploaded] = useState(0)

  const {dispatch}= useContext(ProductContext)

  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({ ...product, [e.target.name]:value})
  }

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
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
            setProduct((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) =>{
    e.preventDefault()
    upload([
      {file: mainImg, label: "mainImg"},
      {file: img, label: "img"},
      {file: relatedProduct, label: "relatedProduct"},
      {file: discountPackage, label: "discountPackage"},
    ])
  } 

  const handleSumbit =(e)=>{
    e.preventDefault()
    createProduct(product,dispatch)
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        
        <div className="addProductItem">
          <label>Product Main Image</label>
          <input 
            type="file" 
            id="mainImg" 
            name="mainImg" 
            onChange={(e) => setMainImg(e.target.files[0])}/>
        </div>
        
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="STURLEN" name="title" onChange={handleChange}/>
        </div>

        <div className="addProductItem">
          <label>Price</label>
          <input type="number" placeholder="20000" name="price" onChange={handleChange}/>
        </div>
        
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="Description" name="desc" onChange={handleChange}/>
        </div>
        
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="Bed" name="categories" onChange={handleChange}/>
        </div>
        
        <div className="addProductItem">
          <label>Size</label>
          <input type="text" placeholder="Size" name="size" onChange={handleChange}/>
        </div>
        
        <div className="addProductItem">
          <label>Material</label>
          <input type="text" placeholder="Ceramic" name="material" onChange={handleChange}/>
        </div>
        
        <div className="addProductItem">
          <label>Product Color</label>
          <input type="text" placeholder="White" name="productColor" onChange={handleChange}/>
        </div>
        
        <div className="addProductItem">
          <label>Product Images</label>
          <input 
            type="file" 
            id="img" 
            name="productImages"
            onChange={(e) => setImg(e.target.files[0])}
            />
        </div>
        
        <div className="addProductItem">
          <label>Product Price</label>
          <input type="number" placeholder="25000" name="productPrice" onChange={handleChange}/>
        </div>
        
        <div className="addProductItem">
          <label>Discount Price</label>
          <input type="number" placeholder="20000" name="discountPrice" onChange={handleChange}/>
        </div>
        
        <div className="addProductItem">
          <label>Rating</label>
          <input type="number" placeholder="2" min={0} max={5} name="rating" onChange={handleChange}/>
        </div>
        
        <div className="addProductItem">
          <label>Related Products</label>
          <input 
            type="file" 
            id="imgRelated" 
            name="imgRelated"
            onChange={(e) => setRelatedProduct(e.target.files[0])}
            />
        </div>
        
        <div className="addProductItem">
          <label>Discount Packages</label>
          <input 
            type="file" 
            id="imgDiscount" 
            name="imgDiscount"
            onChange={(e) => setDiscountPackage(e.target.files[0])}
            />
        </div> 
        
          <div className="addProductItem">
          <label>Package Price</label>
          <input type="number" placeholder="40000" name="packagePrice" onChange={handleChange}/>
        </div>

        <div className="addProductItem">
          <label>Short Description</label>
          <input type="text" placeholder="shortDesc" name="shortDesc" onChange={handleChange}/>
        </div>

        
        <div className="addProductItem">
          <label>On Sale</label>
          <select name="onSale" id="onSale" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        {uploaded === 4 ? (
          <button className="addProductButton" onClick={handleSumbit}>Create</button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>Upload</button>
        )}
      </form>
    </div>
  );
}
