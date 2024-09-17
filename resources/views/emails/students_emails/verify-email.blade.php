<!-- resources/views/emails/verify-email.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>Verify Your Email Address</title>
</head>
<body>
    <h1>Verify Your Email Address</h1>
    <p>Thank you for registering. Please click the button below to verify your email address.</p>
    <p><a href="{{ $verificationUrl }}">Verify Email Address</a></p>
    <p>If you did not create an account, no further action is required.</p>
</body>
</html>
