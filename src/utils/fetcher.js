export default async function (...args) {
  let data = null,
    errors = null;
  try {
    const res = await fetch(...args);
    const json = await res.json();
    data = json.data || json;
  } catch (err) {
    errors = err;
  }
  return { data, errors };
}
