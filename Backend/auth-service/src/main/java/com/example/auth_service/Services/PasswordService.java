package com.example.auth_service.Services;

import com.example.auth_service.Exceptions.Customs.IncorrectPasswordException;
import com.example.auth_service.Exceptions.Customs.InvalidVerificationCodeException;
import com.example.auth_service.Exceptions.Customs.UserNotFoundException;
import com.example.auth_service.Exceptions.Customs.VerificationCodeExpiredException;
import com.example.auth_service.Models.Dtos.ChangePasswordRequestDTO;
import com.example.auth_service.Models.Dtos.ResetPasswordRequestDTO;
import com.example.auth_service.Models.Entities.User;
import com.example.auth_service.Repositories.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Value("${frontend.reset-password.url}")
    private String resetPasswordBaseUrl;

    //cambio de password (cuando el user esta logueado)
    public void cambiarPassword(String email , ChangePasswordRequestDTO changePasswordRequestDTO){
        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new UserNotFoundException(email));

        if(!passwordEncoder.matches(changePasswordRequestDTO.getPasswordActual(), user.getPassword())){
            throw new IncorrectPasswordException();
        }
        user.setPassword(passwordEncoder.encode(changePasswordRequestDTO.getNuevaPassword()));
        userRepository.save(user);
    }

    //guarda el token y envia un mail con una url y el token
    public void solicitarResetPassword(String email) throws MessagingException {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()){
            User user=optionalUser.get();
            String token= UUID.randomUUID().toString();

            user.setVerificationCode(token);
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(30));

            userRepository.save(user);

            //se envia un mail con link que redirecciona a la pantalla de cambiar password.;
            String subject = "Solicitud cambio de contraseña";
            String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px; border-bottom: solid 4px #11C4D4;\">"
                + "<h2 style=\"color: #0C4E8C;\">Cambio de contraseña</h2>"
                + "<p style=\"font-size: 16px;\">Ingrese el siguiente token para continuar:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Token:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #0D81E4;\">" + token + "</p>"
                + "<p style=\"font-size: 12px; font-weight: bold; color: #333;\">Tiempo de vigencia: 30 minutos </p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";
            emailService.enviarNotificacionMail(user.getEmail(), subject, htmlMessage);
        }
    }

    //verifica el token y cambia el password
    public void resetPassword(ResetPasswordRequestDTO dto){
        User user=userRepository.findByVerificationCode(dto.getToken())
                .orElseThrow(InvalidVerificationCodeException::new);

        if(user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())){
            throw new VerificationCodeExpiredException();
        }

        user.setVerificationCode(null);
        user.setVerificationCodeExpiresAt(null);

        user.setPassword(passwordEncoder.encode(dto.getNuevaPassword()));

        userRepository.save(user);
    }
}
