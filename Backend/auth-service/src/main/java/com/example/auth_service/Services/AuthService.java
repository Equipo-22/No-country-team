package com.example.auth_service.Services;

import com.example.auth_service.Exceptions.Customs.*;
import com.example.auth_service.Models.Dtos.*;
import com.example.auth_service.Models.Entities.User;
import com.example.auth_service.Repositories.UserRepository;
import com.example.auth_service.Security.JwtUtils;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RegistrationService registrationService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    //verifica si el usuario existe y verifico la cuenta,
    //luego crea el token y devuelve un objeto con datos del user y el token.

    public LoginUserResponseDTO login(LoginUserRequestDTO loginUserRequestDTO) throws MessagingException {
        User user=authenticate(loginUserRequestDTO);

        String code=registrationService.generarVerificacionCode();

        user.setVerificationCode(code);
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));

        registrationService.enviarVerificacionEmail(user);

        userRepository.save(user);

        return new LoginUserResponseDTO(user.getEmail());
    }

    public VerifyUserResponseDTO verifyUser(VerifyUserRequestDTO verifyUserRequestDTO){
        User user=userRepository.findByEmail(verifyUserRequestDTO.getEmail())
                .orElseThrow(() -> new UserNotFoundException(verifyUserRequestDTO.getEmail()));

        verifyCode(verifyUserRequestDTO);

        String jwtToken=jwtUtils.generateToken(user);

        return new VerifyUserResponseDTO(jwtToken,user.getUserNameReal(),user.getEmail(),
                user.getRoles()
                        .stream().map(role->role.getName().name())
                        .toList());
    }

    private User authenticate(LoginUserRequestDTO input) {
        User user = userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new UserNotFoundException(input.getEmail()));

        if (!user.isEnabled()) {
            throw new AccountNotVerifiedException(input.getEmail());
        }
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            input.getEmail(),
                            input.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException();
        }

        return user;
    }

    private void verifyCode(VerifyUserRequestDTO input) {
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())) {
                throw new VerificationCodeExpiredException();
            }
            if (user.getVerificationCode().equals(input.getVerificationCode())) {
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiresAt(null);
                userRepository.save(user);
            } else {
                throw new InvalidVerificationCodeException();
            }
        } else {
            throw new UserNotFoundException(input.getEmail());
        }
    }

}
