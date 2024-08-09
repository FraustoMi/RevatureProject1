package com.Revature.Project1.Models;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReimbursementDTO {
    private int amount;
    private String description;
    private int user;



}