package com.coursereg.service;

import com.coursereg.dto.EnrollmentRequest;
import com.coursereg.exception.DuplicateResourceException;
import com.coursereg.exception.ResourceNotFoundException;
import com.coursereg.model.Enrollment;
import com.coursereg.repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    public Enrollment enrollInCourse(EnrollmentRequest request) {
        // Check for duplicate enrollment
        if (enrollmentRepository.existsByEmailAndCourseName(request.getEmail(), request.getCourse())) {
            throw new DuplicateResourceException("You are already enrolled in this course");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudentName(request.getName());
        enrollment.setEmail(request.getEmail());
        enrollment.setCourseName(request.getCourse());
        enrollment.setUsername(request.getUsername());

        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public List<Enrollment> getEnrollmentsByUsername(String username) {
        return enrollmentRepository.findByUsername(username);
    }

    public Enrollment getEnrollmentById(String id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with id: " + id));
    }
}
