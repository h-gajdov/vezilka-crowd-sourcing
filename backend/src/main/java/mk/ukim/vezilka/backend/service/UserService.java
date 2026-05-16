package mk.ukim.vezilka.backend.service;

import mk.ukim.vezilka.backend.model.AppUser;
import mk.ukim.vezilka.backend.model.Content;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
    AppUser editUser(String email, String firstName, String lastName, String phoneNumber,  String location, String biography);

    AppUser getUserByEmail(String email);

    AppUser editAvatarPicture(String email, MultipartFile file) throws IOException;

    List<Content> getUploadsByUser(String email);

    AppUser removeAvatarPicture(String email);
}
