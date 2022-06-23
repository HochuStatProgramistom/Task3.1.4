package ru.kata.spring.boot_security.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import ru.kata.spring.boot_security.demo.domain.Role;
import ru.kata.spring.boot_security.demo.domain.User;
import ru.kata.spring.boot_security.demo.service.UserService;

@SpringBootApplication
public class SpringBootSecurityDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootSecurityDemoApplication.class, args);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    CommandLineRunner run(UserService personService) {
        return args -> {
            personService.saveRole(new Role(null, "ROLE_USER"));
            personService.saveRole(new Role(null, "ROLE_ADMIN"));

            User user = new User();
            user.setFirstName("admin");
            user.setLastName("admin");
            user.setAge(40);
            user.setEmail("admin@mail.ru");
            user.setPassword("admin");
            personService.savePerson(user);

            personService.addRoleToPerson(user.getUsername(), "ROLE_ADMIN");


            User user1 = new User();
            user1.setFirstName("user");
            user1.setLastName("user");
            user1.setAge(30);
            user1.setEmail("user@mail.ru");
            user1.setPassword("1");
            personService.savePerson(user1);
        };
    }
}
