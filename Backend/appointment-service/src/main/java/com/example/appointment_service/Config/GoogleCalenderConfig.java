package com.example.appointment_service.Config;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Objects;

@Configuration
public class GoogleCalenderConfig {

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    @Value("${google.credentials.path}")
    private String credentialsPath;

    @Value("${google.workspace.user}")
    private String workspaceUser;

    @Value("${google.application.name}")
    private String applicationName;

    @Bean
    public Calendar googleCalenderService() throws IOException, GeneralSecurityException {
        GoogleCredentials credentials = GoogleCredentials.fromStream(
                Objects.requireNonNull(getClass().getClassLoader().getResourceAsStream(credentialsPath))
        ).createScoped(Collections.singleton(CalendarScopes.CALENDAR))
         .createDelegated(workspaceUser);

        return new Calendar.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                new HttpCredentialsAdapter(credentials)
        )
        .setApplicationName(applicationName)
        .build();
    }
}
