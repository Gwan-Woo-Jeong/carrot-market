export async function POST(req: Request) {
  const res = await req.json();
  console.log(res.email);
  return new Response("ok", { status: 200 });
}
