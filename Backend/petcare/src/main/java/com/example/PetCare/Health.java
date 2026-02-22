package com.example.PetCare;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/alive")
public class Health {

    @GetMapping
    public String chekc(){
        return "Backend application live..";
    }
}
