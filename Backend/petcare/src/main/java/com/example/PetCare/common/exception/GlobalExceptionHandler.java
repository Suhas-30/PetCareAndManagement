package com.example.PetCare.common.exception;

import com.example.PetCare.common.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.reactive.resource.NoResourceFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({AppException.class})
    public ResponseEntity<ApiResponse<Void>> handleAppException(AppException ex) {
        ApiResponse<Void> response = new ApiResponse(false, ex.getMessage(), (Object)null);
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ApiResponse<Void>> handleGenericException(Exception ex) {
        ex.printStackTrace();
        ApiResponse<Void> response = new ApiResponse(false, "Something went wrong", (Object)null);
        return ResponseEntity.internalServerError().body(response);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<ApiResponse<Void>> handleValidationException(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getFieldError().getDefaultMessage();
        ApiResponse<Void> response = new ApiResponse(false, errorMessage, (Object)null);
        return ResponseEntity.badRequest().body(response);
    }


}