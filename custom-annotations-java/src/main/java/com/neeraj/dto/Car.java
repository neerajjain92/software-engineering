package com.neeraj.dto;

import com.neeraj.annotation.JsonField;

/**
 * @author neeraj on 16/09/20
 * Copyright (c) 2019, custom-annotations-java.
 * All rights reserved.
 */
public class Car {

    @JsonField("manufacturer")
    private final String make;

    @JsonField
    private final String model;

    @JsonField("yearOfManufacturer")
    private final String year;

    public Car(String make, String model, String year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    public String getMake() {
        return make;
    }

    public String getModel() {
        return model;
    }

    public String getYear() {
        return year;
    }

    @Override
    public String toString() {
        return "Car{" +
                "make='" + make + '\'' +
                ", model='" + model + '\'' +
                ", year='" + year + '\'' +
                '}';
    }
}
