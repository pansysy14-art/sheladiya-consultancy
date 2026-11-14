package com.sheladiya.consultancy.controller;

import com.sheladiya.consultancy.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> healthCheck() {
        Map<String, Object> status = new HashMap<>();
        status.put("service", "Sheladiya Consultancy API");
        status.put("status", "UP");
        status.put("version", "1.0.0");
        status.put("motto", "Truth • Honesty • Discipline");
        return ResponseEntity.ok(ApiResponse.ok(status));
    }
}
