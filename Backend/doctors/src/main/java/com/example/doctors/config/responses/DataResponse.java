package com.example.doctors.config.responses;

public class DataResponse<T> extends ApiResponseSimple {

    private T data;

    public DataResponse(String message, int status, T data) {
        super(message, status);
        this.data = data;
    }

    public DataResponse(String message, int status) {
        super(message, status);
    }

    public T getData() {
        return data;
    }
}
