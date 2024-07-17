import {useState, useEffect} from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import { Image } from "react-bootstrap";
import "../StyleSheets/Home.css";
import { useNavigate } from "react-router-dom";
import More from "../Images/More.png";
import Favourite from "../Images/Favourite.png";
import {useCookies}  from "react-cookie";

const Home=()=>{
    const BASE_URL = 'https://recipe-app-backend-7ud4rzi25-madhushanis-projects.vercel.app';

    const [data, setData]=useState([]);
    useEffect(() => {
        axios.get(`${BASE_URL}/recipe`)
        .then(response => {
            const recipies=response.data;
            setData(recipies);
            console.log(recipies);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    
    //destructure the data ane send to next component
    const navigate = useNavigate();
    const navigateToRecipeView = (recipe) => {
        navigate(`/view-recipe/${recipe._id}`, { state: { imageUrl:recipe.imageUrl, name: recipe.name, cookingTime: recipe.cookingTime, ingredients:recipe.ingredients, instructions:recipe.instructions } });
    }

    //add to favourite list
    const [cookie, setCookies]=useCookies(["access_token"]);
    const [currentSaved, setCurrentSaved]=useState([]);

    //use to avoid duplicate favourites
    useEffect(()=>{
        const userID=localStorage.getItem("User_ID");
        axios.get(`${BASE_URL}/recipe/recipe-ids-saved/${userID}`)
        .then(response=>{
            setCurrentSaved(response.data.savedRecipeIDs);
        })
        .catch(error=>{
            console.log(error);
        })
    }, []);

    const addToFavourites=(recipe)=>{
        if(!cookie.access_token){
            window.alert("First you need to login.");
            return;
        }
          
        const userID=localStorage.getItem("User_ID");
        const recipeID=recipe._id;

        

        if (currentSaved.includes(recipeID)){
            window.alert("Already added to the favourites.");
            return;
        }
        else{
            axios.put(`${BASE_URL}/recipe`, {userID, recipeID})
            .then(response=>{
                window.alert("Added to favourites.");
                //add the new item to the array
                setCurrentSaved([...currentSaved, recipeID]);
            })
            .catch(error=>{
                console.log(error);
            })
        }
        
        
    }

    const mapRecipie=data.map((recipe)=>{
        //map ingredients array
        const mapIngredients=recipe.ingredients.map((ingredients, index)=>{
            return(
                <Card.Text key={index}  className="cardText"> {ingredients}</Card.Text>
            );
            });
        return(
            //in callback function how use the useNavigate hook and send data object
            <div className="homeContainer" key={recipe._id}  >
                <div className="viewMoreDiv" onClick={()=>{navigateToRecipeView(recipe)}}>
                    <Image src={More} alt="" className="viewMoreImage"/>
                </div>
                <div className="addFavouriteDiv" onClick={()=>{addToFavourites(recipe)}}>
                    <Image src={Favourite} alt="" className="addFavouriteImage"/>
                </div>
                <Card className='mainCard' >
                    <Card.Img variant="top" src={recipe.imageUrl} className="foodImage" />
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
    return(
        <div className="homeMainContainer">
           {mapRecipie} 
        </div>
    );
}

export default Home;