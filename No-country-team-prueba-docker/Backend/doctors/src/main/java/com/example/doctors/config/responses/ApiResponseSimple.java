package com.example.doctors.config.responses;


public class ApiResponseSimple {
    private String message;
    private int status;

    public ApiResponseSimple(String message, int status) {
        this.message = message;
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public int getStatus() {
        return status;
    }
}
