export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  tags?: string[]
  featured?: boolean
}

export interface MenuCategory {
  id: string
  name: string
  description: string
}

export const menuCategories: MenuCategory[] = [
  {
    id: "appetizers",
    name: "Appetizers",
    description: "Begin your journey with our carefully curated starters",
  },
  {
    id: "soups-salads",
    name: "Soups & Salads",
    description: "Fresh, seasonal offerings to awaken the palate",
  },
  {
    id: "main-courses",
    name: "Main Courses",
    description: "The pinnacle of our culinary artistry",
  },
  {
    id: "seafood",
    name: "Seafood",
    description: "The finest catches from pristine waters",
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "A sweet conclusion to your evening",
  },
  {
    id: "beverages",
    name: "Beverages",
    description: "Expertly curated drinks and elixirs",
  },
]

export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: "1",
    name: "Seared Hokkaido Scallops",
    description: "Pan-seared scallops with caviar pearls, citrus beurre blanc, and microgreens",
    price: 68,
    category: "appetizers",
    image: "/images/appetizer.jpg",
    tags: ["Signature", "Gluten-Free"],
    featured: true,
  },
  {
    id: "2",
    name: "Foie Gras Terrine",
    description: "Hudson Valley foie gras, Sauternes gelée, brioche toast, fig compote",
    price: 58,
    category: "appetizers",
    tags: ["Chef's Selection"],
  },
  {
    id: "3",
    name: "Bluefin Tuna Tartare",
    description: "Hand-cut bluefin tuna, avocado mousse, sesame tuile, ponzu",
    price: 52,
    category: "appetizers",
    tags: ["Raw", "Gluten-Free"],
  },
  {
    id: "4",
    name: "Oysters Rockefeller",
    description: "East Coast oysters, spinach, Pernod, parmesan gratin",
    price: 48,
    category: "appetizers",
  },

  // Soups & Salads
  {
    id: "5",
    name: "Lobster Bisque",
    description: "Creamy Maine lobster soup, cognac, lobster claw garnish",
    price: 32,
    category: "soups-salads",
    tags: ["Signature"],
  },
  {
    id: "6",
    name: "Truffle Consommé",
    description: "Crystal-clear beef consommé, black truffle shavings, chive",
    price: 38,
    category: "soups-salads",
    tags: ["Gluten-Free"],
  },
  {
    id: "7",
    name: "Burrata Caprese",
    description: "Creamy burrata, heirloom tomatoes, aged balsamic, basil oil",
    price: 28,
    category: "soups-salads",
    tags: ["Vegetarian", "Gluten-Free"],
  },
  {
    id: "8",
    name: "Endive & Roquefort",
    description: "Belgian endive, candied walnuts, poached pear, sherry vinaigrette",
    price: 26,
    category: "soups-salads",
    tags: ["Vegetarian"],
  },

  // Main Courses
  {
    id: "9",
    name: "Wagyu Beef Tenderloin",
    description: "A5 Japanese Wagyu, truffle jus, bone marrow crust, seasonal vegetables",
    price: 185,
    category: "main-courses",
    image: "/images/main-course.jpg",
    tags: ["Signature", "Gluten-Free"],
    featured: true,
  },
  {
    id: "10",
    name: "Rack of Colorado Lamb",
    description: "Herb-crusted lamb, rosemary reduction, spring pea purée",
    price: 78,
    category: "main-courses",
    tags: ["Gluten-Free"],
  },
  {
    id: "11",
    name: "Duck à l'Orange",
    description: "Roasted Muscovy duck breast, grand marnier sauce, pommes sarladaises",
    price: 72,
    category: "main-courses",
  },
  {
    id: "12",
    name: "Beef Wellington",
    description: "Prime tenderloin, wild mushroom duxelles, puff pastry, Madeira sauce",
    price: 95,
    category: "main-courses",
    tags: ["Classic"],
  },

  // Seafood
  {
    id: "13",
    name: "Butter-Poached Lobster",
    description: "Maine lobster, champagne beurre blanc, fingerling potatoes",
    price: 125,
    category: "seafood",
    tags: ["Signature", "Gluten-Free"],
  },
  {
    id: "14",
    name: "Dover Sole Meunière",
    description: "Whole Dover sole, brown butter, capers, parsley, lemon",
    price: 98,
    category: "seafood",
    tags: ["Classic"],
  },
  {
    id: "15",
    name: "Pan-Seared Chilean Sea Bass",
    description: "Miso-glazed sea bass, bok choy, shiitake mushrooms, ginger broth",
    price: 72,
    category: "seafood",
    tags: ["Gluten-Free"],
  },
  {
    id: "16",
    name: "King Crab Legs",
    description: "Alaskan king crab, drawn butter, grilled lemon",
    price: 145,
    category: "seafood",
    tags: ["Market Price", "Gluten-Free"],
  },

  // Desserts
  {
    id: "17",
    name: "Chocolate Sphere",
    description: "Valrhona dark chocolate, gold leaf, raspberry essence, warm ganache",
    price: 32,
    category: "desserts",
    image: "/images/dessert.jpg",
    tags: ["Signature"],
    featured: true,
  },
  {
    id: "18",
    name: "Crème Brûlée",
    description: "Tahitian vanilla custard, caramelized sugar, fresh berries",
    price: 24,
    category: "desserts",
    tags: ["Classic", "Gluten-Free"],
  },
  {
    id: "19",
    name: "Tarte Tatin",
    description: "Caramelized apple tart, crème fraîche, calvados ice cream",
    price: 26,
    category: "desserts",
  },
  {
    id: "20",
    name: "Cheese Selection",
    description: "Artisanal cheeses, honeycomb, quince paste, walnut bread",
    price: 38,
    category: "desserts",
    tags: ["Vegetarian"],
  },

  // Beverages
  {
    id: "21",
    name: "Signature Martini",
    description: "Grey Goose vodka, dry vermouth, blue cheese-stuffed olive",
    price: 22,
    category: "beverages",
    tags: ["Signature"],
  },
  {
    id: "22",
    name: "Old Fashioned",
    description: "Woodford Reserve, Angostura bitters, orange, luxardo cherry",
    price: 20,
    category: "beverages",
    tags: ["Classic"],
  },
  {
    id: "23",
    name: "Champagne Flight",
    description: "Three premium champagnes, tasting notes provided",
    price: 45,
    category: "beverages",
    tags: ["Wine"],
  },
  {
    id: "24",
    name: "Espresso",
    description: "Double shot of our house blend, served with petit fours",
    price: 8,
    category: "beverages",
  },
]

export function getMenuItemsByCategory(categoryId: string): MenuItem[] {
  return menuItems.filter((item) => item.category === categoryId)
}

export function getFeaturedItems(): MenuItem[] {
  return menuItems.filter((item) => item.featured)
}

export function searchMenuItems(query: string): MenuItem[] {
  const lowerQuery = query.toLowerCase()
  return menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}
