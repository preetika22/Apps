package com.example.demo.controllers;

import com.example.demo.models.Recipe;
import com.example.demo.services.MealPlanning;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/mealplan")
public class MealPlanController {

    @Autowired
    private MealPlanning mealPlanning;

    // Endpoint to generate the meal plan for the day
    @GetMapping("/{familyId}")
    public ResponseEntity<List<Recipe>> getMealPlan(@PathVariable String familyId) {
        // Use the service to fetch recipes that can be made with available groceries
        List<Recipe> mealPlan = mealPlanning.getAvailableRecipes(familyId);

        // Return the generated meal plan as a JSON response
        return ResponseEntity.ok(mealPlan);
    }
}
