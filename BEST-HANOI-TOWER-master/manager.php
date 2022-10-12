<?php 
$mysqli = "mysql:host=localhost;dbname=hanoi";
$sqlite = "./db/hanoi.db";
try {
    $db = new PDO($mysqli,'root','');

    $data = json_decode(file_get_contents('php://input'));

    if($data -> param == 'fetch') {
        $req = $db -> prepare('SELECT position FROM etat_precedent');
        $req -> execute();
        $str = '';

        while($res = $req -> fetch(PDO::FETCH_OBJ)) {
            $str = $str.''.$res -> position;
        }
        echo $str;

    } elseif($data -> param == 'insert') {
        $tab = [$data -> rect_1, $data -> rect_2, $data -> rect_3, $data -> rect_4];

        for($i = 1; $i <= 4; $i++) {
            $req = $db -> prepare('UPDATE etat_precedent SET position = :pos WHERE id = :id');
            $req -> execute(array(
                        ':pos' => $tab[$i-1],
                        ':id' => $i
                    ));

           
        }
         echo 'insert to db succesfully';
    }

} catch (\Throwable $th) {
    throw $th;
}
?>