<?php
declare(strict_types=1);

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'ok' => false,
        'message' => 'Method not allowed.',
    ]);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput ?: '', true);

if (!is_array($data)) {
    $data = $_POST;
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$enquiryType = trim((string) ($data['enquiryType'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));
$honeypot = trim((string) ($data['website'] ?? ''));

if ($honeypot !== '') {
    echo json_encode([
        'ok' => true,
    ]);
    exit;
}

if ($name === '' || $email === '' || $enquiryType === '' || $message === '') {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'message' => 'Please complete all fields before sending your message.',
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'message' => 'Please enter a valid email address.',
    ]);
    exit;
}

if (strlen($message) < 10) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'message' => 'Please include a little more detail in your message.',
    ]);
    exit;
}

$safeName = preg_replace("/[\r\n]+/", ' ', $name) ?: $name;
$safeEmail = filter_var($email, FILTER_SANITIZE_EMAIL) ?: $email;
$safeEnquiryType = preg_replace("/[\r\n]+/", ' ', $enquiryType) ?: $enquiryType;
$safeMessage = preg_replace("/\r\n|\r|\n/", PHP_EOL, $message) ?: $message;

$to = 'eric@aivisionconsulting.co.uk';
$subject = 'New website enquiry: ' . $safeEnquiryType;
$bodyLines = [
    'New contact form submission from aivisionconsulting.co.uk',
    '',
    'Name: ' . $safeName,
    'Email: ' . $safeEmail,
    'Enquiry Type: ' . $safeEnquiryType,
    '',
    'Message:',
    $safeMessage,
];
$body = implode(PHP_EOL, $bodyLines);
$headers = implode("\r\n", [
    'From: AI Vision Website <noreply@aivisionconsulting.co.uk>',
    'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
]);

$sent = mail($to, $subject, $body, $headers);

if (!$sent) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'message' => 'We could not send your message right now. Please try again or email us directly.',
    ]);
    exit;
}

echo json_encode([
    'ok' => true,
]);
