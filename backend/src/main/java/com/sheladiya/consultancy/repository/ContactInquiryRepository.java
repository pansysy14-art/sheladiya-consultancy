package com.sheladiya.consultancy.repository;

import com.sheladiya.consultancy.entity.ContactInquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactInquiryRepository extends JpaRepository<ContactInquiry, Long> {
    List<ContactInquiry> findByStatusOrderByCreatedAtDesc(String status);
    Page<ContactInquiry> findAllByOrderByCreatedAtDesc(Pageable pageable);
    long countByStatus(String status);
}
