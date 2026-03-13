import { NextResponse } from "next/server"
import { menuItems, menuCategories, getMenuItemsByCategory, searchMenuItems } from "@/lib/menu-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")

  let items = menuItems

  if (category && category !== "all") {
    items = getMenuItemsByCategory(category)
  }

  if (search) {
    items = searchMenuItems(search)
  }

  return NextResponse.json({
    categories: menuCategories,
    items,
    total: items.length,
  })
}
