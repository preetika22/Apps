package com.example.demo.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "recipes")

public class Recipe {
    @Id
    private String id;
    private String name;
    private List<String> ingredients; // List of ingredient names
    private String instructions;
    private String familyId;

    public Recipe() {
    }

    public Recipe(String name, List<String> ingredients, String instructions, String familyId) {
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.familyId = familyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getFamilyId() {
        return familyId;
    }

    public void setFamilyId(String familyId) {
        this.familyId = familyId;
    }
}
