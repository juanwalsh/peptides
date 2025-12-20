
export interface CountryData {
  name: string;
  time: string;
  cost: number;
}

export interface SubRegion {
  name: string;
  countries: CountryData[];
}

export interface Region {
  name: string;
  subregions: SubRegion[];
}

// Base shipping costs per region for calculation logic
const COSTS = {
  US: 35,
  AMERICAS: 45,
  EUROPE: 55,
  ASIA: 65,
  AFRICA: 65,
  OCEANIA: 70
};

export const DELIVERY_DATA: Region[] = [
  {
    name: "United States",
    subregions: [
      {
        name: "Domestic",
        countries: [
          { name: "United States", time: "3–7 days", cost: COSTS.US }
        ]
      }
    ]
  },
  {
    name: "The Americas",
    subregions: [
      {
        name: "North America",
        countries: [
          { name: "Canada", time: "7–10 days", cost: COSTS.AMERICAS }
        ]
      },
      {
        name: "Central America & Mexico",
        countries: [
          { name: "Mexico", time: "9–13 days", cost: COSTS.AMERICAS },
          { name: "Guatemala", time: "10–14 days", cost: COSTS.AMERICAS },
          { name: "Belize", time: "10–14 days", cost: COSTS.AMERICAS },
          { name: "Honduras", time: "10–15 days", cost: COSTS.AMERICAS },
          { name: "El Salvador", time: "10–15 days", cost: COSTS.AMERICAS },
          { name: "Nicaragua", time: "10–15 days", cost: COSTS.AMERICAS },
          { name: "Costa Rica", time: "10–14 days", cost: COSTS.AMERICAS },
          { name: "Panama", time: "10–14 days", cost: COSTS.AMERICAS }
        ]
      },
      {
        name: "Caribbean",
        countries: [
          { name: "Dominican Republic", time: "10–15 days", cost: COSTS.AMERICAS },
          { name: "Puerto Rico", time: "7–10 days", cost: COSTS.AMERICAS },
          { name: "Jamaica", time: "10–15 days", cost: COSTS.AMERICAS },
          { name: "Trinidad & Tobago", time: "12–18 days", cost: COSTS.AMERICAS },
          { name: "Bahamas", time: "9–13 days", cost: COSTS.AMERICAS },
          { name: "Barbados", time: "12–18 days", cost: COSTS.AMERICAS }
        ]
      },
      {
        name: "South America",
        countries: [
          { name: "Brazil", time: "9–13 days", cost: COSTS.AMERICAS },
          { name: "Argentina", time: "9–14 days", cost: COSTS.AMERICAS },
          { name: "Chile", time: "9–13 days", cost: COSTS.AMERICAS },
          { name: "Colombia", time: "9–13 days", cost: COSTS.AMERICAS },
          { name: "Peru", time: "10–15 days", cost: COSTS.AMERICAS },
          { name: "Uruguay", time: "10–15 days", cost: COSTS.AMERICAS },
          { name: "Paraguay", time: "10–15 days", cost: COSTS.AMERICAS },
          { name: "Ecuador", time: "10–15 days", cost: COSTS.AMERICAS },
          { name: "Bolivia", time: "12–18 days", cost: COSTS.AMERICAS },
          { name: "Venezuela", time: "14–20 days", cost: COSTS.AMERICAS },
          { name: "Guyana", time: "12–18 days", cost: COSTS.AMERICAS },
          { name: "Suriname", time: "12–18 days", cost: COSTS.AMERICAS }
        ]
      }
    ]
  },
  {
    name: "Europe",
    subregions: [
      {
        name: "Western Europe",
        countries: [
          { name: "United Kingdom", time: "14–19 days", cost: COSTS.EUROPE },
          { name: "Ireland", time: "14–19 days", cost: COSTS.EUROPE },
          { name: "Portugal", time: "14–19 days", cost: COSTS.EUROPE },
          { name: "Spain", time: "14–19 days", cost: COSTS.EUROPE },
          { name: "France", time: "15–20 days", cost: COSTS.EUROPE },
          { name: "Germany", time: "15–20 days", cost: COSTS.EUROPE },
          { name: "Netherlands", time: "15–20 days", cost: COSTS.EUROPE },
          { name: "Belgium", time: "15–20 days", cost: COSTS.EUROPE },
          { name: "Switzerland", time: "15–21 days", cost: COSTS.EUROPE },
          { name: "Austria", time: "15–21 days", cost: COSTS.EUROPE }
        ]
      },
      {
        name: "Southern Europe",
        countries: [
          { name: "Italy", time: "15–20 days", cost: COSTS.EUROPE },
          { name: "Greece", time: "16–22 days", cost: COSTS.EUROPE },
          { name: "Malta", time: "16–22 days", cost: COSTS.EUROPE },
          { name: "Cyprus", time: "16–22 days", cost: COSTS.EUROPE }
        ]
      },
      {
        name: "Northern Europe",
        countries: [
          { name: "Norway", time: "17–23 days", cost: COSTS.EUROPE },
          { name: "Sweden", time: "17–23 days", cost: COSTS.EUROPE },
          { name: "Finland", time: "17–23 days", cost: COSTS.EUROPE },
          { name: "Denmark", time: "16–22 days", cost: COSTS.EUROPE },
          { name: "Iceland", time: "18–25 days", cost: COSTS.EUROPE }
        ]
      },
      {
        name: "Eastern Europe",
        countries: [
          { name: "Poland", time: "16–22 days", cost: COSTS.EUROPE },
          { name: "Czech Republic", time: "16–22 days", cost: COSTS.EUROPE },
          { name: "Slovakia", time: "16–22 days", cost: COSTS.EUROPE },
          { name: "Hungary", time: "16–22 days", cost: COSTS.EUROPE },
          { name: "Romania", time: "17–23 days", cost: COSTS.EUROPE },
          { name: "Bulgaria", time: "17–23 days", cost: COSTS.EUROPE },
          { name: "Croatia", time: "16–22 days", cost: COSTS.EUROPE },
          { name: "Slovenia", time: "16–22 days", cost: COSTS.EUROPE },
          { name: "Estonia", time: "17–23 days", cost: COSTS.EUROPE },
          { name: "Latvia", time: "17–23 days", cost: COSTS.EUROPE },
          { name: "Lithuania", time: "17–23 days", cost: COSTS.EUROPE },
          { name: "Ukraine", time: "20–29 days", cost: COSTS.EUROPE },
          { name: "Serbia", time: "17–23 days", cost: COSTS.EUROPE },
          { name: "Bosnia & Herzegovina", time: "17–23 days", cost: COSTS.EUROPE },
          { name: "North Macedonia", time: "17–23 days", cost: COSTS.EUROPE },
          { name: "Albania", time: "17–23 days", cost: COSTS.EUROPE }
        ]
      }
    ]
  },
  {
    name: "Asia",
    subregions: [
      {
        name: "East Asia",
        countries: [
          { name: "Japan", time: "18–25 days", cost: COSTS.ASIA },
          { name: "South Korea", time: "18–25 days", cost: COSTS.ASIA },
          { name: "China", time: "20–29 days", cost: COSTS.ASIA },
          { name: "Taiwan", time: "18–25 days", cost: COSTS.ASIA },
          { name: "Hong Kong", time: "18–25 days", cost: COSTS.ASIA },
          { name: "Macau", time: "18–25 days", cost: COSTS.ASIA }
        ]
      },
      {
        name: "Southeast Asia",
        countries: [
          { name: "Singapore", time: "18–25 days", cost: COSTS.ASIA },
          { name: "Thailand", time: "18–25 days", cost: COSTS.ASIA },
          { name: "Malaysia", time: "18–25 days", cost: COSTS.ASIA },
          { name: "Indonesia", time: "20–29 days", cost: COSTS.ASIA },
          { name: "Philippines", time: "20–29 days", cost: COSTS.ASIA },
          { name: "Vietnam", time: "18–25 days", cost: COSTS.ASIA },
          { name: "Cambodia", time: "20–29 days", cost: COSTS.ASIA },
          { name: "Laos", time: "20–29 days", cost: COSTS.ASIA },
          { name: "Myanmar", time: "20–29 days", cost: COSTS.ASIA }
        ]
      },
      {
        name: "South Asia",
        countries: [
          { name: "India", time: "20–29 days", cost: COSTS.ASIA },
          { name: "Pakistan", time: "20–29 days", cost: COSTS.ASIA },
          { name: "Bangladesh", time: "20–29 days", cost: COSTS.ASIA },
          { name: "Sri Lanka", time: "20–29 days", cost: COSTS.ASIA },
          { name: "Nepal", time: "20–29 days", cost: COSTS.ASIA }
        ]
      },
      {
        name: "Middle East",
        countries: [
          { name: "Israel", time: "16–22 days", cost: COSTS.ASIA },
          { name: "United Arab Emirates", time: "16–22 days", cost: COSTS.ASIA },
          { name: "Saudi Arabia", time: "18–25 days", cost: COSTS.ASIA },
          { name: "Qatar", time: "16–22 days", cost: COSTS.ASIA },
          { name: "Kuwait", time: "16–22 days", cost: COSTS.ASIA },
          { name: "Oman", time: "18–25 days", cost: COSTS.ASIA },
          { name: "Bahrain", time: "16–22 days", cost: COSTS.ASIA },
          { name: "Jordan", time: "18–25 days", cost: COSTS.ASIA },
          { name: "Turkey", time: "16–22 days", cost: COSTS.ASIA }
        ]
      }
    ]
  },
  {
    name: "Africa",
    subregions: [
      {
        name: "North Africa",
        countries: [
          { name: "Egypt", time: "18–25 days", cost: COSTS.AFRICA },
          { name: "Morocco", time: "18–25 days", cost: COSTS.AFRICA },
          { name: "Tunisia", time: "18–25 days", cost: COSTS.AFRICA },
          { name: "Algeria", time: "20–29 days", cost: COSTS.AFRICA }
        ]
      },
      {
        name: "Sub-Saharan Africa",
        countries: [
          { name: "South Africa", time: "18–25 days", cost: COSTS.AFRICA },
          { name: "Nigeria", time: "20–29 days", cost: COSTS.AFRICA },
          { name: "Kenya", time: "20–29 days", cost: COSTS.AFRICA },
          { name: "Ghana", time: "20–29 days", cost: COSTS.AFRICA },
          { name: "Ethiopia", time: "20–29 days", cost: COSTS.AFRICA },
          { name: "Tanzania", time: "20–29 days", cost: COSTS.AFRICA },
          { name: "Uganda", time: "20–29 days", cost: COSTS.AFRICA },
          { name: "Senegal", time: "20–29 days", cost: COSTS.AFRICA },
          { name: "Ivory Coast", time: "20–29 days", cost: COSTS.AFRICA }
        ]
      }
    ]
  },
  {
    name: "Oceania",
    subregions: [
      {
        name: "Oceania",
        countries: [
          { name: "Australia", time: "20–29 days", cost: COSTS.OCEANIA },
          { name: "New Zealand", time: "20–29 days", cost: COSTS.OCEANIA },
          { name: "Fiji", time: "20–29 days", cost: COSTS.OCEANIA },
          { name: "Papua New Guinea", time: "20–29 days", cost: COSTS.OCEANIA }
        ]
      }
    ]
  }
];

// --- Derived Helpers for App Consumption ---

// 1. Flattened list of all countries for dropdowns
export const COUNTRIES: { name: string; cost: number; region: string; time: string }[] = DELIVERY_DATA.flatMap(region =>
  region.subregions.flatMap(sub =>
    sub.countries.map(c => ({
      name: c.name,
      cost: c.cost,
      region: region.name,
      time: c.time
    }))
  )
).sort((a, b) => a.name.localeCompare(b.name));

// 2. Lookup Map for O(1) time retrieval
const COUNTRY_TIME_MAP: Record<string, string> = {};
DELIVERY_DATA.forEach(region => {
  region.subregions.forEach(sub => {
    sub.countries.forEach(c => {
      COUNTRY_TIME_MAP[c.name] = c.time;
    });
  });
});

// 3. Estimate function used by Calculator & Product Detail
export const getShippingEstimate = (countryName: string): string => {
  return COUNTRY_TIME_MAP[countryName] || "15–30 business days";
};
