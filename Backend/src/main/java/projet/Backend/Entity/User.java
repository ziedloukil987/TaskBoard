package projet.Backend.Entity;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;




@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private Role role=Role.Client;
    private LocalDateTime birthdate;
    private boolean enabled=true;
    //private String resetToken;
}