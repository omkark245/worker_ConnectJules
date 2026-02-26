package com.example.workerapp.repository;
import com.example.workerapp.model.JobAd;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface JobAdRepository extends JpaRepository<JobAd, Long> {
    List<JobAd> findByCity(String city);
    List<JobAd> findByStatus(String status);
}
