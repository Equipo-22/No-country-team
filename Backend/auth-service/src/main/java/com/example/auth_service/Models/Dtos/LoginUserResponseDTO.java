package com.example.auth_service.Models.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class LoginUserResponseDTO {
    private String message;
    private String email;

    public LoginUserResponseDTO(String email) {
        this.message="Codigo de verificacion enviado al email";
        this.email = email;
    }
}
