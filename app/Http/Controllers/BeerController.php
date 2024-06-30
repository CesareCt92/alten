<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use DateTimeZone;
use Illuminate\Support\Facades\Auth;

class BeerController extends Controller
{
    public function list(){
        return view('beer-list');
    }

    public function checkToken(Request $request) {

        $checkUser = User::where('id', $request->idUser)->first();
        if ($checkUser) {
            if ($checkUser->remember_token == $request->token
            && $checkUser->expiry_token == $request->expiryToken){
                $currentDateTime = Carbon::now($request->timezone);
                $expiryDateTime = Carbon::parse($request->expiryToken)->setTimezone($request->timezone);
                if ($expiryDateTime->gt($currentDateTime)) {
                    return response()->json([
                        'message' => 'completed',
                        'status' => 'OK'
                    ], 200);
                } else {
                    return response()->json([
                        'message' => 'Token scaduto',
                        'status' => 'KO'
                    ], 401);
                }
            }else{
                return response()->json(['message' => 'Token o data modificati manualmente'], 401);
            }
        }else{
            return response()->json(['message' => 'Utente non trovato'], 401);
        }
        /*if ($updateUser) {
            return response()->json([
            'message' => 'Token generato correttamente',
            'token' => $token,
            'generated_at' => $now->toDateTimeString(),
            'expires_at' => $oneHourLater->toDateTimeString()
        ], 200);*/
    }
}
