<!-- resources/views/emails/verify-email.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>Verify Your Email Address</title>
</head>
<body>
    <h1><b>The Buffalo Academy</b></h1>
    <p>Verify your email address to complete registration</p>
    <p>Thanks for your interest in joining Upwork! To complete your registration, we need you to verify your email address.</p>
    <p><a href="{{ $verificationUrl }}">Verify Email Address</a></p>
    <p>Thanks for your time,</p>
    <p>The Buffalo Academy Team</p>
    <p>If you did not create an account, no further action is required.</p>
</body>
</html>
