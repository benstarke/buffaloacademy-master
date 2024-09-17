<?php

namespace Modules\SystemAuthentication\Mail\Student;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordChanged extends Mailable
{
    use Queueable, SerializesModels;

    public $oldPassword;
    public $newPassword;
    public $student;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($oldPassword, $newPassword, $student)
    {
        $this->oldPassword = $oldPassword;
        $this->newPassword = $newPassword;
        $this->student = $student;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.students_emails.passwordChanged')
                    ->subject('Password Changed Successfully')
                    ->with([
                        'oldPassword' => $this->oldPassword,
                        'newPassword' => $this->newPassword,
                        'student' => $this->student,
                    ]);
    }
}
