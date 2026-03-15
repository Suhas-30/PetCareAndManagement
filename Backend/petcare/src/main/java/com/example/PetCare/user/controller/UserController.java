package com.example.PetCare.user.controller;

import com.example.PetCare.common.exception.AppException;
import com.example.PetCare.common.response.ApiResponse;
import com.example.PetCare.common.security.UserPrincipal;
import com.example.PetCare.doctor.domain.DoctorApplication;
import com.example.PetCare.user.domain.User;
import com.example.PetCare.user.dto.DoctorListResponse;
import com.example.PetCare.user.dto.UserProfileResponse;
import com.example.PetCare.user.repository.UserRepository;
import com.example.PetCare.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;
    public  UserController(UserRepository userRepository,
                           UserService userService){
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getMe(@AuthenticationPrincipal UserPrincipal user){
        User userInfo = userRepository.findByEmail(user.getEmail())
                .orElseThrow(()-> new AppException("User not found"));
        UserProfileResponse response = new UserProfileResponse(
                                        userInfo.getId(),
                                        userInfo.getFullName(),
                                        userInfo.getEmail(),
                                        userInfo.getRole().name()
                                        );
        return ResponseEntity.ok(
                new ApiResponse<>(true, "User Fetched", response)
        );
    }

    @GetMapping("/doctors")
    public ApiResponse<List<DoctorListResponse>> getDoctors() {
        return new ApiResponse<>(true, "Doctor Successfully featched", userService.getAllDoctors());
    }
}
