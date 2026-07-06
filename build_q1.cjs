const fs = require('fs');
const path = require('path');

const enQuestions = [
  // CHAPTER 1 & 2
  {
    id: 'en_ch1_001', language: 'en', chapter: 1, topic: 'licenses', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'What is the minimum age to get a Class D driver license in New York without Driver Education?',
    choices: ['16', '17', '18', '21'],
    correctAnswer: '18', explanation: 'You must be 18, or 17 with a driver education certificate, to get a senior driver license.', source: 'Chapter 1'
  },
  {
    id: 'en_ch1_002', language: 'en', chapter: 1, topic: 'restrictions', difficulty: 'hard', isRoadSign: false, status: 'approved',
    question: 'If you have a Junior Learner Permit (Class DJ), between what hours are you completely forbidden from driving in Upstate NY?',
    choices: ['9 PM and 5 AM', '10 PM and 5 AM', 'Midnight and 5 AM', 'You can drive at any time with a parent'],
    correctAnswer: '9 PM and 5 AM', explanation: 'In upstate NY, you cannot drive between 9 PM and 5 AM with a DJ permit unless going to work/school with documentation.', source: 'Chapter 1'
  },
  {
    id: 'en_ch2_001', language: 'en', chapter: 2, topic: 'points', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'How many points on your driving record within 18 months will result in a license suspension?',
    choices: ['6', '8', '11', '15'],
    correctAnswer: '11', explanation: 'If you receive 11 points in 18 months, your license may be suspended.', source: 'Chapter 2'
  },
  {
    id: 'en_ch2_002', language: 'en', chapter: 2, topic: 'suspensions', difficulty: 'hard', isRoadSign: false, status: 'approved',
    question: 'What is the penalty for driving without insurance?',
    choices: ['A $50 fine', 'Revocation of your driver license for at least one year', '3 points on your license', 'A written warning'],
    correctAnswer: 'Revocation of your driver license for at least one year', explanation: 'Driving without insurance carries severe penalties, including revocation of your license for at least one year.', source: 'Chapter 2'
  },
  {
    id: 'en_ch2_003', language: 'en', chapter: 2, topic: 'points', difficulty: 'expert', isRoadSign: false, status: 'approved',
    question: 'How many points is speeding 21 to 30 mph over the limit?',
    choices: ['3', '4', '6', '8'],
    correctAnswer: '6', explanation: 'Speeding 21 to 30 mph over the limit adds 6 points to your record.', source: 'Chapter 2'
  },
  // CHAPTER 3
  {
    id: 'en_ch3_001', language: 'en', chapter: 3, topic: 'registration', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'How often must your vehicle be inspected in New York State?',
    choices: ['Every 6 months', 'Once a year', 'Every 2 years', 'Only when buying a new car'],
    correctAnswer: 'Once a year', explanation: 'All vehicles registered in NY must get a safety inspection and an emissions inspection every 12 months.', source: 'Chapter 3'
  },
  {
    id: 'en_ch3_002', language: 'en', chapter: 3, topic: 'insurance', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'What must you do with your license plates if you cancel your auto insurance?',
    choices: ['Keep them in your garage', 'Throw them away', 'Surrender them to the DMV', 'Give them to the new owner'],
    correctAnswer: 'Surrender them to the DMV', explanation: 'You must surrender your plates to the DMV BEFORE your liability insurance coverage ends.', source: 'Chapter 3'
  },
  // CHAPTER 4 (Road Signs)
  {
    id: 'en_ch4_006', language: 'en', chapter: 4, topic: 'road_signs', difficulty: 'normal', isRoadSign: true, status: 'approved',
    question: 'What does a solid double yellow line down the center of the roadway mean?',
    choices: ['Passing is permitted', 'Passing is prohibited for both directions', 'One-way traffic', 'Center turn lane'],
    correctAnswer: 'Passing is prohibited for both directions', explanation: 'Solid double yellow lines indicate that you cannot pass or cross them except to turn left into a driveway.', source: 'Chapter 4'
  },
  {
    id: 'en_ch4_007', language: 'en', chapter: 4, topic: 'traffic_lights', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'What must you do at a flashing red traffic light?',
    choices: ['Slow down and yield', 'Stop, then proceed when safe', 'Speed up to clear the intersection', 'Wait for it to turn green'],
    correctAnswer: 'Stop, then proceed when safe', explanation: 'A flashing red light means the same thing as a stop sign.', source: 'Chapter 4'
  },
  {
    id: 'en_ch4_008', language: 'en', chapter: 4, topic: 'road_signs', difficulty: 'hard', isRoadSign: true, status: 'approved',
    question: 'A diamond-shaped sign with a picture of a deer means:',
    choices: ['Zoo ahead', 'Deer crossing area', 'Hunting permitted', 'No animals allowed'],
    correctAnswer: 'Deer crossing area', explanation: 'Diamond signs are warning signs. This warns that deer often cross the road in this area.', source: 'Chapter 4'
  },
  // CHAPTER 5 (Intersections)
  {
    id: 'en_ch5_001', language: 'en', chapter: 5, topic: 'right_of_way', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'If you arrive at a four-way stop at the same time as another driver, who has the right-of-way?',
    choices: ['The driver going straight', 'The driver on the right', 'The driver on the left', 'The driver turning right'],
    correctAnswer: 'The driver on the right', explanation: 'If two drivers arrive at a four-way stop simultaneously, the driver on the left must yield to the driver on the right.', source: 'Chapter 5'
  },
  {
    id: 'en_ch5_002', language: 'en', chapter: 5, topic: 'right_of_way', difficulty: 'hard', isRoadSign: false, status: 'approved',
    question: 'When must you yield to a pedestrian using a white cane or guide dog?',
    choices: ['Only at marked crosswalks', 'Only when the light is green', 'At all times', 'Only in school zones'],
    correctAnswer: 'At all times', explanation: 'You must always yield the right-of-way to a blind pedestrian, regardless of crosswalks or traffic signals.', source: 'Chapter 5'
  },
  {
    id: 'en_ch5_003', language: 'en', chapter: 5, topic: 'turning', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'How far in advance should you signal before making a turn?',
    choices: ['50 feet', '100 feet', '200 feet', '300 feet'],
    correctAnswer: '100 feet', explanation: 'The law requires you to signal a turn or lane change at least 100 feet ahead.', source: 'Chapter 5'
  },
  // CHAPTER 6 (Passing)
  {
    id: 'en_ch6_001', language: 'en', chapter: 6, topic: 'passing', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'When is it legally permitted to pass a vehicle on the right?',
    choices: ['When they are going too slow', 'When the vehicle ahead is making a left turn and there is room on the pavement', 'Any time on a two-lane road', 'Never'],
    correctAnswer: 'When the vehicle ahead is making a left turn and there is room on the pavement', explanation: 'You may pass on the right if a vehicle is making a left turn and you do not leave the paved road.', source: 'Chapter 6'
  },
  {
    id: 'en_ch6_002', language: 'en', chapter: 6, topic: 'passing', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'After passing a vehicle, when is it safe to return to the right lane?',
    choices: ['Immediately', 'When you can see the passed vehicle\'s headlights in your rearview mirror', 'After 5 seconds', 'When the driver honks'],
    correctAnswer: 'When you can see the passed vehicle\'s headlights in your rearview mirror', explanation: 'Checking your rearview mirror ensures you have enough space before moving back into the lane.', source: 'Chapter 6'
  }
];

const esQuestions = [
  // CHAPTER 1 & 2
  {
    id: 'es_ch1_001', language: 'es', chapter: 1, topic: 'licenses', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: '¿Cuál es la edad mínima para obtener una licencia de conducir Clase D en Nueva York sin Educación Vial?',
    choices: ['16', '17', '18', '21'],
    correctAnswer: '18', explanation: 'Debe tener 18 años, o 17 con un certificado de educación vial, para obtener una licencia de conducir senior.', source: 'Capítulo 1'
  },
  {
    id: 'es_ch1_002', language: 'es', chapter: 1, topic: 'restrictions', difficulty: 'hard', isRoadSign: false, status: 'approved',
    question: 'Si tiene un Permiso de Aprendizaje Junior (Clase DJ), ¿entre qué horas tiene totalmente prohibido conducir en el norte del estado de NY?',
    choices: ['9 PM y 5 AM', '10 PM y 5 AM', 'Medianoche y 5 AM', 'Puede conducir en cualquier momento con un padre'],
    correctAnswer: '9 PM y 5 AM', explanation: 'En el norte de NY, no puede conducir entre las 9 PM y las 5 AM con un permiso DJ a menos que vaya al trabajo/escuela con documentación.', source: 'Capítulo 1'
  },
  {
    id: 'es_ch2_001', language: 'es', chapter: 2, topic: 'points', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: '¿Cuántos puntos en su historial de manejo dentro de 18 meses resultarán en la suspensión de la licencia?',
    choices: ['6', '8', '11', '15'],
    correctAnswer: '11', explanation: 'Si recibe 11 puntos en 18 meses, su licencia puede ser suspendida.', source: 'Capítulo 2'
  },
  {
    id: 'es_ch2_002', language: 'es', chapter: 2, topic: 'suspensions', difficulty: 'hard', isRoadSign: false, status: 'approved',
    question: '¿Cuál es la sanción por conducir sin seguro?',
    choices: ['Una multa de $50', 'Revocación de su licencia de conducir por al menos un año', '3 puntos en su licencia', 'Una advertencia por escrito'],
    correctAnswer: 'Revocación de su licencia de conducir por al menos un año', explanation: 'Conducir sin seguro conlleva sanciones severas, incluyendo la revocación de la licencia por al menos un año.', source: 'Capítulo 2'
  },
  {
    id: 'es_ch2_003', language: 'es', chapter: 2, topic: 'points', difficulty: 'expert', isRoadSign: false, status: 'approved',
    question: '¿Cuántos puntos es ir a exceso de velocidad 21 a 30 mph por encima del límite?',
    choices: ['3', '4', '6', '8'],
    correctAnswer: '6', explanation: 'Ir a exceso de velocidad 21 a 30 mph sobre el límite suma 6 puntos a su récord.', source: 'Capítulo 2'
  },
  // CHAPTER 3
  {
    id: 'es_ch3_001', language: 'es', chapter: 3, topic: 'registration', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: '¿Con qué frecuencia debe inspeccionarse su vehículo en el estado de Nueva York?',
    choices: ['Cada 6 meses', 'Una vez al año', 'Cada 2 años', 'Solo al comprar un auto nuevo'],
    correctAnswer: 'Una vez al año', explanation: 'Todos los vehículos registrados en NY deben obtener una inspección de seguridad y emisiones cada 12 meses.', source: 'Capítulo 3'
  },
  {
    id: 'es_ch3_002', language: 'es', chapter: 3, topic: 'insurance', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: '¿Qué debe hacer con las placas de su auto si cancela su seguro?',
    choices: ['Guardarlas en su garaje', 'Tirarlas', 'Entregarlas al DMV', 'Dárselas al nuevo propietario'],
    correctAnswer: 'Entregarlas al DMV', explanation: 'Debe entregar sus placas al DMV ANTES de que termine su cobertura de seguro de responsabilidad.', source: 'Capítulo 3'
  },
  // CHAPTER 4
  {
    id: 'es_ch4_006', language: 'es', chapter: 4, topic: 'road_signs', difficulty: 'normal', isRoadSign: true, status: 'approved',
    question: '¿Qué significa una doble línea amarilla sólida en el centro de la carretera?',
    choices: ['Se permite pasar', 'Está prohibido pasar para ambas direcciones', 'Tráfico en un solo sentido', 'Carril central de giro'],
    correctAnswer: 'Está prohibido pasar para ambas direcciones', explanation: 'Las líneas amarillas dobles sólidas indican que no puede pasar ni cruzarlas excepto para girar a la izquierda en una entrada.', source: 'Capítulo 4'
  },
  {
    id: 'es_ch4_007', language: 'es', chapter: 4, topic: 'traffic_lights', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: '¿Qué debe hacer ante un semáforo rojo intermitente?',
    choices: ['Disminuir la velocidad y ceder el paso', 'Detenerse, luego avanzar cuando sea seguro', 'Acelerar para despejar la intersección', 'Esperar a que se ponga verde'],
    correctAnswer: 'Detenerse, luego avanzar cuando sea seguro', explanation: 'Una luz roja intermitente significa lo mismo que una señal de alto.', source: 'Capítulo 4'
  },
  {
    id: 'es_ch4_008', language: 'es', chapter: 4, topic: 'road_signs', difficulty: 'hard', isRoadSign: true, status: 'approved',
    question: 'Una señal en forma de diamante con un dibujo de un ciervo significa:',
    choices: ['Zoológico más adelante', 'Área de cruce de ciervos', 'Se permite cazar', 'No se permiten animales'],
    correctAnswer: 'Área de cruce de ciervos', explanation: 'Las señales de diamante son de advertencia. Esta advierte que los ciervos a menudo cruzan la carretera.', source: 'Capítulo 4'
  },
  // CHAPTER 5
  {
    id: 'es_ch5_001', language: 'es', chapter: 5, topic: 'right_of_way', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'Si llega a una intersección de cuatro paradas al mismo tiempo que otro conductor, ¿quién tiene el derecho de paso?',
    choices: ['El conductor que va recto', 'El conductor de la derecha', 'El conductor de la izquierda', 'El conductor que gira a la derecha'],
    correctAnswer: 'El conductor de la derecha', explanation: 'Si dos conductores llegan simultáneamente, el de la izquierda debe ceder el paso al de la derecha.', source: 'Capítulo 5'
  },
  {
    id: 'es_ch5_002', language: 'es', chapter: 5, topic: 'right_of_way', difficulty: 'hard', isRoadSign: false, status: 'approved',
    question: '¿Cuándo debe ceder el paso a un peatón con un bastón blanco o perro guía?',
    choices: ['Solo en cruces peatonales marcados', 'Solo cuando la luz es verde', 'En todo momento', 'Solo en zonas escolares'],
    correctAnswer: 'En todo momento', explanation: 'Siempre debe ceder el derecho de paso a un peatón ciego, sin importar cruces o semáforos.', source: 'Capítulo 5'
  },
  {
    id: 'es_ch5_003', language: 'es', chapter: 5, topic: 'turning', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: '¿Con cuánta anticipación debe poner la señal antes de hacer un giro?',
    choices: ['50 pies', '100 pies', '200 pies', '300 pies'],
    correctAnswer: '100 pies', explanation: 'La ley exige que señale un giro o cambio de carril al menos 100 pies antes.', source: 'Capítulo 5'
  },
  // CHAPTER 6
  {
    id: 'es_ch6_001', language: 'es', chapter: 6, topic: 'passing', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: '¿Cuándo está legalmente permitido pasar a un vehículo por la derecha?',
    choices: ['Cuando va demasiado lento', 'Cuando el vehículo de adelante está girando a la izquierda y hay espacio en el pavimento', 'Cualquier momento en una carretera de dos carriles', 'Nunca'],
    correctAnswer: 'Cuando el vehículo de adelante está girando a la izquierda y hay espacio en el pavimento', explanation: 'Puede pasar por la derecha si un vehículo gira a la izquierda y usted no sale del camino pavimentado.', source: 'Capítulo 6'
  },
  {
    id: 'es_ch6_002', language: 'es', chapter: 6, topic: 'passing', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'Después de rebasar a un vehículo, ¿cuándo es seguro volver al carril derecho?',
    choices: ['Inmediatamente', 'Cuando puede ver las luces del vehículo rebasado en su espejo retrovisor', 'Después de 5 segundos', 'Cuando el conductor toca la bocina'],
    correctAnswer: 'Cuando puede ver las luces del vehículo rebasado en su espejo retrovisor', explanation: 'Revisar su retrovisor asegura tener suficiente espacio antes de volver al carril.', source: 'Capítulo 6'
  }
];

fs.writeFileSync(path.join(__dirname, 'batch1_en.json'), JSON.stringify(enQuestions, null, 2));
fs.writeFileSync(path.join(__dirname, 'batch1_es.json'), JSON.stringify(esQuestions, null, 2));
console.log('Batch 1 written');
