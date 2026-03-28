package com.example.PetCare.booking.marketplace.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.json.JSONObject;

@Data
@AllArgsConstructor
public class RazorpayOrderResponse {

    private String id;
    private Integer amount;
    private String currency;

    public static RazorpayOrderResponse fromJson(String json) {

        JSONObject obj = new JSONObject(json);

        return new RazorpayOrderResponse(
                obj.getString("id"),
                obj.getInt("amount"),
                obj.getString("currency")
        );
    }
}