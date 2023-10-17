package com.hoaxify.ws.email;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailService {

    JavaMailSenderImpl mailSender;

    public EmailService(){
        this.initialize();
    }

    public void initialize(){
        this.mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.ethereal.email");
        mailSender.setPort(587);
        mailSender.setUsername("cleveland.mertz@ethereal.email");
        mailSender.setPassword("ftSzDmAMxuAZPpQhhH");

        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.smtp.starttls.enable", true);
    }
    public void sendActivationEmail(String email, String activationToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@hoaxify-app.com");
        message.setTo(email);
        message.setSubject("Account Activation");
        message.setText("http://localhost:5173/activation/" + activationToken);
        this.mailSender.send(message);
    }
}
