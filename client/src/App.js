import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./Pages/Home";
import {Authentication} from "./Pages/Authentication";
import CreateRecipes from "./Pages/CreateRecipes";
import SaveRecipes from "./Pages/SaveRecipes";
import NavbarHeader from "./Components/Navbar";
import NoPage from "./Pages/NoPage";
import OpenRecipe from "./Pages/OpenRecipe"

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavbarHeader/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/auth" element={<Authentication/>}/>
          <Route path="/add-recipe" element={<CreateRecipes/>}/>
          <Route path="/saved-recipes" element={<SaveRecipes/>}/>
          <Route path="/view-recipe/:id" element={<OpenRecipe/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
