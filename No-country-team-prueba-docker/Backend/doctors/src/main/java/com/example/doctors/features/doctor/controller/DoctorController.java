package com.example.doctors.features.doctor.controller;

import com.example.doctors.config.responses.DataResponse;
import com.example.doctors.features.doctor.dto.DoctorRegisterDTO;
import com.example.doctors.features.doctor.dto.DoctorResponseDTO;
import com.example.doctors.features.doctor.dto.DoctorUpdateDTO;
import com.example.doctors.features.doctor.service.IDoctorService;
import com.example.doctors.shared.util.PaginationResponseBuilder;
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
@Tag(name = "Doctor", description = "Operaciones relacionadas con la gestión de doctores")
public class DoctorController {

    private final IDoctorService doctorService;

    public DoctorController(IDoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @Operation(
            summary = "Crear un nuevo doctor",
            description = "Ingresa todos los datos relacionados al doctor",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Tipo de habitación creado exitosamente"),
                    @ApiResponse(responseCode = "400", description = "Datos inválidos", content = @Content)
            }
    )
    @PostMapping
    @Transactional
    public ResponseEntity<DataResponse<DoctorResponseDTO>> create(
            @RequestBody @Valid DoctorRegisterDTO doctorRegisterDTO,
            UriComponentsBuilder uriComponentsBuilder) {
        DoctorResponseDTO doctorResponseDTO = doctorService.create(doctorRegisterDTO);
        URI url = uriComponentsBuilder.path("/doctors/{id}").buildAndExpand(doctorResponseDTO.id()).toUri();
        DataResponse<DoctorResponseDTO> response = new DataResponse<>(
                "Doctor creado con éxito",
                HttpStatus.CREATED.value(),
                doctorResponseDTO
        );
        return ResponseEntity.created(url).body(response);
    }

    @Operation(
            summary = "Eliminar un doctor por ID",
            description = "El doctor debe existir y estar habilitado",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Doctor eliminado exitosamente"),
                    @ApiResponse(responseCode = "404", description = "Doctor no encontrado", content = @Content)
            }
    )
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        doctorService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Listar doctores",
            description = "Muestra registros paginados",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Lista de reservas")
            }
    )
    @GetMapping
    public Map<String, Object> findAll(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        Page<DoctorResponseDTO> doctorPage = doctorService.findAll(pageable);
        return PaginationResponseBuilder.build(doctorPage);
    }

    @Operation(
            summary = "Obtener un doctor por su ID",
            description = "El doctor debe existir y estar habilitado",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Doctor encontrado"),
                    @ApiResponse(responseCode = "404", description = "Doctor no encontrado", content = @Content)
            }
    )
    @GetMapping("/{id}")
    public DoctorResponseDTO findById(@PathVariable Long id) {
        return doctorService.findById(id);
    }

    @Operation(
            summary = "Actualizar un doctor existente",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Doctor actualizado exitosamente"),
                    @ApiResponse(responseCode = "400", description = "Datos inválidos", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Doctor no encontrado", content = @Content)
            }
    )
    @PutMapping("/{id}")
    @Transactional
    public DoctorResponseDTO update(@PathVariable Long id,
                                    @RequestBody @Valid DoctorUpdateDTO doctorUpdateDTO) {
        return doctorService.update(id, doctorUpdateDTO);
    }
}
