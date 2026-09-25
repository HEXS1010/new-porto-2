<?php
declare(strict_types=1);

require_once __DIR__ . '/admin_auth.php';

requirePortfolioAdmin();

$data = json_decode(file_get_contents('php://input'), true);
$id = is_array($data) ? (int) ($data['id'] ?? 0) : 0;

if ($id <= 0) {
    sendPortfolioJson([
        'status' => 'error',
        'message' => 'ID komentar tidak valid',
    ], 400);
}

$stmt = $conn->prepare('DELETE FROM comments WHERE id = ?');
$stmt->bind_param('i', $id);

if ($stmt->execute()) {
    sendPortfolioJson(['status' => 'success']);
}

sendPortfolioJson(['status' => 'error']);
