package mk.ukim.vezilka.backend.model;

import jakarta.persistence.*;
import mk.ukim.vezilka.backend.model.enums.ReviewDecision;

import java.time.LocalDateTime;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Content content;

    @ManyToOne
    private AppUser reviewer;

    @Enumerated(EnumType.STRING)
    private ReviewDecision decision;

    private String comment;

    private LocalDateTime createdAt;
}
