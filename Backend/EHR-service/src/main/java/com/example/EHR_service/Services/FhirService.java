package com.example.EHR_service.Services;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.model.api.Include;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.server.exceptions.BaseServerResponseException;
import ca.uhn.fhir.rest.server.exceptions.ResourceNotFoundException;
import com.example.EHR_service.Exceptions.FhirApiException;
import org.hl7.fhir.r4.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Supplier;

@Service
public class FhirService {
    //http://localhost:8085/fhir/swagger-ui/
    private final IGenericClient client;

    public FhirService(@Value("${fhir.server.url}") String fhirServerUrl) {

        FhirContext ctx = FhirContext.forR4();
        this.client = ctx.newRestfulGenericClient(fhirServerUrl);
    }

    private <T> T executeSafely(Supplier<T> action, String notFoundMessage) {
        try {
            T result = action.get();
            if (result == null) {
                throw new ResourceNotFoundException(notFoundMessage);
            }
            return result;
        } catch (BaseServerResponseException e) {
            throw new FhirApiException("Error en servidor FHIR: " + e.getMessage(), e.getStatusCode());
        } catch (Exception e) {
            throw new FhirApiException("Error interno: " + e.getMessage(), 500);
        }
    }

    public Patient getPatient(String id) {
        return executeSafely(() -> client
                .read()
                .resource(Patient.class)
                .withId(id)
                .execute(),"No se encontro el paciente con ID :"+id);
    }

    public Practitioner createPractitioner(Practitioner practitioner) {
        return (Practitioner) client
                .create()
                .resource(practitioner)
                .execute()
                .getResource();
    }

    public Practitioner getPractitioner(String id) {
        return executeSafely(() ->client
                .read()
                .resource(Practitioner.class)
                .withId(id)
                .execute(),"No se encontro medico con ID: "+id);
    }

    public Observation createObservation(Observation observation) {
        return (Observation) client
                .create()
                .resource(observation)
                .execute()
                .getResource();
    }

    public Condition createCondition(Condition condition) {
        return (Condition) client
                .create()
                .resource(condition)
                .execute()
                .getResource();
    }

    public Encounter getEncounter(String id) {
        return executeSafely(() ->client
                .read()
                .resource(Encounter.class)
                .withId(id)
                .execute(),"No se encontro cita con ID: "+id);
    }
    public Encounter createEncounter(Encounter encounter) {
        return (Encounter) client
                .create()
                .resource(encounter)
                .execute()
                .getResource();
    }

    public MedicationRequest createMedicationRequest(MedicationRequest medicationRequest) {
        return (MedicationRequest) client
                .create()
                .resource(medicationRequest)
                .execute()
                .getResource();
    }

    public Bundle getPatientEncountersWithRelatedResources(String patientId, int page, int size) {
        getPatient(patientId);
        return client
                .search()
                .forResource(Encounter.class)
                .where(Encounter.PATIENT.hasId(patientId))
                .count(size)
                .offset(page * size)
                .include(Encounter.INCLUDE_SUBJECT)
                .revInclude(Observation.INCLUDE_ENCOUNTER)
                .revInclude(Condition.INCLUDE_ENCOUNTER)
                .revInclude(MedicationRequest.INCLUDE_ENCOUNTER)
                .returnBundle(Bundle.class)
                .execute();
    }

    public Bundle getEncounterWithRelatedResources(String encounterId) {
        getEncounter(encounterId);
        return client
                .search()
                .forResource(Encounter.class)
                .where(Encounter.RES_ID.exactly().code(encounterId))
                .revInclude(Observation.INCLUDE_ENCOUNTER)
                .revInclude(Condition.INCLUDE_ENCOUNTER)
                .revInclude(MedicationRequest.INCLUDE_ENCOUNTER)
                .returnBundle(Bundle.class)
                .execute();
    }
}
