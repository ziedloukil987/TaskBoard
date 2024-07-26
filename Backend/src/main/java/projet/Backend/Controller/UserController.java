package projet.Backend.Controller;

import org.eclipse.angus.mail.imap.protocol.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import projet.Backend.Entity.Role;
import projet.Backend.Entity.User;
import projet.Backend.Service.UserService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:4200")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        Optional<User> existingUser = userService.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
        User savedUser = userService.signup(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestParam String email, @RequestParam String password) {
        Optional<User> user = userService.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping("/update")
    public ResponseEntity<String> update(@RequestBody User user) {
        Optional<User> existingUser = userService.findByEmail(user.getEmail());
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }
        
        User updatedUser = existingUser.get();
        updatedUser.setUsername(user.getUsername());
        updatedUser.setPassword(user.getPassword());
        
        userService.updateUser(updatedUser); 
        
        return ResponseEntity.ok("User updated successfully");
    }

        // Method to generate a random password (can be customized as per requirements)
    private String generateRandomPassword() {
        // Example: Generate a UUID-based random password
        return UUID.randomUUID().toString().substring(0, 8); // Generate an 8-character random password
    }

    // Method to send new password to user's email
    private void sendNewPasswordEmail(String email, String newPassword) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("New Password for Your Account");
        mailMessage.setText("Your new password: " + newPassword);
        javaMailSender.send(mailMessage);
    }

    @PostMapping(path="/forgot-password",produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        Optional<User> user = userService.findByEmail(email);
        if (user.isPresent()) {
            // Generate new password
            String newPassword = generateRandomPassword();
            
            // Update user's password in the database
            userService.updatePassword(user.get(), newPassword);
            
            // Send new password to user's email
            sendNewPasswordEmail(user.get().getEmail(), newPassword);
            
            return new ResponseEntity<>("{\"response\":\"New password sent to your email.\"}",HttpStatus.OK);
        }
        return ResponseEntity.status(404).body("{\"error\":\"user not found.\"}");
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<User>> getAll()
    {
        return ResponseEntity.ok(userService.getAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<User>> search(@RequestParam String val) {
        return ResponseEntity.ok(userService.search(val));
    }
    
    @PutMapping("/promote")
    public ResponseEntity<String> promote(@RequestBody User user)
    {
        if(userService.findByEmail(user.getEmail())!=null)
        {
            user.setRole(Role.Admin);
            userService.updateUser(user);
        }
        return ResponseEntity.ok("");
    }

    @PutMapping("/demote")
    public ResponseEntity<String> demote(@RequestBody User user)
    {
        if(userService.findByEmail(user.getEmail())!=null)
        {
            user.setRole(Role.Admin);
            userService.updateUser(user);
        }
        return ResponseEntity.ok("");
    }
}

