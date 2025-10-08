package com.example.auth_service.Models.Dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordRequestDTO {
    @NotBlank
    private String passwordActual;
    @NotBlank
    private String nuevaPassword;

}
