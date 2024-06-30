<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Carbon;
use DateTimeZone;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
            'timezone' => 'required|string',
        ]);

        $checkUser = User::where('name', $request->username)->first();
        if ($checkUser) {
            if (Hash::check($request->password, $checkUser->password)) {
                $token = Str::random(60);
                $timezone = new DateTimeZone($request->timezone);
                $now = Carbon::now($timezone);
                $oneHourLater = $now->copy()->addHour();

                $updateUser = User::where('id', $checkUser->id)->update([
                    'remember_token' => $token,
                    'expiry_token' => $oneHourLater->toDateTimeString()
                ]);
                if ($updateUser) {
                    return response()->json([
                    'message' => 'Token generato correttamente',
                    'idUser' => $checkUser->id,
                    'token' => $token,
                    'generated_at' => $now->toDateTimeString(),
                    'expires_at' => $oneHourLater->toDateTimeString()
                ], 200);
                }
                return response()->json(['message' => 'Impossibile generare il token'], 401);
            }else{
                return response()->json(['message' => 'Errore di autenticazione'], 401);
            }
        }else{
            return response()->json(['message' => 'Utente non trovato'], 401);
        }


    }
}
