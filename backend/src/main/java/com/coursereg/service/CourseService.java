package com.coursereg.service;

import com.coursereg.dto.CourseRequest;
import com.coursereg.exception.ResourceNotFoundException;
import com.coursereg.model.Course;
import com.coursereg.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(String id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
    }

    public Course createCourse(CourseRequest request) {
        Course course = new Course();
        course.setName(request.getName());
        course.setInstructor(request.getInstructor());
        course.setDescription(request.getDescription());
        course.setDuration(request.getDuration());
        course.setPrice(request.getPrice());
        course.setImage(request.getImage() != null ? request.getImage() : "📚");

        return courseRepository.save(course);
    }

    public Course updateCourse(String id, CourseRequest request) {
        Course course = getCourseById(id);
        
        course.setName(request.getName());
        course.setInstructor(request.getInstructor());
        course.setDescription(request.getDescription());
        course.setDuration(request.getDuration());
        course.setPrice(request.getPrice());
        if (request.getImage() != null) {
            course.setImage(request.getImage());
        }

        return courseRepository.save(course);
    }

    public void deleteCourse(String id) {
        Course course = getCourseById(id);
        courseRepository.delete(course);
    }

    public List<Course> searchCourses(String query) {
        return courseRepository.findByNameContainingIgnoreCase(query);
    }
}
