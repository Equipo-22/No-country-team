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
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    //verifica si el usuario existe y verifico la cuenta,
    //luego crea el token y devuelve un objeto con datos del user y el token.

    public VerifyUserResponseDTO login(LoginUserRequestDTO loginUserRequestDTO) throws MessagingException {

        User user=authenticate(loginUserRequestDTO);

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

}
