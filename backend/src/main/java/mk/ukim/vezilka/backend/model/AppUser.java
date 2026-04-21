package mk.ukim.vezilka.backend.model;

import jakarta.persistence.*;
import mk.ukim.vezilka.backend.model.enums.Role;

import java.time.LocalDateTime;

@Entity
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String firstName;
    private String lastName;

    @Enumerated(EnumType.STRING)
    private Role role;

    private int points;
    private int level;

    private double trustScore;

    private LocalDateTime createdAt;
}
