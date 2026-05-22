package mk.ukim.vezilka.backend.repository;

import mk.ukim.vezilka.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
