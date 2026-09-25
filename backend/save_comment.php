<?php
header("Content-Type: application/json");
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["nama"]) || !isset($data["komen"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Data tidak lengkap"
    ]);
    exit;
}

$nama  = trim($data["nama"]);
$komen = trim($data["komen"]);

if ($nama === "" || $komen === "") {
    echo json_encode([
        "status" => "error",
        "message" => "Input kosong"
    ]);
    exit;
}

// ===== BATAS PANJANG KOMENTAR =====
if (mb_strlen($komen) > 450) {
    echo json_encode([
        "status" => "error",
        "message" => "Komentar maksimal 450 karakter"
    ]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO comments (name, message) VALUES (?, ?)");
$stmt->bind_param("ss", $nama, $komen);

if ($stmt->execute()) {

    // ====== KIRIM EMAIL (opsional) ======
    // Aktifkan hanya jika MAIL_ENABLED=true dan MTA sudah dikonfigurasi.
    if (filter_var(getenv('MAIL_ENABLED') ?: 'false', FILTER_VALIDATE_BOOLEAN)) {
        $to = "aswameda18@gmail.com";
        $subject = "Komentar Baru di Portfolio";
        $message = "Nama: $nama\n\nKomentar:\n$komen";
        $headers = "From: no-reply@localhost";

        @mail($to, $subject, $message, $headers);
    }

    echo json_encode([
        "status" => "success"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Gagal simpan"
    ]);
}

$stmt->close();
$conn->close();
