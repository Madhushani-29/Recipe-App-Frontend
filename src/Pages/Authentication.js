import { useState, useEffect } from "react";
import {Tab, Tabs, Form, Button} from "react-bootstrap";
import "../StyleSheets/Authentication.css";
import axios from "axios";
import  {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";

const Authentication=()=>{

    //login is the default tab
    const [activeTab, setActiveTab]=useState("login");
    const handleActiveTab=(tabKey)=>{
        setActiveTab(tabKey);
    }
    return(
        <div className="authMainContainer">
            <div className="authContainer">
                <Tabs id="uncontrolled-tab-example" className="mb-3" onSelect={handleActiveTab} activeKey={activeTab}>
                    <Tab eventKey="login" title="Login"><Login/></Tab>
                    <Tab eventKey="register" title="Register"><Register/></Tab>
                </Tabs>
            </div>
        </div>
    );
}

export {Authentication};

const Login=()=>{
    const BASE_URL = 'https://recipe-app-backend-7ud4rzi25-madhushanis-projects.vercel.app';
    const [userLoginData, setUserLoginData]=useState({email:"", password:""});
    const getUserLoginData =(event)=>{
        const {name, value}=event.target;
        setUserLoginData(prevState=>({...prevState, [name]:value})); 
    }

    useEffect(() => {
        console.log(userLoginData.email);
        console.log(userLoginData.password);
      }, [userLoginData]);

    //_ is commonly used as a placeholder for a variable that you don't intend to use
    const [_, setCookies]=useCookies(["access_token"]);
    const navigate=useNavigate();
    const submitData=async (event)=>{
        event.preventDefault();
        if(!userLoginData.email || !userLoginData.password){
            window.alert("All fields are mandatory!");
            return;
        }
        try{
            //get the response
            const response=await axios.post(`${BASE_URL}/users/login`, {email:userLoginData.email, password:userLoginData.password});
            //add expire time
            const expirationDate = new Date();
            expirationDate.setHours(expirationDate.getHours() + 1);
            setCookies("access_token", response.data.token, {expires:expirationDate});
            window.localStorage.setItem("User_ID", response.data.id);
            navigate("/");
            window.alert("User logged in successfully");
        }
        catch(err){
            console.error(err);
            window.alert("Please check again.");
        }
    }
    return(
        <Forms label="Login" getUserData={getUserLoginData} submitData={submitData}/>
    );
}

const Register=()=>{
    const BASE_URL = 'https://recipe-app-backend-7ud4rzi25-madhushanis-projects.vercel.app';
    const [userRegisterData, setUserRegisterData]=useState({email:"", password:""});
    const getUserRegisterData =(event)=>{
        const {name, value}=event.target;
        setUserRegisterData(prevState=>({...prevState, [name]:value}));
    }

    const submitData=async (event)=>{
        event.preventDefault();
        if(!userRegisterData.email || !userRegisterData.password){
            window.alert("All fields are mandatory.");
            return;
        }
        try{
            event.preventDefault();
            await axios.post(`${BASE_URL}/users/register`, {email:userRegisterData.email, password:userRegisterData.password});

            window.alert("User Registered Successfully !");
        }
        catch(err){
            console.error(err);
            window.alert("Please check again.");
        }

    }

    return(
        <Forms label="Register" getUserData={getUserRegisterData} submitData={submitData}/>
    );
}


const Forms=({label, getUserData, submitData})=>{
    return(
        <Form onSubmit={submitData}>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" id="userEmail" name="email" onChange={getUserData}/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" id="userPassword" name="password" onChange={getUserData}/>
            </Form.Group>
            <Button variant="secondary" type="submit" className="btn">
                {label} 
            </Button>
        </Form>
    );
}