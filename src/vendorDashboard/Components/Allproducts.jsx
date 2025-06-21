// // import React from "react";
// // import { useState, useEffect } from "react";
// // import { API_URL } from "../data/apiPath";

// // const Allproducts = () => {
// //   const [products, setProducts] = useState([]);
// //   useEffect(() => {
// //     productsHandle();
// //     console.log("this is useEffect");
// //   }, []);

// //   const productsHandle = async () => {
// //     const firmId = localStorage.getItem("firmId");
// //     try {
// //       const response = await fetch(`${API_URL}/product/${firmId}/products`);
// //       const newProductsData = await response.json();
// //       setProducts(newProductsData.products);
// //       console.log(newProductsData);
// //     } catch (err) {
// //       console.log("There is a error in products", err);
// //       alert("failed to fetch");
// //     }
// //   };
// //   return (
// //     <div>
// //       {products.length === 0 ? (
// //         <p>No products added</p>
// //       ) : (
// //         <table className="product-table">
// //           <thead>
// //             <tr>
// //               <th>Product Name</th>
// //               <th>Price</th>
// //               <th>Image</th>
// //               <th>Delete</th>
// //             </tr>
// //             <tbody>
// //               {products.map((item) => {
// //                 return (
// //                   <>
// //                     <tr key={item._id}>
// //                       <td>{item.productName}</td>
// //                       <td>{item.price}</td>
// //                       <td>
// //                         {item.image && (
// //                           <img
// //                             src={`${API_URL}/uploads/${item.image}`}
// //                             alt={item.productName}
// //                           />
// //                         )}
// //                       </td>
// //                       <td>
// //                         <button>Delete</button>
// //                       </td>
// //                     </tr>
// //                   </>
// //                 );
// //               })}
// //             </tbody>
// //           </thead>
// //         </table>
// //       )}
// //     </div>
// //   );
// // };

// // export default Allproducts;
// import React, { useState, useEffect } from 'react';
// import { API_URL } from '../data/apiPath';

// const Allproducts = () => {
//   const [products, setProducts] = useState([]);

//   const productsHandle = async () => {
//     const firmId = localStorage.getItem('firmId');
//     try {
//       const response = await fetch(`${API_URL}/product/${firmId}/products`);
//       const newProductsData = await response.json();
//       setProducts(newProductsData.products);
//       console.log(newProductsData);
//     } catch (err) {
//       console.log("There is an error in products", err);
//       alert("Failed to fetch");
//     }
//   };

//   // ✅ useEffect should be at top-level
//   useEffect(() => {
//     productsHandle();
//     console.log("This is useEffect");
//   }, []);

//   return (
//     <div>
//       {products.length === 0 ? (
//         <p>No products added</p>
//       ) : (
//         <table className="product-table">
//           <thead>
//             <tr>
//               <th>Product Name</th>
//               <th>Price</th>
//               <th>Image</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((item) => (
//               <tr key={item._id}>
//                 <td>{item.productName}</td>
//                 <td>{item.price}</td>
//                 <td>
//                   {item.image && (
//                     <img
//                       src={`${API_URL}/uploads/${item.image}`}
//                       alt={item.productName}
//                       style={{ width: '50px' }}
//                     />
//                   )}
//                 </td>
//                 <td>
//                   <button>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Allproducts;


import React,{useState, useEffect} from 'react'
import { API_URL } from '../data/apiPath';

const AllProducts = () => {
    const [products, setProducts]= useState([]);

    const productsHandler = async()=>{
            const firmId = localStorage.getItem('firmId');
        try {
                const response = await fetch(`${API_URL}/product/${firmId}/products`);
                const newProductsData = await response.json();
                setProducts(newProductsData.products);
                console.log(newProductsData);
        } catch (error) {
            console.error("failed to fetch products", error);
            alert('failed to fetch products')
        }
    }

    useEffect(()=>{
        productsHandler()
        console.log('this is useEffect')
    },[])

    // const deleteProductById = async(productId)=>{
    //             try {
    //                     const response = await fetch(`${API_URL}/product/${productId}`,{
    //                         method: 'DELETE'
    //                     })
    //                 if(response.ok){
    //                     setProducts(products.filter(product =>product._id !== productId));
    //                     confirm("are you sure, you want to delete?")
    //                     alert("Product deleted Successfully")
    //                 }
    //             } catch (error) {
    //                 console.error('Failed to delete product');
    //                 alert('Failed to delete product')
    //             }
    // }

    const deleteProductById = async(productId)=>{
        try{
            const response = await fetch(`${API_URL}/product/${productId}`,{
                method:'DELETE',
            })
            if(response.ok){
                setProducts(products.filter(product =>product._id !== productId));
                confirm("Are you sure to delete product...")
                alert("Product was deletd...")
            }
        }catch(err){
            console.log(err)
            alert("failed to deleted product")
        }
    }
  return (
    <div className='productSection'>
        {!products ? (
            <p>No products added</p>
        ) : (
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item)=>{
                            return (
                                <>
                                    <tr key={item._id}>
                                        <td>{item.productName}</td>
                                        <td>₹{item.price}</td>
                                    <td>
                                        {item.image && (
                                            <img src={`${API_URL}/uploads/${item.image}`} 
                                            alt={item.productName}
                                            style={{ width: '50px', height:'50px'  }}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={()=>deleteProductById(item._id)}
                                        className='deleteBtn'
                                        >Delete</button>
                                    </td>
                                    </tr>
                                </>
                            )
                    })}
                </tbody>
            </table>
         )}
    </div>
  )
}

export default AllProducts