<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';

function startPortfolioSession(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $isHttps = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';

    session_set_cookie_params([
        'httponly' => true,
        'secure' => $isHttps,
        'samesite' => 'Lax',
        'path' => '/',
    ]);

    session_start();
}

function isPortfolioAdmin(): bool
{
    startPortfolioSession();

    return !empty($_SESSION['portfolio_admin']);
}

function sendPortfolioJson(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($payload);
    exit;
}

function requirePortfolioAdmin(): void
{
    if (!isPortfolioAdmin()) {
        sendPortfolioJson([
            'status' => 'forbidden',
            'message' => 'Silakan login sebagai admin',
        ], 403);
    }
}
