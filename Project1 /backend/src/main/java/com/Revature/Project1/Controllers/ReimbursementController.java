package com.Revature.Project1.Controllers;


import com.Revature.Project1.Models.Reimbursement;
import com.Revature.Project1.Services.ReimbursementService;
import com.Revature.Project1.Models.ReimbursementDTO;
import com.fasterxml.jackson.core.JsonToken;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/reimbursements")
public class ReimbursementController {
    private final ReimbursementService rService;


    @GetMapping
    public ResponseEntity<List<Reimbursement>> getReimbursements(){
        System.out.println("we are in getReimbursement .... hello, who's there?");
        return ResponseEntity.ok(rService.getAllReimbursement());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getReimbursementsByUser(@PathVariable int id){
        return rService.findReimbursementsByUserId(id);
    }

    @PostMapping
    public ResponseEntity<String> insertReimbursement(@RequestBody ReimbursementDTO r){

        System.out.println("are we able to print the reimbursement dto.. we are in controller");
        System.out.println(r);

        return rService.insertReimbursement(r);

    }


}
