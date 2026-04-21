package mk.ukim.vezilka.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Transcription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Content content;

    private String text;
    private boolean isFinal;
    private LocalDateTime createdAt;
}
