package mk.ukim.vezilka.backend.model;

import jakarta.persistence.*;
import mk.ukim.vezilka.backend.model.enums.RedemptionStatus;

import java.time.LocalDateTime;

@Entity
public class Redemption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private AppUser user;

    @ManyToOne
    private Reward reward;

    private int pointsUsed;

    @Enumerated(EnumType.STRING)
    private RedemptionStatus status;

    private LocalDateTime createdAt;
}
