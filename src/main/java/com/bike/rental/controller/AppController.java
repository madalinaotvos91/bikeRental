package com.bike.rental.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * App controller for rendering the index file and sub files, views on server side.
 */

@Controller
public class AppController {

    @RequestMapping("/")
    String home(ModelMap modal) {
        modal.addAttribute("title","Bike Rental");
        return "index";
    }

    @RequestMapping("/partials/{page}")
    String partialHandler(@PathVariable("page") final String page) {
        return page;
    }

}
