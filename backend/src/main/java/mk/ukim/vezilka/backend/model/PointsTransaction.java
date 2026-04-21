package mk.ukim.vezilka.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class PointsTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private AppUser user;

    private int amount;
    private String reason; // can be enum

    private LocalDateTime createdAt;
}
