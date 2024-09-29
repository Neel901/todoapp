package com.example.todo.service;

import com.example.todo.exception.UserException;
import com.example.todo.model.Task;
import com.example.todo.model.User;
import com.example.todo.repository.TaskRepository;
import com.example.todo.repository.UserRepository;
import com.example.todo.request.CreateTaskRequest;
import com.example.todo.request.LoginRequest;
import com.example.todo.request.SignupRequest;
import com.example.todo.request.UpdateTaskRequest;
import com.example.todo.response.CreateTaskResponse;
import com.example.todo.response.FetchTaskResponse;
import com.example.todo.response.LoginResponse;
import com.example.todo.response.SignupResponse;
import com.example.todo.response.UpdateTaskResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    public SignupResponse signup(SignupRequest signupRequest) {
        User user = new User();
        user.setUname(signupRequest.getUserName());
        user.setPass(signupRequest.getPassword());
        user = userRepository.save(user);
        return SignupResponse.builder()
                .userId(user.getId())
                .message("Signup Successful")
                .build();

    }

    public LoginResponse login(LoginRequest loginRequest) throws UserException {
        Optional<User> optionalUser = userRepository.findByUnameAndPass(loginRequest.getUserName(), loginRequest.getPassword());
        if (optionalUser.isPresent()) {
            return LoginResponse.builder()
                    .userId(optionalUser.get().getId())
                    .message("Login Successful")
                    .build();
        }
        else {
            throw new UserException("Login failed");
        }
    }

    public CreateTaskResponse createTask(CreateTaskRequest createTaskRequest) {
        Task task = new Task();
        task.setTaskName(createTaskRequest.getTaskName());
        task.setUserId(createTaskRequest.getUserId());
        task = taskRepository.save(task);
        return CreateTaskResponse.builder()
                        .taskId(task.getId()).build();
    }

    public UpdateTaskResponse updateTask(UpdateTaskRequest updateTaskRequest) {
        taskRepository.updateTask(updateTaskRequest.getTaskId(), updateTaskRequest.getIsDone());
        return UpdateTaskResponse.builder().
                message("Update Success").build();
    }

    public List<FetchTaskResponse> getTasks(int userId) {
        List<Task> userTasks= taskRepository.findAllByUserId(userId);
        List<FetchTaskResponse> response = new ArrayList<>();
        for(Task task:userTasks){
            FetchTaskResponse f = FetchTaskResponse.builder()
                    .taskId(task.getId()).taskName(task.getTaskName()).isDone(task.isDone()).build();

            response.add(f);
        }
        return response;
    }
}
