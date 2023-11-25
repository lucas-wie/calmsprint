// src/BoardKanban.tsx
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Card, { Task } from './Card';
import './Styles/BoardKanban.css';

interface BoardKanbanProps {
  userId: string; // Adicione o userId como propriedade
}

const BoardKanban: React.FC<BoardKanbanProps> = ({ userId }) => {
  const [tasks, setTasks] = useState<Task[]>([]); // Defina o tipo como Task[]

  // Utilize o useEffect para carregar as tarefas ao montar o componente
  useEffect(() => {
    // Adicione a lógica para obter as tarefas do backend
    // Certifique-se de incluir o userId ao fazer a requisição
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/tasks?userId=${userId}`);
        const result = await response.json();
        setTasks(result);
      } catch (error) {
        console.error('Erro ao obter tarefas:', error);
      }
    };

    fetchData();
  }, [userId]);

  const moveTask = async (taskId: number, status: number) => {
    // Adicione a lógica para atualizar o status da tarefa no backend
    try {
      await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
    } catch (error) {
      console.error('Erro ao mover a tarefa:', error);
    }
  };

  const addTask = async (description: string) => {
    // Adicione a lógica para adicionar uma nova tarefa no backend
    try {
      await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          text: description,
          status: 1, // Inicialmente, a nova tarefa estará na coluna "Todo"
        }),
      });

      // Após adicionar a tarefa, recarregue a lista de tarefas
      const response = await fetch(`http://localhost:8080/tasks?userId=${userId}`);
      const result = await response.json();
      setTasks(result);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const deleteTask = async (taskId: number) => {
    // Adicione a lógica para excluir a tarefa no backend
    try {
      await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: 'DELETE',
      });

      // Após excluir a tarefa, recarregue a lista de tarefas
      const response = await fetch(`http://localhost:8080/tasks?userId=${userId}`);
      const result = await response.json();
      setTasks(result);
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const [, dropTodo] = useDrop({
    accept: 'TASK',
    drop: (item: { id: number, status: number }) => moveTask(item.id, 1), // Mover para "Todo"
  });

  const [, dropInProgress] = useDrop({
    accept: 'TASK',
    drop: (item: { id: number, status: number }) => moveTask(item.id, 2), // Mover para "In Progress"
  });

  const [, dropDone] = useDrop({
    accept: 'TASK',
    drop: (item: { id: number, status: number }) => moveTask(item.id, 3), // Mover para "Done"
  });

  return (
    <div className="board-kanban">
      <div className="column" ref={dropTodo}>
        <h2>Todo</h2>
        {tasks
          .filter((task) => task.status === 1)
          .map((task) => (
            <Card key={task.id} task={task} onDelete={() => deleteTask(task.id)} />
          ))}
        {/* Adicione um botão para adicionar uma nova tarefa na coluna "Todo" */}
        <button onClick={() => addTask('Nova Tarefa')}>Adicionar Tarefa</button>
      </div>

      <div className="column" ref={dropInProgress}>
        <h2>In Progress</h2>
        {tasks
          .filter((task) => task.status === 2)
          .map((task) => (
            <Card key={task.id} task={task} onDelete={() => deleteTask(task.id)} />
          ))}
      </div>

      <div className="column" ref={dropDone}>
        <h2>Done</h2>
        {tasks
          .filter((task) => task.status === 3)
          .map((task) => (
            <Card key={task.id} task={task} onDelete={() => deleteTask(task.id)} />
          ))}
      </div>
    </div>
  );
};

export default BoardKanban;
