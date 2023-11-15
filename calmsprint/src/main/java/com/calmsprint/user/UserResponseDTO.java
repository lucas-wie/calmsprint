package com.calmsprint.user;

public record UserResponseDTO(Long id, String name, String email, String password) {
    public UserResponseDTO(User user) {
        this(user.getId(), user.getName(), user.getEmail(), user.getPassword());
    }
}
