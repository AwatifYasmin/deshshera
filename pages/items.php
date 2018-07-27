<?php
header('Content-Type: text/html; charset=utf-8');
$servername = "localhost";
$username = "admin_desh_sera";
$password = "sera@123";
$dbname = "admin_desh_sera";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

mysqli_query($conn,'SET CHARACTER SET utf8'); 
mysqli_query($conn,"SET SESSION collation_connection ='utf8_general_ci'");
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$id = $_GET["id"];

$sql = "SELECT * FROM items where id=".$id;
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    $row = $result->fetch_assoc();
} else {
    echo "0 results";
}
$conn->close();
?>

<html lang="zxx" ng-app="deshSera" style="" class="js flexbox canvas canvastext webgl no-touch geolocation postmessage websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface no-generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths ng-scope">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title><?php echo $row["title"]; ?></title>
    <meta name="title" content="<?php echo $row["title"]; ?>">
    <meta name="description" content="<?php echo $row["description"]; ?>">

    <!-- Twitter Card data -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="<?php echo $row["title"]; ?>">
    <meta name="twitter:description" content="<?php echo $row["description"]; ?>">
    <!-- Twitter Summary card images must be at least 120x120px -->
    <meta name="twitter:image" content="<?php echo "https://deshshera.com/api/images/" . $row["photo"]; ?>">

    <!-- Open Graph data -->
    <meta property="og:title" content="<?php echo $row["title"]; ?>">
    <meta property="og:type" content="article">
    <meta property="og:url" content="<?php echo "https://www.deshshera.com#!/item/" . $id; ?>">
    <meta property="og:image" content="<?php echo "https://deshshera.com/api/images/" . $row["photo"]; ?>">
    <meta property="og:description" content="<?php echo $row["description"]; ?>">
    <meta property="og:site_name" content="DeshShera">

    <!-- Favicon -->
    <script>
        location.href = "https://deshshera.com/#!/item/"+<?php echo $id; ?>
    </script>
</head>

<body>
</body>

</html>
