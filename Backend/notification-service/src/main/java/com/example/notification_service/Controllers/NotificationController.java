package com.example.notification_service.Controllers;

import com.example.notification_service.Models.Dtos.NotificationResponse;
import com.example.notification_service.Repositories.NotificationRepository;
import com.example.notification_service.Services.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @Operation(summary = "Obtener Notificaciones de paciente/doctor.", description = "Busca y obtiene las notificaciones de un paciente/doctor por su id.")
    @GetMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public List<NotificationResponse> getNotificationsByUserId(
            @PathVariable("userId") UUID userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String direction) {

        return notificationService.getAllNotificationsByUserId(userId,page,size,sortBy,direction);
    }

    @Operation(summary = "Borrar notificacion.", description = "Borra una notificacion por ID.")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteNotification(@PathVariable("id") UUID id) {
        notificationService.deleteNotification(id);
    }

    @Operation(summary = "Marcar notificacion como leida.", description = "Marca una notificacion como leida por su ID.")
    @PostMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void marcarNotificacionComoLeida(@PathVariable UUID id){
        notificationService.marcarNotificacionComoLeida(id);
    }
}
