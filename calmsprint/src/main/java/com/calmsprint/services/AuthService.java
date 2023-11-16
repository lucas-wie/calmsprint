package com.calmsprint.services;

import com.calmsprint.user.User;
import com.calmsprint.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public boolean authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email);

        return user != null && user.getEmail().equals(email);
    }
}
