import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const teamId = searchParams.get("team_id");

    let queryString = "SELECT * FROM news WHERE 1=1";
    const params = [];
    let paramIndex = 1;

    if (search) {
      queryString += ` AND (LOWER(title) LIKE LOWER($${paramIndex}) OR LOWER(content) LIKE LOWER($${paramIndex}))`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (teamId) {
      queryString += ` AND team_id = $${paramIndex}`;
      params.push(parseInt(teamId));
      paramIndex++;
    }

    queryString += " ORDER BY date DESC";

    const news = await sql(queryString, params);

    return Response.json({ news });
  } catch (error) {
    console.error("Error fetching news:", error);
    return Response.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
