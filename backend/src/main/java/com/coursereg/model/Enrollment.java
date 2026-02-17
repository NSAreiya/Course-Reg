package com.coursereg.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "enrollments")
@CompoundIndex(def = "{'email': 1, 'courseName': 1}", unique = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Enrollment {

    @Id
    private String id;

    private String studentName;

    private String email;

    private String courseName;

    private String username;

    @CreatedDate
    private LocalDateTime enrolledAt = LocalDateTime.now();
}

