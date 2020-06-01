#!/bin/bash
set -o errexit
set -o nounset

BASE_DIR=$(cd $(dirname ${0});pwd)

list() {
    git ls-files |grep -f <(find bigdata/ collection/ diagram/ java/ -name '*.md') |sed 's/README\.md$//g' |sed 's/\.md$/.html/g' |xargs -n1 -i echo "https://yx91490.github.io/{}"
}

update() {
    list > .vuepress/public/sitemap.txt
    echo "Update Count: $(wc -l .vuepress/public/sitemap.txt)"
}

# Main

[ $# -ne 1 ] && echo "Usage:./sitemap.sh <list|update>" && exit 1

case $1 in
list) list ;;
update) update ;;
esac
