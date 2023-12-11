package com.calmsprint.task;

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
    private int status;

    public Task(TaskRequestDTO taskRequestDTO) {
        this.userid = taskRequestDTO.userId();
        this.text = taskRequestDTO.text();
        this.status = taskRequestDTO.status();
    }
}
