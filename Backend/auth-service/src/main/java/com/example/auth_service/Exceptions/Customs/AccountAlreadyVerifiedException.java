package com.example.auth_service.Exceptions.Customs;

public class AccountAlreadyVerifiedException extends RuntimeException{
    public AccountAlreadyVerifiedException(String email) {
        super("La cuenta: '"+email"' ya se encuentra verificada. Por favor, inicie sesión");
    }
}
