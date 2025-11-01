package com.example.auth_service.Exceptions.Customs;

public class InvalidCredentialsException extends RuntimeException{
    public InvalidCredentialsException() {
        super("Las credenciales ingresadas son incorrectas");
    }
}
