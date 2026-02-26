package com.example.workerapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_interactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobInteraction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "worker_id", referencedColumnName = "id")
    private User worker;

    @ManyToOne
    @JoinColumn(name = "job_id", referencedColumnName = "id")
    private JobAd job;

    @Builder.Default
    private LocalDateTime accessedAt = LocalDateTime.now();
}
