#!/bin/sh   
for dir in `ls`;do
    echo "\n##" $dir "\n"
    for file in $dir/*.md; do
        echo "*" [`basename $file .md`]"("$file")"
    done
done
