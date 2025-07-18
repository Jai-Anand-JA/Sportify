package com.ecommerce.sportscenter.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.ecommerce.sportscenter.dto.ContactForm;
import com.ecommerce.sportscenter.entity.ContactMessage;
import com.ecommerce.sportscenter.repository.ContactMessageRepository;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactMessageRepository contactRepo;

    public ContactController(ContactMessageRepository contactRepo) {
        this.contactRepo = contactRepo;
    }

    @PostMapping
    public ResponseEntity<String> handleContact(@RequestBody ContactForm form) {
        ContactMessage message = new ContactMessage();
        message.setName(form.getName());
        message.setEmail(form.getEmail());
        message.setMessage(form.getMessage());

        contactRepo.save(message);

        return ResponseEntity.ok("Message saved successfully!");
    }
}
