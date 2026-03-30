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
var center_y = 61

//llenar esto dinamicamente
var respuestas_data = []
var respuestas_correctas = 0
var total_respuestas = 0

function configureRespuestas(){
    for(i = 0;i<pacientes_data.length;i++){
        var respuestas_arr = []
        for(j = 0;j<pacientes_data[i].preguntas.length;j++){
            respuestas_arr.push({status:false})
            total_respuestas++
        }
        respuestas_data.push(respuestas_arr)
    }
}

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

        zonas_2.push([pw,ph,pw2,ph2])
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
        intro_mp3.play()
    }else{
        loadAudiosPregunta()
    }
}

function loadAudiosPregunta(){
    loadTrack({src:'./assets/audios/pregunta'+audio_paciente_i+'-'+audio_paciente_j+'.mp3', callBack: function(data){
        pacientes_data[audio_paciente_i-1].preguntas[audio_paciente_j-1].audio = data
        updateLoader()
        loadTrack({src:'./assets/audios/correcto'+audio_paciente_i+'-'+audio_paciente_j+'.mp3', callBack: function(data2){
            pacientes_data[audio_paciente_i-1].preguntas[audio_paciente_j-1].audiook = data2
            updateLoader()

            loadTrack({src:'./assets/audios/incorrecto'+audio_paciente_i+'-'+audio_paciente_j+'.mp3', callBack: function(data3){
                pacientes_data[audio_paciente_i-1].preguntas[audio_paciente_j-1].audioko = data3
                updateLoader()

                audio_paciente_j++
                if(audio_paciente_j>pacientes_data[audio_paciente_i-1].preguntas.length){
                    audio_paciente_j = 1
                    audio_paciente_i++
                }
                loadAudiosPreguntas()
            }})
        }})
    }})
}

var zonas = [
    [468,726,31,276],
    [443,713,521,290],
    [508,742,966,257],
    [411,742,1455,260]
]
var zonas_2 = []

var actual_p = -1
var animacion_zoom = null
var current_dialog = 0
var current_pregunta = 0
var letras = ['A','B','C','D']
var responding = false
var animacion_pregunta = null

function overzona(){
    over_mp3.play()
}

function omitirAudio(){
    if(global_audio!=null){
        global_audio.currentTime = (global_audio.duration - 0.5)
    }
}

function clickInicio(){
    getE('fondo').style.width = ancho_fondo+'px'
    getE('fondo').style.height = alto_fondo+'px'
    
    getE('fondo').style.left = (0-left_fondo)+'px'
    getE('fondo').style.top = (0-top_fondo)+'px'

    getE('mascara-1').className = 'mascara-off'
    getE('mascara-2').className = 'mascara-off'
    getE('dialogo-interaccion').innerHTML = ''
    getE('dialogos-container').className = 'dialogos-container-off'
    getE('dialogo-informacion-container').className = 'dialogo-informacion-out'

    animacion_zoom = setTimeout(function(){
        clearInterval(animacion_zoom)
        animacion_zoom = null

        //desbloquear siguiente
        if(actual_p<(pacientes_data.length-1)){
            pacientes_data[actual_p+1].status = 'unlocked'
            getE('personaje-'+(actual_p+2)).className = 'personaje personaje-unlocked'
            getE('zona-'+(actual_p+2)).className = 'zona zona-on'
        }else{
            setFinal()
        }

        actual_p = -1
        current_dialog = 0
        current_pregunta = 0

    },2000)
    modal_mp3.play()
}

function clickPaciente(p){
    actual_p = (p-1)
    var final_w = (ancho_fondo * 150) / 100
    var final_h = (alto_fondo * 150) / 100

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

    getE('fondo').style.left = final_x+'px'
    getE('fondo').style.top = final_y+'px'
    getE('fondo').style.width = final_w+'px'
    getE('fondo').style.height = final_h+'px'

    animacion_zoom = setTimeout(function(){
        clearInterval(animacion_zoom)
        animacion_zoom = null

        //colocar mascaras
        var width1 = zonas_2[actual_p][2]
        var width2 = 100-(zonas_2[actual_p][0]+zonas_2[actual_p][2])
        getE('mascara-1').style.width = width1+'%'
        getE('mascara-2').style.width = width2+'%'
        getE('mascara-1').className = 'mascara-on'
        getE('mascara-2').className = 'mascara-on'

        setDialogos()
    },2000)
    modal_mp3.play()
}

function setDialogos(){
    getE('dialogos-container').className = 'dialogos-container-on'
    getE('dialogo-informacion-container').className = 'dialogo-informacion-in'
    getE('dialogo-interaccion').className = 'dialogo-interaccion-on'

    getE('dialogo-informacion-info-txt').innerHTML = String(pacientes_data[actual_p].nombre+', '+pacientes_data[actual_p].edad+' años')
    getE('dialogo-informacion-foto-img').src = './assets/images/foto-'+pacientes_data[actual_p].id+'.png'
    setDialogo()
}

function setDialogo(){
    var div_d = document.createElement('div')
    var tipo = pacientes_data[actual_p].dialogos[current_dialog].person
    div_d.className = 'dialogo-'+tipo+' dialogo-'+tipo+'-on'

    var div_h = ''
    div_h+='<div class="dialogo-'+tipo+'-title">'
    if(tipo=='user'){
        div_h+='<h5>'+pacientes_data[actual_p].nombre+', '+pacientes_data[actual_p].edad+' años:</h5>'
    }else{
        div_h+='<h5>Doctor</h5>'
    }
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
        global_audio = null
        nextDialogo()
    }
    mensaje_mp3.currentTime = 0
    mensaje_mp3.play()
}

function nextDialogo(){
    current_dialog++
    if(current_dialog>=pacientes_data[actual_p].dialogos.length){
        getE('dialogo-interaccion').className = 'dialogo-interaccion-off'
        
        //empezar con pregunta
        setPregunta()
    }else{
        setDialogo()
    }
}

function setPregunta(){
    getE('dialogo-pregunta-enunciado-txt').innerHTML = pacientes_data[actual_p].preguntas[current_pregunta].enunciado
    var opciones_html = ''
    for(i = 0;i<pacientes_data[actual_p].preguntas[current_pregunta].opciones.length;i++){
        opciones_html+='<div id="dialogo-pregunta-respuesta-'+(current_pregunta+1)+'-'+(i+1)+'" class="dialogo-pregunta-respuesta normal" onclick="clickRespuesta('+(i+1)+')">'
            opciones_html+='<h6>'+letras[i]+'</h6>'
            opciones_html+='<p>'+pacientes_data[actual_p].preguntas[current_pregunta].opciones[i]+'</p>'
        opciones_html+='</div>'
    }
    getE('dialogo-pregunta-respuestas').innerHTML = opciones_html
    getE('dialogo-pregunta').className = 'dialogo-pregunta-on'

    global_audio = pacientes_data[actual_p].preguntas[current_pregunta].audio
    global_audio.play()
}

function clickRespuesta(r){
    if(!responding){
        responding = true
        if(global_audio!=null){
            global_audio.pause()
        }
        if(r==pacientes_data[actual_p].preguntas[current_pregunta].correcta){
            getE('dialogo-pregunta-respuesta-'+(current_pregunta+1)+'-'+r).className = 'dialogo-pregunta-respuesta correcta'
            global_audio = pacientes_data[actual_p].preguntas[current_pregunta].audiook
            getE('dialogo-pregunta-estado-txt').innerHTML = 'CORRECTO'
            getE('dialogo-pregunta-retroalimentacion').innerHTML = pacientes_data[actual_p].preguntas[current_pregunta].retroalimentacionok
            respuestas_data[actual_p][current_pregunta].status = true
            respuestas_correctas++
            correcto_mp3.play()
        }else{
            getE('dialogo-pregunta-respuesta-'+(current_pregunta+1)+'-'+r).className = 'dialogo-pregunta-respuesta incorrecta'
            getE('dialogo-pregunta-respuesta-'+(current_pregunta+1)+'-'+pacientes_data[actual_p].preguntas[current_pregunta].correcta).className = 'dialogo-pregunta-respuesta correcta'
            global_audio = pacientes_data[actual_p].preguntas[current_pregunta].audioko
            getE('dialogo-pregunta-estado-txt').innerHTML = 'INCORRECTO'
            getE('dialogo-pregunta-retroalimentacion').innerHTML = pacientes_data[actual_p].preguntas[current_pregunta].retroalimentacionko
            incorrecto_mp3.play()
        }

        
        getE('dialogo-pregunta-bot').className = 'dialogo-pregunta-bot-on'
        global_audio.play()
        global_audio.onended = function(){
            global_audio.onended = null
            global_audio = null
            responding = false
            //siguiente pregunta

            getE('dialogo-pregunta-bot').className = 'dialogo-pregunta-bot-off'
            getE('dialogo-pregunta').className = 'dialogo-pregunta-off'

            animacion_pregunta = setTimeout(function(){
                clearInterval(animacion_pregunta)
                animacion_pregunta = null

                current_pregunta++
                if(current_pregunta>=pacientes_data[actual_p].preguntas.length){
                    clickInicio()
                }else{
                    setPregunta()
                }
            },500)
        }
    }
}

function setFinal(){
    //mirar respuestas correctas
    var calificacion = parseInt((respuestas_correctas * 100) / total_respuestas)
    if(calificacion<=33){
        getE('modal-final-title-txt1').innerHTML = 'En Formación'
    }else if(calificacion>33&&calificacion<=66){
        getE('modal-final-title-txt1').innerHTML = 'Buen Clínico'
    }else if(calificacion>66){
        getE('modal-final-title-txt1').innerHTML = 'Médico Experto ECNT 🏆'
    }
    getE('modal-final-title-txt2').innerHTML = String(respuestas_correctas+'/'+total_respuestas+' ('+calificacion+'%)')
    
    getE('modal-final').className = 'modal-final-on'
    final_mp3.play()
}