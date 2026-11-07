package com.example.todo.repository;

import com.example.todo.model.TodoModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TodoRepository extends CrudRepository<TodoModel, Long> {
String findByPrioridade (String prioridade);
    void delete(TodoModel tarefa);
}
