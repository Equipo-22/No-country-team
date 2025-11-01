package com.example.EHR_service;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
@OpenAPIDefinition(
        servers = {
                @Server(url = "http://localhost:8080/ehr", description = "EHR Service")
        }
)
@SpringBootApplication
@EnableFeignClients
public class EhrServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EhrServiceApplication.class, args);
	}

}
