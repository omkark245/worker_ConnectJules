package com.example.workerapp.repository;
import com.example.workerapp.model.WorkerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface WorkerProfileRepository extends JpaRepository<WorkerProfile, Long> {
    List<WorkerProfile> findByCityAndArea(String city, String area);
    List<WorkerProfile> findByCity(String city);
}
