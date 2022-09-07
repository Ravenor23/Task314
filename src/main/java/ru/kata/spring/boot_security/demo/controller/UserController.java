package ru.kata.spring.boot_security.demo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@Controller
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping("/login")
    public String login() {
        return "users/login";
    }

    @GetMapping("/user")
    public String showUserInfo(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findByUsername(auth.getName());
        model.addAttribute("user", user);
        return "users/show";
    }

    @GetMapping("/admin/user/{id}")
    public String showUserById(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", userService.findById(id));
        return "users/show";
    }

    @GetMapping("/admin")
    public String findAll(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User admin = userService.findByUsername(auth.getName());

        List<User> users = userService.findAll();

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            model.addAttribute("adminJSON", objectMapper.writeValueAsString(admin));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        model.addAttribute("users", users);
        model.addAttribute("admin", admin);

        return "users/index";
    }
}
