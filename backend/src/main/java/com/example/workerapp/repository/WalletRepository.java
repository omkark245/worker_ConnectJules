package com.example.workerapp.repository;
import com.example.workerapp.model.Wallet;
import com.example.workerapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    Optional<Wallet> findByWorker(User worker);
}
