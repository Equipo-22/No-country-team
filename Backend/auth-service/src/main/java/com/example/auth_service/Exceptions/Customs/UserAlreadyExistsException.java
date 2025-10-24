package com.example.auth_service.Exceptions.Customs;

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException(String emailOrUsername) {
        super("Ya existe un usuario con el email: '"+emailOrUsername+"'. Por favor, inicie sesión");
    }

}
