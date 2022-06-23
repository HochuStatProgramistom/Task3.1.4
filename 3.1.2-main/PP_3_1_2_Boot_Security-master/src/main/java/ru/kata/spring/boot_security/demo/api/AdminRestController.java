package ru.kata.spring.boot_security.demo.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.domain.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AdminRestController {
    private final UserService userService;

    @GetMapping("/api/admin")
    public List<User> readUsers() {
        return userService.getPersons();
    }

    @GetMapping("/api/admin/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.findByEmail(email));
    }

    @PostMapping("/api/admin")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.savePersonAnyRole(user));
    }

    @PutMapping("/api/admin/{email}")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.savePersonAnyRole(user));
    }

    @DeleteMapping("/api/admin/{email}")
    public void deleteUser(@PathVariable String email) {
        userService.deleteByEmail(email);
    }
}
