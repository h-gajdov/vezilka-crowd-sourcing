package mk.ukim.vezilka.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.vezilka.backend.model.enums.Role;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String firstName;
    private String lastName;

    private String phoneNumber;
    private String location;
    private String biography;

    @Enumerated(EnumType.STRING)
    private Role role;

    private int points;
    private int level;

    private double trustScore;

    private LocalDateTime createdAt;

    public AppUser(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = Role.USER;
        this.points = 0;
        this.level = 1;
        this.trustScore = 0;
        this.createdAt = LocalDateTime.now();
    }
}
