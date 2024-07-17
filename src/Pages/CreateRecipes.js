import { useState} from "react";
import "../StyleSheets/CreateRecipe.css";
import { Form, Button, Table, Image } from "react-bootstrap";
import addItems from "../Images/addItems.png";
import axios from "axios";
import {useCookies} from "react-cookie";

const CreateRecipes=()=>{
    const BASE_URL = 'https://recipe-app-backend-7ud4rzi25-madhushanis-projects.vercel.app';

    const [recipe, setRecipe]=useState({
        name:"", 
        ingredients:[],
        instructions:"", 
        imageUrl:"",
        cookingTime:"",
        userID:localStorage.getItem("User_ID")
    });

    const [cookies, setCookies]=useCookies(["access_token"]);
    const submitData=async (event)=>{
        event.preventDefault();
        if(!recipe.name || recipe.ingredients.length===0 || !recipe.instructions || !recipe.imageUrl || !recipe.cookingTime){
            window.alert("All fields are mandatory!");
            //if there are aby blank fields, stop submittign data
            return;
        }

        
        if (!cookies.access_token){
            window.alert("First you need to login.");
            document.getElementById("recipeName").value = "";
            document.getElementById("recipeInstructions").value = "";
            document.getElementById("imageURL").value = "";
            document.getElementById("cookingTime").value = "";
            setRecipe({
                name: "",
                ingredients: [],
                instructions: "",
                imageUrl: "",
                cookingTime: "",
            });
            return;
        }
        
        try{
            console.log(recipe);
            await axios.post(`${BASE_URL}/recipe`, recipe);
            window.alert("New recipe added.");

            //when submit data, all fields clear
            document.getElementById("recipeName").value = "";
            document.getElementById("recipeInstructions").value = "";
            document.getElementById("imageURL").value = "";
            document.getElementById("cookingTime").value = "";

            //set data to null
            //remove ingredients text fields
            setRecipe({
                name: "",
                ingredients: [],
                instructions: "",
                imageUrl: "",
                cookingTime: "",
            });
        }
        catch (err){
            console.log(err);
        }
    }

    const getUserData=(event)=>{
        const {name, value}=event.target;
        setRecipe(prevState=>({...prevState, [name]:value}));
    }

    //get one field ingredient
    const [newIngredient, setNewIngredient]=useState("");
    const getNewIngredient =(event)=>{
        const {value}=event.target;
        setNewIngredient(value);
    }

    //add the ingredient to the array
    const addIngredients=(event)=>{
        setRecipe((prevState) => ({
            ...prevState,
            ingredients: [...prevState.ingredients, newIngredient],
        }));
        setNewIngredient("");
        document.getElementById("recipeIngredient").value = "";
    }
    
    const mapIngredient=recipe.ingredients.map((ingredient, index)=>{
        return(
            <div key={index}>
                <Form.Control placeholder={ingredient} type="text" id="arrIngredients"/>
            </div>
        );
    })

    return(
        <div className="mainContainer">
            <div className="Container">
            <h4>Share Your Recipes</h4>
            <Form onSubmit={submitData}>
                <Table responsive="sm, md, lg, xl" className="custom-table" variant="danger" border={0}>
                    <tbody>                     
                        <tr>
                            <td className="formLabel">
                                <Form.Label>Name</Form.Label>
                            </td>
                            <td>
                                <Form.Control type="text" placeholder="Recipe Name" id="recipeName" name="name" onChange={getUserData}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Ingredients</Form.Label>
                            </td>
                            <td>
                                {mapIngredient}
                                <Form.Control type="text" placeholder="Recipe Ingredient" id="recipeIngredient" name="ingredient" onChange={getNewIngredient}/>
                                <div className="addItem" onClick={addIngredients}>
                                    <Image src={addItems} className="addItemImage" />
                                    <p>Add Another Ingredient</p>  
                                </div>
                                                             
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Instructions</Form.Label>
                            </td>
                            <td>
                                <Form.Control as="textarea" name="instructions" id="recipeInstructions" placeholder="Give Your Instructions Here" onChange={getUserData}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Image URL</Form.Label>
                            </td>
                            <td>
                                <Form.Control type="text" placeholder="Image URL" id="imageURL" name="imageUrl" onChange={getUserData}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Cooking Time (Minutes)</Form.Label>
                            </td>
                            <td>
                                <Form.Control type="number" placeholder="Cooking Time" id="cookingTime" name="cookingTime" onChange={getUserData}/>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Button variant="secondary" type="submit" className="submitBtn">Add to Recipies</Button>
            </Form>
            </div>
        </div>
    );
}

export default CreateRecipes;