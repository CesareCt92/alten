<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Testa il login con credenziali valide.
     *
     * @return void
     */
    public function testLoginWithValidCredentials()
    {
        User::factory()->create([
            'name' => 'test',
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/login', [
            'username' => 'test',
            'password' => 'password123',
            'timezone' => 'Europe/Rome',
        ]);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'message',
            'token',
            'generated_at',
            'expires_at'
        ]);
    }

    /**
     * Testa il login con credenziali non valide.
     *
     * @return void
     */
    public function testLoginWithInvalidCredentials()
    {
        $response = $this->postJson('/login', [
            'username' => 'wrong',
            'password' => 'wrongpassword',
            'timezone' => 'Europe/Rome'
        ]);

        $response->assertStatus(401);
    }
}
