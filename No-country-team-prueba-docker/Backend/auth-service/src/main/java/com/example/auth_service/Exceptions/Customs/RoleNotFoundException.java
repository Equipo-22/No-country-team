package com.example.auth_service.Exceptions.Customs;

public class RoleNotFoundException extends RuntimeException{
    public RoleNotFoundException(String role) {
        super("No se encontro el role: "+role);
    }
}
