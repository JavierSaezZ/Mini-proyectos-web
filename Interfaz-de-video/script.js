// Select the HTML5 video
const video = document.querySelector("#video")

const fullvideo = document.querySelector("#fullvideo")
console.log(fullvideo)
const fullvideobtn = document.querySelector("#btnpantallacomple")
const tiempo= document.querySelector("#tiempo")
const controles =   document.querySelector(".controls");
const timeline = document.querySelector(".timeline")
const bar= document.querySelector(".bar")
const seekTooltip = document.getElementById('seek-tooltip');
i=0;
//Foramtear tiempo video
function format(s) {
    var m = Math.floor(s / 60);
    m = (m >= 10) ? m : "0" + m;
    s = Math.floor(s % 60);
    s = (s >= 10) ? s : "0" + s;
    return m + ":" + s;
}


//Si el raton no se mueve 
function debounce(func, timeout) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        document.querySelector(".controls").style.opacity = "1";
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}


//change progress bar on click
timeline.addEventListener('click', (e) =>{
    const progressTime = (e.offsetX / timeline.offsetWidth) * video.duration
    video.currentTime = progressTime



    
  })
  
  video.addEventListener('timeupdate', () =>{
    let curr = (video.currentTime / video.duration) * 100
    document.querySelector('.inner').style.width = `${curr}%`
  })
  
  function updateSeekTooltip(event) {
    const skipTo = Math.round((event.offsetX / event.target.clientWidth) * video.duration);
    bar.setAttribute('data-seek', skipTo)
    console.log(event.target.clientWidth);
    const t = format(skipTo);
    seekTooltip.textContent = t;
    const rect = video.getBoundingClientRect();
    console.log(`${event.pageX - rect.left}px`)
    seekTooltip.style.left = `${event.pageX - rect.left}px`;
    
  }
  






  bar.addEventListener('mousemove', updateSeekTooltip);


const functionToRunAfterInactivity = () => {
    if (controles.matches(':hover')){

    }
    else{
  controles.style.opacity = "0";
    console.log("Mouse has not moved for 10 seconds");
    }
};

addEventListener("mousemove", debounce(functionToRunAfterInactivity, 3000));

alert(format(video.duration))

// set the pause button to display:none by default
document.querySelector(".fa-pause").style.display = "none"
// Ocultar el botón de contraer por defecto
document.querySelector(".fa-contract").style.display = "none";
// update the progress bar
video.addEventListener("timeupdate", () => {
    
})


// pause or play the video
const play = (e) => {
    // Condition when to play a video
    if(video.paused){
        console.log(i)
        console.log(Math.trunc(video.currentTime))
        document.querySelector(".fa-play").style.display = "none"
        document.querySelector(".fa-pause").style.display = "block"
        video.play()

    
        
            var canvas = document.createElement("canvas");
            canvas.width = video.videoWidth * scale;
            canvas.height = video.videoHeight * scale;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        
            var img = document.createElement("img");
           img.src = canvas.toDataURL();
           $('#thumbnail').append(img);
        
           video_obj.currentTime = 0;
        
        


        tiempovideo=setInterval(function () {
            tiempo.innerHTML=format(video.currentTime) 
            let curr = (video.currentTime / video.duration) * 100
    if(video.ended){
        document.querySelector(".fa-play").style.display = "block"
        document.querySelector(".fa-pause").style.display = "none"
    }
    // console.log(curr)
    document.querySelector('.inner').style.width = `${curr}%`
            // console.log(video.currentTime)
        }, 10);
       
}
    else{
        document.querySelector(".fa-play").style.display = "block"
        document.querySelector(".fa-pause").style.display = "none"
        video.pause()
        clearInterval(tiempovideo);
       
    }
}
// --- LÓGICA DEL TIEMPO ---
// Cargar el tiempo total cuando el vídeo está listo
video.addEventListener('loadedmetadata', () => {
    document.getElementById('total-time').innerText = format(video.duration);
});

// Actualizar el tiempo actual mientras se reproduce
// (Añade esto dentro del evento 'timeupdate' que ya tienes)
video.addEventListener('timeupdate', () => {
    document.getElementById('current-time').innerText = format(video.currentTime);
});


// --- LÓGICA DEL VOLUMEN ---
const volumeSlider = document.getElementById("volume-slider");
const volIcon = document.getElementById("vol-icon");
const muteBtn = document.getElementById("mute-btn");
let previousVolume = 1;

volumeSlider.addEventListener("input", (e) => {
    video.volume = e.target.value;
    updateVolumeIcon(video.volume);
});

muteBtn.addEventListener("click", () => {
    if (video.volume > 0) {
        previousVolume = video.volume; // Guarda el volumen antes de mutear
        video.volume = 0;
        volumeSlider.value = 0;
    } else {
        video.volume = previousVolume; // Restaura el volumen anterior
        volumeSlider.value = previousVolume;
    }
    updateVolumeIcon(video.volume);
});

function updateVolumeIcon(vol) {
    // Cambiamos la propiedad 'src' para cargar tus imágenes
    if (vol === 0) {
        volIcon.src = "imagenes/mute.png";
    } else if (vol < 0.33) {
        volIcon.src = "imagenes/volumelow.png";
    } else if (vol < 0.66) {
        volIcon.src = "imagenes/volumemedium.png";
    } else {
        volIcon.src = "imagenes/volumehigh.png";
    }
}


// --- LÓGICA DEL BOTÓN REPEAT ---
const shuffleBtn = document.getElementById("shuffle-btn");
const repeatIcon = document.getElementById("repeat-icon");
let shuffleState = 0; // 0: Desactivado, 1: Bucle normal, 2: Bucle de 1

shuffleBtn.addEventListener("click", () => {
    shuffleState = (shuffleState + 1) % 3;
    
    if (shuffleState === 0) {
        repeatIcon.src = "imagenes/repeat.png";
        repeatIcon.style.opacity = "0.5"; // Opaco para indicar que está apagado
        video.loop = false;
    } else if (shuffleState === 1) {
        repeatIcon.src = "imagenes/repeat.png";
        repeatIcon.style.opacity = "1"; // Color normal para indicar encendido
        video.loop = false;
    } else if (shuffleState === 2) {
        repeatIcon.src = "imagenes/repeatone.png"; // Cambia a la imagen de bucle único
        repeatIcon.style.opacity = "1";
        video.loop = true; // Activa el bucle nativo del vídeo
    }
});

// trigger fullscreen
const fullScreen = (e) => {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null);
    var docElm = document.documentElement; 

    if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        // Ocultar expandir, mostrar contraer
        document.querySelector(".fa-expand").style.display = "none";
        document.querySelector(".fa-contract").style.display = "inline-block"; 
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        // Mostrar expandir, ocultar contraer
        document.querySelector(".fa-expand").style.display = "inline-block";
        document.querySelector(".fa-contract").style.display = "none";
    }
}
//   if(document.fullscreenElement) {
//     e.preventDefault()
//     fullvideo.exitFullscreen()
//   }
//   else{
// console.log(document.fullscreenElement);
//         e.preventDefault()
//     fullvideo.requestFullscreen()
//   }
// }
// download the 
const download = (e) => {
    e.preventDefault()
    let a = document.createElement('a')
    a.href = video.src 
    a.target = "_blank"
    a.download = ""
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
// rewind the current time
const rewind = (e) => {
    video.currentTime = video.currentTime - 5
    tiempo.innerHTML=format(video.currentTime) 
}
// forward the current time
const forward = (e) => {
    video.currentTime = video.currentTime + 5
    tiempo.innerHTML=format(video.currentTime) 
}



//   // The element that is fluid width
//   $fluidEl = $("body");

// // Figure out and save aspect ratio for each video
// fullvideo.each(function() {

//   $(this)
//     .data('aspectRatio', this.height / this.width)

//     // and remove the hard coded width/height
//     .removeAttr('height')
//     .removeAttr('width');

// });

// // When the window is resized
// $(window).resize(function() {

//   var newWidth = $fluidEl.width();

//   // Resize all videos according to their own aspect ratio
//   $allVideos.each(function() {

//     var $el = $(this);
//     $el
//       .width(newWidth)
//       .height(newWidth * $el.data('aspectRatio'));

//   });

// // Kick off one resize to fix all videos on page load
// }).resize();