package com.ecommerce.sportscenter.controller;

import com.ecommerce.sportscenter.dto.RegisterDto;
import com.ecommerce.sportscenter.entity.AppUser;
import com.ecommerce.sportscenter.service.AppUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register")
public class RegisterController {
    private final AppUserService userService;

    public RegisterController(AppUserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<AppUser> register(@RequestBody RegisterDto dto) {
        AppUser newUser = userService.registerUser(dto);
        return ResponseEntity.ok(newUser);
    }
}
