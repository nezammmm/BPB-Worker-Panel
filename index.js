export default {
  async fetch(request, env, ctx) {
    // فقط وقتی لینک رو GET می‌زنیم اجرا میشه
    if (request.method === "GET") {
      // از KV دیتای users رو می‌خونه
      let users = await env.BPB_USERS.get("users");

      // اگه دیتایی وجود نداشت
      if (!users) {
        users = "هیچ کاربری وجود ندارد 👤";
      }

      // پاسخ برمیگردونه (توی مرورگر نشون داده میشه)
      return new Response(`لیست کاربران: ${users}`, {
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    // اگه روش GET نباشه (مثلا POST یا DELETE)
    return new Response("روش پشتیبانی نشده ❌", { status: 405 });
  },
};
