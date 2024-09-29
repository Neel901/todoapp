package com.example.todo.controller;


import com.example.todo.exception.UserException;
import com.example.todo.request.CreateTaskRequest;
import com.example.todo.request.LoginRequest;
import com.example.todo.request.SignupRequest;
import com.example.todo.request.UpdateTaskRequest;
import com.example.todo.response.CreateTaskResponse;
import com.example.todo.response.FetchTaskResponse;
import com.example.todo.response.LoginResponse;
import com.example.todo.response.SignupResponse;
import com.example.todo.response.UpdateTaskResponse;
import com.example.todo.service.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class AppController {

    @Autowired
    private AppService appService;

    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest signupRequest){
        return ResponseEntity.ok(appService.signup(signupRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
        try {
            return ResponseEntity.ok(appService.login(loginRequest));
        } catch (UserException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/task")
    public ResponseEntity<CreateTaskResponse> createTask(@RequestBody CreateTaskRequest createTaskRequest){
        return ResponseEntity.ok(appService.createTask(createTaskRequest));
    }

    @PutMapping("/task")
    public ResponseEntity<UpdateTaskResponse> updateTask(@RequestBody UpdateTaskRequest updateTaskRequest){
        return ResponseEntity.ok(appService.updateTask(updateTaskRequest));
    }

    @GetMapping("/tasks/{userId}")
    public ResponseEntity<List<FetchTaskResponse>> getTasks(@PathVariable(name = "userId") int userId){
        return ResponseEntity.ok(appService.getTasks(userId));
    }
}
