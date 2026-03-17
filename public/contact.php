<?php
declare(strict_types=1);

function send_json(int $statusCode, array $payload): never
{
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($payload);
    exit;
}

function safe_redirect_path(mixed $value): ?string
{
    $path = trim((string) $value);

    if ($path === '') {
        return null;
    }

    $parts = parse_url($path);

    if ($parts === false || isset($parts['scheme']) || isset($parts['host'])) {
        return null;
    }

    $cleanPath = $parts['path'] ?? '';
    $allowedPaths = ['/contact-direct.php'];

    if ($cleanPath === '' || !in_array($cleanPath, $allowedPaths, true)) {
        return null;
    }

    return $cleanPath;
}

function send_redirect(string $path, string $status, string $message = ''): never
{
    $params = ['status' => $status];

    if ($message !== '') {
        $params['message'] = $message;
    }

    header('Location: ' . $path . '?' . http_build_query($params));
    exit;
}

function respond(bool $ok, string $message, int $statusCode, ?string $redirectPath): never
{
    if ($redirectPath !== null) {
        send_redirect($redirectPath, $ok ? 'success' : 'error', $message);
    }

    send_json($statusCode, [
        'ok' => $ok,
        'message' => $message,
    ]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(405, [
        'ok' => false,
        'message' => 'Method not allowed.',
    ]);
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput ?: '', true);

if (!is_array($data)) {
    $data = $_POST;
}

$redirectPath = safe_redirect_path($data['redirect'] ?? null);
$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$enquiryType = trim((string) ($data['enquiryType'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));
$honeypot = trim((string) ($data['website'] ?? ''));

if ($honeypot !== '') {
    respond(true, 'Thanks for your message.', 200, $redirectPath);
}

if ($name === '' || $email === '' || $enquiryType === '' || $message === '') {
    respond(false, 'Please complete all fields before sending your message.', 400, $redirectPath);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.', 400, $redirectPath);
}

if (strlen($message) < 10) {
    respond(false, 'Please include a little more detail in your message.', 400, $redirectPath);
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
    respond(false, 'We could not send your message right now. Please try again or email us directly.', 500, $redirectPath);
}

respond(true, 'Thanks for your message. We will be in touch soon.', 200, $redirectPath);
