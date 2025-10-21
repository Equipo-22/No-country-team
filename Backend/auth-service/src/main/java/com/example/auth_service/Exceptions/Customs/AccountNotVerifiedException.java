package com.example.auth_service.Exceptions.Customs;

public class AccountNotVerifiedException extends RuntimeException{
    public AccountNotVerifiedException(String email) {
        super("No se encuentra verificada la cuenta: "+email);
    }
}
