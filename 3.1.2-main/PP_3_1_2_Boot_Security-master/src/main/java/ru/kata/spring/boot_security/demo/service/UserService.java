package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetails;
import ru.kata.spring.boot_security.demo.domain.Role;
import ru.kata.spring.boot_security.demo.domain.User;

import java.util.List;

public interface UserService {
    User savePerson(User user);

    User savePersonAnyRole(User user);

    void deleteByEmail(String email);

    Role saveRole(Role role);

    void addRoleToPerson(String username, String roleName);

    User getPerson(String username);

    List<User> getPersons();


    public User findByEmail(String email);

    List<Role> getRoles();

    UserDetails loadUserByUsername(String email);
}
