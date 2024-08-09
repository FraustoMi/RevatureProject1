package com.Revature.Project1.Services;


import com.Revature.Project1.DAOs.ReimbursementDAO;
import com.Revature.Project1.Models.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

//TODO: See all reimbursements
//
//See all pending reimbursements
//
//Resolve a reimbursement
//
//(update status from PENDING to APPROVED or DENIED) --
//
//
//
//(should also delete any related reimbursements) WE NEED TO MAKE SURE THAT DELETE DOES THIS!!! it does succesffully delete
//
//OPTIONAL: Update an employee’s role to manager

@Service
@AllArgsConstructor
public class ReimbursementService {
    private ReimbursementDAO rDAO;
    private UserService uService;

@Secured("ROLE_USER")
    public List<Reimbursement> getAllReimbursement(){
        System.out.println("we are in getAllReimbursement,,, so what will be the problem");


        return rDAO.findAll();
    }

    public ResponseEntity<List<Reimbursement>> getReimbursementByID(int id){

        return null;

    }


    public ResponseEntity<String> insertReimbursement(ReimbursementDTO r){

        int amount = r.getAmount();
        int user = r.getUser();
        String description = r.getDescription();

        Optional<User> optional = uService.getUserById(user);
        if (optional.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Could not insert Reimbursement as there is no user associated with ID provided");
        }
        User t = optional.get();
        Reimbursement R = new Reimbursement(
                t,
                description,
                amount
        );
        R.get_user();
        Reimbursement a = rDAO.saveAndFlush(R);
        return ResponseEntity.ok("Reimbursement " + a + " was successfully inserted!" );
    }

    public ResponseEntity<Object> findReimbursementsByUserId(int userId){
        Optional<User> userOptional = uService.getUserById(userId);
        if (userOptional.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User ID inserted does not map to existing user!");
        }
        User user = userOptional.get();

        List<Reimbursement> returnedLst = rDAO.findBy_user(user);


        return ResponseEntity.ok(returnedLst);
    }





}
