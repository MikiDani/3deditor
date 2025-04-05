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

// GET DIRS
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['getdirs'])) {

    $directory = $directory . $_POST['getdirs'];

    $allfiles = [];
    $allfiles = scandir($directory);

    $dirs = [];

    foreach($allfiles as $key => $name) {
        if ($name !== '.' && $name !== '..' && is_dir($directory . DIRECTORY_SEPARATOR . $name)) {
            $dirs[] = $name;
        }
    }

    echo json_encode(['dirs' => $dirs]);
    exit;
}

// MAKE DIR
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['addgetdirs']) && isset($_POST['newdirname'])) {

    $directory = $directory . $_POST['addgetdirs'].'/'.$_POST['newdirname'];

    if (!is_dir($directory)) {
        if (mkdir($directory, 0777)) {
            echo json_encode(['success' => true]);
            exit;
        } else {
            echo json_encode(['error' => 'Error creating the directory!']);
            exit;
        }
    } else {
        echo json_encode(['error' => 'The directory already exists!']);
        exit;
    }
}

// RENAME DIR
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['addgetdirs']) && isset($_POST['olddirname']) && isset($_POST['renamedirname'])) {

    $olddirectory = $directory . $_POST['addgetdirs'].'/'.$_POST['olddirname'];
    $newdirectory = $directory . $_POST['addgetdirs'].'/'.$_POST['renamedirname'];

    if (is_dir($directory)) {

        if (is_dir($newdirectory)) {
            echo json_encode(['error' => 'The '. $_POST['renamedirname'] .' directory is exists!']);
            exit;
        }

        // echo json_encode([$olddirectory, $newdirectory]); exit;

        if (rename($olddirectory, $newdirectory)) {
            echo json_encode(['success' => true]);
            exit;
        } else {
            echo json_encode(['error' => 'Error rename directory!']);
            exit;
        }
    } else {
        echo json_encode(['error' => 'The original directory not exists!']);
        exit;
    }
}

// DELETE DIR
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['addgetdirs']) && isset($_POST['deletedirname'])) {

    $directory = $directory . $_POST['addgetdirs'].'/'.$_POST['deletedirname'];

    // echo json_encode($directory); exit;
    
    $delete_reponse = deleteDirectory($directory);

    echo $delete_reponse; exit;

    if ($delete_reponse) {
        echo json_encode(['success' => [true]]);
        exit;
    } else {
        echo json_encode(['error' => 'Failed to delete the library.']);
        exit;
    }
}

// ISSET DIR
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['issetdir']) && isset($_POST['addgetdirs']) && isset($_POST['dirname'])) {

    $dirname = basename($_POST['dirname']);
    $addgetdirs = basename($_POST['addgetdirs']);
    $dirname = mb_strtolower($dirname);

    $filepath = $directory . $addgetdirs . '/' . $dirname;

    echo json_encode([$filepath]);
    exit;
}

// ISSET FILE
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['issetfile']) && isset($_POST['filename'])) {

    $filename = basename($_POST['filename']);
    $filename = mb_strtolower($filename);

    $filepath = $directory . $filename . $ext;

    $responseValue = file_exists($filepath);

    echo json_encode([$responseValue]);
    exit;
}

// SAVE
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['save']) && isset($_POST['filename'])) {

    $filename = basename($_POST['filename']);
    $filename = mb_strtolower($filename);

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
    $filename = mb_strtolower($filename);

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
    $filename = mb_strtolower($filename);

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

function deleteDirectory($dir) {
    if (!file_exists($dir)) {
        return false;
    }

    if (!is_dir($dir)) {
        return unlink($dir);
    }

    $items = scandir($dir);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') {
            continue;
        }

        $path = $dir . DIRECTORY_SEPARATOR . $item;
        if (is_dir($path)) {
            deleteDirectory($path);
        } else {
            unlink($path);
        }
    }

    return rmdir($dir);
}