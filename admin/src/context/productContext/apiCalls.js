import { createProductFailure, 
        createProductStart, 
        createProductSuccess, 
        deleteProductFailure, 
        deleteProductStart, 
        deleteProductSuccess, 
        getProductsFailure, 
        getProductsStart, 
        getProductsSuccess, 
        updateProductFailure, 
        updateProductStart, 
        updateProductSuccess } from "./ProductActions"
import axios from "axios"

//GET
export const getProducts =async (dispatch) => {
    dispatch(getProductsStart())
    try {
        const res =await axios.get("/products",{
            headers: { token: "Bearer" + JSON.parse(localStorage.getItem("user")).accessToken
        }
    })
    dispatch(getProductsSuccess(res.data))

    } catch (err) {
        dispatch(getProductsFailure())
    }
}

//DELETE

export const deleteProduct = async (id,dispatch) => {
    dispatch(deleteProductStart())
    try {
        await axios.delete("/products/"+ id,{
            headers: {
                token: 
                    "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        }
    })
    dispatch(deleteProductSuccess(id))

    } catch (err) {
        dispatch(deleteProductFailure())
    }
}

//CREATE

export const createProduct = async (product,dispatch) => {
    dispatch(createProductStart())
    try {
        const res = await axios.post("/products", product,{
            headers: {
                token: 
                    "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        }
    })
    dispatch(createProductSuccess(res.data))

    } catch (err) {
        dispatch(createProductFailure())
    }
}

//UPDATE
export const updateProduct = async (product,dispatch) => {
    dispatch(updateProductStart())
    try {
        dispatch(updateProductSuccess(product))
        
    } catch (err) {
        dispatch(updateProductFailure())
    }
}

