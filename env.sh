#!/bin/sh
while read line;
    do
        IFS='= ' read -a array <<< $line
	export ${array[0]}=${array[1]}
    done < .env
