<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hanoi</title>
    <link rel="stylesheet" href="./asset/style/style.css">
</head>
<body>
    <div class="imgs" style="display: none;">
        <img id="scleback" src="./asset/img/backgound.jpeg" alt="soclebg">
        <img id="block" src="./asset/img/block.jpeg" alt="block">
        
    </div>
    <div class="avant_garde">
        <h1>HANOI TOWER</h1>
        <div class="buttons">
            <button class="newGame">
                Nouveau jeux
            </button>
            <button class="continue">
                Reprendre le jeux
            </button>
        </div>
    </div>
    <style>
        .hide{
            top: -100%;
            opacity: 0;
        }
        .show{
            top: 0 !important;
            opacity: 1 !important;
        }
        .win{
            top: -100%;
            color: yellow;
            font-weight: bolder;
            opacity: 0;
            position: absolute;
            width: 100vw;
            height: 100vh;
            background-color: #00000088;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s;
        }
        .win-content{
            
            width: 350px;
            height: 250px;
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius:10px ;
            transition: .7s;
            background-image: url("./asset/img/pop-up.jpeg");
            background-repeat: no-repeat;
            background-size: cover;
        }
        .confirm{
            align-self: end;
            position: relative;
            top: 100px;
            right: 20px;
            
            color: rgb(255 255 0);
            font-weight: bolder;
            border-radius: 15px;
            letter-spacing: 0.15em;
            border: none;
            background-color: rgb(255 255 255);
        }
        .win form{
            color: inherit;
            position: relative;
            top: 40px;
        }
        form input{
            border-radius: 15px;
            padding: 7px;
            background-color: rgb(255 255 255);
            outline: none;
            border: none;
            
        }
        form label{
            position: relative;
            left: 20%;
            transition: 0.5s;
            top: 0;
        }
        .up{
            top:-22px;
        }
    </style>
    <main class="game">
        <div class="win">
            <div class="win-content">
                <h3>Terminer</h3>
                <div class="total-point">1225 point</div>
                <form action="#">
                    <label for="nom">Nom</label>
                    <input id="nom" name="nom" type="text">
                </form>
                <button class="confirm">Ok</button>
            </div>
        </div>
    </main>
    <script>
        let input = document.querySelector(".win input");
        let label = document.querySelector(".win label");
        let okButton = document.querySelector(".confirm");
        let win = document.body.querySelector(".win");
        input.addEventListener("focus",function(){
           label.classList.add("up");
        });
        input.addEventListener("blur",function(){
            if(input.value == "")
                label.classList.remove("up")
        });
        okButton.addEventListener("click",function(){
            win.classList.remove('show');
        });
    </script>
    <script src="./asset/script/script.js"></script>
</body>
</html>