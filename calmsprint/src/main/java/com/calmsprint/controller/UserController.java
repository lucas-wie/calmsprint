package com.calmsprint.controller;

import com.calmsprint.services.AuthService;
import com.calmsprint.user.User;
import com.calmsprint.user.UserRepository;
import com.calmsprint.user.UserRequestDTO;
import com.calmsprint.user.UserResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private AuthService authService;

    @GetMapping("/user")
    public List<UserResponseDTO> getUsers() {
        List<UserResponseDTO> userList = repository.findAll().stream().map(UserResponseDTO::new).toList();
        return userList;
    }

    @PostMapping("/user")
    public void saveUser(@RequestBody UserRequestDTO data) {
        User userData = new User(data);
        repository.save(userData);
    }

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password) {
        if (authService.authenticateUser(email, password)) {
            return "Login successful";
        }
        else {
            return "Invalid email or login";
        }
    }
}
