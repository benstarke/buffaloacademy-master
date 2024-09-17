<?php

namespace App\Helpers;
use App\User;
use Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForgotPassword;
use NoProtocol\Encryption\MySQL\AES\Crypter;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class SecurityHelper
{

    static function mysql_aes_key($key)
    {
        $new_key = str_repeat(chr(0), 16);
        for ($i = 0, $len = strlen($key); $i < $len; $i++) {
            $new_key [$i % 16] = $new_key [$i % 16] ^ $key [$i];
        }
        return $new_key;
    }

    static function aes_encrypt($val)
    {
        $key = self::getEncryptionKey();
        $crypter = new Crypter($key);
        $encrypted = $crypter->encrypt($val);
        return base64_encode($encrypted);
    }

    static function aes_decrypt($val)
    {
        $original_val = $val;
        if (self::is_base64_encoded($val) == true || self::is_base64_encoded($val) == 'true' || self::is_base64_encoded($val) == 1 || self::is_base64_encoded($val) == '1') {
            $val = base64_decode($val);
            $key = self::getEncryptionKey();
            $crypter = new Crypter($key);
            $decrypted = $crypter->decrypt($val);
            if ($decrypted == '') {
                return $original_val;
            }
            $valid_encoding = mb_check_encoding($decrypted, 'UTF-8');//check if malformed for the specified encoding
            if ($valid_encoding == false) {
                return $original_val;
            }
            return $decrypted;
        }
        return $original_val;
    }

    static function getEncryptionKey()
    {
        $key = Config('constants.encrypt_key');
        return $key;
    }

    static function encryptArray($array, $skip = array())
    {
        $return_array = array();
        foreach ($array as $key => $value) {
            if (in_array($key, $skip)) {
                $return_array[$key] = $value;
            } else {
                $return_array[$key] = aes_encrypt($value);
            }
        }
        return $return_array;
    }

    static function decryptArray($arrays)
    {
        $new_array = array();
        foreach ($arrays as $value) {
            foreach ($value as $nested_key => $nested_value) {
                if ($nested_value == '' || $nested_value == null || $nested_value == NULL || $nested_value == ' ' || $nested_value == " ") {
                    $value [$nested_key] = '';
                } else {
                    $value [$nested_key] = self::aes_decrypt($nested_value);
                }
            }
            $new_array [] = $value;
        }
        return $new_array;
    }

    static function decryptSimpleArray($array)
    {
        $new_array = array();
        foreach ($array as $key => $value) {
            $new_array[$key] = self::aes_decrypt($value);
        }
        return $new_array;
    }

    static function is_base64_encoded($data)
    {
        if (is_numeric($data)) {
            return false;
        }
        try {
            $decoded = base64_decode($data, true);
            if (base64_encode($decoded) === $data) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            // If exception is caught, then it is not a base64 encoded string
            return false;
        }
    }
    static function authenticateApiUser($username,$password,$request)
    {
        
        try {
            $username = ($username);//base64_decode
            $user_password = ($password);//base64_decode
            $user = DB::table('users as t1')
                    ->select(DB::raw('t1.*'))
                    ->where(array('t1.username'=>$username))
                    ->first();
            if(!empty($user) || !is_null($user)){
                $uuid = $user->uuid;
                $user_id = $user->id;
                $email = $user->email;
                //pendign approval
                $status_id = $user->status_id;
                $username = $user->username;
                $trader_user_id = $user->id;
              
                $is_account_blocked = DB::table('api_blocked_accounts')->where('account_id', $user_id)->first();
                if (!empty($is_account_blocked)) {
                            $res = array(
                                'success' => false,
                                'message' => 'Authentication Failed...This account is blocked from accessing the system!!'
                            );
                            
                           
                }
                else{
                            //get the details 
                            $authParams = array(
                                'email' => strtolower($email),
                                'password' => $user_password,
                                'id' => $user_id,
                                'uuid' => $uuid
                            );
                            // attempt to verify the credentials and create a token for the user
                            if (!Auth::guard('web')->attempt($authParams)) {
                                    $res =array('success' => false, 'message' => 'We cant find an account with this credentials.');
                            }
                            else{

                               $user = Auth::guard('web')->user();
                               
                                    $token_results = $user->createToken('System Access');
                                                    
                                    $access_token =  $token_results-> accessToken; 
                                    $token =  $token_results-> token; 
                                    $token->expires_at = Carbon::now()->addMinutes(env('PASSPORT_TOKEN_EXPIRY_MINUTES'));
                                    $token->save();
                                //createToken  5.6 7.  
                                
                                $access_token =  $token_results-> accessToken; 
                                $token =  $token_results-> token; 
                                $token->expires_at = Carbon::now()->addMinutes(env('PASSPORT_TOKEN_EXPIRY_MINUTES'));
                                $token->save();
                                $res = array('success' => true,
                                            'message' => 'Successfully Authenticated',
                                            'access_token'=>$access_token,
                                            'token_type' => 'Bearer',
                                            'expires_at' => Carbon::parse($token_results->token->expires_at)->toDateTimeString()
                                );      
                            }
                        }

                
            }
            else{
                $res = array(
                    'success' => false,
                    'message' => 'Authentication Failed...User Not found!!'
                );
      
            }
            
        } catch (AuthException $e) {
            // something went wrong whilst attempting to encode the token
            $res = array('success' => false, 'error' => $e->getMessage());
        }
       
        return $res;
    }
}
