package com.example.todo.repository;

import com.example.todo.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    @Query("Update Task t set t.done = :isDone  where t.id = :taskId")
    @Modifying
    @Transactional
    void updateTask(@Param("taskId") int taskId, @Param("isDone") Boolean isDone);

    List<Task> findAllByUserId(int userId);
}
