package com.example.workerapp.repository;
import com.example.workerapp.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
