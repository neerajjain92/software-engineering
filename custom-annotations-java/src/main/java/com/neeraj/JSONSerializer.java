package com.neeraj;

import com.neeraj.annotation.JsonField;
import com.neeraj.dto.Car;
import com.neeraj.exception.JSONSerializeException;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import static java.util.stream.Collectors.joining;

/**
 * @author neeraj on 16/09/20
 * Copyright (c) 2019, custom-annotations-java.
 * All rights reserved.
 */
public class JSONSerializer {

    public static String serialize(Object object) throws JSONSerializeException {
        try {
            Class objectClass = object.getClass();
            Map<String, String> jsonElements = new HashMap<>();

            for (Field field : objectClass.getDeclaredFields()) {
                field.setAccessible(true);
                if (field.isAnnotationPresent(JsonField.class)) {
                    jsonElements.put(getSerializedKey(field), (String) field.get(object));
                }
            }
            String jsonString = toJsonString(jsonElements);
            return jsonString;
        } catch (IllegalAccessException ex) {
            throw new JSONSerializeException(ex.getMessage());
        }
    }

    private static String toJsonString(Map<String, String> jsonElements) {
        String elementsString = jsonElements.entrySet()
                .stream()
                .map(entry -> "\"" + entry.getKey() + "\":\"" + entry.getValue() + "\"")
                .collect(joining(","));
        return "{" + elementsString + "}";
    }

    private static String getSerializedKey(Field field) {
        String annotationValue = field.getAnnotation(JsonField.class).value();
        return annotationValue.isEmpty() ? field.getName() : annotationValue;
    }

    public static void main(String[] args) throws JSONSerializeException {
        Car car = new Car("Ford", "F150", "2018");
        System.out.println(JSONSerializer.serialize(car));
    }
}
