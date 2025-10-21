package com.example.auth_service.Exceptions.Customs;

public class AccountAlreadyVerifiedException extends RuntimeException{
    public AccountAlreadyVerifiedException(String email) {
        super("Ya se encuentra verificada la cuenta: "+email);
    }
}
