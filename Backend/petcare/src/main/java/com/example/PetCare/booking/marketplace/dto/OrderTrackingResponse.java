package com.example.PetCare.booking.marketplace.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderTrackingResponse {

    private String status;

    private LocalDateTime createdAt;
    private LocalDateTime paidAt;
    private LocalDateTime shippedAt;
    private LocalDateTime outForDeliveryAt;
    private LocalDateTime completedAt;

    private List<Item> items;

    @Data
    @Builder
    public static class Item {
        private String productName;
        private Integer quantity;
    }
}