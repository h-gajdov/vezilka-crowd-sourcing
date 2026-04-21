package mk.ukim.vezilka.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Annotation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Content content;

    private String label; // can be made enum
    private String value;

    private LocalDateTime createdAt;
}
