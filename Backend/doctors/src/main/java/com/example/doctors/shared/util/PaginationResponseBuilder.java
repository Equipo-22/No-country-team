package com.example.doctors.shared.util;

import org.springframework.data.domain.Page;

import java.util.HashMap;
import java.util.Map;

public class PaginationResponseBuilder {
    public static <T> Map<String, Object> build(Page<T> pageData) {
        Map<String, Object> response = new HashMap<>();
        response.put("content", pageData.getContent());
        response.put("currentPage", pageData.getNumber());
        response.put("totalItems", pageData.getTotalElements());
        response.put("totalPages", pageData.getTotalPages());
        response.put("pageSize", pageData.getSize());
        response.put("hasNext", pageData.hasNext());
        response.put("hasPrevious", pageData.hasPrevious());
        return response;
    }
}
