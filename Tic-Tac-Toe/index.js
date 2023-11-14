$(function() {
  let gameEnded = false;
  let playerSymbol,computerSymbol;
  const symbol = document.querySelector("#symbol");
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  $(".attack").click(function() {
    let id_name = $(this).attr("id");
    if (id_name == 'atk_first') { 
      playerSymbol = "O";
      computerSymbol = "X";
      symbol.textContent = ("YOU : O     PC : X")
    } else { 
      computerSymbol = "O";
      playerSymbol = "X";
      symbol.textContent = ("YOU : X     PC : O")
      input_by_com();
    }
    $("#game").css("display", "block");
    $(".attack").not(this).prop("disabled", true);
    $(this).addClass("pushed");
  })

  $("#restart").click(function() {
    if (!gameEnded) {
      const confirmReset = window.confirm("リセットしますか？");
      if (!confirmReset) {
        return; 
      }
    }
    resetGame();
  });

  function resetGame() {
    $(".attack").prop("disabled", false);
    $(".attack").removeClass("pushed");
    $("#game").css("display", "none");
    $("td").empty();
    $("#start").removeClass("pushed");
    gameEnded = false;
    symbol.textContent = "";
  }

  $("td").click(function() {
    if (gameEnded) {
      alert("リセットボタンを押してください")
      return;
    }
    if ($(this).html()) {
      alert("入力できません")
    } else {
      $(this).html(playerSymbol);
      check_complete();
      if (!gameEnded) {
        input_by_com(); 
      }
    }
  })

  function input_by_com() {
    if (gameEnded) {
      return;
    }

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      const cellA = $(`#${a}`).html();
      const cellB = $(`#${b}`).html();
      const cellC = $(`#${c}`).html();
  
      if ((cellA === computerSymbol && cellB === computerSymbol && !cellC) ||
          (cellB === computerSymbol && cellC === computerSymbol && !cellA) ||
          (cellA === computerSymbol && cellC === computerSymbol && !cellB)) {
        if (cellA === '') {
          $(`#${a}`).html(computerSymbol);
        } else if (cellB === '') {
          $(`#${b}`).html(computerSymbol);
        } else if (cellC === '') {
          $(`#${c}`).html(computerSymbol);
        }
        check_complete();
        return;
      }
    }

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      const cellA = $(`#${a}`).html();
      const cellB = $(`#${b}`).html();
      const cellC = $(`#${c}`).html();

      if ((cellA === playerSymbol && cellB === playerSymbol && !cellC) ||
          (cellB === playerSymbol && cellC === playerSymbol && !cellA) ||
          (cellA === playerSymbol && cellC === playerSymbol && !cellB)) {
            if (cellA === '') {
              $(`#${a}`).html(computerSymbol);
            } else if (cellB === '') {
              $(`#${b}`).html(computerSymbol);
            } else if (cellC === '') {
              $(`#${c}`).html(computerSymbol);
            }
        check_complete();
        return;
      }
    }
  
    const emptyCells = $("td").filter(function() {
      return !($(this).html());
    });
    
    if (emptyCells.length > 0) {
      const randomCell = emptyCells.eq(Math.floor(Math.random() * emptyCells.length));
      randomCell.html(computerSymbol);
      check_complete();
    }
  }
    
  function check_complete() {
    for (condition of winConditions) {
      const [a,b,c] = condition;
      const cellA = $(`#${a}`).html();
      const cellB = $(`#${b}`).html();
      const cellC = $(`#${c}`).html();
      if (cellA && cellA === cellB && cellA === cellC) {
        gameEnded = true; 
        setTimeout(function() {
          alert(`${cellA}の勝ち！`);
        }, 500);
        return;
      }
    }

    const allCellsFilled = $("td").not(":empty").length === 9;
    if (allCellsFilled && !gameEnded) {
      gameEnded = true; 
      setTimeout(function() {
        alert("引き分け！")
      }, 500);
    }
  }
})
