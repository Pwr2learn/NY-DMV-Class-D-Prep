const fs = require('fs');
const path = require('path');

const enQuestions = [
  // CHAPTER 7 (Parking)
  {
    id: 'en_ch7_001', language: 'en', chapter: 7, topic: 'parking', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'How close to a fire hydrant are you allowed to park?',
    choices: ['10 feet', '15 feet', '20 feet', '50 feet'],
    correctAnswer: '15 feet', explanation: 'You may not park within 15 feet of a fire hydrant, unless a licensed driver remains in the vehicle to move it in an emergency.', source: 'Chapter 7'
  },
  {
    id: 'en_ch7_002', language: 'en', chapter: 7, topic: 'parking', difficulty: 'hard', isRoadSign: false, status: 'approved',
    question: 'When parking on a hill facing uphill with a curb, which way should you turn your wheels?',
    choices: ['Away from the curb', 'Toward the curb', 'Straight ahead', 'It doesn\'t matter'],
    correctAnswer: 'Away from the curb', explanation: 'When parking facing uphill with a curb, turn your wheels away from the curb so if the vehicle rolls, the tires hit the curb and stop.', source: 'Chapter 7'
  },
  // CHAPTER 8 (Defensive Driving)
  {
    id: 'en_ch8_001', language: 'en', chapter: 8, topic: 'defensive_driving', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'What is the recommended following distance under ideal conditions?',
    choices: ['1 second', '2 seconds', '3 seconds', '5 seconds'],
    correctAnswer: '2 seconds', explanation: 'The "two-second rule" is the minimum recommended following distance under ideal driving conditions.', source: 'Chapter 8'
  },
  {
    id: 'en_ch8_002', language: 'en', chapter: 8, topic: 'defensive_driving', difficulty: 'hard', isRoadSign: false, status: 'approved',
    question: 'If you have a tire blowout, what is the first thing you should do?',
    choices: ['Slam on the brakes', 'Hold the steering wheel firmly and ease off the gas', 'Pull the parking brake', 'Turn off the engine'],
    correctAnswer: 'Hold the steering wheel firmly and ease off the gas', explanation: 'Do not panic or hit the brakes hard. Hold the steering wheel firmly, ease your foot off the gas, and brake gently once the vehicle is under control.', source: 'Chapter 8'
  },
  // CHAPTER 9 (Alcohol and Drugs)
  {
    id: 'en_ch9_001', language: 'en', chapter: 9, topic: 'alcohol_and_drugs', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'What is the legal Blood Alcohol Content (BAC) limit for drivers age 21 or older in New York?',
    choices: ['0.02%', '0.05%', '0.08%', '0.10%'],
    correctAnswer: '0.08%', explanation: 'You are legally intoxicated if your BAC is 0.08% or higher if you are 21 or older.', source: 'Chapter 9'
  },
  {
    id: 'en_ch9_002', language: 'en', chapter: 9, topic: 'alcohol_and_drugs', difficulty: 'hard', isRoadSign: false, status: 'approved',
    question: 'Under the "Zero Tolerance Law", what is the BAC limit for a driver under age 21?',
    choices: ['0.00%', '0.02%', '0.05%', '0.08%'],
    correctAnswer: '0.02%', explanation: 'The Zero Tolerance law applies to a person under age 21 who drives with a BAC of 0.02% to 0.07%.', source: 'Chapter 9'
  },
  {
    id: 'en_ch9_003', language: 'en', chapter: 9, topic: 'alcohol_and_drugs', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'What is the only effective way to reduce your Blood Alcohol Content (BAC)?',
    choices: ['Drinking coffee', 'Taking a cold shower', 'Eating a heavy meal', 'Time'],
    correctAnswer: 'Time', explanation: 'Only time can lower your BAC as your body processes the alcohol.', source: 'Chapter 9'
  },
  // CHAPTER 10 (Special Conditions)
  {
    id: 'en_ch10_001', language: 'en', chapter: 10, topic: 'special_conditions', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'When must you use your headlights in New York State?',
    choices: ['From 1/2 hour after sunset to 1/2 hour before sunrise', 'Only when it is completely dark', 'From 8 PM to 6 AM', 'Only when driving outside city limits'],
    correctAnswer: 'From 1/2 hour after sunset to 1/2 hour before sunrise', explanation: 'Headlights must be used from a half hour after sunset to a half hour before sunrise, or when visibility is less than 1,000 feet.', source: 'Chapter 10'
  },
  {
    id: 'en_ch10_002', language: 'en', chapter: 10, topic: 'special_conditions', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'By law, when your windshield wipers are turned on for rain or snow, what else must be turned on?',
    choices: ['Your hazard lights', 'Your headlights', 'Your defroster', 'Your interior lights'],
    correctAnswer: 'Your headlights', explanation: 'New York State law requires you to turn on your headlights when weather conditions require the use of windshield wipers.', source: 'Chapter 10'
  },
  {
    id: 'en_ch10_003', language: 'en', chapter: 10, topic: 'special_conditions', difficulty: 'hard', isRoadSign: false, status: 'approved',
    question: 'What is hydroplaning?',
    choices: ['When a car\'s engine floods with water', 'When tires ride on a layer of water instead of the road surface', 'When your brakes freeze in winter', 'When a car sinks in a flood'],
    correctAnswer: 'When tires ride on a layer of water instead of the road surface', explanation: 'Hydroplaning occurs when a layer of water builds between the wheels and the road, leading to a loss of traction.', source: 'Chapter 10'
  },
  // CHAPTER 11 (Sharing the Road)
  {
    id: 'en_ch11_001', language: 'en', chapter: 11, topic: 'school_buses', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'When a stopped school bus has its red lights flashing on a divided highway, you must:',
    choices: ['Slow down and pass carefully', 'Stop only if you are on the same side as the bus', 'Stop, even if you are on the opposite side of a divided highway', 'Honk and proceed'],
    correctAnswer: 'Stop, even if you are on the opposite side of a divided highway', explanation: 'In NY, you must stop for a school bus with flashing red lights regardless of which side of a divided highway you are on.', source: 'Chapter 11'
  },
  {
    id: 'en_ch11_002', language: 'en', chapter: 11, topic: 'emergency_vehicles', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'What must you do when an emergency vehicle approaches with sirens and flashing lights?',
    choices: ['Speed up to get out of its way', 'Stop immediately in your lane', 'Pull over to the right edge of the road and stop', 'Move to the left lane'],
    correctAnswer: 'Pull over to the right edge of the road and stop', explanation: 'You must yield the right-of-way to fire, ambulance, police and other authorized emergency vehicles by pulling over to the right and stopping.', source: 'Chapter 11'
  },
  // CHAPTER 12 (Crashes)
  {
    id: 'en_ch12_001', language: 'en', chapter: 12, topic: 'crashes', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'If you are involved in a traffic crash resulting in injury, death, or more than $1,000 in property damage, how many days do you have to report it to the DMV?',
    choices: ['3 days', '5 days', '10 days', '30 days'],
    correctAnswer: '10 days', explanation: 'You must file a Report of Motor Vehicle Accident (MV-104) with the DMV within 10 days of a crash meeting these criteria.', source: 'Chapter 12'
  },
  {
    id: 'en_ch12_002', language: 'en', chapter: 12, topic: 'emergencies', difficulty: 'hard', isRoadSign: false, status: 'approved',
    question: 'If you hit a parked vehicle and cannot find the owner, what are you legally required to do?',
    choices: ['Leave immediately', 'Wait for 30 minutes, then leave', 'Leave a note with your name and contact info, and notify the police', 'Honk until someone comes out'],
    correctAnswer: 'Leave a note with your name and contact info, and notify the police', explanation: 'If you strike an unattended vehicle, you must try to find the owner. If you can\'t, leave a note and report the crash to the police.', source: 'Chapter 12'
  }
];

const esQuestions = [
  // CHAPTER 7 (Parking)
  {
    id: 'es_ch7_001', language: 'es', chapter: 7, topic: 'parking', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: '¿A qué distancia de un hidrante (boca de incendios) se le permite estacionarse?',
    choices: ['10 pies', '15 pies', '20 pies', '50 pies'],
    correctAnswer: '15 pies', explanation: 'No puede estacionarse a menos de 15 pies de un hidrante, a menos que un conductor con licencia permanezca en el vehículo para moverlo en caso de emergencia.', source: 'Capítulo 7'
  },
  {
    id: 'es_ch7_002', language: 'es', chapter: 7, topic: 'parking', difficulty: 'hard', isRoadSign: false, status: 'approved',
    question: 'Al estacionarse en una colina cuesta arriba con bordillo (acera), ¿hacia dónde debe girar las ruedas?',
    choices: ['Lejos del bordillo', 'Hacia el bordillo', 'Derecho hacia adelante', 'No importa'],
    correctAnswer: 'Lejos del bordillo', explanation: 'Al estacionarse cuesta arriba con un bordillo, gire las ruedas lejos del bordillo para que si el vehículo rueda, las llantas golpeen el bordillo y se detenga.', source: 'Capítulo 7'
  },
  // CHAPTER 8 (Defensive Driving)
  {
    id: 'es_ch8_001', language: 'es', chapter: 8, topic: 'defensive_driving', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: '¿Cuál es la distancia de seguimiento recomendada en condiciones ideales?',
    choices: ['1 segundo', '2 segundos', '3 segundos', '5 segundos'],
    correctAnswer: '2 segundos', explanation: 'La "regla de los dos segundos" es la distancia de seguimiento mínima recomendada en condiciones ideales de manejo.', source: 'Capítulo 8'
  },
  {
    id: 'es_ch8_002', language: 'es', chapter: 8, topic: 'defensive_driving', difficulty: 'hard', isRoadSign: false, status: 'approved',
    question: 'Si se le revienta una llanta (reventón), ¿qué es lo primero que debe hacer?',
    choices: ['Frenar de golpe', 'Sostener el volante con firmeza y soltar el acelerador', 'Poner el freno de mano', 'Apagar el motor'],
    correctAnswer: 'Sostener el volante con firmeza y soltar el acelerador', explanation: 'No entre en pánico ni frene de golpe. Sostenga el volante con firmeza, suelte el acelerador y frene suavemente una vez que el vehículo esté bajo control.', source: 'Capítulo 8'
  },
  // CHAPTER 9 (Alcohol and Drugs)
  {
    id: 'es_ch9_001', language: 'es', chapter: 9, topic: 'alcohol_and_drugs', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: '¿Cuál es el límite legal de Contenido de Alcohol en la Sangre (BAC) para conductores de 21 años o más en Nueva York?',
    choices: ['0.02%', '0.05%', '0.08%', '0.10%'],
    correctAnswer: '0.08%', explanation: 'Está legalmente intoxicado si su BAC es de 0.08% o mayor si tiene 21 años o más.', source: 'Capítulo 9'
  },
  {
    id: 'es_ch9_002', language: 'es', chapter: 9, topic: 'alcohol_and_drugs', difficulty: 'hard', isRoadSign: false, status: 'approved',
    question: 'Bajo la "Ley de Tolerancia Cero", ¿cuál es el límite de BAC para un conductor menor de 21 años?',
    choices: ['0.00%', '0.02%', '0.05%', '0.08%'],
    correctAnswer: '0.02%', explanation: 'La ley de Tolerancia Cero se aplica a una persona menor de 21 años que conduce con un BAC de 0.02% a 0.07%.', source: 'Capítulo 9'
  },
  {
    id: 'es_ch9_003', language: 'es', chapter: 9, topic: 'alcohol_and_drugs', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: '¿Cuál es la única manera efectiva de reducir su Contenido de Alcohol en la Sangre (BAC)?',
    choices: ['Beber café', 'Tomar una ducha fría', 'Comer una comida pesada', 'El tiempo'],
    correctAnswer: 'El tiempo', explanation: 'Solo el tiempo puede disminuir su BAC a medida que su cuerpo procesa el alcohol.', source: 'Capítulo 9'
  },
  // CHAPTER 10 (Special Conditions)
  {
    id: 'es_ch10_001', language: 'es', chapter: 10, topic: 'special_conditions', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: '¿Cuándo debe usar sus faros delanteros en el estado de Nueva York?',
    choices: ['Desde 1/2 hora después de la puesta del sol hasta 1/2 hora antes de la salida del sol', 'Solo cuando está completamente oscuro', 'De 8 PM a 6 AM', 'Solo cuando se conduce fuera de los límites de la ciudad'],
    correctAnswer: 'Desde 1/2 hora después de la puesta del sol hasta 1/2 hora antes de la salida del sol', explanation: 'Los faros deben usarse desde media hora después de la puesta del sol hasta media hora antes del amanecer, o cuando la visibilidad sea menor a 1,000 pies.', source: 'Capítulo 10'
  },
  {
    id: 'es_ch10_002', language: 'es', chapter: 10, topic: 'special_conditions', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'Por ley, cuando enciende sus limpiaparabrisas por lluvia o nieve, ¿qué más debe encender?',
    choices: ['Sus luces de emergencia (intermitentes)', 'Sus faros delanteros', 'Su desempañador', 'Sus luces interiores'],
    correctAnswer: 'Sus faros delanteros', explanation: 'La ley del estado de Nueva York requiere que encienda sus faros cuando las condiciones climáticas exijan el uso de limpiaparabrisas.', source: 'Capítulo 10'
  },
  {
    id: 'es_ch10_003', language: 'es', chapter: 10, topic: 'special_conditions', difficulty: 'hard', isRoadSign: false, status: 'approved',
    question: '¿Qué es el hidroplaneo?',
    choices: ['Cuando el motor de un auto se inunda de agua', 'Cuando las llantas se deslizan sobre una capa de agua en lugar de la superficie de la carretera', 'Cuando los frenos se congelan en invierno', 'Cuando un auto se hunde en una inundación'],
    correctAnswer: 'Cuando las llantas se deslizan sobre una capa de agua en lugar de la superficie de la carretera', explanation: 'El hidroplaneo ocurre cuando una capa de agua se acumula entre las ruedas y la carretera, causando una pérdida de tracción.', source: 'Capítulo 10'
  },
  // CHAPTER 11 (Sharing the Road)
  {
    id: 'es_ch11_001', language: 'es', chapter: 11, topic: 'school_buses', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'Cuando un autobús escolar detenido tiene sus luces rojas parpadeando en una carretera dividida, usted debe:',
    choices: ['Disminuir la velocidad y pasar con cuidado', 'Detenerse solo si está del mismo lado que el autobús', 'Detenerse, incluso si está en el lado opuesto de una carretera dividida', 'Tocar la bocina y avanzar'],
    correctAnswer: 'Detenerse, incluso si está en el lado opuesto de una carretera dividida', explanation: 'En NY, debe detenerse por un autobús escolar con luces rojas parpadeando sin importar en qué lado de la carretera dividida se encuentre.', source: 'Capítulo 11'
  },
  {
    id: 'es_ch11_002', language: 'es', chapter: 11, topic: 'emergency_vehicles', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: '¿Qué debe hacer cuando se acerca un vehículo de emergencia con sirenas y luces parpadeantes?',
    choices: ['Acelerar para quitarse de su camino', 'Detenerse inmediatamente en su carril', 'Orillarse al borde derecho de la calle y detenerse', 'Moverse al carril izquierdo'],
    correctAnswer: 'Orillarse al borde derecho de la calle y detenerse', explanation: 'Debe ceder el derecho de paso a vehículos de bomberos, ambulancias, policía y otros vehículos de emergencia acercándose al borde derecho y deteniéndose.', source: 'Capítulo 11'
  },
  // CHAPTER 12 (Crashes)
  {
    id: 'es_ch12_001', language: 'es', chapter: 12, topic: 'crashes', difficulty: 'normal', isRoadSign: false, status: 'approved',
    question: 'Si está involucrado en un choque de tráfico que resulte en lesiones, muerte o más de $1,000 en daños a la propiedad, ¿cuántos días tiene para reportarlo al DMV?',
    choices: ['3 días', '5 días', '10 días', '30 días'],
    correctAnswer: '10 días', explanation: 'Debe presentar un Informe de Accidente de Vehículo Motorizado (MV-104) al DMV dentro de los 10 días de un choque que cumpla con estos criterios.', source: 'Capítulo 12'
  },
  {
    id: 'es_ch12_002', language: 'es', chapter: 12, topic: 'emergencies', difficulty: 'hard', isRoadSign: false, status: 'approved',
    question: 'Si golpea un vehículo estacionado y no puede encontrar al dueño, ¿qué está legalmente obligado a hacer?',
    choices: ['Irse inmediatamente', 'Esperar 30 minutos, luego irse', 'Dejar una nota con su nombre e información de contacto, y notificar a la policía', 'Tocar la bocina hasta que alguien salga'],
    correctAnswer: 'Dejar una nota con su nombre e información de contacto, y notificar a la policía', explanation: 'Si golpea un vehículo desatendido, debe intentar encontrar al dueño. Si no puede, deje una nota y reporte el accidente a la policía.', source: 'Capítulo 12'
  }
];

fs.writeFileSync(path.join(__dirname, 'batch2_en.json'), JSON.stringify(enQuestions, null, 2));
fs.writeFileSync(path.join(__dirname, 'batch2_es.json'), JSON.stringify(esQuestions, null, 2));
console.log('Batch 2 written');
