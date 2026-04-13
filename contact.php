<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

function respond(int $status, string $message): never
{
    http_response_code($status);
    echo json_encode([
        'ok' => $status >= 200 && $status < 300,
        'message' => $message,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, 'Method not allowed.');
}

$honeypot = trim((string)($_POST['_gotcha'] ?? ''));
if ($honeypot !== '') {
    respond(200, 'OK');
}

$allowedHosts = ['myvisitself.ru', 'www.myvisitself.ru'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';

$originHost = $origin ? parse_url($origin, PHP_URL_HOST) : null;
$refererHost = $referer ? parse_url($referer, PHP_URL_HOST) : null;

if (($originHost && !in_array($originHost, $allowedHosts, true)) || ($refererHost && !in_array($refererHost, $allowedHosts, true))) {
    respond(403, 'Forbidden origin.');
}

$privacyConsent = (string)($_POST['privacyConsent'] ?? '');
if ($privacyConsent != 'on') {
    respond(400, 'Consent to personal data processing is required.');
}

$name = trim((string)($_POST['name'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));
$siteLanguage = trim((string)($_POST['site_language'] ?? 'unknown'));
$pageUrl = trim((string)($_POST['page_url'] ?? ''));
$formStartedAt = (int)($_POST['form_started_at'] ?? 0);

if ($formStartedAt > 0) {
    $elapsed = (int) floor((microtime(true) * 1000 - $formStartedAt) / 1000);
    if ($elapsed >= 0 && $elapsed < 3) {
        respond(429, 'Слишком быстро. Попробуйте отправить форму ещё раз.');
    }
}

if ($name === '' || mb_strlen($name) > 80) {
    respond(400, 'Please enter a valid name.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 120) {
    respond(400, 'Please enter a valid email address.');
}

if ($message === '' || mb_strlen($message) < 10 || mb_strlen($message) > 2000) {
    respond(400, 'Please enter a message from 10 to 2000 characters.');
}

$rateLimitKey = sys_get_temp_dir() . '/myvisitself_contact_' . hash('sha256', (string)($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
$rateLimitSeconds = 30;
if (is_file($rateLimitKey)) {
    $lastSent = (int)file_get_contents($rateLimitKey);
    if ($lastSent > 0 && (time() - $lastSent) < $rateLimitSeconds) {
        respond(429, 'Слишком много запросов. Попробуйте немного позже.');
    }
}
@file_put_contents($rateLimitKey, (string)time(), LOCK_EX);

$recipient = 'nikita.kirillov@myvisitself.ru';
$siteEmail = 'nikita.kirillov@myvisitself.ru';
$siteName = 'myvisitself.ru';

function cleanHeader(string $value): string
{
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

$nameSafe = cleanHeader($name);
$emailSafe = cleanHeader($email);
$langSafe = cleanHeader($siteLanguage);

$subject = 'Новая заявка с сайта myvisitself.ru';
$bodyLines = [
    'Новая заявка с сайта myvisitself.ru',
    '',
    'Имя: ' . $nameSafe,
    'Email: ' . $emailSafe,
    'Язык страницы: ' . $langSafe,
    'URL страницы: ' . $pageUrl,
    'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
    'User-Agent: ' . ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown'),
    '',
    'Сообщение:',
    $message,
];
$body = implode("\n", $bodyLines);

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: ' . $siteName . ' <' . $siteEmail . '>';
$headers[] = 'Reply-To: ' . $nameSafe . ' <' . $emailSafe . '>';
$headers[] = 'X-Mailer: PHP/' . PHP_VERSION;

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$sent = @mail($recipient, $encodedSubject, $body, implode("\r\n", $headers));

if (!$sent) {
    respond(500, 'Не удалось отправить письмо. Проверьте настройки почты на хостинге.');
}

respond(200, 'Very good! Wait for me ;)');
