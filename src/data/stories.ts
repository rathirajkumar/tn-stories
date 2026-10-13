import { Story } from '../types';
import { MADURAI_IMAGE, THANJAVUR_IMAGE, CHETTINAD_IMAGE, HERO_IMAGE, KANYAKUMARI_IMAGE } from './destinations';

export const STORIES: Story[] = [
  {
    id: 'story-chola-granite-miracle',
    title: 'The Granite Colossus: How Raja Raja Chola Built the Big Temple',
    tamilTitle: 'ராஜராஜ சோழனின் பெரிய கோவில் கட்டடக் கலை அற்புதம்',
    relatedDestinationId: 'thanjavur',
    destinationName: 'Brihadeeswarar Temple, Thanjavur',
    coverImage: THANJAVUR_IMAGE,
    readingDuration: '6 min read',
    category: 'Architecture',
    shortDescription: 'In 1010 CE, an empire without nearby granite quarries hoisted an 80-ton monolithic stone 66 meters into the sky without mortar or machinery.',
    fullStory: `Over a thousand years ago, Emperor Raja Raja Chola I envisioned a tribute to Lord Shiva that would defy time itself. In the alluvial plains of the Kaveri delta, stone of any kind is rare, let alone hard granite. Yet, the entire Brihadeeswarar Temple—spanning tens of thousands of square feet—is built entirely of interlocking granite blocks fitted with mortise-and-tenon joints without a single grain of cement mortar.

Historical records preserved in Tamil Chola inscriptions along the temple's outer base reveal that over 130,000 tons of granite were quarried near Tiruchirappalli, over 50 kilometers away, and transported via raft systems across the Kaveri river and pulled by hundreds of royal elephants.

The most baffling engineering feat remains the Kumbam—the top monolithic apex stone weighing an estimated 80 metric tons. Master Chola architects constructed a gently graded earthen ramp beginning at the village of Sarapallam, approximately six kilometers away. Wooden rollers and teams of elephants hoisted the immense granite crown along this gentle incline to place it atop the hollow vimana tower. Standing in the courtyard at sunset today, the tower casts no outward shadow onto the ground at high noon—a testament to astronomical alignment and geometric precision that has withstood six major earthquakes over ten centuries.`,
    historicalContext: 'Consecrated during the 25th regnal year of Raja Raja Chola I (1010 CE). UNESCO World Heritage inscription confirms its unparalleled Dravidian structural integrity.',
    relatedPhotoGallery: [THANJAVUR_IMAGE, HERO_IMAGE],
    author: 'Kavitha Ramachandran',
    publishedDate: 'January 2026',
  },
  {
    id: 'story-madurai-silapathikaram',
    title: 'The Anklet of Wrath: Kannagi and the Legend of Madurai',
    tamilTitle: 'கண்ணகியின் சிலம்பு: மதுரையின் காவிய வரலாறு',
    relatedDestinationId: 'madurai',
    destinationName: 'Madurai Ancient City & Vaigai Basin',
    coverImage: MADURAI_IMAGE,
    readingDuration: '8 min read',
    category: 'Mythology',
    shortDescription: 'The Sangam epic of Silapathikaram, where a wronged woman’s unyielding righteous fury challenged the mightiest Pandyan throne.',
    fullStory: `Written by the royal Jain monk Ilango Adigal in the 5th century CE, the Silapathikaram ("The Tale of an Anklet") is considered the crowning jewel of the Five Great Epics of ancient Tamil literature.

The tragic tale centers on Kannagi and her merchant husband Kovalan. Having lost all their wealth in Kaveripoompattinam, Kovalan travels with Kannagi to the wealthy capital of Madurai to rebuild their life, carrying only her precious ruby-filled gold anklet (Silambu) to sell. In Madurai, the royal goldsmith, who had secretly stolen Queen Kopperundevi’s pearl-filled anklet, frames Kovalan for the royal theft. The Pandyan King Neduncheziyan executes Kovalan without trial.

When Kannagi learns of the injustice, she marches into the royal court, breaking her second anklet before the assembly. When gleaming red rubies spill across the marble floor—refuting the Queen’s stolen pearl anklet—King Neduncheziyan realizes his moral failure, uttering the immortal words: 'I am not a King; I am the thief. May my life end this day,' before collapsing from his throne. Kannagi’s fierce cry for cosmic justice sparked the legendary burning of the corrupt city, sparing only the virtuous and children. To this day, temples honoring Kannagi as Goddess Pattini stand across Southern Tamil Nadu and Sri Lanka as symbols of feminine courage and justice.`,
    historicalContext: 'Part of the ancient Tamil Sangam literary canon composed between the 2nd and 5th centuries CE, capturing the legal traditions and social ethos of the Pandyan era.',
    relatedPhotoGallery: [MADURAI_IMAGE, HERO_IMAGE],
    author: 'Dr. S. Sundarapandian',
    publishedDate: 'February 2026',
  },
  {
    id: 'story-chettinad-spice-merchants',
    title: 'Beyond the Sea: How Seafaring Chettiars Built Castles of Spice',
    tamilTitle: 'கடல் கடந்து வணிகம் செய்த செட்டிநாட்டு தனவணிகர்கள்',
    relatedDestinationId: 'chettinad',
    destinationName: 'Kanadukathan & Karaikudi, Chettinad',
    coverImage: CHETTINAD_IMAGE,
    readingDuration: '5 min read',
    category: 'Tradition',
    shortDescription: 'How 19th-century merchant bankers traded across the Indian Ocean to build palatial mansions and one of the world’s most nuanced cuisines.',
    fullStory: `In the dry, semi-arid plains of Sivaganga, a unique architectural phenomenon took root during the 19th and early 20th centuries. The Nattukottai Chettiars (also known as Nagarathars) were visionary banking pioneers whose maritime trading posts stretched across Burma (Myanmar), Ceylon (Sri Lanka), Malaya, Indonesia, and Vietnam.

Returning home, they channeled their trading riches into creating sprawling ancestral estates. Each mansion was constructed with Burma teak pillars so dense they resist termites for centuries, chandeliers imported from Murano in Italy, crystal mirrors from Belgium, and cast-iron pillars manufactured in Birmingham. 

Simultaneously, the Chettinad kitchens absorbed global culinary notes while preserving age-old Tamil techniques. Star anise from Vietnam, cinnamon from Ceylon, and black pepper from the Malabar coast were ground fresh on massive stone 'ammi kal' grinders. The cuisine avoided thick cream, relying instead on shallots, sun-dried curd-soaked chillies (mor milagai), kalpasi (black stone flower), and maratti mokku (dried flower buds) to create an intoxicating earthy aroma found nowhere else on earth.`,
    historicalContext: 'Reflects the golden mercantile age of the Nagarathar community between 1850 and 1930.',
    relatedPhotoGallery: [CHETTINAD_IMAGE, THANJAVUR_IMAGE],
    author: 'Ananya Meenakshi',
    publishedDate: 'March 2026',
  },
  {
    id: 'story-kanyakumari-three-seas',
    title: 'Triveni of the South: Where Three Mighty Oceans Embrace',
    tamilTitle: 'முக்கடல் சங்கமம்: கன்னியாகுமரியின் ஆன்மிகக் கதைகள்',
    relatedDestinationId: 'kanyakumari',
    destinationName: 'Kanyakumari Coastline',
    coverImage: KANYAKUMARI_IMAGE,
    readingDuration: '4 min read',
    category: 'Mythology',
    shortDescription: 'The sacred land’s end where sage poet Thiruvalluvar gazes across the waters and three distinct tides meet in colourful harmony.',
    fullStory: `At Kanyakumari, geography becomes poetry. It is the only place on the Indian mainland where an observer standing on the shore can see the sun emerge from the Bay of Bengal at dawn and dip gently into the Arabian Sea at dusk, while the great Indian Ocean surges from Antarctica directly below.

In local geological and mythological lore, the multicolored sands of Kanyakumari’s beaches—streaked with black monazite, golden silica, and red garnet minerals—are believed to be the unconsumed grains of divine wedding feast rice cast aside when the virgin goddess Kanya Devi chose perpetual penance to protect the southern frontiers.

Offshore, perched on twin granite shoals, the modern landmark of Swami Vivekananda's rock pavilion commemorates the December 1892 meditation that galvanized his spiritual renaissance. Beside it stands the 133-foot stone statue of saint Thiruvalluvar, whose height exactly mirrors the 133 chapters of the Tirukkural, embodying virtue, wealth, and love carved in timeless granite.`,
    historicalContext: 'Ancient Greek geography records dating from Ptolemy and the Periplus of the Erythraean Sea (1st century CE) refer to Kanyakumari as Comari.',
    relatedPhotoGallery: [KANYAKUMARI_IMAGE, HERO_IMAGE],
    author: 'V. Ramanathan',
    publishedDate: 'February 2026',
  },
];
