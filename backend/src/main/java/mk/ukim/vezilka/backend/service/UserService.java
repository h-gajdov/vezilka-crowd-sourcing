package mk.ukim.vezilka.backend.service;

import mk.ukim.vezilka.backend.model.AppUser;

public interface UserService {
    AppUser editUser(String email, String firstName, String lastName, String phoneNumber,  String location, String biography);

    AppUser getUserByEmail(String email);
}
