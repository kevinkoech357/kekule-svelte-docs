export interface NavItem {
  label:    string
  href:     string
  badge?:   string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: 'Getting started',
    items: [
      { label: 'Introduction',   href: '/'              },
      { label: 'Installation',   href: '/docs/install'  },
      { label: 'Quick start',    href: '/docs/quickstart' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'KekuleViewer',   href: '/docs/viewer'   },
      { label: 'KekuleEditor',   href: '/docs/editor'   },
      { label: 'KekuleReaction', href: '/docs/reaction' },
      { label: 'Kekule3DViewer', href: '/docs/3d-viewer' },
    ],
  },
  {
    title: 'Utilities',
    items: [
      { label: 'loadKekule',         href: '/docs/load-kekule'  },
      { label: 'getMoleculeProperties', href: '/docs/properties' },
      { label: 'computeLipinski',    href: '/docs/lipinski'     },
      { label: 'formatFormula',      href: '/docs/format-formula' },
      { label: 'KekuleError',        href: '/docs/errors' },
    ],
  },
  {
    title: 'Examples',
    items: [
      { label: 'Basic viewer',       href: '/examples/basic'      },
      { label: 'Custom slots',       href: '/examples/slots'      },
      { label: 'Structure editor',   href: '/examples/editor'     },
      { label: 'Reaction diagram',   href: '/examples/reaction'   },
      { label: 'Properties panel',   href: '/examples/properties' },
      { label: 'Download & export',  href: '/examples/export'     },
    ],
  },
]

export const examples = [
  { name: 'Aspirin',      smiles: 'CC(=O)Oc1ccccc1C(=O)O',                         formula: 'C₉H₈O₄',      mw: 180.16, logp: 1.19,  hbd: 1, hba: 4,  desc: 'Analgesic & anti-inflammatory' },
  { name: 'Caffeine',     smiles: 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C',                  formula: 'C₈H₁₀N₄O₂',   mw: 194.19, logp: -0.07, hbd: 0, hba: 6,  desc: 'CNS stimulant' },
  { name: 'Ibuprofen',    smiles: 'CC(C)Cc1ccc(cc1)C(C)C(=O)O',                    formula: 'C₁₃H₁₈O₂',    mw: 206.28, logp: 3.97,  hbd: 1, hba: 2,  desc: 'NSAID pain reliever' },
  { name: 'Paracetamol',  smiles: 'CC(=O)Nc1ccc(O)cc1',                            formula: 'C₈H₉NO₂',     mw: 151.16, logp: 0.46,  hbd: 2, hba: 3,  desc: 'Analgesic & antipyretic' },
  { name: 'Glucose',      smiles: 'OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O',       formula: 'C₆H₁₂O₆',     mw: 180.16, logp: -3.24, hbd: 5, hba: 6,  desc: 'Primary energy source' },
  { name: 'Dopamine',     smiles: 'NCCc1ccc(O)c(O)c1',                             formula: 'C₈H₁₁NO₂',    mw: 153.18, logp: 0.53,  hbd: 3, hba: 4,  desc: 'Neurotransmitter' },
  { name: 'Benzene',      smiles: 'c1ccccc1',                                       formula: 'C₆H₆',        mw: 78.11,  logp: 2.13,  hbd: 0, hba: 0,  desc: 'Aromatic hydrocarbon' },
  { name: 'Ethanol',      smiles: 'CCO',                                            formula: 'C₂H₆O',       mw: 46.07,  logp: -0.14, hbd: 1, hba: 1,  desc: 'Simple primary alcohol' },
  { name: 'Penicillin G', smiles: 'CC1(C)SC2C(NC(=O)Cc3ccccc3)C(=O)N2C1C(=O)O',   formula: 'C₁₆H₁₈N₂O₄S', mw: 334.39, logp: 1.83,  hbd: 2, hba: 6,  desc: 'Beta-lactam antibiotic' },
  { name: 'Cholesterol',  smiles: 'C[C@H](CCCC(C)C)[C@H]1CC[C@@H]2[C@@H]1CC=C3C[C@@H](O)CC[C@]23C', formula: 'C₂₇H₄₆O', mw: 386.65, logp: 7.28, hbd: 1, hba: 1, desc: 'Sterol lipid' },
]

export const reactions = [
  { name: 'Esterification',     reaction: 'CCO.CC(=O)O>>CC(=O)OCC.O',        desc: 'Ethanol + Acetic acid → Ethyl acetate + Water' },
  { name: 'Aldol condensation', reaction: 'CC=O.CC=O>>CC(O)CC=O',             desc: 'Acetaldehyde self-condensation' },
  { name: 'Saponification',     reaction: 'CC(=O)OCC.O>>CC(=O)O.CCO',        desc: 'Ester hydrolysis in base' },
]
