package com.productReview.service;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.productReview.dto.AddressDto;
import com.productReview.dto.UpdateAddressDto;
import com.productReview.entity.Address;
import com.productReview.entity.Users;

@Repository
public interface IAdressService {

	Address addAddress(AddressDto address, String token);

	Users deleteAddress(String token, Long addressId);

	Address updateAddress(UpdateAddressDto address, String token);

	List<Address> getAllAddress();

	Address getAddress(Long id);

	List<Address> getAddressByUserId(String token);

	Address getAddress(String type, String token);

}
