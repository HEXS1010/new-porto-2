<?php
declare(strict_types=1);

header('Content-Type: application/json');
require_once __DIR__ . '/admin_auth.php';

startPortfolioSession();
$_SESSION = [];

if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], (bool) $params['secure'], (bool) $params['httponly']);
}

session_destroy();

sendPortfolioJson([
    'status' => 'success',
]);
