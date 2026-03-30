var pacientes_data = [
	{
		id:1,
		status:'unlocked',
		center:15,
		nombre:'Carlos',
		edad:'52',
		ecnt:'Por definir',
		dialogos:[
			{
				audio:null,
				person:'user',
				text:'Doctor... me duele mucho el pecho. Siento que me aprietan el corazón. También me duele el brazo izquierdo.'
			},{
				audio:null,
				person:'user',
				text:'Llevo 25 años fumando. Nunca hago ejercicio. Como mucho frito y salado. Me dijeron que tengo la presión alta pero nunca le hice caso'
			},{
				audio:null,
				person:'doctor',
				text:'Veo varios signos de alarma, Carlos. Analicemos juntos lo que está pasando'
			}
		],
		preguntas:[
			{
				audio:null,
				audiook:null,
				audioko:null,
				enunciado:'¿Qué tipo de ECNT describe mejor lo que tiene Carlos?',
				opciones:[
					'Cáncer de colon',
					'Enfermedad cardiocerebrovascular (ECV)',
					'Diabetes mellitus',
					'Enfermedad respiratoria crónica'
				],
				correcta:2,
				retroalimentacionok:'El dolor de pecho con irradiación al brazo y presión alta son señales de una ECV - grupo de trastornos del corazón, cerebro y vasos sanguíneos.',
				retroalimentacionko:'Sus síntomas (dolor torácico, brazo izquierdo, presión alta) corresponden a una Enfermedad Cardiocerebrovasvascular (ECV).'
			},{
				audio:null,
				audiook:null,
				audioko:null,
				enunciado:'¿Cuál es el factor de riesgo MODIFICABLE más crítico en Carlos?',
				opciones:[
					'Su edad de 52 años',
					'Su sexo masculino',
					'Tabaquismo y sedentarismo',
					'Sus antecedentes familiares'
				],
				correcta:3,
				retroalimentacionok:'El tabaquismo y el sedentarismo son factores MODIFICABLES - los más relevantes porque están directamente relacionados con el estilo de vida.',
				retroalimentacionko:'Edad y sexo son NO modificables. El tabaquismo y sedentarismo son los factores MODIFICABLES clave: dependen del estilo de vida y pueden cambiarse.'
			},{
				audio:null,
				audiook:null,
				audioko:null,
				enunciado:'¿Qué afirmación sobre las ECV es correcta?',
				opciones:[
					'Se originan principalmente por infecciones agudas',
					'Solo afectan el corazón, no el cerebro',
					'Incluyen infarto, ACV, enfermedades coronarias e hipertensión',
					'No requieren seguimientos continuo'
				],
				correcta:3,
				retroalimentacionok:'Las ECV incluyen infarto de miocardio, ACV, enfermedades coronarias, arteriales periféricas e hipertensión. Son crónicas: requieren seguimiento continuo.',
				retroalimentacionko:'Las ECV son un grupo de trastornos del corazón, el cerebro y los vasos sanguíneos. Incluyen infarto, ACV, enfermedades coronarias, arteriales periféricas e hipertensión.'
			}
		]
	},
	{
		id:2,
		status:'locked',
		center:38.75,
		nombre:'Andrés',
		edad:'45',
		ecnt:'Por definir',
		dialogos:[
			{
				audio:null,
				person:'user',
				text:'Doctor, he bajado mucho de peso sin querer. Tengo un nódulo en el cuello que apareció hace un mes. Me siento muy cansado.'
			},{
				audio:null,
				person:'user',
				text:'Fumé toda mi vida. Bebo alcohol frecuentemente. Mi madre tuvo lo mismo a los 55 años.'
			},{
				audio:null,
				person:'doctor',
				text:'Andrés, debo ser honesto: estos síntomas requieren evaluación urgente. Hablemos sobre lo que podría estar pasando.'
			}
		],
		preguntas:[
			{
				audio:null,
				audiook:null,
				audioko:null,
				enunciado:'¿Con qué ECNT son más compatibles los síntomas de Andrés?',
				opciones:[
					'Asma bronquial',
					'Hipertensión arterial',
					'Cáncer',
					'Diabetes mellitus'
				],
				correcta:3,
				retroalimentacionok:'La pérdida de peso no intencional, el nódulo y el cansancio extremo son señales de alerta de cáncer - enfermedad donde células crecen de forma descontrolada.',
				retroalimentacionko:'Los síntomas de Andrés (pérdida de peso, nódulo, fatiga) son señales de alerta de cáncer: enfermedad en que células crecen de modo descontrolado y pueden diseminarse.'
			},{
				audio:null,
				audiook:null,
				audioko:null,
				enunciado:'¿Cuál es la definición correcta de cáncer?',
				opciones:[
					'Infección viral que ataca el sistema inmune',
					'Enfermedad en que las células crecen de modo descontrolado y pueden diseminarse',
					'Trastorno metabólico que afecta el uso del azúcar',
					'Inflamación crónica de los bronquios'
				],
				correcta:2,
				retroalimentacionok:'El cáncer es una enfermedad en la que algunas células del cuerpo crecen de manera descontrolada y pueden diseminarse a otras partes. Incluye pulmón, mama, cuello uterino, colon y recto, entre otros.',
				retroalimentacionko:'El cáncer es la enfermedad en que algunas células crecen de modo descontrolado y pueden diseminarse. Incluye pulmón, mama, cuello uterino, colon y recto, entre otros.'
			},{
				audio:null,
				audiook:null,
				audioko:null,
				enunciado:'El tabaquismo y el alcohol en Andrés son factores de riesgo',
				opciones:[
					'No modificables: ya forman parte de su historia',
					'Modificables: directamente relacionados con el estilo de vida',
					'Irrelevantes si el cáncer ya está presente',
					'Solo son factores de riesgo para enfermedades respiratorias'
				],
				correcta:3,
				retroalimentacionok:'Tabaquismo y alcohol son factores MODIFICABLES y comportamentales - los más relevantes porque dependen del estilo de vida y pueden cambiarse.',
				retroalimentacionko:'Tabaquismo y alcohol son factores MODIFICABLES. Los factores comportamentales modificables son los más relevantes al estar directamente relacionados con el estilo de vida.'
			}
		]
	},
	{
		id:3,
		status:'locked',
		center:63.5,
		nombre:'Rosa',
		edad:'65',
		ecnt:'Por definir',
		dialogos:[
			{
				audio:null,
				person:'user',
				text:'Doctor, llevo años con esta tos que no se va. Me falta el aire cuando camino. A veces hay como un silbido al respirar.'
			},{
				audio:null,
				person:'user',
				text:'Dejé de fumar hace 5 años, pero antes fumé 30 años. Cocinaba con leña toda mi vida en casa cerrada.'
			},{
				audio:null,
				person:'doctor',
				text:'Rosa, lo que describes afecta el aparato respiratorio. Vamos a explorar esto juntos.'
			}
		],
		preguntas:[
			{
				audio:null,
				audiook:null,
				audioko:null,
				enunciado:'Pregunta 1: ¿Qué grupo de ECNT afecta a Rosa?',
				opciones:[
					'Diabetes mellitus',
					'Cancer de pulmon',
					'Enfermedades respiratorias crónicas',
					'Enfermedades cardiocerebrovasculares'
				],
				correcta:3,
				retroalimentacionok:'La tos crónica, falta de aire y silbidos al respirar son signos de enfermedades respiratorias crónicas, que afectan bronquios, pulmones y caja torácica.',
				retroalimentacionko:'Los síntomas de Rosa (tos crónica, disnea, sibilancias) corresponden a enfermedades respiratorias crónicas como EPOC o asma.'
			},{
				audio:null,
				audiook:null,
				audioko:null,
				enunciado:'¿Cuáles de las siguientes son enfermedades respiratorias crónicas?',
				opciones:[
					'Infarto y ACV',
					'Asma y EPOC',
					'Diabetes tipo 1 y tipo 2',
					'Cáncer de mama y cuello uterino'
				],
				correcta:2,
				retroalimentacionok:'Las enfermedades respiratorias crónicas incluyen el asma y la EPOC (Enfermedad Pulmonar Obstructiva Crónica).',
				retroalimentacionko:'Las enfermedades respiratorias crónicas son el asma y la EPOC. Afectan los bronquios, pulmones y caja torácica.'
			},{
				audio:null,
				audiook:null,
				audioko:null,
				enunciado:'La exposición al humo de leña en casa cerrada es un factor de riesgo',
				opciones:[
					'No modificable: Es parte de la cultura.',
					'Modificable: puede cambiarse mejorando la ventilación o el combustible.',
					'No existe relación entre el humo de la leña y enfermedades respiratorias.',
					'Solo afecta a personas con antecedentes familiares.'
				],
				correcta:2,
				retroalimentacionok:'El humo de leña en ambientes cerrados es un factor MODIFICABLE. Como todos los factores comportamentales, está relacionado con el estilo de vida y puede intervenirse.',
				retroalimentacionko:'El humo de leña es un factor MODIFICABLE - puede cambiarse. Los factores modificables son los más relevantes por estar directamente relacionados con el estilo de vida.'
			}
		]
	},
	{
		id:4,
		status:'locked',
		center:86.67,
		nombre:'Lucía',
		edad:'48',
		ecnt:'Por definir',
		dialogos:[
			{
				audio:null,
				person:'user',
				text:'Doctor, siempre tengo mucha sed. Me levanto varias veces por la noche para orinar. La vista se me pone borrosa a veces.'
			},{
				audio:null,
				person:'user',
				text:'Soy muy sedentaria. Como mucho dulce y comida procesada. Tengo sobrepeso. Mi mamá y mi abuela tuvieron esto mismo.'
			},{
				audio:null,
				person:'doctor',
				text:'Lucía, lo que describes me indica un problema en cómo tu cuerpo usa el azúcar. Veamos qué está pasando.'
			}
		],
		preguntas:[
			{
				audio:null,
				audiook:null,
				audioko:null,
				enunciado:'¿Qué ECNT describe mejor el caso de Lucía?',
				opciones:[
					'Enfermedad cardiocerebrovascular',
					'Cáncer de cuello uterino',
					'Diabetes mellitus',
					'EPOC'
				],
				correcta:3,
				retroalimentacionok:'Sed excesiva, orinar frecuente y visión borrosa son síntomas clásicos de diabetes mellitus: trastorno metabólico que afecta cómo el cuerpo usa el azúcar en la sangre.',
				retroalimentacionko:'Los síntomas de Lucía (polidipsia, poliuria, visión borrosa) corresponden a diabetes mellitus: trastorno metabólico que afecta el uso del azúcar en la sangre.'
			},{
				audio:null,
				audiook:null,
				audioko:null,
				enunciado:'¿Cuál es la definición correcta de diabetes mellitus?',
				opciones:[
					'Inflamación de las arterias coronarias del corazón',
					'Crecimiento celular descontrolado en el páncreas',
					'Trastorno metabólico que afecta como el cuerpo usa el azúcar',
					'Obstrucción crónica del flujo de aire en los pulmones'
				],
				correcta:3,
				retroalimentacionok:'¡Exacto! La diabetes mellitus es un trastorno metabólico que afecta la forma en que el cuerpo utiliza el azúcar en la sangre.',
				retroalimentacionko:'La diabetes mellitus es un trastorno metabólico que afecta la forma en que el cuerpo utiliza el azúcar en la sangre. No es una infección ni un cáncer.'
			},{
				audio:null,
				audiook:null,
				audioko:null,
				enunciado:'¿Cuál de estos factores en Lucía NO es modificable?',
				opciones:[
					'El sedentarismo.',
					'La alimentación rica en azúcares.',
					'El sobrepeso.',
					'Los antecedentes familiares (mamá y abuela).'
				],
				correcta:4,
				retroalimentacionok:'¡Bien! Los antecedentes familiares son un factor NO modificable: no pueden cambiarse. Los no modificables incluyen edad, sexo, genética y antecedentes familiares.',
				retroalimentacionko:'Los antecedentes familiares son NO modificables (junto con edad, sexo y genética). El sedentarismo, dieta y sobrepeso son factores MODIFICABLES que sí pueden cambiarse.'
			}
		]
	}
]