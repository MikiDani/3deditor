<?php

// AJAX
$directory = './data/';
$ext = '.tuc';

// GET FILES
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['getfiles'])) {
    $files = [];
    $files = get_files($directory);

    echo json_encode(['files' => $files]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['issetfile']) && isset($_POST['filename'])) {

    $filename = basename($_POST['filename']);
    $filepath = $directory . $filename . $ext;

    $responseValue = file_exists($filepath);

    echo json_encode([$responseValue]);
    exit;
}

// SAVE
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['save']) && isset($_POST['filename'])) {

    $filename = basename($_POST['filename']);
    $map_data = json_decode($_POST['mapdata'], true);

    if ($map_data == null) {
        echo json_encode(['error' => 'Error in JSON data!']);
        exit;
    }

    if (file_put_contents($directory. '/'. $filename . $ext, gzencode(json_encode($map_data), 9))) {
        echo json_encode(['success' => 'Saving success!']);
    } else {
        echo json_encode(['error' => 'Save error!']);
    }
    exit;
}

// LOAD
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['load']) && isset($_POST['filename'])) {

    $filename = basename($_POST['filename']);

    if (file_exists($directory . '/' . $filename. $ext)) {
        $compressed_data = file_get_contents($directory . '/' . $filename . $ext);
        $json_data = json_decode(gzdecode($compressed_data), true);

        echo json_encode($json_data ?? ['error' => 'Error JSON file reading!']);

    } else echo json_encode(['error' => 'A file not isset!']);

    exit;
}

// DELETE
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['delete']) && isset($_POST['filename'])) {

    $filename = basename($_POST['filename']);

    if (file_exists($directory . '/' . $filename. $ext)) {
        if (file_exists($directory . '/' . $filename . $ext)) {
            if (unlink($directory . '/' . $filename . $ext)) {
                echo json_encode(['success' => 'File deleted successfully!']);
            } else {
                echo json_encode(['error' => 'Failed to delete the file!']);
            }
        } else {
            echo json_encode(['error' => 'File does not exist!']);
        }
    } else echo json_encode(['error' => 'A file not isset!']);

    exit;
}

// POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo json_encode(["success" => $_POST["password"] == "1234"]);
    exit;
}

// FUNCTIONS
function get_files($directory) {

    $files = [];

    if (is_dir($directory)) {
        $scanned_files = array_diff(scandir($directory), ['.', '..']);

        foreach ($scanned_files as $file) {
            $files[] = [
                'name' => pathinfo($file, PATHINFO_FILENAME),
                'extension' => pathinfo($file, PATHINFO_EXTENSION),
            ];
        }
    }

    return $files;
}