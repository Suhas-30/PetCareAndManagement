package com.example.PetCare.user.service.impl;

import com.example.PetCare.user.domain.Role;
import com.example.PetCare.user.domain.User;
import com.example.PetCare.user.domain.UserStatus;
import com.example.PetCare.user.dto.DoctorListResponse;
import com.example.PetCare.user.repository.UserRepository;
import com.example.PetCare.user.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public List<DoctorListResponse> getAllDoctors() {

        List<User> doctors =
                userRepository.findByRoleAndUserStatus(
                        Role.DOCTOR,
                        UserStatus.ACTIVE
                );

        return doctors.stream()
                .map(DoctorListResponse::from)
                .toList();
    }
}
