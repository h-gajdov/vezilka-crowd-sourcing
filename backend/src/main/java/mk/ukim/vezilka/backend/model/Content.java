package mk.ukim.vezilka.backend.model;

import jakarta.persistence.*;
import mk.ukim.vezilka.backend.model.enums.ContentStatus;
import mk.ukim.vezilka.backend.model.enums.ContentType;

import java.time.LocalDateTime;

@Entity
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ContentType type;

    private String fileUrl;
    private String topic;
    private String dialect;
    private String description;

    @Enumerated(EnumType.STRING)
    private ContentStatus status;

    private double qualityScore;

    private LocalDateTime createdAt;

    @ManyToOne
    private AppUser uploader;
}
