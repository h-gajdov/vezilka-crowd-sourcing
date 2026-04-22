package mk.ukim.vezilka.backend.service.impl;

import mk.ukim.vezilka.backend.model.AppUser;
import mk.ukim.vezilka.backend.model.exceptions.InvalidCredentialsException;
import mk.ukim.vezilka.backend.model.exceptions.UserAlreadyExistsException;
import mk.ukim.vezilka.backend.model.exceptions.UserNotFoundException;
import mk.ukim.vezilka.backend.repository.AppUserRepository;
import mk.ukim.vezilka.backend.service.AuthService;
import mk.ukim.vezilka.backend.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(AppUserRepository appUserRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AppUser register(String firstName, String lastName, String email, String password) {
        if(firstName == null || firstName.isEmpty())
            throw new InvalidParameterException("First name can't be empty!");
        if(lastName == null || lastName.isEmpty())
            throw new InvalidParameterException("Last name can't be empty!");
        if(email == null || email.isEmpty())
            throw new InvalidParameterException("Email can't be empty!");
        if(password == null || password.isEmpty())
            throw new InvalidParameterException("Password name can't be empty!");

        if(appUserRepository.findByEmail(email).isPresent())
            throw new UserAlreadyExistsException(email);

        AppUser user = new AppUser(firstName, lastName, email, passwordEncoder.encode(password));
        return appUserRepository.save(user);
    }

    @Override
    public AppUser login(String email, String password) {
        Optional<AppUser> userOptional = appUserRepository.findByEmail(email);
        if(userOptional.isEmpty())
            throw new UserNotFoundException(email);

        AppUser user = userOptional.get();
        if(!passwordEncoder.matches(password, user.getPassword()))
            throw new InvalidCredentialsException();

        return user;
    }
}
