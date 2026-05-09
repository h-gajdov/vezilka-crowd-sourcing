package mk.ukim.vezilka.backend.repository;

import mk.ukim.vezilka.backend.model.Transcription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TranscriptionRepository extends JpaRepository<Transcription, Long> {
}
