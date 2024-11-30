package com.example.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "shopping_list")

public class ShoppingListItem {

    @Id
    private String id;  // MongoDB _id field

    private String name;
    private int quantity;
    private String familyId;
    private String category;

    // Default constructor
    public ShoppingListItem() {}

    // Constructor with fields
    public ShoppingListItem(String id, String name, int quantity, String familyId, String category) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.familyId = familyId;
        this.category = category;
    }

    public ShoppingListItem(String name, int quantity, String familyId, String category) {
        this.name = name;
        this.quantity = quantity;
        this.familyId = familyId;
        this.category = category;
    }

    public static ShoppingListItem ok(ShoppingListItem addedItem) {
        return addedItem;
    }

    // Getters and setters
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

    public String getFamilyId() {
        return familyId;
    }

    public void setFamilyId(String familyId) {
        this.familyId = familyId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
