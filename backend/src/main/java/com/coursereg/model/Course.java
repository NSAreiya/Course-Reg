package com.coursereg.model;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    private String id;

    private String name;

    private String instructor;

    private String description;

    private String duration;

    private Integer price;

    private String image;

    @CreatedDate
    private LocalDateTime createdAt = LocalDateTime.now();
}
