package com.productReview;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
@ComponentScan({"com.productReview"})


@SpringBootApplication
public class ProductReviewApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductReviewApplication.class, args);
	}
}
