package com.example.workerapp.service;

import com.example.workerapp.model.Transaction;
import com.example.workerapp.model.User;
import com.example.workerapp.model.Wallet;
import com.example.workerapp.repository.TransactionRepository;
import com.example.workerapp.repository.UserRepository;
import com.example.workerapp.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class WalletService {
    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public Wallet getWallet(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return walletRepository.findByWorker(user).orElseThrow();
    }

    @Transactional
    public Wallet addFunds(String username, Double amount, String razorpayPaymentId) {
        User user = userRepository.findByUsername(username).orElseThrow();
        Wallet wallet = walletRepository.findByWorker(user).orElseThrow();

        wallet.setBalance(wallet.getBalance() + amount);
        walletRepository.save(wallet);

        Transaction transaction = Transaction.builder()
                .user(user)
                .amount(amount)
                .type("ADD_FUNDS")
                .status("SUCCESS")
                .razorpayPaymentId(razorpayPaymentId)
                .build();
        transactionRepository.save(transaction);

        return wallet;
    }
}
