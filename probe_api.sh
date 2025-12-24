for path in "collections/news/entries" "news" "entries" "collections" "content/news" "v1/news"
do
  echo "Testing: $path"
  curl -k -s -D - "https://new.namdtu.uz/api/$path"   -H "X-Project-Id: 3ab8ba3b-7d36-4cd8-b099-391b7bd19afd"   -H "Authorization: Bearer 2|fuoudOGPMn40p2urO4CIl7tvkhfs8BdvTHuM7B839686be92" | grep -E "HTTP|Content-Type"
done
