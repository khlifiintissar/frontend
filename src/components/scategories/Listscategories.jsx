import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Listscategories = () => {
    const [scategories, setScategories] = useState([])
    useEffect(() => {
        getScategories()
     
      }
    , [])
    const [categorie, setCategorie] = useState("")

   // const getCategorieById=async(id)=>{
     //  await axios.get(`http://localhost:3001/api/categories/${id}`).then(res=>{setCategorie(res.data.nomcategorie)}).catch(error=>{console.log(error)})
    //}
   // const getScategories =async()=>{
    //   await axios.get("http://localhost:3001/api/scategories/")
      // .then(res=>{
       // setScategories(res.data)
        //console.log(res.data)
      // }).catch(error=>{console.log(error)})

    //}
    const getScategories = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/scategories/');
          setScategories(response.data);
    
          // Fetch category for each subcategory
          response.data.forEach((cat) => {
            getCategorieById(cat.categorieID);
          });
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      };
      const getCategorieById = async (id) => {
        try {
          const response = await axios.get(`http://localhost:3001/api/categories/${id}`);
          setCategorie((prevCategories) => ({ ...prevCategories, [id]: response.data.nomcategorie }));
        } catch (error) {
          console.error(`Error fetching category with id ${id}:`, error);
        }
      };
    
      useEffect(() => {
        console.log('Updated categories:', categorie);
      }, [categorie]); // Log whenever categories state is updated
    
    const handleDelete=async(id)=>{
        if(window.confirm("etes vous sure de vouloir supprimer")){
        await axios.delete(`http://localhost:3001/api/scategories/${id}`)
        .then(res=>{
            getScategories()
        })
        .catch(error=>{console.log(error)})}

    }
  return (
    <div>
        <div >
<nav className="navbar navbar-expand-lg navbar-dark bg-success">
<div className="container-fluid">

<Link className="btn btn-outline-light" to="/scategories/add">
Ajouter une sous catégorie
</Link>
</div>
</nav>
</div>

<table className="table border shadow">
<thead>
<tr>
<th scope="col">Nom de sous categorie</th>
<th scope="col">Nom de la catégorie</th>
<th scope="col">Image</th>

<th scope="col">Modifier</th>
<th scope='col'>Supprimer</th>
</tr>
</thead>
<tbody>
{scategories.map((cat,index)=>
     <tr key={index}>
              <td>{cat.nomscategorie}</td>
              <td>{categorie[cat.categorieID]}</td>
              <td><img src={cat.imagescategorie} width={80} height={80}/></td>
              
              
              <td> <Button variant="warning"><i class="fa-solid fa-pen-to-square"></i><span> </span>Update</Button></td>
              <td> <Button variant="danger" onClick={()=>handleDelete(cat._id)}><i class="fa-solid fa-trash"></i><span> </span>Delete</Button></td> 

        
        
       
     </tr>
      )}
</tbody>
</table>
    </div>
  )
}

export default Listscategories