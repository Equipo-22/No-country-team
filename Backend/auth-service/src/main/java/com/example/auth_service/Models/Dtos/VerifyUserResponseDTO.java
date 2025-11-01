package com.example.auth_service.Models.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VerifyUserResponseDTO {
    private UUID id;
    private String token;
    private String username;
    private String email;
    private List<String> roles;
}
