package com.Revature.Project1.Services;


import com.Revature.Project1.DAOs.ReimbursementDAO;
import com.Revature.Project1.DAOs.UserDao;
import com.Revature.Project1.Models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor

public class UserService {
    private final UserDao uDao;
    private final ReimbursementDAO rDao;



    //TODO: See all reimbursements
    //
    //See all pending reimbursements
    //
    //Resolve a reimbursement
    //
    //(update status from PENDING to APPROVED or DENIED)
    //
    //
    //
    //(should also delete any related reimbursements) WE NEED TO MAKE SURE THAT DELETE DOES THIS!!! Update: it does
    //
    //OPTIONAL: Update an employee’s role to manager

    //TODO: make sure that messages are better for user actions... return more than just the array

    public List<User> getAllUsers(){
        return uDao.findAll();
    }
    public List<User> addNewUser(User u){
        uDao.saveAndFlush(u);
        return getAllUsers();
    }


    public boolean deleteUserByID(int id){
        System.out.println("we are in delete User BY ID!!! that means we should be in the clear, quesiotn is, are we not returning?");
        Optional<User> u = uDao.findById(id);
        if(u.isPresent()){
            uDao.deleteById(id);
            return true;
        }
        return false;
    }
    public boolean deleteUserByUsername(String username){
        System.out.println("we are inside deleteUserByUsername");
        User u = uDao.findByusername(username);
        if (u == null){ // user does not exist;
            return false;
        }
        int uID = u.getU_id();
        System.out.println("the username is " + username + " And its associated ID is " + uID);
        uDao.deleteById(uID);
        return true;
    }

    public Optional<User> getUserById(int id){
        return uDao.findById(id);
    }



}
