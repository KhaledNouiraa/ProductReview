package com.productReview.dto;

import org.springframework.stereotype.Component;

import com.productReview.entity.Address;

import lombok.Data;

@Data
@Component
public class CustomerDto {
	
	private String Name;
	private long Phonenumber;
	private Address Home;
	private Address Work;
	private Address Other;
	
	
}
