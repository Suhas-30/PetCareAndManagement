package com.example.PetCare.payment.service.impl;

import com.example.PetCare.payment.domain.Payment;
import com.example.PetCare.payment.domain.PaymentContextType;
import com.example.PetCare.payment.domain.PaymentStatus;
import com.example.PetCare.payment.repository.PaymentRepository;
import com.example.PetCare.payment.service.RazorpayService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RazorpayServiceImpl implements RazorpayService {

    private final PaymentRepository paymentRepository;

    @Value("${razorpay.key}")
    private String key;

    @Value("${razorpay.secret}")
    private String secret;

    @Override
    public String createOrder(UUID contextId,
                              PaymentContextType contextType,
                              int amount) throws Exception {

        RazorpayClient client = new RazorpayClient(key, secret);

        JSONObject options = new JSONObject();
        options.put("amount", amount * 100); // rupees → paise
        options.put("currency", "INR");
        options.put("receipt", "txn_" + System.currentTimeMillis());

        Order order = client.orders.create(options);

        // save payment record
        Payment payment = Payment.builder()
                .contextType(contextType)
                .contextId(contextId)
                .razorpayOrderId(order.get("id"))
                .amount(amount)
                .status(PaymentStatus.CREATED)
                .build();

        paymentRepository.save(payment);

        return order.toString();
    }

    @Override
    public boolean verifyPayment(String razorpayOrderId,
                                 String razorpayPaymentId,
                                 String razorpaySignature) throws Exception {

        JSONObject options = new JSONObject();
        options.put("razorpay_order_id", razorpayOrderId);
        options.put("razorpay_payment_id", razorpayPaymentId);
        options.put("razorpay_signature", razorpaySignature);

        return Utils.verifyPaymentSignature(options, secret);
    }
}