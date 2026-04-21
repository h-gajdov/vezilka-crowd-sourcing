package mk.ukim.vezilka.backend.repository;

import mk.ukim.vezilka.backend.model.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
}
