/**
 * Opening Suprabhātam word set from the product plan, section 6A.
 * tipType is "cognate" or "near" only. Nothing here is a made-up etymology.
 * When a familiar Hindi or Telugu word is a translation rather than a relative,
 * the tip and the row note say so.
 */

export type TipType = 'cognate' | 'near' | 'mnemonic';

export interface Syllable {
  text: string;
  stress?: boolean;
}

export interface BridgeText {
  text: string;
  note?: string;
}

export interface Word {
  id: string;
  devanagari: string;
  iast: string;
  syllables: Syllable[];
  also?: { label: string; syllables: Syllable[] };
  hindi: BridgeText;
  telugu: BridgeText;
  english: BridgeText;
  tipType: TipType;
  tip: string;
  heard: string;
  heardIast: string;
  gloss: string;
  verseRef: string;
}

export const TIP_LABEL: Record<TipType, string> = {
  cognate: 'Cognate',
  near: 'Near cognate',
  mnemonic: 'Mnemonic',
};

export const WORDS: Word[] = [
  {
    id: 'suprabhatam',
    devanagari: 'सुप्रभातम्',
    iast: 'suprabhātam',
    syllables: [
      { text: 'su' },
      { text: 'pra' },
      { text: 'bhā', stress: true },
      { text: 'tam' },
    ],
    hindi: {
      text: 'सुप्रभात',
      note: 'Same word. Sanskrit adds the neuter -am.',
    },
    telugu: {
      text: 'సుప్రభాతం',
      note: 'శుభోదయం is a different good-morning phrase, not this spelling.',
    },
    english: { text: 'auspicious dawn; good morning' },
    tipType: 'cognate',
    tip: 'Hindi सुप्रभात is this same word; Sanskrit adds the neuter ending -am. Telugu సుప్రభాతం is the same stem. శుభోదయం is another way to say good morning (śubha + udaya). It is a related greeting, not a second spelling of suprabhātam.',
    heard: 'तव सुप्रभातम्',
    heardIast: 'tava suprabhātam',
    gloss: 'An auspicious dawn to you.',
    verseRef: 'Śloka 3',
  },
  {
    id: 'daya',
    devanagari: 'दया',
    iast: 'dayā',
    syllables: [{ text: 'da' }, { text: 'yā', stress: true }],
    hindi: { text: 'दया' },
    telugu: { text: 'దయ' },
    english: { text: 'compassion' },
    tipType: 'cognate',
    tip: 'A real match across all three. Hindi दया and Telugu దయ are this same word: compassion.',
    heard: 'दयानिधे',
    heardIast: 'dayānidhe',
    gloss: 'O treasury of compassion. Dayā sits inside this calling-name.',
    verseRef: 'Śloka 4',
  },
  {
    id: 'mangalam',
    devanagari: 'मङ्गलम्',
    iast: 'maṅgalam',
    syllables: [
      { text: 'maṅ', stress: true },
      { text: 'ga' },
      { text: 'lam' },
    ],
    hindi: { text: 'मंगल' },
    telugu: { text: 'మంగళం' },
    english: { text: 'auspiciousness; welfare' },
    tipType: 'cognate',
    tip: 'Hindi मंगल and Telugu మంగళం share this root: auspiciousness, welfare. Sanskrit keeps the ending -am.',
    heard: 'त्रैलोक्यं मङ्गलं कुरु',
    heardIast: 'trailokyaṃ maṅgalaṃ kuru',
    gloss: 'Make the three worlds auspicious.',
    verseRef: 'Śloka 2',
  },
  {
    id: 'sarana',
    devanagari: 'शरण',
    iast: 'śaraṇa',
    syllables: [{ text: 'śa' }, { text: 'ra' }, { text: 'ṇa' }],
    hindi: { text: 'शरण', note: 'As in शरण लेना — to take refuge.' },
    telugu: { text: 'శరణం' },
    english: { text: 'refuge' },
    tipType: 'cognate',
    tip: 'Everyday Hindi शरण and Telugu శరణం are this word. The first five ślokas do not use it. Verse 22 has शरणागत — someone who has come for refuge. The last syllable is retroflex ṇa, with the tongue curled back. No single syllable is marked as heavy.',
    heard: 'शरणागत',
    heardIast: 'śaraṇāgata',
    gloss: 'One who has come for refuge. This line is later in the hymn, not in Ślokas 1–5.',
    verseRef: 'Verse 22',
  },
  {
    id: 'kartavyam',
    devanagari: 'कर्तव्यम्',
    iast: 'kartavyam',
    syllables: [
      { text: 'kar' },
      { text: 'tav', stress: true },
      { text: 'yam' },
    ],
    hindi: { text: 'कर्तव्य' },
    telugu: { text: 'కర్తవ్యం' },
    english: { text: 'duty; what ought to be done' },
    tipType: 'cognate',
    tip: 'Hindi कर्तव्य and Telugu కర్తవ్యం mean duty — what ought to be done. Sanskrit adds -am. Before the next word you hear कर्तव्यं.',
    heard: 'कर्तव्यं दैवमाह्निकम्',
    heardIast: 'kartavyaṃ daivamāhnikam',
    gloss: 'The daily rite that is your duty.',
    verseRef: 'Śloka 1',
  },
  {
    id: 'uttistha',
    devanagari: 'उत्तिष्ठ',
    iast: 'uttiṣṭha',
    syllables: [
      { text: 'ut' },
      { text: 'tiṣ', stress: true },
      { text: 'ṭha' },
    ],
    hindi: {
      text: 'उठो',
      note: 'Same family, softer sound. Literary Hindi also uses उत्तिष्ठ.',
    },
    telugu: {
      text: 'లేవు',
      note: 'This is the meaning only, not a cognate. ఉత్తిష్ఠ is the Sanskrit word in Telugu script.',
    },
    english: { text: 'Rise! (imperative)' },
    tipType: 'near',
    tip: 'Hindi उठो (uṭho) is the same “rise!” idea, worn down from the old root ut-√sthā. The spellings do not match, so this is a near cognate, not a twin. Telugu లేవు means get up and is not a cognate. The ṭh is retroflex — curl the tongue back.',
    heard: 'उत्तिष्ठ नरशार्दूल',
    heardIast: 'uttiṣṭha naraśārdūla',
    gloss: 'Rise, tiger among men.',
    verseRef: 'Śloka 1',
  },
  {
    id: 'govinda',
    devanagari: 'गोविन्द',
    iast: 'govinda',
    syllables: [
      { text: 'go' },
      { text: 'vin', stress: true },
      { text: 'da' },
    ],
    hindi: { text: 'गोविंद' },
    telugu: { text: 'గోవింద' },
    english: { text: 'Govinda (Kṛṣṇa / Viṣṇu)' },
    tipType: 'cognate',
    tip: 'The name is shared. Hindi गोविंद and Telugu గోవింద are Govinda — Kṛṣṇa, Viṣṇu — with no translation in between.',
    heard: 'उत्तिष्ठोत्तिष्ठ गोविन्द',
    heardIast: 'uttiṣṭhottiṣṭha govinda',
    gloss: 'Rise, rise, Govinda.',
    verseRef: 'Śloka 2',
  },
  {
    id: 'rama',
    devanagari: 'राम',
    iast: 'rāma',
    syllables: [{ text: 'rā', stress: true }, { text: 'ma' }],
    hindi: { text: 'राम' },
    telugu: {
      text: 'రాముడు',
      note: 'Telugu adds -ḍu for a person. The name itself is రామ.',
    },
    english: { text: 'Rāma' },
    tipType: 'cognate',
    tip: 'The name is shared: राम and రామ. Telugu రాముడు adds -ḍu. Hold the first vowel — rā is long. Do not shorten it to the English word “ram.” That English word is not this name.',
    heard: 'कौसल्या सुप्रजा राम',
    heardIast: 'kausalyā suprajā rāma',
    gloss: 'O Rāma, noble child of Kausalyā.',
    verseRef: 'Śloka 1',
  },
  {
    id: 'kamala',
    devanagari: 'कमल',
    iast: 'kamala',
    syllables: [{ text: 'ka' }, { text: 'ma' }, { text: 'la', stress: true }],
    also: {
      label: 'In Śloka 2 · कमलाकान्त',
      syllables: [
        { text: 'ka' },
        { text: 'ma' },
        { text: 'lā' },
        { text: 'kān', stress: true },
        { text: 'ta' },
      ],
    },
    hindi: { text: 'कमल' },
    telugu: { text: 'కమలం' },
    english: { text: 'lotus; in the hymn, beloved of Lakṣmī' },
    tipType: 'cognate',
    tip: 'कमल and కమలం are everyday words for lotus. कमलाकान्त means beloved of Kamalā. Kamalā is Lakṣmī, whose name comes from the lotus. लक्ष्मीपति means “Lakṣmī’s husband” — the same idea, a different word, not a spelling of kamalākānta.',
    heard: 'उत्तिष्ठ कमलाकान्त',
    heardIast: 'uttiṣṭha kamalākānta',
    gloss: 'Rise, beloved of Kamalā. Lotuses themselves return in Śloka 5: कमलानि.',
    verseRef: 'Śloka 2',
  },
  {
    id: 'trailokyam',
    devanagari: 'त्रैलोक्यम्',
    iast: 'trailokyam',
    syllables: [
      { text: 'trai' },
      { text: 'lok', stress: true },
      { text: 'yam' },
    ],
    hindi: { text: 'त्रैलोक्य', note: 'लोक (lok) is the familiar word for world.' },
    telugu: {
      text: 'త్రైలోక్యం',
      note: 'మూడు లోకాలు is the plain phrase “three worlds,” not this spelling.',
    },
    english: { text: 'the three worlds' },
    tipType: 'cognate',
    tip: 'Split it: trai means three, loka means world. Hindi already says लोक. Telugu త్రైలోక్యం is the Sanskrit word; మూడు లోకాలు is an everyday sentence for the meaning, not a second form of trailokyam.',
    heard: 'त्रैलोक्यं मङ्गलं कुरु',
    heardIast: 'trailokyaṃ maṅgalaṃ kuru',
    gloss: 'Make the three worlds auspicious. You hear trailokyaṃ, with the ending softened before the next word.',
    verseRef: 'Śloka 2',
  },
  {
    id: 'mata',
    devanagari: 'माता',
    iast: 'mātā',
    syllables: [{ text: 'mā', stress: true }, { text: 'tā' }],
    hindi: { text: 'माता', note: 'The home word माँ is the softer, later form.' },
    telugu: {
      text: 'మాత',
      note: 'అమ్మ is the home word and is not a Sanskrit cognate.',
    },
    english: {
      text: 'mother',
      note: 'English mother is an old cousin from the same ancient family, not a borrowing from Sanskrit class.',
    },
    tipType: 'cognate',
    tip: 'Hindi माता and Telugu మాత are this word. माँ is the softer Hindi home form of the same word. English mother is a distant relative, not a word Sanskrit took from English. Telugu అమ్మ is the word used at home and is not a Sanskrit cognate.',
    heard: 'मातस्समस्तजगताम्',
    heardIast: 'mātas samastajagatām',
    gloss: 'O mother of all the worlds. Mātaḥ is the calling form of mātā.',
    verseRef: 'Śloka 3',
  },
  {
    id: 'jagat',
    devanagari: 'जगत्',
    iast: 'jagat',
    syllables: [{ text: 'ja' }, { text: 'gat', stress: true }],
    hindi: { text: 'जगत', note: 'Also shortened to जग.' },
    telugu: { text: 'జగత్తు' },
    english: { text: 'world' },
    tipType: 'cognate',
    tip: 'Hindi जगत and Telugu జగత్తు mean world. In the hymn, जगताम् means “of the worlds.”',
    heard: 'समस्तजगताम्',
    heardIast: 'samastajagatām',
    gloss: 'Of all the worlds.',
    verseRef: 'Śloka 3',
  },
  {
    id: 'candra',
    devanagari: 'चन्द्र',
    iast: 'candra',
    syllables: [{ text: 'can', stress: true }, { text: 'dra' }],
    hindi: { text: 'चंद्र' },
    telugu: {
      text: 'చంద్రుడు',
      note: 'Telugu adds -ḍu. The shared stem is చంద్ర.',
    },
    english: { text: 'moon' },
    tipType: 'cognate',
    tip: 'Moon, and a common name, in Hindi and Telugu. చంద్రుడు adds the Telugu person-ending -ḍu. In the hymn the moon sits inside चन्द्रमण्डल — the moon’s disc.',
    heard: 'प्रसन्नमुखचन्द्रमण्डले',
    heardIast: 'prasannamukhacandramaṇḍale',
    gloss: 'O you whose face is a serene moon-disc.',
    verseRef: 'Śloka 4',
  },
  {
    id: 'prasanna',
    devanagari: 'प्रसन्न',
    iast: 'prasanna',
    syllables: [
      { text: 'pra' },
      { text: 'san', stress: true },
      { text: 'na' },
    ],
    hindi: { text: 'प्रसन्न' },
    telugu: { text: 'ప్రసన్న' },
    english: { text: 'pleased; serene' },
    tipType: 'cognate',
    tip: 'Hindi प्रसन्न and Telugu ప్రసన్న mean pleased, clear, serene. The hymn’s प्रसन्नमुख is a serene face.',
    heard: 'प्रसन्नमुखचन्द्रमण्डले',
    heardIast: 'prasannamukhacandramaṇḍale',
    gloss: 'A pleased, serene face, like the disc of the moon.',
    verseRef: 'Śloka 4',
  },
  {
    id: 'netra',
    devanagari: 'नेत्र',
    iast: 'netra',
    syllables: [{ text: 'ne', stress: true }, { text: 'tra' }],
    also: {
      label: 'Synonym in Śloka 4 · लोचन',
      syllables: [{ text: 'lo' }, { text: 'ca' }, { text: 'na' }],
    },
    hindi: { text: 'नेत्र', note: 'Common in compounds such as नेत्रदान.' },
    telugu: { text: 'నేత్రం' },
    english: { text: 'eye' },
    tipType: 'cognate',
    tip: 'Hindi uses नेत्र in compounds such as नेत्रदान. Telugu నేత్రం is the same word: eye. लोचन is another Sanskrit word for eye, not a cognate from Hindi or Telugu. Śloka 4 uses locana in अरविन्दलोचने. नेत्र itself comes a little later, in नेत्रयुगम्.',
    heard: 'अरविन्दलोचने',
    heardIast: 'aravindalocane',
    gloss: 'O lotus-eyed one. This line says locana. Netra is the cognate headword; both mean eye.',
    verseRef: 'Śloka 4',
  },
  {
    id: 'pada',
    devanagari: 'पाद',
    iast: 'pāda',
    syllables: [{ text: 'pā', stress: true }, { text: 'da' }],
    hindi: {
      text: 'पाद',
      note: 'पाँव is the later home word, from this same word.',
    },
    telugu: { text: 'పాదం' },
    english: { text: 'foot; also a quarter of a verse' },
    tipType: 'cognate',
    tip: 'Telugu పాదం matches पाद: foot. Hindi keeps पाद in compounds. The home word पाँव is a later form of this same word, not a different root. पाद can also mean one quarter-line of a verse.',
    heard: 'पादयुगमर्चयितुं',
    heardIast: 'pādayugam arcayituṃ',
    gloss: 'To worship the two feet.',
    verseRef: 'Śloka 5',
  },
  {
    id: 'bhakta',
    devanagari: 'भक्त',
    iast: 'bhakta',
    syllables: [{ text: 'bhak', stress: true }, { text: 'ta' }],
    hindi: { text: 'भक्त' },
    telugu: {
      text: 'భక్తుడు',
      note: 'Telugu adds -ḍu for a person. The shared word is భక్త.',
    },
    english: { text: 'devotee' },
    tipType: 'cognate',
    tip: 'The same word in Hindi: भक्त, a devotee. Telugu భక్తుడు adds -ḍu. It is not in the first five ślokas. Verse 28 has भक्तभोग्य — what devotees may enjoy.',
    heard: 'भक्तभोग्य',
    heardIast: 'bhaktabhogya',
    gloss: 'To be enjoyed by devotees. Later in the hymn, not in Ślokas 1–5.',
    verseRef: 'Verse 28',
  },
  {
    id: 'sesadri',
    devanagari: 'शेषाद्रि',
    iast: 'śeṣādri',
    syllables: [
      { text: 'śe' },
      { text: 'ṣā' },
      { text: 'dri', stress: true },
    ],
    hindi: { text: 'शेषाद्रि' },
    telugu: { text: 'శేషాద్రి' },
    english: { text: 'the hill of Śeṣa (Tirumala)' },
    tipType: 'cognate',
    tip: 'A place name you can split: Śeṣa + adri, the hill of Śeṣa, Tirumala. Hindi शेषाद्रि and Telugu శేషాద్రి match it. Adri means mountain — a real word you also meet in names with giri, not a story invented for memory.',
    heard: 'शेषाद्रिशेखरविभो',
    heardIast: 'śeṣādriśekharavibho',
    gloss: 'O Lord who crowns the hill of Śeṣa.',
    verseRef: 'Śloka 5',
  },
];

export const WORD_COUNT = WORDS.length;

export function wordById(id: string): Word | undefined {
  return WORDS.find((word) => word.id === id);
}
