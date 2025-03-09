<?php

$directory = './data/';

// AJAX

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['ajax']) && isset($_POST['getfiles'])) {
    $files = [];
    $files = get_files($directory);

    echo json_encode(['files' => $files]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['ajax']) && isset($_POST['save'])) {

    $map_data = json_decode($_POST['mapdata'], true);
    // Második paraméter: true -> asszociatív tömb lesz

    if ($map_data === null) {
        echo json_encode(['error' => 'Hibás JSON adatok!']);
        exit;
    }

    $filename = 'test.tes';

    if (file_put_contents($directory. '/'. $filename, json_encode($map_data, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => 'Sikeres mentés!']);
    } else {
        echo json_encode(['error' => 'Mentés sikertelen!']);
    }
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['ajax']) && isset($_POST['load'])) {

    $filename = 'test.tes';

    if (file_exists($directory . '/' . $filename)) {
        echo file_get_contents($directory . '/' . $filename);
    } else {
        echo json_encode(['error' => 'Nincs ilyen fájl']);
    }

    exit;
}

// POST

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    echo json_encode(["success" => $_POST["password"] === "1234"]);
    exit;
}

// FUNCTIONS

function get_files($directory) {

    $files = [];

    if (is_dir($directory)) {
        $scanned_files = array_diff(scandir($directory), ['.', '..']);

        // Fájlok bejárása és információk összegyűjtése
        foreach ($scanned_files as $file) {
            $files[] = [
                'name' => pathinfo($file, PATHINFO_FILENAME), // Fájlnév kiterjesztés nélkül
                'extension' => pathinfo($file, PATHINFO_EXTENSION) // Fájl kiterjesztése
            ];
        }
    }

    return $files;
}