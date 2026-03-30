var i = 0;
var j = 0;

function getE(idname){
    return document.getElementById(idname)
}

function getRand(minimum,maximum){
    var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return randomnumber;
}

var scene_width = 3744
var scene_height = 2106
var ancho_fondo = 0
var alto_fondo = 0
var left_fondo = 0
var top_fondo = 0
var center_y = 75

function setFondo(){
    var ancho = window.innerWidth
    var percent = (ancho * 100) / scene_width
    var alto = (scene_height * percent) / 100
    
    while(alto<window.innerHeight){
        ancho++
        percent = (ancho * 100) / scene_width
        alto = (scene_height * percent) / 100
    }

    ancho_fondo = ancho
    alto_fondo = alto
    left_fondo = (ancho_fondo-window.innerWidth) / 2
    top_fondo = (alto_fondo-window.innerHeight) / 2

    getE('fondo').style.width = ancho_fondo+'px'
    getE('fondo').style.height = alto_fondo+'px'
    
    getE('fondo').style.left = (0-left_fondo)+'px'
    getE('fondo').style.top = (0-top_fondo)+'px'

    for(i = 0;i<zonas.length;i++){
        var pw = (zonas[i][0]*100)/1920
        var ph = (zonas[i][1]*100)/1080
        var pw2 = (zonas[i][2]*100)/1920
        var ph2 = (zonas[i][3]*100)/1080

        var w = (ancho_fondo * pw) / 100
        var h = (alto_fondo * ph) / 100
        var w2 = (ancho_fondo * pw2) / 100
        var h2 = (alto_fondo * ph2) / 100

        getE('zona-'+(i+1)).style.width = pw+'%'
        getE('zona-'+(i+1)).style.height = ph+'%'
        getE('zona-'+(i+1)).style.left = pw2+'%'
        getE('zona-'+(i+1)).style.top = ph2+'%'
        getE('personaje-'+(i+1)).style.width = pw+'%'
        getE('personaje-'+(i+1)).style.height = ph+'%'
        getE('personaje-'+(i+1)).style.left = pw2+'%'
        getE('personaje-'+(i+1)).style.top = ph2+'%'
    }
}

var zonas = [
    [468,726,31,276],
    [443,713,521,290],
    [508,742,966,257],
    [411,742,1455,260]
]

function overzona(){
    over_mp3.play()
}

var actual_p = -1
var animacion_zoom = null

function clickPaciente(p){
    actual_p = (p-1)
    var final_w = (ancho_fondo * 120) / 100
    var final_h = (alto_fondo * 120) / 100

    var real_x = (window.innerWidth * pacientes_data[actual_p].center) / 100
    var real_w = (final_w * pacientes_data[actual_p].center) / 100
    var final_x = real_x - real_w
    if(final_x>0){
        final_x = 0
    }
    if(final_x<(window.innerWidth-final_w)){
        final_x = window.innerWidth-final_w
    }

    var real_y = (window.innerHeight * center_y) / 100
    var real_h = (final_h * center_y) / 100
    var final_y = real_y - real_h
    if(final_y>0){
        final_y = 0
    }
    if(final_y<(window.innerHeight-final_h)){
        final_y = window.innerHeight-final_h
    }

    console.log(final_x,final_y)

    getE('fondo').className = 'fondo-zoom-in'
    getE('fondo').style.left = final_x+'px'
    getE('fondo').style.top = final_y+'px'
    getE('fondo').style.width = final_w+'px'
    getE('fondo').style.height = final_h+'px'

    animacion_zoom = setTimeout(function(){
        clearInterval(animacion_zoom)
        animacion_zoom = null

        setDialogos()
    },2000)
}


function setDialogos(){
    getE('dialogos-container').className = "dialogos-container-on"
    getE('dialogo-informacion-container').className = 'dialogo-informacion-in'
    getE('dialogo-interaccion').className = 'dialogo-interaccion-on'
}