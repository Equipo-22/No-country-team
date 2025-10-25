package com.example.auth_service.Controllers;

import com.example.auth_service.Models.Dtos.*;
import com.example.auth_service.Services.AuthService;
import com.example.auth_service.Services.PasswordService;
import com.example.auth_service.Services.RegistrationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@Tag(name = "Auth Service", description = "Endpoints de autenticación y registro (usar prefijo /api/auth/). Acordarse de crear roles: ROLE_USER, ROLE_PACIENTE y ROLE_PERSONAL_MEDICO")

public class AuthController {

    private final AuthService authService;
    private final RegistrationService registrationService;
    private final PasswordService passwordService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegisterUserRequestDTO registerUserRequestDTO) throws MessagingException {
        registrationService.register(registerUserRequestDTO);
    }

    @GetMapping("/test")
    @ResponseStatus(HttpStatus.OK)
    public String test(){
        return "test funciono!";
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public LoginUserResponseDTO login(@RequestBody LoginUserRequestDTO loginUserRequestDTO) throws MessagingException {
        return authService.login(loginUserRequestDTO);
    }

    @PostMapping("/login/verify-user")
    @ResponseStatus(HttpStatus.OK)
    public VerifyUserResponseDTO verifyUserLogin (@RequestBody VerifyUserRequestDTO verifyUserRequestDTO){
        return authService.verifyUser(verifyUserRequestDTO);
    }

    @PostMapping("/register/verify-user")
    @ResponseStatus(HttpStatus.OK)
    public void verifyUserRegister(@RequestBody VerifyUserRequestDTO verifyUserRequestDTO){
        registrationService.verifyUser(verifyUserRequestDTO);
    }

    @PostMapping("/resend")
    @ResponseStatus(HttpStatus.OK)
    public void resendVerificationCode(@RequestParam String email) throws MessagingException {
        registrationService.reenviarCodigoVerificacion(email);
    }

    @PostMapping("/change-password")
    @SecurityRequirement(name = "bearerAuth")
    @ResponseStatus(HttpStatus.OK)
    public void changePassword(@RequestBody ChangePasswordRequestDTO dto, Principal principal){
        passwordService.cambiarPassword(principal.getName(),dto);
    }

    @PostMapping("/solicitar-reset-password")
    @ResponseStatus(HttpStatus.OK)
    public void solicitarResetPassword(@RequestParam String email) throws MessagingException {
        passwordService.solicitarResetPassword(email);
    }

    @PostMapping("/reset-password")
    @ResponseStatus(HttpStatus.OK)
    public void resetPassword(@RequestBody ResetPasswordRequestDTO dto){
        passwordService.resetPassword(dto);
    }
}
