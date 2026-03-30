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

var audio_paciente_i = 1
var audio_paciente_j = 1

function loadAudiosDialogos(){
    if(audio_paciente_i>pacientes_data.length){
        audio_paciente_i = 1
        audio_paciente_j = 1
        loadAudiosPreguntas()
    }else{
        loadAudiosDialogo()
    }
}

function loadAudiosDialogo(){
    loadTrack({src:'./assets/audios/'+audio_paciente_i+'-'+audio_paciente_j+'.mp3', callBack: function(data){
        pacientes_data[audio_paciente_i-1].dialogos[audio_paciente_j-1].audio = data
        updateLoader()
        audio_paciente_j++
        if(audio_paciente_j>pacientes_data[audio_paciente_i-1].dialogos.length){
            audio_paciente_j = 1
            audio_paciente_i++
        }
        loadAudiosDialogos()
    }})
}

function loadAudiosPreguntas(){
    if(audio_paciente_i>pacientes_data.length){
        unsetLoader()
        underground_mp3.play()
    }else{
        loadAudiosPregunta()
    }
}

function loadAudiosPregunta(){
    loadTrack({src:'./assets/audios/pregunta'+audio_paciente_i+'-'+audio_paciente_j+'.mp3', callBack: function(data){
        pacientes_data[audio_paciente_i-1].preguntas[audio_paciente_j-1].audio = data
        updateLoader()
        audio_paciente_j++
        if(audio_paciente_j>pacientes_data[audio_paciente_i-1].preguntas.length){
            audio_paciente_j = 1
            audio_paciente_i++
        }
        loadAudiosPreguntas()
    }})
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

var current_dialog = 0

function setDialogos(){
    getE('dialogos-container').className = "dialogos-container-on"
    getE('dialogo-informacion-container').className = 'dialogo-informacion-in'
    getE('dialogo-interaccion').className = 'dialogo-interaccion-on'

    setDialogo()
}

function setDialogo(){
    var div_d = document.createElement('div')
    var tipo = pacientes_data[actual_p].dialogos[current_dialog].person
    div_d.className = 'dialogo-'+tipo+' dialogo-'+tipo+'-on'

    var div_h = ''    
    div_h+='<div class="dialogo-'+tipo+'-title">'
        div_h+='<h5>'+pacientes_data[actual_p].nombre+', '+pacientes_data[actual_p].edad+' años:</h5>'
    div_h+='</div>'
    div_h+='<div class="dialogo-'+tipo+'-text">'
        div_h+='<p>'+pacientes_data[actual_p].dialogos[current_dialog].text+'</p>'
    div_h+='</div>'

    div_d.innerHTML = div_h
    getE('dialogo-interaccion').appendChild(div_d)

    global_audio = pacientes_data[actual_p].dialogos[current_dialog].audio
    global_audio.play()
    global_audio.onended = function(){
        global_audio.onended = null
        nextDialogo()
    }
}

function nextDialogo(){
    current_dialog++
    if(current_dialog>=pacientes_data[actual_p].dialogos.length){
        //empezar con pregunta
    }else{
        setDialogo()
    }
}