package com.example.workerapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "worker_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkerProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String name;
    private String city;
    private String area;
    private String category;
    private String description;

    @Builder.Default
    private Double rating = 0.0;

    @Builder.Default
    private Integer ratingCount = 0;

    @Builder.Default
    private Boolean isVerified = false;
}
