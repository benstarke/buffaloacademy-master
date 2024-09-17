<?php  

namespace Modules\SystemAuthentication\Mail\Instructor;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class VerifyEmail extends Mailable
{
    use Queueable, SerializesModels;

    protected $verificationUrl;

    public function __construct($verificationUrl)
    {
        $this->verificationUrl = $verificationUrl;
        Log::info('Verification URL in Mailable: ' . $verificationUrl);
        
    }

    public function build()
    {
        return $this->view('emails.instructors_emails.verify-email')
                    ->subject('instructor Email Verification')
                    ->with(['verificationUrl' => $this->verificationUrl]);
    }
}
