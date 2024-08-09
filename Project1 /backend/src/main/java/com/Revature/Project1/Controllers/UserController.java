package com.Revature.Project1.Controllers;

import com.Revature.Project1.DAOs.ReimbursementDAO;
import com.Revature.Project1.DAOs.UserDao;
import com.Revature.Project1.Models.DeleteUserDTO;
import com.Revature.Project1.Models.User;
import com.Revature.Project1.Services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.*;


//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private final UserService userS;


    @GetMapping
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userS.getAllUsers();
        return ResponseEntity.ok(users);
    }

    //TODO: add if else in the event that the get value returned is null -> so we can return something more helpful
    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUser(@PathVariable int id){
        return ResponseEntity.ok(userS.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<List<User>> insertUser(@RequestBody User u){
        return ResponseEntity.ok(userS.addNewUser(u));
    }

    //TODO: actually test this unit and add helpful functionality.
    //TODO: make sure to notify user when it sends a delete request for user which doesn't exist
    @DeleteMapping("/{str}")
    public ResponseEntity<String> deleteUser(@PathVariable String str){
        System.out.println("we are inside endpoint function!");
       boolean isInt =  canBeParsedToInt(str);
       if (isInt){
          int id =  Integer.parseInt(str);
          boolean wasDeleted = userS.deleteUserByID(id);
          if (!wasDeleted){
              return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found, could not be deleted");
          }
         // return  ResponseEntity.ok(userS.deleteUserByID(id));
           return ResponseEntity.ok("User was successfully deleted!");
       }
       else { /// username is not an int!
           boolean was_deleted = userS.deleteUserByUsername(str);
           if (!was_deleted) {
               return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found, could not be deleted");
           }
           return ResponseEntity.ok("User was successfully deleted!");
       }
       // return ResponseEntity.ok(userS.deleteUserByUsername(str));

    }


    public static boolean canBeParsedToInt(String str) {
        System.out.println("we are inside canBeparsed method!");
        try {
            Integer.parseInt(str);
            return true; // String can be parsed to int
        } catch (NumberFormatException e) {
            return false; // String cannot be parsed to int
        }
    }





}
