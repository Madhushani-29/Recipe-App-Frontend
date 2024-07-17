import { useEffect, useState } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import { Image } from "react-bootstrap";
import More from "../Images/More.png";
import Remove from "../Images/Remove.png";
import { useNavigate } from "react-router-dom";
import "../StyleSheets/SaveRecipe.css";

const SaveRecipes = () => {
    const [savedRecipies, setsavedRecipies] = useState([]);
    const BASE_URL = 'https://recipe-app-backend-7ud4rzi25-madhushanis-projects.vercel.app';

    useEffect(() => {
        const id = localStorage.getItem("User_ID");
        axios.get(`${BASE_URL}/recipe/recipes-saved/${id}`)
            .then(response => {
                const recipeList = response.data.savedRecipes;
                setsavedRecipies(recipeList);
                console.log(savedRecipies);
            })
            .catch(error => {
                console.log(error);
            });
    }, [savedRecipies]); // Empty dependency array means this effect runs only once on mount

    const navigate = useNavigate();
    const navigateToRecipeView = (recipe) => {
        navigate(`/view-recipe/${recipe._id}`, { state: { imageUrl:recipe.imageUrl, name: recipe.name, cookingTime: recipe.cookingTime, ingredients:recipe.ingredients, instructions:recipe.instructions } });
    }

    const removeFromFavourites=(recipe)=>{
        const userID=localStorage.getItem("User_ID");
        const recipeID=recipe._id;
        console.log(userID);
        console.log(recipeID);
        axios.put(`${BASE_URL}/recipe/recipes-saved`, {userID, recipeID})
        .then(response=>{
            window.alert("Remove from favourites.");
        })
        .catch(error=>{
            console.log(error);
        })
    }

    const mapRecipie=savedRecipies.map((recipe)=>{
        //map ingredients array
        const mapIngredients=recipe.ingredients.map((ingredients, index)=>{
            return(
                <Card.Text key={index}  className="cardText"> {ingredients}</Card.Text>
            );
        });
        return(
            //in callback function how use the useNavigate hook and send data object
            <div className="saveRecipeContainer" key={recipe._id}  >
                <div className="viewMoreDiv" onClick={()=>{navigateToRecipeView(recipe)}}>
                    <Image src={More} alt="" className="viewMoreImage"/>
                </div>
                <div className="removeFavouriteDiv" onClick={()=>{removeFromFavourites(recipe)}}>
                    <Image src={Remove} alt="" className="removeFavouriteImage"/>
                </div>
                <Card className='saveRecipeMainCard' >
                    <Card.Img variant="top" src={recipe.imageUrl} />
                    <Card.Body>
                        <Card.Title><b>{recipe.name}</b></Card.Title>
                    </Card.Body>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted"><b>Prep Time: </b> {recipe.cookingTime} Minutes</Card.Subtitle>
                    </Card.Body>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted"><b>Ingredients: </b></Card.Subtitle>
			            {mapIngredients}
                    </Card.Body>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted"><b>Instructions:</b></Card.Subtitle>
                        <Card.Text className="cardText">{recipe.instructions}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
            
        );
    });


    return (
        <div className="saveRecipeMainContainer ">{mapRecipie}</div>
    );
}

export default SaveRecipes;
