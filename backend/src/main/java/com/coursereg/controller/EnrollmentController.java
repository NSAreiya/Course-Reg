package com.coursereg.controller;

import com.coursereg.dto.ApiResponse;
import com.coursereg.dto.EnrollmentRequest;
import com.coursereg.model.Enrollment;
import com.coursereg.service.EnrollmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping
    public ResponseEntity<ApiResponse> enrollInCourse(@Valid @RequestBody EnrollmentRequest request) {
        Enrollment enrollment = enrollmentService.enrollInCourse(request);
        ApiResponse response = new ApiResponse(true, "Successfully enrolled in the course", enrollment);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Enrollment>> getAllEnrollments() {
        List<Enrollment> enrollments = enrollmentService.getAllEnrollments();
        return ResponseEntity.ok(enrollments);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<Enrollment>> getUserEnrollments(@PathVariable String username) {
        List<Enrollment> enrollments = enrollmentService.getEnrollmentsByUsername(username);
        return ResponseEntity.ok(enrollments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Enrollment> getEnrollmentById(@PathVariable String id) {
        Enrollment enrollment = enrollmentService.getEnrollmentById(id);
        return ResponseEntity.ok(enrollment);
    }
}
