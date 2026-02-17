package com.coursereg.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseRequest {

    @NotBlank(message = "Course name is required")
    private String name;

    @NotBlank(message = "Instructor name is required")
    private String instructor;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Duration is required")
    private String duration;

    @NotNull(message = "Price is required")
    private Integer price;

    private String image;
}
