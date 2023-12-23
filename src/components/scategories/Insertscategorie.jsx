import axios from "axios";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Insertscategorie = () => {
    let navigate = useNavigate();
    const [nomscategorie,setNomscategorie]=useState("")
    
    const [imagescategorie,setImagescategorie]=useState("")
    const [categorieID,setCategorieID]=useState("")
    const [categorie,setCategorie]=useState([])

    useEffect(() => {
     getcategories()
    }, [])
    const getcategories=async()=>{

     await axios.get("http://localhost:3001/api/categories").then(res=>{
        setCategorie(res.data)
        console.log(res.data)
       }).catch(error=>{console.log(error)})}    
    
    const handleSubmit = async (e) => {
            e.preventDefault();
            const scategorie={
               nomscategorie:nomscategorie,
                imagescategorie:imagescategorie,
                categorieID:categorieID,

            }
            await axios.post("http://localhost:3001/api/scategories", scategorie);
            navigate("/scategories");
            };



  return (
    <div className="container">
<div className="row">
<div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

<h4 align="center">Ajout sous catégorie</h4>
<div className='form mt-3'>
<Form className="border p-3"  >
<Row className="mb-2">
<Form.Group as={Col} md="6" >
<Form.Label >Nom de la sous catégorie</Form.Label>
<Form.Control
required
type="text"
placeholder="nom sous catégorie"
value={nomscategorie}
onChange={(e)=>setNomscategorie(e.target.value)}
/>
</Form.Group>

</Row>

<Row className="mb-3">

<Form.Group as={Col} md="6">
<Form.Label>Image</Form.Label>
<Form.Control
type="text"
placeholder="Image"
value={imagescategorie}
onChange={(e)=>setImagescategorie(e.target.value)}
/>
</Form.Group>
<Form.Group as={Col} md="12">
<Form.Label>Catégorie</Form.Label>
<Form.Control
as="select"
type="select"
value={categorieID}
onChange={(e)=>setCategorieID(e.target.value)}
>
<option>choisir une catégorie</option>
{categorie.map((cat,index)=>
<option value={cat._id}>{cat.nomcategorie}</option>
)}
</Form.Control>
</Form.Group>
</Row>
<Button variant="primary" onClick={(e)=>handleSubmit(e)} >Enregistrer <span> </span>
<i class="fa-solid fa-floppy-disk"></i>
</Button>
<Link className="btn btn-outline-danger mx-2" to="/scategories">
Cancel
</Link>
</Form>
</div>
</div>
</div>
</div>
  )
}

export default Insertscategorie