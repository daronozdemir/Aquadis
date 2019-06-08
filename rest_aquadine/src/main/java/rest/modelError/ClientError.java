package rest.modelError;

import java.io.Serializable;

public class ClientError implements Serializable {

    private String errorMessage;

    public ClientError(String errorMessage){
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}