// Tarefa.java
package com.calmsprint.task;

import com.calmsprint.user.User;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "tasks")
@Entity(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Task {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userid;
    private String text;
    private int status; // To do, Doing, Done

    public Task(TaskRequestDTO taskRequestDTO) {
        this.userid = taskRequestDTO.userId();
        this.text = taskRequestDTO.text();
        this.status = taskRequestDTO.status();
    }
}
