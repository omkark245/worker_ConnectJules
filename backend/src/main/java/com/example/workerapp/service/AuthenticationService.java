package com.example.workerapp.service;

import com.example.workerapp.dto.AuthenticationRequest;
import com.example.workerapp.dto.AuthenticationResponse;
import com.example.workerapp.dto.RegisterRequest;
import com.example.workerapp.model.Role;
import com.example.workerapp.model.User;
import com.example.workerapp.model.WorkerProfile;
import com.example.workerapp.model.Wallet;
import com.example.workerapp.repository.UserRepository;
import com.example.workerapp.repository.WorkerProfileRepository;
import com.example.workerapp.repository.WalletRepository;
import com.example.workerapp.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final WorkerProfileRepository workerProfileRepository;
    private final WalletRepository walletRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        repository.save(user);

        if (request.getRole() == Role.WORKER) {
            var profile = WorkerProfile.builder()
                    .user(user)
                    .name(user.getUsername())
                    .city(request.getCity())
                    .area(request.getArea())
                    .category(request.getCategory())
                    .build();
            workerProfileRepository.save(profile);

            var wallet = Wallet.builder()
                    .worker(user)
                    .balance(0.0)
                    .build();
            walletRepository.save(wallet);
        }

        var jwtToken = jwtService.generateToken(new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.emptyList()
        ));
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole().name())
                .username(user.getUsername())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = repository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.emptyList()
        ));
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole().name())
                .username(user.getUsername())
                .build();
    }
}
