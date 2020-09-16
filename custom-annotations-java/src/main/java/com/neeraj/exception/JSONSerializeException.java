package com.neeraj.exception;

/**
 * @author neeraj on 16/09/20
 * Copyright (c) 2019, custom-annotations-java.
 * All rights reserved.
 */
public class JSONSerializeException extends Exception {

    private static final long serialVersionUUID = -8845242379503538623L;

    public JSONSerializeException(final String message) {
        super(message);
    }
}
