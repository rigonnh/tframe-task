package com.tframe.task.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping
    public String isRunning(){
        return "Server is running in port 8080";
    }
}
