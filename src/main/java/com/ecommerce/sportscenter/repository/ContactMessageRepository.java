package com.ecommerce.sportscenter.repository;

import com.ecommerce.sportscenter.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}
