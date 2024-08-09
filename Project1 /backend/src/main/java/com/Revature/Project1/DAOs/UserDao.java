package com.Revature.Project1.DAOs;

import com.Revature.Project1.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User,Integer> {

    User findByusername(String username);
}
