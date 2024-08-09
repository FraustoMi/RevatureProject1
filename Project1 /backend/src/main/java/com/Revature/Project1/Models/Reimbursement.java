package com.Revature.Project1.Models;
import com.fasterxml.jackson.annotation.JsonIgnore;



import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

@Entity
@Table(name = "Reimbursements")
@Component
@Getter
@Setter
@AllArgsConstructor
@ToString
public class Reimbursement {


    @Id
    @Column(name="reimbursement_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int r_id;

    @Column(name="description", nullable = false)
    private String description;


    @Column(name="amount", nullable = false)
    private int amount;

    @Column(name="status", nullable = false)
    private String stat;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User _user;

    public Reimbursement(){
        this.stat = "pending";
    }
    public Reimbursement(User user, String description,int amount){
        this._user = user;
        this.description = description;
        this.amount = amount;
        this.stat = "pending";
    }


}
