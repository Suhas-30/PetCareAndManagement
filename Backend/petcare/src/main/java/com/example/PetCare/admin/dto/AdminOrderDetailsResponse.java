package com.example.PetCare.admin.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class AdminOrderDetailsResponse {

    private String orderId;
    private LocalDateTime createdAt;
    private String status;
    private BigDecimal totalAmount;

    /* USER */
    private String userName;
    private String email;
    private String phone;

    /* ADDRESS */
    private String addressLine;
    private String city;
    private String pincode;

    /* PRODUCTS */
    private List<Item> items;

    @Data
    @Builder
    public static class Item {
        private String productName;
        private Integer quantity;
        private BigDecimal price;
        private BigDecimal total;
    }
}