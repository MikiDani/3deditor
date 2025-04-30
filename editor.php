<?php

// AJAX
$directory = './data/';
$ext = '.tuc';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['test'])) {
    $test = 'test';
    echo json_encode($test);
    exit;
}

// GET TEXTURESTRUCTURE
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['gettexturestructure'])) {
    function recursive_builder($directory) {
        $structure = [];
        $files = get_files($directory);
        foreach ($files as $row) {
            $path = $directory . DIRECTORY_SEPARATOR . $row['name'];
            if ($row['extension'] == '') {
                $structure[$row['name']] = recursive_builder($path);
            } else if ($row['extension'] == 'png') {
                $structure[$row['name']] = $path;
            }
        }
        return $structure;
    }

    $structure = recursive_builder('.'. DIRECTORY_SEPARATOR .'data');

    echo json_encode(['structure' => $structure]);
    exit;
}

// GET FILES
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['getfiles'])) {

    if (isset($_POST['dirsstructure'])) $directory = $directory . $_POST['dirsstructure'];

    $files = [];
    $files = get_files($directory);
    usort($files, function ($a, $b) {
        return strnatcmp($a['name'], $b['name']);
    });

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

    $newdirname = clear_filename($_POST['newdirname']);

    $directory = $directory . $_POST['addgetdirs'].DIRECTORY_SEPARATOR.$newdirname;

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

    $renamedirname = mb_strtolower($_POST['renamedirname']);

    $olddirectory = $directory . $_POST['addgetdirs'] . DIRECTORY_SEPARATOR . $_POST['olddirname'];
    $newdirectory = $directory . $_POST['addgetdirs'] . DIRECTORY_SEPARATOR . $renamedirname;

    if (is_dir($directory)) {

        if (is_dir($newdirectory)) {
            echo json_encode(['error' => 'The '.  $renamedirname .' directory is exists!']);
            exit;
        }

        if (rename($olddirectory, $newdirectory)) {

            // RENAME ALL FILE IF NECESSARY
            if (isset($_POST['renamefiles'])) rename_filelist($newdirectory,  $renamedirname);

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

    $directory = $directory . $_POST['addgetdirs'].DIRECTORY_SEPARATOR.$_POST['deletedirname'];

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

    $filepath = $directory . $addgetdirs . DIRECTORY_SEPARATOR . $dirname;

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

// UPLOAD FILE
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['addgetdirs']) && isset($_POST['newfilename']) && isset($_FILES['filedata'])) {

    $directory = $directory . $_POST['addgetdirs'];

    if (!is_dir($directory)) {
        echo json_encode(['error' => 'Directory is not exist!']);
        exit;
    }

    function uploadFile($directory, $filedata) {
        $target_file = $directory . DIRECTORY_SEPARATOR . basename($_POST['newfilename']);
        return move_uploaded_file($filedata['tmp_name'], $target_file);
    }

    $responseValue = uploadFile($directory, $_FILES['filedata']);

    if ($responseValue) {
        echo json_encode(['success' => true]);
        exit;
    } else {
        echo json_encode(['error' => 'Failed to upload file!']);
        exit;
    }
}

// CHANGE FILENAMES
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['actdir']) && isset($_POST['filename1']) && isset($_POST['filename2'])) {

    $directory = $directory . $_POST['actdir'];

    $response = changefilename($directory . DIRECTORY_SEPARATOR . $_POST['filename1'], $directory . DIRECTORY_SEPARATOR . $_POST['filename2']);

    echo json_encode($response);
    exit;
}

// DELETE FILE
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['addgetdirs']) && isset($_POST['deletefilename'])) {

    $directoryandfile = $directory . $_POST['addgetdirs'] . $_POST['deletefilename'];

    if (!file_exists($directoryandfile)) {
        echo json_encode(['error' => 'File is not exist!']);
        exit;
    }

    if (unlink($directoryandfile)) {
        recount_filelist($directory . $_POST['addgetdirs']);
        echo json_encode(['success' => [true]]);
        exit;
    } else {
        echo json_encode(['error' => 'Failed to delete the file.']);
        exit;
    }
}

// SAVE
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['save']) && isset($_POST['filename'])) {

    $filename = basename($_POST['filename']);
    $filename = clear_filename($filename);

    if ($filename == 'maniac' || $filename == 'clear' || $filename == 'chees' || $filename == 'salad' || $filename == 'ketchup' || $filename == 'fridge') {
        echo json_encode(['error' => 'This is DEMO .tuc file! You cannot save or overwrite it!']);
        exit;
    }

    $map_data = json_decode($_POST['mapdata'], true);

    if ($map_data == null) {
        echo json_encode(['error' => 'Error in JSON data!']);
        exit;
    }

    if (file_put_contents($directory. DIRECTORY_SEPARATOR . $filename . $ext, gzencode(json_encode($map_data), 9))) {
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

    if (file_exists($directory . DIRECTORY_SEPARATOR . $filename. $ext)) {
        $compressed_data = file_get_contents($directory . DIRECTORY_SEPARATOR . $filename . $ext);
        $json_data = json_decode(gzdecode($compressed_data), true);

        echo json_encode($json_data ?? ['error' => 'Error JSON file reading!']);

    } else echo json_encode(['error' => 'A file not isset!']);

    exit;
}

// DELETE
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ajax']) && isset($_POST['delete']) && isset($_POST['filename'])) {

    $filename = basename($_POST['filename']);
    $filename = mb_strtolower($filename);

    if (file_exists($directory . DIRECTORY_SEPARATOR . $filename. $ext)) {
        if (file_exists($directory . DIRECTORY_SEPARATOR . $filename . $ext)) {
            if (unlink($directory . DIRECTORY_SEPARATOR . $filename . $ext)) {
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

////////////
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

function clear_filename($getname) {
    $converted = iconv('UTF-8', 'ASCII//TRANSLIT', $getname);
    $clean = preg_replace('/[^A-Za-z0-9 -]/', '', $converted);
    return mb_strtolower($clean);
}

function recount_filelist($directory) {
    $allfiles = scandir($directory);

    $newfilenames = [];
    $counter = 0;

    foreach ($allfiles as $file) {
        if ($file === '.' || $file === '..') {
            continue;
        }

        $oldpath = $directory . DIRECTORY_SEPARATOR . $file;

        if (is_file($oldpath)) {
            $parts = explode('_', $file, 2);
            if (count($parts) == 2) {
                $newname = $counter . '_' . $parts[1];
            } else {
                $newname = $counter . '_' . $file;
            }

            $newpath = $directory . DIRECTORY_SEPARATOR . $newname;

            // Átnevezzük a fájlt
            if (rename($oldpath, $newpath)) {
                $newfilenames[] = $newname;
            }

            $counter++;
        }
    }

    return $newfilenames;
}

function rename_filelist($directory, $newdirname) {
    $allfiles = scandir($directory);

    $newfilenames = [];

    foreach ($allfiles as $file) {
        if ($file === '.' || $file === '..') {
            continue;
        }

        $oldpath = $directory . DIRECTORY_SEPARATOR . $file;

        if (is_file($oldpath)) {
            $parts = explode('_', $file, 2);
            $newname = $parts[0] . '_' . mb_strtolower($newdirname) . '.png';

            $newpath = $directory . DIRECTORY_SEPARATOR . $newname;

            // Átnevezzük a fájlt
            if (rename($oldpath, $newpath)) {
                $newfilenames[] = $newname;
            }
        }
    }

    return $newfilenames;
}

function changefilename($file1, $file2) {
    $return = [];

    if (!file_exists($file1) || !file_exists($file2)) {
        $return['error'] = 'One or both files do not exist.';
        return $return;
    }

    $temp = $file1 . '.swap_' . uniqid();

    if (!rename($file1, $temp)) {
        $return['error'] = "Failed to rename: $file1 -> $temp";
        return $return;
    }

    if (!rename($file2, $file1)) {
        rename($temp, $file1);
        $return['error'] = "Failed to rename: $file2 -> $file1";
        return $return;
    }

    if (!rename($temp, $file2)) {
        rename($file1, $file2);
        rename($temp, $file1);
        $return['error'] = "Failed to rename: $temp -> $file2";
        return $return;
    }

    return ['success' => true];
}
