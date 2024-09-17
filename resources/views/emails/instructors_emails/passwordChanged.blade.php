<!DOCTYPE html>
<html>
<head>
    <title>Password Changed</title>
</head>
<body>
    <p>Dear {{ $instructor->name_en }},</p>
    <p>Your password has been successfully changed from {{ $oldPassword }} to {{ $newPassword }}.</p>
    <p>If you did not initiate this change, please contact support immediately.</p>
    <p>Best regards,<br>The Buffalo Academy Team</p>
</body>
</html>
