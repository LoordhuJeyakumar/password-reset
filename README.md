# **\# Password Reset Flow - BE**

This document outlines the password reset flow for users of this application.

## **URLs**

## [Render Deployed URL 👈 ](https://password-reset-api-2je2.onrender.com)

```
https://password-reset-api-2je2.onrender.com
```

## [Github repository URL 👈](https://github.com/LoordhuJeyakumar/password-reset-be.git)

```
https://github.com/LoordhuJeyakumar/password-reset-be.git
```

## [Documentation URL 👈](https://documenter.getpostman.com/view/27536086/2s9YsQ9W7M)

```
https://documenter.getpostman.com/view/27536086/2s9YsQ9W7M
```

## Base URL

All API endpoints are accessible at the following base URL:

https://assign-mentor-student-edju.onrender.com/api/v1

## **Endpoints:**

- Creates a new user.

```js
POST / users / createUser;
```

---

- Fetches a list of all users.

```js
GET / users;
```

---

Retrieves a specific user by ID.

```js
GET /users/:id
```

---

- Edits an existing user.

```js
PUT /users/edit/:id
```

---

- Deletes a user.

```js
DELETE /users/delete/:id
```

---

- Generates a password reset token for a user.

```js
POST / passwordResetToken;
```

---

- Verifies the validity of a password reset token.

```js
POST / verifyResetToken;
```

---

- Resets a user's password using a valid token.

```js
POST / resetPassword;
```

---

- Allows users to log in.

```js
POST / login;
```

## **Password Reset Process:**

1. **User Initiates Reset:**
   - User visits a designated "Forgot Password" page or link.
   - User enters their email address or username.
   - Application sends a password reset email containing a unique token.
2. **Token Verification:**
   - User clicks the link in the password reset email.
   - Application verifies the token's validity and expiration.
   - If valid, user is redirected to a password reset form.
3. **New Password Set:**
   - User enters a new password in the form.
   - Application validates the new password for strength and security requirements.
   - Application updates the user's password in the database.
   - User is redirected to a success page or login page.

### **Additional Considerations:**

- **Token Expiration:** Tokens should have a reasonable expiration time to ensure security.
- **Password Strength:** Enforce strong password policies to protect user accounts.
- **Email Delivery:** Ensure reliable email delivery for password reset messages.
- **Error Handling:** Implement clear error messages for invalid tokens, expired tokens, or failed password resets.
- **Security:** Protect against potential attacks such as brute force attempts or token theft.
- **Frontend Integration:** Describe how the frontend interacts with these endpoints to guide user actions and display appropriate messages.
- **Testing:** Conduct thorough testing of the password reset flow to ensure functionality and security.
