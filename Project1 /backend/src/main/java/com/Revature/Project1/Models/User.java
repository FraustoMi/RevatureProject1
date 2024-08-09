package com.Revature.Project1.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Entity
@Table(name = "users")
@Component
@AllArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @Column(name="user_id")
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int u_id;
    @Column(name = "firstName",nullable = false)
    private String firstname;

    @Column(name="lastName",nullable = false)
    private String lastname;


    @Column(name = "userName",nullable = false, unique = true)
    private String username;

    @Column(name="password",nullable = false)
    private String pass;

    @Column(name="role",nullable = false, columnDefinition = "text default 'user'")
    private String rol;

    public User() {
        this.rol = "user";
    }

    @Column(name = "userReimbursements", nullable = true)
    @JsonIgnore
    @OneToMany(mappedBy = "_user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Reimbursement> lstOfReimbursements;


    @Override
    public String toString() {
        return "User{" +
                "u_id=" + u_id +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", username='" + username + '\'' +
                ", pass='" + pass + '\'' +
                ", rol='" + rol + '\'' +
                '}';
    }
}
