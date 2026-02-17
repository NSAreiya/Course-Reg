package com.coursereg.controller;

import com.coursereg.dto.ApiResponse;
import com.coursereg.dto.CourseRequest;
import com.coursereg.model.Course;
import com.coursereg.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable String id) {
        Course course = courseService.getCourseById(id);
        return ResponseEntity.ok(course);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> createCourse(@Valid @RequestBody CourseRequest request) {
        Course course = courseService.createCourse(request);
        ApiResponse response = new ApiResponse(true, "Course created successfully", course);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updateCourse(@PathVariable String id, 
                                                     @Valid @RequestBody CourseRequest request) {
        Course course = courseService.updateCourse(id, request);
        ApiResponse response = new ApiResponse(true, "Course updated successfully", course);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteCourse(@PathVariable String id) {
        courseService.deleteCourse(id);
        ApiResponse response = new ApiResponse(true, "Course deleted successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Course>> searchCourses(@RequestParam String query) {
        List<Course> courses = courseService.searchCourses(query);
        return ResponseEntity.ok(courses);
    }
}
