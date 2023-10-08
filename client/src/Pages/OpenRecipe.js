import { useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import "../StyleSheets/OpenRecipe.css";
const OpenRecipe =()=>{
    const location=useLocation();
    const {imageUrl, name, cookingTime, ingredients, instructions}=location.state;
    console.log(name);
    
    const mapIngredients=ingredients.map((ingredients, index)=>{
        return(
            <Card.Text key={index}  className="cardText"> {ingredients}</Card.Text>
        );
    });

    return(
        <div className="openRecipeMainContainer">
           <div className="openRecipeContainer">
                <Card className='openRecipeMainCard' >
                    <Card.Img variant="top" src={imageUrl} />
                    <Card.Body>
                        <Card.Title><b>{name}</b></Card.Title>
                    </Card.Body>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted"><b>Prep Time: </b> {cookingTime} Minutes</Card.Subtitle>
                    </Card.Body>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted"><b>Ingredients: </b></Card.Subtitle>
			            {mapIngredients}
                    </Card.Body>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted"><b>Instructions:</b></Card.Subtitle>
                        <Card.Text className="cardText">{instructions}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default OpenRecipe;