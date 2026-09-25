<?php
declare(strict_types=1);

header('Content-Type: application/json');
require_once __DIR__ . '/admin_auth.php';

sendPortfolioJson([
    'authenticated' => isPortfolioAdmin(),
]);
