<?php
declare(strict_types=1);

header('Content-Type: application/json');
require_once __DIR__ . '/admin_auth.php';

startPortfolioSession();

$data = json_decode(file_get_contents('php://input'), true);
$password = is_array($data) ? trim((string) ($data['password'] ?? '')) : '';

$failedAttempts = (int) ($_SESSION['admin_failed_attempts'] ?? 0);
$lastFailedAt = (int) ($_SESSION['admin_last_failed_at'] ?? 0);

if ($password === '') {
    sendPortfolioJson([
        'status' => 'error',
        'message' => 'Password admin wajib diisi',
    ], 400);
}

if ($failedAttempts >= 5 && (time() - $lastFailedAt) < 60) {
    sendPortfolioJson([
        'status' => 'error',
        'message' => 'Terlalu banyak percobaan. Coba lagi dalam 60 detik',
    ], 429);
}

$passwordHash = getenv('ADMIN_PASSWORD_HASH') ?: '';
$valid = $passwordHash !== '' && password_verify($password, $passwordHash);

if (!$valid) {
    $_SESSION['admin_failed_attempts'] = $failedAttempts + 1;
    $_SESSION['admin_last_failed_at'] = time();

    sendPortfolioJson([
        'status' => 'error',
        'message' => 'Password admin salah',
    ], 401);
}

session_regenerate_id(true);
$_SESSION['portfolio_admin'] = true;
unset($_SESSION['admin_failed_attempts'], $_SESSION['admin_last_failed_at']);

sendPortfolioJson([
    'status' => 'success',
    'message' => 'Login admin berhasil',
]);
