import React, {useState} from 'react';
import "./Main.css"
import axios, {AxiosError} from 'axios';
import { hasUncaughtExceptionCaptureCallback } from 'process';
const API_URL_USERS = 'http://localhost:8080/users';
const API_URL_REIMBURSEMENTS = 'http://localhost:8080/reimbursements';
const BaseURL =  "http://localhost:8080";
const hasNonAlphabetic = (str:string) => /[^a-zA-Z]/.test(str);
const isAlphabetic = (char:string) => /^[A-Za-z]$/.test(char);



const Main: React.FC =  () => {
    const [addFirstName,setAddFirstName] = useState("");
    const handleFirstNameChange = (e:any) =>{
        setAddFirstName(e.target.value);
        const v = e.target.value;
        console.log("firstName is: " + v);
    }
    const [addLastName, setAddLastName] = useState("");
    const handleLastNameChange = (e:any) => {
        const str = e.target.value;
        console.log("Last name is: " + str);
        setAddLastName(str);
    }
    const [addUsername,setAddUserName] = useState("");
    const handleUserNameChange = (e:any) => {
        const str = e.target.value;
        console.log("username is" + str);
        setAddUserName(str);
    }

    const [addPassword,setAddPassword] = useState("");
    const handleAddPasswordChange = (e:any) => {
        const str = e.target.value;
        console.log("add password val is: " + str);
        setAddPassword(str);
    }
    const [addConfirm,setAddConfirm] = useState("");
    const handleAddConfirmChange = (e:any) => {
        const str = e.target.value;
        console.log("confirm pass is: " + str);
        setAddConfirm(str);
    }

    const [addRole,setAddRole] = useState("user");
    const handleAddRoleChange = (e:any) => {
        const str = e.target.value;
        console.log("current role is " + str);
        setAddRole(str);
    }

    
    

    const postUser = async() =>{
        
        if(hasNonAlphabetic(addFirstName) || hasNonAlphabetic(addLastName)){
            alert("Ensure that firstname and/or lastname do not contain any non-alphabet characters!");
            return
        }
        if (!(addConfirm === addPassword)){
            alert("Passwords must match for user to be submitted")
            return
        }
        if(addPassword === "" || 
            addFirstName === "" ||
            addLastName === "" ||
            addUsername === "" 
        ){alert("Please ensure that no fields are left empty"); return}

        if( (addRole !== 'admin')){
            setAddRole('user');
        }
        const firstChar = addUsername[0];
        if(!isAlphabetic(firstChar)){alert("First character of username must be letter"); return};
        try {
        await axios.post(API_URL_USERS, {

            "firstname":addFirstName ,
            "lastname": addLastName ,
            "username": addUsername ,
            "pass": addConfirm,
            "rol": addRole
        }
        );
        alert("request was successfully sent! User has been added to DB")
        } catch (error){
        const axiosError = error as AxiosError;
        if (axiosError.response){
            const statusCode = axiosError.response.status;
            const errorMessage = axiosError.response.data;
            if (statusCode === 500) {
                console.error('Username already exists');
                alert("Username already exists, please choose another")
              } else if (statusCode === 404) {
                console.error('Not Found (404)');
                alert("bad request (404)")
              } else {
                console.error(`Error: ${statusCode} - ${errorMessage}`);
              }
            } else if (axiosError.request) {
              // The request was made but no response was received
              console.error('No response received');
              alert("No response received, likely server is down!")
            } else {
              // Something happened in setting up the request
              console.error('Error:', axiosError.message);
              alert(`Something unexpected Happened:${axiosError.message}`)
            }
          }
        
    }
    const [deleteId,setDeleteId] = useState("");
    const handleDeleteIdChange = (e:any) =>{
        const str = e.target.value;
        setDeleteId(str);
        console.log("delete ID is: " + str);
    }
    const deleteUserByIDorUsername = async(t:number) => {
        let endPoint = "";
        t === 0 ? endPoint = deleteId : endPoint = deleteUsername;
        if (t === 0){
            const num = Number(endPoint);
            if(Number.isNaN(num)){
                alert("Please ensure you enter real number");
                return
            }

        }
        try{
            console.log("we are in delete user request");
           const url:string = `${API_URL_USERS}/${endPoint}`;
            axios.delete(url)
            .then(response => {
                alert(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.response.data);
              })
        }catch (error){
            console.log(error);
            alert("there was an error trying to send del")
        }
    };
    const [deleteUsername,setDeleteUsernmae] = useState("");
    const handleDeleteUsernameChange = (e:any) =>{
        const v = e.target.value;
        setDeleteUsernmae(v);
        console.log("deleteUsername val is: " + v)
    
    };

    const [fileReimbursementAmount,setFileReimbursementAmount] = useState("");
    const [fileReimbursementDescription,setFileReimbursementDescription] = useState("");
    const handleFileReimbursementAmountChange = (e:any) => {
        const v = e.target.value;
        setFileReimbursementAmount(v);
        console.log("fileReimbursementAmount val is: " + v);
    }
    const handleFileReimbursementDescriptionChange = (e:any) =>{
        const v = e.target.value;
        setFileReimbursementDescription(v);
        console.log("file reimbursement description is: " + v);
    }


    const [reimbursement_idApprove,setReimbursementIDApprove] = useState("");
    const handleReimburesmentIdApproveChange = (e:any) =>{
        const v = e.target.value;
        setReimbursementIDApprove(v);
        console.log("New Reimbursement ID value is: " + v);
    } 

    const postFileReimbursement = async () => {
        if(fileReimbursementAmount === "" || fileReimbursementDescription === ""){
            alert("Please ensure that no field is empty");
            return
        }
        const num = Number(fileReimbursementAmount);
        if(Number.isNaN(num)){
            alert("Reimbursment amoutn must be a valid number");
            return
        }
        if(num <= 0){
            alert("Please ensure that reimbursement amount is more than 0");
            return
        }
        try{
            await axios.post(API_URL_REIMBURSEMENTS,

                {
                    "description": fileReimbursementDescription,
                    "amount": num,
                    "user": 3
                }
            );
            alert("Reimbursement was inserted successfully!")
        }catch (error){
            alert("Something happened, and user could not be inserted. Something went wrong.");
            console.log("The error we encountered when inserting reimbursement is: " + error);
        }

    }
        
    

    return (
        <div>
            <button className='buttonLayout' onClick={postUser}>
                
                Add User
            </button>
            <br/>
            <label className='buttonLayout'>

            <input type="text"
            placeholder="firstname"
            value={addFirstName}
            onChange={handleFirstNameChange}
        />
            </label>
            <label className='buttonLayout'>

            <input type="text"
            placeholder="lastname"
            value={addLastName}
            onChange={handleLastNameChange}
        />
            </label>
            <label className='buttonLayout'>

            <input type="text"
            placeholder="username"
            value={addUsername}
            onChange={handleUserNameChange}
        />
            </label>
            <label className='buttonLayout'>
                <input type="password"
                placeholder="password"
                value={addPassword}
                onChange={handleAddPasswordChange}/>
            </label>
            <label className='buttonLayout'>
                <input type="password"
                placeholder="Confirm Password"
                value = {addConfirm}
                onChange={handleAddConfirmChange}/>
            </label>
            <label className='buttonLayout'>
                <input type="text"
                placeholder="Role (Optional Field)"
                value={addRole}
                onChange={handleAddRoleChange}/>
            </label>

            <br/>
            <br/>
            <br/>
            <br/>

            <button className='buttonLayout' onClick={() => deleteUserByIDorUsername(0)}>
                Delete User By ID
            </button>
            <br/>
            <label className='buttonLayout'>
                <input type="text"
                value={deleteId}
                onChange={handleDeleteIdChange}
                placeholder="User ID"/>
            </label>

            <br/>
            <br/>
            <br/>
            <br/>


            <button className='buttonLayout' onClick={() => deleteUserByIDorUsername(1)}>
                Delete User By Username
            </button>
            <br/>
            <label className='buttonLayout' onChange={handleDeleteUsernameChange}>
                <input type="text"
                placeholder="User Username"/>
                
            </label>

            <br/>
            <br/>
            <br/>
            <br/>

            <button className='buttonLayout' 
            onClick={postFileReimbursement} 
            >
                File Reimbursement
            </button>
            <br/>
            <label className='buttonLayout' onChange={handleFileReimbursementAmountChange}>
                <input type="text"
                value={fileReimbursementAmount}
                placeholder="Amount"/>
            </label>
            <label className='buttonLayout' onChange={handleFileReimbursementDescriptionChange}>
                <input type="text"
                value={fileReimbursementDescription}
                placeholder="Description"/>
            </label>
            <br/>
            <br/>
            <br/>
            <br/>

            <button className='buttonLayout'>
                Approve Reimbursement
            </button>
            <button className='buttonLayout'>
                Deny Reimbursement
            </button>
            <br/>
            <label className='buttonLayout' onChange={handleReimburesmentIdApproveChange}>
                <input type="text"
                value={reimbursement_idApprove}
                placeholder="ReimbursementID"/>
            </label>

            <br/>
            <br/>
            <br/>
            <br/>
            <button className='buttonLayout'>
                My Reimbursements
            </button>
            <button className='buttonLayout'>
                All Reimbursements
            </button>
            <button className='buttonLayout'>
                Get Users
            </button>
            <button className='buttonLayout'>
                Get Reimbursements by ID
            </button>
        </div>
    );

}



export default Main;