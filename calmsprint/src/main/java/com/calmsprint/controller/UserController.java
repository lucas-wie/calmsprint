package com.calmsprint.controller;

import com.calmsprint.services.AuthService;
import com.calmsprint.task.Task;
import com.calmsprint.task.TaskResponseDTO;
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

    @CrossOrigin(origins = "*", allowCredentials = "false")
    @GetMapping("/user")
    public List<UserResponseDTO> getUsers() {
        List<UserResponseDTO> userList = repository.findAll().stream().map(UserResponseDTO::new).toList();
        return userList;
    }

    @CrossOrigin(origins = "*", allowCredentials = "false")
    @GetMapping("/{email}")
    public UserResponseDTO getUserByEmail(@PathVariable String email) {
        User user = repository.findByEmail(email);
        return new UserResponseDTO(user);
    }

    @CrossOrigin(origins = "*", allowCredentials = "false")
    @PostMapping("/user")
    public void saveUser(@RequestBody UserRequestDTO data) {
        User userData = new User(data);
        repository.save(userData);
    }

    @CrossOrigin(origins = "*", allowCredentials = "false")
    @PostMapping("/login")
    public UserResponseDTO login(@RequestParam String email, @RequestParam String password) {
        if (authService.authenticateUser(email, password)) {
            User user = repository.findByEmail(email);
            return new UserResponseDTO(user);
        }
        else {
            return null;
        }
    }
}
