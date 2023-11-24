package com.calmsprint.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM tasks t WHERE t.id = ?1")
    Task findByTaskId(Long id);
}
