export interface VerseNode {
  number: number;
  title: string;
  lines: string[];
  iast: string[];
  gloss: string;
  /** Words from the opening set that actually appear in this śloka. */
  wordIds: string[];
}

/**
 * Ślokas 1–5 of Śrī Veṅkaṭeśvara Suprabhātam
 * (Prativādi Bhayaṅkara Aṇṇaṇ; Tirumala recitation tradition).
 * Glosses are short learning aids, not a temple translation.
 */
export const VERSES: VerseNode[] = [
  {
    number: 1,
    title: 'The dawn breaks',
    lines: [
      'कौसल्या सुप्रजा राम पूर्वासन्ध्या प्रवर्तते ।',
      'उत्तिष्ठ नरशार्दूल कर्तव्यं दैवमाह्निकम् ॥',
    ],
    iast: [
      'kausalyā suprajā rāma pūrvāsandhyā pravartate |',
      'uttiṣṭha naraśārdūla kartavyaṃ daivamāhnikam ||',
    ],
    gloss:
      'O Rāma, noble son of Kausalyā — the eastern dawn is breaking. Rise, tiger among men; the daily rite is your duty.',
    wordIds: ['rama', 'uttistha', 'kartavyam'],
  },
  {
    number: 2,
    title: 'Rise, Govinda',
    lines: [
      'उत्तिष्ठोत्तिष्ठ गोविन्द उत्तिष्ठ गरुडध्वज ।',
      'उत्तिष्ठ कमलाकान्त त्रैलोक्यं मङ्गलं कुरु ॥',
    ],
    iast: [
      'uttiṣṭhottiṣṭha govinda uttiṣṭha garuḍadhvaja |',
      'uttiṣṭha kamalākānta trailokyaṃ maṅgalaṃ kuru ||',
    ],
    gloss:
      'Rise, rise, Govinda. Rise, you whose banner is Garuḍa. Rise, beloved of Kamalā — make the three worlds auspicious.',
    wordIds: ['uttistha', 'govinda', 'kamala', 'trailokyam', 'mangalam'],
  },
  {
    number: 3,
    title: 'Auspicious dawn',
    lines: [
      'मातस्समस्तजगतां मधुकैटभारेः',
      'वक्षोविहारिणि मनोहरदिव्यमूर्ते ।',
      'श्रीस्वामिनि श्रितजनप्रियदानशीले',
      'श्रीवेङ्कटेशदयिते तव सुप्रभातम् ॥',
    ],
    iast: [
      'mātas samastajagatāṃ madhukaiṭabhāreḥ',
      'vakṣovihāriṇi manoharadivyamūrte |',
      'śrīsvāmini śritajanapriyadānaśīle',
      'śrīveṅkaṭeśadayite tava suprabhātam ||',
    ],
    gloss:
      'O mother of all the worlds, who moves on the chest of the foe of Madhu and Kaiṭabha — beloved of Śrī Veṅkaṭeśa, an auspicious dawn to you.',
    wordIds: ['mata', 'jagat', 'suprabhatam'],
  },
  {
    number: 4,
    title: 'Lotus eyes',
    lines: [
      'तव सुप्रभातमरविन्दलोचने',
      'भवतु प्रसन्नमुखचन्द्रमण्डले ।',
      'विधिशङ्करेन्द्रवनिताभिरर्चिते',
      'वृषशैलनाथदयिते दयानिधे ॥',
    ],
    iast: [
      'tava suprabhātam aravindalocane',
      'bhavatu prasannamukhacandramaṇḍale |',
      'vidhiśaṅkarendravanitābhir arcite',
      'vṛṣaśailanāthadayite dayānidhe ||',
    ],
    gloss:
      'May this auspicious dawn be yours, lotus-eyed one, your face a serene moon, beloved of the Lord of Vṛṣa hill, treasury of compassion.',
    wordIds: ['suprabhatam', 'netra', 'prasanna', 'candra', 'daya'],
  },
  {
    number: 5,
    title: 'Sages at the hill',
    lines: [
      'अत्र्यादिसप्तऋषयस्समुपास्य सन्ध्याम्',
      'आकाशसिन्धुकमलानि मनोहराणि ।',
      'आदाय पादयुगमर्चयितुं प्रपन्नाः',
      'शेषाद्रिशेखरविभो तव सुप्रभातम् ॥',
    ],
    iast: [
      'atryādisaptaṛṣayas samupāsya sandhyām',
      'ākāśasindhukamalāni manoharāṇi |',
      'ādāya pādayugam arcayituṃ prapannāḥ',
      'śeṣādriśekharavibho tava suprabhātam ||',
    ],
    gloss:
      'The seven sages led by Atri, after the dawn worship, bring lotuses of the sky-river to honor your feet. O crown of Śeṣādri — an auspicious dawn to you.',
    wordIds: ['kamala', 'pada', 'sesadri', 'suprabhatam'],
  },
];

export const LISTEN_CHUNK = {
  id: 'sloka-2-opening',
  sloka: 2,
  title: 'Opening line of Śloka 2',
  lines: ['उत्तिष्ठोत्तिष्ठ गोविन्द', 'उत्तिष्ठ गरुडध्वज'],
  iast: ['uttiṣṭhottiṣṭha govinda', 'uttiṣṭha garuḍadhvaja'],
  speak: 'उत्तिष्ठोत्तिष्ठ गोविन्द उत्तिष्ठ गरुडध्वज',
  gloss: 'Rise, rise, O Govinda. Rise, you whose banner is Garuḍa.',
  wordIds: ['uttistha', 'govinda'],
};
