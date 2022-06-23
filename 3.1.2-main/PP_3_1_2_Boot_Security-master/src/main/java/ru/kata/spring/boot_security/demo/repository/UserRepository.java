package ru.kata.spring.boot_security.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select user FROM User user join fetch user.roles where user.email =:email")
    User findByEmail(String email);
}
