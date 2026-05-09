package mk.ukim.vezilka.backend.service.impl;

import mk.ukim.vezilka.backend.model.AppUser;
import mk.ukim.vezilka.backend.model.exceptions.UserNotFoundException;
import mk.ukim.vezilka.backend.repository.AppUserRepository;
import mk.ukim.vezilka.backend.service.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final AppUserRepository appUserRepository;

    public UserServiceImpl(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public AppUser editUser(String email, String firstName, String lastName, String phoneNumber, String location, String biography) {
        AppUser user = getUserByEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPhoneNumber(phoneNumber);
        user.setLocation(location);
        user.setBiography(biography);
        return appUserRepository.save(user);
    }

    @Override
    public AppUser getUserByEmail(String email) {
        return appUserRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
    }
}
