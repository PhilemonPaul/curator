export const mockUser = {
  name: 'Philemon Paul',
  role: 'Project Manager',
  phone: '+91 9444026757',
  email: 'pa.philemonpaul@gmail.com',
};

export const mockTasks = [
  {
    id: 't1',
    title: 'Concrete Pouring Inspection',
    projectName: 'Skyline Residences',
    status: 'Pending',
    priority: 'High',
  },
  {
    id: 't2',
    title: 'HVAC Duct Installation',
    projectName: 'Metro Tech Park',
    status: 'In Progress',
    priority: 'Medium',
  },
  {
    id: 't3',
    title: 'Waterproofing Check',
    projectName: 'Skyline Residences',
    status: 'Issue',
    priority: 'High',
  },
];

export const mockIssues = [
  {
    id: 'i1',
    title: 'Rebar Spacing NCR',
    projectName: 'Metro Tech Park',
    location: 'Tower A, Floor 5',
    date: 'Oct 24, 2023',
  },
];

export const mockProjects = [
  {
    id: 'p1',
    name: 'Mira',
    location: 'D Block, Anna Nagar East',
    image: 'https://cdn.prod.website-files.com/677bcfaeaf829bc8dfec9e22/69e1c02c4dc271024f92a167_arihant-mira-02.webp',
    towers: [
      {
        id: 'mtw1',
        name: 'Tower A',
        floors: [
          {
            id: 'mf1',
            name: 'Floor 1',
            units: [
              { id: 'm1', name: 'Unit 101', status: 'Completed' },
              { id: 'm2', name: 'Unit 102', status: 'In Progress' },
              { id: 'm3', name: 'Unit 103', status: 'Not Inspected' },
              { id: 'm4', name: 'Unit 104', status: 'Issue Found' },
            ]
          },
          {
            id: 'mf2',
            name: 'Floor 2',
            units: [
              { id: 'm5', name: 'Unit 201', status: 'Not Inspected' },
              { id: 'm6', name: 'Unit 202', status: 'Not Inspected' },
            ]
          }
        ]
      },
      {
        id: 'mtw2',
        name: 'Tower B',
        floors: []
      }
    ]
  },
  {
    id: 'p2',
    name: 'Reserve 16',
    location: 'Pattipulam, ECR',
    image: 'https://cdn.prod.website-files.com/677bcfaeaf829bc8dfec9e22/67aaf828d8a58ee526484431_Arihant%20Arihant%20R16.avif',
    towers: []
  },
  {
    id: 'p3',
    name: 'Melange',
    location: 'Saligrammam',
    image: 'https://cdn.prod.website-files.com/677bcfaeaf829bc8dfec9e22/67ab01946ee3352cd95da335_Arihant%20Melange.avif',
    towers: []
  },
  {
    id: 'p4',
    name: 'Krsna',
    location: '4th Street, Abhiramapuram',
    image: 'https://cdn.prod.website-files.com/677bcfaeaf829bc8dfec9e22/67ab00b7a16204cc88341da2_Arihant%20Krsna.avif',
    towers: [
      {
        id: 'ktw1',
        name: 'Tower A',
        floors: [
          {
            id: 'kf1',
            name: 'Floor 1',
            units: [
              { id: 'k1', name: 'Unit 101', status: 'Completed' },
              { id: 'k2', name: 'Unit 102', status: 'In Progress' },
            ]
          },
          {
            id: 'kf2',
            name: 'Floor 2',
            units: [
              { id: 'k5', name: 'Unit 201', status: 'Not Inspected' },
              { id: 'k6', name: 'Unit 202', status: 'Not Inspected' },
            ]
          },
          {
            id: 'kf3',
            name: 'Floor 3',
            units: [
              { id: 'k5', name: 'Unit 301', status: 'Not Inspected' },
              { id: 'k6', name: 'Unit 302', status: 'Not Inspected' },
            ]
          },
        ]
      },
    ]
  },
  {
    id: 'p5',
    name: 'Vivriti',
    location: 'Voc St, OMR Kottivakkam',
    image: 'https://cdn.prod.website-files.com/677bcfaeaf829bc8dfec9e22/67f5035c66dc5dc9d5c48200_Vivriti-VOC-Landscape.avif',
    towers: []
  },
  {
    id: 'p6',
    name: 'Aurelia',
    location: 'Harrington Road',
    image: 'https://cdn.prod.website-files.com/677bcfaeaf829bc8dfec9e22/67af3f45d0f8004a45194cad_Arihant%20Aurelia_Harrington%20rd_high-res.avif',
    towers: []
  },
  {
    id: 'p7',
    name: 'Chirla',
    location: 'Poes Garden',
    image: 'https://cdn.prod.website-files.com/677bcfaeaf829bc8dfec9e22/67aaff1cdcba5478eea44d4e_Arihant%20Chirla.avif',
    towers: []
  },
  {
    id: 'p8',
    name: 'Equitas',
    location: 'Little Mount, Guindy',
    image: 'https://cdn.prod.website-files.com/677bcfaeaf829bc8dfec9e22/685cf3308226505940185215_Equitas%20Hero%20Banner.webp',
    towers: []
  }
];

export const mockChecklist = [
  { id: 'c1', text: 'Slab Concreting', passed: null, remark: '' },
  { id: 'c2', text: 'Block Work - Upto Band beam', passed: null, remark: '' },
  { id: 'c3', text: 'Block Work - Lintel Level', passed: null, remark: '' },
  { id: 'c4', text: 'Block Work - Lintel RCC', passed: null, remark: '' },
  { id: 'c5', text: 'Block Work - Above Lintel', passed: null, remark: '' },
  { id: 'c6', text: 'Block Work - Flat cleaning', passed: null, remark: '' },
  { id: 'c7', text: 'Internal electrical conduiting', passed: null, remark: '' },
  { id: 'c8', text: 'Internal Plastering-Toilet', passed: null, remark: '' },
  { id: 'c9', text: 'Internal Plastering-Kitchen', passed: null, remark: '' },
  { id: 'c10', text: 'Internal Tar plastering', passed: null, remark: '' },
  { id: 'c11', text: 'Internal Sanla plastering', passed: null, remark: '' },
  { id: 'c12', text: 'Inside sunken waterproofing', passed: null, remark: '' },
  { id: 'c13', text: 'Gypsum Botton Marking', passed: null, remark: '' },
  { id: 'c14', text: 'Civil to Electrical Handing Over', passed: null, remark: '' },
  { id: 'c15', text: 'Gypsum Plastering', passed: null, remark: '' },
  { id: 'c16', text: 'Ready for wall Tiling', passed: null, remark: '' },
  { id: 'c17', text: 'Wall Tile - Toilet', passed: null, remark: '' },
  { id: 'c18', text: 'Wall Tile - Kitchen', passed: null, remark: '' },
  { id: 'c19', text: 'Flooring Tile - Toilet', passed: null, remark: '' },
  { id: 'c20', text: 'Ceiling 1st coat putty', passed: null, remark: '' },
  { id: 'c21', text: 'Ceiling 2nd coat putty', passed: null, remark: '' },
  { id: 'c22', text: 'Ceiling Primer', passed: null, remark: '' },
  { id: 'c23', text: 'Ceiling 1st Coat paint', passed: null, remark: '' },
  { id: 'c24', text: 'Ceiling 2nd Coat paint', passed: null, remark: '' },
  { id: 'c25', text: 'Wall 1st coat putty', passed: null, remark: '' },
  { id: 'c26', text: 'Wall 2nd coat putty', passed: null, remark: '' },
  { id: 'c27', text: 'Wall Primer', passed: null, remark: '' },
  { id: 'c28', text: 'Wall 1st Coat paint', passed: null, remark: '' },
  { id: 'c29', text: 'Ready for floor Tiling', passed: null, remark: '' },
  { id: 'c30', text: 'Flooring Tile - Main Flooring', passed: null, remark: '' },
  { id: 'c31', text: 'Toilet false ceiling', passed: null, remark: '' },
  { id: 'c32', text: 'Door frame fixing', passed: null, remark: '' },
  { id: 'c33', text: 'Door shutter fixing', passed: null, remark: '' },
  { id: 'c34', text: 'Window frame fixing', passed: null, remark: '' },
  { id: 'c35', text: 'Window Shutter fixing', passed: null, remark: '' },
  { id: 'c36', text: 'Int.Elect Wiring', passed: null, remark: '' },
  { id: 'c37', text: 'Switch box fixing', passed: null, remark: '' },
  { id: 'c38', text: 'Ready for handing over', passed: null, remark: '' },
  { id: 'c39', text: 'Ceiling 2nd Coat paint', passed: null, remark: '' },
  { id: 'c40', text: 'Sanitary ware fixing', passed: null, remark: '' },
  { id: 'c41', text: 'CP fitting fixing', passed: null, remark: '' },
  { id: 'c42', text: 'Wall 2nd Coat paint', passed: null, remark: '' },
];
