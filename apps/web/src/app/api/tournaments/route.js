import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const teamId = searchParams.get("team_id");

    let queryString = "SELECT * FROM tournaments WHERE 1=1";
    const params = [];
    let paramIndex = 1;

    if (search) {
      queryString += ` AND (LOWER(name) LIKE LOWER($${paramIndex}) OR LOWER(location) LIKE LOWER($${paramIndex}) OR LOWER(description) LIKE LOWER($${paramIndex}))`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (teamId) {
      queryString += ` AND team_id = $${paramIndex}`;
      params.push(parseInt(teamId));
      paramIndex++;
    }

    queryString += " ORDER BY date ASC";

    const tournaments = await sql(queryString, params);

    return Response.json({ tournaments });
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    return Response.json(
      { error: "Failed to fetch tournaments" },
      { status: 500 },
    );
  }
}
