package com.example.appointment_service;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;

@OpenAPIDefinition(
        servers = {
                @Server(url = "http://localhost:8080/appointment", description = "Appointment Service")
        }
)
@SpringBootApplication
@EnableFeignClients
@EnableScheduling
public class AppointmentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppointmentServiceApplication.class, args);
	}

}
