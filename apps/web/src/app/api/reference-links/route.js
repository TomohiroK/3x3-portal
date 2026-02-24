import sql from "@/app/api/utils/sql";

// GET - すべての参照リンクを取得
export async function GET() {
  try {
    const links = await sql`
      SELECT * FROM reference_links
      ORDER BY display_order ASC, created_at DESC
    `;
    return Response.json({ links });
  } catch (error) {
    console.error("Failed to fetch reference links:", error);
    return Response.json(
      { error: "参照リンクの取得に失敗しました" },
      { status: 500 },
    );
  }
}

// POST - 新しい参照リンクを追加
export async function POST(request) {
  try {
    const { title, url, description, display_order } = await request.json();

    if (!title || !url) {
      return Response.json(
        { error: "タイトルとURLは必須です" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO reference_links (title, url, description, display_order)
      VALUES (${title}, ${url}, ${description || null}, ${display_order || 0})
      RETURNING *
    `;

    return Response.json({ link: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Failed to create reference link:", error);
    return Response.json(
      { error: "参照リンクの追加に失敗しました" },
      { status: 500 },
    );
  }
}

// DELETE - 参照リンクを削除
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "IDが必要です" }, { status: 400 });
    }

    await sql`DELETE FROM reference_links WHERE id = ${id}`;

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete reference link:", error);
    return Response.json(
      { error: "参照リンクの削除に失敗しました" },
      { status: 500 },
    );
  }
}
