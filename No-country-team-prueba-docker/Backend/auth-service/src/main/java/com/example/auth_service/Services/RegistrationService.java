package com.example.auth_service.Services;

import com.example.auth_service.Exceptions.Customs.*;
import com.example.auth_service.Models.Dtos.RegisterUserRequestDTO;
import com.example.auth_service.Models.Dtos.VerifyUserRequestDTO;
import com.example.auth_service.Models.Entities.ERole;
import com.example.auth_service.Models.Entities.Role;
import com.example.auth_service.Models.Entities.User;
import com.example.auth_service.Repositories.RoleRepository;
import com.example.auth_service.Repositories.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final EmailService emailService;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public void register(RegisterUserRequestDTO registerUserRequestDTO) throws MessagingException {

        if(userRepository.existsByUsername(registerUserRequestDTO.getUsername())){
            throw new UserAlreadyExistsException(registerUserRequestDTO.getUsername());
        }
        if(userRepository.existsByEmail(registerUserRequestDTO.getEmail())){
            throw new UserAlreadyExistsException(registerUserRequestDTO.getEmail());
        }
        User user=User.builder()
                .username(registerUserRequestDTO.getUsername())
                .email(registerUserRequestDTO.getEmail())
                .password(passwordEncoder.encode(registerUserRequestDTO.getPassword()))
                .verificationCode(generarVerificacionCode())
                .verificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15))
                .enabled(false)//para activacion por mail.
                .build();

        Role userRole=roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(()->new RoleNotFoundException(ERole.ROLE_USER.toString()));
        Role pacienteRole=roleRepository.findByName(ERole.ROLE_PACIENTE)
                .orElseThrow(()->new RoleNotFoundException(ERole.ROLE_PACIENTE.toString()));
        Set<Role> roles=new HashSet<>();
        roles.add(pacienteRole);
        roles.add(userRole);

        user.setRoles(roles);

        enviarVerificacionEmail(user);

        userRepository.save(user);
    }

    //verifica si el codigo de verificacion es el correcto
    public void verifyUser(VerifyUserRequestDTO input) {
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (user.isEnabled()) {
                throw new AccountAlreadyVerifiedException(user.getEmail());
            }
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

    //reenvia el codigo de verificacion
    public void reenviarCodigoVerificacion(String email) throws MessagingException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()->new UserNotFoundException(email));

            if (user.isEnabled()) {
                throw new AccountAlreadyVerifiedException(email);
            }
            user.setVerificationCode(generarVerificacionCode());
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusHours(1));
            enviarVerificacionEmail(user);

            userRepository.save(user);
    }

    //envia el codigo de verificacion
    public void enviarVerificacionEmail(User user) throws MessagingException {
        String subject = "Verificacion de cuenta";
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Bienvenido a tu app!</h2>"
                + "<p style=\"font-size: 16px;\">Ingrese el código de verificación a continuación para continuar:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Codigo de verificacion:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + user.getVerificationCode() + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        emailService.enviarNotificacionMail(user.getEmail(), subject, htmlMessage);
    }
    //genera el codigo de verificacion
    public String generarVerificacionCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }

}
