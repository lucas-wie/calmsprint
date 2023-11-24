package com.calmsprint.task;

public record TaskRequestDTO(Long userId, String text, int status) {
}
