import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";

    let query;
    let params = [];

    if (search) {
      query = `
        SELECT * FROM teams
        WHERE LOWER(name) LIKE LOWER($1)
           OR LOWER(location) LIKE LOWER($1)
        ORDER BY name ASC
      `;
      params = [`%${search}%`];
    } else {
      query = "SELECT * FROM teams ORDER BY name ASC";
    }

    const teams = await sql(query, params);

    return Response.json({ teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return Response.json({ error: "Failed to fetch teams" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      location,
      image,
      x_account,
      instagram_account,
      tiktok_account,
    } = body;

    if (!name || !location || !image) {
      return Response.json(
        { error: "Name, location, and image are required" },
        { status: 400 },
      );
    }

    const result = await sql(
      `INSERT INTO teams (name, location, image, x_account, instagram_account, tiktok_account) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [
        name,
        location,
        image,
        x_account || null,
        instagram_account || null,
        tiktok_account || null,
      ],
    );

    return Response.json({ team: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating team:", error);
    return Response.json({ error: "Failed to create team" }, { status: 500 });
  }
}
