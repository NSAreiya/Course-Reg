package com.coursereg.repository;

import com.coursereg.model.Enrollment;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnrollmentRepository extends MongoRepository<Enrollment, String> {
    
    Optional<Enrollment> findByEmailAndCourseName(String email, String courseName);
    
    List<Enrollment> findByUsername(String username);
    
    boolean existsByEmailAndCourseName(String email, String courseName);
}
