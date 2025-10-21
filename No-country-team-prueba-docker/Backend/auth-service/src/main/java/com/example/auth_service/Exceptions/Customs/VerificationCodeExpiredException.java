package com.example.auth_service.Exceptions.Customs;

public class VerificationCodeExpiredException extends RuntimeException{
    public VerificationCodeExpiredException() {
        super("El codigo de verificacion ya expiro.");
    }
}
