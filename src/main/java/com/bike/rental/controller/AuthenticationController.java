package com.bike.rental.controller;

import com.bike.rental.configuration.JwtTokenUtil;
import com.bike.rental.model.AuthToken;
import com.bike.rental.model.User;
import com.bike.rental.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/token", method = RequestMethod.POST)
    public ResponseEntity<AuthToken> register(@RequestBody User loginUser) throws AuthenticationException {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUser.getEmail(), loginUser.getPassword()));
        final User user = userService.findByEmail(loginUser.getEmail());
        final String token = jwtTokenUtil.generateToken(user);
        return new ResponseEntity<AuthToken>(new AuthToken(token, user.getEmail()), HttpStatus.OK);
    }

}
