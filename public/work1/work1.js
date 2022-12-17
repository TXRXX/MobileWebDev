$(function () {
    var open_count = 0;
    var open_card1 = 0;
    var open_card2 = 0;
    var all_card = 36;

    $("#stopBtn").hide();
    $("#view").hide();
    $("#playBtn").click(startGame);
    $("#stopBtn").click(stopGame);
    $("#view img").click(imgClick);

    function startGame() {
        shuffer();
        open_count = 0;
        all_card = 36;
        $("#view").show();
        $("#stopBtn").show();
        $("#playBtn").hide();
    }

    function stopGame() {
        $("#view").hide();
        $("#stopBtn").hide();
        $("#playBtn").show();
    }

    function shuffer() {
        var list = [];
        list[0] = 0;

        for (var i = 1; i <= 18; i++) {
            list.push(i);
            list.push(i);
        }

        console.log(list);
        for (var i = 1; i < 100; i++) {
            var a = 1 + Math.round(Math.random() * 35);
            var b = 1 + Math.round(Math.random() * 35);
            var t = list[a];
            list[a] = list[b];
            list[b] = t;
        }

        $("#view img").attr("src", "img/0.jpg").attr("state", 0);
        for (var i = 1; i <= 36; i++) {
            $("#img" + i).attr("srcx", "img/" + list[i] + ".png");
        }
    }

    function imgClick() {
        // console.log(this);
        if ($(this).attr("state") != 0) return;
        if (open_count >= 2) return;

        open_count++;
        var s = $(this).attr("srcx");
        if (open_count == 1) open_card1 = s;
        if (open_count == 2) open_card2 = s;
        $(this).hide().attr("src", s).slideDown(500);
        $(this).attr("state", 1);
        if (open_count == 2) {
            setTimeout(() => {
                if (open_card1 == open_card2) {
                    all_card -= 2;
                    $("[state=1]").fadeOut(1300).attr("state", 2);
                } else {
                    $("[state=1]").attr("state", 0).attr("src", "img/0.jpg");
                }
                open_count = 0;
                open_card2 = "";
                open_card1 = "";
            }, 1300);
        }

        console.log(all_card);
        if (all_card == [2,2]) {
            Swal.fire({
                title: "<span style='color: #fff'>YOU WIN !</span>",
                icon: "success",
                confirmButtonColor: "rgba( 255, 255, 255, 0.25 )",
                background: "#355f75",
            });
        }
        // Swal.fire({
        //     title: "<span style='color: #fff'>YOU WIN !</span>",
        //     icon: "success",
        //     confirmButtonColor: "rgba( 255, 255, 255, 0.25 )",
        //     background: "#355f75",
        // })
    }
});
