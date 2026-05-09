package mk.ukim.vezilka.backend.service;

import mk.ukim.vezilka.backend.model.Content;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileManagementService {
    Content uploadFile(String topic, String description, String transcription, boolean isPrivate, Long dialectId, MultipartFile file, String userEmail) throws IOException;
}
