// ===========================
//  PATHOGEN ATLAS — DATA
// ===========================

const DISEASES = {
  bacterial: [
    {
      id: 'tuberculosis',
      name: 'Tuberculosis',
      organism: 'Mycobacterium tuberculosis',
      type: 'bacterial',
      symptoms: ['persistent cough', 'blood in sputum', 'night sweats', 'weight loss', 'fatigue', 'fever', 'chest pain', 'loss of appetite'],
      transmission: 'Airborne droplets',
      treatment: 'RIPE therapy: Rifampicin, Isoniazid, Pyrazinamide, Ethambutol for 6–9 months. Directly Observed Therapy (DOTS).',
      animation: 'bacteria_lung'
    },
    {
      id: 'cholera',
      name: 'Cholera',
      organism: 'Vibrio cholerae',
      type: 'bacterial',
      symptoms: ['profuse watery diarrhea', 'vomiting', 'dehydration', 'muscle cramps', 'rapid heart rate', 'dry skin', 'sunken eyes'],
      transmission: 'Contaminated water/food',
      treatment: 'Oral Rehydration Salts (ORS), IV fluids, Doxycycline or Azithromycin antibiotics.',
      animation: 'bacteria_gut'
    },
    {
      id: 'typhoid',
      name: 'Typhoid Fever',
      organism: 'Salmonella typhi',
      type: 'bacterial',
      symptoms: ['sustained high fever', 'headache', 'abdominal pain', 'rose spots on skin', 'constipation', 'diarrhea', 'weakness', 'splenomegaly'],
      transmission: 'Fecal-oral (food/water)',
      treatment: 'Ciprofloxacin, Ceftriaxone, or Azithromycin. Vaccination for prevention.',
      animation: 'bacteria_bloodstream'
    },
    {
      id: 'pneumonia',
      name: 'Bacterial Pneumonia',
      organism: 'Streptococcus pneumoniae',
      type: 'bacterial',
      symptoms: ['cough with phlegm', 'fever', 'chills', 'shortness of breath', 'chest pain', 'fatigue', 'rapid breathing', 'confusion'],
      transmission: 'Airborne / Direct contact',
      treatment: 'Amoxicillin, Cephalosporins, or Macrolides. Supportive oxygen therapy. Pneumococcal vaccine for prevention.',
      animation: 'bacteria_lung'
    },
    {
      id: 'leprosy',
      name: 'Leprosy',
      organism: 'Mycobacterium leprae',
      type: 'bacterial',
      symptoms: ['skin lesions', 'numbness in extremities', 'muscle weakness', 'eye problems', 'thickened nerves', 'loss of sensation', 'ulcers'],
      transmission: 'Prolonged close contact',
      treatment: 'Multi-Drug Therapy (MDT): Dapsone, Rifampicin, Clofazimine for 6–12 months.',
      animation: 'bacteria_skin'
    },
    {
      id: 'tetanus',
      name: 'Tetanus',
      organism: 'Clostridium tetani',
      type: 'bacterial',
      symptoms: ['jaw cramping', 'muscle stiffness', 'painful spasms', 'difficulty swallowing', 'lockjaw', 'fever', 'sweating', 'rapid heartbeat'],
      transmission: 'Wound contamination',
      treatment: 'Tetanus immunoglobulin (TIG), Metronidazole/Penicillin, muscle relaxants, supportive care. Vaccination (TdaP).',
      animation: 'bacteria_nerve'
    },
    {
      id: 'plague',
      name: 'Bubonic Plague',
      organism: 'Yersinia pestis',
      type: 'bacterial',
      symptoms: ['swollen lymph nodes (buboes)', 'fever', 'chills', 'headache', 'weakness', 'black patches on skin', 'vomiting blood'],
      transmission: 'Flea bites from rodents',
      treatment: 'Streptomycin, Gentamicin, Doxycycline. Isolation and quarantine. Early treatment is critical.',
      animation: 'bacteria_lymph'
    },
    {
      id: 'lyme',
      name: "Lyme Disease",
      organism: 'Borrelia burgdorferi',
      type: 'bacterial',
      symptoms: ['bullseye rash', 'fever', 'headache', 'fatigue', 'muscle aches', 'joint pain', 'facial palsy', 'heart palpitations'],
      transmission: 'Tick bites (Ixodes ticks)',
      treatment: 'Doxycycline, Amoxicillin, Cefuroxime for 2–4 weeks. IV antibiotics for severe cases.',
      animation: 'bacteria_bloodstream'
    },
    {
      id: 'diphtheria',
      name: 'Diphtheria',
      organism: 'Corynebacterium diphtheriae',
      type: 'bacterial',
      symptoms: ['sore throat', 'gray membrane in throat', 'fever', 'swollen neck glands', 'hoarseness', 'difficulty breathing', 'weakness'],
      transmission: 'Respiratory droplets',
      treatment: 'Diphtheria antitoxin, Penicillin or Erythromycin. DPT vaccine for prevention.',
      animation: 'bacteria_throat'
    },
    {
      id: 'whooping',
      name: 'Whooping Cough',
      organism: 'Bordetella pertussis',
      type: 'bacterial',
      symptoms: ['severe coughing fits', 'whooping sound on inhalation', 'vomiting after cough', 'runny nose', 'low fever', 'fatigue', 'apnea in infants'],
      transmission: 'Respiratory droplets',
      treatment: 'Azithromycin or Erythromycin. Supportive care. TdaP vaccination for prevention.',
      animation: 'bacteria_lung'
    },
    {
      id: 'meningitis',
      name: 'Bacterial Meningitis',
      organism: 'Neisseria meningitidis',
      type: 'bacterial',
      symptoms: ['severe headache', 'high fever', 'stiff neck', 'photophobia', 'nausea', 'vomiting', 'altered consciousness', 'purpuric rash'],
      transmission: 'Respiratory droplets',
      treatment: 'IV Cephalosporins (Ceftriaxone), Penicillin, Dexamethasone. Meningococcal vaccine.',
      animation: 'bacteria_brain'
    },
    {
      id: 'gonorrhea',
      name: 'Gonorrhea',
      organism: 'Neisseria gonorrhoeae',
      type: 'bacterial',
      symptoms: ['painful urination', 'discharge', 'genital inflammation', 'rectal pain', 'sore throat', 'joint pain', 'often asymptomatic'],
      transmission: 'Sexual contact',
      treatment: 'Dual therapy: Ceftriaxone + Azithromycin. Treat sexual partners.',
      animation: 'bacteria_cell'
    },
    {
      id: 'syphilis',
      name: 'Syphilis',
      organism: 'Treponema pallidum',
      type: 'bacterial',
      symptoms: ['painless sore (chancre)', 'skin rash', 'sore throat', 'hair loss', 'muscle aches', 'neurological symptoms', 'cardiovascular complications'],
      transmission: 'Sexual contact',
      treatment: 'Penicillin G (Benzathine) IM injections. Doxycycline for penicillin-allergic patients.',
      animation: 'bacteria_bloodstream'
    },
    {
      id: 'salmonellosis',
      name: 'Salmonellosis',
      organism: 'Salmonella enteritidis',
      type: 'bacterial',
      symptoms: ['diarrhea', 'abdominal cramps', 'fever', 'nausea', 'vomiting', 'headache', 'blood in stool'],
      transmission: 'Contaminated food (eggs, poultry)',
      treatment: 'Usually self-limiting. Fluids and rest. Ciprofloxacin for severe/immunocompromised cases.',
      animation: 'bacteria_gut'
    },
    {
      id: 'botulism',
      name: 'Botulism',
      organism: 'Clostridium botulinum',
      type: 'bacterial',
      symptoms: ['double vision', 'drooping eyelids', 'difficulty speaking', 'difficulty swallowing', 'muscle weakness', 'paralysis', 'respiratory failure'],
      transmission: 'Contaminated food, wound',
      treatment: 'Antitoxin (heptavalent HBAT), mechanical ventilation. Treat wound if wound botulism.',
      animation: 'bacteria_nerve'
    },
    {
      id: 'staph',
      name: 'Staph Infection (MRSA)',
      organism: 'Staphylococcus aureus',
      type: 'bacterial',
      symptoms: ['skin boils', 'redness and swelling', 'pus-filled abscesses', 'fever', 'warm skin', 'pain at site', 'in severe cases: sepsis'],
      transmission: 'Direct contact / wounds',
      treatment: 'Vancomycin for MRSA. Drainage of abscesses. Linezolid, Daptomycin for resistant strains.',
      animation: 'bacteria_skin'
    },
    {
      id: 'anthrax',
      name: 'Anthrax',
      organism: 'Bacillus anthracis',
      type: 'bacterial',
      symptoms: ['skin sores with black center', 'fever', 'chest tightness', 'shortness of breath', 'shock', 'nausea', 'bloody diarrhea'],
      transmission: 'Contact with infected animals/spores',
      treatment: 'Ciprofloxacin, Doxycycline, Penicillin. Anthrax antitoxin for inhalation anthrax.',
      animation: 'bacteria_bloodstream'
    },
    {
      id: 'strep',
      name: 'Strep Throat',
      organism: 'Streptococcus pyogenes',
      type: 'bacterial',
      symptoms: ['sore throat', 'difficulty swallowing', 'red and swollen tonsils', 'white patches on tonsils', 'fever', 'headache', 'rash'],
      transmission: 'Respiratory droplets',
      treatment: 'Penicillin or Amoxicillin for 10 days. Ibuprofen for pain relief.',
      animation: 'bacteria_throat'
    },
    {
      id: 'urinary',
      name: 'Urinary Tract Infection',
      organism: 'Escherichia coli',
      type: 'bacterial',
      symptoms: ['burning urination', 'frequent urination', 'cloudy urine', 'strong urine odor', 'pelvic pain', 'blood in urine', 'low fever'],
      transmission: 'Fecal contamination, ascending infection',
      treatment: 'Trimethoprim-sulfamethoxazole, Nitrofurantoin, Ciprofloxacin (3–7 day course).',
      animation: 'bacteria_cell'
    },
    {
      id: 'brucellosis',
      name: 'Brucellosis',
      organism: 'Brucella species',
      type: 'bacterial',
      symptoms: ['undulant fever', 'sweats', 'fatigue', 'anorexia', 'headache', 'back pain', 'joint pain', 'liver enlargement'],
      transmission: 'Unpasteurized dairy, animal contact',
      treatment: 'Doxycycline + Rifampin for 6 weeks. Doxycycline + Streptomycin for severe cases.',
      animation: 'bacteria_bloodstream'
    },
    {
      id: 'rickettsia',
      name: 'Rocky Mountain Spotted Fever',
      organism: 'Rickettsia rickettsii',
      type: 'bacterial',
      symptoms: ['sudden fever', 'headache', 'rash starting on wrists', 'muscle pain', 'nausea', 'vomiting', 'abdominal pain', 'confusion'],
      transmission: 'Tick bites',
      treatment: 'Doxycycline (treatment of choice). Early treatment is critical for survival.',
      animation: 'bacteria_cell'
    },
    {
      id: 'cellulitis',
      name: 'Cellulitis',
      organism: 'Streptococcus / Staphylococcus',
      type: 'bacterial',
      symptoms: ['red skin area', 'swelling', 'tenderness', 'warmth', 'skin tightness', 'blistering', 'fever', 'red streaks from area'],
      transmission: 'Skin breaks, wounds',
      treatment: 'Cephalexin, Dicloxacillin for mild cases. IV Nafcillin or Cefazolin for severe cases.',
      animation: 'bacteria_skin'
    },
  ],

  viral: [
    {
      id: 'influenza',
      name: 'Influenza',
      organism: 'Influenza A/B virus',
      type: 'viral',
      symptoms: ['sudden fever', 'body aches', 'headache', 'fatigue', 'dry cough', 'sore throat', 'runny nose', 'chills'],
      transmission: 'Respiratory droplets',
      treatment: 'Oseltamivir (Tamiflu), Zanamivir. Supportive rest and fluids. Annual flu vaccine.',
      animation: 'virus_respiratory'
    },
    {
      id: 'hiv',
      name: 'HIV/AIDS',
      organism: 'Human Immunodeficiency Virus',
      type: 'viral',
      symptoms: ['flu-like illness', 'swollen lymph nodes', 'weight loss', 'night sweats', 'recurrent infections', 'fatigue', 'mouth ulcers', 'skin rash'],
      transmission: 'Sexual contact, blood, perinatal',
      treatment: 'Antiretroviral Therapy (ART): combination of NRTIs, NNRTIs, PIs, Integrase inhibitors. Lifelong treatment.',
      animation: 'virus_cell_hijack'
    },
    {
      id: 'dengue',
      name: 'Dengue Fever',
      organism: 'Dengue virus (DENV 1–4)',
      type: 'viral',
      symptoms: ['high fever', 'severe headache', 'pain behind eyes', 'joint and muscle pain', 'skin rash', 'mild bleeding', 'nausea', 'vomiting'],
      transmission: 'Aedes mosquito bite',
      treatment: 'Supportive care (fluids, paracetamol). No specific antiviral. Avoid aspirin/NSAIDs. Dengvaxia vaccine in endemic areas.',
      animation: 'virus_bloodstream'
    },
    {
      id: 'measles',
      name: 'Measles',
      organism: 'Measles morbillivirus',
      type: 'viral',
      symptoms: ['high fever', 'cough', 'runny nose', 'red eyes', 'koplik spots', 'maculopapular rash', 'photophobia'],
      transmission: 'Airborne / Respiratory droplets',
      treatment: 'Supportive care. Vitamin A supplementation. MMR vaccine for prevention.',
      animation: 'virus_respiratory'
    },
    {
      id: 'covid',
      name: 'COVID-19',
      organism: 'SARS-CoV-2',
      type: 'viral',
      symptoms: ['fever', 'dry cough', 'fatigue', 'loss of smell', 'loss of taste', 'shortness of breath', 'body aches', 'sore throat', 'headache'],
      transmission: 'Airborne / Respiratory droplets',
      treatment: 'Paxlovid (Nirmatrelvir/Ritonavir), Remdesivir for hospitalized. Supportive oxygen therapy. mRNA vaccines.',
      animation: 'virus_respiratory'
    },
    {
      id: 'ebola',
      name: 'Ebola',
      organism: 'Ebola virus (EBOV)',
      type: 'viral',
      symptoms: ['sudden fever', 'severe headache', 'muscle pain', 'vomiting', 'diarrhea', 'rash', 'internal/external bleeding', 'organ failure'],
      transmission: 'Direct contact with body fluids',
      treatment: 'Atoltivimab-maftivimab-odesivimab (Inmazeb), Ansuvimab (Ebanga). Supportive fluid therapy. Ervebo vaccine.',
      animation: 'virus_cell_hijack'
    },
    {
      id: 'hepatitis_b',
      name: 'Hepatitis B',
      organism: 'Hepatitis B virus (HBV)',
      type: 'viral',
      symptoms: ['jaundice', 'abdominal pain', 'dark urine', 'fatigue', 'nausea', 'vomiting', 'loss of appetite', 'joint pain'],
      transmission: 'Blood, sexual contact, perinatal',
      treatment: 'Tenofovir or Entecavir (chronic). Interferon-alpha. Hepatitis B vaccine for prevention.',
      animation: 'virus_liver'
    },
    {
      id: 'hepatitis_c',
      name: 'Hepatitis C',
      organism: 'Hepatitis C virus (HCV)',
      type: 'viral',
      symptoms: ['fatigue', 'jaundice', 'dark urine', 'abdominal pain', 'nausea', 'joint pain', 'often asymptomatic', 'liver cirrhosis (chronic)'],
      transmission: 'Blood-to-blood contact',
      treatment: 'Direct-acting antivirals (DAAs): Sofosbuvir/Velpatasvir (Epclusa), Glecaprevir/Pibrentasvir (Mavyret). 8–12 weeks.',
      animation: 'virus_liver'
    },
    {
      id: 'rabies',
      name: 'Rabies',
      organism: 'Rabies lyssavirus',
      type: 'viral',
      symptoms: ['fever', 'headache', 'anxiety', 'confusion', 'hydrophobia', 'hallucinations', 'paralysis', 'coma', 'excessive salivation'],
      transmission: 'Animal bites (dogs, bats)',
      treatment: 'Post-exposure prophylaxis (PEP): wound cleaning, rabies vaccine series, rabies immunoglobulin. Fatal without treatment.',
      animation: 'virus_nerve'
    },
    {
      id: 'polio',
      name: 'Poliomyelitis',
      organism: 'Poliovirus (enterovirus)',
      type: 'viral',
      symptoms: ['fever', 'sore throat', 'headache', 'vomiting', 'neck stiffness', 'limb weakness', 'flaccid paralysis', 'muscle atrophy'],
      transmission: 'Fecal-oral route',
      treatment: 'No cure. Supportive: physical therapy, ventilators. OPV/IPV vaccines for prevention.',
      animation: 'virus_nerve'
    },
    {
      id: 'mumps',
      name: 'Mumps',
      organism: 'Mumps paramyxovirus',
      type: 'viral',
      symptoms: ['swollen parotid glands', 'jaw pain', 'fever', 'headache', 'fatigue', 'muscle aches', 'loss of appetite', 'orchitis'],
      transmission: 'Respiratory droplets / Saliva',
      treatment: 'Supportive care (rest, fluids, pain relief). MMR vaccine for prevention.',
      animation: 'virus_respiratory'
    },
    {
      id: 'chickenpox',
      name: 'Chickenpox',
      organism: 'Varicella-zoster virus',
      type: 'viral',
      symptoms: ['itchy blister rash', 'fever', 'fatigue', 'headache', 'loss of appetite', 'vesicles on skin', 'scabbing'],
      transmission: 'Airborne / Direct contact',
      treatment: 'Acyclovir for severe cases. Calamine lotion for itch. Varicella vaccine for prevention.',
      animation: 'virus_skin'
    },
    {
      id: 'herpes',
      name: 'Herpes Simplex',
      organism: 'Herpes simplex virus (HSV-1/2)',
      type: 'viral',
      symptoms: ['blisters/sores on mouth or genitals', 'burning sensation', 'itching', 'fever', 'swollen lymph nodes', 'headache', 'pain'],
      transmission: 'Direct contact with sores / Sexual',
      treatment: 'Acyclovir, Valacyclovir, Famciclovir (reduce outbreaks). No cure — lifelong latency.',
      animation: 'virus_nerve'
    },
    {
      id: 'yellow_fever',
      name: 'Yellow Fever',
      organism: 'Yellow fever flavivirus',
      type: 'viral',
      symptoms: ['fever', 'chills', 'headache', 'back pain', 'nausea', 'jaundice', 'bleeding', 'liver failure', 'kidney failure'],
      transmission: 'Aedes mosquito bite',
      treatment: 'Supportive care only. No antiviral. Yellow fever vaccine (YF-Vax) — required for travel.',
      animation: 'virus_liver'
    },
    {
      id: 'zika',
      name: 'Zika Virus',
      organism: 'Zika flavivirus',
      type: 'viral',
      symptoms: ['mild fever', 'rash', 'conjunctivitis', 'muscle pain', 'joint pain', 'headache', 'microcephaly (in fetuses)'],
      transmission: 'Aedes mosquito, sexual contact',
      treatment: 'Supportive care (rest, fluids, paracetamol). No specific treatment. Avoid Aedes mosquitoes.',
      animation: 'virus_bloodstream'
    },
    {
      id: 'west_nile',
      name: 'West Nile Virus',
      organism: 'West Nile flavivirus',
      type: 'viral',
      symptoms: ['fever', 'headache', 'body aches', 'vomiting', 'diarrhea', 'rash', 'in severe: encephalitis', 'paralysis'],
      transmission: 'Culex mosquito bite',
      treatment: 'Supportive care for mild cases. IV fluids and respiratory support for severe neurological cases.',
      animation: 'virus_brain'
    },
    {
      id: 'marburg',
      name: 'Marburg Virus',
      organism: 'Marburg marburgvirus',
      type: 'viral',
      symptoms: ['sudden fever', 'headache', 'muscle pain', 'rash', 'nausea', 'vomiting', 'hemorrhagic fever', 'organ failure'],
      transmission: 'Contact with infected bats or humans',
      treatment: 'Supportive care. Experimental antivirals (Favipiravir). Marvax vaccine (under development).',
      animation: 'virus_cell_hijack'
    },
    {
      id: 'hpv',
      name: 'Human Papillomavirus',
      organism: 'Human papillomavirus (HPV)',
      type: 'viral',
      symptoms: ['genital warts', 'common warts', 'plantar warts', 'often asymptomatic', 'cervical cancer (oncogenic strains)', 'throat cancer'],
      transmission: 'Sexual contact / Skin contact',
      treatment: 'Topical treatments for warts (Imiquimod). Surgical removal. HPV vaccine (Gardasil-9) for prevention.',
      animation: 'virus_cell_hijack'
    },
    {
      id: 'rotavirus',
      name: 'Rotavirus',
      organism: 'Rotavirus (genus Rotavirus)',
      type: 'viral',
      symptoms: ['severe watery diarrhea', 'vomiting', 'fever', 'abdominal pain', 'dehydration', 'loss of appetite'],
      transmission: 'Fecal-oral route',
      treatment: 'Oral rehydration therapy. IV fluids for severe dehydration. Rotavirus vaccine (RotaTeq, Rotarix).',
      animation: 'virus_gut'
    },
    {
      id: 'norovirus',
      name: 'Norovirus',
      organism: 'Norovirus (calicivirus family)',
      type: 'viral',
      symptoms: ['sudden nausea', 'vomiting', 'diarrhea', 'stomach cramps', 'fever', 'headache', 'body aches'],
      transmission: 'Fecal-oral, contaminated food/water',
      treatment: 'Supportive care: fluids and rest. No antiviral treatment.',
      animation: 'virus_gut'
    },
    {
      id: 'rubella',
      name: 'Rubella',
      organism: 'Rubella togavirus',
      type: 'viral',
      symptoms: ['pink-red rash', 'low fever', 'lymphadenopathy', 'joint pain', 'red eyes', 'runny nose', 'congenital defects in newborns'],
      transmission: 'Respiratory droplets',
      treatment: 'Supportive care. MMR vaccine for prevention. Critical to prevent in pregnant women.',
      animation: 'virus_skin'
    },
    {
      id: 'monkeypox',
      name: 'Mpox (Monkeypox)',
      organism: 'Monkeypox virus (orthopoxvirus)',
      type: 'viral',
      symptoms: ['fever', 'headache', 'swollen lymph nodes', 'muscle aches', 'rash with fluid-filled blisters', 'fatigue', 'back pain'],
      transmission: 'Direct contact with lesions, respiratory, sexual',
      treatment: 'Tecovirimat (TPOXX). Supportive care. JYNNEOS vaccine for prevention.',
      animation: 'virus_skin'
    },
    {
      id: 'hanta',
      name: 'Hantavirus',
      organism: 'Hantavirus (genus Orthohantavirus)',
      type: 'viral',
      symptoms: ['fatigue', 'fever', 'muscle aches', 'headache', 'dizziness', 'chills', 'severe shortness of breath', 'pulmonary edema'],
      transmission: 'Rodent droppings/urine inhalation',
      treatment: 'Supportive ICU care. Oxygen therapy, mechanical ventilation. Ribavirin (limited efficacy).',
      animation: 'virus_respiratory'
    },
  ],

  fungal: [
    {
      id: 'candidiasis',
      name: 'Candidiasis',
      organism: 'Candida albicans',
      type: 'fungal',
      symptoms: ['white patches in mouth/throat', 'itching and burning', 'redness', 'vaginal discharge', 'diaper rash', 'skin folds rash', 'difficulty swallowing'],
      transmission: 'Overgrowth of normal flora',
      treatment: 'Fluconazole (oral), Clotrimazole, Nystatin (topical). Echinocandins for invasive disease.',
      animation: 'fungus_surface'
    },
    {
      id: 'aspergillosis',
      name: 'Aspergillosis',
      organism: 'Aspergillus fumigatus',
      type: 'fungal',
      symptoms: ['cough', 'coughing up blood', 'wheezing', 'shortness of breath', 'fever', 'chest pain', 'sinus congestion'],
      transmission: 'Inhalation of spores',
      treatment: 'Voriconazole (first-line), Itraconazole, Amphotericin B. Surgery for invasive forms.',
      animation: 'fungus_lung'
    },
    {
      id: 'cryptococcosis',
      name: 'Cryptococcosis',
      organism: 'Cryptococcus neoformans',
      type: 'fungal',
      symptoms: ['headache', 'fever', 'neck stiffness', 'nausea', 'photophobia', 'confusion', 'cough', 'visual disturbances'],
      transmission: 'Inhalation of spores (soil/bird droppings)',
      treatment: 'Amphotericin B + Flucytosine induction, then Fluconazole maintenance.',
      animation: 'fungus_brain'
    },
    {
      id: 'histoplasmosis',
      name: 'Histoplasmosis',
      organism: 'Histoplasma capsulatum',
      type: 'fungal',
      symptoms: ['fever', 'cough', 'fatigue', 'chest pain', 'headache', 'muscle aches', 'joint pain', 'weight loss'],
      transmission: 'Inhalation of spores from bird/bat droppings',
      treatment: 'Itraconazole for mild, Amphotericin B for severe/disseminated disease.',
      animation: 'fungus_lung'
    },
    {
      id: 'ringworm',
      name: 'Ringworm (Tinea)',
      organism: 'Trichophyton / Microsporum',
      type: 'fungal',
      symptoms: ['ring-shaped red scaly rash', 'itching', 'hair loss', 'brittle nails', 'blisters on edges', 'spreading rash'],
      transmission: 'Direct contact / Shared items',
      treatment: 'Clotrimazole, Terbinafine, Miconazole (topical). Griseofulvin or Terbinafine oral for severe cases.',
      animation: 'fungus_surface'
    },
    {
      id: 'athletes_foot',
      name: "Athlete's Foot",
      organism: 'Trichophyton rubrum',
      type: 'fungal',
      symptoms: ['itching between toes', 'burning sensation', 'peeling skin', 'blisters', 'scaly skin', 'cracked skin', 'odor'],
      transmission: 'Contaminated floors/shared surfaces',
      treatment: 'Clotrimazole, Miconazole, Terbinafine creams. Oral Terbinafine or Itraconazole for stubborn cases.',
      animation: 'fungus_surface'
    },
    {
      id: 'onychomycosis',
      name: 'Onychomycosis',
      organism: 'Trichophyton / Candida',
      type: 'fungal',
      symptoms: ['yellow/brown nails', 'thickened nails', 'brittle nails', 'distorted nail shape', 'crumbling edges', 'white spots on nails'],
      transmission: 'Direct contact, moist environments',
      treatment: 'Oral Terbinafine (12 weeks), Itraconazole. Topical Ciclopirox lacquer for mild cases.',
      animation: 'fungus_surface'
    },
    {
      id: 'coccidioidomycosis',
      name: 'Coccidioidomycosis',
      organism: 'Coccidioides immitis',
      type: 'fungal',
      symptoms: ['fever', 'cough', 'tiredness', 'headache', 'night sweats', 'muscle pain', 'joint pain', 'rash on legs'],
      transmission: 'Inhalation of spores from soil',
      treatment: 'Fluconazole or Itraconazole. Amphotericin B for severe disseminated disease.',
      animation: 'fungus_lung'
    },
    {
      id: 'blastomycosis',
      name: 'Blastomycosis',
      organism: 'Blastomyces dermatitidis',
      type: 'fungal',
      symptoms: ['cough', 'fever', 'night sweats', 'weight loss', 'skin lesions with raised edges', 'bone pain', 'chest pain'],
      transmission: 'Inhalation of spores from moist soil',
      treatment: 'Itraconazole for mild, Amphotericin B for severe pulmonary/disseminated disease.',
      animation: 'fungus_lung'
    },
    {
      id: 'mucormycosis',
      name: 'Mucormycosis',
      organism: 'Mucorales (Rhizopus, Mucor)',
      type: 'fungal',
      symptoms: ['black eschar on face', 'facial swelling', 'headache', 'fever', 'nasal congestion', 'vision loss', 'cough with blood', 'chest pain'],
      transmission: 'Inhalation/direct contact with spores',
      treatment: 'Amphotericin B (lipid formulation) IV. Surgical debridement of necrotic tissue. Control underlying diabetes.',
      animation: 'fungus_sinus'
    },
    {
      id: 'sporotrichosis',
      name: 'Sporotrichosis',
      organism: 'Sporothrix schenckii',
      type: 'fungal',
      symptoms: ['skin nodules/ulcers along lymphatics', 'painless bump evolving to ulcer', 'swollen lymph nodes', 'rarely: cough, joint pain'],
      transmission: 'Thorn or plant prick',
      treatment: 'Itraconazole for skin/lymph forms. Amphotericin B for disseminated disease.',
      animation: 'fungus_surface'
    },
    {
      id: 'tinea_versicolor',
      name: 'Tinea Versicolor',
      organism: 'Malassezia furfur',
      type: 'fungal',
      symptoms: ['discolored skin patches', 'mild itching', 'scaling patches', 'patches on trunk/neck', 'worsens with heat/humidity'],
      transmission: 'Overgrowth of skin flora',
      treatment: 'Selenium sulfide shampoo, Ketoconazole shampoo/cream, Fluconazole, Itraconazole.',
      animation: 'fungus_surface'
    },
    {
      id: 'pneumocystis',
      name: 'Pneumocystis Pneumonia',
      organism: 'Pneumocystis jirovecii',
      type: 'fungal',
      symptoms: ['dry cough', 'shortness of breath', 'fever', 'fatigue', 'weight loss', 'chest tightness', 'hypoxia'],
      transmission: 'Airborne (affects immunocompromised)',
      treatment: 'Trimethoprim-sulfamethoxazole (TMP-SMX). Pentamidine for TMP-SMX intolerant.',
      animation: 'fungus_lung'
    },
    {
      id: 'paracoccidioidomycosis',
      name: 'Paracoccidioidomycosis',
      organism: 'Paracoccidioides brasiliensis',
      type: 'fungal',
      symptoms: ['mouth ulcers', 'skin lesions', 'cough', 'shortness of breath', 'swollen lymph nodes', 'weight loss', 'fever'],
      transmission: 'Inhalation of spores from soil',
      treatment: 'Itraconazole (first-line). Trimethoprim-sulfamethoxazole, Amphotericin B for severe cases.',
      animation: 'fungus_lung'
    },
    {
      id: 'jock_itch',
      name: 'Jock Itch (Tinea Cruris)',
      organism: 'Trichophyton rubrum',
      type: 'fungal',
      symptoms: ['red ring-shaped rash in groin', 'itching', 'burning', 'flaking skin', 'chafing', 'odor'],
      transmission: 'Direct contact, moist warm conditions',
      treatment: 'Topical antifungals: Clotrimazole, Miconazole, Terbinafine. Keep area dry.',
      animation: 'fungus_surface'
    },
    {
      id: 'ergotism',
      name: 'Ergotism',
      organism: 'Claviceps purpurea (ergot fungus)',
      type: 'fungal',
      symptoms: ['muscle spasms', 'burning sensation in extremities', 'vasoconstriction', 'gangrene', 'hallucinations', 'convulsions', 'nausea'],
      transmission: 'Consumption of contaminated rye grain',
      treatment: 'Remove exposure to ergot. Calcium channel blockers for vasoconstriction. Supportive care.',
      animation: 'fungus_nerve'
    },
    {
      id: 'fusariosis',
      name: 'Fusariosis',
      organism: 'Fusarium species',
      type: 'fungal',
      symptoms: ['fever', 'skin lesions', 'sinus pain', 'eye infection', 'nail infection', 'lung infiltrates', 'bloodstream infection in immunocompromised'],
      transmission: 'Soil, water, traumatic inoculation',
      treatment: 'Voriconazole, Amphotericin B. Combination antifungal therapy for severe cases.',
      animation: 'fungus_surface'
    },
    {
      id: 'pityriasis',
      name: 'Pityriasis Rosea (Fungal variant)',
      organism: 'Malassezia species',
      type: 'fungal',
      symptoms: ['herald patch (large oval rash)', 'Christmas tree pattern rash', 'mild itching', 'fatigue', 'headache'],
      transmission: 'Overgrowth of skin yeast',
      treatment: 'Usually self-limiting. Ketoconazole cream, antihistamines for itch.',
      animation: 'fungus_surface'
    },
  ],

  protozoan: [
    {
      id: 'malaria',
      name: 'Malaria',
      organism: 'Plasmodium falciparum / vivax',
      type: 'protozoan',
      symptoms: ['cyclical fever and chills', 'headache', 'muscle pain', 'nausea', 'vomiting', 'sweating', 'anemia', 'splenomegaly', 'jaundice'],
      transmission: 'Anopheles mosquito bite',
      treatment: 'Artemisinin-based Combination Therapy (ACT). Chloroquine for non-falciparum. IV Artesunate for severe. RTS,S/AS01 vaccine.',
      animation: 'protozoa_rbc'
    },
    {
      id: 'leishmaniasis',
      name: 'Leishmaniasis',
      organism: 'Leishmania donovani',
      type: 'protozoan',
      symptoms: ['prolonged fever', 'weight loss', 'enlarged spleen', 'enlarged liver', 'skin sores', 'anemia', 'weakness', 'darkened skin'],
      transmission: 'Sandfly bite',
      treatment: 'Liposomal Amphotericin B (first-line), Miltefosine, Sodium Stibogluconate (antimonials).',
      animation: 'protozoa_macrophage'
    },
    {
      id: 'trypanosomiasis_african',
      name: "African Sleeping Sickness",
      organism: 'Trypanosoma brucei',
      type: 'protozoan',
      symptoms: ['chancre at bite site', 'fever', 'headache', 'joint pain', 'swollen lymph nodes', 'sleep disturbances', 'confusion', 'coma'],
      transmission: 'Tsetse fly bite',
      treatment: 'Stage 1: Pentamidine. Stage 2: Fexinidazole (oral), Nifurtimox-Eflornithine (NECT).',
      animation: 'protozoa_blood'
    },
    {
      id: 'chagas',
      name: "Chagas Disease",
      organism: 'Trypanosoma cruzi',
      type: 'protozoan',
      symptoms: ['swelling near eye bite (Romaña sign)', 'fever', 'headache', 'fatigue', 'body aches', 'rash', 'cardiac arrhythmia', 'megacolon (chronic)'],
      transmission: 'Triatomine bug feces',
      treatment: 'Benznidazole or Nifurtimox (most effective in acute phase). Supportive cardiac care in chronic phase.',
      animation: 'protozoa_heart'
    },
    {
      id: 'giardia',
      name: 'Giardiasis',
      organism: 'Giardia lamblia',
      type: 'protozoan',
      symptoms: ['greasy diarrhea', 'abdominal cramps', 'bloating', 'gas', 'nausea', 'fatigue', 'weight loss', 'foul-smelling stools'],
      transmission: 'Contaminated water/food, fecal-oral',
      treatment: 'Metronidazole, Tinidazole, Nitazoxanide. Good water hygiene for prevention.',
      animation: 'protozoa_gut'
    },
    {
      id: 'amoebiasis',
      name: 'Amoebiasis',
      organism: 'Entamoeba histolytica',
      type: 'protozoan',
      symptoms: ['bloody diarrhea', 'abdominal pain', 'nausea', 'fever', 'liver abscess', 'weight loss', 'fatigue'],
      transmission: 'Contaminated food/water, fecal-oral',
      treatment: 'Metronidazole followed by Paromomycin or Diloxanide furoate to eliminate cysts.',
      animation: 'protozoa_gut'
    },
    {
      id: 'toxoplasmosis',
      name: 'Toxoplasmosis',
      organism: 'Toxoplasma gondii',
      type: 'protozoan',
      symptoms: ['flu-like symptoms', 'swollen lymph nodes', 'muscle aches', 'eye inflammation', 'headache', 'severe in immunocompromised', 'brain lesions'],
      transmission: 'Cat feces, undercooked meat, transplacental',
      treatment: 'Pyrimethamine + Sulfadiazine + Leucovorin. TMP-SMX for prophylaxis in HIV patients.',
      animation: 'protozoa_brain'
    },
    {
      id: 'cryptosporidiosis',
      name: 'Cryptosporidiosis',
      organism: 'Cryptosporidium parvum',
      type: 'protozoan',
      symptoms: ['watery diarrhea', 'stomach cramps', 'nausea', 'vomiting', 'fever', 'dehydration', 'weight loss'],
      transmission: 'Contaminated water, fecal-oral',
      treatment: 'Nitazoxanide for immunocompetent. Antiretroviral therapy for HIV patients. Oral rehydration.',
      animation: 'protozoa_gut'
    },
    {
      id: 'babesiosis',
      name: 'Babesiosis',
      organism: 'Babesia microti',
      type: 'protozoan',
      symptoms: ['fever', 'chills', 'sweats', 'headache', 'muscle aches', 'fatigue', 'hemolytic anemia', 'dark urine'],
      transmission: 'Ixodes tick bite',
      treatment: 'Atovaquone + Azithromycin for mild. Clindamycin + Quinine for severe. Exchange transfusion in severe hemolysis.',
      animation: 'protozoa_rbc'
    },
    {
      id: 'trichomoniasis',
      name: 'Trichomoniasis',
      organism: 'Trichomonas vaginalis',
      type: 'protozoan',
      symptoms: ['itching/burning in genitalia', 'frothy yellow-green discharge', 'pain during urination', 'pain during sex', 'often asymptomatic in men'],
      transmission: 'Sexual contact',
      treatment: 'Metronidazole or Tinidazole single dose. Treat sexual partners simultaneously.',
      animation: 'protozoa_cell'
    },
    {
      id: 'pneumocystis_proto',
      name: 'Acanthamoeba Infection',
      organism: 'Acanthamoeba castellanii',
      type: 'protozoan',
      symptoms: ['eye pain and redness', 'blurred vision', 'photophobia', 'headache', 'brain inflammation', 'skin lesions', 'confusion'],
      transmission: 'Contact lens use, contaminated water',
      treatment: 'Eye: PHMB + Chlorhexidine drops. CNS: Pentamidine + Fluconazole + Flucytosine combination.',
      animation: 'protozoa_eye'
    },
    {
      id: 'microsporidiosis',
      name: 'Microsporidiosis',
      organism: 'Enterocytozoon bieneusi',
      type: 'protozoan',
      symptoms: ['chronic diarrhea', 'wasting', 'eye infection', 'sinusitis', 'muscle infection', 'primarily in immunocompromised patients'],
      transmission: 'Fecal-oral, inhalation of spores',
      treatment: 'Albendazole for most species. Fumagillin for E. bieneusi. Antiretroviral therapy in HIV.',
      animation: 'protozoa_cell'
    },
    {
      id: 'balantidiasis',
      name: 'Balantidiasis',
      organism: 'Balantidium coli',
      type: 'protozoan',
      symptoms: ['abdominal pain', 'bloody diarrhea', 'nausea', 'vomiting', 'weight loss', 'intestinal ulcers', 'rarely: liver abscess'],
      transmission: 'Fecal-oral from pig feces',
      treatment: 'Tetracycline (drug of choice). Metronidazole or Iodoquinol as alternatives.',
      animation: 'protozoa_gut'
    },
    {
      id: 'isosporiasis',
      name: 'Isosporiasis (Cystoisosporiasis)',
      organism: 'Cystoisospora belli',
      type: 'protozoan',
      symptoms: ['profuse watery diarrhea', 'abdominal cramps', 'weight loss', 'fever', 'malabsorption', 'eosinophilia'],
      transmission: 'Contaminated food/water',
      treatment: 'Trimethoprim-sulfamethoxazole. Pyrimethamine + Folinic acid for TMP-SMX intolerant.',
      animation: 'protozoa_gut'
    },
    {
      id: 'naegleria',
      name: "Naegleria Infection (PAM)",
      organism: 'Naegleria fowleri',
      type: 'protozoan',
      symptoms: ['severe headache', 'fever', 'nausea', 'vomiting', 'stiff neck', 'seizures', 'hallucinations', 'coma', 'rapid death'],
      transmission: 'Warm fresh water entering nose',
      treatment: 'Amphotericin B + Azithromycin + Fluconazole + Rifampin (aggressive combo). Extremely high fatality rate.',
      animation: 'protozoa_brain'
    },
    {
      id: 'cyclospora',
      name: 'Cyclosporiasis',
      organism: 'Cyclospora cayetanensis',
      type: 'protozoan',
      symptoms: ['watery diarrhea', 'loss of appetite', 'weight loss', 'bloating', 'increased gas', 'nausea', 'fatigue', 'vomiting'],
      transmission: 'Contaminated food/water (raspberries, herbs)',
      treatment: 'Trimethoprim-sulfamethoxazole for 7–10 days.',
      animation: 'protozoa_gut'
    },
  ]
};

// All symptoms for autocomplete
const ALL_SYMPTOMS = [...new Set(
  Object.values(DISEASES).flatMap(arr => arr.flatMap(d => d.symptoms))
)].sort();

// Quick-pick common symptoms
const QUICK_SYMPTOMS = [
  'fever', 'cough', 'headache', 'fatigue', 'rash', 'nausea',
  'vomiting', 'diarrhea', 'muscle pain', 'shortness of breath',
  'sore throat', 'night sweats', 'weight loss', 'joint pain'
];
