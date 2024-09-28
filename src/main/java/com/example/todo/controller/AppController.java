package com.example.todo.controller;


import com.example.todo.request.LoginRequest;
import com.example.todo.request.SignupRequest;
import com.example.todo.response.LoginResponse;
import com.example.todo.response.SignupResponse;
import com.example.todo.service.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {

    @Autowired
    private AppService appService;

    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest signupRequest){
        return ResponseEntity.ok(appService.signup(signupRequest));
    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(appService.login(loginRequest));
    }

}
