package com.example.auth_service.Exceptions;

import com.example.auth_service.Exceptions.Customs.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> UserAlreadyExistsException(UserAlreadyExistsException e) {
        ErrorResponse error = new ErrorResponse("USER_ALREADY_EXISTS", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> UserNotFoundException(UserNotFoundException e) {
        ErrorResponse error = new ErrorResponse("USER_NOT_FOUND", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RoleNotFoundException.class)
    public ResponseEntity<ErrorResponse> RoleNotFoundException(RoleNotFoundException e) {
        ErrorResponse error = new ErrorResponse("ROLE_NOT_FOUND", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponse> InvalidCredentialsException(InvalidCredentialsException e) {
        ErrorResponse error = new ErrorResponse("INVALID_CREDENTIALS", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccountNotVerifiedException.class)
    public ResponseEntity<ErrorResponse> AccountNotVerifiedException(AccountNotVerifiedException e) {
        ErrorResponse error = new ErrorResponse("ACCOUNT_NOT_VERIFIED", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(VerificationCodeExpiredException.class)
    public ResponseEntity<ErrorResponse> VerificationCodeExpiredException(VerificationCodeExpiredException e) {
        ErrorResponse error = new ErrorResponse("VERIFICATION_CODE_EXPIRED", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidVerificationCodeException.class)
    public ResponseEntity<ErrorResponse> InvalidVerificationCodeException(InvalidVerificationCodeException e) {
        ErrorResponse error = new ErrorResponse("INVALID_VERIFICATION_CODE", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccountAlreadyVerifiedException.class)
    public ResponseEntity<ErrorResponse> AccountAlreadyVerifiedException(AccountAlreadyVerifiedException e) {
        ErrorResponse error = new ErrorResponse("ACCOUNT_ALREADY_VERIFIED", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception e) {
        ErrorResponse error = new ErrorResponse("INTERNAL_SERVER_ERROR", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(IncorrectPasswordException.class)
    public ResponseEntity<ErrorResponse> IncorrectPasswordExceptionException(IncorrectPasswordException e) {
        ErrorResponse error = new ErrorResponse("INCORRECT_PASSWORD", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }
}
