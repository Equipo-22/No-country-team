package com.example.auth_service.Exceptions.Customs;

public class InvalidCredentialsException extends RuntimeException{
    public InvalidCredentialsException() {
        super("El email o la contrasena son incorrectos.");
    }
}
