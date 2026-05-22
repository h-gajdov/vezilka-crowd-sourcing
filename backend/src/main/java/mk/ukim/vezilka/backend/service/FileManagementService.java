package mk.ukim.vezilka.backend.service;

import mk.ukim.vezilka.backend.model.Content;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileManagementService {
    Content uploadFile(String topic, String description, String transcription, boolean isPrivate, Long dialectId, MultipartFile file, String userEmail) throws IOException;

    Resource loadFileAsResource(String path);
    List<Content> getPendingFiles();
}
