package com.example.workerapp.service;

import com.example.workerapp.model.JobAd;
import com.example.workerapp.model.Role;
import com.example.workerapp.model.User;
import com.example.workerapp.model.Wallet;
import com.example.workerapp.repository.JobAdRepository;
import com.example.workerapp.repository.JobInteractionRepository;
import com.example.workerapp.repository.UserRepository;
import com.example.workerapp.repository.WalletRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JobAdServiceTest {

    @Mock
    private JobAdRepository jobAdRepository;
    @Mock
    private JobInteractionRepository interactionRepository;
    @Mock
    private WalletRepository walletRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private JobAdService jobAdService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testViewJobContactFree() {
        User worker = User.builder().username("worker").role(Role.WORKER).build();
        JobAd job = JobAd.builder().id(1L).customer(User.builder().email("cust@ex.com").build()).build();

        when(userRepository.findByUsername("worker")).thenReturn(Optional.of(worker));
        when(interactionRepository.existsByWorkerAndJobId(worker, 1L)).thenReturn(false);
        when(interactionRepository.countByWorker(worker)).thenReturn(5L); // Less than 10
        when(jobAdRepository.findById(1L)).thenReturn(Optional.of(job));

        String result = jobAdService.viewJobContact(1L, "worker");

        assertTrue(result.contains("cust@ex.com"));
        verify(interactionRepository, times(1)).save(any());
        verify(walletRepository, never()).save(any());
    }

    @Test
    void testViewJobContactPaid() {
        User worker = User.builder().username("worker").role(Role.WORKER).build();
        JobAd job = JobAd.builder().id(1L).customer(User.builder().email("cust@ex.com").build()).build();
        Wallet wallet = Wallet.builder().worker(worker).balance(200.0).build();

        when(userRepository.findByUsername("worker")).thenReturn(Optional.of(worker));
        when(interactionRepository.existsByWorkerAndJobId(worker, 1L)).thenReturn(false);
        when(interactionRepository.countByWorker(worker)).thenReturn(10L); // Limit reached
        when(jobAdRepository.findById(1L)).thenReturn(Optional.of(job));
        when(walletRepository.findByWorker(worker)).thenReturn(Optional.of(wallet));

        String result = jobAdService.viewJobContact(1L, "worker");

        assertTrue(result.contains("cust@ex.com"));
        assertEquals(100.0, wallet.getBalance());
        verify(walletRepository, times(1)).save(wallet);
    }

    @Test
    void testViewJobContactInsufficientBalance() {
        User worker = User.builder().username("worker").role(Role.WORKER).build();
        JobAd job = JobAd.builder().id(1L).customer(User.builder().email("cust@ex.com").build()).build();
        Wallet wallet = Wallet.builder().worker(worker).balance(50.0).build();

        when(userRepository.findByUsername("worker")).thenReturn(Optional.of(worker));
        when(interactionRepository.existsByWorkerAndJobId(worker, 1L)).thenReturn(false);
        when(interactionRepository.countByWorker(worker)).thenReturn(10L);
        when(walletRepository.findByWorker(worker)).thenReturn(Optional.of(wallet));

        assertThrows(RuntimeException.class, () -> jobAdService.viewJobContact(1L, "worker"));
    }
}
