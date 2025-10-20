package com.example.billing.features.billing.controller;

import com.example.billing.config.responses.DataResponse;
import com.example.billing.features.billing.dto.BillingRegisterDTO;
import com.example.billing.features.billing.dto.BillingResponseDTO;
import com.example.billing.features.billing.dto.BillingUpdateDTO;
import com.example.billing.features.billing.service.IBillingService;
import com.example.billing.shared.util.PaginationResponseBuilder;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Map;

@RestController
@Tag(name = "Billing", description = "Operaciones relacionadas con la gestión de facturas")
public class BillingController {
    private final IBillingService billingService;

    public BillingController(IBillingService billingService) {
        this.billingService = billingService;
    }

    @Operation(
            summary = "Crear una nueva factura",
            description = "Ingresa todos los datos relacionados a la factura",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Factura creada exitosamente"),
                    @ApiResponse(responseCode = "400", description = "Datos inválidos", content = @Content)
            }
    )
    @PostMapping
    @Transactional
    public ResponseEntity<DataResponse<BillingResponseDTO>> create(
            @RequestBody @Valid BillingRegisterDTO billingRegisterDTO,
            UriComponentsBuilder uriComponentsBuilder
    ) {
        BillingResponseDTO billingResponseDTO = billingService.create(billingRegisterDTO);
        URI url = uriComponentsBuilder.path("/billing/{id}").buildAndExpand(billingResponseDTO.id()).toUri();
        DataResponse<BillingResponseDTO> response = new DataResponse<>(
                "Factura creada con éxito",
                HttpStatus.CREATED.value(),
                billingResponseDTO
        );
        return ResponseEntity.created(url).body(response);
    }

    @Operation(
            summary = "Eliminar una factura por ID",
            description = "La factura debe existir y estar habilitada",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Factura eliminada exitosamente"),
                    @ApiResponse(responseCode = "404", description = "Factura no encontrada", content = @Content)
            }
    )
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        billingService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Listar facturas",
            description = "Muestra registros paginados",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Lista de facturas")
            }
    )
    @GetMapping
    public Map<String, Object> findAll(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        Page<BillingResponseDTO> billingPage = billingService.findAll(pageable);
        return PaginationResponseBuilder.build(billingPage);
    }

    @Operation(
            summary = "Obtener una factura por su ID",
            description = "La factura debe existir y estar habilitada",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Factura encontrada"),
                    @ApiResponse(responseCode = "404", description = "Factura no encontrada", content = @Content)
            }
    )
    @GetMapping("/{id}")
    public BillingResponseDTO findById(@PathVariable Long id) {
        return billingService.findById(id);
    }

    @Operation(
            summary = "Actualizar una factura existente",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Factura actualizada exitosamente"),
                    @ApiResponse(responseCode = "400", description = "Datos inválidos", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Factura no encontrada", content = @Content)
            }
    )
    @PutMapping("/{id}")
    @Transactional
    public BillingResponseDTO update(
            @PathVariable Long id,
            @RequestBody @Valid BillingUpdateDTO dto
    ) {
        return billingService.update(id, dto);
    }
}
