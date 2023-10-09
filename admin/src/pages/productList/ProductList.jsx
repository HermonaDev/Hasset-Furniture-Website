import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
//import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
//import { useState } from "react";
import { useContext } from "react";
import { ProductContext } from "../../context/productContext/ProductContext";
import { deleteProduct, getProducts } from "../../context/productContext/apiCalls";
import { useEffect } from "react";

export default function ProductList() {
  const {products,dispatch} = useContext(ProductContext)

  useEffect(()=>{
    getProducts(dispatch)
  },[dispatch])

  const handleDelete = (id) => {
    deleteProduct(id,dispatch)
  };

  

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "size", headerName: "Size", width: 120 },
    {
      field: "onSale",
      headerName: "onsale",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "categories",
      headerName: "Categories",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname:"/product/" + params.row._id, product:params.row}}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
    <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={r=>r._id}
  />
    </div>
  );
}
