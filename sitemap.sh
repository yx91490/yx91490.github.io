#!/bin/bash
set -o errexit
set -o nounset

BASE_DIR=$(cd $(dirname ${0});pwd)

# 列出已经加入git的所有地址
list() {
    git ls-files |grep -f <(find fun/ bigdata/ collection/ diagram/ java/ -name '*.md') |sed 's/README\.md$//g' |sed 's/\.md$/.html/g' |xargs -n1 -i echo "https://yx91490.github.io/{}"
}

# 更新sitemap.txt
update() {
    list > .vuepress/public/sitemap.txt
    echo "Update Count: $(wc -l .vuepress/public/sitemap.txt)"
}

# 列出未加入config.js的地址
vuelist() {
    git ls-files |grep -f <(find bigdata/ collection/ diagram/ java/ -name '*.md') |sed 's/README\.md$//g' |sed 's/\.md$//g' > /tmp/vue.txt
    grep -of /tmp/vue.txt .vuepress/config.js > /tmp/vue_includes.txt
    grep -vwf /tmp/vue_includes.txt /tmp/vue.txt
}

# Main

[ $# -ne 1 ] && echo "Usage:./sitemap.sh <list|update|vuelist>" && exit 1

case $1 in
list) list ;;
update) update ;;
vuelist) vuelist ;;
esac
