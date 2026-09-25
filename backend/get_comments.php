<?php
header("Content-Type: application/json");
require "db.php";

$result = $conn->query("
  SELECT id, name, message, created_at 
  FROM comments 
  ORDER BY id DESC
");

$comments = [];

while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

echo json_encode($comments);
$conn->close();
