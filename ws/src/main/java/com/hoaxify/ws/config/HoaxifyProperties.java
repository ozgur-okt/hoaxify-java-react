package com.hoaxify.ws.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties(prefix = "hoaxify")
@Configuration
public class HoaxifyProperties {
    private Ethereal ethereal;
    private Client client;

    public static record Ethereal(
            String username,
            String password,
            String host,
            int port,
            String from
    ){}
    public static record Client (
            String host
    ){}

    public Ethereal getEthereal() {
        return ethereal;
    }

    public void setEthereal(Ethereal ethereal) {
        this.ethereal = ethereal;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
