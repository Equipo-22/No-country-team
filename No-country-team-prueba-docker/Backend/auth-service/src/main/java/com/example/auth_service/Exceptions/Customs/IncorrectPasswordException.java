package com.example.auth_service.Exceptions.Customs;

public class IncorrectPasswordException extends RuntimeException{
    public IncorrectPasswordException() {
        super("La contraseña actual es incorrecta");
    }
}
