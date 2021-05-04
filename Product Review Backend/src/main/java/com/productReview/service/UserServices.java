/**
 * 
 */
package com.productReview.service;

import java.util.List;

import com.productReview.dto.UserDto;
import com.productReview.entity.Users;
import com.productReview.request.LoginInformation;
import com.productReview.request.PasswordUpdate;

/**
 * @author HP
 *
 */
public interface UserServices {

	Users login(LoginInformation information);
	boolean register(UserDto ionformation);
	boolean verify(String token) throws Exception;
	boolean isUserExist(String email);
	boolean update(PasswordUpdate information, String token);
	List<Users> getUsers();
	Users getSingleUser(String token);
}