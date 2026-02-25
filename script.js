var ff = "";

var ttl = document.createElement("title");
ttl.innerHTML = "Just For You ❤️";
document.head.insertBefore(ttl, document.head.querySelector("script"));

var sss = document.createElement("style");
sss.innerHTML = ff;
document.head.insertBefore(sss, document.head.querySelector("script"));
var konten, musik, nomorWhatsapp;

var klikA = new Audio("https://dekatutorial.github.io/ct/klk.mp3");
klikA.autoplay = false;
klikA.loop = false;
var isy = true;
function typplay() {
  var typ = new Audio("https://dekatutorial.github.io/ct/typ.mp3");
  typ.autoplay = false;
  typ.loop = false;
  if (isy) {
    typ.play();
    isy = false;
    setTimeout(() => {
      isy = true;
    }, 100);
  }
}

var teksHai = "Hai, ada surat buat kamu nih";
function DekaTutorial(konten, musik, nomorWhatsapp) {
  // ================
  // var audio, klik;
  if (musik != "") {
    var audio = new Audio(musik);
    audio.autoplay = true;
    audio.loop = true;
  }

  // ================
  for (var x = 0; x < Math.floor(window.innerWidth / 40); x++) {
    var divku = document.createElement("div");
    document.querySelector(".v").appendChild(divku);
  }
  for (var x = 0; x < Math.floor(window.innerHeight / 40); x++) {
    var divku = document.createElement("div");
    document.querySelector(".h").appendChild(divku);
  }
  // ==================

  // konten = konten.reverse();
  konten.forEach((elem) => {
    typeof elem.ucapan === "undefined" ? (elem.ucapan = "") : {};
    typeof elem.gambar === "undefined" ? (elem.gambar = "") : {};
  });
  var no = 0;
  var el = 0;
  var x = 0;
  for (var i = 0; i < konten.length; i++) {
    var div = document.createElement("div");
    div.classList.add("pu-ctnr");
    div.classList.add("pu-ctn");
    div.setAttribute("style", "display:none");
    div.innerHTML =
      '<div class="pu"><div class="t"><div><div></div></div></div><div class="c">' +
      (konten[i].gambar != "" ? '<img src="' + konten[i].gambar + '" />' : "") +
      (konten[i].ucapan != "" ? "<p>" + konten[i].ucapan + "</p>" : "") +
      '<div class="btn"><button onclick="' +
      '">OK</button><!-- <button>BANGET</button> --></div></div></div>';
    document.body.appendChild(div);
    var btnOk = document.querySelectorAll(".pu-ctn")[el++].querySelectorAll("button")[0];

    if (i != konten.length - 1) {
      btnOk.addEventListener("click", () => {
        show(no, no + 1);
        no++;
      });
    } else {
      btnOk.addEventListener("click", () => {
        hide(no);
        showPopup(".ta");
        document.querySelector(".ta").querySelector("button").addEventListener("click", kirimPesan);
        no = 0;
      });
    }
    // console.log(konten.length - 1);
  }

  function startshow() {
    var popup = document.querySelectorAll(".pu-ctn");
    popup[0].style.display = "flex";
  }
  function show(elem, next) {
    klikA.play();
    // console.log(elem + "+" + next);
    var popup = document.querySelectorAll(".pu-ctn");
    popup[elem].style.display = "none";
    popup[next].style.display = "flex";
  }
  function hide(elem) {
    // console.log(elem);
    var popup = document.querySelectorAll(".pu-ctn");
    popup[konten.length - 1].style.display = "none";
  }
  function showPopup(klass) {
    klikA.play();
    var popup = document.querySelector(klass);
    popup.style.display = "flex";
    if (klass == ".ta") {
      popup.querySelector("textarea").focus();
    }
  }
  function hidePopup(klass) {
    var popup = document.querySelector(klass);
    popup.style.display = "none";
  }
  function kirimPesan() {
    var pesan = document.querySelector(".ta").querySelector("textarea").value;

    if (pesan != "") {
      hidePopup(".ta");
      if (nomorWhatsapp.length > 10) {
        showPopup(".towa");
        document
          .querySelector(".towa")
          .querySelector("button")
          .addEventListener("click", () => {
            klikA.play();
            hidePopup(".towa");
            if (nomorWhatsapp === "nomorWhatsapp") {
              location.assign("https://wa.me/" + "?text=" + pesan);
            } else {
              location.assign("https://wa.me/" + nomorWhatsapp + "?text=" + pesan);
            }
          });
      } else {
        showPopup(".pgs");
        var data = new FormData();
        data.append("pesan", pesan);

        fetch("func.php?act=add", {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then(async (data) => {
            if (data.Status == 200) {
              // console.log("berhasil");
              terkirim();
              // klikA.play();
            }
          });
      }
    } else {
      kosong();
    }
  }
  document.getElementById("ml").addEventListener("click", () => {
    klikA.play();
    audio.play();
    startshow();
  });

  document.querySelector("textarea").addEventListener("keypress", typplay);

  function kosong() {
    hidePopup(".ta");
    showPopup(".jksg");
    document
      .querySelector(".jksg")
      .querySelector("button")
      .addEventListener("click", () => {
        hidePopup(".jksg");
        showPopup(".ta");
      });
  }

  function terkirim() {
    document
      .querySelector(".scs")
      .querySelector("button")
      .addEventListener("click", () => {
        klikA.play();
        hidePopup(".scs");
      });

    showPopup(".scs");
    document.querySelector(".ta").querySelector("textarea").value = "";
    hidePopup(".pgs");
  }
  var pldr = document.querySelector(".pldr");
  var isRemove = false;
  function pldrRemove() {
    pldr.classList.add("rmv");
    setTimeout(() => {
      pldr.remove();
    }, 500);
  }
  setTimeout(() => {
    if (!isRemove) {
      pldrRemove();
    }
  }, 15000);
  window.addEventListener("load", () => {
    pldrRemove();
    isRemove = true;
  });
}
