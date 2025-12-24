UUID="3ab8ba3b-7d36-4cd8-b099-391b7bd19afd"
TOKEN="2|fuoudOGPMn40p2urO4CIl7tvkhfs8BdvTHuM7B839686be92"
HOST="https://new.namdtu.uz/api"

paths=(
  "collections/news/entries"
  "collections/2/entries"
  "$UUID/collections/news/entries"
  "$UUID/news"
  "news/entries"
  "entries/news"
  "content/news"
  "v1/collections/news/entries"
  "projects/1/collections/2/entries"
)

for p in "${paths[@]}"
do
  echo -n "Testing $p: "
  curl -k -s -o /dev/null -w "%{http_code} %{content_type}\n" "$HOST/$p"   -H "project-id: $UUID"   -H "Authorization: Bearer $TOKEN"
done
