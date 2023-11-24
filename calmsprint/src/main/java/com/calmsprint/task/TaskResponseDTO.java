package com.calmsprint.task;

public record TaskResponseDTO(Long id, Long userId, String text, int status) {
    public TaskResponseDTO(Task task) {
        this(task.getId(), task.getUserid(), task.getText(), task.getStatus());
    }
}
