package com.catalog.cloudapp.repository;

import com.catalog.cloudapp.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByNameContainingIgnoreCase(String name);
    List<Application> findByCategoryIgnoreCase(String category);
    List<Application> findTop10ByOrderByUsageCountDesc();
    List<Application> findByCategoryAndIdNot(String category, Long id);
}