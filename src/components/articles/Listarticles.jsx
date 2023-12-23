import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Listarticles = () => {
    const [articles, setArticles] = useState([])
    useEffect(() => {
        getarticles()
     
      }
    , [])
    
    const getarticles =async()=>{
       await axios.get("http://localhost:3001/api/articles/")
       .then(res=>{
        setArticles(res.data)
        console.log(res.data)
       }).catch(error=>{console.log(error)})

    }
    const handleDelete=async(id)=>{
        if(window.confirm("etes vous sure de vouloir supprimer")){
        await axios.delete(`http://localhost:3001/api/articles/${id}`)
        .then(res=>{
            getarticles()
        })
        .catch(error=>{console.log(error)})}

    }
  return (
    <div>
        <div >
<nav className="navbar navbar-expand-lg navbar-dark bg-success">
<div className="container-fluid">

<Link className="btn btn-outline-light" to="/articles/add">
Ajouter article
</Link>
</div>
</nav>
</div>

<table className="table border shadow">
<thead>
<tr>
<th scope="col">Image</th>
<th scope="col">Référence</th>
<th scope="col">Désignation</th>
<th scope="col">Quantité Stock</th>
<th scope="col">Prix</th>
<th scope="col">Modifier</th>
<th>Supprimer</th>
</tr>
</thead>
<tbody>
{articles.map((art,index)=>
     <tr key={index}>
              <td><img src={art.imageart} width={80} height={80}/></td>
              <td>{art.reference}</td>
              <td>{art.designation}</td>
              <td>{art.qtestock}</td>
              <td>{art.prix}</td>
              
              <td> <Button variant="warning"><i class="fa-solid fa-pen-to-square"></i><span> </span>Update</Button></td>
              <td> <Button variant="danger" onClick={()=>handleDelete(art._id)}><i class="fa-solid fa-trash"></i><span> </span>Delete</Button></td> 

        
        
       
     </tr>
      )}
</tbody>
</table>
    </div>
  )
}

export default Listarticles