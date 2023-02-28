import Thailand from "@/libs/thailand";
export default function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: `method ${req.method} not allow` });
  const { type, keyword } = req.query;
  const filtered = Thailand.filter((e) => e[type] === parseInt(keyword));
  const response = filtered.map((e) => ({
    amphoe: e.amphoe,
    district: e.district,
    province: e.province,
    zipcode: e.zipcode,
  }));
  res.json(response);
}
