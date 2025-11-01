package com.example.auth_service.Exceptions.Customs;

public class InvalidVerificationCodeException extends RuntimeException{
    public InvalidVerificationCodeException() {
        super("El codigo ingresado es invalido. Reintente o solicite uno nuevo");
    }
}
