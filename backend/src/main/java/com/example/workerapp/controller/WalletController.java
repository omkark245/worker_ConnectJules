package com.example.workerapp.controller;

import com.example.workerapp.model.Wallet;
import com.example.workerapp.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/wallet")
@RequiredArgsConstructor
public class WalletController {
    private final WalletService walletService;

    @GetMapping
    public ResponseEntity<Wallet> getWallet(Authentication authentication) {
        return ResponseEntity.ok(walletService.getWallet(authentication.getName()));
    }

    @PostMapping("/add-funds")
    public ResponseEntity<Wallet> addFunds(
            @RequestParam Double amount,
            @RequestParam String paymentId,
            Authentication authentication
    ) {
        return ResponseEntity.ok(walletService.addFunds(authentication.getName(), amount, paymentId));
    }
}
