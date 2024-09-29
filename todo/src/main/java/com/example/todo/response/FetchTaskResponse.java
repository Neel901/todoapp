package com.example.todo.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FetchTaskResponse {

    private int taskId;
    private String taskName;
    private boolean isDone;


}
