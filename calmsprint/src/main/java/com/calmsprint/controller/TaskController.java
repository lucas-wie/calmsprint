package com.calmsprint.controller;

import com.calmsprint.task.Task;
import com.calmsprint.task.TaskRepository;
import com.calmsprint.task.TaskRequestDTO;
import com.calmsprint.task.TaskResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @CrossOrigin(origins = "*", allowCredentials = "false")
    @GetMapping
    public List<TaskResponseDTO> getTasks() {
        List<TaskResponseDTO> tasks = taskRepository.findAll().stream().map(TaskResponseDTO::new).toList();
        return tasks;
    }

    @CrossOrigin(origins = "*", allowCredentials = "false")
    @GetMapping("/{id}")
    public TaskResponseDTO getTaskById(@PathVariable Long id) {
        Task task = taskRepository.findByTaskId(id);
        return new TaskResponseDTO(task);
    }

    @CrossOrigin(origins = "*", allowCredentials = "false")
    @PostMapping
    public String saveTask(@RequestBody TaskRequestDTO data) {
        if (data.status() < 1 || data.status() > 3) {
            return "Status inválido";
        }
        Task taskData = new Task(data);
        taskRepository.save(taskData);
        return "Success!!";
    }

    @CrossOrigin(origins = "*", allowCredentials = "false")
    @PutMapping("/{id}")
    public void updateTask(@PathVariable Long id, @RequestBody TaskRequestDTO task) {
        if (taskRepository.existsById(id)) {
            Task updatedTask = new Task(task);
            updatedTask.setId(id);
            taskRepository.save(updatedTask);
        }
    }

    @CrossOrigin(origins = "*", allowCredentials = "false")
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}