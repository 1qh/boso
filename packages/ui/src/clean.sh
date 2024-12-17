#!/bin/bash
# for i in *.tsx; ./clean.sh $i '.displayName = '; end
sed -e "/$2/d" -e '$r /dev/stdin' "$1" < <(grep "$2" "$1" | sort) >tmp && mv tmp "$1"
