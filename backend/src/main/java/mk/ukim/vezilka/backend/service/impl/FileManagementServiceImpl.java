package mk.ukim.vezilka.backend.service.impl;

import mk.ukim.vezilka.backend.model.Content;
import mk.ukim.vezilka.backend.model.enums.ContentType;
import mk.ukim.vezilka.backend.model.exceptions.InvalidFileException;
import mk.ukim.vezilka.backend.repository.ContentRepository;
import mk.ukim.vezilka.backend.service.FileManagementService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;

@Service
public class FileManagementServiceImpl implements FileManagementService {
    private final ContentRepository contentRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public FileManagementServiceImpl(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    private Content createContentEntity(ContentType type, String fileUrl, String topic, Long dialectId, String description, Long uploaderId) {
        Content content = new Content(type, fileUrl, topic, null, description, null);
        return contentRepository.save(content);
    }

    @Override
    public Content uploadFile(String topic, String description, Long dialectId, Long uploaderId, MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new InvalidFileException();
        }

        ContentType contentType = determineContentType(file.getContentType());
        String originalFilename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String finalFilename = UUID.randomUUID().toString() + "_" + originalFilename;

        Path userStoragePath = Paths.get(uploadDir)
                .resolve("users")
                .resolve(String.valueOf(uploaderId))
                .resolve("data");
        Files.createDirectories(userStoragePath);

        Path targetLocation = userStoragePath.resolve(finalFilename);
        file.transferTo(targetLocation);

        return createContentEntity(contentType, targetLocation.toString(), topic, dialectId, description, uploaderId);
    }

    private ContentType determineContentType(String mimeType) {
        if (mimeType == null) return ContentType.TEXT;

        if (mimeType.startsWith("image/")) return ContentType.IMAGE;
        if (mimeType.startsWith("audio/")) return ContentType.AUDIO;
        if (mimeType.startsWith("video/")) return ContentType.VIDEO;
        if (mimeType.startsWith("text/") || mimeType.contains("pdf")) return ContentType.TEXT;

        return ContentType.TEXT;
    }
}
