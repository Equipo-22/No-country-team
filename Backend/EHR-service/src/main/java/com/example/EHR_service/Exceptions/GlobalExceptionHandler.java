package com.example.EHR_service.Exceptions;

import ca.uhn.fhir.rest.server.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFound(ResourceNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, "Recurso no encontrado: " + ex.getMessage());
    }

    @ExceptionHandler(FhirApiException.class)
    public ResponseEntity<?> handleFhirApi(FhirApiException ex) {
        return buildResponse(HttpStatus.valueOf(ex.getStatusCode()), ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneric(Exception ex) {
        // Por si ocurre algo fuera de HAPI
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR,
                "Error interno: " + ex.getMessage());
    }

    private ResponseEntity<?> buildResponse(HttpStatus status, String message) {
        return ResponseEntity.status(status)
                .body(Map.of("status", status.value(), "error", message));
    }
}