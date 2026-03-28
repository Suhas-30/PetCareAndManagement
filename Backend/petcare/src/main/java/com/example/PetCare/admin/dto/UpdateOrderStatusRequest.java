package com.example.PetCare.admin.dto;

import com.example.PetCare.booking.marketplace.domain.OrderStatus;
import lombok.Data;

@Data
public class UpdateOrderStatusRequest {

    private OrderStatus status;

}