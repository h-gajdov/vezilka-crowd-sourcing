package mk.ukim.vezilka.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.vezilka.backend.model.enums.ContentStatus;
import mk.ukim.vezilka.backend.model.enums.ContentType;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ContentType type;

    private String fileUrl;
    private String topic;

    @ManyToOne
    private Dialect dialect;

    private String description;

    @Enumerated(EnumType.STRING)
    private ContentStatus status;

    private double qualityScore;

    private LocalDateTime createdAt;

    @ManyToOne
    private AppUser uploader;

    public Content(ContentType type, String fileUrl, String topic, Dialect dialect, String description, AppUser uploader) {
        this.type = type;
        this.fileUrl = fileUrl;
        this.topic = topic;
        this.dialect = dialect;
        this.description = description;
        this.status = ContentStatus.PENDING;
        this.qualityScore = 0;
        this.createdAt = LocalDateTime.now();
        this.uploader = uploader;
    }
}
