package com.example.workerapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private Double amount;
    private String type; // ADD_FUNDS, JOB_PAYMENT
    private String status; // SUCCESS, PENDING, FAILED
    private String razorpayPaymentId;

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
}
