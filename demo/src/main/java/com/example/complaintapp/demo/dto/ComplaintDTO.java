package com.example.complaintapp.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ComplaintDTO {
    private long id;
    private String category;
    private String department;
    private String description;
    private String studentName;
    private String status;
    private LocalDateTime createdAt;
}