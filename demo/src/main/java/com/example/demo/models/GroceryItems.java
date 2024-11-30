package com.example.demo.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "groceryItems")
public class GroceryItems {
        @Id
        private String id;
        private String name;
        private int quantity;

        private String category;
        private String familyId; // Link to a family for access control

        // Getters and setters

    public GroceryItems() {
    }

    public GroceryItems(String name, int quantity, String familyId) {
        this.name = name;
        this.quantity = quantity;
        this.familyId = familyId;
    }

    public GroceryItems(String name, int quantity, String category, String familyId) {
        this.name = name;
        this.quantity = quantity;
        this.category = category;
        this.familyId = familyId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getFamilyId() {
        return familyId;
    }

    public void setFamilyId(String familyId) {
        this.familyId = familyId;
    }
}

