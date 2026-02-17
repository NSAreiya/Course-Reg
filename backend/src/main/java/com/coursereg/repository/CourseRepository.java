package com.coursereg.repository;

import com.coursereg.model.Course;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
    
    Optional<Course> findByName(String name);
    
    List<Course> findByInstructorContainingIgnoreCase(String instructor);
    
    List<Course> findByNameContainingIgnoreCase(String name);
}
