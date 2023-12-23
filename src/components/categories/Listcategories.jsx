import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Listcategories = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories()
     
      }
    , [])
    
    const getCategories =async()=>{
       await axios.get("http://localhost:3001/api/categories/")
       .then(res=>{
        setCategories(res.data)
        console.log(res.data)
       }).catch(error=>{console.log(error)})

    }
    const handleDelete=async(id)=>{
        if(window.confirm("etes vous sure de vouloir supprimer")){
        await axios.delete(`http://localhost:3001/api/categories/${id}`)
        .then(res=>{
            getCategories()
        })
        .catch(error=>{console.log(error)})}

    }
  return (
    <div>
        <div >
<nav className="navbar navbar-expand-lg navbar-dark bg-success">
<div className="container-fluid">

<Link className="btn btn-outline-light" to="/categories/add">
Ajouter une catégorie
</Link>
</div>
</nav>
</div>

<table className="table border shadow">
<thead>
<tr>
<th scope="col">Nom de la catégorie</th>
<th scope="col">Image</th>

</tr>
</thead>
<tbody>
{categories.map((cat,index)=>
     <tr key={index}>
              <td>{cat.nomcategorie}</td>
              <td><img src={cat.imagecategorie} width={80} height={80}/></td> 
              <td> <Button variant="warning"><i class="fa-solid fa-pen-to-square"></i><span> </span>Update</Button></td>
              <td> <Button variant="danger" onClick={()=>handleDelete(cat._id)}><i class="fa-solid fa-trash"></i><span> </span>Delete</Button></td> 

        
        
       
     </tr>
      )}
</tbody>
</table>
    </div>
  )
}

export default Listcategories