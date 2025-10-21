package com.example.EHR_service.Utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class Jsonutils {
    private static final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule());

    public static String toJson(Object object){
        try{
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static <T> T fromJson(String json,Class<T>clazz){
        try{
            return objectMapper.readValue(json,clazz);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
