<?php

namespace Modules\SystemAuthentication\Mail\Instructor;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordChanged extends Mailable
{
    use Queueable, SerializesModels;

    public $oldPassword;
    public $newPassword;
    public $instructor;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($oldPassword, $newPassword, $instructor)
    {
        $this->oldPassword = $oldPassword;
        $this->newPassword = $newPassword;
        $this->instructor = $instructor;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.instructors_emails.passwordChanged')
                    ->subject('Password Changed Successfully')
                    ->with([
                        'oldPassword' => $this->oldPassword,
                        'newPassword' => $this->newPassword,
                        'instructor' => $this->instructor,
                    ]);
    }
}
