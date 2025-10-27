package com.example.appointment_service.Config;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Objects;

@Configuration
public class GoogleCalenderConfig {

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String WORKSPACE_USER_EMAIL = "medihubb@midominiodemo.shop";

    @Bean
    public Calendar googleCalenderService() throws IOException, GeneralSecurityException {
        GoogleCredentials credentials=GoogleCredentials.fromStream(
                Objects.requireNonNull(getClass().getClassLoader().getResourceAsStream("google/credentials.json"))
        ).createScoped(Collections.singleton(CalendarScopes.CALENDAR))
                .createDelegated(WORKSPACE_USER_EMAIL);

        return new Calendar.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                new HttpCredentialsAdapter(credentials)
        )
                .setApplicationName("Appointment Service")
                .build();
    }
}
